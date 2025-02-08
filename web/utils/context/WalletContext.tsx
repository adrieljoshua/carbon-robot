"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
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
  const connectWallet = async () => {
    try {
      const starknet = await connect({
        modalMode: "alwaysAsk",
        modalTheme: "dark",
      });
      console.log(starknet);
      if (!starknet) {
        throw new Error("No wallet found");
      } else {
        const myWalletAccount = new WalletAccount(
          { nodeUrl: starknetrpc }, starknet 
        );
        setWalletAccount(myWalletAccount);
        setAddress(myWalletAccount.address);
        setProvider(starknet);
        setIsConnected(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
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
