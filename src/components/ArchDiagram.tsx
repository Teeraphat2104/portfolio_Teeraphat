import React from 'react';

export const ArchBox: React.FC<{ label: string; badge: string; children: React.ReactNode }> = ({ label, badge, children }) => (
  <div style={{ width: '100%', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', backgroundColor: 'var(--card-bg)', transition: 'all 0.2s' }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>{label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '0.15rem 0.4rem', borderRadius: '3px', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{badge}</span>
    </div>
    {children}
  </div>
);

export const ArchArrow: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '32px', justifyContent: 'center' }}>
    <div style={{ width: '2px', flexGrow: 1, backgroundColor: 'var(--border)' }} />
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
);
