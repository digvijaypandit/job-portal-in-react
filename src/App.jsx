import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Pages & Components
import LandingPage from "./pages/LandingPage";
import Jobs from "./pages/Jobs";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import ProtectedRoute from "./feature/ProtectedRoute";
import NotFound from "./feature/NotFound";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import ApplicantHome from "./pages/ApplicantHome";
import JobPage from "./pages/JobPage";
import About from "./components/comman/About";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import ApplicantProfile from "./pages/ApplicantProfile";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJobForm from "./pages/PostJobPage";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerHome from "./pages/EmployerHome";
import RegistrationPage from "./components/auth/Registration";

// Page Transition Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// Animated Route Wrapper
const AnimatedPage = ({ children }) => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/home" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><RegistrationPage /></AnimatedPage>} />
        <Route path="/register-employer" element={<AnimatedPage><Registration /></AnimatedPage>} />
        <Route path="/register-applicant" element={<AnimatedPage><Registration /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/jobs" element={<AnimatedPage><Jobs /></AnimatedPage>} />

        {/* Applicant Routes */}

        <Route element={<ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]} />}>
          <Route path="/applicant/home" element={<ApplicantHome />} />
          <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
          <Route path="/applicant/saved-jobs" element={<SavedJobs />} />
          <Route path="/applicant/jobs" element={<JobPage />} />
          <Route path="/applicant/applied-jobs" element={<AppliedJobs />} />
          <Route path="/applicant/profile" element={<ApplicantProfile />} />
        </Route>

        {/* Protected Employer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_EMPLOYER"]} />}>
          <Route path="/employer/home" element={<EmployerHome />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/post-job" element={<PostJobForm />} />
          <Route path="/employer/manage-jobs" element={<ManageJobs />} />
          <Route path="/employer/edit-job" element={<EditJob />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
        </Route>

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
