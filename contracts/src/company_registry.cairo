#[starknet::contract]
mod company_registry {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };

    const DEFAULT_ECO_SCORE: u32 = 50_u32;

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct CompanyData {
        name: felt252,
        location: felt252,
        emissions: u256,
        eco_score: u32,
        min_tokens: u256,
    }

    #[storage]
    struct Storage {
        companies: Map<ContractAddress, CompanyData>,
        token_contract: ContractAddress,
        admin: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        CompanyRegistered: CompanyRegistered,
        EcoScoreUpdated: EcoScoreUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct CompanyRegistered {
        company: ContractAddress,
        name: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct EcoScoreUpdated {
        company: ContractAddress,
        new_score: u32,
    }

    #[starknet::interface]
    trait ICompanyRegistry<TContractState> {
        fn register_company(
            ref self: TContractState, name: felt252, location: felt252, initial_emissions: u256,
        );
        fn update_eco_score(ref self: TContractState, company: ContractAddress, new_score: u32);
        fn update_emissions(
            ref self: TContractState, company: ContractAddress, new_emissions: u256,
        );
        fn get_company_data(self: @TContractState, company: ContractAddress) -> CompanyData;
        fn get_required_tokens(self: @TContractState, company: ContractAddress) -> u256;
    }

    #[constructor]
    fn constructor(ref self: ContractState, admin: ContractAddress, token: ContractAddress) {
        self.admin.write(admin);
        self.token_contract.write(token);
    }

    #[abi(embed_v0)]
    impl CompanyRegistryImpl of ICompanyRegistry<ContractState> {
        fn register_company(
            ref self: ContractState, name: felt252, location: felt252, initial_emissions: u256,
        ) {
            let company_address = get_caller_address();
            let company = CompanyData {
                name,
                location,
                emissions: initial_emissions,
                eco_score: DEFAULT_ECO_SCORE,
                min_tokens: initial_emissions,
            };
            self.companies.entry(company_address).write(company);
            self
                .emit(
                    Event::CompanyRegistered(CompanyRegistered { company: company_address, name }),
                );
        }

        fn update_eco_score(ref self: ContractState, company: ContractAddress, new_score: u32) {
            assert(get_caller_address() == self.admin.read(), 'Not authorized');
            let mut company_data = self.companies.entry(company).read();
            company_data.eco_score = new_score;
            self.companies.entry(company).write(company_data);

            self.emit(Event::EcoScoreUpdated(EcoScoreUpdated { company, new_score }));
        }

        fn update_emissions(
            ref self: ContractState, company: ContractAddress, new_emissions: u256,
        ) {
            assert(get_caller_address() == self.admin.read(), 'Not authorized');
            let mut company_data = self.companies.entry(company).read();
            company_data.emissions = new_emissions;
            company_data.min_tokens = new_emissions;
            self.companies.entry(company).write(company_data);
        }

        fn get_company_data(self: @ContractState, company: ContractAddress) -> CompanyData {
            self.companies.entry(company).read()
        }

        fn get_required_tokens(self: @ContractState, company: ContractAddress) -> u256 {
            let company_data = self.companies.entry(company).read();
            company_data.min_tokens
        }
    }
}
