# Company Contract
#[starknet::contract]
mod Company {
    use starknet::ContractAddress;
    use array::ArrayTrait;
    use starknet::get_caller_address;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        DeviceAdded: DeviceAdded,
        EmissionDataSubmitted: EmissionDataSubmitted,
    }

    #[derive(Drop, starknet::Event)]
    struct DeviceAdded {
        device: ContractAddress,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct EmissionDataSubmitted {
        total_emissions: u256,
        timestamp: u64,
    }

    #[storage]
    struct Storage {
        name: felt252,
        industry_type: felt252,
        devices: LegacyMap<u32, ContractAddress>,
        device_count: u32,
        admin: ContractAddress,
        calculation_contract: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        industry_type: felt252,
        admin: ContractAddress,
        calculation_contract: ContractAddress
    ) {
        self.name.write(name);
        self.industry_type.write(industry_type);
        self.admin.write(admin);
        self.calculation_contract.write(calculation_contract);
        self.device_count.write(0);
    }

    #[external(v0)]
    fn add_device(ref self: ContractState, device: ContractAddress) {
        assert(get_caller_address() == self.admin.read(), 'Only admin');
        let current_count = self.device_count.read();
        self.devices.write(current_count, device);
        self.device_count.write(current_count + 1);
        
        self.emit(Event::DeviceAdded(
            DeviceAdded { device, timestamp: starknet::get_block_timestamp() }
        ));
    }

    #[external(v0)]
    fn submit_emission_data(ref self: ContractState) {
        let total_emissions = self._get_total_emissions();
        
        // Calculate credits based on emissions
        ICreditCalculationDispatcher {
            contract_address: self.calculation_contract.read()
        }.calculate_credits(
            self.industry_type.read(),
            total_emissions,
            1_u256 // Time period of 1 unit (can be adjusted based on needs)
        );
        
        self.emit(Event::EmissionDataSubmitted(
            EmissionDataSubmitted {
                total_emissions,
                timestamp: starknet::get_block_timestamp()
            }
        ));
    }

    #[view]
    fn get_company_info(self: @ContractState) -> (felt252, felt252, u32) {
        (
            self.name.read(),
            self.industry_type.read(),
            self.device_count.read()
        )
    }

    #[view]
    fn get_device(self: @ContractState, index: u32) -> ContractAddress {
        assert(index < self.device_count.read(), 'Invalid device index');
        self.devices.read(index)
    }

    fn _get_total_emissions(self: @ContractState) -> u256 {
        let mut total = 0_u256;
        let mut i = 0_u32;
        let count = self.device_count.read();
        
        loop {
            if i >= count {
                break;
            }
            
            let device = self.devices.read(i);
            let (reading, _) = IDeviceDispatcher { contract_address: device }.get_reading();
            total += reading;
            i += 1;
        };
        
        total
    }
}

#[starknet::interface]
trait IDevice {
    fn get_reading(self: @ContractState) -> (u256, u64);
}

#[starknet::interface]
trait ICreditCalculation {
    fn calculate_credits(
        ref self: ContractState,
        industry_type: felt252,
        emission_data: u256,
        time_period: u256
    ) -> u256;
}
