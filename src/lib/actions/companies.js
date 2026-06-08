'use server'

import { serverMutaion } from "../core/server"

export const createCompany = async (newCompanyData) => {
    return serverMutaion('/api/companies', newCompanyData);
}