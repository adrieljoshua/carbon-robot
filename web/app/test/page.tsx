"use client";
import { useWallet } from "@/utils/context/WalletContext";
import {
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getTokenTotalSupply,
  getTokenBalance,
} from "@/utils/contracts/getters/token_contract";
import {
  createCompany,
  updateEcoScore,
  updateEmissions,
} from "@/utils/contracts/setters/company_registry";
import {
  registerDevice,
  deactivateDevice,
} from "@/utils/contracts/setters/device_registry";
import {
  submitReport,
  updateFlightPath,
} from "@/utils/contracts/setters/emissions_report";
import {
  transfer,
  transferFrom,
  approve,
  mint,
  burn,
} from "@/utils/contracts/setters/token_contract";
import { felt252ToStr, strToFelt252 } from "@/utils/contracts/tools";
import { useEffect, useState } from "react";
import { Uint256 } from "starknet";
export function TestEnvironment() {
  const { connectWallet, isConnected, address, walletAccount } = useWallet();
  const [tokenName, setTokenName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    const fetchTokenData = async () => {
      const name = await getTokenName();
      name && setTokenName(name);
      if (address) {
        const bal = await getTokenBalance(address);
        setBalance(bal);
      }
    };
    fetchTokenData();
  }, [address]);
  const createNewCompany = async () => {
    const amount: Uint256 = { low: 100, high: 0 };
    const myCall = await createCompany("MyCompany", "New York", amount);
    const response = await walletAccount?.execute(myCall);
    console.log(response);
  };
  const registerNewDevice = async () => {
    const myCall = await registerDevice("device123", "public_key_value");
    const response = await walletAccount?.execute(myCall);
    console.log(response);
  };
  const submitEmissionReport = async () => {
    const myCall = await submitReport(
      "device123",
      500,
      "New York",
      "signature_hash"
    );
    const response = await walletAccount?.execute(myCall);
    console.log(response);
  };
  const handleTransfer = async () => {
    const myCall = await transfer("0xRecipientAddress", 50);
    const response = await walletAccount?.execute(myCall);
    console.log(response);
  };
  return (
    <div>
      {!isConnected ? (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
          <h1>Token Name: {tokenName}</h1>
        </div>
      ) : (
        <div>
          <div>Connected: {address}</div>
          <h2>Balance: {balance}</h2>
          <button onClick={createNewCompany}>Create Company</button>
          <button onClick={registerNewDevice}>Register Device</button>
          <button onClick={submitEmissionReport}>Submit Report</button>
          <button onClick={handleTransfer}>Transfer Tokens</button>
        </div>
      )}
    </div>
  );
}
export default TestEnvironment;
