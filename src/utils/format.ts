import { format } from "date-fns";
import type { ForecastDay } from "../types/weather";

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatDate = (
  timestamp: number,
  formatStr: string = "EEEE, dd MMM",
): string => {
  return format(new Date(timestamp * 1000), formatStr);
};

// OpenWeather trả về data mỗi 3 giờ. Hàm này lọc ra 1 kết quả mỗi ngày (thường lấy mốc 12:00 trưa)
export const filterDailyForecast = (list: ForecastDay[]): ForecastDay[] => {
  const dailyData: Record<string, ForecastDay> = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    // Ưu tiên lấy dự báo lúc 12:00:00, nếu chưa có ngày đó trong map thì thêm vào
    if (item.dt_txt.includes("12:00:00") || !dailyData[date]) {
      dailyData[date] = item;
    }
  });

  return Object.values(dailyData).slice(0, 5); // Lấy tối đa 5 ngày
};
