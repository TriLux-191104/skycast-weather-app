import axios from "axios";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export const weatherApi = {
  getCurrentWeather: async (query: string): Promise<CurrentWeatherResponse> => {
    const response = await axiosInstance.get<CurrentWeatherResponse>(
      "/weather",
      {
        params: { q: query },
      },
    );
    return response.data;
  },

  getForecast: async (query: string): Promise<ForecastResponse> => {
    const response = await axiosInstance.get<ForecastResponse>("/forecast", {
      params: { q: query },
    });
    return response.data;
  },

  getCurrentWeatherByCoords: async (
    lat: number,
    lon: number,
  ): Promise<CurrentWeatherResponse> => {
    const response = await axiosInstance.get<CurrentWeatherResponse>(
      "/weather",
      {
        params: { lat, lon },
      },
    );
    return response.data;
  },

  getForecastByCoords: async (
    lat: number,
    lon: number,
  ): Promise<ForecastResponse> => {
    const response = await axiosInstance.get<ForecastResponse>("/forecast", {
      params: { lat, lon },
    });
    return response.data;
  },
};
