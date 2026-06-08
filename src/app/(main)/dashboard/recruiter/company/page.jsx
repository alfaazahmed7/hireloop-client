"use client";

import React, { useState, useRef } from "react";
import {
    FiPlus,
    FiUploadCloud,
    FiX,
    FiMapPin,
    FiGlobe,
    FiBriefcase,
    FiUsers,
    FiEdit3
} from "react-icons/fi";

export default function MyCompanyPage() {
    // --- STATE ---
    const [isRegistered, setIsRegistered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Company Data State
    const [companyData, setCompanyData] = useState({
        name: "Acme Corp",
        industry: "Technology",
        website: "https://www.acme.com",
        location: "San Francisco, USA",
        employeeCount: "11-50 employees",
        logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
        description: "Building the future of developer tools and modern workspace collaborations.",
        status: "Pending", // Pending | Approved | Rejected
    });

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        industry: "Technology",
        website: "",
        location: "",
        employeeCount: "1-10 employees",
        logoUrl: "",
        description: "",
    });

    const fileInputRef = useRef(null);

    // --- HANDLERS ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ImgBB Upload Handler
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        const uploadData = new FormData();
        uploadData.append("image", file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: uploadData,
            });

            const result = await response.json();
            if (result.success) {
                setFormData((prev) => ({ ...prev, logoUrl: result.data.url }));
            } else {
                alert("Image upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    // Submit Form (Register / Update)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the updated data object directly
        const updatedCompanyData = {
            ...formData,
            status: "Pending",
        };

        // Update the state
        setCompanyData(updatedCompanyData);
        setIsRegistered(true);
        setIsModalOpen(false);

        // Log the actual updated values instead of the stale state instance
        console.log(updatedCompanyData, "companyData");
    };

    // Open modal for editing
    const handleEditClick = () => {
        setFormData(companyData);
        setIsModalOpen(true);
    };

    // Badge Style Helper
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Approved": return "badge-success text-emerald-900 bg-emerald-400";
            case "Rejected": return "badge-error text-rose-900 bg-rose-400";
            default: return "badge-warning text-amber-900 bg-amber-400";
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-zinc-100 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-8">My Company</h1>

                {/* --- STATE 1: UNREGISTERED STATE --- */}
                {!isRegistered ? (
                    <div className="border border-zinc-800 bg-[#1e1e1e] rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <div className="bg-zinc-800 p-4 rounded-full text-zinc-400 mb-4">
                            <FiBriefcase className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No Company Registered</h2>
                        <p className="text-zinc-400 max-w-sm mb-6 text-sm">
                            To start posting jobs and hiring talent on HireLoop, you need to register your company first.
                        </p>
                        <button
                            onClick={() => {
                                setFormData({ name: "", industry: "Technology", website: "https://", location: "", employeeCount: "1-10 employees", logoUrl: "", description: "" });
                                setIsModalOpen(true);
                            }}
                            className="btn bg-white hover:bg-zinc-200 text-black font-semibold border-none px-6 rounded-lg normal-case"
                        >
                            <FiPlus className="w-5 h-5 mr-2" />
                            Register Company
                        </button>
                    </div>
                ) : (
                    /* --- STATE 2: REGISTERED STATE (DETAILS VIEW) --- */
                    <div className="border border-zinc-800 bg-[#1e1e1e] rounded-xl p-6 md:p-8 relative shadow-xl">
                        {/* Top Bar / Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-6">
                            <div className="flex items-center gap-4">
                                {companyData.logoUrl ? (
                                    <img
                                        src={companyData.logoUrl}
                                        alt={companyData.name}
                                        className="w-16 h-16 rounded-xl object-cover bg-zinc-800 border border-zinc-700"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-400">
                                        {companyData.name ? companyData.name.charAt(0) : "C"}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        {companyData.name}
                                        <span className={`badge border-none text-xs font-bold px-2.5 py-1 rounded ${getStatusBadgeClass(companyData.status)}`}>
                                            {companyData.status}
                                        </span>
                                    </h2>
                                    <a
                                        href={companyData.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-zinc-400 text-sm hover:underline inline-flex items-center gap-1 mt-1"
                                    >
                                        <FiGlobe className="w-3.5 h-3.5" /> {companyData.website.replace(/^https?:\/\//, "")}
                                    </a>
                                </div>
                            </div>

                            <button
                                onClick={handleEditClick}
                                className="btn btn-sm bg-zinc-800 hover:bg-zinc-700 border-none text-zinc-200 normal-case rounded-lg"
                            >
                                <FiEdit3 className="w-4 h-4 mr-1.5" />
                                Edit Info
                            </button>
                        </div>

                        {/* Quick Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-[#161616] p-4 rounded-lg border border-zinc-800/60 flex items-center gap-3">
                                <FiBriefcase className="text-zinc-500 w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Industry</p>
                                    <p className="text-sm font-semibold text-zinc-200">{companyData.industry}</p>
                                </div>
                            </div>
                            <div className="bg-[#161616] p-4 rounded-lg border border-zinc-800/60 flex items-center gap-3">
                                <FiMapPin className="text-zinc-500 w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Location</p>
                                    <p className="text-sm font-semibold text-zinc-200">{companyData.location}</p>
                                </div>
                            </div>
                            <div className="bg-[#161616] p-4 rounded-lg border border-zinc-800/60 flex items-center gap-3">
                                <FiUsers className="text-zinc-500 w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Employees</p>
                                    <p className="text-sm font-semibold text-zinc-200">{companyData.employeeCount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">About Company</h3>
                            <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">{companyData.description}</p>
                        </div>
                    </div>
                )}

                {/* --- REGISTRATION / EDIT MODAL --- */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                        <div className="bg-[#161616] border border-zinc-800 w-full max-w-[560px] rounded-xl shadow-2xl overflow-hidden flex flex-col">

                            {/* Modal Header */}
                            <div className="p-6 pb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-100">
                                        {isRegistered ? "Edit Company Info" : "Register New Company"}
                                    </h3>
                                    <p className="text-xs text-zinc-400 mt-1">Enter your business details to start hiring on HireLoop.</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <hr className="border-zinc-800" />

                            {/* Modal Body / Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">

                                {/* Row 1: Name and Industry */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Company Name</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="e.g. Acme Corp"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full bg-[#1e1e1e] border-zinc-700/80 text-zinc-300 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none text-sm h-10 rounded-lg"
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Industry / Category</span></label>
                                        <div className="relative">
                                            <select
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleInputChange}
                                                className="appearance-none w-full bg-[#1e1e1e] border border-zinc-700/80 text-zinc-300 text-sm h-10 px-4 rounded-lg text-center cursor-pointer focus:border-zinc-500 focus:outline-none"
                                            >
                                                <option value="Technology">Technology</option>
                                                <option value="Design & Creative">Design & Creative</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Healthcare">Healthcare</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400 text-[10px]">
                                                ▼
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Website URL and Location */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Website URL</span></label>
                                        <div className="flex rounded-lg overflow-hidden border border-zinc-700/80 focus-within:border-zinc-500">
                                            <span className="bg-[#242424] px-3 flex items-center text-xs text-zinc-400 border-r border-zinc-700/80 select-none">https://</span>
                                            <input
                                                type="text"
                                                name="website"
                                                required
                                                placeholder="www.company.com"
                                                value={formData.website.replace(/^https?:\/\//, "")}
                                                onChange={(e) => setFormData(prev => ({ ...prev, website: `https://${e.target.value}` }))}
                                                className="input w-full bg-[#1e1e1e] text-zinc-300 border-none focus:outline-none text-sm h-10 px-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Location</span></label>
                                        <div className="relative flex items-center">
                                            <FiMapPin className="absolute left-3 text-zinc-500 w-4 h-4" />
                                            <input
                                                type="text"
                                                name="location"
                                                required
                                                placeholder="City, Country"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="input input-bordered w-full bg-[#1e1e1e] border-zinc-700/80 text-zinc-300 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none text-sm h-10 pl-9 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Employee Range and Logo Upload */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Employee Count Range</span></label>
                                        <div className="relative">
                                            <select
                                                name="employeeCount"
                                                value={formData.employeeCount}
                                                onChange={handleInputChange}
                                                className="appearance-none w-full bg-[#1e1e1e] border border-zinc-700/80 text-zinc-300 text-sm h-10 px-4 rounded-lg text-center cursor-pointer focus:border-zinc-500 focus:outline-none"
                                            >
                                                <option value="1-10 employees">1-10 employees</option>
                                                <option value="11-50 employees">11-50 employees</option>
                                                <option value="51-200 employees">51-200 employees</option>
                                                <option value="201-500 employees">201-500 employees</option>
                                                <option value="500+ employees">500+ employees</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400 text-[10px]">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Company Logo</span></label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />

                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border border-dashed border-zinc-700/80 hover:border-zinc-500 bg-[#1e1e1e] rounded-lg h-10 px-3 flex items-center gap-3 cursor-pointer transition-colors"
                                        >
                                            <div className="text-zinc-500">
                                                <FiUploadCloud className="w-4 h-4" />
                                            </div>
                                            <div className="text-left flex items-baseline gap-1 overflow-hidden">
                                                <p className="text-xs font-medium text-zinc-300 truncate">
                                                    {isUploading ? "Uploading..." : formData.logoUrl ? "Change logo" : "Upload image"}
                                                </p>
                                                <p className="text-[10px] text-zinc-600 truncate">PNG, JPG up to 5MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4: Brief Description */}
                                <div className="form-control w-full">
                                    <label className="label py-1.5"><span className="label-text text-xs font-semibold text-zinc-300">Brief Description</span></label>
                                    <textarea
                                        name="description"
                                        required
                                        rows="4"
                                        placeholder="Tell us about your company's mission and culture..."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered w-full bg-[#1e1e1e] border-zinc-700/80 text-zinc-300 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none text-sm rounded-lg resize-none leading-relaxed p-3"
                                    />
                                </div>

                                <hr className="border-zinc-800 pt-2" />

                                {/* Modal Footer Controls */}
                                <div className="flex items-center justify-end gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn btn-sm h-9 px-5 bg-transparent hover:bg-zinc-800/50 border border-zinc-800 text-zinc-300 rounded-lg normal-case font-medium text-xs"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="btn btn-sm h-9 px-5 bg-white hover:bg-zinc-200 disabled:bg-zinc-700 text-black border-none rounded-lg normal-case font-bold text-xs"
                                    >
                                        {isRegistered ? "Save Changes" : "Register Company"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}