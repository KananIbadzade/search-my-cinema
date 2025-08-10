import React from 'react';
import { Link } from 'react-router-dom';
import "../css/NavBar.css";
import { useMovieContext } from '../contexts/MovieContext';

function NavBar({ user, onLogout, onDeleteAccount, error }) {
    const { favorites, favoritesError } = useMovieContext();

    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Search My Cinema</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites ({favorites.length})</Link>
        </div>
        <div className="navbar-actions">
            <span className="user-label">{user?.displayName || user?.email}</span>
            <button onClick={onLogout} className="nav-btn small">Logout</button>
            <button onClick={onDeleteAccount} className="nav-btn danger small">Delete</button>
        </div>
        {(error || favoritesError) && (
          <div className="nav-error" title={error || favoritesError}>
            ⚠
          </div>
        )}
    </nav>
}

export default NavBar;