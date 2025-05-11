import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";

const JobCard = ({ job, isActive, onClick }) => {
    const getDaysRemaining = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const diffTime = end - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? `${diffDays} day${diffDays > 1 ? 's' : ''} left` : 'Deadline passed';
    };

    let parsedTags = [];
    try {
        if (Array.isArray(job.tags) && typeof job.tags[0] === 'string' && job.tags[0].startsWith('[')) {
            parsedTags = JSON.parse(job.tags[0]);
        } else if (Array.isArray(job.tags)) {
            parsedTags = job.tags;
        }
    } catch (error) {
        console.error('Error parsing tags:', error);
        parsedTags = [];
    }

    return (
        <li
            onClick={onClick}
            className={`flex flex-col gap-2 p-4 border-l rounded-lg shadow-sm cursor-pointer transition-all bg-white relative ${isActive ? 'border-l-4 border-blue-600' : 'border-l-[4px] border-transparent hover:border-blue-200'
                }`}
        >
            <div className="flex gap-4 items-start">
                <img
                    src={`http://localhost:5000${job.companyLogo}`}
                    alt="logo"
                    className="w-10 h-10 rounded object-contain"
                />
                <div className="flex flex-col">
                    <h3
                        className={`font-semibold text-base ${isActive ? 'text-blue-600' : 'text-gray-900'
                            }`}
                    >
                        {job.jobName}
                    </h3>
                    <span className="text-sm text-gray-500">{job.companyName}</span>
                </div>
            </div>

            <div className="flex gap-6 text-sm text-gray-600 mt-1 ml-14">
                <div className="flex items-center gap-1">
                    <FaLocationDot className="text-gray-500 text-xs" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FaClock className="text-gray-500 text-xs" />
                    <span>{getDaysRemaining(job.deadline)}</span>
                </div>
            </div>

            <div className="flex gap-2 ml-14 mt-2 flex-wrap">
                {parsedTags.slice(0, 2).map((tag, idx) => (
                    <span
                        key={idx}
                        className="text-xs border px-2 py-0.5 rounded-full text-gray-700 bg-white"
                    >
                        {tag}
                    </span>
                ))}
                {parsedTags.length > 2 && (
                    <span className="text-xs border px-2 py-0.5 rounded-full text-gray-500 bg-white">
                        +{parsedTags.length - 2} more
                    </span>
                )}

            </div>
        </li>
    );
};

const JobList = ({ jobs }) => {
    const [activeJobId, setActiveJobId] = useState(null);
    const navigate = useNavigate();

    const handleJobClick = (jobId) => {
        setActiveJobId(jobId);
        navigate(`?jobId=${jobId}`);
    };

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const jobIdFromUrl = searchParams.get('jobId');
        if (jobIdFromUrl) {
            if (jobIdFromUrl !== activeJobId) {
                setActiveJobId(jobIdFromUrl);
            }
        } else if (jobs.length > 0) {
            const firstJobId = jobs[0]._id;
            setActiveJobId(firstJobId);
            navigate(`?jobId=${firstJobId}`, { replace: true });
        }
    }, [searchParams, jobs, navigate]);   

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <ul className="space-y-4">
                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        isActive={job._id === activeJobId}
                        onClick={() => handleJobClick(job._id)}
                    />
                ))}
            </ul>
        </div>
    );
};
export default JobList;
