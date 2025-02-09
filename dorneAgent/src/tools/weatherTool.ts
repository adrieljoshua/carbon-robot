import { z } from "zod";
import { createTool } from "@covalenthq/ai-agent-sdk";
import { WeatherData } from "../types";

export const weatherSchema = z.object({
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const weatherTool = createTool({
  id: "get-weather",
  description: "Get current weather data for a specific location",
  schema: weatherSchema,
  execute: async (params) => {
    const result = {
      temperature: 20 + Math.random() * 10,
      windSpeed: Math.random() * 20,
      windDirection: Math.random() * 360,
      humidity: Math.random() * 100,
    };
    return JSON.stringify(result);
  },
});
