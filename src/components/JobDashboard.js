'use client';
import { useState, useEffect, useCallback } from 'react';
import JobCard from './JobCard';
import { sampleJobs } from '@/data/sampleJobs';
import { scoreJob } from '@/data/scoring';

const CITIES = ['All Cities', 'Berlin', 'Munich', 'Hamburg', 'Frankfurt am Main', 'Darmstadt', 'Hilden', 'Kiel', 'Düsseldorf', 'Göttingen'];
const WORK_TYPES = ['All Types', 'On-site', 'Hybrid', 'Remote'];
const SORT_OPTIONS = ['Priority Score', 'CV Match', 'Company Name', 'City'];
const CATEGORY_FILTERS = ['All', 'dream', 'high-priority', 'fast-apply', 'saved', 'monitor'];

// Pre-score all sample jobs
const scoredSampleJobs = sampleJobs.map(scoreJob);

export default function JobDashboard({ savedJobs, isSaved, onSaveJob, jobStatuses, onSetStatus }) {
  const [jobs, setJobs] = useState(scoredSampleJobs);
  const [apifyJobs, setApifyJobs] = useState([]);
  const [apifyStatus, setApifyStatus] = useState('idle'); // idle | loading | done | error | no-token
  const [apifyError, setApifyError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [apifyQuery, setApifyQuery] = useState('');
  const [filterCity, setFilterCity] = useState('All Cities');
  const [filterWork, setFilterWork] = useState('All Types');
  const [filterCategory, setFilterCategory] = useState('All');
  const [minMatch, setMinMatch] = useState(0);
  const [sortBy, setSortBy] = useState('Priority Score');
  const [showApify, setShowApify] = useState(false);

  // Merge sample + apify jobs (deduplicated)
  const allJobs = [
    ...jobs,
    ...apifyJobs.filter(
      (aj) => !jobs.some((j) => j.title?.toLowerCase() === aj.title?.toLowerCase() && j.company?.toLowerCase() === aj.company?.toLowerCase())
    ),
  ];

  // Apply filters
  const filtered = allJobs
    .filter((j) => {
      if (filterCity !== 'All Cities' && j.city !== filterCity) return false;
      if (filterWork !== 'All Types' && j.workType !== filterWork) return false;
      if (filterCategory !== 'All' && j.category !== filterCategory) return false;
      if ((j.scores?.cvMatch ?? 0) < minMatch) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!(`${j.title} ${j.company} ${j.city} ${j.industry}`).toLowerCase().includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Priority Score') return (b.scores?.priorityScore ?? 0) - (a.scores?.priorityScore ?? 0);
      if (sortBy === 'CV Match')       return (b.scores?.cvMatch ?? 0) - (a.scores?.cvMatch ?? 0);
      if (sortBy === 'Company Name')   return a.company.localeCompare(b.company);
      if (sortBy === 'City')           return a.city.localeCompare(b.city);
      return 0;
    });

  const excellentCount = allJobs.filter((j) => (j.scores?.cvMatch ?? 0) >= 75).length;
  const moderateCount  = allJobs.filter((j) => { const s = j.scores?.cvMatch ?? 0; return s >= 55 && s < 75; }).length;
  const weakCount      = allJobs.filter((j) => (j.scores?.cvMatch ?? 0) < 55).length;

  // Apify live scrape
  const runApifyScrape = useCallback(async () => {
    setApifyStatus('loading');
    setApifyError('');
    try {
      const params = apifyQuery ? `?query=${encodeURIComponent(apifyQuery)}&location=Germany` : '';
      const res = await fetch(`/api/jobs${params}`);
      const data = await res.json();

      if (data.source === 'no-token') {
        setApifyStatus('no-token');
        return;
      }
      if (data.error && !data.jobs?.length) {
        setApifyStatus('error');
        setApifyError(data.error);
        return;
      }

      const scoredApify = (data.jobs || []).map(scoreJob);
      setApifyJobs(scoredApify);
      setApifyStatus('done');
    } catch (err) {
      setApifyStatus('error');
      setApifyError(err.message);
    }
  }, [apifyQuery]);

  return (
    <div>
      {/* ---- Stats Row ---- */}
      <div className="section-header">
        <h2 className="section-title">Germany Biotech Jobs</h2>
        <span className="section-count">{allJobs.length} opportunities found</span>
      </div>

      <div className="grid-4" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-value">{allJobs.length}</div>
          <div className="stat-label">Total Jobs</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(16,185,129,0.3)' }}>
          <div className="stat-value" style={{ background: 'none', WebkitTextFillColor: 'var(--green)', color: 'var(--green)' }}>
            {excellentCount}
          </div>
          <div className="stat-label">🟢 Excellent Matches</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(245,158,11,0.3)' }}>
          <div className="stat-value" style={{ background: 'none', WebkitTextFillColor: 'var(--amber)', color: 'var(--amber)' }}>
            {moderateCount}
          </div>
          <div className="stat-label">🟡 Moderate Matches</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
          <div className="stat-value" style={{ background: 'none', WebkitTextFillColor: 'var(--red)', color: 'var(--red)' }}>
            {weakCount}
          </div>
          <div className="stat-label">🔴 Weak Matches</div>
        </div>
      </div>

      {/* ---- Apify Live Search Panel ---- */}
      <div className="apify-panel">
        <div style={{ flex: 1 }}>
          <div className="apify-badge">⚡ APIFY LIVE SCRAPER</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Search real-time jobs from LinkedIn · Germany · Requires Apify token in .env.local
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
          <input
            className="filter-input"
            placeholder="e.g. embryologist IVF Germany"
            value={apifyQuery}
            onChange={(e) => setApifyQuery(e.target.value)}
            style={{ minWidth: '200px', flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={runApifyScrape}
            disabled={apifyStatus === 'loading'}
            id="btn-scrape-jobs"
          >
            {apifyStatus === 'loading' ? '⏳ Scraping…' : '🔍 Scrape Live Jobs'}
          </button>
        </div>

        {apifyStatus === 'done' && (
          <span className="badge badge-green">✅ {apifyJobs.length} live jobs added</span>
        )}
        {apifyStatus === 'no-token' && (
          <span className="badge badge-amber">⚠️ Add APIFY_TOKEN to .env.local</span>
        )}
        {apifyStatus === 'error' && (
          <span className="badge badge-red" title={apifyError}>❌ Scrape Failed</span>
        )}
      </div>

      {/* ---- Filter Bar ---- */}
      <div className="filter-bar">
        <input
          id="job-search"
          className="filter-input"
          placeholder="🔍 Search by title, company, city, industry…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select id="filter-city" className="filter-select" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select id="filter-work" className="filter-select" value={filterWork} onChange={(e) => setFilterWork(e.target.value)}>
          {WORK_TYPES.map((w) => <option key={w}>{w}</option>)}
        </select>
        <select id="filter-category" className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {CATEGORY_FILTERS.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>
        <select id="sort-jobs" className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <span>Min Match:</span>
          <input
            type="range" min="0" max="100" step="5"
            value={minMatch}
            onChange={(e) => setMinMatch(+e.target.value)}
            style={{ accentColor: 'var(--cyan)', width: '80px' }}
          />
          <span style={{ color: 'var(--cyan)', fontWeight: 700, minWidth: '36px' }}>{minMatch}%</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> results
        </span>
      </div>

      {/* ---- Category Tabs ---- */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {[
          { key: 'All',           icon: '🌐', label: 'All' },
          { key: 'high-priority', icon: '🔥', label: 'High Priority' },
          { key: 'dream',         icon: '💫', label: 'Dream' },
          { key: 'fast-apply',    icon: '⚡', label: 'Fast Apply' },
          { key: 'monitor',       icon: '👁', label: 'Monitor' },
          { key: 'saved',         icon: '⭐', label: 'Saved' },
        ].map(({ key, icon, label }) => (
          <button
            key={key}
            className={`btn btn-sm ${filterCategory === key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilterCategory(key)}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* ---- Job Grid ---- */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔬</div>
          <div className="empty-state-text">No jobs match your filters</div>
          <div className="empty-state-sub">Try adjusting your search criteria or lowering the minimum match %</div>
        </div>
      ) : (
        <div className="grid-2">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onSave={onSaveJob}
              status={jobStatuses[job.id]}
              onSetStatus={onSetStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
