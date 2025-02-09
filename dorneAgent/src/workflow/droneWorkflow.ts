import { ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { Coordinates } from "../types";
import { emissionAnalysisAgent } from "../agents/emissionAnalysisAgent";
import { pathPlanningAgent } from "../agents/pathPlanningAgent";
import { weatherAgent } from "../agents/weatherAgent";

export const createDroneWorkflow = (location: Coordinates, radius: number) => {
  const zee = new ZeeWorkflow({
    description: "Drone emission monitoring workflow",
    output:
      "The goal of this workflow is to plan and execute drone-based emission monitoring, analyze the collected data, and prepare it for blockchain submission",
    agents: {
      weatherAgent,
      pathPlanningAgent,
      emissionAnalysisAgent,
    },
  });

  return ZeeWorkflow.run(zee);
};
