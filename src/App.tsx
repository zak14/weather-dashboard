import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Loader2, AlertCircle, MapPin } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query'; // Import the client for manual actions
import { getWeatherByCoords } from './services/api';


function App() {
  const [city, setCity] = useState<string>('');
  const queryClient = useQueryClient(); // Ci serve per manipolare la cache manualmente

  // 1. Hook standard per la ricerca testuale
  const { data, isLoading, isError, error } = useWeather(city);

  // 2. Logica di Geolocalizzazione (Eseguita solo 1 volta all'avvio)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Scarichiamo i dati manualmente usando le coordinate
            const geoData = await getWeatherByCoords(latitude, longitude);
            
            // Trucco da Senior: Aggiorniamo la cache di React Query "fingendo"
            // che l'utente abbia cercato il nome della città restituita dal GPS.
            // Questo popola la UI istantaneamente.
            queryClient.setQueryData(['weather', geoData.name], geoData);
            setCity(geoData.name); // Imposta il nome della città nella barra
          } catch (err) {
            console.error("Geo API Error:", err);
          }
        },
        (error) => {
          console.log("Geolocation blocked or error:", error.message);
          // Non facciamo nulla, l'utente cercherà manualmente
        }
      );
    }
  }, [queryClient]); // Dipendenze dell'effetto

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={(newCity) => setCity(newCity)} />

      {/* Sezione Loading */}
      {isLoading && (
        <div className="mt-12 flex flex-col items-center gap-2 text-blue-400">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm font-medium animate-pulse">Fetching weather data...</p>
        </div>
      )}

      {/* Sezione Errore */}
      {isError && (
        <div className="mt-8 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20">
          <AlertCircle className="w-5 h-5" />
          <span>
            {(error as any)?.response?.data?.message || "Città non trovata."}
          </span>
        </div>
      )}

      {/* Sezione Dati (Successo) */}
      {data && !isLoading && (
        <WeatherCard data={data} />
      )}
      
      {/* Stato Iniziale (Nessuna ricerca, Nessun dato) */}
      {!city && !isLoading && !data && (
        <div className="mt-12 flex flex-col items-center text-slate-500">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg">Abilita la localizzazione o cerca una città 🌍</p>
        </div>
      )}
    </div>
  );
}

export default App;