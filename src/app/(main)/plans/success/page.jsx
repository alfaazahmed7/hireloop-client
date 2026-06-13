import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaCircleCheck, FaEnvelope, FaHouse, FaArrowRight } from 'react-icons/fa6';
import { stripe } from '@/lib/stripe';
import { createSubscription } from '@/lib/actions/subscriptions';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const {
        status,
        customer_details,
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    const customerEmail = customer_details?.email || '';

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId,
        }

        // update the user table about the new plan
        const result = await createSubscription(subsInfo);
        console.log(result);

        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {/* Decorative background glow sparks */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-xl w-full bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-emerald-950/20">

                    {/* Animated/Glowing Success Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 mb-8 border border-emerald-500/20 shadow-[0_0_40px_-5px_rgba(16,185,129,0.2)]">
                        <FaCircleCheck className="text-4xl animate-pulse" />
                    </div>

                    {/* Header */}
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
                        Payment <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Successful!</span>
                    </h1>
                    <p className="text-slate-400 text-base mb-8">
                        Thank you for your premium subscription. Your account features are upgraded immediately.
                    </p>

                    {/* Details Box */}
                    <div className="bg-slate-950/60 border border-slate-800/60 rounded-2xl p-5 text-left mb-8 space-y-4">
                        <div className="flex items-start gap-3">
                            <FaEnvelope className="text-emerald-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-slate-200">Confirmation Sent</p>
                                <p className="text-xs text-slate-400 mt-0.5 break-all">
                                    We have dispatched a receipt copy to <span className="text-emerald-400 font-medium">{customerEmail}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Assistance Info */}
                    <p className="text-xs text-slate-500 mb-8">
                        Have any issues or billing questions? Reach out directly at{' '}
                        <a href="mailto:orders@example.com" className="text-slate-400 hover:text-emerald-400 underline transition-colors duration-150">
                            orders@example.com
                        </a>.
                    </p>

                    {/* Call to Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:opacity-90 shadow-lg shadow-emerald-500/10 transition-all duration-150"
                        >
                            Go to Dashboard
                            <FaArrowRight className="text-xs" />
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm tracking-wide bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/50 transition-all duration-150"
                        >
                            <FaHouse className="text-xs" />
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}