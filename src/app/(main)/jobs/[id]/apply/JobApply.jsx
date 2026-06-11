import React from 'react';

const JobApplyDetailsPage = ({ job }) => {


    return (
        <div>
            <button>apply now. {job.companyName}</button>
        </div>
    );
};

export default JobApplyDetailsPage;