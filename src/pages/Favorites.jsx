import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const {favorites, user, loadingFavorites} = useMovieContext();

    if (!user) return <div className="favorites-empty"><h2>Please sign in to view favorites.</h2></div>;

    if (loadingFavorites) return <div className="favorites-empty"><h2>Loading favorites...</h2></div>;

    if (!favorites || favorites.length === 0) {
        return <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here</p>
        </div>
    }

    return (
        <div className="favorites">
            <h2>Your Favorites ({favorites.length})</h2>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </div>
    );
}

export default Favorites;