import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro' : 'price_1ThcbgKesldR2TvfrHk8m98A',
    'seeker_premium' : 'price_1ThdGuKesldR2TvfGMWjteDk',
    'recruiter_growth' : 'price_1ThdHkKesldR2Tvfu4rsYBVd',
    'recruiter_enterprise' : 'price_1ThdIEKesldR2TvfHsvIbodz'
}