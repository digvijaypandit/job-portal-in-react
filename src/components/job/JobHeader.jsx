import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import JobApplyModal from './JobApplyModal';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaClock,
} from 'react-icons/fa';
import { BsCalendarEvent } from "react-icons/bs";
import { CiBookmarkCheck, CiBookmark } from "react-icons/ci";

const JobHeader = ({ job }) => {
  const [jobStatus, setJobStatus] = useState({
    isSaved: false,
    hasApplied: false,
  });
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !job?._id) return;

    let isMounted = true;

    const fetchJobStatus = async () => {
      try {
        const [savedRes, appliedRes] = await Promise.all([
          axios.get(`${API_URL}/savedJob/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/application/user/applied`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const savedIds = savedRes.data
          .filter(item => item.job !== null)
          .map(item => item.job._id);

        const appliedIds = appliedRes.data
          .filter(app => app.job !== null)
          .map(app => app.job._id);

        if (isMounted) {
          setJobStatus({
            isSaved: savedIds.includes(job._id),
            hasApplied: appliedIds.includes(job._id),
          });
        }
      } catch (err) {
        console.error('Error fetching job status:', err.response?.data || err.message);
      }
    };

    fetchJobStatus();

    return () => {
      isMounted = false;
    };
  }, [job._id, token]);

  const toggleSaveJob = useCallback(async () => {
    if (!token) {
      toast.error('You must be logged in to save jobs.');
      return;
    }

    const url = jobStatus.isSaved
      ? `${API_URL}/savedJob/remove`
      : `${API_URL}/savedJob/save`;

    try {
      await axios.post(url, { jobId: job._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setJobStatus(prev => ({
        ...prev,
        isSaved: !prev.isSaved,
      }));

      toast.success(jobStatus.isSaved
        ? 'Job removed from saved!'
        : 'Job saved successfully!');
    } catch (err) {
      console.error('Save job error:', err.response?.data || err.message);
      toast.error('Something went wrong. Try again later.');
    }
  }, [job._id, jobStatus.isSaved, token]);

  const getDaysRemaining = useMemo(() => {
    const now = new Date();
    const end = new Date(job.deadline);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} day${diffDays > 1 ? 's' : ''} left` : 'Deadline passed';
  }, [job.deadline]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? 'Invalid date'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-4">
          <img
            src={`${import.meta.env.VITE_BASE_IMAGE_URL}/${job.companyLogo?.replace(/^\/+/, '')}`}
            alt="Company Logo"
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">{job.jobName}</h2>
            <p className="text-sm text-gray-500">{job.companyName}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-blue-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <BsCalendarEvent className="text-blue-500" />
                <strong>Updated:</strong> {formatDate(job.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start md:items-end">
          {jobStatus.hasApplied ? (
            <button
              disabled
              className="bg-gray-400 text-white px-5 py-2.5 rounded-lg cursor-not-allowed"
            >
              Applied
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-5 py-2.5 cursor-pointer rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsApplyModalOpen(true)}
            >
              Quick Apply
            </button>
          )}
          <JobApplyModal
            isOpen={isApplyModalOpen}
            onRequestClose={() => setIsApplyModalOpen(false)}
            jobId={job._id}
          />
          <button
            onClick={toggleSaveJob}
            className="flex items-center gap-2 text-sm font-medium cursor-pointer text-blue-600 bg-blue-100 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
          >
            {jobStatus.isSaved ? (
              <>
                <CiBookmarkCheck className="text-blue-500 text-lg" />
                Remove Job
              </>
            ) : (
              <>
                <CiBookmark className="text-blue-500 text-lg" />
                Save Job
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
          <FaUserFriends className="text-blue-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Applied</p>
            <p className="text-lg font-semibold text-gray-800">{job.applicantCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
          <FaClock className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Application Deadline</p>
            <p className="text-lg font-semibold text-gray-800">
              {getDaysRemaining}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
