import React from 'react';
import { SiGoogle, SiMeta, SiStripe, SiTesla } from 'react-icons/si';

const DashboardCompanies = () => {
    // Static Data for Top Companies
    const companies = [
        {
            name: 'Google Inc.',
            category: 'Technology',
            location: 'Mountain View',
            jobs: 24,
            icon: <SiGoogle className="text-xl text-white" />,
        },
        {
            name: 'Meta Platforms',
            category: 'Social Media',
            location: 'Menlo Park',
            jobs: 18,
            icon: <SiMeta className="text-xl text-blue-400" />,
        },
        {
            name: 'Stripe',
            category: 'Fintech',
            location: 'San Francisco',
            jobs: 12,
            icon: <SiStripe className="text-xl text-white" />,
        },
        {
            name: 'Tesla',
            category: 'Automotive',
            location: 'Austin',
            jobs: 31,
            icon: <SiTesla className="text-xl text-red-600" />,
        },
    ];

    return (
        <div>
            {/* --- MY TOP COMPANIES SECTION --- */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h2 className="text-xl font-semibold tracking-wide text-white">My Top Companies</h2>
                    <button className="text-sm text-gray-400 hover:text-white transition">View all</button>
                </div>

                <div className="border border-[#222] rounded-xl p-5 flex flex-col justify-between flex-1 gap-6">
                    <div className="space-y-5">
                        {companies.map((company, index) => (
                            <div key={index} className="flex items-center justify-between group">
                                {/* Company Profile Details */}
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                                        {company.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-gray-200 group-hover:text-white transition">
                                            {company.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {company.category} • {company.location}
                                        </p>
                                    </div>
                                </div>
                                {/* Job Counts */}
                                <div className="text-right">
                                    <span className="block font-bold text-sm text-white">{company.jobs}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Active Jobs</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Interactive Button */}
                    <button className="w-full py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl text-sm font-medium text-gray-300 hover:bg-[#222] hover:text-white transition shadow-sm mt-4">
                        View All Companies
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardCompanies;