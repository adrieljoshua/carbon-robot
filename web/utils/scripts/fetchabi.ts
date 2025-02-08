// scripts/fetchAbis.js
import { RpcProvider } from "starknet";
import fs from "fs/promises";
import path from "path";
import {
  company_registry_address,
  device_registry_address,
  emission_reporting_address,
  token_contract_address,
} from "../contracts/deployments";

// Contract addresses
const contracts = {
  token_contract_address,
  company_registry_address,
  device_registry_address,
  emission_reporting_address,
};

async function fetchAndSaveAbis() {
  try {
    const provider = new RpcProvider({
      nodeUrl: "https://alpha4.starknet.io",
    });

    // Create abis directory if it doesn't exist
    const abiDir = path.join(process.cwd(), "app/utils/contracts/abis");
    await fs.mkdir(abiDir, { recursive: true });

    // Fetch and save ABI for each contract
    for (const [name, address] of Object.entries(contracts)) {
      console.log(`Fetching ABI for ${name} contract...`);

      try {
        // Get contract class
        const contractClass = await provider.getClassAt(address);

        // Save ABI to file
        const abiPath = path.join(abiDir, `${name}.json`);
        await fs.writeFile(abiPath, JSON.stringify(contractClass.abi, null, 2));

        console.log(`✅ Saved ${name} ABI to ${abiPath}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`❌ Error fetching ABI for ${name}:`, error.message);
        } else {
          console.error(`❌ Error fetching ABI for ${name}:`, error);
        }
      }
    }

    // Create index file to export all ABIs
    const indexContent = Object.keys(contracts)
      .map((name) => `export { default as ${name}Abi } from './${name}.json';`)
      .join("\n");

    await fs.writeFile(path.join(abiDir, "index.ts"), indexContent + "\n");

    console.log("\n✨ All ABIs have been fetched and saved!");
  } catch (error) {
    console.error("Failed to fetch ABIs:", error);
    process.exit(1);
  }
}

// Run the script
fetchAndSaveAbis();
