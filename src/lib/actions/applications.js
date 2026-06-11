'use server'

import { serverMutaion } from "../core/server"

export const submitApplication = async (applicationData) => {
    return serverMutaion('/api/applications', applicationData);
}