import React from "react";
import type { ForecastDay } from "../types/weather";
import { formatDate, formatTemperature } from "../utils/format";

interface ForecastListProps {
  forecast: ForecastDay[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  if (!forecast.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h3 className="text-xl font-semibold mb-4 px-2 text-slate-200">
        Dự báo 5 ngày tới
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center transition-all hover:bg-white/20 cursor-pointer"
          >
            <span className="text-sm font-medium text-slate-300">
              {formatDate(day.dt, "EEE")}
            </span>
            <span className="text-xs text-slate-400 mb-2">
              {formatDate(day.dt, "dd/MM")}
            </span>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-16 h-16 drop-shadow-md"
            />

            <span className="text-lg font-bold mt-1">
              {formatTemperature(day.main.temp)}
            </span>
            <span className="text-xs text-slate-400 capitalize text-center mt-1">
              {day.weather[0].description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
