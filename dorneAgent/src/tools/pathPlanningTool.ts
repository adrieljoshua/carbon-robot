import { z } from "zod";
import { createTool } from "@covalenthq/ai-agent-sdk";
import { Coordinates } from "../types";

export const pathPlanningSchema = z.object({
  center: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  radius: z.number(),
  weatherData: z.object({
    temperature: z.number(),
    windSpeed: z.number(),
    windDirection: z.number(),
    humidity: z.number(),
  }),
});
export const pathPlannerTool = createTool({
  id: "plan-path",
  description:
    "Calculate four optimal monitoring points based on weather and location",
  schema: z.object({
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    radius: z.number(),
    weather: z.object({
      temperature: z.number(),
      windSpeed: z.number(),
      windDirection: z.number(),
      humidity: z.number(),
    }),
  }),
  execute: async (parameters) => {
    const { center, radius, weather } = parameters as {
      center: Coordinates;
      radius: number;
      weather: {
        temperature: number;
        windSpeed: number;
        windDirection: number;
        humidity: number;
      };
    };
    // Calculate 4 points based on wind direction and radius
    const points = [];
    const windRadians = (weather.windDirection * Math.PI) / 180;

    // Point 1: Upwind
    points.push({
      latitude: center.latitude + (Math.cos(windRadians) * radius) / 111000,
      longitude: center.longitude + (Math.sin(windRadians) * radius) / 111000,
    });

    // Point 2: Downwind
    points.push({
      latitude: center.latitude - (Math.cos(windRadians) * radius) / 111000,
      longitude: center.longitude - (Math.sin(windRadians) * radius) / 111000,
    });

    // Points 3 and 4: Perpendicular to wind direction
    points.push({
      latitude:
        center.latitude +
        (Math.cos(windRadians + Math.PI / 2) * radius) / 111000,
      longitude:
        center.longitude +
        (Math.sin(windRadians + Math.PI / 2) * radius) / 111000,
    });

    points.push({
      latitude:
        center.latitude -
        (Math.cos(windRadians + Math.PI / 2) * radius) / 111000,
      longitude:
        center.longitude -
        (Math.sin(windRadians + Math.PI / 2) * radius) / 111000,
    });

    return JSON.stringify(points);
  },
});
