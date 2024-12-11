import React, { useState } from "react";
import { X, PlayCircle, Bookmark, BookmarkCheck, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const MoviePopup = ({
    movie,
    isDarkMode,
    onClose,
    onAddToWatchlist,
    isInWatchlist,
}) => {
    const [isAdded, setIsAdded] = useState(isInWatchlist);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [watchNowLoading, setWatchNowLoading] = useState(false);

    const handleToggleWatchlist = () => {
        onAddToWatchlist(movie);
        setIsAdded(!isAdded);
    };

    const handleOpenTrailer = () => {
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
    };

    const handleWatchNowClick = async () => {
        try {
            setWatchNowLoading(true);

            // Get user ID
            const userResponse = await axios.get("/user");
            const userId = userResponse.data.id;

            // Make the API call to add watched movie entry
            const response = await axios.post("/watched-movies", {
                user_id: userId,
                movie_id: movie.id,
            });
            console.log("Watched movie added:", response.data);

            // Show the trailer or movie details
            handleOpenTrailer();
        } catch (error) {
            console.error("Error marking movie as watched:", error);
        } finally {
            setWatchNowLoading(false);
        }
    };

    if (!movie) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.7, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.7, y: 50, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 25,
                    }}
                    className={`relative w-[80vw] h-[80vh] rounded-3xl overflow-hidden shadow-2xl border-2 flex flex-col ${
                        isDarkMode
                            ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
                            : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                    }`}
                >
                    {/* Close Button */}
                    <motion.button
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
                            isDarkMode
                                ? "hover:bg-gray-700 text-white bg-gray-800"
                                : "hover:bg-gray-200 text-black bg-white"
                        }`}
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    {/* Movie Content Container */}
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Poster Section */}
                        <div className="md:w-[40%] h-[40vh] md:h-full flex items-center justify-center">
                            <div className="w-full h-full overflow-hidden rounded-lg">
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div
                            className={`md:w-[60%] flex flex-col justify-center p-6 overflow-y-auto space-y-4 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            <motion.h2
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold tracking-tight"
                            >
                                {movie.title}
                            </motion.h2>

                            {/* Movie Metadata */}
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center space-x-3 mb-2"
                            >
                                <div className="flex items-center space-x-2 bg-yellow-400/20 px-2 py-1 rounded-full">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-semibold text-yellow-500">
                                        {movie.rating} / 10
                                    </span>
                                </div>
                                <span className="text-xs opacity-70">
                                    {movie.year}
                                </span>
                                <span className="text-xs opacity-70">
                                    {movie.genre}
                                </span>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className={`text-sm leading-relaxed tracking-wide mb-4 max-w-xl ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                {movie.description}
                            </motion.p>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex space-x-3 mb-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWatchNowClick}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                                        isDarkMode
                                            ? "bg-red-600 hover:bg-red-700 text-white"
                                            : "bg-red-500 hover:bg-red-600 text-white"
                                    }`}
                                    disabled={watchNowLoading}
                                >
                                    <PlayCircle className="w-5 h-5" />
                                    <span className="font-medium">
                                        {watchNowLoading
                                            ? "Loading..."
                                            : "Watch Now"}
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleToggleWatchlist}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                                        isDarkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                                    }`}
                                >
                                    {isAdded ? (
                                        <>
                                            <BookmarkCheck className="w-5 h-5 text-green-500" />
                                            <span className="font-medium">
                                                Added
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Bookmark className="w-5 h-5" />
                                            <span className="font-medium">
                                                Watchlist
                                            </span>
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>

                            {/* Additional Info */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-2 gap-3 border-t border-opacity-20 pt-3 border-white max-w-xl w-full"
                            >
                                <div>
                                    <span className="text-xs opacity-70 uppercase tracking-wide">
                                        Director
                                    </span>
                                    <p className="text-sm font-semibold">
                                        {movie.director}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs opacity-70 uppercase tracking-wide">
                                        Cast
                                    </span>
                                    <p className="text-sm font-semibold">
                                        {movie.cast}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Trailer Modal */}
                {isTrailerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.7, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.7, y: 50, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 25,
                            }}
                            className="relative w-[80vw] h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-white"
                        >
                            <motion.button
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleCloseTrailer}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 hover:bg-gray-700 text-white bg-gray-800"
                            >
                                <X className="w-5 h-5" />
                            </motion.button>
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${
                                    movie.trailer_url.split("v=")[1]
                                }?autoplay=1`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Trailer"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default MoviePopup;
