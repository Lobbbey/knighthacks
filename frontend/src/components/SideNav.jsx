import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Hamburger button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-gray-400"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <nav
        className={`${
          isOpen ? 'w-48' : 'w-0'
        } bg-sage-100 text-gray-800 overflow-hidden transition-all duration-300 ${
          isOpen ? 'md:w-48' : 'md:w-48'
        }`}
        style={{ backgroundColor: '#c8d5c4' }}
      >
        <div className="p-4 space-y-6">
          {/* Search Your Collection */}
          <div className="text-sm font-medium text-gray-700">
            Search Your Collection
          </div>

          {/* Scan */}
          <div className="text-sm font-medium cursor-pointer hover:text-gray-900 transition">
            Scan
          </div>

          {/* Home with nested items */}
          <div>
            <div className="text-sm font-medium cursor-pointer hover:text-gray-900 transition">
              Home
            </div>
            <div className="ml-4 mt-2 space-y-2">
              <div className="text-sm cursor-pointer hover:text-gray-900 transition">
                Movies
              </div>
              <div className="text-sm cursor-pointer hover:text-gray-900 transition">
                Games
              </div>
              <div className="text-sm cursor-pointer hover:text-gray-900 transition">
                Music
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="text-sm font-medium cursor-pointer hover:text-gray-900 transition">
            Settings
          </div>

          {/* Profile */}
          <div className="text-sm font-medium cursor-pointer hover:text-gray-900 transition">
            Profile
          </div>
        </div>
      </nav>
    </div>
  );
}
