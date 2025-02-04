# Company Factory Contract
use starknet::ContractAddress;
use array::ArrayTrait;
use traits::TryInto;
use option::OptionTrait;
use box::BoxTrait;
use starknet::syscalls::deploy_syscall;
use starknet::class_hash::ClassHash;
use starknet::get_caller_address;

#[starknet::interface]
trait ICompanyFactory {
    fn create_company(
        ref self: ContractState,
        name: felt252,
        industry_type: felt252,
        company_admin: ContractAddress
    ) -> ContractAddress;
    
    fn get_company(self: @ContractState, index: u32) -> ContractAddress;
    fn get_company_count(self: @ContractState) -> u32;
}

#[starknet::interface]
trait ICreditCalculation {
    fn approve_company(ref self: ContractState, company: ContractAddress);
}

#[starknet::contract]
mod CompanyFactory {
    use super::ICreditCalculation;
    use super::ICreditCalculationDispatcher;
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use array::ArrayTrait;
    use traits::TryInto;
    use option::OptionTrait;
    use box::BoxTrait;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        CompanyCreated: CompanyCreated,
        AdminChanged: AdminChanged,
    }

    #[derive(Drop, starknet::Event)]
    struct CompanyCreated {
        company_address: ContractAddress,
        name: felt252,
        industry_type: felt252,
        admin: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct AdminChanged {
        old_admin: ContractAddress,
        new_admin: ContractAddress,
    }

    #[storage]
    struct Storage {
        companies: LegacyMap<u32, ContractAddress>,
        company_count: u32,
        admin: ContractAddress,
        calculation_contract: ContractAddress,
        company_class_hash: ClassHash,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        admin: ContractAddress,
        calculation_contract: ContractAddress,
        company_class_hash: ClassHash
    ) {
        self.admin.write(admin);
        self.calculation_contract.write(calculation_contract);
        self.company_class_hash.write(company_class_hash);
        self.company_count.write(0);
    }

    #[external(v0)]
    fn create_company(
        ref self: ContractState,
        name: felt252,
        industry_type: felt252,
        company_admin: ContractAddress
    ) -> ContractAddress {
        // Verify caller is admin
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Caller is not admin');

        // Prepare constructor calldata
        let mut calldata = ArrayTrait::new();
        calldata.append(name);
        calldata.append(industry_type);
        calldata.append(company_admin.into());
        calldata.append(self.calculation_contract.read().into());

        // Deploy new company contract
        let (company_address, _) = deploy_syscall(
            self.company_class_hash.read(),
            u256_from_felt252(starknet::get_block_timestamp()), // Salt based on timestamp
            calldata.span(),
            false
        ).unwrap();

        // Store company address
        let current_count = self.company_count.read();
        self.companies.write(current_count, company_address);
        self.company_count.write(current_count + 1);

        // Approve company in calculation contract
        ICreditCalculationDispatcher {
            contract_address: self.calculation_contract.read()
        }.approve_company(company_address);

        // Emit event
        self.emit(Event::CompanyCreated(
            CompanyCreated {
                company_address,
                name,
                industry_type,
                admin: company_admin,
            }
        ));

        company_address
    }

    #[external(v0)]
    fn set_admin(ref self: ContractState, new_admin: ContractAddress) {
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Caller is not admin');
        
        let old_admin = self.admin.read();
        self.admin.write(new_admin);
        
        self.emit(Event::AdminChanged(AdminChanged { old_admin, new_admin }));
    }

    #[view]
    fn get_company(self: @ContractState, index: u32) -> ContractAddress {
        assert(index < self.company_count.read(), 'Invalid company index');
        self.companies.read(index)
    }

    #[view]
    fn get_company_count(self: @ContractState) -> u32 {
        self.company_count.read()
    }
}