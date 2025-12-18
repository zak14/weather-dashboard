import { useQuery } from '@tanstack/react-query';
import { getWeatherByCity } from '../services/api';
import type { WeatherData } from '../types'; // Note: I use ‘type’ to avoid errors with typescript.

export const useWeather = (city: string) =>{
    return useQuery<WeatherData>({
        queryKey:['weather', city], //The unique key for the cache
        queryFn: () => getWeatherByCity(city), //The function that calls the API
        enabled: !!city, //The call is made ONLY if city is not empty.
        staleTime: 1000*60*5, // The data remains valid for 5 minutes (no unnecessary calls)
        retry: 1 // If it fails, try again only once


    })
}