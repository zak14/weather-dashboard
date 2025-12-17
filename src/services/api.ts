import axios from "axios";

// Let's create a pre-configured instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_UR,
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


export default api;