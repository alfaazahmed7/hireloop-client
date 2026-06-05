import React from 'react';

export default function DashboardApplications() {
    // Static Data for Recent Applications
    const applications = [
        {
            name: 'Julianne Moore',
            role: 'Senior Product Designer',
            date: 'Oct 24, 2023',
            experience: '6 years',
            status: 'Interviewing',
            statusColor: 'text-green-500 bg-green-500/10 border-green-500/20',
        },
        {
            name: 'Robert Downey',
            role: 'Backend Engineer',
            date: 'Oct 23, 2023',
            experience: '4 years',
            status: 'New',
            statusColor: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
        },
        {
            name: 'Emma Stone',
            role: 'Marketing Lead',
            date: 'Oct 22, 2023',
            experience: '8 years',
            status: 'Reviewing',
            statusColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        },
        {
            name: 'Chris Pratt',
            role: 'Product Manager',
            date: 'Oct 21, 2023',
            experience: '5 years',
            status: 'Rejected',
            statusColor: 'text-red-500 bg-red-500/10 border-red-500/20',
        },
    ];

    return (
        <div className="w-full text-[#f3f4f6] font-sans xl:col-span-2 flex flex-col p-4">
            <div className="">

                {/* --- RECENT APPLICATIONS SECTION --- */}
                <div className="">
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-xl font-semibold tracking-wide text-white">Recent Applications</h2>
                        <button className="text-sm text-gray-400 hover:text-white transition">View all</button>
                    </div>

                    {/* Table Container with Horizontal Scroll for Small Screens */}
                    <div className="bg-[#141414] border border-[#222] rounded-xl overflow-x-auto custom-scrollbar flex-1 pb-2">
                        <table className="w-full min-w-[700px] text-left border-collapse">
                            <thead>
                                <tr className="text-gray-500 text-xs font-medium uppercase tracking-wider border-b border-[#222]">
                                    <th className="py-6 px-6">Candidate Name</th>
                                    <th className="py-6 px-4">Role</th>
                                    <th className="py-6 px-4">Date Applied</th>
                                    <th className="py-6 px-4">Experience</th>
                                    <th className="py-6 px-6 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1c1c1c]">
                                {applications.map((app, index) => (
                                    <tr key={index} className="hover:bg-[#1a1a1a]/50 transition-colors">
                                        {/* Candidate Identity */}
                                        <td className="py-5 px-6 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex-shrink-0" />
                                            <span className="font-semibold text-gray-200 text-sm whitespace-nowrap">{app.name}</span>
                                        </td>
                                        {/* Role */}
                                        <td className="py-5 px-4 text-sm text-gray-400 whitespace-nowrap">
                                            {app.role}
                                        </td>
                                        {/* Date */}
                                        <td className="py-5 px-4 text-sm text-gray-400 whitespace-nowrap">
                                            {app.date}
                                        </td>
                                        {/* Experience */}
                                        <td className="py-5 px-4 text-sm text-gray-400 whitespace-nowrap">
                                            {app.experience}
                                        </td>
                                        {/* Status Badge */}
                                        <td className="py-5 px-6 text-center whitespace-nowrap">
                                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${app.statusColor} min-w-[96px]`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}