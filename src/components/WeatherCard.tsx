import React from 'react';
import { Cloud, Droplets, Wind, MapPin } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-md rounded-xl p-8 text-white shadow-2xl border border-slate-700 mt-8">
      {/* Header: Città e Nazione */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="text-blue-400 w-6 h-6" />
          <h2 className="text-2xl font-bold">{data.name}, {data.sys.country}</h2>
        </div>
        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
          Now
        </span>
      </div>

      {/* Main Temp & Icon */}
      <div className="flex flex-col items-center my-8">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32 drop-shadow-lg"
        />
        <h1 className="text-6xl font-extrabold tracking-tighter">
          {Math.round(data.main.temp)}°
        </h1>
        <p className="text-slate-400 capitalize mt-2 text-lg">
          {data.weather[0].description}
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-3 gap-4 border-t border-slate-700 pt-6">
        <div className="flex flex-col items-center">
          <Wind className="w-6 h-6 text-slate-400 mb-2" />
          <span className="font-bold text-lg">{data.wind.speed} m/s</span>
          <span className="text-xs text-slate-500 uppercase">Wind</span>
        </div>
        <div className="flex flex-col items-center border-l border-r border-slate-700">
          <Droplets className="w-6 h-6 text-blue-400 mb-2" />
          <span className="font-bold text-lg">{data.main.humidity}%</span>
          <span className="text-xs text-slate-500 uppercase">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <Cloud className="w-6 h-6 text-gray-400 mb-2" />
          <span className="font-bold text-lg">{Math.round(data.main.feels_like)}°</span>
          <span className="text-xs text-slate-500 uppercase">Perceived</span>
        </div>
      </div>
    </div>
  );
};