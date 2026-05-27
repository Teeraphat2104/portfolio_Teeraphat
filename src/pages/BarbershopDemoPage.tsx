import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarbershopDemoContent } from '../components/BarbershopDemo';

export const BarbershopDemoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '5rem', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div className="container">
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'var(--mono)',
            fontWeight: 600,
            fontSize: '0.95rem',
            letterSpacing: '-0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            padding: 0,
            marginBottom: '2.5rem',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          BACK TO PORTFOLIO
        </button>

        <span className="mono-tag" style={{ marginBottom: '0.75rem' }}>[02 / DEMO]</span>
        <h2 style={{ marginBottom: '3rem' }}>
          Barbershop Booking & Queue Management System
        </h2>

        <BarbershopDemoContent />
      </div>
    </div>
  );
};
