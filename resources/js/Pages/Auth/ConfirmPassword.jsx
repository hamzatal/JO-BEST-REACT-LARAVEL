import React, { useState } from 'react';
import { SunMedium, Moon, Film, Lock, Clapperboard } from 'lucide-react';

const ConfirmPassword = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle password confirmation logic here
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
        <div className="flex items-center mb-8 animate-fade-in">
        <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
          <h1 className={`text-4xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          JO <span className="text-red-500">BEST</span>
          </h1>
        </div>
        <p className={`text-xl text-center max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Security is our priority. Please confirm your password to access this secure area.
        </p>
      </div>

      {/* Right Side - Confirm Password Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
         

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
          <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
            <h1 className={`text-3xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            JO <span className="text-red-500">BEST</span>
            </h1>
          </div>

          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Confirm Password
          </h2>

          <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            This is a secure area of the application. Please confirm your password before continuing.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
