import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Slider from "../components/Slider";
import MovieCard from "../components/MovieCard";

const ModernMoviesGrid = ({
    title,
    apiUrl,
    icon,
    isDarkMode,
    isFeatured = false,
    onAddTowatchlist,
}) => {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios
            .get(apiUrl)
            .then((response) => {
                setMovies(response.data);
            })
            .catch((err) => {
                setError("Failed to fetch movies.");
                console.error("Error fetching movies:", err);
            })
            .finally(() => {
                setLoading(false);
            });

        const savedWatchlist =
            JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(savedWatchlist);
    }, [apiUrl]);

    const addToWatchlist = (movie) => {
        const updatedWatchlist = [...watchlist, movie];
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        onAddTowatchlist?.(movie);
    };

    const removeFromWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.filter((m) => m.id !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    };

    if (loading)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`w-full p-8 rounded-3xl shadow-2xl ${
                    isDarkMode
                        ? "bg-gradient-to-br from-gray-900 to-gray-800"
                        : "bg-gradient-to-br from-white to-gray-50"
                }`}
            >
                {/* Loading state */}
            </motion.div>
        );

    if (error)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`w-full p-8 rounded-3xl shadow-2xl ${
                    isDarkMode
                        ? "bg-gradient-to-br from-gray-900 to-gray-800"
                        : "bg-gradient-to-br from-white to-gray-50"
                }`}
            >
                {/* Error state */}
            </motion.div>
        );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`w-full p-8 rounded-3xl shadow-2xl ${
                isDarkMode
                    ? "bg-gradient-to-br from-gray-900 to-gray-800"
                    : "bg-gradient-to-br from-white to-gray-50"
            }`}
        >
            <div className="flex items-center space-x-6 mb-8">
                {React.isValidElement(icon) &&
                    React.cloneElement(icon, {
                        className: `w-10 h-10 ${
                            isDarkMode ? "text-white" : "text-gray-800"
                        }`,
                    })}
                <h2
                    className={`text-3xl font-extrabold tracking-tight ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    {title}
                </h2>
            </div>

            {movies.length > 0 ? (
                <Slider
                    movies={movies}
                    isDarkMode={isDarkMode}
                    renderMovieCard={(movie) => (
                        <MovieCard
                            movie={movie}
                            isDarkMode={isDarkMode}
                            isInwatchlist={watchlist.some(
                                (m) => m.id === movie.id
                            )}
                            addTowatchlist={addToWatchlist}
                            removeFromwatchlist={removeFromWatchlist}
                        />
                    )}
                />
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center text-xl font-medium ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    No movies found
                </motion.p>
            )}
        </motion.div>
    );
};

export default ModernMoviesGrid;
