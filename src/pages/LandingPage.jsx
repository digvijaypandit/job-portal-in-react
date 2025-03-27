import React from 'react'
import Hero from '../components/Landing/Hero'
import Roadmap from '../components/Landing/Roadmap'
import Features from '../components/Landing/Features'
import Footer from '../components/comman/footer'
import Jobs from '../components/Landing/Jobs'
import AboutUs from '../components/Landing/AboutUs'

function LandingPage() {
    return (
        <div className="bg-gray-900 text-white select-none">
            <Hero />
            <Jobs />
            <Features />
            <Roadmap />
            <AboutUs />
            <Footer />
        </div>
    )
}

export default LandingPage