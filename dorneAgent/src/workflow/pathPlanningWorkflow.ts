import { ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { Coordinates, PathPlanningResult } from "../types";
import { pathPlanningAgent } from "../agents/pathPlanningAgent";
import { weatherAgent } from "../agents/weatherAgent";

export const createPathPlanningWorkflow = async (
  location: Coordinates,
  radius: number
) => {
  const zee = new ZeeWorkflow({
    description: `Plan and generate four optimal monitoring coordinate points based on weather conditions ${location} and radius ${radius}`,
    output:
      "The goal is to determine four optimal monitoring points considering weather conditions",
    agents: {
      weatherAgent,
      pathPlanningAgent,
    },
  });

  const result = await ZeeWorkflow.run(zee);
  return result;
};
