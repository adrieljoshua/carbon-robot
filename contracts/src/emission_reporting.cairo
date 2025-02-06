#[starknet::contract]
mod emission_reporting {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct EmissionReport {
        device_id: felt252,
        timestamp: u64,
        emissions: u256,
        location: felt252,
        signature: felt252,
    }

    #[storage]
    struct Storage {
        device_registry: ContractAddress,
        company_registry: ContractAddress,
        carbon_token: ContractAddress,
        latest_reports: Map<ContractAddress, EmissionReport>,
        flight_paths: Map<felt252, felt252>,
        admin: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        EmissionReported: EmissionReported,
        FlightPathUpdated: FlightPathUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct EmissionReported {
        company: ContractAddress,
        device_id: felt252,
        emissions: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct FlightPathUpdated {
        device_id: felt252,
        path: felt252,
    }

    #[starknet::interface]
    trait IDeviceRegistry<TContractState> {
        fn is_device_active(self: @TContractState, device_id: felt252) -> bool;
        fn verify_device_signature(
            self: @TContractState, device_id: felt252, message: felt252, signature: felt252,
        ) -> bool;
    }

    #[starknet::interface]
    trait ICompanyRegistry<TContractState> {
        fn update_emissions(
            ref self: TContractState, company: ContractAddress, new_emissions: u256,
        );
    }

    #[starknet::interface]
    trait ICarbonToken<TContractState> {
        fn mint(ref self: TContractState, to: ContractAddress, amount: u256);
    }

    #[starknet::interface]
    trait IEmissionReporting<TContractState> {
        fn submit_report(
            ref self: TContractState,
            device_id: felt252,
            emissions: u256,
            location: felt252,
            signature: felt252,
        );
        fn get_latest_report(self: @TContractState, company: ContractAddress) -> EmissionReport;
        fn update_flight_path(ref self: TContractState, device_id: felt252, new_path: felt252);
        fn get_flight_path(self: @TContractState, device_id: felt252) -> felt252;
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        admin: ContractAddress,
        device_registry: ContractAddress,
        company_registry: ContractAddress,
        carbon_token: ContractAddress,
    ) {
        self.admin.write(admin);
        self.device_registry.write(device_registry);
        self.company_registry.write(company_registry);
        self.carbon_token.write(carbon_token);
    }

    #[abi(embed_v0)]
    impl EmissionReportingImpl of IEmissionReporting<ContractState> {
        fn submit_report(
            ref self: ContractState,
            device_id: felt252,
            emissions: u256,
            location: felt252,
            signature: felt252,
        ) {
            let device_registry = IDeviceRegistryDispatcher {
                contract_address: self.device_registry.read(),
            };
            assert(device_registry.is_device_active(device_id), 'Device not active');
            assert(
                device_registry
                    .verify_device_signature(device_id, emissions.try_into().unwrap(), signature),
                'Invalid signature',
            );

            let company = get_caller_address();
            let report = EmissionReport {
                device_id, timestamp: get_block_timestamp(), emissions, location, signature,
            };
            self.latest_reports.entry(company).write(report);

            let company_registry = ICompanyRegistryDispatcher {
                contract_address: self.company_registry.read(),
            };
            company_registry.update_emissions(company, emissions);

            let token_contract = ICarbonTokenDispatcher {
                contract_address: self.carbon_token.read(),
            };
            token_contract.mint(company, emissions);

            self.emit(Event::EmissionReported(EmissionReported { company, device_id, emissions }));
        }

        fn get_latest_report(self: @ContractState, company: ContractAddress) -> EmissionReport {
            self.latest_reports.entry(company).read()
        }

        fn update_flight_path(ref self: ContractState, device_id: felt252, new_path: felt252) {
            assert(get_caller_address() == self.admin.read(), 'Not authorized');
            self.flight_paths.entry(device_id).write(new_path);
            self.emit(Event::FlightPathUpdated(FlightPathUpdated { device_id, path: new_path }));
        }

        fn get_flight_path(self: @ContractState, device_id: felt252) -> felt252 {
            self.flight_paths.entry(device_id).read()
        }
    }
}
