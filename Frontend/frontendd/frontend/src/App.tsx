import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Quiz from './pages/Quiz';
import Roadmap from './pages/Roadmap';
import Jobs from './components/Jobs';
import FindJobs from './components/FindJobs';
import SkillRating from './pages/SkillRating';
import PersonalisedRoadmap from './pages/PersonalisedRoadmap.';
import ResumeReview from './pages/ResumeResult';
import ResumeGenerator from './pages/generateResume';
import Resume from './pages/Resume';
import CareerPage from './pages/Career';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path={'/findJobs'} element={<FindJobs />} />
          <Route path={'/careers'} element={<CareerPage />} />
          <Route path={'/PersonalisedRoadmap'} element={<PersonalisedRoadmap />} />
          <Route path={'/resumereview'} element={<ResumeReview />} />
          <Route path={'/generateResume'} element={<ResumeGenerator />} />
          <Route path={'/resume'} element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;