import React from 'react'
import JobCategories from '../components/Landing/JobCategories'
import Features from '../components/Landing/Features'
import Footer from '../components/comman/footer'
import Jobs from '../components/Landing/Jobs'
import AboutUs from '../components/Landing/AboutUs'
import Home from '../components/Landing/Home'

function LandingPage() {
    return (
        <div className="select-none">
            <Home />
            <Jobs />
            <JobCategories />
            <Features />
            <AboutUs />
            <Footer />
        </div>
    )
}

export default LandingPage