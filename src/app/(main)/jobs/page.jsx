import JobsListContainer from '@/components/jobs/JobsListContainer';
import { getJobs } from '@/lib/api/jobs';

const JobsPage = async () => {
    const jobs = await getJobs();

    return (
        <div className='bg-[#010103] min-h-screen'>
            <div className='w-10/12 mx-auto py-20'>

                <div className='text-white mb-10'>
                    <h2 className='text-5xl font-bold mb-2'>Open Positions</h2>
                    <p className='text-gray-400'>Ready for an interview and discover your next engineering challenge</p>
                </div>

                <JobsListContainer initialJobs={jobs} />

            </div>
        </div>
    );
};

export default JobsPage;