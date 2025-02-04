# Carbon Credit Token Contract
#[starknet::contract]
mod CarbonCreditToken {
    use starknet::ContractAddress;
    use zeroable::Zeroable;
    use starknet::get_caller_address;
    use integer::BoundedInt;

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

    #[storage]
    struct Storage {
        _name: felt252,
        _symbol: felt252,
        _total_supply: u256,
        _balances: LegacyMap<ContractAddress, u256>,
        _allowances: LegacyMap<(ContractAddress, ContractAddress), u256>,
        admin: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        symbol: felt252,
        admin: ContractAddress
    ) {
        self._name.write(name);
        self._symbol.write(symbol);
        self.admin.write(admin);
    }

    #[external(v0)]
    fn name(self: @ContractState) -> felt252 {
        self._name.read()
    }

    #[external(v0)]
    fn symbol(self: @ContractState) -> felt252 {
        self._symbol.read()
    }

    #[external(v0)]
    fn total_supply(self: @ContractState) -> u256 {
        self._total_supply.read()
    }

    #[external(v0)]
    fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
        self._balances.read(account)
    }

    #[external(v0)]
    fn allowance(
        self: @ContractState,
        owner: ContractAddress,
        spender: ContractAddress
    ) -> u256 {
        self._allowances.read((owner, spender))
    }

    #[external(v0)]
    fn mint(ref self: ContractState, to: ContractAddress, amount: u256) {
        assert(get_caller_address() == self.admin.read(), 'Only admin can mint');
        let balance = self._balances.read(to);
        self._balances.write(to, balance + amount);
        self._total_supply.write(self._total_supply.read() + amount);
        
        self.emit(Event::Transfer(Transfer { from: Zeroable::zero(), to, value: amount }));
    }

    #[external(v0)]
    fn transfer(ref self: ContractState, recipient: ContractAddress, amount: u256) -> bool {
        let sender = get_caller_address();
        self._transfer(sender, recipient, amount);
        true
    }

    #[external(v0)]
    fn transfer_from(
        ref self: ContractState,
        sender: ContractAddress,
        recipient: ContractAddress,
        amount: u256
    ) -> bool {
        let caller = get_caller_address();
        let current_allowance = self._allowances.read((sender, caller));
        assert(current_allowance >= amount, 'Insufficient allowance');
        self._approve(sender, caller, current_allowance - amount);
        self._transfer(sender, recipient, amount);
        true
    }

    #[external(v0)]
    fn approve(ref self: ContractState, spender: ContractAddress, amount: u256) -> bool {
        let owner = get_caller_address();
        self._approve(owner, spender, amount);
        true
    }

    fn _transfer(
        ref self: ContractState,
        sender: ContractAddress,
        recipient: ContractAddress,
        amount: u256
    ) {
        assert(!sender.is_zero(), 'Transfer from 0');
        assert(!recipient.is_zero(), 'Transfer to 0');
        let sender_balance = self._balances.read(sender);
        assert(sender_balance >= amount, 'Insufficient balance');
        self._balances.write(sender, sender_balance - amount);
        self._balances.write(recipient, self._balances.read(recipient) + amount);
        
        self.emit(Event::Transfer(Transfer { from: sender, to: recipient, value: amount }));
    }

    fn _approve(
        ref self: ContractState,
        owner: ContractAddress,
        spender: ContractAddress,
        amount: u256
    ) {
        assert(!owner.is_zero(), 'Approve from 0');
        assert(!spender.is_zero(), 'Approve to 0');
        self._allowances.write((owner, spender), amount);
        
        self.emit(Event::Approval(Approval { owner, spender, value: amount }));
    }
}