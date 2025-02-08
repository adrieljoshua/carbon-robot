import { Call } from "starknet";
import { strToFelt252 } from "../tools";
import { device_registry_contract } from "../contractHelper";

export const registerDevice = async (device_id: string, public_key: string) => {
  const feltdeviceid = strToFelt252(device_id);
  const myCall: Call = device_registry_contract.populate("register_device", {
    device_id: feltdeviceid,
    public_key: public_key,
  });
  return myCall;
};
export const deactivateDevice = async (device_id: string) => {
  const feltdeviceid = strToFelt252(device_id);
  const myCall: Call = device_registry_contract.populate("deactivate_device", {
    device_id: feltdeviceid,
  });
  return myCall;
};
