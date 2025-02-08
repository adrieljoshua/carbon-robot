from typing import List
from .encryption import DataEncryption

# Initialize the encryption module with 3 nodes (adjust as needed)
encryptor = DataEncryption(num_nodes=3)

def encrypt_private_key(private_key: str) -> List[str]:
    """Encrypt the private key using secret sharing with NilQL."""
    return encryptor.encrypt_private_key(private_key)

def decrypt_private_key(encrypted_shares: List[str]) -> str:
    """Decrypt the private key from shares using NilQL."""
    return encryptor.decrypt_private_key(encrypted_shares)
