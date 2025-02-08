from pydantic import BaseModel, UUID4
from datetime import datetime

class DeviceVerification(BaseModel):
    uuid: UUID4
    public_key: str
    pin: str

class EmissionData(BaseModel):
    lidar_data: str
    co2_thermal_data: str
    setpoint: str

class KeyPair(BaseModel):
    _id: UUID4
    public_key: str
    encrypted_private_key: str
    created_at: datetime = datetime.utcnow()
