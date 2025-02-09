import { Agent } from "@covalenthq/ai-agent-sdk";
import { pathPlannerTool } from "../tools/pathPlanningTool";

export const pathPlanningAgent = new Agent({
  name: "Path Planning Agent",
  model: {
    provider: "OPEN_AI",
    name: "gpt-4",
  },
  description:
    "Plans optimal drone flight paths considering weather and geographical constraints",
  instructions: [
    "Calculate optimal flight path considering weather conditions",
    "Ensure points are within the specified radius",
    "Optimize for minimal energy consumption",
    "Consider wind patterns for path optimization",
    "Avoid areas with extreme weather conditions",
    "Ensure path covers area effectively for emission monitoring",
  ],
  tools: { pathPlannerTool },
});
