import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import {
  HomePage,
  MoviesPage,
  GamesPage,
  MusicPage,
  ScanPage,
  SettingsPage,
  ProfilePage,
  AddPage,
  MyShelfPage
} from './components/PageComponents';

// Layout wrapper that persists nav
function Layout({ children, isLoggedIn, onLogout }) {
  if (!isLoggedIn) {
    return children;
  }

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#2a2a2a' }}>
      <TopNav isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-y-auto p-8 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

// Login Page
function LoginPage({ onLogin }) {
  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#2a2a2a' }}>
      <div className="bg-gray-900 p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-6">MediaShelf</h1>
        <button
          onClick={onLogin}
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}>
              {!isLoggedIn ? (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
              ) : (
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/movies" element={<MoviesPage />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/music" element={<MusicPage />} />
                  <Route path="/scan" element={<ScanPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/add" element={<AddPage />} />
                  <Route path="/myshelf" element={<MyShelfPage />} />
                </Routes>
              )}
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}