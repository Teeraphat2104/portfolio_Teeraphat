import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address';
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate standard server latency
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setShowToast(true);
      
      // Auto-hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
        setStatus('idle');
      }, 4000);
    }, 1500);
  };

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
                { label: 'EMAIL', value: 'alex.sys.eng@gmail.com', href: 'mailto:alex.sys.eng@gmail.com' },
                { label: 'GITHUB', value: 'github.com/alex-syseng', href: 'https://github.com' },
                { label: 'LINKEDIN', value: 'linkedin.com/in/alex-syseng', href: 'https://linkedin.com' },
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

          {/* Fully Interactive Email Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2.5rem',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label
                htmlFor="name"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}
              >
                NAME_
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'loading'}
                style={{
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: `1px solid ${errors.name ? 'red' : 'var(--border)'}`,
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--sans)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="Alex Smith"
              />
              {errors.name && (
                <span style={{ fontSize: '0.75rem', color: 'red', fontFamily: 'var(--mono)' }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}
              >
                EMAIL_ADDRESS_
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                style={{
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: `1px solid ${errors.email ? 'red' : 'var(--border)'}`,
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--sans)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="alex@domain.com"
              />
              {errors.email && (
                <span style={{ fontSize: '0.75rem', color: 'red', fontFamily: 'var(--mono)' }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label
                htmlFor="message"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}
              >
                MESSAGE_payload_
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                rows={5}
                style={{
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: `1px solid ${errors.message ? 'red' : 'var(--border)'}`,
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--sans)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'none',
                }}
                placeholder="Describe your project, timeline, and architectural requirements..."
              />
              {errors.message && (
                <span style={{ fontSize: '0.75rem', color: 'red', fontFamily: 'var(--mono)' }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.8rem',
                marginTop: '0.5rem',
                position: 'relative',
              }}
            >
              {status === 'loading' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Mini Spinner */}
                  <span className="spinner" />
                  TRANSMITTING_PAYLOAD...
                </div>
              ) : (
                'TRANSMIT MESSAGE'
              )}
            </button>
          </form>
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

      {/* Floating Success Toast Alert */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--toast-bg)',
            color: 'var(--toast-text)',
            padding: '1rem 2rem',
            borderRadius: '6px',
            boxShadow: 'var(--shadow)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '1px solid var(--border)',
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            animation: 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>STATUS: SUCCESS. PAYLOAD TRANSMITTED.</span>
        </div>
      )}

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
