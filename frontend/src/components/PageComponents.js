import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

// Generic Media Page Component (reusable)
function MediaPage({ mediaType, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get userId from localStorage or context (adjust as needed)
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMedia();
  }, [mediaType, searchTerm]);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/media/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          mediaType: mediaType,
          searchTerm: searchTerm || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      const data = await response.json();
      setItems(data.data || []);
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

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, creator, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded"
        />
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-400">No {mediaType} found in your collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
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
                <p className="text-sm text-gray-400 truncate">{item.creator}</p>
                {item.releaseYear && (
                  <p className="text-xs text-gray-500 mt-2">{item.releaseYear}</p>
                )}
                {item.userRating && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-300">{item.userRating}</span>
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

// Books Page
export function BooksPage() {
  return (
    <MediaPage
      mediaType="books"
      title="Books"
      description="Your book collection"
    />
  );
}

// Home Page (shows all media)
export function HomePage() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const fetchAllMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all media types
      const mediaTypes = ['movies', 'games', 'music', 'books'];
      const allResults = [];

      for (const type of mediaTypes) {
        const response = await fetch('/api/media/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId,
            mediaType: type,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          allResults.push(...(data.data || []));
        }
      }

      setAllItems(allResults);
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

  const movieCount = allItems.filter(item => item.mediaType === 'movies').length;
  const gameCount = allItems.filter(item => item.mediaType === 'games').length;
  const musicCount = allItems.filter(item => item.mediaType === 'music').length;
  const bookCount = allItems.filter(item => item.mediaType === 'books').length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Home</h2>
      <p className="text-gray-400 mb-8">Welcome to your media collection!</p>
      
      {error && <p className="text-red-400 mb-4">Error: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Books</p>
          <p className="text-4xl font-bold text-white">{bookCount}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Recently Added</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allItems.slice(0, 8).map((item) => (
          <div
            key={item._id}
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
              <p className="text-xs text-gray-400 mt-1">{item.mediaType}</p>
            </div>
          </div>
        ))}
      </div>
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
    mediaType: 'movies',
    creator: '',
    genre: '',
    releaseYear: '',
    userRating: '',
    isbn: '',
    pageCount: '',
    runTimeMinutes: '',
    platform: '',
    formats: [],
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      const response = await fetch('/api/media/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Media added successfully!');
        setFormData({
          title: '',
          mediaType: 'movies',
          creator: '',
          genre: '',
          releaseYear: '',
          userRating: '',
          isbn: '',
          pageCount: '',
          runTimeMinutes: '',
          platform: '',
          formats: [],
        });
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error: ' + (data.message || 'Failed to add media'));
      }
    } catch (err) {
      setMessage('Error adding media: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Add Media</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg max-w-md">
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Media Type *</label>
          <select
            value={formData.mediaType}
            onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            required
          >
            <option value="movies">Movie</option>
            <option value="games">Game</option>
            <option value="music">Music</option>
            <option value="books">Book</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Creator *</label>
          <input
            type="text"
            value={formData.creator}
            onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            placeholder="Director, Artist, Author, Developer..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Genre</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Release Year</label>
          <input
            type="number"
            value={formData.releaseYear}
            onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Your Rating</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={formData.userRating}
            onChange={(e) => setFormData({ ...formData, userRating: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">ISBN (Books)</label>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Page Count (Books)</label>
          <input
            type="number"
            value={formData.pageCount}
            onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Runtime (Minutes)</label>
          <input
            type="number"
            value={formData.runTimeMinutes}
            onChange={(e) => setFormData({ ...formData, runTimeMinutes: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Platform (Games)</label>
          <input
            type="text"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            placeholder="PC, PS5, Nintendo Switch, etc."
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

// My Shelf Page (user's media collection)
export function MyShelfPage() {
  const [shelf, setShelf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/media/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          mediaType: 'movies', // Can be modified to fetch all types
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShelf(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching shelf:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (mediaId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch('/api/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaId: mediaId,
          userId: userId,
        }),
      });

      if (response.ok) {
        setShelf(shelf.filter(item => item._id !== mediaId));
        alert('Item deleted successfully');
      } else {
        const data = await response.json();
        alert('Error: ' + (data.message || 'Failed to delete item'));
      }
    } catch (err) {
      alert('Error deleting item: ' + err.message);
    }
  };

  const handleUpdateItem = async (mediaId) => {
    try {
      const response = await fetch('/api/media/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaId: mediaId,
          userId: userId,
          ...editData,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        setSelectedItem(null);
        fetchShelf();
        alert('Item updated successfully');
      } else {
        const data = await response.json();
        alert('Error: ' + (data.message || 'Failed to update item'));
      }
    } catch (err) {
      alert('Error updating item: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (selectedItem && isEditing) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-4">Edit Media</h2>
        <div className="bg-gray-800 p-6 rounded-lg max-w-md">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              defaultValue={selectedItem.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Your Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.5"
              defaultValue={selectedItem.userRating}
              onChange={(e) => setEditData({ ...editData, userRating: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateItem(selectedItem._id)}
              className="flex-1 bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedItem(null);
              }}
              className="flex-1 bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">My Shelf</h2>
      <p className="text-gray-400 mb-6">Your personal media collection</p>
      
      {shelf.length === 0 ? (
        <p className="text-gray-400">Your shelf is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shelf.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer group relative"
            >
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
              <div className="p-4">
                <h4 className="font-semibold text-white truncate">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.creator}</p>
                {item.userRating && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-300">{item.userRating}/10</span>
                  </div>
                )}
              </div>
              <div className="absolute top-2 right-2 gap-2 flex opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setIsEditing(true);
                  }}
                  className="bg-blue-600 px-2 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-600 px-2 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}