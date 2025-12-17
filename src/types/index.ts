export interface WeatherData{
    name: string,
    main:{
        temp: number;
        humidity: number;
        temp_main: number;
        temp_max: number;
    };
    weather:{
        id: number;
        main: string;
        description: string;
        iscon: string;
    }[];
    wind:{
        speed: number;
    };
    dt: number; // Date/time of detection (Unix timestamp)
    timezone: number; // Shift in seconds from UTC

}

export interface forecastData{
    list: WeatherData[]; // For future forecasts (if we use them)
}