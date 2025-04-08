import React from 'react'
import Navbar from '../components/comman/Navbar'
import JobSearchBox from '../components/applicant/JobSearchBox'
import JobRecommendations from '../components/applicant/JobRecommendations'
import ResourcesSection from '../components/applicant/ResourcesSection'
import Footer from '../components/comman/footer'
import { Typewriter } from 'react-simple-typewriter'

function ApplicantHome() {
  const jobData = [
    {
      job_title: "Front End Developer",
      company: "Tech4nexgen Business Solutions",
      location: "In Office",
      applied: 8250,
      time_left: "9 months left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "React Developer",
      company: "Unnanu Enterprise AI Search",
      location: "In Office",
      applied: 442,
      time_left: "2 days left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "Frontend Developer",
      company: "Unnanu Enterprise AI Search",
      location: "In Office",
      applied: 1024,
      time_left: "23 hours left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "Fullstack Developer",
      company: "Altair",
      location: "In Office",
      applied: "4,431 Views",
      time_left: "5 days left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "UI/UX Designer",
      company: "DesignCorp",
      location: "Remote",
      applied: 567,
      time_left: "14 days left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "Backend Developer",
      company: "CloudSoft Solutions",
      location: "Hybrid",
      applied: 980,
      time_left: "1 month left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "Data Scientist",
      company: "AI Analytics Hub",
      location: "Remote",
      applied: 230,
      time_left: "10 days left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      job_title: "DevOps Engineer",
      company: "NextGen Technologies",
      location: "In Office",
      applied: 345,
      time_left: "3 weeks left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
  ];

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
        <div className="mt-16">
          <JobRecommendations jobs={jobData} />
        </div>

        <ResourcesSection />
      </div>
      <Footer />
    </div>
  );
}

export default ApplicantHome;
