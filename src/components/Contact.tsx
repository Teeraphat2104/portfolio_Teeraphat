import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <span className="mono-tag">[05 / CONTACT]</span>
        <h2 style={{ marginBottom: '3.5rem' }}>Get in Touch</h2>

        <div className="grid-2" style={{ gap: '4rem' }}>
          {/* Contact Details & Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Let's collaborate.</h3>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              I am currently open to full-time technical leadership positions, architectural consulting, or
              collaborations on open-source systems engineering initiatives.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              {[
                { label: 'EMAIL', value: 'tlansantad@gmail.com', href: 'mailto:tlansantad@gmail.com' },
                { label: 'GITHUB', value: 'github.com/Teeraphat2104', href: 'https://github.com/Teeraphat2104' },
                { label: 'RESUME', value: 'Download PDF Transcript', href: '#resume' },
              ].map((link, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            marginTop: '6rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} ALEX SMITH. ALL SYSTEM LOGS ACTIVE.
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            LOC: 40.7128° N, 74.0060° W // SYS: 1.0.0-RC1
          </span>
        </div>
      </div>

      <style>{`
        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: var(--toast-text);
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
