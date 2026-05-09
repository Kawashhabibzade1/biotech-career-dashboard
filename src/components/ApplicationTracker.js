'use client';

const COLUMNS = [
  { key: 'not-applied', label: '⬜ Not Applied',     color: 'var(--text-muted)',   bg: 'rgba(255,255,255,0.03)' },
  { key: 'applied',     label: '✅ Applied',          color: 'var(--cyan)',         bg: 'rgba(0,212,255,0.05)' },
  { key: 'interview',   label: '🎤 Interview Stage',  color: 'var(--purple)',       bg: 'rgba(124,58,237,0.06)' },
  { key: 'waiting',     label: '⏳ Waiting Response', color: 'var(--amber)',        bg: 'rgba(245,158,11,0.05)' },
  { key: 'rejected',    label: '❌ Rejected',         color: 'var(--red)',          bg: 'rgba(239,68,68,0.04)' },
];

export default function ApplicationTracker({ savedJobs, jobStatuses, onSetStatus, onGoToJobs }) {
  const getJobsInStatus = (statusKey) =>
    savedJobs.filter((j) => jobStatuses[j.id] === statusKey);

  const uncategorized = savedJobs.filter((j) => !jobStatuses[j.id] || jobStatuses[j.id] === '');

  const totalSaved = savedJobs.length;
  const totalApplied = savedJobs.filter((j) => jobStatuses[j.id] === 'applied').length;
  const totalInterview = savedJobs.filter((j) => jobStatuses[j.id] === 'interview').length;

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Application Tracker</h2>
        <span className="section-count">{totalSaved} saved jobs</span>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-value">{totalSaved}</div>
          <div className="stat-label">Jobs Saved</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(0,212,255,0.3)' }}>
          <div className="stat-value" style={{ background: 'none', WebkitTextFillColor: 'var(--cyan)', color: 'var(--cyan)' }}>{totalApplied}</div>
          <div className="stat-label">Applications Sent</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(124,58,237,0.3)' }}>
          <div className="stat-value" style={{ background: 'none', WebkitTextFillColor: '#a78bfa', color: '#a78bfa' }}>{totalInterview}</div>
          <div className="stat-label">Interviews Secured</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {totalSaved > 0 ? `${Math.round((totalApplied / totalSaved) * 100)}%` : '—'}
          </div>
          <div className="stat-label">Apply Rate</div>
        </div>
      </div>

      {totalSaved === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-text">No saved jobs yet</div>
          <div className="empty-state-sub">Go to the Job Dashboard and click "Save Job" on opportunities you like</div>
          <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={onGoToJobs}>
            🔍 Browse Jobs
          </button>
        </div>
      ) : (
        <>
          {/* Uncategorized */}
          {uncategorized.length > 0 && (
            <div className="glass-card" style={{ padding: '16px', marginBottom: '20px', borderColor: 'rgba(245,158,11,0.3)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '10px' }}>
                ⚠️ {uncategorized.length} saved job(s) without status — set a status below
              </div>
              {uncategorized.map((job) => (
                <TrackerItem key={job.id} job={job} status="" onSetStatus={onSetStatus} />
              ))}
            </div>
          )}

          {/* Kanban Columns */}
          <div className="tracker-columns">
            {COLUMNS.map((col) => {
              const colJobs = getJobsInStatus(col.key);
              return (
                <div
                  key={col.key}
                  className="tracker-col"
                  style={{ background: col.bg, borderColor: col.color + '33' }}
                >
                  <div className="tracker-col-header" style={{ color: col.color }}>
                    {col.label}
                    <span className="tracker-col-count" style={{ background: col.color + '22', color: col.color }}>
                      {colJobs.length}
                    </span>
                  </div>

                  {colJobs.length === 0 ? (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
                      Empty
                    </div>
                  ) : (
                    colJobs.map((job) => (
                      <TrackerItem key={job.id} job={job} status={col.key} onSetStatus={onSetStatus} />
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function TrackerItem({ job, status, onSetStatus }) {
  const cvMatch = job.scores?.cvMatch ?? 0;
  const matchColor = cvMatch >= 75 ? 'var(--green)' : cvMatch >= 55 ? 'var(--amber)' : 'var(--red)';

  return (
    <div className="tracker-item" style={{ borderLeft: `2px solid ${matchColor}` }}>
      <div className="tracker-item-title">{job.title}</div>
      <div className="tracker-item-company">{job.company} · {job.city}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', gap: '6px' }}>
        <span style={{ fontSize: '0.72rem', color: matchColor, fontWeight: 700 }}>{cvMatch}% match</span>
        <select
          className="filter-select"
          style={{ fontSize: '0.72rem', padding: '2px 6px', flex: 1 }}
          value={status}
          onChange={(e) => onSetStatus(job.id, e.target.value)}
        >
          <option value="">— Status —</option>
          <option value="not-applied">⬜ Not Applied</option>
          <option value="applied">✅ Applied</option>
          <option value="interview">🎤 Interview</option>
          <option value="waiting">⏳ Waiting</option>
          <option value="rejected">❌ Rejected</option>
        </select>
      </div>
      {job.applicationLink && job.applicationLink !== '#' && (
        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '0.72rem', color: 'var(--cyan)', textDecoration: 'none', marginTop: '4px', display: 'block' }}>
          → Open Application
        </a>
      )}
    </div>
  );
}
