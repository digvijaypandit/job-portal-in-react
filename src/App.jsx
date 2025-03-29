import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Jobs from "./pages/Jobs";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration"
import ProtectedRoute from "./feature/ProtectedRoute"
import NotFound from "./feature/NotFound"
import ApplicantDashboard from "./pages/ApplicantDashboard";
import ApplicantHome from "./pages/ApplicantHome";
import JobPage from "./pages/JobPage";
import About from "./components/comman/About";
import Contact from "./components/comman/Contact";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import ApplicantProfile from "./pages/ApplicantProfile";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJobForm from "./pages/PostJobPage";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerHome from "./pages/EmployerHome";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-employer" element={<Registration />} />
        <Route path="/register-applicant" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />

          <Route path="/applicant/home" element={<ApplicantHome />} />
          <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
          <Route path="/applicant/saved-jobs" element={<SavedJobs />} />
          <Route path="/applicant/jobs" element={<JobPage />} />
          <Route path="/applicant/applied-jobs" element={<AppliedJobs />} />
          <Route path="/applicant/profile" element={<ApplicantProfile />} />
        {/* Protected Routes (Require Authentication) */}
        <Route element={<ProtectedRoute />}>
        </Route>
        <Route path="/employer/home" element={<EmployerHome />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/post-job" element={<PostJobForm />} />
        <Route path="/employer/manage-jobs" element={<ManageJobs />} />
        <Route path="/employer/edit-job" element={<EditJob />} />
        <Route path="/employer/profile" element={<EmployerProfile />} />

        {/* Catch-all Route (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
