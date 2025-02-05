# Device Factory Contract
use starknet::ContractAddress;
use array::ArrayTrait;
use traits::TryInto;
use option::OptionTrait;
use box::BoxTrait;
use starknet::syscalls::deploy_syscall;
use starknet::class_hash::ClassHash;
use starknet::get_caller_address;

#[starknet::interface]
trait IDeviceFactory {
    fn create_device(
        ref self: ContractState,
        device_id: felt252,
        company: ContractAddress,
        device_admin: ContractAddress
    ) -> ContractAddress;
    
    fn get_device(self: @ContractState, index: u32) -> ContractAddress;
    fn get_device_count(self: @ContractState) -> u32;
    fn get_company_devices(self: @ContractState, company: ContractAddress) -> Array<ContractAddress>;
    fn get_company_device_count(self: @ContractState, company: ContractAddress) -> u32;
    fn is_valid_device(self: @ContractState, device: ContractAddress) -> bool;
}

#[starknet::contract]
mod DeviceFactory {
    use super::IDeviceFactory;
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use array::ArrayTrait;
    use traits::TryInto;
    use option::OptionTrait;
    use box::BoxTrait;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;
    use zeroable::Zeroable;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        DeviceCreated: DeviceCreated,
        AdminChanged: AdminChanged,
        CompanyApproved: CompanyApproved,
        CompanyRemoved: CompanyRemoved,
    }

    #[derive(Drop, starknet::Event)]
    struct DeviceCreated {
        device_address: ContractAddress,
        device_id: felt252,
        company: ContractAddress,
        admin: ContractAddress,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct AdminChanged {
        old_admin: ContractAddress,
        new_admin: ContractAddress,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct CompanyApproved {
        company: ContractAddress,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct CompanyRemoved {
        company: ContractAddress,
        timestamp: u64,
    }

    #[storage]
    struct Storage {
        devices: LegacyMap<u32, ContractAddress>,
        device_count: u32,
        company_devices: LegacyMap<(ContractAddress, u32), ContractAddress>,
        company_device_counts: LegacyMap<ContractAddress, u32>,
        device_registry: LegacyMap<ContractAddress, bool>,
        approved_companies: LegacyMap<ContractAddress, bool>,
        admin: ContractAddress,
        device_class_hash: ClassHash,
        device_ids: LegacyMap<felt252, bool>, // Track used device IDs
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        admin: ContractAddress,
        device_class_hash: ClassHash
    ) {
        self.admin.write(admin);
        self.device_class_hash.write(device_class_hash);
        self.device_count.write(0);
    }

    #[external(v0)]
    fn create_device(
        ref self: ContractState,
        device_id: felt252,
        company: ContractAddress,
        device_admin: ContractAddress
    ) -> ContractAddress {
        // Validations
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Caller is not admin');
        assert(!company.is_zero(), 'Invalid company address');
        assert(!device_admin.is_zero(), 'Invalid admin address');
        assert(self.approved_companies.read(company), 'Company not approved');
        assert(!self.device_ids.read(device_id), 'Device ID already exists');

        // Prepare constructor calldata
        let mut calldata = ArrayTrait::new();
        calldata.append(device_id);
        calldata.append(company.into());
        calldata.append(device_admin.into());

        // Create unique salt for deployment
        let salt = pedersen::pedersen(
            device_id,
            starknet::get_block_timestamp().into()
        );
        
        // Deploy device contract
        let (device_address, _) = deploy_syscall(
            self.device_class_hash.read(),
            salt,
            calldata.span(),
            false
        ).unwrap();

        // Update global device registry
        let current_count = self.device_count.read();
        self.devices.write(current_count, device_address);
        self.device_count.write(current_count + 1);
        self.device_registry.write(device_address, true);
        self.device_ids.write(device_id, true);

        // Update company-specific device registry
        let company_device_count = self.company_device_counts.read(company);
        self.company_devices.write((company, company_device_count), device_address);
        self.company_device_counts.write(company, company_device_count + 1);

        // Emit event
        self.emit(Event::DeviceCreated(
            DeviceCreated {
                device_address,
                device_id,
                company,
                admin: device_admin,
                timestamp: starknet::get_block_timestamp(),
            }
        ));

        device_address
    }

    #[external(v0)]
    fn approve_company(ref self: ContractState, company: ContractAddress) {
        // Only admin can approve companies
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Caller is not admin');
        assert(!company.is_zero(), 'Invalid company address');

        self.approved_companies.write(company, true);
        
        self.emit(Event::CompanyApproved(
            CompanyApproved {
                company,
                timestamp: starknet::get_block_timestamp(),
            }
        ));
    }

    #[external(v0)]
    fn remove_company(ref self: ContractState, company: ContractAddress) {
        // Only admin can remove companies
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Caller is not admin');
        
        self.approved_companies.write(company, false);
        
        self.emit(Event::CompanyRemoved(
            CompanyRemoved {
                company,
                timestamp: starknet::get_block_timestamp(),
            }
        ));
    }

    #[external(v0)]
    fn set_admin(ref self: ContractState, new_admin: ContractAddress) {
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Caller is not admin');
        assert(!new_admin.is_zero(), 'Invalid admin address');

        let old_admin = self.admin.read();
        self.admin.write(new_admin);

        self.emit(Event::AdminChanged(
            AdminChanged {
                old_admin,
                new_admin,
                timestamp: starknet::get_block_timestamp(),
            }
        ));
    }

    #[view]
    fn get_device(self: @ContractState, index: u32) -> ContractAddress {
        assert(index < self.device_count.read(), 'Invalid device index');
        self.devices.read(index)
    }

    #[view]
    fn get_device_count(self: @ContractState) -> u32 {
        self.device_count.read()
    }

    #[view]
    fn get_company_devices(self: @ContractState, company: ContractAddress) -> Array<ContractAddress> {
        let mut devices = ArrayTrait::new();
        let count = self.company_device_counts.read(company);
        
        let mut i: u32 = 0;
        loop {
            if i >= count {
                break;
            }
            devices.append(self.company_devices.read((company, i)));
            i += 1;
        };
        
        devices
    }

    #[view]
    fn get_company_device_count(self: @ContractState, company: ContractAddress) -> u32 {
        self.company_device_counts.read(company)
    }

    #[view]
    fn is_valid_device(self: @ContractState, device: ContractAddress) -> bool {
        self.device_registry.read(device)
    }

    #[view]
    fn is_company_approved(self: @ContractState, company: ContractAddress) -> bool {
        self.approved_companies.read(company)
    }
}