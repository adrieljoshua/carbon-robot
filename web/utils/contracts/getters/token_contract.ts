import { token_contract } from "../contractHelper";
import { felt252ToStr } from "../tools";

export const getTokenName = async () => {
  const token_name = await token_contract.name({
    parseResponse: true,
  });
  const token_name_string = felt252ToStr(token_name.toString());
  return token_name_string;
};

export const getTokenSymbol = async () => {
  const symbol = await token_contract.symbol({
    parseResponse: true,
  });
  const symbol_string = felt252ToStr(symbol.toString());
  return symbol_string;
};

export const getTokenDecimals = async () => {
  const decimals = await token_contract.decimals({
    parseResponse: true,
  });
  return decimals;
};

export const getTokenTotalSupply = async () => {
  const total_supply = await token_contract.totalSupply({
    parseResponse: true,
  });
  return total_supply;
};
export const getTokenBalance = async (address: string) => {
  const balance = await token_contract.balance_of({
    address,
    parseResponse: true,
  });
  return balance;
};
