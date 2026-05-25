"use client";

import {
    FaBriefcase,
    FaSearch,
    FaMapMarkerAlt,
    FaBuilding,
    FaUsers,
    FaStar,
} from "react-icons/fa";

const HeroBanner = () => {
    return (
        <section
            className="relative overflow-hidden min-h-[80vh] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('images/glove.jpg')",
            }}
        >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070D] via-[#05070D]/70 to-[#05070D]/30 z-0 opacity-50" />

            {/* Top & Bottom Dark Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(5,7,13,0.95)_0%,rgba(5,7,13,0.3)_30%,rgba(5,7,13,0.2)_70%,rgba(5,7,13,0.95)_100%)]" />

            {/* Stars */}
            <div className="absolute inset-0 opacity-50 pointer-events-none z-0">
                <div className="absolute top-[18%] left-[15%] w-1 h-1 bg-[#6D6EFF] rounded-full" />
                <div className="absolute top-[24%] left-[75%] w-1 h-1 bg-[#6D6EFF] rounded-full" />
                <div className="absolute top-[42%] left-[58%] w-1.5 h-1.5 bg-[#6D6EFF] rounded-full" />
                <div className="absolute top-[55%] left-[25%] w-1 h-1 bg-[#6D6EFF] rounded-full" />
                <div className="absolute top-[62%] left-[80%] w-1 h-1 bg-[#6D6EFF] rounded-full" />
                <div className="absolute top-[38%] left-[45%] w-1 h-1 bg-[#6D6EFF] rounded-full" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-between">

                {/* Top Section */}
                <div className="w-full max-w-7xl min-h-[calc(100vh-80px)] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center justify-center text-center">

                    {/* Badge */}
                    <div className="mb-7">
                        <div className="flex items-center gap-2 bg-[#0D1018]/80 border border-white/10 rounded-full px-5 py-2 backdrop-blur-xl">

                            <div className="w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center">
                                <FaBriefcase className="text-white text-[10px]" />
                            </div>

                            <span className="text-white text-sm font-semibold">
                                50,000+
                            </span>

                            <span className="text-[#8B95A7] text-xs sm:text-sm uppercase tracking-[2px]">
                                New Jobs This Month
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-white font-bold tracking-tight leading-none text-3xl sm:text-5xl md:text-6xl lg:text-[72px] max-w-5xl">
                        Find Your Dream Job Today
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-2xl text-[#9CA3AF] text-sm sm:text-base md:text-lg leading-relaxed">
                        HireLoop connects top talent with world-class companies.
                        Browse thousands of curated opportunities and land your
                        next role — faster.
                    </p>

                    {/* Search Box */}
                    <div className="w-full max-w-4xl mt-10">

                        {/* Search Box */}
                        <div className="bg-[#0B0F17]/85 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col sm:flex-row shadow-[0_0_40px_rgba(0,0,0,0.45)]">

                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 flex-1 border-b sm:border-b-0 sm:border-r border-white/10">

                                <FaSearch className="text-[#9CA3AF] text-sm" />

                                <input
                                    type="text"
                                    placeholder="Job title, skill or company"
                                    className="bg-transparent outline-none w-full text-white placeholder:text-[#6B7280] text-sm"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 flex-1 border-b sm:border-b-0 sm:border-r border-white/10">

                                <FaMapMarkerAlt className="text-[#9CA3AF] text-sm" />

                                <input
                                    type="text"
                                    placeholder="Location or Remote"
                                    className="bg-transparent outline-none w-full text-white placeholder:text-[#6B7280] text-sm"
                                />
                            </div>

                            {/* Search Button */}
                            <button className="bg-[#5B5CF0] hover:bg-[#6B6CF6] transition-all duration-300 w-full sm:w-[72px] flex items-center justify-center py-4 sm:py-0">

                                <FaSearch className="text-white text-sm" />
                            </button>
                        </div>

                        {/* Trending Section */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5 overflow-x-auto sm:overflow-visible px-2 sm:px-0">

                            <span className="text-white text-xs sm:text-sm whitespace-nowrap">
                                Trending Position:
                            </span>

                            {[
                                "Product Designer",
                                "AI Engineering",
                                "DevOps Engineer",
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    className="bg-[#11151E]/80 border border-white/10 text-[#D1D5DB] hover:border-[#5B5CF0]/40 hover:text-white transition-all duration-300 text-[11px] sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl whitespace-nowrap shrink-0"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Text */}
                <div className="relative z-10 flex justify-center px-4 mt-10 sm:mt-0 mb-16">

                    <h2 className="text-center text-white font-semibold leading-snug text-2xl sm:text-4xl md:text-5xl lg:text-[56px] max-w-5xl">
                        Assisting over 15,000 job seekers
                        <br />
                        find their dream positions.
                    </h2>
                </div>

                {/* Stats Cards */}
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pb-8 sm:pb-10 lg:pb-14">

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">

                        {[
                            {
                                icon: FaBriefcase,
                                number: "50K",
                                label: "Active Jobs",
                            },
                            {
                                icon: FaBuilding,
                                number: "12K",
                                label: "Companies",
                            },
                            {
                                icon: FaUsers,
                                number: "2M",
                                label: "Job Seekers",
                            },
                            {
                                icon: FaStar,
                                number: "97%",
                                label: "Satisfaction Rate",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-[#090C13]/75 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.45)] flex flex-col items-center text-center"
                                >

                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded-xl bg-[#10141F]/90 border border-white/5 flex items-center justify-center mb-4">
                                        <Icon className="text-[#D1D5DB] text-sm" />
                                    </div>

                                    {/* Number */}
                                    <h3 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
                                        {item.number}
                                    </h3>

                                    {/* Label */}
                                    <p className="text-[#9CA3AF] text-sm mt-2">
                                        {item.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;