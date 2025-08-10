import {createContext, useState, useContext, useEffect, useCallback} from "react"
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children, user}) => {
    const [favorites, setFavorites] = useState([])
    const [loadingFavorites, setLoadingFavorites] = useState(false)
    const [favoritesError, setFavoritesError] = useState(null)
    const FAVORITES_LIMIT = 100;

    // Load favorites whenever user changes
    useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!user) {
                setFavorites([]);
                return;
            }
            setLoadingFavorites(true);
            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                if (!snap.exists()) {
                    // create empty doc
                    await setDoc(ref, { favorites: [] });
                    if (!cancelled) setFavorites([]);
                } else {
                    const data = snap.data();
                    if (!cancelled) setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
                }
            } catch (e) {
                console.error('Failed to load favorites', e);
                if (!cancelled) setFavorites([]);
            } finally {
                if (!cancelled) setLoadingFavorites(false);
            }
        }
        load();
        return () => { cancelled = true; }
    }, [user])

    const persistFavorites = useCallback(async (next) => {
        if (!user) return; // should not happen if guarded in callers
        const ref = doc(db, 'users', user.uid);
        await setDoc(ref, { favorites: next }, { merge: true });
    }, [user]);

    const addToFavorites = useCallback(async (movie) => {
        if (!user) throw new Error('AUTH_REQUIRED');

        // Frontend hard cap
        if (favorites.length >= FAVORITES_LIMIT) {
            alert("You can only have up to 100 favorites.");
            return;
        }

        // Prevent duplicates
        if (favorites.some(m => m.id === movie.id)) return;

        const sanitized = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date
        };

        const next = [...favorites, sanitized];
        setFavorites(next);
        persistFavorites(next).catch(err => {
            console.error('Persist add failed', err);
            setFavoritesError('Failed to save favorite (Firestore). Check console & Firestore rules.');
            // For debugging keep the item instead of rollback:
            // setFavorites(p => p.filter(m => m.id !== sanitized.id));
            alert('Failed to save favorite. Check Firestore rules / network.');
        });
    }, [user, favorites, persistFavorites]);

    const removeFromFavorites = useCallback(async (movieId) => {
        if (!user) throw new Error('AUTH_REQUIRED');
        setFavorites(prev => {
            if (!prev.some(m => m.id === movieId)) return prev;
            const next = prev.filter(m => m.id !== movieId);
            persistFavorites(next).catch(err => {
                console.error('Persist remove failed, rolling back', err);
                setFavorites(p => p); // effectively do nothing; could re-add but we lost object
            });
            return next;
        });
    }, [user, persistFavorites]);

    const isFavorite = useCallback((movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }, [favorites])

    const value = {
        user,
        favorites,
        loadingFavorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favoritesLimit: FAVORITES_LIMIT,
        favoritesError
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider> 
}

export default MovieProvider;