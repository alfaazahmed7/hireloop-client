import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ApplicationPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationByApplicant(user?.id);

    return (
        <div>
            applications {jobs.length}
        </div>
    );
};

export default ApplicationPage;