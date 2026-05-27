import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const words = [
    'DISTRIBUTED SYSTEMS DESIGN',
    'FULL-STACK ARCHITECTURE',
    'CLOUD ARCHITECTURE & OPS',
    'HIGH-PERFORMANCE APPLICATIONS'
  ];
  const [index, setIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const activeWord = words[index];
    
    const handleType = () => {
      if (!isDeleting) {
        setSubText(activeWord.substring(0, subText.length + 1));
        if (subText.length === activeWord.length) {
          // Pause before deleting
          setSpeed(2000);
          setIsDeleting(true);
        } else {
          setSpeed(60);
        }
      } else {
        setSubText(activeWord.substring(0, subText.length - 1));
        if (subText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
          setSpeed(500);
        } else {
          setSpeed(30);
        }
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, index]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="section" style={{ paddingTop: '8.5rem', animation: 'fadeIn 0.8s ease-out' }}>
      <div className="container">
        <span className="mono-tag">[01 / INTRO]</span>
        
        <h1
          style={{
            margin: '1.5rem 0 2rem 0',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
          }}
        >
          Building resilient backends,
          <br />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
            refined digital interfaces.
          </span>
        </h1>

        {/* Dynamic Mono Subtitle */}
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.05em',
            minHeight: '24px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--text-primary)',
              borderRadius: '50%',
            }}
          />
          <span>{subText}</span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '14px',
              backgroundColor: 'var(--text-primary)',
              animation: 'blink 0.8s infinite',
            }}
          />
        </div>

        <p
          style={{
            fontSize: '1.15rem',
            maxWidth: '640px',
            lineHeight: 1.6,
            marginBottom: '3rem',
            color: 'var(--text-secondary)',
          }}
        >
          I am a Full-Stack Software Engineer focused on designing scalable system infrastructures,
          highly parallel web backends, and low-latency client environments. Bridging operational strength
          with clean product aesthetics.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          <button onClick={() => scrollTo('projects')} className="btn-primary">
            Explore Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button onClick={() => scrollTo('contact')} className="btn-secondary">
            Get in Touch
          </button>
        </div>

        {/* Technical Summary Line Indicators */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px dashed var(--border)',
          }}
        >
          {[
            { label: 'ENGINEERING PRINCIPLES', value: 'Scalability / High Concurrency' },
            { label: 'DEVELOPMENT DOMAIN', value: 'API Design / Distributed DBs' },
            { label: 'PRODUCT FOCUS', value: 'High Density / Fluid UX' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.05em',
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};
