import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/auth/Login";
import ApplicantRegistration from "./components/auth/ApplicantRegistration"
import EmployerRegistration from "./components/auth/EmployerRegistration"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-employer" element={<ApplicantRegistration />} />
        <Route path="/register-applicant" element={<EmployerRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
