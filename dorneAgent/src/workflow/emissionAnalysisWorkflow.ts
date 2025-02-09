import { ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { Coordinates, EmissionResult } from "../types";
import { emissionAnalysisAgent } from "../agents/emissionAnalysisAgent";
import { weatherAgent } from "../agents/weatherAgent";

export const createEmissionAnalysisWorkflow = async (location: Coordinates) => {
  const zee = new ZeeWorkflow({
    description: `Analyze emission levels based on weather conditions ${location}`,
    output:
      "The goal is to determine the emission level (1-100) for a location",
    agents: {
      weatherAgent,
      emissionAnalysisAgent,
    },
  });

  const result = await ZeeWorkflow.run(zee);
  return result;
};
