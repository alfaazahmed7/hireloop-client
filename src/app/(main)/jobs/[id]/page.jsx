import { getJobsById } from '@/lib/api/jobs';
import React from 'react';
import Link from 'next/link';
import {
    HiOutlineLocationMarker,
    HiOutlineBriefcase,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineArrowLeft
} from 'react-icons/hi';
import { FiCheckCircle, FiGift, FiShield } from 'react-icons/fi';

const JobsDetailsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobsById(id);
    console.log(job, 'job');

    if (!job) {
        return (
            <div className="min-h-screen bg-[#010103] text-white flex flex-col items-center justify-center gap-4">
                <p className="text-gray-400">Job position details could not be found.</p>
                <Link href="/jobs" className="text-sm font-semibold underline text-neutral-300">Back to positions</Link>
            </div>
        );
    }

    const {
        jobTitle,
        jobType,
        minSalary,
        maxSalary,
        currency,
        location,
        deadline,
        responsibilities,
        requirements,
        benefits,
        companyName,
        companyLogo,
        isRemote
    } = job;

    // Helper formatting engine for currency fields
    const formatSalary = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-[#010103] min-h-screen text-white font-sans selection:bg-neutral-800">
            <div className="w-10/12 max-w-6xl mx-auto py-16">

                {/* Back Button Link Navigation */}
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10 transition-colors group"
                >
                    <HiOutlineArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
                    <span>Back to all open roles</span>
                </Link>

                {/* Main Split Layout Grid Grid-Blocks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left Column Container Layout: Primary Job Details */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Header Wrapper Section */}
                        <div className="border-b border-neutral-900 pb-8">
                            <div className="flex items-center gap-4 mb-4">
                                {companyLogo && (
                                    <img
                                        src={companyLogo}
                                        alt={`${companyName} branding logo`}
                                        className="h-10 w-auto object-contain bg-white/5 p-1 rounded-lg"
                                    />
                                )}
                                <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
                                    {companyName}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6">
                                {jobTitle}
                            </h1>

                            {/* Horizontal Key Badges Panel Row */}
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5 bg-[#111317] border border-neutral-800 text-gray-300 px-4 py-2 rounded-full text-xs font-medium">
                                    <HiOutlineLocationMarker className="text-sm text-neutral-400" />
                                    <span>{isRemote ? 'Remote' : location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#111317] border border-neutral-800 text-gray-300 px-4 py-2 rounded-full text-xs font-medium capitalize">
                                    <HiOutlineBriefcase className="text-sm text-neutral-400" />
                                    <span>{jobType}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#111317] border border-neutral-800 text-gray-300 px-4 py-2 rounded-full text-xs font-medium">
                                    <HiOutlineCurrencyDollar className="text-sm text-neutral-400" />
                                    <span>{formatSalary(minSalary)} – {formatSalary(maxSalary)} / yr</span>
                                </div>
                            </div>
                        </div>

                        {/* Core Section Block: Core Core Responsibilities */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                <FiShield className="text-neutral-400 text-lg" />
                                Role Overview & Responsibilities
                            </h3>
                            <p className="text-gray-400 leading-relaxed font-light text-[15px]">
                                {responsibilities}
                            </p>
                        </div>

                        {/* Core Section Block: Key Position Requirements */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                <FiCheckCircle className="text-neutral-400 text-lg" />
                                Experience & Requirements
                            </h3>
                            <p className="text-gray-400 leading-relaxed font-light text-[15px] bg-[#111317]/30 border border-neutral-900 rounded-xl p-5">
                                {requirements}
                            </p>
                        </div>

                        {/* Core Section Block: Benefits & Total Rewards */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                <FiGift className="text-neutral-400 text-lg" />
                                Perks & Total Benefits
                            </h3>
                            <p className="text-gray-400 leading-relaxed font-light text-[15px]">
                                {benefits}
                            </p>
                        </div>
                    </div>

                    {/* Right Column Container Layout: Sticky Job Application Action Sidebar Card */}
                    <div className="lg:sticky lg:top-10 bg-[#111317] border border-neutral-800/80 p-6 rounded-2xl shadow-2xl space-y-6">
                        <h4 className="text-lg font-bold tracking-tight text-white">
                            Position Details
                        </h4>

                        {/* Snapshot quick lookup data table fields */}
                        <div className="space-y-4 border-b border-neutral-800 pb-5 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Base Compensation</span>
                                <span className="font-semibold text-white">
                                    {formatSalary(minSalary)} - {formatSalary(maxSalary)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Workplace Location</span>
                                <span className="font-semibold text-white">{location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Employment Nature</span>
                                <span className="font-semibold text-white capitalize">{jobType}</span>
                            </div>
                        </div>

                        {/* Application Deadline Tracker alert bar wrapper */}
                        {deadline && (
                            <div className="flex items-start gap-3 bg-neutral-900/50 border border-neutral-800/50 p-3.5 rounded-xl text-xs">
                                <HiOutlineCalendar className="text-base text-neutral-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 font-medium">Application Deadline</p>
                                    <p className="text-white font-bold mt-0.5">
                                        {new Date(deadline).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Submit Action Application Form Button */}
                        <Link
                            href={`/jobs/${job._id}/apply`}
                            className="block w-full py-3.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-neutral-200 active:scale-[0.99] transition-all text-center"
                        >
                            Apply for this job
                        </Link>

                        <p className="text-center text-xs text-gray-500 font-light px-4">
                            By applying, your profile credentials will be instantly routed securely straight to the hiring ecosystem at {companyName}.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobsDetailsPage;