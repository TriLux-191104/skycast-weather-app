import { useState, useCallback } from "react";
import type { CurrentWeatherResponse, ForecastDay } from "../types/weather";
import { weatherApi } from "../api/weatherApi";
import { filterDailyForecast } from "../utils/format";

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    fetchFunction: () => Promise<
      [CurrentWeatherResponse, import("../types/weather").ForecastResponse]
    >,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const [currentData, forecastData] = await fetchFunction();
      setCurrentWeather(currentData);
      setForecast(filterDailyForecast(forecastData.list));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Không tìm thấy dữ liệu thời tiết cho khu vực này.");
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByCity = useCallback((city: string) => {
    if (!city.trim()) return;
    fetchData(() =>
      Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city),
      ]),
    );
  }, []);

  const searchByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchData(() =>
          Promise.all([
            weatherApi.getCurrentWeatherByCoords(latitude, longitude),
            weatherApi.getForecastByCoords(latitude, longitude),
          ]),
        );
      },
      () => {
        setError("Không thể lấy vị trí hiện tại của bạn.");
      },
    );
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    searchByCity,
    searchByLocation,
  };
};
