import { getJobsById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { BsShieldExclamation, BsLightningCharge, BsCheckCircle } from 'react-icons/bs';
import JobApplyDetailsPage from './JobApply';
import { getApplicationByApplicant } from '@/lib/api/applications';

const JobApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/sign-in?redirect=/jobs/${id}/apply`);
    }

    // Auth Role Guard Screen
    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-[#09090b] text-white p-6">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BsShieldExclamation className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
                    </p>
                    <Link
                        href="/sign-in"
                        className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    }

    const job = await getJobsById(id);
    const applications = await getApplicationByApplicant(user.id);

    const plan = {
        name: 'Free',
        maxApplicationsPerMonth: 3
    };

    const hasReachedLimit = applications.length >= plan.maxApplicationsPerMonth;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Application Counter Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-lg shadow-inner ${hasReachedLimit
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            }`}>
                            {applications.length}
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-zinc-200">
                                Monthly Application Usage
                            </h2>
                            <p className="text-sm text-zinc-400 mt-0.5">
                                You have used <span className="text-indigo-400 font-medium">{applications.length}</span> out of <span className="text-zinc-300 font-medium">{plan.maxApplicationsPerMonth}</span> applications on your <span className="underline decoration-indigo-500/50 underline-offset-4">{plan.name} Plan</span>.
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar Visualizer */}
                    <div className="w-full sm:w-40 bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${hasReachedLimit ? 'bg-red-500' : 'bg-indigo-500'}`}
                            style={{ width: `${Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                {hasReachedLimit ? (
                    /* Limit Reached State Upgrade Screen */
                    <div className="text-center p-12 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl max-w-xl mx-auto mt-8">
                        <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-indigo-500/20">
                            <BsLightningCharge className="w-7 h-7 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-100 mb-3">Application Limit Reached</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                            You have hit your monthly limit for the {plan.name} Tier. Upgrade your plan today to unlock unlimited job applications and land your dream role faster.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/plan"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <BsLightningCharge className="w-4 h-4" />
                                View Premium Plans
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Render Application Form Container */
                    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                        <JobApplyDetailsPage
                            applicant={user}
                            job={job}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplyPage;