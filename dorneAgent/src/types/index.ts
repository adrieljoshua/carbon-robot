export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
}

export interface PathPlanningResult {
  coordinates: Coordinates[];
  weather: WeatherData;
}

export interface EmissionResult {
  emissionLevel: number; // 1-100
  weather: WeatherData;
  location: Coordinates;
}
