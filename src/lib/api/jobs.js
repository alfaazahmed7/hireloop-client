import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getJobs = async () => {
    return serverFetch('/api/jobs');
}

export const getJobsById = async (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`);
}

export const getCompanyJobs = async (companyId, status = "active") => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}