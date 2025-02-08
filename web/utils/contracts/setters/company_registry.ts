import { Call, Uint256 } from "starknet";
import { company_registry_contract } from "../contractHelper";
import { strToFelt252 } from "../tools";

export const createCompany = async (
  name: string,
  location: string,
  initial_emissions: Uint256
) => {
  const feltname = strToFelt252(name);
  const feltlocation = strToFelt252(location);
  const myCall: Call = company_registry_contract.populate("register_company", {
    name: feltname,
    location: feltlocation,
    initial_emissions: initial_emissions,
  });
  return myCall;
};

export const updateEcoScore = async (company: string, newScore: number) => {
  const myCall: Call = company_registry_contract.populate("update_eco_score", {
    company: company,
    new_score: newScore,
  });
  return myCall;
};

export const updateEmissions = async (
  company: string,
  newEmissions: number
) => {
  const myCall: Call = company_registry_contract.populate("update_eco_score", {
    company: company,
    new_emissions: newEmissions,
  });
  return myCall;
};
