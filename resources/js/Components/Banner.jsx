import React, { useEffect, useState } from "react";
import { Play, ChevronRight, Zap, X } from "lucide-react"; // Add X import
import axios from "axios";

const Banner = ({ isDarkMode }) => {
    const [backgroundImage, setBackgroundImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false); // State to control trailer modal visibility

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get("/movies/random")
            .then((response) => {
                setBackgroundImage(response.data.poster_url);
                setMovie(response.data);
            })
            .catch((err) => {
                setError("Failed to fetch random movie data.");
                console.error("Error fetching movie data:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const getBackgroundImage = () => {
        if (loading) return "/movie-banner-bg.jpg";
        if (error) return "/movie-banner-error.jpg";
        return backgroundImage || "/movie-banner-bg.jpg";
    };

    const handleWatchNowClick = () => {
        if (movie && movie.trailer_url) {
            openTrailer(); // Open trailer when the button is clicked
        }
    };

    const openTrailer = () => {
        setIsTrailerOpen(true); // Show the trailer modal
    };

    const closeTrailer = () => {
        setIsTrailerOpen(false); // Close the trailer modal
    };

    return (
        <div className="relative w-full min-h-[110vh] overflow-hidden flex items-center justify-center">
            {/* Modern Gradient Background Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(135deg,
            ${isDarkMode ? "rgba(17,24,39,0.9)" : "rgba(255,255,255,0.9)"} 0%,
            ${
                isDarkMode ? "rgba(31,41,55,0.7)" : "rgba(229,231,235,0.7)"
            } 100%)`,
                    backgroundBlendMode: "overlay",
                    backdropFilter: "blur(10px)",
                }}
            />

            {/* Background Image with Modern Blur Effect */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transform scale-105 blur-sm"
                style={{
                    backgroundImage: `url(${getBackgroundImage()})`,
                }}
            />

            {/* Content Container with Modern Design */}
            <div className="relative z-10 container mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="space-y-6 animate-fadeInLeft">
                    <h1
                        className={`text-5xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                            isDarkMode
                                ? "from-white to-gray-400"
                                : "from-gray-900 to-gray-600"
                        }`}
                    >
                        Discover Cinematic Worlds
                    </h1>

                    <p
                        className={`text-xl font-medium opacity-80 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Explore thousands of movies, create your watch list, and
                        dive into the magic of cinema with personalized
                        recommendations.
                    </p>

                    {/* Call to Action Buttons with Modern Hover Effects */}
                    <div className="flex space-x-4">
                        <button
                            onClick={handleWatchNowClick}
                            className={`group flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out transform ${
                                isDarkMode
                                    ? "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30"
                                    : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30"
                            } hover:-translate-y-1`}
                        >
                            <Play className="w-5 h-5 group-hover:animate-pulse" />
                            <span>Watch Now</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                    </div>
                </div>

                {/* Movie Poster Section */}
                <div className="hidden md:flex justify-center items-center">
                    <div className="w-[350px] h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-3">
                        <img
                            src={getBackgroundImage()}
                            alt="Featured Movie"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {isTrailerOpen && movie && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="relative w-[80vw] h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-white">
                        <button
                            onClick={closeTrailer}
                            className="absolute top-4 right-4 p-2 rounded-full text-white bg-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
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
                    </div>
                </div>
            )}

            {/* Subtle Animated Background Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none">
                <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>
        </div>
    );
};

export default Banner;
