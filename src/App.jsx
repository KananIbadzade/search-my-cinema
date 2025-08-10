import "./css/App.css";
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import { MovieProvider } from "./contexts/MovieContext";
import { useEffect, useState } from 'react';
import { signInWithGoogle, signOutUser, subscribeAuth, deleteCurrentUser } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = subscribeAuth(u => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setError(null);
    try { await signInWithGoogle(); } catch (err) { setError(err.message); }
  };

  const handleLogout = async () => {
    setError(null);
    try { await signOutUser(); } catch (err) { setError(err.message); }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Delete your account permanently?')) return;
    setError(null);
    try { await deleteCurrentUser(); } catch (err) { setError(err.message); }
  };

  if (authLoading) return <div style={{textAlign:'center', marginTop:'4rem'}}>Loading...</div>;

  return (
    <>
      {!user ? (
        <div className="login-screen" style={{ textAlign: "center", marginTop: "100px" }}>
          <h2>🎬 Welcome to Search My Cinema</h2>
          <button onClick={handleLogin}>Sign in with Google</button>
          {error && <p style={{color:'red'}}>{error}</p>}
        </div>
      ) : (
        <MovieProvider user={user}>
          <NavBar
            user={user}
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
            error={error}
          />
          <main className="main-content">
            {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
            </Routes>
          </main>
        </MovieProvider>
      )}
    </>
  );
}

export default App;
