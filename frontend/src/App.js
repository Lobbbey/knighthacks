import { useState, useEffect } from 'react';
import AuthPage from './components/Authpage';
import {HomePage} from './components/PageComponents'; 
import { 
  MoviesPage, 
  GamesPage, 
  MusicPage, 
  BooksPage, 
  AddPage, 
  MyShelfPage, 
  ProfilePage, 
  SettingsPage 
} from './components/PageComponents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userId) => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header/Navigation */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-white">MediaShelf</h1>
            <div className="flex gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('movies')}
                className={`px-4 py-2 rounded ${currentPage === 'movies' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
              >
                Movies
              </button>
              <button
                onClick={() => setCurrentPage('games')}
                className={`px-4 py-2 rounded ${currentPage === 'games' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
              >
                Games
              </button>
              <button
                onClick={() => setCurrentPage('music')}
                className={`px-4 py-2 rounded ${currentPage === 'music' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
              >
                Music
              </button>
              <button
                onClick={() => setCurrentPage('books')}
                className={`px-4 py-2 rounded ${currentPage === 'books' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
              >
                Books
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('add')}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Add
            </button>
            <button
              onClick={() => setCurrentPage('shelf')}
              className={`px-4 py-2 rounded ${currentPage === 'shelf' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
            >
              MyShelf
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`px-4 py-2 rounded ${currentPage === 'profile' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`px-4 py-2 rounded ${currentPage === 'settings' ? 'bg-green-600' : 'hover:bg-gray-700'}`}
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'movies' && <MoviesPage />}
        {currentPage === 'games' && <GamesPage />}
        {currentPage === 'music' && <MusicPage />}
        {currentPage === 'books' && <BooksPage />}
        {currentPage === 'add' && <AddPage />}
        {currentPage === 'shelf' && <MyShelfPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;