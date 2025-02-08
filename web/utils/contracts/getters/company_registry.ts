import { company_registry_contract } from "../contractHelper";

export const getCompanyData = async (address: string) => {
  const response = await company_registry_contract.get_company_data(address, {
    parseResponse: true,
  });
  return response;
};

export const getCompanyReqTokens = async (address: string) => {
  const response = await company_registry_contract.get_required_tokens(
    address,
    {
      parseResponse: true,
    }
  );
  return response;
};
