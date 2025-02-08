import json
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List
from .config import NODE_CONFIG
from .nildbapi import NilDBAPI
import nilql
import os

# Initialize NilDB API
nildb_api = NilDBAPI(NODE_CONFIG)

class PrivateKeyStorage:
    """Handles private key encryption and storage using NilDB API and Nillion."""
    
    def __init__(self):
        self.schema_id = self._get_or_create_schema()
        self.secret_key = nilql.ClusterKey.generate({'nodes': [{}] * len(NODE_CONFIG)}, {'store': True})
    
    def _get_or_create_schema(self) -> str:
        """Create schema if it does not exist."""
        SCHEMA_FILE_PATH = "data/nillion_private_key_schema.txt"
        
        try:
            os.makedirs("data", exist_ok=True)
            if os.path.exists(SCHEMA_FILE_PATH):
                with open(SCHEMA_FILE_PATH, 'r') as f:
                    schema_id = f.read().strip()
                    if schema_id:
                        print(f"🟢 Using existing schema ID: {schema_id}")
                        return schema_id

            print("🟡 Creating new schema...")

            PRIVATE_KEY_SCHEMA = {  # JSON Schema definition
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "_id": {"type": "string", "format": "uuid", "coerce": True},
                        "public_key": {"type": "string"},
                        "encrypted_private_key": {"type": "string"},
                        "created_at": {"type": "string", "format": "date-time", "coerce": True}
                    },
                    "required": ["_id", "public_key", "encrypted_private_key"],
                    "additionalProperties": False
                }
            }

            schema_id = str(uuid.uuid4())
            
            for node_name in NODE_CONFIG.keys():
                payload = {
                    "_id": schema_id,
                    "name": "private_key_storage",
                    "keys": ["_id"],
                    "schema": PRIVATE_KEY_SCHEMA
                }
                print(f"🔹 Creating schema on node: {node_name}, Schema ID: {schema_id}")
                nildb_api.create_schema(node_name, payload)

            with open(SCHEMA_FILE_PATH, 'w') as f:
                f.write(schema_id)

            print(f"✅ Created new schema with ID: {schema_id}")
            return schema_id

        except Exception as e:
            print(f"🔥 Error in _get_or_create_schema: {e}")
            raise

    def encrypt_private_key(self, private_key: str) -> List[str]:
        """Encrypt private key using secret sharing."""
        try:
            print(f"🔹 Encrypting private key: {private_key[:5]}***")  # Mask for security
            encrypted = list(nilql.encrypt(self.secret_key, private_key))
            print(f"✅ Encrypted shares generated: {encrypted}")
            return encrypted
        except Exception as e:
            print(f"🔥 Error encrypting private key: {e}")
            return []

    
    def decrypt_private_key(self, encrypted_shares: List[str]) -> str:
        """Decrypt stored private key."""
        return str(nilql.decrypt(self.secret_key, encrypted_shares))
    
    def store_key_pair(self, node_name: str, public_key: str, private_key: str, schema: str) -> bool:
        """Encrypt and store a private key in NilDB."""
        print(f"🟢 store_key_pair -> Node: {node_name}, Public Key: {public_key}, Schema: {schema}")
        try:
            if node_name not in NODE_CONFIG:
                print(f"❌ Invalid node name: {node_name}")
                return False

            encrypted_private_key = self.encrypt_private_key(private_key)
            if not encrypted_private_key:
                print("❌ Encryption failed, not storing key pair.")
                return False

            record = {
                "_id": str(uuid.uuid4()),
                "public_key": public_key,
                "encrypted_private_key": json.dumps(encrypted_private_key),
                # "created_at": datetime.now().isoformat()
            }
            print(f"🔹 Data to store: {record}")

            success = nildb_api.data_upload(node_name, schema, [record])
            if success:
                print("✅ Key pair stored successfully!")
                return True
            else:
                print("❌ NilDB API failed to store key pair.")
                print(success)
                return False

        except Exception as e:
            print(f"🔥 Error storing key pair: {e}")
            return False


    def get_private_key(self, node_name: str, public_key: str, schema: str) -> Optional[str]:
        """Retrieve and decrypt private key."""
        print(f"🟢 get_private_key -> Node: {node_name}, Public Key: {public_key}, Schema: {schema}")
        try:
            filter_dict = {"public_key": public_key}
            records = nildb_api.data_read(node_name, schema, filter_dict)

            if not records:
                print("❌ No records found for given public key.")
                return None

            record = records[0]
            print(f"🔹 Retrieved Record: {record}")

            decrypted_private_key = self.decrypt_private_key(json.loads(record["encrypted_private_key"]))
            print(f"✅ Decrypted private key: {decrypted_private_key[:5]}***")  # Mask for security

            return decrypted_private_key
        except Exception as e:
            print(f"🔥 Error retrieving private key: {e}")
            return None

