'use client';

import React from 'react';
import { FiSearch, FiBriefcase, FiLayers, FiMapPin } from 'react-icons/fi';

const JobFilterBar = ({ filters, onFilterChange }) => {

    // Handler to safely bubble changes up to the parent component
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="w-full bg-[#111317] border border-neutral-800/80 rounded-2xl p-5 mb-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                {/* Search Input field */}
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500 pointer-events-none">
                        <FiSearch className="text-lg" />
                    </span>
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Search title, company, skills..."
                        className="w-full pl-11 pr-4 py-3 bg-[#181a20] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                    />
                </div>

                {/* Job Category Dropdown Filter */}
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500 pointer-events-none">
                        <FiLayers className="text-base" />
                    </span>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-[#181a20] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-neutral-700 select select-bordered select-sm h-auto min-h-0 font-normal appearance-none"
                    >
                        <option value="">All Categories</option>
                        <option value="engineering">Engineering</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>

                {/* Job Type Dropdown Filter */}
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500 pointer-events-none">
                        <FiBriefcase className="text-base" />
                    </span>
                    <select
                        name="jobType"
                        value={filters.jobType}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-[#181a20] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-neutral-700 select select-bordered select-sm h-auto min-h-0 font-normal appearance-none"
                    >
                        <option value="">All Job Types</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>

                {/* Work Mode Dropdown Filter (Remote vs On-site) */}
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500 pointer-events-none">
                        <FiMapPin className="text-base" />
                    </span>
                    <select
                        name="workMode"
                        value={filters.workMode}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-[#181a20] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-neutral-700 select select-bordered select-sm h-auto min-h-0 font-normal appearance-none"
                    >
                        <option value="">All Work Modes</option>
                        <option value="remote">Remote Only</option>
                        <option value="onsite">On-site / Hybrid</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default JobFilterBar;