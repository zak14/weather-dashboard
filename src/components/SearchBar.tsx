import React, { useState} from "react";
import { Search } from 'lucide-react'; //icon

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //Avoid refreshing the page
        if(city.trim()){
            onSearch(city);
            setCity('');  //Clears the input after searching
        }
    }


return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for a city (ex. Rome)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <Search className="absolute right-3 top-3.5 text-slate-400 w-5 h-5" />
      </div>
      <button
        type="submit"
        disabled={!city.trim()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
      >
        Search
      </button>
    </form>
  );
};