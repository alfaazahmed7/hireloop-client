import { getJobsById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { BsShieldExclamation } from 'react-icons/bs';
import JobApplyDetailsPage from './JobApply';
import { getApplicationByApplicant } from '@/lib/api/applications';

const JobApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    // console.log(user, 'user');

    if (!user) {
        redirect(`/sign-in?redirect=/jobs/${id}/apply`);
    }

    // Auth Role Guard Screen
    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
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
    }

    return (
        <div>
            <div className='bg-[#010103] flex justify-end pt-4 pr-10'>
                <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 px-6 py-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">
                        {applications.length}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">
                        You have applied to{" "}
                        <span className="text-indigo-600">
                            {applications.length}
                        </span>{" "}
                        out of{" "}
                        <span className="text-purple-600">
                            {plan.maxApplicationsPerMonth}
                        </span>{" "}
                        applications this month
                    </h2>
                </div>
            </div>

            {/* <p>Purchase plan to apply for more positions.
                <Link href={`/plan`}>Plans</Link>
            </p> */}

            {applications.length < plan.maxApplicationsPerMonth && (
                <JobApplyDetailsPage
                    applicant={user}
                    job={job} />
            )}
        </div>
    );
};

export default JobApplyPage;