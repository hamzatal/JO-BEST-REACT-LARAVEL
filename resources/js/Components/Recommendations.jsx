import React, { useState } from "react";
import Slider from "./Slider";
import RecommendationCard from "./RecommendationCard";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";

const Recommendations = ({
    recommendations,
    onTrailerClick,
    onDetailsClick,
}) => {
    const [isDarkMode] = useState(true);
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (movie) => {
        setWatchlist((prevList) => [...prevList, movie]);
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prevList) =>
            prevList.filter((movie) => movie.id !== movieId)
        );
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some((movie) => movie.id === movieId);
    };

    const renderRecommendationCard = (movie) => (
        <RecommendationCard
            key={movie.id}
            movie={movie}
            addToWatchlist={addToWatchlist} // Pass addToWatchlist function
            removeFromWatchlist={removeFromWatchlist} // Pass removeFromWatchlist function
            isInWatchlist={isInWatchlist(movie.id)} // Check if movie is in watchlist
            onTrailerClick={onTrailerClick}
            onDetailsClick={onDetailsClick}
        />
    );

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center space-x-4 mb-8"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <TrendingUp className="w-10 h-10 text-blue-400" />
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Recommended Movies
                    </h2>
                    <Sparkles className="w-8 h-8 animate-pulse text-purple-400" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-2xl p-4 bg-gray-800/50 border border-gray-700"
                >
                    <Slider
                        movies={recommendations}
                        renderMovieCard={renderRecommendationCard}
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Recommendations;
