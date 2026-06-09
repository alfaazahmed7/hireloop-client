"use client";

import React, { useState } from "react";
import { Briefcase, Globe } from "@gravity-ui/icons";
import { toast } from "react-hot-toast";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobForm({ company }) {
    // console.log(company, 'company');

    // const [mockCompany] = useState({
    //     name: "Acme Corp (Auto-filled)",
    //     id: "company_123",
    //     isApproved: true,
    // });

    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!mockCompany.isApproved) {
        //     toast.error("Your company profile must be approved before you can post jobs.");
        //     return;
        // }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
        if (!data.jobType) newErrors.jobType = "Job type is required";
        if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
        if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
        if (!isRemote && !data.location) newErrors.location = "Location is required for non-remote roles";
        if (!data.deadline) newErrors.deadline = "Application deadline is required";
        if (!data.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!data.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            isRemote,
            companyId: company._id,
            companyName: company.name,
            companyLogo: company.logoUrl,
            status: "active",
            isPubliclyVisible: true,
        };

        const res = await createJob(payload);
        if (res.insertedId) {
            toast.success('Job posted successfully');
            e.target.reset();
            setIsRemote(false);
            redirect('/dashboard/recruiter/jobs');
        }
    };

    const inputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 focus:outline-none rounded-lg h-12 px-4 text-sm transition-all placeholder:text-zinc-500";
    const selectClass = "appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-[right_16px_center] bg-no-repeat w-full text-left text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 focus:outline-none rounded-lg h-12 px-4 text-sm transition-all font-normal";
    const textAreaClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 focus:outline-none rounded-lg p-4 text-sm transition-all placeholder:text-zinc-500";

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">

                {/* Form Header block */}
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Post a New Job</h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Fill out the details below to publish your open position.
                    </p>

                    {/* Company verification status panel */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        <Briefcase size={14} className="text-zinc-500" />
                        Posting as: <span className="font-semibold text-zinc-300">{company.name}</span>
                        <span className="text-emerald-500 font-medium bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">Approved</span>
                    </div>
                </div>

                {/* Main Native Form Element Container */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* SECTION 1: Job Information */}
                    <div className="space-y-6 w-full">
                        <div className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Job Information
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Title Input */}
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-zinc-400 font-medium text-sm mb-1">Job Title</label>
                                <input name="jobTitle" placeholder="e.g. Senior Frontend Engineer" className={inputClass} />
                                {errors.jobTitle && <span className="text-xs text-error mt-1">{errors.jobTitle}</span>}
                            </div>

                            {/* Job Category */}
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-zinc-400 font-medium text-sm mb-1">Job Category</label>
                                <select
                                    name="jobCategory"
                                    className={`${selectClass} ${errors.jobCategory ? "border-error" : ""}`}
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-zinc-500">Select Category</option>
                                    <option value="technology" className="bg-[#121214] text-white">Technology</option>
                                    <option value="design" className="bg-[#121214] text-white">Design</option>
                                    <option value="marketing" className="bg-[#121214] text-white">Marketing</option>
                                    <option value="sales" className="bg-[#121214] text-white">Sales</option>
                                </select>
                                {errors.jobCategory && <span className="text-xs text-error mt-1">{errors.jobCategory}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Type */}
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-zinc-400 font-medium text-sm mb-1">Job Type</label>
                                <select
                                    name="jobType"
                                    className={`${selectClass} ${errors.jobType ? "border-error" : ""}`}
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-zinc-500">Select Type</option>
                                    <option value="full-time" className="bg-[#121214] text-white">Full-time</option>
                                    <option value="part-time" className="bg-[#121214] text-white">Part-time</option>
                                    <option value="contract" className="bg-[#121214] text-white">Contract</option>
                                    <option value="internship" className="bg-[#121214] text-white">Intership</option>
                                </select>
                                {errors.jobType && <span className="text-xs text-error mt-1">{errors.jobType}</span>}
                            </div>

                            {/* Salary Range & Currency */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2 space-y-1">
                                    <span className="text-zinc-400 font-medium text-sm block mb-1">Salary Range</span>
                                    <div className="flex gap-2">
                                        <div className="w-full">
                                            <input name="minSalary" placeholder="Min" type="number" className={inputClass} />
                                            {errors.minSalary && <span className="text-xs text-error mt-1 block">{errors.minSalary}</span>}
                                        </div>
                                        <div className="w-full">
                                            <input name="maxSalary" placeholder="Max" type="number" className={inputClass} />
                                            {errors.maxSalary && <span className="text-xs text-error mt-1 block">{errors.maxSalary}</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end">
                                    <select name="currency" className={selectClass} defaultValue="USD">
                                        <option value="USD" className="bg-[#121214] text-white">USD ($)</option>
                                        <option value="EUR" className="bg-[#121214] text-white">EUR (€)</option>
                                        <option value="GBP" className="bg-[#121214] text-white">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            {/* Location Block */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-zinc-400 font-medium text-sm">Location</span>

                                    {/* daisyUI Toggle Switch */}
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2 p-0">
                                            <span className="label-text text-xs text-zinc-400 font-medium">Remote</span>
                                            <input
                                                name="location"
                                                value="Remote"
                                                type="checkbox"
                                                className="toggle toggle-sm bg-zinc-600 checked:bg-white checked:border-white border-zinc-800"
                                                checked={isRemote}
                                                onChange={(e) => setIsRemote(e.target.checked)}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="relative flex flex-col gap-1 w-full">
                                    <div className="relative flex items-center">
                                        <Globe size={16} className="absolute left-4 text-zinc-500 pointer-events-none z-10" />
                                        <input
                                            name="location"
                                            placeholder={isRemote ? "Global / Remote" : "e.g. Austin, TX"}
                                            disabled={isRemote}
                                            className={`${inputClass} pl-11 ${isRemote ? "opacity-40 cursor-not-allowed" : ""}`}
                                        />
                                    </div>
                                    {!isRemote && errors.location && <span className="text-xs text-error mt-1">{errors.location}</span>}
                                </div>
                            </div>

                            {/* Application Deadline */}
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-zinc-400 font-medium text-sm mb-1">Application Deadline</label>
                                <input name="deadline" type="date" className={inputClass} />
                                {errors.deadline && <span className="text-xs text-error mt-1">{errors.deadline}</span>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Job Description */}
                    <div className="space-y-6 w-full">
                        <div className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Job Details & Description
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-zinc-400 font-medium text-sm mb-1">Responsibilities</label>
                            <textarea
                                name="responsibilities"
                                placeholder="Outline the core everyday responsibilities for this role..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.responsibilities && <span className="text-xs text-error mt-1">{errors.responsibilities}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-zinc-400 font-medium text-sm mb-1">Requirements</label>
                            <textarea
                                name="requirements"
                                placeholder="List required experience, skills, and certifications..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.requirements && <span className="text-xs text-error mt-1">{errors.requirements}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-zinc-400 font-medium text-sm mb-1">Benefits (Optional)</label>
                            <textarea
                                name="benefits"
                                placeholder="Perks, healthcare, equity, remote stipends..."
                                rows={3}
                                className={textAreaClass}
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                        <button
                            type="button"
                            className="btn btn-outline border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-800 rounded-lg px-6 font-medium h-11 min-h-11 normal-case"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-white text-black font-semibold hover:bg-zinc-200 border-none rounded-lg px-6 h-11 min-h-11 normal-case"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}