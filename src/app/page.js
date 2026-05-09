'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import CVAnalysis from '@/components/CVAnalysis';
import JobDashboard from '@/components/JobDashboard';
import ApplicationTracker from '@/components/ApplicationTracker';
import CareerGuidance from '@/components/CareerGuidance';

const TABS = [
  { id: 'cv',       label: '🧬 CV Analysis',           title: 'Profile Analysis' },
  { id: 'jobs',     label: '🔍 Job Dashboard',          title: 'Germany Biotech Jobs' },
  { id: 'tracker',  label: '📋 Application Tracker',    title: 'Application Manager' },
  { id: 'guidance', label: '🎯 Career Guidance',        title: 'Strategic Guidance' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('cv');
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobStatuses, setJobStatuses] = useState({}); // { jobId: 'applied'|'interview'|'rejected'|'waiting' }

  const handleSaveJob = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      if (exists) return prev.filter((j) => j.id !== job.id);
      return [...prev, job];
    });
  };

  const handleSetStatus = (jobId, status) => {
    setJobStatuses((prev) => ({ ...prev, [jobId]: status }));
  };

  const isSaved = (jobId) => savedJobs.some((j) => j.id === jobId);

  return (
    <div className="app">
      <Header savedCount={savedJobs.length} />

      <nav className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'cv' && <CVAnalysis />}

        {activeTab === 'jobs' && (
          <JobDashboard
            savedJobs={savedJobs}
            isSaved={isSaved}
            onSaveJob={handleSaveJob}
            jobStatuses={jobStatuses}
            onSetStatus={handleSetStatus}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTracker
            savedJobs={savedJobs}
            jobStatuses={jobStatuses}
            onSetStatus={handleSetStatus}
            onGoToJobs={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'guidance' && <CareerGuidance />}
      </main>
    </div>
  );
}
