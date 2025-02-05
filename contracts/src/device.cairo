# Device Contract
use starknet::ContractAddress;
use starknet::get_caller_address;

#[starknet::interface]
trait IDevice {
    fn update_reading(ref self: ContractState, reading: u256);
    fn get_reading(self: @ContractState) -> (u256, u64);
    fn get_device_info(self: @ContractState) -> (felt252, ContractAddress);
    fn set_authorized_updater(ref self: ContractState, updater: ContractAddress);
}

#[starknet::contract]
mod Device {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use zeroable::Zeroable;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        ReadingUpdated: ReadingUpdated,
        UpdaterChanged: UpdaterChanged,
        AdminChanged: AdminChanged,
    }

    #[derive(Drop, starknet::Event)]
    struct ReadingUpdated {
        reading: u256,
        timestamp: u64,
        updater: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct UpdaterChanged {
        old_updater: ContractAddress,
        new_updater: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct AdminChanged {
        old_admin: ContractAddress,
        new_admin: ContractAddress,
    }

    #[storage]
    struct Storage {
        device_id: felt252,
        company: ContractAddress,
        last_reading: u256,
        last_update: u64,
        admin: ContractAddress,
        authorized_updater: ContractAddress,
        reading_history: LegacyMap<u64, u256>,  // timestamp -> reading
        history_count: u32,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        device_id: felt252,
        company: ContractAddress,
        admin: ContractAddress
    ) {
        self.device_id.write(device_id);
        self.company.write(company);
        self.admin.write(admin);
        self.history_count.write(0);
        // Initially, admin is also the authorized updater
        self.authorized_updater.write(admin);
    }

    #[external(v0)]
    fn update_reading(ref self: ContractState, reading: u256) {
        let caller = get_caller_address();
        assert(
            caller == self.authorized_updater.read() || caller == self.admin.read(),
            'Unauthorized'
        );

        let timestamp = starknet::get_block_timestamp();
        
        // Store the reading
        self.last_reading.write(reading);
        self.last_update.write(timestamp);
        
        // Add to history
        let current_count = self.history_count.read();
        self.reading_history.write(timestamp, reading);
        self.history_count.write(current_count + 1);

        // Emit event
        self.emit(Event::ReadingUpdated(
            ReadingUpdated { reading, timestamp, updater: caller }
        ));
    }

    #[external(v0)]
    fn set_authorized_updater(ref self: ContractState, updater: ContractAddress) {
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Only admin');
        assert(!updater.is_zero(), 'Invalid updater address');

        let old_updater = self.authorized_updater.read();
        self.authorized_updater.write(updater);

        self.emit(Event::UpdaterChanged(
            UpdaterChanged { old_updater, new_updater: updater }
        ));
    }

    #[external(v0)]
    fn set_admin(ref self: ContractState, new_admin: ContractAddress) {
        let caller = get_caller_address();
        assert(caller == self.admin.read(), 'Only admin');
        assert(!new_admin.is_zero(), 'Invalid admin address');

        let old_admin = self.admin.read();
        self.admin.write(new_admin);

        self.emit(Event::AdminChanged(
            AdminChanged { old_admin, new_admin }
        ));
    }

    #[view]
    fn get_reading(self: @ContractState) -> (u256, u64) {
        (self.last_reading.read(), self.last_update.read())
    }

    #[view]
    fn get_device_info(self: @ContractState) -> (felt252, ContractAddress) {
        (self.device_id.read(), self.company.read())
    }

    #[view]
    fn get_reading_at_time(self: @ContractState, timestamp: u64) -> u256 {
        self.reading_history.read(timestamp)
    }

    #[view]
    fn get_authorized_updater(self: @ContractState) -> ContractAddress {
        self.authorized_updater.read()
    }
}