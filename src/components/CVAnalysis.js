'use client';
import { hadiaProfile } from '@/data/hadiaProfile';

const MATCH_COLORS = { 95: 'var(--cyan)', 88: 'var(--cyan)', 82: 'var(--green)', 70: 'var(--green)', 68: 'var(--green)', 55: 'var(--amber)', 50: 'var(--amber)' };

function FitBar({ fit }) {
  const color = fit >= 80 ? 'var(--cyan)' : fit >= 65 ? 'var(--green)' : fit >= 50 ? 'var(--amber)' : 'var(--red)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ width: `${fit}%`, height: '100%', background: color, borderRadius: '999px', transition: 'width 0.8s ease' }} />
      </div>
      <span style={{ fontSize: '0.82rem', fontWeight: 700, color, minWidth: '36px' }}>{fit}%</span>
    </div>
  );
}

export default function CVAnalysis() {
  const p = hadiaProfile;

  return (
    <div className="fade-in">
      {/* ---- Hero Profile Card ---- */}
      <div className="cv-hero" style={{ marginTop: '24px' }}>
        <div className="cv-hero-row">
          <div className="cv-avatar">👩‍🔬</div>
          <div style={{ flex: 1 }}>
            <div className="cv-name">{p.name}</div>
            <div className="cv-title-text">{p.title}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              📍 {p.currentLocation} → 🇩🇪 Target: {p.targetLocation} &nbsp;|&nbsp;
              🛂 {p.visa}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
            <span className="badge badge-cyan">MSc Bristol 🇬🇧</span>
            <span className="badge badge-purple">BS 3.85 GPA</span>
            <span className="badge badge-green">Published 2022</span>
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          {p.summary}
        </p>
      </div>

      {/* ---- Stats ---- */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">3+</div>
          <div className="stat-label">Years IVF Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{p.skills.tier1.length + p.skills.tier2.length}</div>
          <div className="stat-label">Technical Skills</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{p.publications.length}</div>
          <div className="stat-label">Publication</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{p.awards.length}</div>
          <div className="stat-label">Awards & Honours</div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        {/* ---- Left Column ---- */}
        <div style={{ display: 'grid', gap: '16px' }}>

          {/* Career Paths */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🚀 Strongest Biotech Career Paths
            </h3>
            {p.careerPaths.map((cp) => (
              <div className="career-path-bar" key={cp.path}>
                <div style={{ flex: 1 }}>
                  <div className="career-path-name">{cp.path}</div>
                  <div className="career-path-desc">{cp.description}</div>
                  <div style={{ marginTop: '6px' }}>
                    <FitBar fit={cp.fit} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Missing Skills */}
          <div className="glass-card" style={{ padding: '20px', borderColor: 'rgba(239,68,68,0.2)' }}>
            <h3 style={{ marginBottom: '14px', color: 'var(--red)' }}>⚠️ Skill Gaps to Address</h3>
            <ul className="guidance-list">
              {p.missingSkills.map((s) => (
                <li key={s} style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--red)' }}>→</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '14px' }}>🌍 Languages</h3>
            {p.languages.map((l) => (
              <div key={l.language} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600 }}>{l.language}</span>
                <span className={`badge ${l.level.includes('Fluent') || l.level.includes('Native') ? 'badge-green' : l.level.includes('None') ? 'badge-red' : 'badge-amber'}`}>
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right Column ---- */}
        <div style={{ display: 'grid', gap: '16px' }}>

          {/* Core Skills */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '14px' }}>⚗️ Core Technical Skills</h3>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
                🟦 TIER 1 — IVF / Embryology (Strongest)
              </div>
              {p.skills.tier1.map((s) => <span key={s} className="skill-pill skill-tier1">{s}</span>)}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
                🟪 TIER 2 — Molecular Biology
              </div>
              {p.skills.tier2.map((s) => <span key={s} className="skill-pill skill-tier2">{s}</span>)}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
                🟩 TIER 3 — Management / Soft Skills
              </div>
              {p.skills.tier3.map((s) => <span key={s} className="skill-pill skill-tier3">{s}</span>)}
            </div>
          </div>

          {/* Recruiter Keywords */}
          <div className="glass-card" style={{ padding: '20px', borderColor: 'rgba(0,212,255,0.2)' }}>
            <h3 style={{ marginBottom: '14px', color: 'var(--cyan)' }}>🔍 Recruiter Search Keywords</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Use these keywords on LinkedIn, Xing, and in your CV headline:
            </p>
            <div>
              {p.recruiterKeywords.map((k) => (
                <span key={k} className="badge badge-cyan" style={{ margin: '3px' }}>{k}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '14px' }}>🎓 Education</h3>
            {p.education.map((e) => (
              <div key={e.degree} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{e.degree}</div>
                <div style={{ color: 'var(--cyan)', fontSize: '0.82rem', marginTop: '2px' }}>{e.institution} · {e.country}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>{e.period}{e.grade ? ` · GPA: ${e.grade}` : ''}</div>
                {e.focus && (
                  <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {e.focus.map((f) => <span key={f} className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{f}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Awards */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '14px' }}>🏆 Awards & Honours</h3>
            {p.awards.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '0.82rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                <span>🌟</span> {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Work Experience Timeline ---- */}
      <div style={{ marginTop: '20px' }} className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>💼 Work Experience</h3>
        {p.workExperience.map((w, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '10px', height: '10px', background: i === 0 ? 'var(--cyan)' : 'var(--purple)', borderRadius: '50%', flexShrink: 0, marginTop: '4px' }} />
              {i < p.workExperience.length - 1 && <div style={{ width: '2px', flex: 1, background: 'var(--border)', marginTop: '4px', minHeight: '30px' }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{w.title}</div>
              <div style={{ color: 'var(--cyan)', fontSize: '0.82rem', marginBottom: '2px' }}>{w.company}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>{w.period} · {w.location}</div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '4px' }}>
                {w.highlights.map((h) => (
                  <li key={h} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                    <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
