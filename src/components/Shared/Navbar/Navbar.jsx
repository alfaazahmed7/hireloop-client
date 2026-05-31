"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const userData = authClient.useSession();
    const user = userData.data?.user;
    const isPending = userData.isPending;

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success('You have successfully sign out');
    }

    return (
        <nav className="w-full bg-[#0B0B0F] border-b border-white/5 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[86px]">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.35)]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 8l10 4-10 4V8z"
                                />
                            </svg>
                        </div>

                        <div className="leading-none">
                            <Link href={'/'}>
                                <h1 className="text-white text-[20px] font-semibold tracking-tight">
                                    HireLoop
                                </h1>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="flex items-center bg-[#17171C] border border-white/5 rounded-2xl px-2 py-2 shadow-[0_0_30px_rgba(255,255,255,0.02)]">

                            <Link
                                href="/jobs"
                                className="text-[#F5F5F7] text-sm font-medium px-5 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                            >
                                Browse Jobs
                            </Link>

                            <Link
                                href="/company"
                                className="text-[#D1D1D6] text-sm font-medium px-5 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                            >
                                Company
                            </Link>

                            <Link
                                href="/pricing"
                                className="text-[#D1D1D6] text-sm font-medium px-5 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                            >
                                Pricing
                            </Link>

                            <div className="w-[1px] h-6 bg-white/10 mx-2" />

                            {
                                isPending ?
                                    <span className="loading loading-spinner loading-xl"></span>
                                    : user ? (
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-8 rounded">
                                                    <Image
                                                        alt={user?.name}
                                                        src={user?.image}
                                                        fill
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="bg-slate-700 text-white px-6 py-2 rounded-lg border-b-4 border-slate-800 transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] active:border-b-2 active:translate-y-[2px] cursor-pointer"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Link
                                                href="/sign-in"
                                                className="text-[#7C5CFF] text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#7C5CFF]/10 transition-all duration-300"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/sign-up"
                                                className="bg-[#F5F5F7] text-[#0B0B0F] text-sm font-semibold px-4 py-3 rounded-xl hover:bg-white transition text-center"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-[#17171C] border border-white/10"
                    >
                        {open ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${open
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="mx-4 mb-4 bg-[#17171C] border border-white/5 rounded-2xl p-4 shadow-2xl">

                    <div className="flex flex-col gap-2">

                        <Link
                            href="/jobs"
                            className="text-white text-sm font-medium px-4 py-3 rounded-xl hover:bg-white/5 transition"
                        >
                            Browse Jobs
                        </Link>

                        <Link
                            href="/company"
                            className="text-[#D1D1D6] text-sm font-medium px-4 py-3 rounded-xl hover:bg-white/5 transition"
                        >
                            Company
                        </Link>

                        <Link
                            href="/pricing"
                            className="text-[#D1D1D6] text-sm font-medium px-4 py-3 rounded-xl hover:bg-white/5 transition"
                        >
                            Pricing
                        </Link>

                        <div className="w-full h-[1px] bg-white/10 my-2" />

                        {
                            isPending ?
                                <span className="loading loading-spinner loading-xl"></span>
                                : user ? (
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-8 rounded">
                                                <Image
                                                    alt={user?.name}
                                                    src={user?.image}
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="bg-slate-700 text-white px-6 py-2 rounded-lg border-b-4 border-slate-800 transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] active:border-b-2 active:translate-y-[2px] cursor-pointer"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <Link
                                            href="/sign-in"
                                            className="text-[#7C5CFF] text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#7C5CFF]/10 transition-all duration-300"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/sign-up"
                                            className="bg-[#F5F5F7] text-[#0B0B0F] text-sm font-semibold px-4 py-3 rounded-xl hover:bg-white transition text-center"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;