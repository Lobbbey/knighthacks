import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Accept isLoggedIn state and onLogout function as props
const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50"> {/* Sticky navbar */}
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo/Brand Name */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider hover:text-gray-300 transition duration-200">
            MediaShelf
          </Link>
        </div>

        {/* Navigation Links, Search, and User Icon */}
        <div className="flex items-center space-x-4 md:space-x-6">

          {/* Conditional Links based on Login State */}
          {isLoggedIn ? (
            <>
              <Link to="/add" className="hover:text-gray-300 transition duration-200">Add</Link>
              <Link to="/myshelf" className="hover:text-gray-300 transition duration-200">MyShelf</Link>
              {/* <Link to="/settings" className="hover:text-gray-300 transition duration-200 hidden md:inline-block">Settings</Link> */}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition duration-200">Login</Link>
              <Link to="/signup" className="hover:text-gray-300 transition duration-200">Sign Up</Link>
            </>
          )}

          {/* Search Input (only shown when logged in for this example) */}
          {isLoggedIn && (
            <div className="relative hidden sm:block"> {/* Hide on extra small screens */}
              <input
                type="text"
                placeholder="Search..." // Placeholder from image is specific, adjust as needed
                className="bg-gray-700 text-white rounded-full py-1 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition duration-200 w-48 lg:w-64"
                aria-label="Search"
              />
              {/* Search Icon */}
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}

          {/* User Icon/Logout Button (only shown when logged in) */}
          {isLoggedIn && (
            <div className="relative group">
              <button
                onClick={onLogout} // Call the logout function passed from App.js
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition duration-200"
                title="Logout" // Tooltip for accessibility
              >
                {/* Simple User Icon */}
                <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {/* Optional: Add a dropdown here for user settings if needed */}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

