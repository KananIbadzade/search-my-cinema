const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
}
