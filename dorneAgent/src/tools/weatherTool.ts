import { z } from "zod";
import { createTool } from "@covalenthq/ai-agent-sdk";
import fetch from "node-fetch";

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
  execute: async (parameters) => {
    const { location } = parameters as {
      location: { latitude: number; longitude: number };
    };
    const { latitude, longitude } = location;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data.current_weather) {
        throw new Error("Invalid response from weather API");
      }

      return JSON.stringify({
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
        windDirection: data.current_weather.winddirection,
        humidity: data.current_weather.relative_humidity || null,
      });
    } catch (error) {
      return JSON.stringify({ error: (error as Error).message });
    }
  },
});
