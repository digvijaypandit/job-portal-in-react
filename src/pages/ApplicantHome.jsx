import React from 'react'
import Navbar from '../components/comman/Navbar'
import JobSearchBox from '../components/applicant/JobSearchBox'
import JobRecommendations from '../components/applicant/JobRecommendations'
import ResourcesSection from '../components/applicant/ResourcesSection'
import Footer from '../components/comman/footer'
import { Typewriter } from "react-simple-typewriter";

function ApplicantHome() {

  const jobData = [
    {
      job_title: "Front End Developer",
      company: "Tech4nexgen Business Solutions",
      location: "In Office",
      applied: 8250,
      time_left: "9 months left",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png", // Replace with actual logo URL
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
      <div className="mt-20">
        <JobSearchBox />
        <div className='px-8 mt-8'>
          <JobRecommendations jobs={jobData} />
        </div>
        <ResourcesSection />
        <Footer />
      </div>
    </div>
  )
}

export default ApplicantHome