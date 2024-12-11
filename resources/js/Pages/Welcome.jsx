import React, { useState } from "react";
import { Clapperboard, Play, Info, CircleDollarSign } from "lucide-react";
import SubscriptionPage from './SubscriptionPage';

const SubscribeModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic email validation
        if (email.trim()) {
            // TODO: Implement actual subscription logic
            console.log('Subscribed with email:', email);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    Subscribe to <span className="text-red-500">JO BEST</span>
                </h2>
                <p className="text-gray-400 mb-6 text-center">
                    Get the latest updates, exclusive content, and special offers!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors"
                        >
                            Subscribe
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-transparent border border-white hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const WelcomePage = () => {
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const movieBackground = "/images/background.jpg";

    const handlePlanSubscription = (plan) => {
        // Handle plan subscription logic
        console.log('Selected Plan:', plan);
        // You might want to redirect to checkout, process payment, etc.
        window.location.href = '/checkout'; // Example redirect
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background with Opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
                style={{
                    backgroundImage: `url(${movieBackground})`,
                }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navbar */}
                <nav className="flex justify-between items-center p-6">
                    <div className="flex items-center">
                        <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
                        <h1 className="text-3xl font-bold">
                            JO <span className="text-red-500">BEST</span>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.location.href = '/about-us'}
                            className="bg-transparent border border-white hover:bg-white/20 text-white px-6 py-2 rounded-full transition-colors flex items-center"
                        >
                            About Us <Info className="ml-2 w-5 h-5" />
                        </button>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors flex items-center"
                        >
                            Login <Play className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-100px)]">
                    <div className="text-center max-w-3xl">
                        <h1 className="text-6xl font-black mb-6 leading-tight">
                            Welcome to JO{" "}
                            <span className="text-red-500">BEST</span>
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed">
                            Dive into a world of unlimited entertainment. JO
                            BEST brings you the latest blockbusters, timeless
                            classics, and exclusive originals right at your
                            fingertips. Stream anytime, anywhere, and transform
                            your movie-watching experience.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => window.location.href = '/register'}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-colors flex items-center"
                            >
                                Get Started <Play className="ml-2" />
                            </button>
                            <button
                                onClick={() => window.location.href = '/SubscriptionPage' }
                                className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500/20 px-8 py-3 rounded-full transition-colors flex items-center"
                            >
                                Subscribe <CircleDollarSign className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Modal */}
            {/* <SubscriptionPage
                isOpen={isSubscriptionModalOpen}
                onClose={() => setIsSubscriptionModalOpen(false)}
                onSubscribe={handlePlanSubscription}
            /> */}
        </div>
    );
};

export default WelcomePage;
