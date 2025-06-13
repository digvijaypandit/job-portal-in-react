# Job Portal Frontend

A responsive frontend for the Job Portal application, built with React. It allows job seekers to browse and apply for jobs, and employers to post and manage job listings. Includes AI-powered features like mock interviews, quizzes, aptitude practice, and mentorship.

---

## Related Repositories
- **Backend**: [Job Portal Backend](https://github.com/digvijaypandit/job-portal-Backend)

---

## Table of Contents
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Available Scripts](#available-scripts)  
- [Tech Stack](#tech-stack)  
- [AI Features](#ai-features)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features
- User Registration & Login (with JWT)
- Browse job listings
- Employers can post, edit, delete jobs
- Resume upload and application tracking
- Responsive design (mobile-friendly)
- Integration with backend APIs
- **AI-Powered Tools**:
  - Mock interviews (text-based)
  - Aptitude test practice
  - Technical quizzes
  - Personalized learning roadmaps
  - Career mentorship

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/digvijaypandit/job-portal-Frontend.git
cd job-portal-Frontend
```
## Install Dependencies
npm install

## Configure Environment
Create a .env file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GEMINI_FEATURES=true
```
Replace http://localhost:5000 with your actual backend URL if deployed.

---
# Start the Development Server
```
npm run dev
```
---
###  Tech Stack
- React
- React Router
- Axios
- Context API or Redux (if used)
- Tailwind CSS or Bootstrap (optional)
- Formik + Yup for forms
- SweetAlert / Toastify for notifications
- Integration with Gemini AI API via backend

---
AI Features
These tools are available in the AI Assistant section of the UI:
 - Mock Interview: Text-based simulated interviews
 - Aptitude Practice: General aptitude question generator
 - Technical Quiz: Choose skill/topic and take MCQs
 - Learning Roadmap: Get a custom skill-building path
 - Career Mentorship: Chat-like mentorship guidance powered by AI

## Contributing
- Fork the repository
- Create a new branch: git checkout -b feature/your-feature
- Make your changes and commit: git commit -m "Add feature"
- Push to your branch: git push origin feature/your-feature
- Open a pull request

## License
This project is licensed under the MIT License.
