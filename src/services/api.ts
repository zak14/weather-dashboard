import axios from "axios";
import type { WeatherData } from "../types";




// Let's create a pre-configured instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    params: {
        appid:import.meta.env.VITE_OPENWEATHER_API_KEY,
        units:'metric', // We use Celsius, not Fahrenheit!
        lang:'en' // Set the language in which we want the answers
    
    }
})

//// Optional interceptor: useful for debugging errors in the future
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Here we could handle global errors (e.g. redirect if 401)
        return Promise.reject(error);
    }
)





export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const { data } = await api.get<WeatherData>('/weather', {
    params: { 
      lat, 
      lon 
    },
  });
  return data;
};


export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
    const { data } = await api.get<WeatherData>('/weather',{
        params: { q: city },
    });
    return data;
};