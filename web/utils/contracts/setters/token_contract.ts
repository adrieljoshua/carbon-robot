import { Call } from "starknet";
import { token_contract } from "../contractHelper";

export const transfer = async (recipient: string, amount: number) => {
  const myCall: Call = token_contract.populate("transfer", {
    recipient: recipient,
    amount: amount,
  });

  return myCall;
};

export const transferFrom = async (
  sender: string,
  recipient: string,
  amount: number
) => {
  const myCall: Call = token_contract.populate("transfer_from", {
    sender: sender,
    recipient: recipient,
    amount: amount,
  });

  return myCall;
};

export const approve = async (spender: string, amount: number) => {
  const myCall: Call = token_contract.populate("approve", {
    spender: spender,
    amount: amount,
  });

  return myCall;
};

export const mint = async (to: string, amount: number) => {
  const myCall: Call = token_contract.populate("mint", {
    to: to,
    amount: amount,
  });

  return myCall;
};

export const burn = async (from: string, amount: number) => {
  const myCall: Call = token_contract.populate("burn", {
    from: from,
    amount: amount,
  });

  return myCall;
};
