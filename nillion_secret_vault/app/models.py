from pydantic import BaseModel, UUID4

class DeviceVerification(BaseModel):
    uuid: UUID4
    public_key: str
    pin: str

class EmissionData(BaseModel):
    lidar_data: str
    co2_thermal_data: str
    setpoint: str