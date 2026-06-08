'use client';

import React from 'react';
import {
    FiBriefcase,
    FiMapPin,
    FiCalendar,
    FiDollarSign,
    FiEye,
    FiEyeOff,
    FiMoreVertical,
    FiEdit3,
    FiTrash2
} from 'react-icons/fi';

const ActionDropdown = ({ job, onEdit, onDelete }) => {
    return (
        <div className="dropdown dropdown-left dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm hover:bg-white/[0.08] text-white/70">
                <FiMoreVertical size={18} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-[#1e232e] rounded-box w-40 z-20 border border-white/[0.08] text-white v">
                <li>
                    <button onClick={() => onEdit && onEdit(job)} className="text-sm flex items-center gap-2 py-2.5 hover:bg-white/[0.05]">
                        <FiEdit3 size={15} className="text-[#7e8494]" /> Edit Job
                    </button>
                </li>
                <li>
                    <button onClick={() => onDelete && onDelete(job)} className="text-sm text-error hover:bg-error/10 flex items-center gap-2 py-2.5">
                        <FiTrash2 size={15} /> Delete
                    </button>
                </li>
            </ul>
        </div>
    );
};

const JobsTable = ({ job, onEdit, onDelete, view = "desktop" }) => {
    if (!job) return null;

    const formatSalary = (min, max, currency) => {
        if (!min || !max) return 'Negotiable';
        return `${currency} ${Number(min).toLocaleString()} - ${Number(max).toLocaleString()}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No deadline';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // --- DESKTOP RENDER VIEW (Table Row) ---
    if (view === "desktop") {
        return (
            <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/[0.04] bg-[#181c24] text-[#d1d5db]">
                {/* Title */}
                <td className="py-4 px-6 max-w-xs truncate">
                    <div className="flex items-center gap-4">
                        {/* Custom Icon Box matching screenshot styling */}
                        <div className="p-3 bg-[#1e2330] border border-white/[0.04] text-[#4f7bf7] rounded-xl shrink-0">
                            <FiBriefcase size={18} />
                        </div>
                        <div className="truncate">
                            <div className="font-bold text-sm text-white hover:text-[#4f7bf7] transition-colors cursor-pointer truncate">
                                {job.jobTitle}
                            </div>
                            <div className="text-[11px] uppercase tracking-wider font-bold text-[#555d6e] mt-1">
                                {job.jobCategory}
                            </div>
                        </div>
                    </div>
                </td>

                {/* Type & Location */}
                <td className="py-4">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold text-white">
                            {job.jobType}
                        </span>
                        <span className="text-xs flex items-center gap-1.5 text-[#7e8494] truncate max-w-[150px]">
                            <FiMapPin size={13} className="shrink-0 text-[#555d6e]" />
                            {job.isRemote ? 'Remote' : job.location}
                        </span>
                    </div>
                </td>

                {/* Salary */}
                <td className="py-4 font-bold text-sm text-white">
                    <div className="flex items-center gap-1">
                        <FiDollarSign size={15} className="text-[#10b981] shrink-0" />
                        <span>{formatSalary(job.minSalary, job.maxSalary, job.currency)}</span>
                    </div>
                </td>

                {/* Deadline */}
                <td className="py-4 text-xs text-[#a3a9b6]">
                    <div className="flex items-center gap-2">
                        <FiCalendar size={14} className="text-[#555d6e] shrink-0" />
                        <span>{formatDate(job.deadline)}</span>
                    </div>
                </td>

                {/* Visibility */}
                <td className="py-4">
                    {job.isPubliclyVisible ? (
                        <span className="badge badge-sm text-[#10b981] gap-1.5 font-bold bg-[#10b981]/10 border border-[#10b981]/20 py-2.5 px-3 rounded-md">
                            <FiEye size={12} /> Public
                        </span>
                    ) : (
                        <span className="badge badge-sm text-[#7e8494] gap-1.5 font-bold bg-white/[0.05] border border-white/[0.08] py-2.5 px-3 rounded-md">
                            <FiEyeOff size={12} /> Private
                        </span>
                    )}
                </td>

                {/* Status */}
                <td className="py-4">
                    <span className={`badge badge-sm font-extrabold uppercase tracking-wide py-2.5 px-3 border rounded-md ${job.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
                            job.status === 'expired' ? 'bg-error/10 text-error border-error/20' :
                                'bg-warning/10 text-warning border-warning/20'
                        }`}>
                        {job.status}
                    </span>
                </td>

                {/* Actions */}
                <td className="py-4 text-center px-6">
                    <ActionDropdown job={job} onEdit={onEdit} onDelete={onDelete} />
                </td>
            </tr>
        );
    }

    // --- MOBILE RENDER VIEW (Card Item) ---
    return (
        <div className="p-4 flex flex-col gap-3 bg-[#181c24] hover:bg-white/[0.01] transition-colors text-white">
            {/* Card Header Top */}
            <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                    <span className="badge badge-xs uppercase tracking-wider font-bold bg-white/[0.05] text-[#7e8494] border-none px-2 py-1.5">
                        {job.jobCategory}
                    </span>
                    <h3 className="font-bold text-base text-white leading-snug">
                        {job.jobTitle}
                    </h3>
                </div>
                <div className="shrink-0">
                    <ActionDropdown job={job} onEdit={onEdit} onDelete={onDelete} />
                </div>
            </div>

            {/* Grid Meta Details */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs bg-[#12151c] p-3 rounded-lg my-1 border border-white/[0.04]">
                <div>
                    <span className="text-[#555d6e] block mb-0.5">Location</span>
                    <span className="flex items-center gap-1 font-medium text-gray-300">
                        <FiMapPin size={12} className="text-[#555d6e]" />
                        {job.isRemote ? 'Remote' : job.location?.split(',')[0]}
                    </span>
                </div>
                <div>
                    <span className="text-[#555d6e] block mb-0.5">Job Type</span>
                    <span className="text-white font-bold block mt-0.5">
                        {job.jobType}
                    </span>
                </div>
                <div className="col-span-2 border-t border-white/[0.04] my-1"></div>
                <div>
                    <span className="text-[#555d6e] block mb-0.5">Salary Compensation</span>
                    <span className="flex items-center gap-0.5 font-bold text-[#10b981]">
                        <FiDollarSign size={13} />
                        {job.maxSalary ? `${job.currency}${Number(job.maxSalary).toLocaleString()}` : 'Negotiable'}
                    </span>
                </div>
                <div>
                    <span className="text-[#555d6e] block mb-0.5">Closing Date</span>
                    <span className="flex items-center gap-1 font-medium text-gray-300">
                        <FiCalendar size={12} className="text-[#555d6e]" />
                        {formatDate(job.deadline)}
                    </span>
                </div>
            </div>

            {/* Card Footer Status Tags */}
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                    {job.isPubliclyVisible ? (
                        <span className="badge badge-sm text-[#10b981] gap-1.5 font-bold bg-[#10b981]/10 border border-[#10b981]/20 py-2 px-2.5 rounded">
                            <FiEye size={12} /> Public
                        </span>
                    ) : (
                        <span className="badge badge-sm text-[#7e8494] gap-1.5 font-bold bg-white/[0.05] border border-white/[0.08] py-2 px-2.5 rounded">
                            <FiEyeOff size={12} /> Private
                        </span>
                    )}
                </div>
                <span className={`badge badge-sm font-extrabold uppercase tracking-wide py-2 px-2.5 border rounded ${job.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
                        job.status === 'expired' ? 'bg-error/10 text-error border-error/20' :
                            'bg-warning/10 text-warning border-warning/20'
                    }`}>
                    {job.status}
                </span>
            </div>
        </div>
    );
};

export default JobsTable;