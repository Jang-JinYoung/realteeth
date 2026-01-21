// src/shared/api/fetchWeatherOneCall.ts

export type WeatherOneCallResponse = {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
    };
    hourly: {
        dt: number;
        temp: number;
        feels_like: number;
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        pop: number;
    }[];
    daily: {
        temp: {
            min: number,
            max: number;
        }
    }[];
};


export type WindDirectionTypes =
  | '북'
  | '북동'
  | '동'
  | '남동'
  | '남'
  | '남서'
  | '서'
  | '북서';