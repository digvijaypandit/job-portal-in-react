import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration"
import ProtectedRoute from "./feature/ProtectedRoute"
import NotFound from "./feature/NotFound"
import ApplicantDashboard from "./pages/ApplicantDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-employer" element={<Registration />} />
        <Route path="/register-applicant" element={<Registration />} />

        {/* Protected Routes (Require Authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<ApplicantDashboard />} />
        </Route>

        {/* Catch-all Route (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
