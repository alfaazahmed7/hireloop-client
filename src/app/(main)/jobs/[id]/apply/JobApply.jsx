"use client";

import { submitApplication } from "@/lib/actions/applications";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaDollarSign,
    FaCalendarAlt,
    FaLink,
    FaFileAlt,
    FaUser,
    FaEnvelope,
    FaPaperPlane,
    FaClock
} from "react-icons/fa";

export default function JobApplyDetailsPage({ applicant, job }) {
    const [formData, setFormData] = useState({
        resumeLink: "",
        portfolioLink: "",
        coverLetter: "",
        noticePeriod: "immediate",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API Call
        const submissionData = {
            jobId: job?._id,
            applicantId: applicant?.id,
            companyName: job?.companyName,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            ...formData,
        };
        // console.log(submissionData, 'submission data');

        setTimeout(() => {
            setIsSubmitting(false);

            // Wipes the form inputs on successful submission
            setFormData({
                resumeLink: "",
                portfolioLink: "",
                coverLetter: "",
                noticePeriod: "immediate",
            });
        }, 1500);

        const res = await submitApplication(submissionData);
        if (res.insertedId) {
            toast.success(`Application submitted successfully`);
        }
    };

    return (
        <div className="min-h-screen bg-[#010103] py-12 px-4 sm:px-6 lg:px-8 font-sans text-neutral-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Job & Applicant Summary */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Job Summary Card */}
                    <div className="bg-[#111317] border border-neutral-800/80 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                src={job?.companyLogo}
                                alt={job?.companyName}
                                className="w-14 h-14 rounded-xl object-contain bg-neutral-900 border border-neutral-800 p-2"
                            />
                            <div>
                                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Applying For</h3>
                                <h1 className="text-xl font-bold text-neutral-100">{job?.jobTitle}</h1>
                                <p className="text-sm font-medium text-neutral-400">{job?.companyName}</p>
                            </div>
                        </div>

                        <hr className="border-neutral-800/80 my-4" />

                        <div className="space-y-3 text-sm text-neutral-300">
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-neutral-500 shrink-0" />
                                <span>{job?.location} {job?.isRemote && <span className="badge badge-sm badge-success gap-1 text-white text-[10px]">Remote</span>}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaBriefcase className="text-neutral-500 shrink-0" />
                                <span className="capitalize">{job?.jobType}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaDollarSign className="text-neutral-500 shrink-0" />
                                <span>{job?.minSalary} - {job?.maxSalary} {job?.currency} / year</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-neutral-500 shrink-0" />
                                <span className="text-error font-medium">Deadline: {job?.deadline}</span>
                            </div>
                        </div>

                        <div className="mt-5 p-4 bg-neutral-900/50 border border-neutral-800/50 rounded-xl">
                            <h4 className="text-xs font-bold text-neutral-400 uppercase mb-1">Key Requirement:</h4>
                            <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">{job?.requirements}</p>
                        </div>
                    </div>

                    {/* Applicant Profile Preview */}
                    <div className="bg-[#111317] border border-neutral-800/80 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Applicant Profile</h3>
                        <div className="flex items-center gap-4">
                            <img
                                src={applicant?.image}
                                alt={applicant?.name}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                            />
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-200">
                                    <FaUser className="text-xs text-neutral-500" />
                                    {applicant?.name}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                                    <FaEnvelope className="text-xs text-neutral-500" />
                                    {applicant?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Application Form */}
                <div className="lg:col-span-7">
                    <div className="bg-[#111317] border border-neutral-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-neutral-100">Submit Your Application</h2>
                            <p className="text-sm text-neutral-400 mt-1">Provide your up-to-date links and introduce yourself to the hiring team.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Resume Link */}
                            <div className="form-control w-full">
                                <label className="label font-semibold text-neutral-300 text-sm">
                                    <span>Resume Link <span className="text-error">*</span></span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                        <FaFileAlt />
                                    </div>
                                    <input
                                        type="url"
                                        name="resumeLink"
                                        required
                                        value={formData.resumeLink}
                                        onChange={handleChange}
                                        placeholder="https://drive.google.com/file/d/... or Dropbox link"
                                        className="input input-bordered pl-10 w-full focus:outline-primary bg-neutral-900/40 border-neutral-800 text-neutral-200 placeholder-neutral-600 transition-all duration-200"
                                    />
                                </div>
                                <label className="label">
                                    <span className="label-text-alt text-neutral-500">Ensure the link sharing settings are set to (Anyone with the link).</span>
                                </label>
                            </div>

                            {/* Portfolio Link */}
                            <div className="form-control w-full">
                                <label className="label font-semibold text-neutral-300 text-sm">
                                    <span>Portfolio Link <span className="text-error">*</span></span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                        <FaLink />
                                    </div>
                                    <input
                                        type="url"
                                        name="portfolioLink"
                                        required
                                        value={formData.portfolioLink}
                                        onChange={handleChange}
                                        placeholder="https://yourportfolio.com or Behance/GitHub"
                                        className="input input-bordered pl-10 w-full focus:outline-primary bg-neutral-900/40 border-neutral-800 text-neutral-200 placeholder-neutral-600 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Notice Period */}
                            <div className="form-control w-full">
                                <label className="label font-semibold text-neutral-300 text-sm">
                                    <span>Notice Period</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                        <FaClock />
                                    </div>
                                    <select
                                        name="noticePeriod"
                                        value={formData.noticePeriod}
                                        onChange={handleChange}
                                        className="input input-bordered pl-10 w-full focus:outline-primary bg-neutral-900/40 border-neutral-800 text-neutral-200 pr-8 appearance-none cursor-pointer"
                                    >
                                        <option value="immediate" className="bg-[#111317]">Immediate Joiner</option>
                                        <option value="15-days" className="bg-[#111317]">15 Days or less</option>
                                        <option value="1-month" className="bg-[#111317]">1 Month</option>
                                        <option value="2-months" className="bg-[#111317]">2 Months</option>
                                    </select>
                                    {/* Custom dropdown arrow placement */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Cover Letter / Pitch */}
                            <div className="form-control w-full">
                                <label className="label font-semibold text-neutral-300 text-sm">
                                    <span>Why are you a great fit? (Cover Letter)</span>
                                </label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Briefly pitch yourself to the hiring team..."
                                    className="textarea textarea-bordered w-full focus:outline-primary bg-neutral-900/40 border-neutral-800 text-neutral-200 placeholder-neutral-600 leading-relaxed"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary w-full text-white no-animation font-semibold flex items-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all"
                                >
                                    {isSubmitting ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-xs" /> Apply via HireLoop
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}