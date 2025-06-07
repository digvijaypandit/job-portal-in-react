import React, { useEffect, useState } from 'react';
import Navbar from '../components/comman/Navbar';
import JobSearchBox from '../components/applicant/JobSearchBox';
import JobRecommendations from '../components/applicant/JobRecommendations';
import ResourcesSection from '../components/applicant/ResourcesSection';
import Footer from '../components/comman/footer';
import { Typewriter } from 'react-simple-typewriter';
import JobCategory from '../components/job/JobCategory';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplicantHome() {
  const navigate = useNavigate();

  const [profileError, setProfileError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchApplicantProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const profile = res.data;
      // Check required fields
      if (!profile.userId?.firstName || !profile.userId?.lastName || !profile.resume || !profile.skills?.length) {
        setProfileError(true);
        toast.warning('Your profile is incomplete. Please complete it to explore jobs.');
      }

    } catch (err) {
      setProfileError(true);
      toast.error('Failed to fetch profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Profile Incomplete</h2>
          <p className="text-gray-700 mb-6">Please complete your profile to continue exploring jobs and opportunities.</p>
          <button
            onClick={() => navigate('/applicant/profile')}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Complete Profile
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
          {/* Left Side - Text and Search */}
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
              <Typewriter
                words={['Unlock Ambition', 'Find Your Dream Job', 'Explore Great Companies']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h1>
            <p className="text-md sm:text-lg text-gray-600 mb-6">
              Apply to a plethora of hiring opportunities & work with your dream companies!
            </p>
            <JobSearchBox />
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-[45%]">
            <img
              src="https://d8it4huxumps7.cloudfront.net/uploads/images/67c821501ca0d_jobs_header_img.png?d=1000x600"
              alt="Jobs Banner"
              className="w-full max-w-[500px] mx-auto lg:mx-0"
            />
          </div>
        </div>

        {/* Job Recommendations */}
        <div className="mt-16 mb-2">
          <JobRecommendations />
        </div>
        <JobCategory />
        <ResourcesSection />
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ApplicantHome;
