export const token_contract_abi = [
  {
    type: "impl",
    name: "CarbonTokenImpl",
    interface_name: "carbonrobots::carbon_token::carbon_token::IERC20",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "interface",
    name: "carbonrobots::carbon_token::carbon_token::IERC20",
    items: [
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "total_supply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "allowance",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "mint",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "burn",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "symbol",
        type: "core::felt252",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::carbon_token::carbon_token::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::carbon_token::carbon_token::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::carbon_token::carbon_token::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "carbonrobots::carbon_token::carbon_token::Transfer",
        kind: "nested",
      },
      {
        name: "Approval",
        type: "carbonrobots::carbon_token::carbon_token::Approval",
        kind: "nested",
      },
    ],
  },
];

export const company_registry_abi = [
  {
    type: "impl",
    name: "CompanyRegistryImpl",
    interface_name:
      "carbonrobots::company_registry::company_registry::ICompanyRegistry",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "carbonrobots::company_registry::company_registry::CompanyData",
    members: [
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "location",
        type: "core::felt252",
      },
      {
        name: "emissions",
        type: "core::integer::u256",
      },
      {
        name: "eco_score",
        type: "core::integer::u32",
      },
      {
        name: "min_tokens",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "interface",
    name: "carbonrobots::company_registry::company_registry::ICompanyRegistry",
    items: [
      {
        type: "function",
        name: "register_company",
        inputs: [
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "location",
            type: "core::felt252",
          },
          {
            name: "initial_emissions",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "update_eco_score",
        inputs: [
          {
            name: "company",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "new_score",
            type: "core::integer::u32",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "update_emissions",
        inputs: [
          {
            name: "company",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "new_emissions",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_company_data",
        inputs: [
          {
            name: "company",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "carbonrobots::company_registry::company_registry::CompanyData",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_required_tokens",
        inputs: [
          {
            name: "company",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::company_registry::company_registry::CompanyRegistered",
    kind: "struct",
    members: [
      {
        name: "company",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "name",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::company_registry::company_registry::EcoScoreUpdated",
    kind: "struct",
    members: [
      {
        name: "company",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "new_score",
        type: "core::integer::u32",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::company_registry::company_registry::Event",
    kind: "enum",
    variants: [
      {
        name: "CompanyRegistered",
        type: "carbonrobots::company_registry::company_registry::CompanyRegistered",
        kind: "nested",
      },
      {
        name: "EcoScoreUpdated",
        type: "carbonrobots::company_registry::company_registry::EcoScoreUpdated",
        kind: "nested",
      },
    ],
  },
];

export const device_registry_abi = [
  {
    type: "impl",
    name: "DeviceRegistryImpl",
    interface_name:
      "carbonrobots::device_registry::device_registry::IDeviceRegistry",
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "carbonrobots::device_registry::device_registry::DeviceData",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "public_key",
        type: "core::felt252",
      },
      {
        name: "is_active",
        type: "core::bool",
      },
    ],
  },
  {
    type: "interface",
    name: "carbonrobots::device_registry::device_registry::IDeviceRegistry",
    items: [
      {
        type: "function",
        name: "register_device",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
          {
            name: "public_key",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "deactivate_device",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "is_device_active",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_device_data",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "carbonrobots::device_registry::device_registry::DeviceData",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "verify_device_signature",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
          {
            name: "message",
            type: "core::felt252",
          },
          {
            name: "signature",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "company_registry",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::device_registry::device_registry::DeviceRegistered",
    kind: "struct",
    members: [
      {
        name: "device_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::device_registry::device_registry::DeviceDeactivated",
    kind: "struct",
    members: [
      {
        name: "device_id",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::device_registry::device_registry::Event",
    kind: "enum",
    variants: [
      {
        name: "DeviceRegistered",
        type: "carbonrobots::device_registry::device_registry::DeviceRegistered",
        kind: "nested",
      },
      {
        name: "DeviceDeactivated",
        type: "carbonrobots::device_registry::device_registry::DeviceDeactivated",
        kind: "nested",
      },
    ],
  },
];

export const emission_reporting_abi = [
  {
    type: "impl",
    name: "EmissionReportingImpl",
    interface_name:
      "carbonrobots::emission_reporting::emission_reporting::IEmissionReporting",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "carbonrobots::emission_reporting::emission_reporting::EmissionReport",
    members: [
      {
        name: "device_id",
        type: "core::felt252",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
      },
      {
        name: "emissions",
        type: "core::integer::u256",
      },
      {
        name: "location",
        type: "core::felt252",
      },
      {
        name: "signature",
        type: "core::felt252",
      },
    ],
  },
  {
    type: "interface",
    name: "carbonrobots::emission_reporting::emission_reporting::IEmissionReporting",
    items: [
      {
        type: "function",
        name: "submit_report",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
          {
            name: "emissions",
            type: "core::integer::u256",
          },
          {
            name: "location",
            type: "core::felt252",
          },
          {
            name: "signature",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_latest_report",
        inputs: [
          {
            name: "company",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "carbonrobots::emission_reporting::emission_reporting::EmissionReport",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "update_flight_path",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
          {
            name: "new_path",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_flight_path",
        inputs: [
          {
            name: "device_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "device_registry",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "company_registry",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "carbon_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::emission_reporting::emission_reporting::EmissionReported",
    kind: "struct",
    members: [
      {
        name: "company",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "device_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "emissions",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::emission_reporting::emission_reporting::FlightPathUpdated",
    kind: "struct",
    members: [
      {
        name: "device_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "path",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "carbonrobots::emission_reporting::emission_reporting::Event",
    kind: "enum",
    variants: [
      {
        name: "EmissionReported",
        type: "carbonrobots::emission_reporting::emission_reporting::EmissionReported",
        kind: "nested",
      },
      {
        name: "FlightPathUpdated",
        type: "carbonrobots::emission_reporting::emission_reporting::FlightPathUpdated",
        kind: "nested",
      },
    ],
  },
];
