'use client';
export default function Header({ savedCount = 0 }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <div className="header-logo-icon">🧬</div>
          <div>
            <div className="header-logo-text">BioCareer Intelligence</div>
            <div className="header-logo-sub">Germany Biotech Job Dashboard · Hadia Awan</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {savedCount > 0 && (
            <span className="badge badge-cyan">
              ⭐ {savedCount} Saved
            </span>
          )}
          <div className="header-status">
            <span className="header-dot" />
            <span>Live · Germany Market</span>
          </div>
        </div>
      </div>
    </header>
  );
}
