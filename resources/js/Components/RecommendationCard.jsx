import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Info } from "lucide-react";
import { createPortal } from "react-dom";
import MoviePopup from "./PopupMovie";
import axios from "axios";

const RecommendationCard = ({
    movie,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isInLocalStorage, setIsInLocalStorage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if the movie is in local storage when the component mounts
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const isInList = watchlist.some((item) => item.id === movie.id);
        setIsInLocalStorage(isInList);
    }, [movie.id]);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleWatchlistToggle = async () => {
        setIsLoading(true); // Set loading state to true when API call starts

        try {
            if (isInLocalStorage) {
                await handleRemoveFromWatchlist(movie);
            } else {
                await handleAddToWatchlist(movie);
            }
        } catch (error) {
            console.error("Error updating watchlist:", error);
        } finally {
            setIsLoading(false); // Set loading state to false when API call finishes
        }
    };

    const handleAddToWatchlist = async (movie) => {
        try {
            // Make API request to add movie to favorites
            const response = await axios.post(`/favorites/${movie.id}`);
            addToWatchlist(movie); // Update local watchlist state
            // Add to local storage
            const watchlist =
                JSON.parse(localStorage.getItem("watchlist")) || [];
            localStorage.setItem(
                "watchlist",
                JSON.stringify([...watchlist, movie])
            );
            setIsInLocalStorage(true);
            console.log(response.data);
        } catch (error) {
            console.error("Error adding to watchlist:", error);
        }
    };

    const handleRemoveFromWatchlist = async (movie) => {
        try {
            // Make API request to remove movie from favorites
            const userResponse = await axios.get("/user");
            const userId = userResponse.data.id;

            const response = await axios.delete(`/favorites/${movie.id}`, {
                data: { user_id: userId },
            });

            removeFromWatchlist(movie.id); // Update local watchlist state
            // Remove from local storage
            const updatedWatchlist = JSON.parse(
                localStorage.getItem("watchlist")
            ).filter((item) => item.id !== movie.id);
            localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
            setIsInLocalStorage(false);
            console.log(response.data);
        } catch (error) {
            console.error("Error removing from watchlist:", error);
        }
    };

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                layout
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
                <div className="relative w-full h-[500px] overflow-hidden">
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center"
                >
                    <div className="flex space-x-4 items-center">
                        <motion.a
                            href={movie.trailer_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center 
                                       bg-white/20 hover:bg-white/40 
                                       backdrop-blur-md 
                                       text-white 
                                       px-4 py-3
                                       rounded-full 
                                       transition-all 
                                       group/trailer"
                        >
                            <PlayCircle className="w-5 h-5 mr-2 group-hover/trailer:animate-pulse" />
                            <span className="text-sm font-medium">Trailer</span>
                        </motion.a>

                        <motion.button
                            onClick={handleOpenPopup}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center 
                                       bg-red-600/80 hover:bg-red-600 
                                       text-white 
                                       px-4 py-3
                                       rounded-full 
                                       transition-all 
                                       group/details"
                        >
                            <Info className="w-5 h-5 mr-2 group-hover/details:rotate-12 transition-transform" />
                            <span className="text-sm font-medium">Details</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {showPopup &&
                createPortal(
                    <MoviePopup
                        movie={movie}
                        isDarkMode={true}
                        onClose={handleClosePopup}
                        onAddToWatchlist={handleWatchlistToggle}
                        isInWatchlist={isInLocalStorage}
                        isLoading={isLoading}
                    />,
                    document.body
                )}
        </div>
    );
};

export default RecommendationCard;
