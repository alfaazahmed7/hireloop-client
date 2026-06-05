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

// 1. Move ActionDropdown OUTSIDE of the main component entirely
const ActionDropdown = ({ job, onEdit, onDelete }) => {
    return (
        <div className="dropdown dropdown-left dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm hover:bg-base-200">
                <FiMoreVertical size={18} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-40 z-20 border border-base-200">
                <li>
                    <button onClick={() => onEdit && onEdit(job)} className="text-sm flex items-center gap-2 py-2.5">
                        <FiEdit3 size={15} className="text-base-content/70" /> Edit Job
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
            <tr className="hover:bg-base-200/30 transition-colors">
                {/* Title */}
                <td className="py-4 px-6 max-w-xs truncate">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/5 text-primary rounded-lg shrink-0">
                            <FiBriefcase size={18} />
                        </div>
                        <div className="truncate">
                            <div className="font-semibold text-sm text-base-content hover:text-primary transition-colors cursor-pointer truncate">
                                {job.jobTitle}
                            </div>
                            <div className="text-[11px] uppercase tracking-wider font-bold text-base-content/40 mt-0.5">
                                {job.jobCategory}
                            </div>
                        </div>
                    </div>
                </td>

                {/* Type & Location */}
                <td className="py-4">
                    <div className="flex flex-col gap-1">
                        <span className="badge badge-sm font-semibold capitalize bg-neutral/10 text-neutral-content border-none w-max">
                            {job.jobType}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-base-content/60 mt-0.5 truncate max-w-[150px]">
                            <FiMapPin size={12} className="shrink-0 text-base-content/40" />
                            {job.isRemote ? 'Remote' : job.location}
                        </span>
                    </div>
                </td>

                {/* Salary */}
                <td className="py-4 font-medium text-sm text-base-content/90">
                    <div className="flex items-center gap-0.5">
                        <FiDollarSign size={14} className="text-success shrink-0" />
                        {formatSalary(job.minSalary, job.maxSalary, job.currency)}
                    </div>
                </td>

                {/* Deadline */}
                <td className="py-4 text-xs">
                    <div className="flex items-center gap-1.5 text-base-content/70">
                        <FiCalendar size={14} className="text-base-content/40 shrink-0" />
                        {formatDate(job.deadline)}
                    </div>
                </td>

                {/* Visibility */}
                <td className="py-4">
                    {job.isPubliclyVisible ? (
                        <span className="badge badge-sm text-success gap-1 font-medium bg-success/10 border-none py-2">
                            <FiEye size={12} /> Public
                        </span>
                    ) : (
                        <span className="badge badge-sm text-base-content/40 gap-1 font-medium bg-base-200 border-none py-2">
                            <FiEyeOff size={12} /> Private
                        </span>
                    )}
                </td>

                {/* Status */}
                <td className="py-4">
                    <span className={`badge badge-xs font-bold uppercase tracking-wide py-2 px-2.5 border-none ${job.status === 'active' ? 'bg-success/10 text-success' :
                            job.status === 'expired' ? 'bg-error/10 text-error' :
                                'bg-warning/10 text-warning'
                        }`}>
                        {job.status}
                    </span>
                </td>

                {/* Actions */}
                <td className="py-4 text-center px-6">
                    {/* 2. Pass the required props down explicitly now */}
                    <ActionDropdown job={job} onEdit={onEdit} onDelete={onDelete} />
                </td>
            </tr>
        );
    }

    // --- MOBILE RENDER VIEW (Card Item) ---
    return (
        <div className="p-4 flex flex-col gap-3 bg-base-100 hover:bg-base-200/20 transition-colors">
            {/* Card Header Top */}
            <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                    <span className="badge badge-xs uppercase tracking-wider font-bold bg-primary/10 text-primary border-none px-2 py-1.5">
                        {job.jobCategory}
                    </span>
                    <h3 className="font-bold text-base text-base-content leading-snug">
                        {job.jobTitle}
                    </h3>
                </div>
                <div className="shrink-0">
                    {/* 2. Pass the required props down explicitly now */}
                    <ActionDropdown job={job} onEdit={onEdit} onDelete={onDelete} />
                </div>
            </div>

            {/* Grid Meta Details */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs bg-base-200/40 p-3 rounded-lg my-1">
                <div>
                    <span className="text-base-content/40 block mb-0.5">Location</span>
                    <span className="flex items-center gap-1 font-medium text-base-content/80">
                        <FiMapPin size={12} className="text-base-content/50" />
                        {job.isRemote ? 'Remote' : job.location.split(',')[0]}
                    </span>
                </div>
                <div>
                    <span className="text-base-content/40 block mb-0.5">Job Type</span>
                    <span className="badge badge-sm font-semibold capitalize bg-neutral/10 text-neutral-content border-none">
                        {job.jobType}
                    </span>
                </div>
                <div className="col-span-2 border-t border-base-200/60 my-1"></div>
                <div>
                    <span className="text-base-content/40 block mb-0.5">Salary Compensation</span>
                    <span className="flex items-center gap-0.5 font-semibold text-success">
                        <FiDollarSign size={13} />
                        {job.maxSalary ? `${job.currency}${Number(job.maxSalary).toLocaleString()}` : 'Negotiable'}
                    </span>
                </div>
                <div>
                    <span className="text-base-content/40 block mb-0.5">Closing Date</span>
                    <span className="flex items-center gap-1 font-medium text-base-content/80">
                        <FiCalendar size={12} className="text-base-content/50" />
                        {formatDate(job.deadline)}
                    </span>
                </div>
            </div>

            {/* Card Footer Status Tags */}
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                    {job.isPubliclyVisible ? (
                        <span className="badge badge-sm text-success gap-1 font-medium bg-success/10 border-none py-2">
                            <FiEye size={12} /> Public
                        </span>
                    ) : (
                        <span className="badge badge-sm text-base-content/40 gap-1 font-medium bg-base-200 border-none py-2">
                            <FiEyeOff size={12} /> Private
                        </span>
                    )}
                </div>
                <span className={`badge badge-sm font-bold uppercase tracking-wide py-2.5 px-3 border-none ${job.status === 'active' ? 'bg-success/20 text-success' :
                        job.status === 'expired' ? 'bg-error/20 text-error' :
                            'bg-warning/20 text-warning'
                    }`}>
                    {job.status}
                </span>
            </div>
        </div>
    );
};

export default JobsTable;