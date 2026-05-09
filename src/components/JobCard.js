'use client';
import { useState } from 'react';
import { ScoreGrid } from './ScoreBar';
import { getMatchLabel, getSalaryEstimate } from '@/data/scoring';

const COMPETITION_COLORS = {
  Low: 'var(--green)',
  Medium: 'var(--amber)',
  High: 'var(--red)',
};

export default function JobCard({ job, isSaved, onSave, status, onSetStatus }) {
  const [expanded, setExpanded] = useState(false);
  const scores = job.scores || {};
  const cvMatch = scores.cvMatch ?? 0;
  const { label: matchLabel, color: matchColor } = getMatchLabel(cvMatch);
  const salaryEstimate = getSalaryEstimate(job);
  const priorityScore = scores.priorityScore ?? 0;

  const STATUS_OPTIONS = [
    { value: '',          label: '— Set Status —' },
    { value: 'not-applied', label: '⬜ Not Applied' },
    { value: 'applied',   label: '✅ Applied' },
    { value: 'interview', label: '🎤 Interview Stage' },
    { value: 'waiting',   label: '⏳ Waiting Response' },
    { value: 'rejected',  label: '❌ Rejected' },
  ];

  return (
    <div
      className="job-card fade-in"
      style={{ borderLeft: `3px solid ${matchColor}` }}
    >
      {/* ---- Header Row ---- */}
      <div className="job-card-header">
        <div style={{ flex: 1 }}>
          <div className="job-card-title">{job.title}</div>
          <div className="job-card-company">🏢 {job.company}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <span
            className="match-badge"
            style={{
              background: matchColor + '22',
              color: matchColor,
              border: `1px solid ${matchColor}55`,
            }}
          >
            {matchLabel}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Priority: <strong style={{ color: 'var(--cyan)' }}>{priorityScore}</strong>
          </span>
        </div>
      </div>

      {/* ---- Meta Badges ---- */}
      <div className="job-card-meta">
        <span className="badge badge-gray">📍 {job.city}</span>
        <span className="badge badge-gray">🏭 {job.workType}</span>
        <span className="badge badge-gray">🌐 {job.language?.split('(')[0].trim()}</span>
        <span
          className="badge"
          style={{
            background: COMPETITION_COLORS[job.competition] + '20',
            color: COMPETITION_COLORS[job.competition],
            border: `1px solid ${COMPETITION_COLORS[job.competition]}44`,
          }}
        >
          📊 {job.competition} Competition
        </span>
        {isSaved && <span className="badge badge-cyan">⭐ Saved</span>}
        {status && (
          <span className="badge badge-amber">
            {STATUS_OPTIONS.find((s) => s.value === status)?.label}
          </span>
        )}
      </div>

      {/* ---- Salary + Industry ---- */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', margin: '8px 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
        <span>💰 <strong style={{ color: 'var(--text-primary)' }}>{salaryEstimate}</strong></span>
        <span>🧫 {job.industry}</span>
        <span>🛂 Visa: {job.visaSponsorship?.split('—')[0].trim()}</span>
      </div>

      {/* ---- Score Bar (cvMatch only by default) ---- */}
      <div style={{ margin: '10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>CV Match</span>
          <span style={{ color: matchColor, fontWeight: 700 }}>{cvMatch}%</span>
        </div>
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: `${cvMatch}%`, background: matchColor }} />
        </div>
      </div>

      {/* ---- Expandable Detail ---- */}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setExpanded(!expanded)}
        style={{ marginTop: '4px' }}
      >
        {expanded ? '▲ Less Details' : '▼ Full Analysis'}
      </button>

      {expanded && (
        <div className="job-detail">
          {/* All 10 Scores */}
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              📊 Score Breakdown
            </div>
            <ScoreGrid scores={scores} />
          </div>

          {/* Why It Matches */}
          {job.whyItMatchesMe && (
            <div>
              <div className="detail-label" style={{ marginBottom: '4px' }}>✅ Why It Matches You</div>
              <div className="detail-value">{job.whyItMatchesMe}</div>
            </div>
          )}

          {/* Missing Skills */}
          {job.missingSkills?.length > 0 && (
            <div>
              <div className="detail-label" style={{ marginBottom: '4px' }}>⚠️ Skill Gaps</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {job.missingSkills.map((s) => (
                  <span key={s} className="badge badge-red">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key Skills Required */}
          {job.keySkills?.length > 0 && (
            <div>
              <div className="detail-label" style={{ marginBottom: '4px' }}>🔑 Key Skills Required</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {job.keySkills.map((s) => (
                  <span key={s} className="badge badge-cyan">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="detail-row">
              <span className="detail-label">Deadline</span>
              <span className="detail-value">{job.deadline || 'Rolling'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Work Type</span>
              <span className="detail-value">{job.workType || '—'}</span>
            </div>
          </div>

          {/* Notes */}
          {job.notes && (
            <div style={{ padding: '10px', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              💡 {job.notes}
            </div>
          )}
        </div>
      )}

      {/* ---- Action Buttons ---- */}
      <div className="job-card-actions">
        <a
          href={job.applicationLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          🚀 Apply Now
        </a>
        <button
          className={`btn btn-sm ${isSaved ? 'btn-amber' : 'btn-ghost'}`}
          onClick={() => onSave(job)}
        >
          {isSaved ? '⭐ Saved' : '☆ Save Job'}
        </button>

        {/* Status Selector */}
        <select
          className="filter-select"
          style={{ fontSize: '0.78rem', padding: '4px 8px' }}
          value={status || ''}
          onChange={(e) => onSetStatus(job.id, e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
