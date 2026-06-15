'use client'
import React from 'react';
import { LuShieldAlert, LuLayoutGrid, LuArrowLeft, LuLogIn } from 'react-icons/lu';

export default function UnauthorizedPage() {
    // Simple navigation handlers (replace with your router's navigate function, e.g., useNavigate from react-router-dom)
    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleLogin = () => {
        window.location.href = '/sign-in';
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800 font-sans">
            <div className="max-w-md w-full text-center bg-white border border-slate-100 rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">

                {/* Animated Icon Badge */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 border border-amber-100 mb-6 text-amber-500 animate-pulse">
                    <LuShieldAlert size={40} />
                </div>

                {/* Error Code & Heading */}
                <span className="block text-sm font-semibold tracking-wider text-amber-600 uppercase mb-2">
                    Error 401
                </span>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    Access Denied
                </h1>

                {/* Description */}
                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                    Oops! It looks like you dont have permission to view this page. This area is restricted to authorized credentials. Lets get you back on track.
                </p>

                {/* CTA Actions */}
                <div className="space-y-3">
                    {/* Primary Action: Log In */}
                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors duration-200 cursor-pointer"
                    >
                        <LuLogIn size={18} />
                        Sign In with Authorized Account
                    </button>

                    {/* Secondary Action: Go Home / Dashboard */}
                    <button
                        onClick={handleGoHome}
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-colors duration-200 cursor-pointer"
                    >
                        <LuLayoutGrid size={18} />
                        Go to Main Dashboard
                    </button>
                </div>

                {/* Quick Back Link */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors duration-200 uppercase tracking-wider cursor-pointer"
                    >
                        <LuArrowLeft size={14} />
                        Return to previous page
                    </button>
                </div>

            </div>

            {/* Subtle Footer */}
            <p className="mt-8 text-xs text-slate-400">
                If you think this is a mistake, please contact your administrator.
            </p>
        </div>
    );
}