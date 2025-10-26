import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For optional animations

// You'll likely have a Navbar component imported and rendered in App.js,
// so this component focuses on the content below the navbar.

const LandingPage = () => {
  // Placeholder image URLs
  const moviePlaceholder = 'https://via.placeholder.com/300x400/333333/FFFFFF?text=Movies';
  const gamesPlaceholder = 'https://via.placeholder.com/300x400/555555/FFFFFF?text=Games';
  const musicPlaceholder = 'https://via.placeholder.com/300x400/777777/FFFFFF?text=Music';

  // Animation variants (optional, requires framer-motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center text-white p-6 md:p-10"
      style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080/222222/555555?text=Background+Texture)' }} // Placeholder for the VHS/CD background
    >
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 md:py-24 bg-black bg-opacity-70 rounded-lg shadow-xl mb-12 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 text-green-400 drop-shadow-lg"
          variants={itemVariants}
        >
          Cataloging Your Media
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 text-gray-300"
          variants={itemVariants}
        >
          A space for people who still love physical media. Create a profile, add what's on your actual shelf, and see what other collectors are into. Whether you're into rare VHS tapes, vinyl, Criterion films, or PS2 games, Catalog it all!
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/signup" // Or "/login" or "/dashboard" if logged in
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </Link>
        </motion.div>
      </motion.section>

      {/* Media Type Display Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Movie Card */}
        <motion.div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105" variants={itemVariants}>
          <img src={moviePlaceholder} alt="Stack of Movies" className="w-full h-80 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-gray-100">Movies</h3>
          </div>
        </motion.div>

        {/* Games Card */}
        <motion.div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105" variants={itemVariants}>
          <img src={gamesPlaceholder} alt="Stack of Games" className="w-full h-80 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-gray-100">Games</h3>
          </div>
        </motion.div>

        {/* Music Card */}
        <motion.div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105" variants={itemVariants}>
          <img src={musicPlaceholder} alt="Stack of Music" className="w-full h-80 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-gray-100">Music</h3>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer Section (Simplified) */}
      <footer className="bg-black bg-opacity-70 text-gray-400 p-8 rounded-lg shadow-md max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Site name</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition duration-200"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-white transition duration-200"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-white transition duration-200"><i className="fab fa-youtube"></i></a>
              <a href="#" className="hover:text-white transition duration-200"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Topic</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Topic</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Topic</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Page</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;