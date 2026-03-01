export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherResponse {
  name: string;
  dt: number;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: WeatherCondition[];
}

export interface ForecastDay {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: WeatherCondition[];
}

export interface ForecastResponse {
  list: ForecastDay[];
  city: {
    name: string;
    country: string;
  };
}
