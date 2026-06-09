'use client';

import React, { useState } from 'react';
import { ArrowUpToLine, Globe, Factory, ArrowRight, Pencil, ChevronDown } from '@gravity-ui/icons';
import { createCompany } from '@/lib/actions/companies';
import { toast } from 'react-hot-toast'; // Kept toast wrapper clean for action responses

// EXACT copy of your original design style constants
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none focus:border-zinc-700 transition";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    // 1. Core State
    const [company, setCompany] = useState(recruiterCompany);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    // Auxiliary Upload States
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // 2. Client side Imgbb Upload Handler
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // 3. Submit Profile Form Data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const companyName = formData.get('companyName');
        const websiteUrl = formData.get('websiteUrl');
        const industry = formData.get('industry');
        const location = formData.get('location');
        const employeeCount = formData.get('employeeCount');
        const description = formData.get('description');

        // Simple validation checks
        const newErrors = {};
        if (!companyName) newErrors.companyName = "Company name is required";
        if (!websiteUrl) newErrors.websiteUrl = "Website link is required";
        if (!location) newErrors.location = "Location coordinates required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Commit state updates
        const newCompanyData = {
            name: companyName,
            websiteUrl: websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`,
            industry: industry || 'technology',
            location,
            employeeCount: employeeCount || '1-10',
            description,
            logo: logoUrl || (company ? company.logo : ''),
            status: company ? company.status : 'Pending',
            recruiterId: recruiter.id
        };

        setCompany(newCompanyData);
        console.log("Submitted Company Profile Data:", newCompanyData);

        const payload = await createCompany(newCompanyData);

        if (payload?.insertedId) {
            toast.success("Company profile created successfully!");
        }

        setErrors({});
        setIsEditing(false);
    };

    // 4. State Toggle helper triggers
    const startRegistration = () => {
        setLogoUrl('');
        setIsEditing(true);
    };

    const startEditing = () => {
        setLogoUrl(company?.logo || '');
        setIsEditing(true);
    };

    // --- SUB-VIEW 1: Empty Profile view state ---
    if (!company?._id && !isEditing) {
        return (
            <div className="max-w-2xl mx-auto my-12 bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                    <Factory size={24} className="text-zinc-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-zinc-200">No Company Registered Yet</h2>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                        To start creating structural job posts and tracking incoming pipelines, configure your workspace profile.
                    </p>
                </div>
                <button
                    onClick={startRegistration}
                    className="btn bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg border-none px-6 h-11 min-h-0 normal-case transition-all inline-flex items-center gap-1"
                >
                    Register Company <ArrowRight size={16} />
                </button>
            </div>
        );
    }

    // --- SUB-VIEW 2: Render Presentation Dashboard view mode ---
    if (company && !isEditing) {
        const getStatusStyles = (status) => {
            switch (status) {
                case 'Approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                case 'Rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            }
        };

        return (
            <div className="max-w-4xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-8">
                {/* Header Action Grid area */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6">
                    <div className="flex items-center gap-4">
                        {company.logo ? (
                            <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl object-contain bg-zinc-900 p-2 border border-zinc-800" />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <Factory size={24} className="text-zinc-600" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusStyles(company.status)}`}>
                                    {company.status || 'Pending'}
                                </span>
                            </div>
                            <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:underline flex items-center gap-1 mt-1">
                                <Globe size={14} className="text-zinc-500" /> {company.websiteUrl}
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={startEditing}
                        className="btn btn-outline border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700 rounded-lg px-4 font-medium h-10 min-h-0 normal-case flex items-center gap-2"
                    >
                        <Pencil size={14} /> Edit Profile
                    </button>
                </div>

                {/* Profile Meta Metrics Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Industry Category</span>
                        <span className="text-zinc-300 font-medium mt-1 block capitalize">{company.industry}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Location</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{company.location}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Company Scale</span>
                        <span className="text-zinc-300 font-medium mt-1 block">
                            {company.employeeCount === '1-10' ? '1-10 employees' :
                                company.employeeCount === '11-50' ? '11-50 employees' :
                                    company.employeeCount === '51-200' ? '51-200 employees' :
                                        company.employeeCount === '201+' ? '201+ employees' : company.employeeCount}
                        </span>
                    </div>
                </div>

                {/* Description Box View Section */}
                {company.description && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">About our Vision & Culture</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                            {company.description}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // --- SUB-VIEW 3: Form Editing & Registration View Structure (With Modal Close Layout) ---
    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl relative">

            {/* Added Modal-Style Close Icon */}
            <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-zinc-900"
                aria-label="Close form"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 w-full pb-3 mb-2 pr-8">
                        {company ? 'Update Company Profile' : 'Configure Workspace Platform'}
                    </h2>

                    {/* ROW 1: Company Name + Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-zinc-400 font-medium text-sm">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                defaultValue={company?.name || ''}
                                placeholder="e.g. Acme Corp"
                                className={`${textInputClass} ${errors.companyName ? 'border-red-500' : ''}`}
                            />
                            {errors.companyName && <span className="text-xs text-red-500 mt-1">{errors.companyName}</span>}
                        </div>

                        <div className={selectBoxClass}>
                            <label className="text-zinc-400 font-medium text-sm mb-1 block">Industry / Category</label>
                            <div className="relative flex items-center w-full">
                                <select
                                    name="industry"
                                    defaultValue={company?.industry || 'technology'}
                                    className={`${triggerClasses} appearance-none pr-10 font-normal`}
                                >
                                    <option value="technology" className="bg-zinc-950 text-zinc-300">Technology</option>
                                    <option value="design" className="bg-zinc-950 text-zinc-300">Design</option>
                                    <option value="marketing" className="bg-zinc-950 text-zinc-300">Marketing</option>
                                    <option value="finance" className="bg-zinc-950 text-zinc-300">Finance</option>
                                </select>
                                <ChevronDown size={16} className="text-zinc-500 absolute right-3 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* ROW 2: Website URL + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-zinc-400 font-medium text-sm">Website URL</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                                    https://
                                </span>
                                <input
                                    type="text"
                                    name="websiteUrl"
                                    defaultValue={company?.websiteUrl?.replace(/^https?:\/\//, '') || ''}
                                    placeholder="www.company.com"
                                    className={`${textInputClass} pl-20 ${errors.websiteUrl ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.websiteUrl && <span className="text-xs text-red-500 mt-1">{errors.websiteUrl}</span>}
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <label className="text-zinc-400 font-medium text-sm">Location</label>
                            <div className="relative flex items-center">
                                <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={company?.location || ''}
                                    placeholder="City, Country"
                                    className={`${textInputClass} pl-10 ${errors.location ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.location && <span className="text-xs text-red-500 mt-1">{errors.location}</span>}
                        </div>
                    </div>

                    {/* ROW 3: Employee Count + Custom File Logo Upload Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className={selectBoxClass}>
                            <label className="text-zinc-400 font-medium text-sm mb-1 block">Employee Count Range</label>
                            <div className="relative flex items-center w-full">
                                <select
                                    name="employeeCount"
                                    defaultValue={company?.employeeCount || '1-10'}
                                    className={`${triggerClasses} appearance-none pr-10 font-normal`}
                                >
                                    <option value="1-10" className="bg-zinc-950 text-zinc-300">1-10 employees</option>
                                    <option value="11-50" className="bg-zinc-950 text-zinc-300">11-50 employees</option>
                                    <option value="51-200" className="bg-zinc-950 text-zinc-300">51-200 employees</option>
                                    <option value="201+" className="bg-zinc-950 text-zinc-300">201+ employees</option>
                                </select>
                                <ChevronDown size={16} className="text-zinc-500 absolute right-3 pointer-events-none" />
                            </div>
                        </div>

                        {/* Custom Styled Upload Block matching original layout exactly */}
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Company Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.logo && <span className="text-xs text-red-500 mt-1">{errors.logo}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: Full-Width TextArea Brief Description */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-zinc-400 font-medium text-sm">Brief Description</label>
                        <textarea
                            name="description"
                            defaultValue={company?.description || ''}
                            placeholder="Tell us about your company's mission and culture..."
                            rows={4}
                            className={textAreaClass}
                        />
                    </div>
                </div>

                {/* Form Navigation Action Area controls */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                    {company && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="btn btn-outline border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700 rounded-lg px-5 font-medium h-11 min-h-0 normal-case"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="btn bg-white text-black font-semibold hover:bg-zinc-200 border-none rounded-lg px-6 h-11 min-h-0 normal-case transition-colors"
                    >
                        {company ? 'Save Updates' : 'Complete Setup'}
                    </button>
                </div>
            </form>
        </div>
    );
}