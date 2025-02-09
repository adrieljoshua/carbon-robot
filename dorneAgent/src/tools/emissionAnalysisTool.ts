import { z } from "zod";
import { createTool } from "@covalenthq/ai-agent-sdk";

export const emissionAnalyzerTool = createTool({
  id: "analyze-emissions",
  description: "Calculate emission level (1-100) based on weather conditions",
  schema: z.object({
    weather: z.object({
      temperature: z.number(),
      windSpeed: z.number(),
      windDirection: z.number(),
      humidity: z.number(),
    }),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  execute: async (parameters) => {
    const { weather, location } = parameters as { weather: any; location: any };
    const temperatureImpact = Math.min((weather.temperature / 40) * 50, 50); // Max 50 points
    const windImpact = Math.min(((20 - weather.windSpeed) / 20) * 30, 30); // Max 30 points
    const humidityImpact = Math.min((weather.humidity / 100) * 20, 20); // Max 20 points

    const emissionLevel = Math.round(
      temperatureImpact + windImpact + humidityImpact
    );

    return Promise.resolve(
      Math.min(Math.max(emissionLevel, 1), 100).toString()
    );
  },
});
