import { Agent } from "@covalenthq/ai-agent-sdk";
import { emissionAnalyzerTool } from "../tools/emissionAnalysisTool";

export const emissionAnalysisAgent = new Agent({
  name: "Emission Analysis Agent",
  model: {
    provider: "OPEN_AI",
    name: "gpt-4",
  },
  description: "Analyzes emission data and generates insights",
  instructions: [
    "Analyze emission data from drone sensors",
    "Identify emission hotspots and patterns",
    "Correlate emission data with weather conditions",
    "Generate comprehensive emission analysis report",
    "Calculate average emission levels",
    "Identify areas requiring immediate attention",
    "Consider weather impact on emission dispersal",
  ],
  tools: { emissionAnalyzerTool },
});
