import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import JobHeader from './JobHeader';
import JobDescription from './JobDescription';
import ImportantDates from './ImportantDates';
import ContactSection from './ContactSection';
import AdditionalInfo from './AdditionalInfo';

const JobPage = () => {
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const API_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/job/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobData(response.data);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to fetch job data');
      }
    };

    fetchJob();
  }, [jobId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!jobId) setError('Job ID not found in URL');
    }, 300);

    return () => clearTimeout(timeout);
  }, [jobId]);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }
  
  if (!jobData) {
    return <div className="text-center mt-6">Loading job details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 bg-gray-100 min-h-screen">
      <JobHeader job={jobData} />
      <JobDescription job={jobData} />
      <ImportantDates job={jobData} />
      <ContactSection job={jobData} />
      <AdditionalInfo job={jobData} />
    </div>
  );
};

export default JobPage;
