import React from 'react';
import Link from 'next/link';
import {
    LuPalette,
    LuDatabase,
    LuCloud,
    LuCpu,
    LuBuilding2,
    LuChevronLeft,
    LuChevronRight,
    LuCodeXml
} from 'react-icons/lu';

// Helper to determine the right company/job icon dynamically
const getJobIcon = (companyName) => {
    const name = companyName?.toLowerCase() || '';
    if (name.includes('stark') || name.includes('code') || name.includes('front')) {
        return <LuCodeXml  className="w-5 h-5 text-zinc-400" />;
    }
    if (name.includes('cyber') || name.includes('design') || name.includes('product')) {
        return <LuPalette className="w-5 h-5 text-zinc-400" />;
    }
    if (name.includes('wayne') || name.includes('data') || name.includes('science')) {
        return <LuDatabase className="w-5 h-5 text-zinc-400" />;
    }
    if (name.includes('oscorp') || name.includes('cloud') || name.includes('amazon')) {
        return <LuCloud className="w-5 h-5 text-red-400" />;
    }
    if (name.includes('hooli') || name.includes('ai') || name.includes('research')) {
        return <LuCpu className="w-5 h-5 text-zinc-400" />;
    }
    return <LuBuilding2 className="w-5 h-5 text-zinc-400" />;
};

// Helper to format timestamps to relative time strings
const formatRelativeTime = (dateInput) => {
    if (!dateInput) return 'Recent';
    const dateStr = typeof dateInput === 'object' && dateInput.$date ? dateInput.$date : dateInput;
    const now = new Date();
    const appliedDate = new Date(dateStr);
    const diffInMs = now - appliedDate;

    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins} mins ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    return appliedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

// Helper style mapper matching the status badge variations
const getStatusStyles = (status = 'Applied') => {
    const currentStatus = status.toLowerCase();
    switch (currentStatus) {
        case 'applied':
            return 'border border-zinc-500 text-zinc-300 bg-zinc-800/20';
        case 'review':
            return 'border border-amber-500/60 text-amber-400 bg-amber-500/5';
        case 'shortlisted':
            return 'border border-emerald-500/60 text-emerald-400 bg-emerald-500/5';
        case 'rejected':
            return 'border border-red-500/50 text-red-400 bg-red-500/5';
        case 'offered':
            return 'border border-zinc-400 text-zinc-100 bg-zinc-700/40';
        default:
            return 'border border-zinc-600 text-zinc-300';
    }
};

export function ApplicationTable({ jobs = [] }) {
    return (
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800/80 text-zinc-400 text-sm font-medium">
                            <th className="py-5 px-6 font-normal">Job Title</th>
                            <th className="py-5 px-6 font-normal">Company</th>
                            <th className="py-5 px-6 font-normal">Applied</th>
                            <th className="py-5 px-6 font-normal">Status</th>
                            <th className="py-5 px-6 font-normal text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/40">
                        {jobs.map((job) => {
                            const id = job._id?.$oid || job._id;
                            const title = job.jobTitle || "Software Engineer";
                            const typeInfo = job.jobType && job.workplaceType ? `${job.jobType} • ${job.workplaceType}` : "Full-time • Remote";
                            const currentStatus = job.status || "Applied";
                            const iconBgColor = job.companyName?.toLowerCase() === 'oscorp tech' ? 'bg-red-950/60 border-red-900' : 'bg-zinc-800/50 border-zinc-700/60';

                            return (
                                <tr key={id} className="hover:bg-zinc-800/10 transition-colors duration-150 group">
                                    {/* Job Title & Details */}
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${iconBgColor} shrink-0 shadow-sm`}>
                                            {getJobIcon(job.companyName || title)}
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold text-zinc-200 tracking-wide group-hover:text-white transition-colors">
                                                {title}
                                            </h2>
                                            <p className="text-xs text-zinc-500 mt-0.5">{typeInfo}</p>
                                        </div>
                                    </td>

                                    {/* Company Name */}
                                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">
                                        {job.companyName || "Unknown Company"}
                                    </td>

                                    {/* Relative Applied Time */}
                                    <td className="py-4 px-6 text-sm text-zinc-400">
                                        {formatRelativeTime(job.createdAt)}
                                    </td>

                                    {/* Colored Status Pill */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-block px-3 py-0.5 text-xs font-semibold tracking-wide rounded-full text-[11px] ${getStatusStyles(currentStatus)}`}>
                                            {currentStatus}
                                        </span>
                                    </td>

                                    {/* Details Action CTA */}
                                    <td className="py-4 px-6 text-right">
                                        <Link
                                            href={`/dashboard/seeker/applications/${id}`}
                                            className="text-sm text-zinc-300 hover:text-white font-medium underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 transition-colors"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* Empty State Fallback */}
                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-16 text-zinc-500 text-sm">
                                    No applications submitted yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer/Pagination Section */}
            <div className="border-t border-zinc-800/80 bg-[#151518] px-6 py-4 flex items-center justify-between text-xs text-zinc-500">
                <div>
                    Showing 1-{Math.min(jobs.length, 5)} of {jobs.length} application{jobs.length !== 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded bg-zinc-800/30 border border-zinc-800 text-zinc-500 hover:text-zinc-300 disabled:opacity-40" disabled>
                        <LuChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-7 h-7 rounded flex items-center justify-center bg-white text-zinc-900 font-medium text-xs">
                        1
                    </button>
                    <button className="w-7 h-7 rounded flex items-center justify-center bg-zinc-800/30 border border-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                        2
                    </button>
                    <button className="w-7 h-7 rounded flex items-center justify-center bg-zinc-800/30 border border-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                        3
                    </button>
                    <button className="p-1.5 rounded bg-zinc-800/30 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                        <LuChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}