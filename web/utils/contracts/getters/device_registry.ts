import { device_registry_contract } from "../contractHelper";
import { strToFelt252 } from "../tools";

export const isDeviceActive = async (device_id: string) => {
  const deviceid_felt = strToFelt252(device_id);
  const response = await device_registry_contract.is_device_active(
    deviceid_felt,
    {
      parseResponse: true,
    }
  );
  return response;
};
export const getDeviceData = async (device_id: string) => {
  const deviceid_felt = strToFelt252(device_id);
  const response = await device_registry_contract.get_device_data(
    deviceid_felt,
    {
      parseResponse: true,
    }
  );
  return response;
};
