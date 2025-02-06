#[starknet::contract]
mod device_registry {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct DeviceData {
        owner: ContractAddress,
        public_key: felt252,
        is_active: bool,
    }

    #[storage]
    struct Storage {
        devices: Map<felt252, DeviceData>,
        company_registry: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        DeviceRegistered: DeviceRegistered,
        DeviceDeactivated: DeviceDeactivated,
    }

    #[derive(Drop, starknet::Event)]
    struct DeviceRegistered {
        device_id: felt252,
        owner: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct DeviceDeactivated {
        device_id: felt252,
    }

    #[starknet::interface]
    trait IDeviceRegistry<TContractState> {
        fn register_device(ref self: TContractState, device_id: felt252, public_key: felt252);
        fn deactivate_device(ref self: TContractState, device_id: felt252);
        fn is_device_active(self: @TContractState, device_id: felt252) -> bool;
        fn get_device_data(self: @TContractState, device_id: felt252) -> DeviceData;
        fn verify_device_signature(
            self: @TContractState, device_id: felt252, message: felt252, signature: felt252,
        ) -> bool;
    }

    #[constructor]
    fn constructor(ref self: ContractState, company_registry: ContractAddress) {
        self.company_registry.write(company_registry);
    }

    #[abi(embed_v0)]
    impl DeviceRegistryImpl of IDeviceRegistry<ContractState> {
        fn register_device(ref self: ContractState, device_id: felt252, public_key: felt252) {
            let caller = get_caller_address();
            let device = DeviceData { owner: caller, public_key, is_active: true };
            self.devices.entry(device_id).write(device);

            self.emit(Event::DeviceRegistered(DeviceRegistered { device_id, owner: caller }));
        }

        fn deactivate_device(ref self: ContractState, device_id: felt252) {
            let mut device = self.devices.entry(device_id).read();
            assert(device.owner == get_caller_address(), 'Not authorized');
            device.is_active = false;
            self.devices.entry(device_id).write(device);

            self.emit(Event::DeviceDeactivated(DeviceDeactivated { device_id }));
        }

        fn is_device_active(self: @ContractState, device_id: felt252) -> bool {
            let device = self.devices.entry(device_id).read();
            device.is_active
        }

        fn get_device_data(self: @ContractState, device_id: felt252) -> DeviceData {
            self.devices.entry(device_id).read()
        }

        fn verify_device_signature(
            self: @ContractState, device_id: felt252, message: felt252, signature: felt252,
        ) -> bool {
            let device = self.devices.entry(device_id).read();
            assert(device.is_active, 'Device not active');

            // Note: Implement actual signature verification using device.public_key
            // This is a placeholder
            true
        }
    }
}
