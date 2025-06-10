import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from 'react-dom';

// Pages & Components
import LandingPage from "./pages/LandingPage";
import Jobs from "./pages/Jobs";
import Login from "./components/auth/Login";
import ProtectedRoute from "./feature/ProtectedRoute";
import NotFound from "./feature/NotFound";
import ApplicantHome from "./pages/ApplicantHome";
import JobPage from "./pages/JobPage";
import About from "./components/comman/About";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import ApplicantProfile from "./pages/ApplicantProfile";
import PostJobForm from "./pages/PostJobPage";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerHome from "./pages/EmployerHome";
import RegistrationPage from "./components/auth/Registration";
import Unauthorized from "./feature/Unauthorized";
import EditJobForm from "./pages/EditJobFrom";
import MockInterviewHome from "./pages/MockInterviewHome";
import InterviewForm from "./components/AI features/Mock Interview/InterviewForm";
import InterviewPage from "./pages/InterviewPage";
import AptitudeHome from "./pages/AptitudeHome";
import AptitudeForm from "./components/AI features/Aptitude Test/AptitudeForm";
import AptitudeTestPage from "./pages/AptitudeTestPage";
import ResourcesSection from "./components/applicant/ResourcesSection";
import MentorshipPage from "./pages/MentorshipPage";
import MindMap from "./pages/MindMap";
import QuizHomePage from "./pages/QuizHomePage";
import QuizPage from "./pages/QuizPage";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><RegistrationPage /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/jobs" element={<AnimatedPage><Jobs /></AnimatedPage>} />

        {/* Applicant Routes */}

        <Route element={<ProtectedRoute allowedRoles={["Applicant"]} />}>
          <Route path="/applicant/home" element={<ApplicantHome />} />
          <Route path="/applicant/saved-jobs" element={<SavedJobs />} />
          <Route path="/applicant/jobs" element={<JobPage />} />
          <Route path="/applicant/applied-jobs" element={<AppliedJobs />} />
          <Route path="/applicant/profile" element={<ApplicantProfile />} />
          <Route path="/applicant/mockInterview-home" element={<MockInterviewHome />} />
          <Route path="/applicant/interview-form" element={<InterviewForm />} />
          <Route path="/applicant/interview-page" element={<InterviewPage />} />
          <Route path="/applicant/aptitude-home" element={<AptitudeHome />} />
          <Route path="/applicant/aptitude-form" element={<AptitudeForm />} />
          <Route path="/applicant/aptitude-page" element={<AptitudeTestPage />} />
          <Route path="/applicant/mentorship" element={<MentorshipPage />} />
          <Route path="/learning-roadmaps" element={<MindMap />} />
          <Route path="/applicant/quizzes" element={<QuizHomePage />} />
          <Route path="/applicant/quiz/global" element={<QuizPage />} />
          <Route path="/applicant/quiz/skill" element={<QuizPage />} />
          <Route path="/applicant/ai-features" element={<ResourcesSection />} />
        </Route>

        {/* Protected Employer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["Employer"]} />}>
          <Route path="/employer/home" element={<EmployerHome />} />
          <Route path="/employer/post-job" element={<PostJobForm />} />
          <Route path="/employer/applications" element={<ViewApplications />} />
          <Route path="/employer/manage-jobs" element={<ManageJobs />} />
          <Route path="/employer/manage-jobs/edit/:id" element={<EditJobForm />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 Not Found Page */}
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App Component
export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
