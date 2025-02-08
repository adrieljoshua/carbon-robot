import json
import uuid
from  .config import NODE_CONFIG
from .nildbapi import NilDBAPI

# Initialize services
nildb_api = NilDBAPI(NODE_CONFIG)

def define_collection(schema: dict) -> str:
    """Define a collection and register it on the nodes."""
    try:
        schema_id = str(uuid.uuid4())

        success = True
        for node_name in NODE_CONFIG.keys():
            payload = {
                "_id": schema_id,
                "name": "Key Storage",
                "keys": ["_id"],
                "schema": schema,
            }
            if not nildb_api.create_schema(node_name, payload):
                success = False
                break

        print(f"Schema ID: {schema_id}")
        return schema_id if success else None
    except Exception as e:
        print(f"Error creating schema: {str(e)}")
        return None

if __name__ == "__main__":
    define_collection(json.load(open('schema.json', 'r')))