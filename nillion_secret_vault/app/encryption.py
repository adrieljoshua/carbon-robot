"""Encryption utilities using nilql for secret sharing."""
import nilql
from typing import List

class DataEncryption:
    def __init__(self, num_nodes: int):
        self.num_nodes = num_nodes
        self.secret_key = nilql.ClusterKey.generate({'nodes': [{}] * num_nodes}, {'store': True})

    def encrypt_private_key(self, private_key: str) -> List[str]:
        """Encrypt a private key using secret sharing."""
        try:
            encrypted_shares = nilql.encrypt(self.secret_key, private_key)
            return list(encrypted_shares)
        except Exception as e:
            raise Exception(f"Encryption failed: {str(e)}")

    def decrypt_private_key(self, encrypted_shares: List[str]) -> str:
        """Decrypt private key from shares."""
        try:
            return str(nilql.decrypt(self.secret_key, encrypted_shares))
        except Exception as e:
            raise Exception(f"Decryption failed: {str(e)}")
