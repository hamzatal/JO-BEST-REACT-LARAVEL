import React, { useState, useEffect } from "react";
import {
    Trash2,
    Bookmark,
    Film,
    Star,
    Clock,
    PlayCircle,
    Filter,
    SortDesc,
    Heart,
    Calendar,
    Clapperboard,
    Tag,
    User,
    X,
    AlertTriangle
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

const WatchlistPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("recent");
    const [deletionConfirmation, setDeletionConfirmation] = useState(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    // New state for deletion modal
    const [deletionModal, setDeletionModal] = useState({
        isOpen: false,
        movieId: null,
        movieTitle: ''
    });
    const handleOpenTrailer = () => {
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
    };
    // Fetch the watchlist data
    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                setLoading(true);

                // Check if the watchlist is already saved in localStorage
                const storedWatchlist = localStorage.getItem("watchlist");
                if (storedWatchlist) {
                    setWatchlist(JSON.parse(storedWatchlist));
                    setLoading(false);
                    return;
                }

                // Fetch the authenticated user's data
                const userResponse = await axios.get("/user");
                const userId = userResponse.data.id;

                // Fetch watchlist for the authenticated user
                const favoritesResponse = await axios.get(`/favorites`);
                let processedWatchlist = favoritesResponse.data.data;

                if (filter !== "all") {
                    processedWatchlist = processedWatchlist.filter(
                        (movie) => movie.genre.toLowerCase() === filter
                    );
                }

                if (sort === "rating") {
                    processedWatchlist.sort((a, b) => b.rating - a.rating);
                } else if (sort === "recent") {
                    processedWatchlist.sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    );
                }

                // Store the fetched watchlist in localStorage
                localStorage.setItem(
                    "watchlist",
                    JSON.stringify(processedWatchlist)
                );
                setWatchlist(processedWatchlist);
            } catch (error) {
                setError("Failed to load watchlist");
                console.error("Error fetching watchlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, [filter, sort]);

    // Remove movie from the watchlist
    const removeFromWatchlist = async () => {
        if (!deletionModal.movieId) return;

        try {
            const userResponse = await axios.get("/user");
            const userId = userResponse.data.id;

            await axios.delete(`/favorites/${deletionModal.movieId}`, {
                data: { user_id: userId },
            });

            // Remove movie from local storage
            const updatedWatchlist = watchlist.filter(
                (movie) => movie.id !== deletionModal.movieId
            );
            localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

            // Update the watchlist locally
            setWatchlist(updatedWatchlist);

            // Show deletion confirmation
            setDeletionConfirmation(`${deletionModal.movieTitle} has been removed from your watchlist`);

            // Clear confirmation after 3 seconds
            setTimeout(() => {
                setDeletionConfirmation(null);
            }, 3000);

            // Close the modal
            setDeletionModal({ isOpen: false, movieId: null, movieTitle: '' });
        } catch (error) {
            console.error("Error removing movie from watchlist:", error);
            alert("Failed to remove the movie from the watchlist.");
        }
    };

    // Open deletion confirmation modal
    const openDeletionModal = (movieId, movieTitle) => {
        setDeletionModal({
            isOpen: true,
            movieId: movieId,
            movieTitle: movieTitle
        });
    };

    // Close deletion confirmation modal
    const closeDeletionModal = () => {
        setDeletionModal({ isOpen: false, movieId: null, movieTitle: '' });
    };

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Deletion Confirmation Modal Component
    const DeletionConfirmationModal = () => {
        if (!deletionModal.isOpen) return null;

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                role="dialog"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div
                    className={`w-96 rounded-xl shadow-2xl p-6 ${
                        isDarkMode
                            ? 'bg-gray-800 text-white'
                            : 'bg-white text-gray-900'
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                            <h2 id="modal-title" className="text-xl font-bold">
                                Confirm Deletion
                            </h2>
                        </div>
                        <button
                            onClick={closeDeletionModal}
                            className={`hover:bg-gray-700 p-2 rounded-full ${
                                isDarkMode
                                    ? 'text-gray-300 hover:bg-gray-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <p
                        id="modal-description"
                        className={`mb-6 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        Are you sure you want to remove
                        <span className="font-semibold ml-1">
                            {deletionModal.movieTitle}
                        </span>
                        from your watchlist?
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={closeDeletionModal}
                            className={`flex-1 py-3 rounded-lg transition-all hover:scale-105 ${
                                isDarkMode
                                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={removeFromWatchlist}
                            className={`flex-1 py-3 rounded-lg transition-all hover:scale-105 ${
                                isDarkMode
                                    ? 'bg-red-700 text-white hover:bg-red-800'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-full">
                    <p
                        className={`text-xl ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        Loading your watchlist...
                    </p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center items-center h-full">
                    <p className="text-xl text-red-500">{error}</p>
                </div>
            );
        }

        if (watchlist.length === 0) {
            return (
                <div className="flex flex-col justify-center items-center h-full text-center space-y-4">
                    <Bookmark
                        className={`w-20 h-20 ${
                            isDarkMode ? "text-gray-700" : "text-gray-500"
                        }`}
                    />
                    <div>
                        <p
                            className={`text-2xl font-medium ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            Your watchlist is empty
                        </p>
                        <p
                            className={`text-sm mt-2 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                            Add some movies to get started!
                        </p>
                    </div>
                    <Link
                        href="/home"
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all hover:scale-105 ${
                            isDarkMode
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                        <Film className="w-5 h-5" />
                        <span>Browse Movies</span>
                    </Link>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {deletionConfirmation && (
                    <div
                        className={`p-4 rounded-lg text-center transition-all duration-300 ${
                            isDarkMode
                                ? "bg-red-800 text-white"
                                : "bg-red-500 text-white"
                        }`}
                    >
                        {deletionConfirmation}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {watchlist.map((movie) => (
                        <div
                            key={movie.id}
                            className={`rounded-xl p-5 shadow-lg border transition-all hover:scale-105 relative overflow-hidden ${
                                isDarkMode
                                    ? "bg-gray-800 border-gray-700 text-white"
                                    : "bg-white border-gray-200 text-gray-900"
                            }`}
                        >
                            <div className="mb-4">
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    className="w-full h-auto object-contain rounded-xl"
                                />
                            </div>

                            <div className="px-2">
                                <h3
                                    className={`text-xl font-bold truncate mb-2 ${
                                        isDarkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {movie.title}
                                </h3>

                                <div
                                    className={`space-y-2 text-sm ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                    }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-red-500" />
                                        <span>{movie.release_date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Tag className="w-4 h-4 text-red-500" />
                                        <span>{movie.genre}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-4 h-4 text-red-500" />
                                        <span>{movie.rating}/10</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-red-500" />
                                        <span>{movie.director}</span>
                                    </div>
                                </div>

                                <div
                                    className={`mt-4 flex flex-col items-center space-y-3 border-t pt-4 ${
                                        isDarkMode
                                            ? "border-gray-700"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <Clock className="w-5 h-5 text-red-500" />
                                            <span
                                                className={`text-sm ${
                                                    isDarkMode
                                                        ? "text-gray-400"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {movie.duration} min
                                            </span>
                                        </div>
                                        {/* <Link
                                            href={`/movies/${movie.id}/watch`}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                                                isDarkMode
                                                    ? "bg-red-600 text-white hover:bg-red-700"
                                                    : "bg-red-500 text-white hover:bg-red-600"
                                            }`}
                                        >
                                            <PlayCircle className="w-5 h-5" />
                                            <span>Watch Now</span>
                                        </Link> */}
                                        {/* Trailer Modal */}
                                        {isTrailerOpen && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm"
                                            >
                                                <motion.div
                                                    initial={{
                                                        scale: 0.7,
                                                        y: 50,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        y: 0,
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        scale: 0.7,
                                                        y: 50,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 250,
                                                        damping: 25,
                                                    }}
                                                    className="relative w-[80vw] h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-white"
                                                >
                                                    <motion.button
                                                        whileHover={{
                                                            rotate: 90,
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={
                                                            handleCloseTrailer
                                                        }
                                                        className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 hover:bg-gray-700 text-white bg-gray-800"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </motion.button>
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={`https://www.youtube.com/embed/${
                                                            movie.trailer_url.split(
                                                                "v="
                                                            )[1]
                                                        }?autoplay=1`}
                                                        frameBorder="0"
                                                        allow="autoplay; encrypted-media"
                                                        allowFullScreen
                                                    ></iframe>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() =>
                                            openDeletionModal(
                                                movie.id,
                                                movie.title
                                            )
                                        }
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm w-50 justify-center transition-all hover:scale-105 ${
                                            isDarkMode
                                                ? "bg-red-700 text-white hover:bg-red-800"
                                                : "bg-red-500 text-white hover:bg-red-600"
                                        }`}
                                    >
                                        <Trash2 className="w-5 h-5 mr-2" />
                                        Remove from Watchlist
                                    </button>
                                    <a
                                        href={movie.trailer_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                                            isDarkMode
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        <PlayCircle className="w-5 h-5" />
                                        <span>Watch Now</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Deletion Confirmation Modal */}
                <DeletionConfirmationModal />
            </div>
        );
    };

    return (
        <div
            className={`min-h-screen pt-16 flex flex-col transition-colors duration-300 ${
                isDarkMode
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-900"
            }`}
        >
            <Head title="My Watchlist" />
            <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
                <div className="flex items-center space-x-4 mb-8">
                    <Bookmark
                        className={`w-10 h-10 ${
                            isDarkMode ? "text-red-500" : "text-red-600"
                        }`}
                    />
                    <h2
                        className={`text-3xl font-black tracking-tight ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        My Watchlist
                    </h2>
                </div>

                {renderContent()}
            </main>

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
};

export default WatchlistPage;
