import { toBigInt } from "ethers";

export function felt252ToStr(felt: string) {
  let hex = toBigInt(felt).toString(16);
  if (hex.length % 2 !== 0) hex = "0" + hex;
  return Buffer.from(hex, "hex").toString("utf-8");
}

export function strToFelt252(str: string) {
  return "0x" + Buffer.from(str, "utf8").toString("hex");
}
