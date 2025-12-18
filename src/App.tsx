import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const [city, setCity] = useState<string>(''); // Stato locale per la ricerca
  
  // L'hook parte automaticamente quando 'city' cambia
  const { data, isLoading, isError, error } = useWeather(city);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-20 px-4">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8">
        Weather Dashboard
      </h1>

      {/* Search Component */}
      <SearchBar onSearch={(newCity) => setCity(newCity)} />

      {/* Conditional Rendering (Clean Architecture) */}
      
      {/* 1. Loading State */}
      {isLoading && (
        <div className="mt-12 animate-spin">
          <Loader2 className="w-10 h-10 text-blue-500" />
        </div>
      )}

      {/* 2. Error State */}
      {isError && (
        <div className="mt-8 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20">
          <AlertCircle className="w-5 h-5" />
          <span>
            {/* TypeScript trick: try to show specific message or generic one */}
            {(error as any)?.response?.data?.message || "Città non trovata o errore API."}
          </span>
        </div>
      )}

      {/* 3. Success State (Data Display) */}
      {data && !isLoading && (
        <WeatherCard data={data} />
      )}
      
      {/* 4. Empty State (Initial) */}
      {!city && (
        <p className="mt-12 text-slate-500 text-lg">
          Cerca una città per iniziare 🌍
        </p>
      )}
    </div>
  );
}

export default App;