import JobCard from '@/components/jobs/JobsCard';
import { getJobs } from '@/lib/api/jobs';

const JobsPage = async () => {
    const jobs = await getJobs();

    return (
        <div className='bg-[#010103]'>
            <div className='w-10/12 mx-auto py-20'>
                <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-10'>
                    {jobs.map((job) => (
                        <JobCard
                            key={job._id}
                            job={job}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;