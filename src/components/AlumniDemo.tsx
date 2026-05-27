import React, { useState } from 'react';
import { ArchBox, ArchArrow } from './ArchDiagram';

interface StepData {
  method: string; path: string; desc: string;
}

interface TestFile {
  file: string; covers: string; count: number;
}

const apiGroups: { prefix: string; endpoints: StepData[] }[] = [
  {
    prefix: 'auth', endpoints: [
      { method: 'POST', path: '/api/auth/register', desc: 'Multi-tier registration (student/alumni/admin)' },
      { method: 'POST', path: '/api/auth/login', desc: 'Login returns JWT + profile' },
      { method: 'POST', path: '/api/auth/verify/{id}', desc: 'Verify email/documents' },
      { method: 'POST', path: '/api/auth/logout', desc: 'Revoke session' },
    ],
  },
  {
    prefix: 'profile', endpoints: [
      { method: 'GET', path: '/api/profile/{id}', desc: 'Get profile with education/work history' },
      { method: 'POST', path: '/api/profile/update', desc: 'Update profile fields + avatar' },
      { method: 'POST', path: '/api/profile/search', desc: 'Search alumni by name/faculty/year' },
    ],
  },
  {
    prefix: 'network', endpoints: [
      { method: 'POST', path: '/api/network/connections', desc: 'List connections (paginated)' },
      { method: 'POST', path: '/api/network/connect/{id}', desc: 'Send connection request' },
      { method: 'POST', path: '/api/network/accept/{id}', desc: 'Accept incoming request' },
      { method: 'POST', path: '/api/network/reject/{id}', desc: 'Reject incoming request' },
    ],
  },
  {
    prefix: 'bandit', endpoints: [
      { method: 'POST', path: '/api/bandit/recommendations', desc: 'Graph-based matchmaking suggestions' },
      { method: 'POST', path: '/api/bandit/stats', desc: 'BanditSystem profiling stats' },
    ],
  },
  {
    prefix: 'career', endpoints: [
      { method: 'POST', path: '/api/career/experiences', desc: 'List/add work experiences' },
      { method: 'POST', path: '/api/career/recommendations', desc: 'Career path recommendations' },
    ],
  },
  {
    prefix: 'admin', endpoints: [
      { method: 'GET', path: '/api/admin/dashboard', desc: 'Platform-wide stats + active users' },
      { method: 'POST', path: '/api/admin/reports', desc: 'Generate network/reach reports' },
    ],
  },
];

const testFiles: TestFile[] = [
  { file: 'AuthTest.php', covers: 'Registration + verification + login/logout', count: 8 },
  { file: 'ProfileApiTest.php', covers: 'Profile CRUD + search + validation', count: 12 },
  { file: 'NetworkApiTest.php', covers: 'Connection lifecycle + graph traversal', count: 15 },
  { file: 'BanditSystemTest.php', covers: 'Matchmaking + recommendation scoring', count: 10 },
  { file: 'AdminApiTest.php', covers: 'Dashboard + report generation', count: 5 },
];

const alumni = [
  { name: 'Siriporn Wongsuwan', batch: '2019', faculty: 'Engineering', major: 'Computer Engineering', role: 'Senior Engineer at Google', avatar: 'SW' },
  { name: 'Nattapong Kittikul', batch: '2020', faculty: 'Engineering', major: 'Software Engineering', role: 'Full-Stack Dev at Agoda', avatar: 'NK' },
  { name: 'Pichaya Lertpong', batch: '2018', faculty: 'Science', major: 'Data Science', role: 'Data Analyst at KBank', avatar: 'PL' },
  { name: 'Kriangkrai Boonmee', batch: '2021', faculty: 'Business', major: 'Marketing', role: 'Growth Lead at Shopee', avatar: 'KB' },
  { name: 'Ananya Suthisak', batch: '2019', faculty: 'Engineering', major: 'Computer Engineering', role: 'Backend Dev at LINE Thailand', avatar: 'AS' },
];

export const AlumniDemoContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'api'>('overview');
  const [step, setStep] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [connected, setConnected] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [expandedPrefix, setExpandedPrefix] = useState<string | null>(null);

  const resetDemo = () => {
    setStep(0); setLoggedIn(false); setSearchQuery('');
    setConnected([]); setShowRecommendations(false);
  };

  const alumniUser = { name: 'Teeraphat L.', batch: '2020', faculty: 'Engineering', major: 'Software Engineering' };

  const filteredAlumni = alumni.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: 0, marginBottom: '2.5rem' }}>
        {(['overview', 'demo', 'api'] as const).map((tab) => (
          <button key={tab} onClick={() => { setActiveTab(tab); if (tab !== 'demo') resetDemo(); }}
            style={{ flex: 1, maxWidth: '200px', padding: '0.75rem 1.5rem', fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid var(--text-primary)' : '2px solid transparent', color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-tertiary)', transition: 'all 0.2s', cursor: 'pointer' }}>
            {tab === 'overview' ? '◈ OVERVIEW' : tab === 'demo' ? '▶ LIVE DEMO' : '⎔ API & TESTS'}
          </button>
        ))}
      </div>

      {/* ── TAB 1: OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'CONNECTION RESOLVE', value: '< 25ms', desc: 'Graph traversal latency' },
              { label: 'ACTIVE PROFILES', value: '50,000+', desc: 'Registered alumni + students' },
              { label: 'MATCH ACCURACY', value: '94%', desc: 'BanditSystem recommendation precision' },
              { label: 'ASSET BUILD', value: '< 1.8s', desc: 'Vite production build time' },
            ].map((m, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--card-bg)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{m.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.desc}</span>
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>SYSTEM ARCHITECTURE</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <ArchBox label="ALUMNI CLIENT" badge="Presentation">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
                  {['Vite + TypeScript', 'React Router', 'Axios HTTP', 'SCSS Modules'].map((t) => (
                    <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{t}</span>
                  ))}
                </div>
              </ArchBox>
              <ArchArrow />
              <ArchBox label="LARAVEL APPLICATION CORE" badge="API Layer">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {[
                    { name: 'Auth', desc: 'JWT + Verify' },
                    { name: 'Profile', desc: 'CRUD + Search' },
                    { name: 'Network', desc: 'Graph' },
                    { name: 'Bandit', desc: 'Matchmaking' },
                  ].map((c) => (
                    <div key={c.name} style={{ padding: '0.5rem 0.25rem', borderRadius: '4px', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--card-bg)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--code-bg)'; }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '4px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', fontSize: '0.7rem' }}>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>Eloquent ORM</span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>JWT Auth</span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>Graph Traversal</span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>Memcached</span>
                </div>
              </ArchBox>
              <ArchArrow />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
                <ArchBox label="Database Cluster" badge="Data">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem' }}>
                    {['8 relational tables', 'users (with verification status)', 'profiles (education + work)', 'connections (bidirectional graph)', 'experiences (career timeline)', 'bandit_scores (recommendation weights)'].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-primary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </ArchBox>
                <ArchBox label="Cache + Test Suite" badge="Quality">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem' }}>
                    {['Memcached (O(1) key access)', '50 PHPUnit tests across 5 files', 'Graph traversal edge-case coverage', 'Bandit scoring validation', 'Auth + middleware integration'].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-primary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </ArchBox>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '2px', letterSpacing: '0.1em' }}>
                18 API ENDPOINTS • 50 PHPUNIT TESTS
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>TECHNOLOGY STACK</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Laravel', 'PHP 8.2', 'TypeScript', 'Vite', 'React', 'MySQL', 'Memcached', 'JWT', 'PHPUnit', 'Nginx', 'SCSS'].map((tech) => (
                <span key={tech} style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--text-secondary)', backgroundColor: 'var(--card-bg)' }}>{tech}</span>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>KEY FEATURES</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'BanditSystem Matchmaking', desc: 'Graph-based recommendation engine that profiles alumni connections using weighted scoring to deliver personalized networking suggestions in O(log n) time.' },
                { title: 'Multi-Tier Registration', desc: 'Distinct registration flows for students, alumni, and admins with document verification, email confirmation, and role-based middleware gating.' },
                { title: 'Bidirectional Graph Network', desc: 'Connection system stores bidirectional edges with status tracking (pending/active/rejected). Eager-loaded relational policies fetch graph branches in near O(1) time using Memcached indexes.' },
                { title: 'Career Path Tracking', desc: 'Users maintain work experience timelines. The system analyzes career trajectories across the network to recommend relevant opportunities and connections.' },
                { title: 'Search & Discovery', desc: 'Full-text search across alumni by name, faculty, graduation batch, company, or role with Memcached result caching for high-traffic queries.' },
                { title: 'Admin Analytics Dashboard', desc: 'Platform-wide metrics: active users, connection growth rate, top-faculty engagement, and network density charts with report export.' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{f.title}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: LIVE DEMO ── */}
      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Step indicators */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Login', 'Dashboard', 'Network', 'Match'].map((label, i) => (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: i <= step ? 1 : 0.3, transition: 'opacity 0.3s' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: i <= step ? 'var(--accent)' : 'transparent', border: '1px solid', borderColor: i <= step ? 'var(--accent)' : 'var(--border)', color: i <= step ? 'var(--bg)' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.3s' }}>{i + 1}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: i <= step ? 'var(--text-primary)' : 'var(--text-tertiary)' }} className="step-label-desktop">{label}</span>
                </div>
                {i < 3 && <span style={{ width: '24px', height: '1px', backgroundColor: i < step ? 'var(--accent)' : 'var(--border)', transition: 'background-color 0.3s' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 0: Login */}
          {step === 0 && !loggedIn && (
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--card-bg)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>AP</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Alumni Portal</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Sign in to your alumni network</span>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.35rem' }}>EMAIL</label>
                <input type="email" defaultValue="teeraphat.l@alumni.edu" style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.35rem' }}>PASSWORD</label>
                <input type="password" defaultValue="••••••••" style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} />
              </div>
              <button onClick={() => { setLoggedIn(true); setStep(1); }} className="btn-primary" style={{ justifyContent: 'center', padding: '0.6rem' }}>
                Sign In →
              </button>
            </div>
          )}

          {/* Step 1: Dashboard */}
          {step === 1 && loggedIn && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Welcome back, {alumniUser.name}</h3>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Class of {alumniUser.batch} • {alumniUser.major}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {[
                  { label: 'CONNECTIONS', value: '86' },
                  { label: 'NETWORK VIEWS', value: '234' },
                  { label: 'MATCH SCORE', value: '92%' },
                  { label: 'NEW THIS WEEK', value: '12' },
                ].map((s) => (
                  <div key={s.label} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--code-bg)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--card-bg)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>RECENT NETWORK ACTIVITY</span>
                {[
                  { event: 'Nattapong K. accepted your request', time: '2h ago', type: 'connection' },
                  { event: 'New alumni joined: 5 from Engineering', time: '4h ago', type: 'join' },
                  { event: 'Your profile was viewed 8 times', time: '1d ago', type: 'view' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: 500 }}>{a.event}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{a.time}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Explore Network →
              </button>
            </div>
          )}

          {/* Step 2: Network / Search */}
          {step === 2 && loggedIn && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Alumni Network</h3>
              <div>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, faculty, or major..." style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredAlumni.map((a) => {
                  const isConnected = connected.includes(a.name);
                  return (
                    <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--card-bg)' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontWeight: 600, fontSize: '0.7rem', color: 'var(--text-primary)', flexShrink: 0 }}>{a.avatar}</div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{a.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{a.major} • Class of {a.batch}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{a.role}</div>
                      </div>
                      {isConnected ? (
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#dcfce7', color: '#15803d' }}>CONNECTED</span>
                      ) : (
                        <button onClick={() => setConnected([...connected, a.name])} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontFamily: 'var(--mono)' }}>+ Connect</button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {!showRecommendations && <button onClick={() => setShowRecommendations(true)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Get Suggestions →</button>}
                <button onClick={() => setStep(1)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>← Back</button>
              </div>

              {/* Recommendations */}
              {showRecommendations && (
                <div style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--card-bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>BANDITSYSTEM RECOMMENDATIONS</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '3px', backgroundColor: '#fef3c7', color: '#92400e' }}>MATCH: 94%</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { name: 'Chatchai Phromrat', reason: 'Same faculty + shared connection via Nattapong', match: '95%' },
                      { name: 'Waranya Srisawat', reason: 'Similar career trajectory (Engineering → Tech)', match: '91%' },
                      { name: 'Somchai Jaidee', reason: '2nd-degree connection in Engineering network', match: '87%' },
                    ].map((rec, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--code-bg)', fontSize: '0.85rem' }}>
                        <div>
                          <span style={{ fontWeight: 500 }}>{rec.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>{rec.reason}</span>
                        </div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#22c55e', fontWeight: 700 }}>{rec.match}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Match / Confirmation */}
          {step === 3 && (
            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--card-bg)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Network Expanded!</h3>
              <div style={{ padding: '1rem', backgroundColor: 'var(--code-bg)', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>New connections established via BanditSystem:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {['Chatchai Phromrat (Engineering)', 'Waranya Srisawat (Data Science)', 'Somchai Jaidee (Business)'].map((name) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <span style={{ color: '#22c55e' }}>✓</span>
                      <span style={{ fontWeight: 500 }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--code-bg)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>NETWORK METRICS</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div><span style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>89</span><span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>connections</span></div>
                  <div><span style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>3</span><span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>new this session</span></div>
                  <div><span style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>4th</span><span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>network percentile</span></div>
                  <div><span style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>92%</span><span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>match accuracy</span></div>
                </div>
              </div>
              <button onClick={resetDemo} className="btn-secondary" style={{ alignSelf: 'center', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>← Start Over</button>
            </div>
          )}

          {step === 2 && showRecommendations && (
            <button onClick={() => setStep(3)} className="btn-primary" style={{ alignSelf: 'center', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              Connect with Suggestions →
            </button>
          )}
        </div>
      )}

      {/* ── TAB 3: API & TESTS ── */}
      {activeTab === 'api' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '1rem' }}>API ENDPOINTS (18 ROUTES)</span>
            {apiGroups.map((group) => (
              <div key={group.prefix} style={{ marginBottom: '0.75rem' }}>
                <button onClick={() => setExpandedPrefix(expandedPrefix === group.prefix ? null : group.prefix)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--code-bg)'}>
                  <span>/{group.prefix}/* ({group.endpoints.length} routes)</span>
                  <span style={{ transform: expandedPrefix === group.prefix ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
                </button>
                {expandedPrefix === group.prefix && (
                  <div style={{ border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
                    {group.endpoints.map((ep, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', borderBottom: i < group.endpoints.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '0.8rem', backgroundColor: 'var(--card-bg)' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '3px', backgroundColor: ep.method === 'GET' ? '#dbeafe' : '#dcfce7', color: ep.method === 'GET' ? '#1d4ed8' : '#15803d', minWidth: '42px', textAlign: 'center' }}>{ep.method}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', flexShrink: 0 }}>{ep.path}</span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginLeft: 'auto' }}>{ep.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '1rem' }}>TEST SUITE (50 PHPUNIT TESTS)</span>
            <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              {testFiles.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderBottom: i < testFiles.length - 1 ? '1px solid var(--border)' : 'none', backgroundColor: 'var(--card-bg)', fontSize: '0.85rem' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500, minWidth: '170px', color: 'var(--text-primary)' }}>{t.file}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flexGrow: 1 }}>{t.covers}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', minWidth: '30px', textAlign: 'right' }}>{t.count}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', backgroundColor: 'var(--code-bg)', borderTop: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                <span>TOTAL</span>
                <span>{testFiles.reduce((acc, t) => acc + t.count, 0)}</span>
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>KEY TESTED BEHAVIORS</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { case: 'Multi-Tier Registration & Verification', detail: 'Registration creates user with role + pending status. Email verification activates account. Document upload required for alumni role. Duplicate email rejected.' },
                { case: 'Graph Connection Lifecycle', detail: 'Send → pending → accept/reject lifecycle fully tested. Bidirectional edges maintained. Duplicate requests blocked. Cascade delete removes connections on user removal.' },
                { case: 'BanditSystem Scoring Algorithm', detail: 'Recommendation engine weights connections by faculty overlap, shared connections, and career trajectory similarity. Scores normalized to 0-100. Results cached in Memcached.' },
                { case: 'Profile Search with Caching', detail: 'Full-text search across 5 fields. Memcached stores top-100 results per query. Stale entries invalidated on profile update. Pagination enforces 20-per-page limit.' },
                { case: 'Career Path Analytics', detail: 'Work experience timeline validated for date ordering. Career recommendations based on similar-profile trajectory analysis. Admin report generation aggregates across faculty.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '0.85rem 1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--card-bg)' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>{item.case}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .step-label-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
};

export const AlumniDemoSection: React.FC = () => (
  <section id="alumni-demo" className="section">
    <div className="container">
      <span className="mono-tag">[DEMO]</span>
      <h2 style={{ marginBottom: '3rem' }}>Alumni Portal Platform</h2>
      <AlumniDemoContent />
    </div>
  </section>
);
