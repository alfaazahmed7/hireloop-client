"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#05070D] border-t border-white/5">

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.45)]">
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

                            <div>
                                <h2 className="text-white text-2xl font-bold tracking-tight">
                                    HireLoop
                                </h2>
                                <p className="text-[#8B95A7] text-xs tracking-[3px] uppercase mt-1">
                                    Hire Smarter
                                </p>
                            </div>
                        </div>

                        <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-sm">
                            HireLoop is a modern role-based hiring platform
                            connecting talented professionals with innovative
                            companies worldwide.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-7">
                            {[
                                {
                                    icon: FaFacebookF,
                                    link: "https://facebook.com",
                                },
                                {
                                    icon: FaTwitter,
                                    link: "https://twitter.com",
                                },
                                {
                                    icon: FaGithub,
                                    link: "https://github.com",
                                },
                                {
                                    icon: FaLinkedinIn,
                                    link: "https://linkedin.com",
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={index}
                                        href={item.link}
                                        target="_blank"
                                        className="w-10 h-10 rounded-xl bg-[#10141F] border border-white/5 flex items-center justify-center text-[#D4D4D8] hover:text-white hover:bg-[#2563EB] transition-all duration-300"
                                    >
                                        <Icon className="text-sm" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">
                            Product
                        </h3>

                        <div className="flex flex-col gap-4">
                            {[
                                {
                                    name: "Job Discovery",
                                    href: "/jobs",
                                },
                                {
                                    name: "Worker AI",
                                    href: "/worker-ai",
                                },
                                {
                                    name: "Companies",
                                    href: "/companies",
                                },
                                {
                                    name: "Salary Data",
                                    href: "/salary-data",
                                },
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-[#A1A1AA] text-sm hover:text-[#60A5FA] transition-colors duration-300 w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-4">
                            {[
                                {
                                    name: "Browse Jobs",
                                    href: "/jobs",
                                },
                                {
                                    name: "Companies",
                                    href: "/companies",
                                },
                                {
                                    name: "Pricing",
                                    href: "/pricing",
                                },
                                {
                                    name: "Support",
                                    href: "/support",
                                },
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-[#A1A1AA] text-sm hover:text-[#60A5FA] transition-colors duration-300 w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">
                            Stay Updated
                        </h3>

                        <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">
                            Get job alerts, hiring tips, and platform updates
                            directly to your inbox.
                        </p>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#10141F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#2563EB] transition-all duration-300"
                            />

                            <button className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:opacity-90 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.35)]">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8">

                    <p className="text-[#71717A] text-sm text-center md:text-left">
                        © 2026 HireLoop. All rights reserved.
                    </p>

                    <div className="flex items-center flex-wrap justify-center gap-6">
                        {[
                            {
                                name: "Privacy Policy",
                                href: "/privacy-policy",
                            },
                            {
                                name: "Terms & Conditions",
                                href: "/terms-and-conditions",
                            },
                            {
                                name: "Cookies",
                                href: "/cookies",
                            },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-[#71717A] text-sm hover:text-[#60A5FA] transition-colors duration-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;