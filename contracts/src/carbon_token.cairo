#[starknet::contract]
mod carbon_token {
    use starknet::{ContractAddress, get_caller_address, contract_address_const};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };

    #[storage]
    struct Storage {
        _name: felt252,
        _symbol: felt252,
        _total_supply: u256,
        _balances: Map<ContractAddress, u256>,
        _allowances: Map<(ContractAddress, ContractAddress), u256>,
        owner: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Transfer: Transfer,
        Approval: Approval,
    }

    #[derive(Drop, starknet::Event)]
    struct Transfer {
        from: ContractAddress,
        to: ContractAddress,
        value: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct Approval {
        owner: ContractAddress,
        spender: ContractAddress,
        value: u256,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState, name: felt252, symbol: felt252, owner: ContractAddress,
    ) {
        self._name.write(name);
        self._symbol.write(symbol);
        self._total_supply.write(0.into());
        self.owner.write(owner);
    }

    #[starknet::interface]
    trait IERC20<TContractState> {
        fn name(self: @TContractState) -> felt252;
        fn symbol(self: @TContractState) -> felt252;
        fn decimals(self: @TContractState) -> u8;
        fn total_supply(self: @TContractState) -> u256;
        fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
        fn allowance(
            self: @TContractState, owner: ContractAddress, spender: ContractAddress,
        ) -> u256;
        fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
        fn transfer_from(
            ref self: TContractState,
            sender: ContractAddress,
            recipient: ContractAddress,
            amount: u256,
        ) -> bool;
        fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
        fn mint(ref self: TContractState, to: ContractAddress, amount: u256);
        fn burn(ref self: TContractState, from: ContractAddress, amount: u256);
    }

    #[abi(embed_v0)]
    impl CarbonTokenImpl of IERC20<ContractState> {
        fn name(self: @ContractState) -> felt252 {
            self._name.read()
        }

        fn symbol(self: @ContractState) -> felt252 {
            self._symbol.read()
        }

        fn decimals(self: @ContractState) -> u8 {
            18_u8
        }

        fn total_supply(self: @ContractState) -> u256 {
            self._total_supply.read()
        }

        fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
            self._balances.entry(account).read()
        }

        fn allowance(
            self: @ContractState, owner: ContractAddress, spender: ContractAddress,
        ) -> u256 {
            self._allowances.entry((owner, spender)).read()
        }

        fn transfer(ref self: ContractState, recipient: ContractAddress, amount: u256) -> bool {
            let sender = get_caller_address();
            self._transfer(sender, recipient, amount);
            true
        }

        fn transfer_from(
            ref self: ContractState,
            sender: ContractAddress,
            recipient: ContractAddress,
            amount: u256,
        ) -> bool {
            let caller = get_caller_address();
            let current_allowance = self._allowances.entry((sender, caller)).read();
            assert(current_allowance >= amount, 'Insufficient allowance');
            self._allowances.entry((sender, caller)).write(current_allowance - amount);
            self._transfer(sender, recipient, amount);
            true
        }

        fn approve(ref self: ContractState, spender: ContractAddress, amount: u256) -> bool {
            let owner = get_caller_address();
            self._approve(owner, spender, amount);
            true
        }

        fn mint(ref self: ContractState, to: ContractAddress, amount: u256) {
            assert(get_caller_address() == self.owner.read(), 'Not authorized');
            self._mint(to, amount);
        }

        fn burn(ref self: ContractState, from: ContractAddress, amount: u256) {
            assert(get_caller_address() == self.owner.read(), 'Not authorized');
            self._burn(from, amount);
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn _transfer(
            ref self: ContractState,
            sender: ContractAddress,
            recipient: ContractAddress,
            amount: u256,
        ) {
            assert(sender != contract_address_const::<0>(), 'Transfer from zero');
            assert(recipient != contract_address_const::<0>(), 'Transfer to zero');

            let sender_balance = self._balances.entry(sender).read();
            assert(sender_balance >= amount, 'Insufficient balance');

            self._balances.entry(sender).write(sender_balance - amount);
            let recipient_balance = self._balances.entry(recipient).read();
            self._balances.entry(recipient).write(recipient_balance + amount);

            self.emit(Event::Transfer(Transfer { from: sender, to: recipient, value: amount }));
        }

        fn _approve(
            ref self: ContractState, owner: ContractAddress, spender: ContractAddress, amount: u256,
        ) {
            assert(owner != contract_address_const::<0>(), 'Approve from zero');
            assert(spender != contract_address_const::<0>(), 'Approve to zero');

            self._allowances.entry((owner, spender)).write(amount);
            self.emit(Event::Approval(Approval { owner, spender, value: amount }));
        }

        fn _mint(ref self: ContractState, to: ContractAddress, amount: u256) {
            assert(to != contract_address_const::<0>(), 'Mint to zero');

            let total_supply = self._total_supply.read();
            self._total_supply.write(total_supply + amount);

            let recipient_balance = self._balances.entry(to).read();
            self._balances.entry(to).write(recipient_balance + amount);

            self
                .emit(
                    Event::Transfer(
                        Transfer { from: contract_address_const::<0>(), to, value: amount },
                    ),
                );
        }

        fn _burn(ref self: ContractState, from: ContractAddress, amount: u256) {
            assert(from != contract_address_const::<0>(), 'Burn from zero');

            let from_balance = self._balances.entry(from).read();
            assert(from_balance >= amount, 'Burn amount exceeds balance');

            self._balances.entry(from).write(from_balance - amount);
            let total_supply = self._total_supply.read();
            self._total_supply.write(total_supply - amount);

            self
                .emit(
                    Event::Transfer(
                        Transfer { from, to: contract_address_const::<0>(), value: amount },
                    ),
                );
        }
    }
}
