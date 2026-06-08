'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import DashboardApplications from '@/components/dashboard/recruiter-dashboard/DashboardApplications';
import DashboardCompanies from '@/components/dashboard/recruiter-dashboard/DashboardCompanies';
import { DashboardStats } from '@/components/dashboard/recruiter-dashboard/DashboardStats';

const RecruiterDashboardHomapage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        <span className="loading loading-spinner loading-xl"></span>
    }
    const user = session?.user;

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    return (
        <div className='w-full max-w-[1500px] mx-auto'>
            <div className='px-4 pt-8'>
                <h2 className='text-2xl text-white font-semibold'>Welcome back, {user?.name}</h2>
            </div>
            <div>
                <div className='mb-10'>
                    <DashboardStats statsData={recruiterStats} />
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
                    <DashboardApplications />
                    <DashboardCompanies />
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboardHomapage;