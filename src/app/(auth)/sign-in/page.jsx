"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    const handlePasswordChange = (e) => {
        const value = e.target.value;

        if (value.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        } else if (!/[A-Z]/.test(value)) {
            setPasswordError("Password must contain at least one uppercase letter.");
        } else if (!/[a-z]/.test(value)) {
            setPasswordError("Password must contain at least one lowercase letter.");
        } else if (!/[0-9]/.test(value)) {
            setPasswordError("Password must contain at least one number.");
        } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
            setPasswordError("Password must contain at least one special character.");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (data) {
            toast.success('Welcome Back! You have successfully sign in');
            router.push(redirectTo);
        }

        if (error) {
            toast.error('Error signing in: ' + error.message);
        }
    };

    return (
        <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        HireLoop
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Welcome back — sign in to continue
                    </p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-semibold text-white text-center mb-6">
                        Sign In
                    </h2>

                    <form onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                Email Address
                            </label>

                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handlePasswordChange}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-12 text-white outline-none focus:border-blue-500 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* passwordError */}
                        {passwordError && (
                            <p className="text-sm text-red-500">
                                {passwordError}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-200 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up link */}
                    <p className="text-center text-zinc-400 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            href={`/sign-up?redirect=${redirectTo}`}
                            className="text-blue-500 hover:text-blue-400 font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;