import { Link } from 'react-router-dom';

export default function SideNav() {
  const navItems = [
    { label: 'Search Your Collection', id: null },
    { label: 'Scan', id: 'scan' },
    { label: 'Home', id: 'home', subItems: [
      { label: 'Movies', id: 'movies' },
      { label: 'Games', id: 'games' },
      { label: 'Music', id: 'music' }
    ]},
    { label: 'Settings', id: 'settings' },
    { label: 'Profile', id: 'profile' },
  ];

  return (
    <nav className="w-48 bg-sage-100 text-gray-800 overflow-y-auto" style={{ backgroundColor: '#c8d5c4' }}>
      <div className="p-4 space-y-6">
        {navItems.map((item) => (
          <div key={item.id || item.label}>
            {item.id ? (
              <Link 
                to={`/${item.id}`}
                className="text-sm font-medium cursor-pointer hover:text-gray-900 transition block"
              >
                {item.label}
              </Link>
            ) : (
              <div className="text-sm font-medium text-gray-700">
                {item.label}
              </div>
            )}
            
            {item.subItems && (
              <div className="ml-4 mt-2 space-y-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={`/${subItem.id}`}
                    className="text-sm cursor-pointer hover:text-gray-900 transition block"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}