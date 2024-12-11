import React, { useState, useEffect } from "react";
import { SunMedium, Moon, Mail, Film, AlertTriangle, Clapperboard } from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div
            className={`min-h-screen flex transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <Head title="Verify Email" />

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
                    Verify your email to unlock full access to your favorite
                    movies and shows.
                </p>
            </div>

            {/* Right Side - Verify Email Form */}
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
                        Verify Your Email
                    </h2>

                    <p
                        className={`mb-6 text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                        Thanks for signing up! Before getting started, verify
                        your email address by clicking the link we emailed you.
                        Didn't receive the email? We'll send another.
                    </p>

                    {/* Important Account Deletion Warning */}
                    <div
                        className={`flex items-center p-4 mb-6 rounded-lg border-l-4 ${
                            isDarkMode
                                ? "bg-red-900/20 border-red-500 text-red-300"
                                : "bg-red-100 border-red-600 text-red-700"
                        }`}
                    >
                        <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-sm mb-1">
                                Important: The verify email link will expire in 60 minutes.
                            </p>

                        </div>
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">
                            A new verification link has been sent to your email
                            address.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex items-center justify-between">
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
                                Resend Verification Email
                            </button>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className={`text-sm font-medium hover:underline ${
                                    isDarkMode
                                        ? "text-red-400 hover:text-red-300"
                                        : "text-red-600 hover:text-red-700"
                                }`}
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
