import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import { useWeather } from "../hooks/useWeather";
import { Loader2 } from "lucide-react";

const Home: React.FC = () => {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    searchByCity,
    searchByLocation,
  } = useWeather();

  // Load mặc định thủ đô Hà Nội khi mới vào app
  useEffect(() => {
    searchByCity("Hanoi");
  }, [searchByCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 container mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300 mb-8 text-center drop-shadow-sm">
          SkyCast Weather
        </h1>

        <SearchBar
          onSearch={searchByCity}
          onLocationSearch={searchByLocation}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center mt-20">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
            <p className="text-slate-300 animate-pulse">
              Đang đồng bộ dữ liệu khí quyển...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="glass-panel border-red-400/30 bg-red-500/10 text-red-200 px-6 py-4 rounded-2xl mt-8 max-w-md w-full text-center">
            {error}
          </div>
        )}

        {!loading && !error && currentWeather && (
          <div className="w-full flex flex-col items-center mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <WeatherCard data={currentWeather} />
            <ForecastList forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
