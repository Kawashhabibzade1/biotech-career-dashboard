'use client';

const GUIDANCE_DATA = {
  cities: [
    { city: 'Munich', score: 95, reason: 'Largest biotech hub in Germany. Home to Vitrolife, Roche (Penzberg), Helmholtz. High English tolerance.' },
    { city: 'Berlin', score: 90, reason: 'Bayer HQ, Max Planck Institute, vibrant startup scene, international IVF clinics. Very English-friendly.' },
    { city: 'Frankfurt', score: 82, reason: 'Igenomix, CooperSurgical nearby. International finance hub = high English fluency.' },
    { city: 'Darmstadt', score: 80, reason: 'Merck KGaA and Thermo Fisher headquarters. Dense with life science jobs.' },
    { city: 'Hamburg', score: 78, reason: 'CooperSurgical, Eugin clinics. Port city with strong international culture.' },
    { city: 'Kiel', score: 72, reason: 'Ferring Pharmaceuticals base. Smaller city but reproductive medicine focus.' },
    { city: 'Heidelberg', score: 70, reason: 'EMBL, AstraZeneca, strong academic research infrastructure.' },
  ],
  certifications: [
    { cert: 'ESHRE Clinical Embryologist Certification', priority: 'Critical', desc: 'European Society of Human Reproduction certification — gold standard for clinical embryologists in Germany.' },
    { cert: 'GMP/GLP Training', priority: 'High', desc: 'Required for any pharma or medical device role in Germany. Online courses available.' },
    { cert: 'German Language (Goethe B1/B2)', priority: 'High', desc: 'Dramatically increases opportunities, especially in clinical and hospital roles.' },
    { cert: 'ICSI Micromanipulation Training', priority: 'Medium', desc: 'Essential for human ART clinical embryologist positions.' },
    { cert: 'Bioinformatics Basics (Python/R)', priority: 'Medium', desc: 'Opens NGS analysis roles at genomics companies and research institutes.' },
    { cert: 'Quality Management (ISO 9001)', priority: 'Low', desc: 'Useful for QA/QC roles in diagnostics and pharma.' },
  ],
  cvImprovements: [
    'Add a concise "German Biotech" headline: "Clinical Embryologist | MSc Reproduction & Development | IVF Lab Expert | 3+ Years"',
    'Quantify achievements: "Managed 500+ IVF cycles", "Supervised team of 5 embryologists", "Achieved X% blastocyst development rate"',
    'Add ATS-optimized keywords: Cryopreservation, Vitrification, IVF, ART, Embryo Culture, NGS, CRISPR',
    'Create a German-market CV version: 1-2 pages, include photo (German standard), no age discrimination laws apply differently',
    'Highlight MSc Bristol prominently — UK university prestigious in Germany',
    'Add ESHRE student membership to CV if not already done',
    'Include Vytelle system experience — niche IVF software known to labs',
    'List your IJMS publication with DOI link',
  ],
  linkedInImprovements: [
    'Headline: "Embryologist | IVF Lab Scientist | MSc Bristol | Seeking Opportunities in Germany 🇩🇪"',
    'Set location to Germany or "Open to relocate to Germany" in career preferences',
    'Enable "Open to Work" with: Germany, Biotechnology, Reproductive Medicine, Research',
    'Follow German biotech companies: Vitrolife, Ferring, Merck, Igenomix, CooperSurgical',
    'Join ESHRE and German IVF professional groups on LinkedIn',
    'Post about your MSc research progress — builds visibility with German recruiters',
    'Connect with German embryologists and biotech recruiters directly',
    'Add all skills listed in the CV to LinkedIn Skills section for recruiter search visibility',
  ],
  salary: [
    { role: 'Junior Embryologist (Human ART)', range: '€32,000 – €44,000', note: 'Entry-level, Germany average' },
    { role: 'IVF Laboratory Scientist', range: '€40,000 – €55,000', note: 'Mid-level, large cities +10%' },
    { role: 'Application Specialist (IVF Products)', range: '€48,000 – €65,000', note: 'Commercial role, often + commission' },
    { role: 'Research Scientist (Reproductive)', range: '€42,000 – €60,000', note: 'Academia slightly lower, pharma higher' },
    { role: 'Lab Manager / Senior Embryologist', range: '€55,000 – €75,000', note: 'With 5+ years experience' },
    { role: 'IVF Project Manager', range: '€58,000 – €80,000', note: 'Management track' },
  ],
  focusRecommendation: {
    primary: 'Clinical Embryology (Human IVF)',
    secondary: 'IVF Product Application Specialist',
    tertiary: 'Reproductive Biology R&D',
    rationale: 'Your core strength is IVF/embryology — this is rare, valuable, and in growing demand as Germany\'s fertility industry expands. Target human IVF clinics (Eugin, Kinderwunsch centers) first, then pharma (Ferring, Merck) and IVF products companies (Vitrolife, CooperSurgical).',
    avoid: 'Bioinformatics and pure computational roles require extensive programming background not evidenced in your CV.',
  },
};

function PriorityBadge({ p }) {
  const colors = {
    Critical: { bg: 'rgba(239,68,68,0.15)', color: 'var(--red)' },
    High:     { bg: 'rgba(245,158,11,0.15)', color: 'var(--amber)' },
    Medium:   { bg: 'rgba(0,212,255,0.12)', color: 'var(--cyan)' },
    Low:      { bg: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' },
  };
  const style = colors[p] || colors.Low;
  return <span style={{ ...style, padding: '2px 8px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>{p}</span>;
}

export default function CareerGuidance() {
  const d = GUIDANCE_DATA;

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Strategic Career Guidance</h2>
        <span className="section-count">Germany Biotech Market · 2025</span>
      </div>

      {/* Focus Recommendation */}
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(0,212,255,0.07), rgba(124,58,237,0.07))',
        border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '20px',
      }}>
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '10px' }}>🎯 Your Strategic Focus Recommendation</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span className="badge badge-cyan">🥇 Primary: {d.focusRecommendation.primary}</span>
          <span className="badge badge-purple">🥈 Secondary: {d.focusRecommendation.secondary}</span>
          <span className="badge badge-green">🥉 Tertiary: {d.focusRecommendation.tertiary}</span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {d.focusRecommendation.rationale}
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--red)', marginTop: '8px' }}>
          ⚠️ Avoid: {d.focusRecommendation.avoid}
        </p>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        {/* Left */}
        <div style={{ display: 'grid', gap: '16px' }}>

          {/* Best Cities */}
          <div className="guidance-section">
            <div className="guidance-title">🇩🇪 Best German Cities for Your Profile</div>
            {d.cities.map((c) => {
              const color = c.score >= 85 ? 'var(--cyan)' : c.score >= 75 ? 'var(--green)' : 'var(--amber)';
              return (
                <div key={c.city} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.city}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color }}>{c.score}/100</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', marginBottom: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${c.score}%`, height: '100%', background: color, borderRadius: '999px' }} />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.reason}</div>
                </div>
              );
            })}
          </div>

          {/* Salary Expectations */}
          <div className="guidance-section">
            <div className="guidance-title">💰 Realistic Salary Expectations — Germany</div>
            {d.salary.map((s) => (
              <div key={s.role} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.role}</span>
                  <span style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.85rem' }}>{s.range}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'grid', gap: '16px' }}>

          {/* Certifications */}
          <div className="guidance-section">
            <div className="guidance-title">🏅 Certifications to Obtain</div>
            {d.certifications.map((c) => (
              <div key={c.cert} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', flex: 1 }}>{c.cert}</span>
                  <PriorityBadge p={c.priority} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* CV Improvements */}
          <div className="guidance-section">
            <div className="guidance-title">📄 CV Improvements</div>
            <ul className="guidance-list">
              {d.cvImprovements.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>

          {/* LinkedIn Improvements */}
          <div className="guidance-section">
            <div className="guidance-title">💼 LinkedIn Optimization</div>
            <ul className="guidance-list">
              {d.linkedInImprovements.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
