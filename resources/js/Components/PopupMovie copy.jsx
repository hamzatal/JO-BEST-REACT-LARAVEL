import React from 'react';
import { X, PlayCircle, Bookmark, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MoviePopup = ({ movie, isDarkMode, onClose, onAddToWatchlist }) => {
  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
              : 'bg-gradient-to-br from-white to-gray-100'
          }`}
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-white' 
                : 'hover:bg-gray-200 text-black'
            }`}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Movie Content Container */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Poster Section */}
            <div className="relative">
              <img 
                src={movie.poster_url} 
                alt={movie.title} 
                className="w-full h-100 object-cover rounded-lg"
              />
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              />
            </div>

            {/* Details Section */}
            <div className={`p-6 flex flex-col justify-center space-y-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <h2 className="text-3xl font-bold tracking-tight">{movie.title}</h2>
              
              {/* Movie Metadata */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{movie.rating} / 10</span>
                </div>
                <span className="text-sm opacity-70">{movie.year}</span>
                <span className="text-sm opacity-70">{movie.genre}</span>
              </div>

              {/* Description */}
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {movie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <a 
                  href={movie.trailer_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Watch Trailer</span>
                </a>
                
                <button 
                  onClick={() => onAddToWatchlist(movie)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>Add to Watchlist</span>
                </button>
              </div>

              {/* Additional Movie Info */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-sm opacity-70">Director</span>
                  <p className="font-medium">{movie.director}</p>
                </div>
                <div>
                  <span className="text-sm opacity-70">Cast</span>
                  <p className="font-medium">{movie.cast}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MoviePopup;