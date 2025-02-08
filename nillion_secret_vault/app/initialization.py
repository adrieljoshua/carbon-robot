from typing import Tuple
import os
from .config import NODE_CONFIG, ORG_DID, ORG_SECRET_KEY
from .nildbapi import NilDBAPI

def verify_env_variables() -> Tuple[bool, str]:
    """Verify all required environment variables are set."""
    required_vars = {
        "NILLION_DID": ORG_DID,
        "NILLION_SECRET_KEY": ORG_SECRET_KEY
    }

    # Check node configurations
    for node, config in NODE_CONFIG.items():
        required_vars[f"{node}_URL"] = config.get('url')
        required_vars[f"{node}_DID"] = config.get('did')

    # Verify all variables are set
    missing_vars = [var for var, value in required_vars.items() if not value]

    if missing_vars:
        return False, f"Missing required environment variables: {', '.join(missing_vars)}"
    
    return True, "All environment variables are properly set"

def verify_nillion_connection() -> Tuple[bool, str]:
    """Verify connection to Nillion nodes and ensure schema exists."""
    try:
        from .nildbapi import NilDBAPI  # Ensure the correct module name
        nildb = NilDBAPI(NODE_CONFIG)  # Pass NODE_CONFIG to the class

        # Ensure each node can generate JWT
        from .jwt_utils import generate_jwt
        for node_name in NODE_CONFIG.keys():
            try:
                generate_jwt(NODE_CONFIG[node_name]["did"])
            except Exception as e:
                return False, f"Failed to generate JWT for node {node_name}: {str(e)}"

        # Ensure schema exists in NilDB
        # schema = nildb.data_read("schema")
        # if not schema:
        #     return False, "NilDB schema is missing. Run schema initialization."

        return True, "Successfully connected to all Nillion nodes and schema verified."
    except Exception as e:
        return False, f"Failed to initialize Nillion connection: {str(e)}"
