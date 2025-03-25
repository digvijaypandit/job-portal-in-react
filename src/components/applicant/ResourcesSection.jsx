import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const resources = [
  {
    name: 'Practice Aptitude Tests',
    description: 'Sharpen your problem-solving skills',
    image: '/images/aptitude.png',
    link: '/aptitude-tests',
    bgColor: 'bg-blue-200',
  },
  {
    name: 'Mock Interviews',
    description: 'Prepare for real job interviews',
    image: '/images/interview.png',
    link: '/mock-interviews',
    bgColor: 'bg-green-200',
  },
  {
    name: 'ATS Score Checker',
    description: 'Optimize your resume for ATS systems',
    image: '/images/ats.png',
    link: '/ats-checker',
    bgColor: 'bg-purple-200',
  },
  {
    name: 'Quizzes',
    description: 'Test your knowledge with interactive quizzes and boost your learning',
    image: '/images/quiz.png',
    link: '/ats-checker',
    bgColor: 'bg-[#ffc191]',
  },
  {
    name: 'Learning Roadmaps',
    description: 'Guided paths to master your skills',
    image: '/images/roadmap.png',
    link: '/learning-roadmaps',
    bgColor: 'bg-yellow-200',
  },
  {
    name: 'AI-Powered Mentorships',
    description: 'Get personalized career guidance and skill-building tips from AI mentors',
    image: '/images/mentorships.png',
    link: '/learning-roadmaps',
    bgColor: 'bg-[#ffb0cc]',
  }
];

const ResourcesSection = () => {
  return (
    <div>
      <div className="my-20 flex flex-wrap justify-center gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -5 }} // Lift up & scale effect
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Link to={resource.link} className="block">
              <div
                className={`relative flex items-center p-6 rounded-2xl shadow-lg w-96 h-40 overflow-hidden transition-all ${resource.bgColor}`}
              >
                {/* Text Content */}
                <div className="z-10">
                  <h3 className="text-xl font-semibold text-gray-900">{resource.name}</h3>
                  <p className="text-gray-700 text-sm max-w-60">{resource.description}</p>
                </div>

                {/* Background Image */}
                <img
                  src={resource.image}
                  alt={resource.name}
                  className="absolute right-4 h-24 object-cover"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
