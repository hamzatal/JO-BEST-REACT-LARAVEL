import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import ModernMoviesGrid from "../components/Movies";
import Recommendations from "../components/Recommendations";
import {
    X,
    Star,
    Flame,
    Clapperboard,
    Rocket,
    Ghost,
    Drama,
    Heart,
    Wand2,
    Skull,
    Film,
    MessageCircle,
    ThumbsUp,
    SparklesIcon,
    TrendingUp
} from "lucide-react";

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [hasFavoritesOrWatched, setHasFavoritesOrWatched] = useState(false);

    const movieCategories = [
        {
            title: "Featured Movies",
            apiUrl: "/movies/featured",
            icon: <SparklesIcon className="mr-2 text-yellow-400" />
        },
        {
            title: "Trending Movies",
            apiUrl: "/movies/trending",
            icon: <TrendingUp className="mr-2 text-orange-500" />
        },
        {
            title: "Action Movies",
            apiUrl: "/movies/genre/action",
            icon: <Clapperboard className="mr-2 text-red-500" />
        },
        {
            title: "Sci-Fi Movies",
            apiUrl: "/movies/genre/Sci-Fi",
            icon: <Rocket className="mr-2 text-blue-500" />
        },
        {
            title: "Horror Movies",
            apiUrl: "/movies/genre/Horror",
            icon: <Ghost className="mr-2 text-purple-500" />
        },
        {
            title: "Drama Movies",
            apiUrl: "/movies/genre/drama",
            icon: <Drama className="mr-2 text-green-500" />
        },
        {
            title: "Romantic Movies",
            apiUrl: "/movies/genre/romantic",
            icon: <Heart className="mr-2 text-pink-500" />
        },
        {
            title: "Fantasy Movies",
            apiUrl: "/movies/genre/fantasy",
            icon: <Wand2 className="mr-2 text-indigo-500" />
        },
        {
            title: "Crime Movies",
            apiUrl: "/movies/genre/Crime",
            icon: <Skull className="mr-2 text-gray-700" />
        },
    ];

    // Fetch user ID and recommendations when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/user");
                setUserId(response.data.id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Check if the user has favorites or watched movies
    useEffect(() => {
        if (userId) {
            const checkUserFavoritesAndWatched = async () => {
                try {
                    const favoritesResponse = await axios.get("/favorites");
                    const watchedResponse = await axios.get(
                        "/watched-movies",
                        {
                            params: { user_id: userId },
                        }
                    );

                    if (
                        favoritesResponse.data.length > 0 ||
                        watchedResponse.data.length > 0
                    ) {
                        setHasFavoritesOrWatched(true);
                    }
                } catch (error) {
                    console.error(
                        "Error checking favorites or watched movies:",
                        error
                    );
                }
            };

            checkUserFavoritesAndWatched();
        }
    }, [userId]);

    // Fetch recommendations after userId is set and if they have favorites or watched movies
    useEffect(() => {
        if (userId && hasFavoritesOrWatched) {
            const fetchRecommendations = async () => {
                try {
                    const response = await axios.get(
                        `/movies/chatgpt-recommendations/${userId}`
                    );
                    setRecommendations(response.data.recommended_movies);
                } catch (error) {
                    console.error("Error fetching recommendations:", error);
                }
            };

            fetchRecommendations();
        }
    }, [userId, hasFavoritesOrWatched]);

    useEffect(() => {
        const tooltipTimer = setTimeout(() => {
            setIsTooltipVisible(false);
        }, 5000);

        return () => clearTimeout(tooltipTimer);
    }, []);

    const handleAddToWishlist = (movie) => {
        if (!wishlist.some((m) => m.id === movie.id)) {
            setWishlist([...wishlist, movie]);
        }
    };

    const handleLogout = () => {
        console.log("Logging out");
        // Implement actual logout logic
    };

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const resetChat = () => {
        // Implement chat reset logic
        console.log("Resetting chat");
    };

    const handleCloseTooltip = () => {
        setIsTooltipVisible(false);
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                isDarkMode
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
                    : "bg-gradient-to-br from-gray-50 to-white text-gray-900"
            }`}
        >
            <NavBar
                isDarkMode={isDarkMode}
                wishlist={wishlist}
                handleLogout={handleLogout}
            />

            <Banner isDarkMode={isDarkMode} />

            <main className="pt-24 px-6 max-w-7xl mx-auto">
                {/* Movie Recommendations Section */}
                {hasFavoritesOrWatched && (
                    <div className="mb-8">
                      
                        <Recommendations
                            recommendations={recommendations}
                            handleAddToWishlist={handleAddToWishlist}
                        />
                    </div>
                )}

                {/* Movie Categories Section */}
                {movieCategories.map((category) => (
                    <ModernMoviesGrid
                        key={category.apiUrl}
                        title={
                            <div className="flex items-center">
                                {category.icon}
                                {category.title}
                            </div>
                        }
                        apiUrl={category.apiUrl}
                        isDarkMode={isDarkMode}
                        onAddToWishlist={handleAddToWishlist}
                    />
                ))}
            </main>

            <Footer isDarkMode={isDarkMode} />

            <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center">
                {isTooltipVisible && (
                    <div
                        className={`relative mb-5 p-5 bg-white text-black rounded-lg shadow-lg text-sm transition-all duration-300 animate-fade-in-down whitespace-nowrap`}
                    >
                        <button
                            onClick={handleCloseTooltip}
                            className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex items-center">
                            <MessageCircle className="mr-2 text-blue-500" />
                            <p>Need help? Chat with our AI assistant</p>
                        </div>
                    </div>
                )}
                <ChatBot
                    isChatOpen={isChatOpen}
                    toggleChat={toggleChat}
                    resetChat={resetChat}
                />
            </div>
        </div>
    );
};

export default Home;
