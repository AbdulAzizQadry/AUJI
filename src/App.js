import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import JobApplicationResult from './components/JobApplicationResult';
import CommunityInnerPage from './components/CommunityInnerPage';
import AUJIDashboard from './components/AUJIDashboard';
import SimilarJobs from './components/SimilarJobs';
import CoursesPage from './components/CoursesPage';
import CVAnalyzer from './components/CVAnalyzer';
import SmartApply from './components/SmartApply';
import CVBuilder from './components/CVBuilder';
import Community from './components/Community';
import Register from './components/Register';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true
    });
  }, []);

  return (
    <div className="font-montaser bg-[#f8f9fc]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/community/topic" element={<CommunityInnerPage />} />
          <Route path="/job-result" element={<JobApplicationResult />} />
          <Route path="/similar-jobs" element={<SimilarJobs />} />
          <Route path="/dashboard" element={<AUJIDashboard />} />
          <Route path="/cv-analyzer" element={<CVAnalyzer />} />
          <Route path="/smart-apply" element={<SmartApply />} />
          <Route path="/cv-builder" element={<CVBuilder />} />
          <Route path="/community" element={<Community />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
