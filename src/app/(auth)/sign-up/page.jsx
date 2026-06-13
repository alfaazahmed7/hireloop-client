"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaImage,
    FaLock,
    FaUser,
} from "react-icons/fa";

const SignUpPage = () => {
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
        const plan = user.role === 'seeker' ? 'seeker_free' : 'recruiter_free';
        // console.log(user, 'user');

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            image: user.image,
            password: user.password,
            role: user.role,
            plan,
        });
        console.log(data, error, 'd-e');

        if (data) {
            toast.success(`You have successfully register to HireLoop`);
            router.push(redirectTo);
        }

        if (error) {
            toast.error(`Error signing up: ` + error.message);
        }
        // console.log(data, error, 'd-e');
    };

    return (
        <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        HireLoop
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Create your account and start hiring smarter.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-semibold text-white text-center mb-6">
                        Create Account
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                Full Name
                            </label>

                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

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
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                Profile Image URL
                            </label>

                            <div className="relative">
                                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                                <input
                                    type="url"
                                    name="image"
                                    placeholder="https://example.com/profile.jpg"
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
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handlePasswordChange}
                                    required
                                    className={`w-full bg-zinc-950 border rounded-xl py-3 pl-11 pr-12 text-white outline-none transition ${passwordError
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-zinc-800 focus:border-blue-500"
                                        }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>
                            </div>

                            {passwordError && (
                                <p className="mt-2 text-sm text-red-500">
                                    {passwordError}
                                </p>
                            )}

                            <p className="mt-2 text-xs text-zinc-500">
                                Password must contain at least 8 characters,
                                one uppercase letter, one lowercase letter,
                                one number, and one special character.
                            </p>
                        </div>

                        {/* Role Section */}
                        <div className="flex flex-col gap-4 text-white">
                            <label className="text-white text-sm font-medium">Your Role</label>
                            <div className="flex gap-4">

                                {/* Job Seeker */}
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="seeker"
                                        defaultChecked
                                        className="hidden peer"
                                    />

                                    <div className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/40">
                                        <div className="w-4 h-4 rounded-full border-2 border-white/60 flex items-center justify-center transition group-peer-checked:border-primary group-peer-checked:bg-primary">
                                            <div className="w-2 h-2 rounded-full bg-white scale-0 group-peer-checked:scale-100 transition" />
                                        </div>
                                        <span className="text-sm font-medium">Job Seeker</span>
                                    </div>
                                </label>

                                {/* Recruiter */}
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        className="hidden peer"
                                    />
                                    <div className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/40">
                                        <div className="w-4 h-4 rounded-full border-2 border-white/60 flex items-center justify-center transition group-peer-checked:border-primary group-peer-checked:bg-primary">
                                            <div className="w-2 h-2 rounded-full bg-white scale-0 group-peer-checked:scale-100 transition" />
                                        </div>
                                        <span className="text-sm font-medium">Recruiter</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-200 cursor-pointer"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-zinc-400 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="text-blue-500 hover:text-blue-400 font-medium"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignUpPage;