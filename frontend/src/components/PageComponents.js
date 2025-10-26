import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

// Generic Media Page Component (reusable)
function MediaPage({ mediaType, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, [mediaType]);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/media?type=${mediaType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      {items.length === 0 ? (
        <p className="text-gray-400">No {mediaType} found in your collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer group"
            >
              {/* Poster/Cover Image */}
              <div className="h-48 bg-gray-700 overflow-hidden">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:brightness-75 transition"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Item Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 truncate">{item.artist || item.developer || item.director}</p>
                {item.year && (
                  <p className="text-xs text-gray-500 mt-2">{item.year}</p>
                )}
                {item.rating && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-300">{item.rating}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Movies Page
export function MoviesPage() {
  return (
    <MediaPage
      mediaType="movies"
      title="Movies"
      description="Your movie collection"
    />
  );
}

// Games Page
export function GamesPage() {
  return (
    <MediaPage
      mediaType="games"
      title="Games"
      description="Your game collection"
    />
  );
}

// Music Page
export function MusicPage() {
  return (
    <MediaPage
      mediaType="music"
      title="Music"
      description="Your music collection"
    />
  );
}

// Home Page (shows all media)
export function HomePage() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const fetchAllMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/media');
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const data = await response.json();
      setAllItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  const movieCount = allItems.filter(item => item.type === 'movies').length;
  const gameCount = allItems.filter(item => item.type === 'games').length;
  const musicCount = allItems.filter(item => item.type === 'music').length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Home</h2>
      <p className="text-gray-400 mb-8">Welcome to your media collection!</p>
      
      {error && <p className="text-red-400 mb-4">Error: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Movies</p>
          <p className="text-4xl font-bold text-white">{movieCount}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Games</p>
          <p className="text-4xl font-bold text-white">{gameCount}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Music</p>
          <p className="text-4xl font-bold text-white">{musicCount}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Recently Added</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allItems.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="h-48 bg-gray-700 overflow-hidden">
              {item.coverImage ? (
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-white truncate">{item.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Scan Page
export function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setScanning(true);
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Scan</h2>
      <p className="text-gray-400 mb-6">Scan your media collection to add items</p>
      
      <button
        onClick={handleScan}
        disabled={scanning}
        className="bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {scanning ? 'Scanning...' : 'Start Scan'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          {result.error ? (
            <p className="text-red-400">Error: {result.error}</p>
          ) : (
            <>
              <p className="text-green-400">Scan Complete!</p>
              <p className="text-gray-300 mt-2">Items found: {result.itemsFound || 0}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Settings Page
export function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Settings</h2>
      <div className="bg-gray-800 p-6 rounded-lg max-w-md">
        <p className="text-gray-300 mb-4">Manage your account settings here</p>
        <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">
          Update Settings
        </button>
      </div>
    </div>
  );
}

// Profile Page
export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="bg-gray-800 p-6 rounded-lg max-w-md">
        {profile ? (
          <>
            <p className="text-white mb-2">
              <span className="text-gray-400">Username:</span> {profile.username}
            </p>
            <p className="text-white mb-4">
              <span className="text-gray-400">Email:</span> {profile.email}
            </p>
          </>
        ) : (
          <p className="text-gray-400">Unable to load profile</p>
        )}
      </div>
    </div>
  );
}

// Add Media Page
export function AddPage() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'movies',
    year: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Media added successfully!');
        setFormData({ title: '', type: 'movies', year: '' });
      }
    } catch (err) {
      alert('Error adding media: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Add Media</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg max-w-md">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          >
            <option value="movies">Movie</option>
            <option value="games">Game</option>
            <option value="music">Music</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Year</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {uploading ? 'Adding...' : 'Add Media'}
        </button>
      </form>
    </div>
  );
}

// MyShelf Page (user's favorites or custom collections)
export function MyShelfPage() {
  const [shelf, setShelf] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = async () => {
    try {
      const response = await fetch('/api/user/shelf');
      const data = await response.json();
      setShelf(data);
    } catch (err) {
      console.error('Error fetching shelf:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">My Shelf</h2>
      <p className="text-gray-400 mb-6">Your personal collection</p>
      
      {shelf.length === 0 ? (
        <p className="text-gray-400">Your shelf is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shelf.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="h-48 bg-gray-700 overflow-hidden">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-white truncate">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}