import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration"
import ProtectedRoute from "./feature/ProtectedRoute"
import NotFound from "./feature/NotFound"
import ApplicantDashboard from "./pages/ApplicantHome";
import JobPage from "./pages/JobPage";
import About from "./components/comman/About";
import Contact from "./components/comman/Contact";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-employer" element={<Registration />} />
        <Route path="/register-applicant" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

          <Route path="/applicant/home" element={<ApplicantDashboard />} />
          <Route path="/applicant/jobs" element={<JobPage />} />
        {/* Protected Routes (Require Authentication) */}
        <Route element={<ProtectedRoute />}>
        </Route>

        {/* Catch-all Route (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
