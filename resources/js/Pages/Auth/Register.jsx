import React, { useState, useEffect } from 'react';
import { SunMedium, Moon, Mail, Lock, Film, Eye, EyeOff, User, Clapperboard } from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Functions
  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    if (name.length > 50) return 'Name cannot exceed 50 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return null;
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 100) return 'Email cannot exceed 100 characters';
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';

    // Length check
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (password.length > 64) return 'Password cannot exceed 64 characters';

    // Complexity checks
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!hasNumbers) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character';

    // Common password checks
    const commonPasswords = [
      'password', '123456', 'qwerty', 'admin', 'letmein',
      'welcome', 'monkey', 'password1', '12345678'
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      return 'This password is too common. Please choose a stronger password.';
    }

    return null;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const nameError = validateName(data.name);
    if (nameError) newErrors.name = nameError;

    // Email validation
    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    // Password validation
    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;

    // Confirm password validation
    const confirmPasswordError = validateConfirmPassword(data.password, data.password_confirmation);
    if (confirmPasswordError) newErrors.password_confirmation = confirmPasswordError;

    return newErrors;
  };

  const submit = (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Perform validation
    const validationErrors = validateForm();

    // If there are validation errors, set them and prevent submission
    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach(key => {
        setError(key, validationErrors[key]);
      });
      return;
    }

    // If no errors, proceed with form submission
    post(route('register'));
  };

  // Toggle Dark Mode (optional)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Head title="Register" />

      {/* Dark Mode Toggle Button */}
      

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
        <div className="flex items-center mb-8 animate-fade-in">
        <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
          <h1 className={`text-4xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            JO <span className="text-red-500">BEST</span>
          </h1>
        </div>
        <p className={`text-xl text-center max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join our community of movie enthusiasts. Create your account to access unlimited movies, personalized recommendations, and exclusive content.
        </p>
      </div>

      {/* Right Side - Registration Form */}
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

          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create Account
          </h2>

          <form onSubmit={submit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                />
              </div>
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                  autoComplete="username"
                />
              </div>
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
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
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="password_confirmation"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.password_confirmation ? 'border-red-500' : ''}`}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <span className="text-red-500 text-sm mt-1">{errors.password_confirmation}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href={route('login')}
                className={`text-sm hover:underline ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Already registered?
              </Link>

              <button
                type="submit"
                disabled={processing}
                className={`py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } ${processing && 'opacity-50 cursor-not-allowed'}`}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
