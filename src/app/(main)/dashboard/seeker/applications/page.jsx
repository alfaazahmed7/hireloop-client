import React from 'react';
import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import { ApplicationTable } from './ApplicationTable';

const ApplicationPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationByApplicant(user?.id) || [];

    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 p-6 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl font-semibold mb-6 tracking-wide text-zinc-200">
                    Your Applications ({jobs.length})
                </h1>

                <ApplicationTable jobs={jobs} />
            </div>
        </div>
    );
};

export default ApplicationPage;