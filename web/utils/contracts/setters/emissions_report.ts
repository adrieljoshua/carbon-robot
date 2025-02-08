import { Call } from "starknet";
import { strToFelt252 } from "../tools";
import { emission_reporting_contract } from "../contractHelper";

export const submitReport = async (
  device_id: string,
  emissions: number,
  location: string,
  signature: string
) => {
  const feltdeviceid = strToFelt252(device_id);
  const feltLocation = strToFelt252(location);
  const feltSignature = strToFelt252(signature);

  const myCall: Call = emission_reporting_contract.populate("submit_report", {
    device_id: feltdeviceid,
    emissions: emissions,
    location: feltLocation,
    signature: feltSignature,
  });

  return myCall;
};

export const updateFlightPath = async (device_id: string, new_path: string) => {
  const feltdeviceid = strToFelt252(device_id);
  const feltNewPath = strToFelt252(new_path);

  const myCall: Call = emission_reporting_contract.populate(
    "update_flight_path",
    {
      device_id: feltdeviceid,
      new_path: feltNewPath,
    }
  );

  return myCall;
};
