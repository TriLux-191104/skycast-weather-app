import React from "react";
import type { CurrentWeatherResponse } from "../types/weather";
import { formatTemperature } from "../utils/format";
import { Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherCardProps {
  data: CurrentWeatherResponse;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="glass-panel rounded-3xl p-8 w-full max-w-md mx-auto transform transition-all hover:scale-[1.02]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-wider">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-slate-300 capitalize mt-1 text-lg">
          {data.weather[0].description}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32 drop-shadow-lg"
        />
        <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
          {formatTemperature(data.main.temp)}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm font-medium">
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-3">
          <Thermometer className="w-6 h-6 text-orange-400 mb-1" />
          <span className="text-slate-400 text-xs mb-1">Cảm giác</span>
          <span className="text-base">
            {formatTemperature(data.main.feels_like)}
          </span>
        </div>
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-3">
          <Droplets className="w-6 h-6 text-blue-400 mb-1" />
          <span className="text-slate-400 text-xs mb-1">Độ ẩm</span>
          <span className="text-base">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-3">
          <Wind className="w-6 h-6 text-teal-400 mb-1" />
          <span className="text-slate-400 text-xs mb-1">Gió</span>
          <span className="text-base">{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
