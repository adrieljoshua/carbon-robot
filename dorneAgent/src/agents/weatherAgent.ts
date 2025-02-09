import { Agent } from "@covalenthq/ai-agent-sdk";
import { weatherTool } from "../tools/weatherTool";

export const weatherAgent = new Agent({
  name: "Weather Analysis Agent",
  model: {
    provider: "OPEN_AI",
    name: "gpt-4",
  },
  description: "Analyzes weather conditions for drone flight planning",
  instructions: [
    "Analyze current weather conditions for the given location",
    "Consider temperature, wind speed, wind direction, and humidity",
    "Provide recommendations for drone flight conditions",
    "Flag any weather conditions that might affect drone performance",
  ],
  tools: { weatherTool },
});
