import JobsTable from '@/components/dashboard/recruiter-dashboard/JobsTable';
import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';

const RecruiterJobs = async () => {
    const companyId = 'company_123'; //todo
    const jobs = await getCompanyJobs(companyId) || [];

    return (
        // Canvas Background: Fixed deep charcoal layout background (#111317)
        <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:py-8 lg:px-20 space-y-6 bg-[#111317] text-white">

            {/* Responsive Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                        Manage Job Postings
                    </h2>
                    <p className="text-xs sm:text-sm text-[#7e8494] mt-0.5">
                        Track, modify, or remove active listings for your organization.
                    </p>
                </div>
                <div className="badge badge-md font-semibold py-3 px-4 bg-[#2b5a9e]/20 text-[#4f86f7] border-none shrink-0">
                    Total Jobs: {jobs.length}
                </div>
            </div>

            {/* Layout Wrapper: Specific table card container shade (#181c24) */}
            <div className="w-full bg-[#181c24] rounded-xl shadow-lg border border-white/[0.05] overflow-hidden">

                {/* Desktop View Table Header - Hidden on mobile screens */}
                <div className="hidden lg:block overflow-x-auto w-full">
                    <table className="table table-zebra w-full vertical-align-middle bg-[#181c24]">
                        <thead className="bg-[#181c24] text-[#7e8494] text-xs uppercase font-extrabold tracking-wider border-b border-white/[0.05]">
                            <tr>
                                <th className="py-5 pl-6 text-[#7e8494]">Job Title & Category</th>
                                <th className="py-5 text-[#7e8494]">Type & Location</th>
                                <th className="py-5 text-[#7e8494]">Salary Range</th>
                                <th className="py-5 text-[#7e8494]">Deadline</th>
                                <th className="py-5 text-[#7e8494]">Visibility</th>
                                <th className="py-5 text-[#7e8494]">Status</th>
                                <th className="py-4 text-center pr-6 text-[#7e8494]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <JobsTable key={job._id} job={job} view="desktop" />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile & Tablet Card View List - Hidden on desktop screens */}
                <div className="block lg:hidden divide-y divide-white/[0.06] bg-[#181c24]">
                    {jobs.map((job) => (
                        <JobsTable key={job._id} job={job} view="mobile" />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default RecruiterJobs;