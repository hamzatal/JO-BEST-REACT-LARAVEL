import React, { useState } from "react";
import { SunMedium, Moon, Mail, Film, Clapperboard } from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div
            className={`min-h-screen flex transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <Head title="Forgot Password" />

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
                    No worries! We'll help you get back to enjoying your
                    favorite movies in no time.
                </p>
            </div>

            {/* Right Side - Forgot Password Form */}
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
                        className={`text-2xl font-bold mb-4 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Forgot Password
                    </h2>

                    <p
                        className={`mb-6 text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </p>

                    {status && (
                        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
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
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                                        isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                    }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                href={route("login")}
                                className={`text-sm font-medium hover:underline ${
                                    isDarkMode
                                        ? "text-red-400 hover:text-red-300"
                                        : "text-red-600 hover:text-red-700"
                                }`}
                            >
                                Back to login
                            </Link>

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
                                Email Password Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
