import { toBigInt } from "ethers";

export function felt252ToStr(felt: string) {
  let hex = toBigInt(felt).toString(16);
  if (hex.length % 2 !== 0) hex = "0" + hex;
  return Buffer.from(hex, "hex").toString("utf-8");
}

// export function strToFelt252(str: string) {
//   return "0x" + Buffer.from(str, "utf8").toString("hex");
// }                     //I changed the function to the one below to fix the error

export const strToFelt252 = (str: string): string => {
    const encoded = Buffer.from(str, "utf-8").toString("hex"); // Encode string to hex
    const feltValue = "0x" + encoded; // Prefix with 0x for a valid felt252 representation
    return BigInt(feltValue).toString(); // Convert to BigInt and return as string
};