import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Loader2, AlertCircle, MapPin, Navigation } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query'; // Import the client for manual actions
import { getWeatherByCoords } from './services/api';

const DEFAULT_CITIES =[
  "New York",
  "Hong Kong",
  "Rio de Janeiro",
  "Rome"
]


function App() {
  const [city, setCity] = useState<string>('');
  const queryClient = useQueryClient(); // We need it to manipulate the cache manually.

  // Standard hook for text search
  const { data, isLoading, isError, error } = useWeather(city);

  // Geolocation logic (Performed only once at startup)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // We download the data manually using the coordinates.
            const geoData = await getWeatherByCoords(latitude, longitude);
            
            // We update the React Query cache by “pretending” that the user searched for the city name returned by the GPS. This populates the UI instantly.
            queryClient.setQueryData(['weather', geoData.name], geoData);
            setCity(geoData.name); //  Enter the name of the city in the bar
          } catch (err) {
            console.error("Geo API Error:", err);
          }
        },
        (error) => {
          console.log("Geolocation blocked or error:", error.message);
          // We do nothing; the user will search manually.
        }
      );
    }
  }, [queryClient]); // Effect dependencies

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={(newCity) => setCity(newCity)} />

      {/* Section Loading */}
      {isLoading && (
        <div className="mt-12 flex flex-col items-center gap-2 text-blue-400">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm font-medium animate-pulse">Fetching weather data...</p>
        </div>
      )}

      {/*  Error Section  */}
      {isError && (
        <div className="mt-8 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20">
          <AlertCircle className="w-5 h-5" />
          <span>
            {(error as any)?.response?.data?.message || "City not found."}
          </span>
        </div>
      )}

      {/* Sezione Dati (Successo) */}
      {data && !isLoading && (
        <WeatherCard data={data} />
      )}
      
      {/* Initial status (No search, No data)  */}
      {!city && !isLoading && !data && (
        <div className="mt-12 flex flex-col items-center text-slate-500">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg">Enable location services or search for a city 🌍</p>
        </div>
      )}
      <div className="mt-16 mb-16 w-full max-w-md border-t border-slate-800 pt-8">
        <div className="flex items-center gap-2 mb-4 text-slate-400">
          <Navigation className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Popular Destinations
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {DEFAULT_CITIES.map((cityName) => (
            <button
              key={cityName}
              onClick={() => setCity(cityName)} // Basta cambiare lo stato e l'hook farà il resto!
              className={`
                py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                border border-slate-700 shadow-sm text-left
                ${city === cityName 
                  ? 'bg-blue-600 text-white border-blue-500 ring-2 ring-blue-500/20' // Stile se attivo
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600' // Stile default
                }
              `}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
    </div>
  



  );
}

export default App;