import { Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopNav({ isLoggedIn, onLogout }) {
  return (
    <div className="bg-gray-900 text-white border-b border-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold">MediaShelf</h1>
      </div>
      
      <div className="flex items-center gap-6">
        {isLoggedIn && (
          <>
            <Link to="/add" className="hover:text-gray-300 transition">Add</Link>
            <Link to="/myshelf" className="hover:text-gray-300 transition">MyShelf</Link>
            <Link to="/settings" className="hover:text-gray-300 transition">Settings</Link>
          </>
        )}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search: The Cure" 
            className="bg-gray-800 outline-none text-sm w-32"
          />
        </div>
        {isLoggedIn && (
          <button 
            onClick={onLogout}
            className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition"
          >
            <User size={20} />
          </button>
        )}
      </div>
    </div>
  );
}