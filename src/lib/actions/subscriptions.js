import { serverMutaion } from "../core/server"

export const createSubscription = async (subInfo) => {
    return serverMutaion('/api/subscriptions', subInfo);
}