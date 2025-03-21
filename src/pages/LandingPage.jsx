import React from 'react'
import Hero from '../components/Landing/Hero'
import Roadmap from '../components/Landing/Roadmap'
import Features from '../components/Landing/Features'
import Team from '../components/Landing/Team'
import CTA from '../components/Landing/CTA'

function LandingPage() {
    return (
        <div className="bg-gray-900 text-white select-none">
            <Hero />
            <Roadmap />
            <Features />
            <Team />
            <CTA />
        </div>
    )
}

export default LandingPage