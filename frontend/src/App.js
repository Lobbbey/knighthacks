import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; // Your main App styles

// --- Component Imports ---
import Navbar from './components/Navbar'; // Import the Navbar component
import LandingPage from './pages/LandingPage'; // Import the LandingPage

// --- Placeholder Component Imports (Keep separate for clarity, implement in own files) ---

// Example Placeholder Login Component
function Login({ onLoginSuccess }) {
  // --- This is where you would put the login form and API call logic ---
  const handleLoginSubmit = async (event) => {
     event.preventDefault();
     console.log("Simulating login...");
     // --- Replace with actual API call ---
     // try {
     //   const data = await loginUser({ email: 'user@example.com', password: 'password' }); // Get data from form
     //   localStorage.setItem('authToken', data.token); // Store token
     //   onLoginSuccess(); // Update App state
     // } catch (error) {
     //   console.error("Login failed:", error);
     //   // Show error message to user
     // }
     // --- For demonstration, simulate success ---
     localStorage.setItem('authToken', 'fake-jwt-token'); // Store fake token
     onLoginSuccess(); // Notify App component
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
         <div>
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
             <input type="email" id="email" name="email" placeholder="Email (test@test.com)" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue="test@test.com" />
         </div>
         <div>
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
             <input type="password" id="password" name="password" placeholder="Password (password)" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue="password" />
         </div>
         <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
           Log In (Simulated)
         </button>
      </form>
    </div>
   );
}

// Example Placeholder Signup Component
function Signup() {
  // --- Add signup form and API call logic here ---
  return <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg"><h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up Page (Placeholder)</h2>{/* Signup form goes here */}</div>;
}

// Example Placeholder Media Dashboard Component
function MediaDashboard() {
   // --- Add logic to fetch and display media using API service ---
   // import { searchMedia } from './services/api'; // Example import
   // useEffect(() => { /* fetch media */ }, []);
  return <div className="p-4"><h2>My Media Shelf (Placeholder)</h2>{/* Media list, search, filters go here */}</div>;
}

// Example Placeholder Add Media Component
function AddMedia() {
  // --- Add form and API call logic to add media ---
  return <div className="p-4"><h2>Add New Media (Placeholder)</h2>{/* Add media form goes here */}</div>;
}

// --- Main App Component ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Add verification of token validity with backend if needed
      setIsLoggedIn(true);
    }
  }, []);

  // Function passed to Login component upon successful login
  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    // Navigation away from login is handled by PublicRoute logic
  }, []);


  // Function passed to Navbar to handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken'); // Clear token
    setIsLoggedIn(false);
    // User will be automatically redirected by ProtectedRoute logic on next render
  }, []);


  // Simple Protected Route component: Only allows access if logged in
  function ProtectedRoute({ children }) {
    // Use the state variable for immediate UI updates after login/logout
    return isLoggedIn ? children : <Navigate to="/login" replace />;
   }

   // Simple Public Route component: Redirects logged-in users away (e.g., from login page)
   function PublicRoute({ children }) {
       // Use the state variable
       return !isLoggedIn ? children : <Navigate to="/myshelf" replace />;
   }


  return (
    <Router>
      <div className="App min-h-screen bg-gray-200"> {/* Base background */}
        {/* Navbar is rendered outside Routes, so it's always visible */}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        {/* Routes define the page content that changes */}
        <main className="container mx-auto p-4 mt-4"> {/* Added margin-top */}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute><Login onLoginSuccess={handleLoginSuccess} /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            {/* Show Landing page only if not logged in, else redirect */}
            <Route path="/" element={!isLoggedIn ? <LandingPage /> : <Navigate to="/myshelf" replace />} />

            {/* Protected Routes */}
            <Route path="/myshelf" element={<ProtectedRoute><MediaDashboard /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddMedia /></ProtectedRoute>} />


            {/* Optional: Catch-all 404 route */}
            <Route path="*" element={<div className="p-4 text-center"><h2>404 - Not Found</h2></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

