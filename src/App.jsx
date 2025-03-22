import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/auth/Login";
import ApplicantRegistration from "./components/auth/ApplicantRegistration"
import EmployerRegistration from "./components/auth/EmployerRegistration"
import ProtectedRoute from "./feature/ProtectedRoute"
import NotFound from "./feature/NotFound"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-employer" element={<ApplicantRegistration />} />
        <Route path="/register-applicant" element={<EmployerRegistration />} />

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
