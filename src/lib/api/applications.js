import { serverFetch } from "../core/server"

export const getApplicationByApplicant = (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`);
}