import React from 'react';
import { HiOutlineLocationMarker, HiOutlineBriefcase } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';
import { BiDollarCircle } from 'react-icons/bi';
import Link from 'next/link';

const JobCard = ({ job }) => {
    console.log(job, 'job');
    const {
        jobTitle,
        responsibilities,
        location,
        jobType,
        minSalary,
        maxSalary,
        currency,
        companyName,
        companyLogo,
        isRemote
    } = job;

    // Format currency cleanly (e.g., $15,000)
    const formatSalary = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="flex flex-col justify-between w-full bg-[#111317] border border-neutral-800/60 rounded-2xl p-8 hover:border-neutral-700/80 transition-all duration-300 group min-h-[380px]">

            {/* Top Section: Header & Branding */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    {companyLogo ? (
                        <img
                            src={companyLogo}
                            alt={companyName}
                            className="h-7 w-auto object-contain max-w-[100px]"
                        />
                    ) : (
                        <div className="w-7 h-7 bg-neutral-800 rounded flex items-center justify-center font-bold text-xs">
                            {companyName?.charAt(0)}
                        </div>
                    )}
                    <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
                        {companyName}
                    </span>
                </div>

                {/* Job Title */}
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-neutral-200 transition-colors">
                    {jobTitle}
                </h3>

                {/* Job Description */}
                <p className="text-neutral-400 text-sm font-light leading-relaxed line-clamp-3">
                    {responsibilities}
                </p>
            </div>

            {/* Bottom Layout Container */}
            <div className="mt-6">
                {/* Meta Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 border border-neutral-700/60 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/30">
                        <HiOutlineLocationMarker className="text-sm shrink-0" />
                        <span>{isRemote ? "Remote" : location}</span>
                    </div>

                    {/* Job Type Badge */}
                    <div className="flex items-center gap-1.5 border border-neutral-700/60 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/30 capitalize">
                        <HiOutlineBriefcase className="text-sm shrink-0" />
                        <span>{jobType}</span>
                    </div>

                    {/* Salary Badge */}
                    {minSalary && maxSalary && (
                        <div className="flex items-center gap-1.5 border border-neutral-700/60 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/30">
                            <BiDollarCircle className="text-sm shrink-0" />
                            <span>{formatSalary(minSalary)} – {formatSalary(maxSalary)}</span>
                        </div>
                    )}
                </div>

                {/* Apply Button */}
                <div className="pt-2 border-t border-neutral-900">
                    <Link
                        href={`/jobs/${job._id}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-neutral-300 transition-colors group/btn">
                        <span>Apply Now</span>
                        <FiArrowUpRight className="text-base transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default JobCard;