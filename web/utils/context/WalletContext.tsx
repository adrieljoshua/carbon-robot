"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { connect, StarknetWindowObject } from "get-starknet";
import { WalletAccount } from "starknet";
import { starknetrpc } from "../contracts/deployments";

interface WalletContextType {
  provider: StarknetWindowObject | null;
  address: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  walletAccount: WalletAccount | null;
}

const defaultContext: WalletContextType = {
  provider: null,
  address: "",
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  walletAccount: null,
};

const WalletContext = createContext<WalletContextType>(defaultContext);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [provider, setProvider] = useState<StarknetWindowObject | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAccount, setWalletAccount] = useState<WalletAccount | null>(
    null
  );

  // Handle account changes
  const handleAccountsChanged = (accounts: string[] | undefined) => {
    if (accounts?.length) {
      setAddress(accounts[0]);
      console.log("Account changed:", accounts[0]);
    } else {
      setAddress("");
      setIsConnected(false);
    }
  };

  // Handle network changes
  const handleNetworkChanged = (chainId?: string, accounts?: string[]) => {
    if (provider) {
      const myWalletAccount = new WalletAccount(
        { nodeUrl: starknetrpc },
        provider
      );
      setWalletAccount(myWalletAccount);
      if (accounts?.length) {
        setAddress(accounts[0]);
        console.log("Network changed:", accounts[0]);
      }
    }
  };

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("networkChanged", handleNetworkChanged);

      // Initial account setup
      const getInitialAccount = async () => {
        try {
          const accounts = await provider.request({
            type: "wallet_requestAccounts",
          });
          if (Array.isArray(accounts) && accounts.length > 0) {
            setAddress(accounts[0]);
            console.log("Account changed:", accounts[0]);

            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error getting initial account:", error);
        }
      };

      getInitialAccount();

      return () => {
        provider.off("accountsChanged", handleAccountsChanged);
        provider.off("networkChanged", handleNetworkChanged);
      };
    }
  }, [provider]);

  const connectWallet = async () => {
    try {
      const starknet = await connect({
        modalMode: "alwaysAsk",
        modalTheme: "dark",
      });

      if (!starknet) {
        throw new Error("No wallet found");
      }

      // Request account access
      const accounts = await starknet.request({
        type: "wallet_requestAccounts",
      });

      const myWalletAccount = new WalletAccount(
        { nodeUrl: starknetrpc },
        starknet
      );

      setWalletAccount(myWalletAccount);
      setProvider(starknet);

      if (Array.isArray(accounts) && accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Wallet connection error:", error.message);
      } else {
        console.error("An unknown error occurred while connecting wallet");
      }
    }
  };

  const disconnectWallet = () => {
    if (provider) {
      provider.off("accountsChanged", handleAccountsChanged);
      provider.off("networkChanged", handleNetworkChanged);
    }
    setProvider(null);
    setWalletAccount(null);
    setAddress("");
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        address,
        isConnected,
        connectWallet,
        disconnectWallet,
        walletAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
