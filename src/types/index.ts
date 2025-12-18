export interface WeatherData{
    name: string;
    dt: number; // Date/time of detection (Unix timestamp)
    timezone: number; // Shift in seconds from UTC
    main:{
        temp: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
    };
    weather:{
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind:{
        speed: number;
    };
    sys: {
    country: string;
    };
    

}

export interface ForecastData{
    list: WeatherData[]; // For future forecasts (if we use them)
}