import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    BookOpen,
    Bookmark,
    LogOut,
    User,
    Settings, Clapperboard
} from "lucide-react";
import { Link } from "@inertiajs/react";
import LiveSearch from "./LiveSearch";

const NavBar = ({ isDarkMode, wishlist, handleLogout, user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Navigation menu items with icons
    const navItems = [
        {
            label: "Home",
            href: "/home",
            icon: Home,
        },
        {
            label: "About Us",
            href: "/about-us",
            icon: BookOpen,
        },
        {
            label: "Watch list",
            href: "/Watchlist",
            icon: Bookmark,
        },
    ];

    // Dropdown menu items
    const dropdownItems = [
        {
            label: "Profile",
            href:"/UserProfile",
            icon: User,
        },
        {
            label: "Logout",
            href: route("logout"),
            icon: LogOut,
            method: "post"
        }
    ];

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 400 }}
            className={`
                fixed top-0 left-0 right-0 z-20
                px-10 py-4 flex justify-between items-center
                ${
                    isDarkMode
                        ? "bg-gray-900/30 text-white"
                        : "bg-white/30 text-gray-900"
                }
                backdrop-blur-xl border-b
                ${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"}
            `}
        >
            <div className="flex items-center space-x-4">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                >
                    <Clapperboard className="w-7 h-7 text-red-500 mr-2" />
                    <h1 className={`text-2xl font-bold tracking-tight ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                        JO <span className="text-red-500">BEST</span>
                    </h1>
                </motion.div>
            </div>

            {/* Search Bar */}
            <div className="w-96 max-w-md">
                <LiveSearch
                    isDarkMode={isDarkMode}
                    onSearchResults={(results) =>
                        console.log("Search results:", results)
                    }
                />
            </div>

            {/* Navigation Menu */}
            <nav className="flex items-center space-x-6">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`
                            flex items-center space-x-2
                            px-3 py-2
                            rounded-lg
                            text-sm
                            font-medium
                            transition-all
                            duration-300
                            group
                            ${
                                isDarkMode
                                    ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                                    : "hover:bg-gray-100 text-gray-700 hover:text-black"
                            }
                        `}
                    >
                        <item.icon
                            className={`
                                w-5 h-5
                                transition-transform
                                group-hover:scale-110
                                ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            `}
                        />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4 relative">
                {/* Watchlist Link */}
                {wishlist && wishlist.length > 0 && (
                    <Link
                        href="/wishlist"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        <Bookmark className="w-5 h-5" />
                        <span>Wishlist ({wishlist.length})</span>
                    </Link>
                )}

                {/* User Avatar with Dropdown */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`
                            flex items-center justify-center
                            w-10 h-10 rounded-full
                            ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
                            focus:outline-none
                        `}
                    >
                        {user?.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt="User Avatar" 
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <User className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className={`
                                    absolute right-0 top-full mt-2
                                    w-48 rounded-lg shadow-lg
                                    ${isDarkMode 
                                        ? 'bg-gray-800 text-white border border-gray-700' 
                                        : 'bg-white text-gray-900 border border-gray-200'
                                    }
                                    overflow-hidden
                                    z-50
                                `}
                            >
                                {dropdownItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        method={item.method || 'get'}
                                        as={item.method ? 'button' : 'a'}
                                        className={`
                                            flex items-center space-x-2
                                            px-4 py-3
                                            text-sm
                                            w-full
                                            text-left
                                            transition-colors
                                            ${isDarkMode 
                                                ? 'hover:bg-gray-700 focus:bg-gray-700'
                                                : 'hover:bg-gray-100 focus:bg-gray-100'
                                            }
                                        `}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <item.icon className="w-5 h-5 mr-2" />
                                        {item.label}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
};

export default NavBar;