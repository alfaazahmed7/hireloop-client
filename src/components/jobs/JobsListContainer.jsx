'use client';

import React, { useState, useMemo } from 'react';
import JobFilterBar from './JobFilterBar';
import JobCard from './JobsCard';

const JobsListContainer = ({ initialJobs = [] }) => {
    // 1. Setup the state to remember what the user is searching/filtering for
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        jobType: '',
        workMode: ''
    });

    // Helper function to update the specific filter being changed
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // 2. Filter the jobs array dynamically as the user types or clicks options
    const filteredJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            // Text Search matching (Looks into Job Title, Company Name, and Requirements)
            const matchesSearch =
                !filters.search ||
                job.jobTitle?.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.companyName?.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.requirements?.toLowerCase().includes(filters.search.toLowerCase());

            // Category Matching
            const matchesCategory =
                !filters.category ||
                job.jobCategory?.toLowerCase() === filters.category.toLowerCase();

            // Job Type Matching
            const matchesJobType =
                !filters.jobType ||
                job.jobType?.toLowerCase() === filters.jobType.toLowerCase();

            // Remote/On-site Mapping based on your "isRemote" boolean data
            let matchesWorkMode = true;
            if (filters.workMode === 'remote') {
                matchesWorkMode = job.isRemote === true;
            } else if (filters.workMode === 'onsite') {
                matchesWorkMode = job.isRemote === false;
            }

            return matchesSearch && matchesCategory && matchesJobType && matchesWorkMode;
        });
    }, [filters, initialJobs]);

    return (
        <>
            {/* Render your filter bar component right here */}
            <JobFilterBar filters={filters} onFilterChange={handleFilterChange} />

            {/* Showing active available count */}
            <div className="mb-6 text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{filteredJobs.length}</span> positions
            </div>

            {/* Render the Grid Layout */}
            {filteredJobs.length > 0 ? (
                <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-10'>
                    {filteredJobs.map((job) => (
                        <JobCard
                            key={job._id?.$oid || job._id}
                            job={job}
                        />
                    ))}
                </div>
            ) : (
                // Safe empty fall-back layout state if zero matches are found
                <div className="w-full text-center py-20 border border-dashed border-neutral-800 rounded-2xl bg-[#111317]/40">
                    <p className="text-gray-400">No open positions match your search criteria.</p>
                </div>
            )}
        </>
    );
};

export default JobsListContainer;