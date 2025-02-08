import json
from fastapi import APIRouter, HTTPException
from .models import DeviceVerification, EmissionData
from .nildbapi import NilDBAPI
from .secret_vault_storage import PrivateKeyStorage
from pydantic import BaseModel

from .config import NODE_CONFIG
from .define_collection import define_collection
storage = PrivateKeyStorage()

router = APIRouter()
nildb = NilDBAPI(NODE_CONFIG) 
class KeyRetrievalRequest(BaseModel):
    node_name: str
    public_key: str
    schema: str

class KeyPairRequest(BaseModel):
    node_name: str
    public_key: str
    private_key: str

class RetrieveKeyRequest(BaseModel):
    node_name: str
    public_key: str

@router.post("/init-schema")
async def initialize_schema():
    """
    Initializes the database schema in NilDB.
    Creates the necessary tables for device verification and emissions.
    """
    try:
        schema=json.load(open('/Users/romariokavin/Documents/PersonalProjects/carbonRobots/nillion_secret_vault/app/schema.json', 'r'));
        if not schema:
            raise HTTPException(status_code=500, detail="Schema not found")
        schemaid=define_collection(schema)
        return {"message": "Schema initialized successfully", "schema_id": schemaid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/store-key-pair")
async def store_key_pair(request: KeyPairRequest):
    """
    Encrypts and stores a key pair using NilQL secret sharing.
    """
    try:
        print(f"🟢 store_key_pair: Node: {request.node_name}, Public Key: {request.public_key}, Schema: {storage.schema_id}")

        if request.node_name not in NODE_CONFIG:
            print(f"❌ Invalid node name: {request.node_name}")
            raise HTTPException(status_code=400, detail="Invalid node name")

        success = storage.store_key_pair(request.node_name, request.public_key, request.private_key, storage.schema_id)

        if success:
            print("✅ Key pair stored successfully!")
            return {"message": "Key pair stored successfully"}
        else:
            print("❌ Failed to store key pair due to an unknown reason.")
            raise HTTPException(status_code=500, detail="Failed to store key pair")

    except Exception as e:
        print(f"🔥 Error in store_key_pair: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/get-private-key")
async def get_private_key(request: KeyRetrievalRequest):
    """Retrieve the private key using JSON request body"""
    try:
        node_name = request.node_name
        public_key = request.public_key
        schema = request.schema

        private_key = storage.get_private_key(node_name, public_key, schema)
    
        if private_key:
            return {"private_key": private_key}
        else:
            raise HTTPException(status_code=404, detail="Private key not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving private key: {str(e)}")

@router.post("/register-device")
async def register_device(device: DeviceVerification):
    """
    Register a device with its UUID, public key, and encrypted private key.
    """
    try:
        device_data = {
            "uuid": device.uuid,
            "public_key": device.public_key,
            "encrypted_private_key": device.encrypted_private_key,
            "pin": device.pin
        }
        nildb.data_upload(f"device_{device.uuid}", device_data)
        return {"message": "Device registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/get-device/{uuid}")
async def get_device(uuid: str):
    """
    Retrieve device details using UUID.
    """
    try:
        device_data = nildb.data_read(f"device_{uuid}")
        if not device_data:
            raise HTTPException(status_code=404, detail="Device not found")
        return device_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

