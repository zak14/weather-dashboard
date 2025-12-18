import { useEffect } from 'react';
import { getWeatherByCity } from './services/api';

function App() {
  useEffect(() =>{
    // Test call: Open Console to see result
    getWeatherByCity('Rome')
      .then((data) => console.log('weather Data:', data))
      .catch((err) => console.error('API Error: ', err))
  },[]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <h1 className="text-4xl font-bold text-blue-500">
        Weather App Setup Complete 🚀
      </h1>
    </div>
  )
}

export default App