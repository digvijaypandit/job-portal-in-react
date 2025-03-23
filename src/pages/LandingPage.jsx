import React from 'react'
import Hero from '../components/Landing/Hero'
import Roadmap from '../components/Landing/Roadmap'
import Features from '../components/Landing/Features'
import Team from '../components/Landing/Team'
import Footer from '../components/footer'
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
            <Team />
            <Footer />
        </div>
    )
}

export default LandingPage