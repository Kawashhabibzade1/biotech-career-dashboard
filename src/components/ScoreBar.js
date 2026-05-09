'use client';

// ScoreBar — single score visualization row
export function ScoreBar({ label, value, color }) {
  const barColor =
    color ||
    (value >= 75 ? 'var(--green)' : value >= 55 ? 'var(--amber)' : 'var(--red)');

  return (
    <div className="score-bar-wrap">
      <div className="score-bar-label">
        <span>{label}</span>
        <span style={{ color: barColor, fontWeight: 700 }}>{value}</span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${value}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

// ScoreGrid — shows all 10 scores in a compact grid
export function ScoreGrid({ scores }) {
  const rows = [
    { label: 'CV Match',            value: scores.cvMatch,            color: null },
    { label: 'Hiring Probability',  value: scores.hiringProbability,  color: null },
    { label: 'English Accessibility', value: scores.englishAccess,   color: 'var(--cyan)' },
    { label: 'Visa Sponsorship',    value: scores.visaSponsorship,    color: '#a78bfa' },
    { label: 'Career Growth',       value: scores.careerGrowth,       color: 'var(--green)' },
    { label: 'Salary Potential',    value: scores.salaryScore,        color: null },
  ];

  return (
    <div style={{ display: 'grid', gap: '5px' }}>
      {rows.map((r) => (
        <ScoreBar key={r.label} label={r.label} value={r.value} color={r.color} />
      ))}
    </div>
  );
}
