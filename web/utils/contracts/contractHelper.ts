import { RpcProvider, Contract, json } from "starknet";
import {
  token_contract_address,
  company_registry_address,
  device_registry_address,
  emission_reporting_address,
} from "./deployments";
import {
  company_registry_abi,
  device_registry_abi,
  emission_reporting_abi,
  token_contract_abi,
} from "./abis/abis";
export const local_provider = new RpcProvider({
  nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
});
export const compiledTokenContractAbi = { abi: token_contract_abi };

export const compiledCompanyRegistryContractAbi = { abi: company_registry_abi };

export const compiledDeviceRegistryContractAbi = { abi: device_registry_abi };
export const compiledEmissionReportingContractAbi = {
  abi: emission_reporting_abi,
};
export const token_contract = new Contract(
  compiledTokenContractAbi.abi,
  token_contract_address,
  local_provider
);
export const company_registry_contract = new Contract(
  compiledCompanyRegistryContractAbi.abi,
  company_registry_address,
  local_provider
);
export const device_registry_contract = new Contract(
  compiledDeviceRegistryContractAbi.abi,
  device_registry_address,
  local_provider
);
export const emission_reporting_contract = new Contract(
  compiledEmissionReportingContractAbi.abi,
  emission_reporting_address,
  local_provider
);
