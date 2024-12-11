import React, { useState, useEffect } from "react";
import { SunMedium, Moon, Mail, Lock, Film, Eye, EyeOff, Clapperboard } from "lucide-react";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"));
    };

    return (
        <div
            className={`min-h-screen flex transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <Head title="Reset Password" />

            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
                <div className="flex items-center mb-8 animate-fade-in">
                <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
                    <h1
                        className={`text-4xl font-bold ml-2 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        JO <span className="text-red-500">BEST</span>
                    </h1>
                </div>
                <p
                    className={`text-xl text-center max-w-md ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                    Almost there! Set your new password to regain access to your
                    account and continue enjoying your favorite movies.
                </p>
            </div>

            {/* Right Side - Reset Password Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
                <div
                    className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center mb-8">
                    <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
                        <h1
                            className={`text-3xl font-bold ml-2 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            JO <span className="text-red-500">BEST</span>
                        </h1>
                    </div>

                    <h2
                        className={`text-2xl font-bold mb-6 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Reset Password
                    </h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className={`absolute left-3 top-3 w-5 h-5 ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                />
                                <input
                                    type="email"
                                    value={data.email}
                                    readOnly
                                    className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                                        isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className={`absolute left-3 top-3 w-5 h-5 ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                                        isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                    }`}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3"
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            className={`w-5 h-5 ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                    ) : (
                                        <Eye
                                            className={`w-5 h-5 ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className={`absolute left-3 top-3 w-5 h-5 ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                />
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                                        isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                    }`}
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-3 top-3"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff
                                            className={`w-5 h-5 ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                    ) : (
                                        <Eye
                                            className={`w-5 h-5 ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 ${
                                    isDarkMode
                                        ? "bg-red-600 text-white hover:bg-red-700"
                                        : "bg-red-500 text-white hover:bg-red-600"
                                } ${
                                    processing &&
                                    "opacity-50 cursor-not-allowed"
                                }`}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
