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
        <Route path="/Home" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><RegistrationPage /></AnimatedPage>} />
        <Route path="/register-employer" element={<AnimatedPage><Registration /></AnimatedPage>} />
        <Route path="/register-applicant" element={<AnimatedPage><Registration /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/jobs" element={<AnimatedPage><Jobs /></AnimatedPage>} />

        {/* Applicant Routes */}
        <Route path="/applicant/home" element={<AnimatedPage><ApplicantHome /></AnimatedPage>} />
        <Route path="/applicant/dashboard" element={<AnimatedPage><ApplicantDashboard /></AnimatedPage>} />
        <Route path="/applicant/saved-jobs" element={<AnimatedPage><SavedJobs /></AnimatedPage>} />
        <Route path="/applicant/jobs" element={<AnimatedPage><JobPage /></AnimatedPage>} />
        <Route path="/applicant/applied-jobs" element={<AnimatedPage><AppliedJobs /></AnimatedPage>} />
        <Route path="/applicant/profile" element={<AnimatedPage><ApplicantProfile /></AnimatedPage>} />

        {/* Protected Employer Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/employer/home" element={<AnimatedPage><EmployerHome /></AnimatedPage>} />
          <Route path="/employer/dashboard" element={<AnimatedPage><EmployerDashboard /></AnimatedPage>} />
          <Route path="/employer/post-job" element={<AnimatedPage><PostJobForm /></AnimatedPage>} />
          <Route path="/employer/manage-jobs" element={<AnimatedPage><ManageJobs /></AnimatedPage>} />
          <Route path="/employer/edit-job" element={<AnimatedPage><EditJob /></AnimatedPage>} />
          <Route path="/employer/profile" element={<AnimatedPage><EmployerProfile /></AnimatedPage>} />
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
