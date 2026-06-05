import JobsTable from '@/components/dashboard/recruiter-dashboard/JobsTable';
import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';

const RecruiterJobs = async () => {
    const companyId = 'company_123'; //todo
    const jobs = await getCompanyJobs(companyId) || [];

    return (
        // min-w-0 prevents this main component from overflowing next to your w-64 sidebar
        <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:py-8 lg:px-20 space-y-6">

            {/* Responsive Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-base-200">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-base-content tracking-tight">
                        Manage Job Postings
                    </h2>
                    <p className="text-xs sm:text-sm text-base-content/60 mt-0.5">
                        Track, modify, or remove active listings for your organization.
                    </p>
                </div>
                <div className="badge badge-md font-semibold py-3 px-4 bg-primary/10 text-primary border-none shrink-0">
                    Total Jobs: {jobs.length}
                </div>
            </div>

            {/* Layout Wrapper: Fully responsive card list on mobile, clean table on desktop */}
            <div className="w-full bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">

                {/* Desktop View Table Header - Hidden on mobile screens */}
                <div className="hidden lg:block overflow-x-auto w-full">
                    <table className="table table-zebra w-full vertical-align-middle">
                        <thead className="bg-base-200/50 text-base-content/70 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="py-4 pl-6">Job Title & Category</th>
                                <th className="py-4">Type & Location</th>
                                <th className="py-4">Salary Range</th>
                                <th className="py-4">Deadline</th>
                                <th className="py-4">Visibility</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 text-center pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-base-content/80">
                            {jobs.map((job) => (
                                <JobsTable key={job._id} job={job} viewType="desktop" />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile & Tablet Card View List - Hidden on desktop screens */}
                <div className="block lg:hidden divide-y divide-base-200">
                    {jobs.map((job) => (
                        <JobsTable key={job._id} job={job} viewType="mobile" />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default RecruiterJobs;