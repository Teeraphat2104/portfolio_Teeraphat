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
    prefix: 'public', endpoints: [
      { method: 'POST', path: '/api/public/home', desc: 'Homepage stats + recent activities' },
      { method: 'POST', path: '/api/public/categories', desc: 'List active categories' },
      { method: 'POST', path: '/api/public/activities', desc: 'Paginated activity list (filter by keyword/category/year)' },
      { method: 'POST', path: '/api/public/activities/detail/{id}', desc: 'Single activity detail' },
      { method: 'POST', path: '/api/public/search', desc: 'Search participants by student_id or name' },
      { method: 'POST', path: '/api/public/activities/{id}/track', desc: 'Increment view/download count' },
    ],
  },
  {
    prefix: 'admin/auth', endpoints: [
      { method: 'POST', path: '/api/admin/login', desc: 'Login (returns Sanctum token)' },
      { method: 'POST', path: '/api/admin/logout', desc: 'Revoke token' },
      { method: 'POST', path: '/api/admin/profile', desc: 'Get admin profile' },
    ],
  },
  {
    prefix: 'admin/categories', endpoints: [
      { method: 'POST', path: '/api/admin/categories/list', desc: 'List all categories' },
      { method: 'POST', path: '/api/admin/categories/store', desc: 'Create category' },
      { method: 'POST', path: '/api/admin/categories/update/{id}', desc: 'Update category' },
      { method: 'POST', path: '/api/admin/categories/delete/{id}', desc: 'Delete (409 if has activities)' },
    ],
  },
  {
    prefix: 'admin/activities', endpoints: [
      { method: 'POST', path: '/api/admin/activities/list', desc: 'Paginated list with keyword filter' },
      { method: 'POST', path: '/api/admin/activities/store', desc: 'Create with cover_image/pdf uploads' },
      { method: 'POST', path: '/api/admin/activities/update/{id}', desc: 'Update with file replacement' },
      { method: 'POST', path: '/api/admin/activities/delete/{id}', desc: 'Delete with file cleanup' },
      { method: 'POST', path: '/api/admin/activities/{id}/import-excel', desc: 'Import Excel participant list' },
      { method: 'POST', path: '/api/admin/activities/{id}/participants', desc: 'List participants' },
    ],
  },
  {
    prefix: 'admin/dashboard+reports', endpoints: [
      { method: 'POST', path: '/api/admin/dashboard', desc: 'Stats + category breakdown + top viewed' },
      { method: 'POST', path: '/api/admin/reports/activity', desc: 'Filtered activity report' },
      { method: 'POST', path: '/api/admin/reports/student', desc: 'Student participation report' },
      { method: 'POST', path: '/api/admin/reports/export', desc: 'Export report as .xlsx' },
    ],
  },
  {
    prefix: 'admin/settings', endpoints: [
      { method: 'POST', path: '/api/admin/settings', desc: 'Get all settings grouped' },
      { method: 'POST', path: '/api/admin/settings/update', desc: 'Bulk update (including images)' },
    ],
  },
];

const testFiles: TestFile[] = [
  { file: 'AdminAuthTest.php', covers: 'Login/logout/token lifecycle', count: 5 },
  { file: 'AdminActivityTest.php', covers: 'Activity CRUD + validation + filters', count: 6 },
  { file: 'AdminCategoryTest.php', covers: 'Category CRUD + delete protection', count: 6 },
  { file: 'PublicApiTest.php', covers: 'Home stats, pagination, filters, 404 handling', count: 7 },
];

export const UniversityDemoContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'api'>('overview');
  const [step, setStep] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expandedPrefix, setExpandedPrefix] = useState<string | null>(null);

  const categories = ['กีฬา', 'ศิลปะ', 'ดนตรี', 'วิชาการ', 'จิตอาสา', 'Cyber Security', 'ภาษา', 'วิทยาศาสตร์', 'เทคโนโลยี', 'วัฒนธรรม'];

  const resetDemo = () => {
    setStep(0); setLoggedIn(false); setTitle(''); setCategory('');
    setDate(''); setLocation(''); setSubmitted(false);
  };

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
              { label: 'CONTAINER STARTUP', value: '< 12s', desc: 'Docker 4-container orchestration' },
              { label: 'CONCURRENT QUERIES', value: '8,500 qps', desc: 'MySQL 8.0 throughput' },
              { label: 'API ENDPOINTS', value: '30 routes', desc: '6 public + 24 admin-protected' },
              { label: 'TEST COVERAGE', value: '24 tests', desc: 'PHPUnit with SQLite :memory:' },
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
              <ArchBox label="CLIENT BROWSER" badge="Presentation">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
                  {['Blade UI', 'jQuery AJAX', 'Bootstrap 5', 'Sneat Theme'].map((t) => (
                    <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{t}</span>
                  ))}
                </div>
              </ArchBox>
              <ArchArrow />
              <ArchBox label="LARAVEL 12 APPLICATION CORE" badge="API Layer">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {[
                    { name: 'Activity', desc: 'CRUD + Excel' },
                    { name: 'Category', desc: 'CRUD' },
                    { name: 'Dashboard', desc: 'Reports' },
                    { name: 'Auth / Settings', desc: 'Sanctum' },
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
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>PhpSpreadsheet</span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>Maatwebsite Excel</span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>No timestamps</span>
                </div>
              </ArchBox>
              <ArchArrow />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
                <ArchBox label="MySQL 8.0 Database" badge="Data">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem' }}>
                    {['5 application tables', 'categories (cover image)', 'activities (file uploads + counters)', 'activity_participants (unique per student)', 'students (master records)', 'settings (key-value store)'].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-primary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </ArchBox>
                <ArchBox label="PHPUnit Test Suite" badge="Quality">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem' }}>
                    {['24 tests across 4 files', 'SQLite :memory: database', 'Admin auth + token lifecycle', 'Activity CRUD + validation', 'Category delete protection', 'Public API pagination/filter'].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-primary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </ArchBox>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '2px', letterSpacing: '0.1em' }}>
                30 API ENDPOINTS • 24 PHPUNIT TESTS
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>DOCKER STACK</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--card-bg)' }}>
              {[
                { name: 'nginx:alpine', port: '8000 → 80' },
              { name: 'PHP 8.2-FPM', port: '9000' },
              { name: 'MySQL 8.0', port: '3306' },
              { name: 'phpMyAdmin', port: '8080:80' },
            ].map((svc, i) => (
              <React.Fragment key={svc.name}>
                <div style={{ textAlign: 'center', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--code-bg)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)' }}>{svc.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{svc.port}</div>
                </div>
                {i < 3 && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>TECHNOLOGY STACK</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Laravel 12', 'PHP 8.2', 'MySQL 8.0', 'Docker', 'Nginx', 'Bootstrap 5', 'Sneat Theme', 'PhpSpreadsheet', 'PHPUnit', 'Sanctum', 'jQuery', 'Boxicons'].map((tech) => (
              <span key={tech} style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--text-secondary)', backgroundColor: 'var(--card-bg)' }}>{tech}</span>
            ))}
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>KEY FEATURES</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Activity CRUD with File Uploads', desc: 'Create activities with cover images, PDF attachments, and Excel participant lists. View/download counters track engagement.' },
              { title: 'Excel Import Pipeline', desc: 'Upload .xlsx/.xls/.csv → PhpSpreadsheet parses headers → upsert into participants (dedup by activity_id + student_id) → update student master records.' },
              { title: 'Admin Dashboard & Reports', desc: 'Stat cards, recent activities, category breakdown, most viewed/downloaded. 4 report types (Activity, Student, Faculty, Yearly) with Excel export.' },
              { title: 'Docker 4-Container Setup', desc: 'nginx:alpine → PHP 8.2-FPM → MySQL 8.0 + phpMyAdmin. OPCache enabled, gzip compression, 1-year static asset caching, 20MB upload limit.' },
              { title: 'Student History Search', desc: 'Public search by student_id or name returns full participation history across all activities. No registration required for lookup.' },
              { title: 'Settings System', desc: 'Key-value store with groups (general, appearance, contact, footer). Configurable site name, colors, hero text, logo/favicon upload.' },
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
          {['Login', 'Dashboard', 'Create Activity', 'Confirm'].map((label, i) => (
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, textAlign: 'center' }}>Admin Login</h3>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.35rem' }}>EMAIL</label>
              <input type="email" defaultValue="admin@example.com" style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} />
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Admin Dashboard</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {[
                { label: 'ACTIVITIES', value: '9' },
                { label: 'CATEGORIES', value: '10' },
                { label: 'PARTICIPANTS', value: '45' },
                { label: 'TOTAL VIEWS', value: '156' },
              ].map((s) => (
                <div key={s.label} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--code-bg)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--card-bg)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>RECENT ACTIVITIES</span>
              {[
                { name: 'กีฬาสีสัมพันธ์ ครั้งที่ 37', cat: 'กีฬา', date: '2026-03-15', views: 42 },
                { name: 'แข่งขันทักษะความปลอดภัยทางไซเบอร์', cat: 'Cyber Security', date: '2026-03-10', views: 38 },
                { name: 'ค่ายอาสาพัฒนาชนบท', cat: 'จิตอาสา', date: '2026-02-28', views: 31 },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 500 }}>{a.name}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '3px', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>{a.cat}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{a.date}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{a.views} views</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              Create New Activity →
            </button>
          </div>
        )}

        {/* Step 2: Create Activity */}
        {step === 2 && loggedIn && (
          <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Create Activity</h3>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.3rem' }}>TITLE</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} placeholder="Activity name" />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.3rem' }}>CATEGORY</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {categories.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid', borderColor: category === c ? 'var(--text-primary)' : 'var(--border)', backgroundColor: category === c ? 'var(--accent)' : 'transparent', color: category === c ? 'var(--bg)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.3rem' }}>DATE</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.3rem' }}>LOCATION</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--sans)', outline: 'none' }} placeholder="อาคารเรียนรวม ชั้น 3" />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button onClick={() => { if (title && category) { setSubmitted(true); setStep(3); } }} disabled={!title || !category} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', opacity: (!title || !category) ? 0.5 : 1 }}>Publish Activity</button>
              <button onClick={() => setStep(1)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>← Back</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && submitted && (
          <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--card-bg)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Activity Published!</h3>
            <div style={{ padding: '1rem', backgroundColor: 'var(--code-bg)', borderRadius: '6px', border: '1px solid var(--border)', textAlign: 'left', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-tertiary)' }}>Title</span><span style={{ fontWeight: 500 }}>{title}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-tertiary)' }}>Category</span><span style={{ fontWeight: 500 }}>{category}</span></div>
              {date && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-tertiary)' }}>Date</span><span style={{ fontWeight: 500, fontFamily: 'var(--mono)' }}>{date}</span></div>}
              {location && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-tertiary)' }}>Location</span><span style={{ fontWeight: 500 }}>{location}</span></div>}
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--code-bg)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>EXCEL IMPORT READY</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                Upload .xlsx participant roster → PhpSpreadsheet parses → upsert with dedup
              </div>
            </div>
            <button onClick={resetDemo} className="btn-secondary" style={{ alignSelf: 'center', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>← Start Over</button>
          </div>
        )}
      </div>
    )}

    {/* ── TAB 3: API & TESTS ── */}
    {activeTab === 'api' && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '1rem' }}>API ENDPOINTS (30 ROUTES)</span>
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
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '3px', backgroundColor: '#dcfce7', color: '#15803d', minWidth: '42px', textAlign: 'center' }}>{ep.method}</span>
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
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '1rem' }}>TEST SUITE (24 PHPUNIT TESTS)</span>
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
              { case: 'Admin Auth & Token Lifecycle', detail: 'Login returns Sanctum token. Protected routes reject unauthenticated requests. Logout revokes token. Profile fetch returns admin data.' },
              { case: 'Category Delete Protection', detail: 'Categories with existing activities return 409 Conflict. Empty categories can be deleted. Validation enforces required fields.' },
              { case: 'Activity CRUD with File Uploads', detail: 'Create/update/delete activities with cover images. Keyword filter returns only matching activities. Valid category required.' },
              { case: 'Public API Pagination & Filtering', detail: 'Home endpoint returns stats totals. Only active categories listed. Activities filterable by keyword, category, and year. Inactive activities return 404.' },
              { case: 'Excel Import Dedup Pipeline', detail: 'PhpSpreadsheet parses uploaded xlsx/xls/csv. Duplicate (activity_id + student_id) entries upserted. Student master records auto-created on import.' },
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

export const UniversityDemoSection: React.FC = () => (
  <section id="university-demo" className="section">
    <div className="container">
      <span className="mono-tag">[DEMO]</span>
      <h2 style={{ marginBottom: '3rem' }}>University Database System</h2>
      <UniversityDemoContent />
    </div>
  </section>
);
