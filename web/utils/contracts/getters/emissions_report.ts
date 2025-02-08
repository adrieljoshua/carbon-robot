import { emission_reporting_contract } from "../contractHelper";
import { strToFelt252 } from "../tools";

export const getLatestReport = async (company: string) => {
  const company_felt = strToFelt252(company);
  const response = await emission_reporting_contract.get_latest_report(
    company_felt,
    {
      parseResponse: true,
    }
  );
  return response;
};

export const getFlightPath = async (device_id: string) => {
  const deviceid_felt = strToFelt252(device_id);
  const response = await emission_reporting_contract.get_flight_path(
    deviceid_felt,
    {
      parseResponse: true,
    }
  );
  return response;
};
