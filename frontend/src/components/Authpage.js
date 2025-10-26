import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

export function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setError('');
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        
        // Decode JWT to get userId (basic decoding)
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        localStorage.setItem('userId', payload.userId);
        localStorage.setItem('userEmail', loginForm.email);

        setSuccess('Login successful! Redirecting...');
        
        // Call the success callback after a short delay
        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess(payload.userId);
          }
        }, 1000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error logging in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!signupForm.username || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: signupForm.username,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Switching to login...');
        
        // Clear form and switch to login
        setTimeout(() => {
          setSignupForm({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setLoginForm({
            email: signupForm.email,
            password: '',
          });
          setSuccess('');
          setIsLogin(true);
        }, 1500);
      } else {
        setError(data.error || data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Error creating account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" 
         style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23222;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23111;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3Cpattern id=%22wood%22 x=%220%22 y=%220%22 width=%2240%22 height=%2240%22 patternUnits=%22userSpaceOnUse%22%3E%3Crect width=%2240%22 height=%2240%22 fill=%22url(%23grad)%22 /%3E%3Cline x1=%220%22 y1=%220%22 x2=%2240%22 y2=%220%22 stroke=%22%23333%22 stroke-width=%220.5%22 /%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22400%22 height=%22400%22 fill=%22url(%23wood)%22 /%3E%3C/svg%3E")' }}>
      
      <div className="w-full max-w-md mx-auto px-4">
        {/* Modal Form */}
        <div className="bg-gray-100 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-green-500 mb-2">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-gray-600 mb-8">
            {isLogin ? 'Welcome back to your shelf' : 'Start filling your shelf.'}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* LOGIN FORM */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="your@email.com"
                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center">
                <p className="text-gray-700">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-green-500 font-semibold hover:text-green-600"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={signupForm.username}
                    onChange={handleSignupChange}
                    placeholder="Choose a username"
                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    placeholder="your@email.com"
                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className="text-center">
                <p className="text-gray-700">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-green-500 font-semibold hover:text-green-600"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">MediaShelf © 2024</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;