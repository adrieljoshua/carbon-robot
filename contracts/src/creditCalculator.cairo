# Credit Calculation Contract
#[starknet::contract]
mod CreditCalculation {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use traits::Into;
    use integer::u256_from_felt252;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        EmissionRateSet: EmissionRateSet,
        CreditsCalculated: CreditsCalculated,
    }

    #[derive(Drop, starknet::Event)]
    struct EmissionRateSet {
        industry_type: felt252,
        rate: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct CreditsCalculated {
        company: ContractAddress,
        amount: u256,
        timestamp: u64,
    }

    #[storage]
    struct Storage {
        carbon_token: ContractAddress,
        admin: ContractAddress,
        emission_rates: LegacyMap<felt252, u256>,
        approved_companies: LegacyMap<ContractAddress, bool>,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        carbon_token: ContractAddress,
        admin: ContractAddress
    ) {
        self.carbon_token.write(carbon_token);
        self.admin.write(admin);
    }

    #[external(v0)]
    fn calculate_credits(
        ref self: ContractState,
        industry_type: felt252,
        emission_data: u256,
        time_period: u256
    ) -> u256 {
        assert(self.approved_companies.read(get_caller_address()), 'Company not approved');
        
        let base_rate = self.emission_rates.read(industry_type);
        let expected_emission = base_rate * time_period;
        let mut credit_amount = 0_u256;
        
        if emission_data < expected_emission {
            credit_amount = expected_emission - emission_data;
            
            // Mint carbon credits to the company
            ICarbonTokenDispatcher {
                contract_address: self.carbon_token.read()
            }.mint(get_caller_address(), credit_amount);
            
            self.emit(Event::CreditsCalculated(
                CreditsCalculated {
                    company: get_caller_address(),
                    amount: credit_amount,
                    timestamp: starknet::get_block_timestamp()
                }
            ));
        }
        
        credit_amount
    }

    #[external(v0)]
    fn set_emission_rate(
        ref self: ContractState,
        industry_type: felt252,
        rate: u256
    ) {
        assert(get_caller_address() == self.admin.read(), 'Only admin');
        self.emission_rates.write(industry_type, rate);
        
        self.emit(Event::EmissionRateSet(EmissionRateSet { industry_type, rate }));
    }

    #[external(v0)]
    fn approve_company(ref self: ContractState, company: ContractAddress) {
        assert(get_caller_address() == self.admin.read(), 'Only admin');
        self.approved_companies.write(company, true);
    }
}

#[starknet::interface]
trait ICarbonToken {
    fn mint(ref self: ContractState, to: ContractAddress, amount: u256);
}