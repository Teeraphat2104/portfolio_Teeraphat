import React, { useState } from 'react';

interface Barber { name: string; specialty: string; rating: number; }
interface Service { name: string; price: number; duration: number; }

interface Shop {
  id: number;
  name: string;
  location: string;
  rating: number;
  hours: string;
  image: string;
  barbers: Barber[];
  services: Service[];
  queue: number;
}

const shops: Shop[] = [
  {
    id: 1,
    name: 'Urban Cuts',
    location: 'Sukhumvit, Bangkok',
    rating: 4.5,
    hours: '09:00 - 20:00',
    image: 'UC',
    queue: 3,
    barbers: [
      { name: 'สมชาย ช่างตัดผม', specialty: 'Classic & Fade', rating: 4.8 },
      { name: 'Ananya', specialty: 'Modern Styles', rating: 4.6 },
      { name: 'Pichai', specialty: 'Beard & Mustache', rating: 4.7 },
    ],
    services: [
      { name: 'Haircut', price: 200, duration: 30 },
      { name: 'Haircut + Shampoo', price: 300, duration: 40 },
      { name: 'Hair Styling', price: 350, duration: 45 },
      { name: 'Beard Trim', price: 150, duration: 20 },
    ],
  },
  {
    id: 2,
    name: 'Classic Barber Co.',
    location: 'Silom, Bangkok',
    rating: 4.8,
    hours: '08:00 - 19:00',
    image: 'CB',
    queue: 5,
    barbers: [
      { name: 'Somsak', specialty: 'Vintage Cuts', rating: 4.9 },
      { name: 'Malee', specialty: 'Scissor Work', rating: 4.7 },
      { name: 'Kriangkrai', specialty: 'Hot Towel Shave', rating: 4.8 },
    ],
    services: [
      { name: 'Classic Haircut', price: 250, duration: 35 },
      { name: 'Hot Towel Shave', price: 400, duration: 50 },
      { name: 'Hair + Beard Combo', price: 500, duration: 60 },
      { name: 'Kids Haircut', price: 180, duration: 25 },
    ],
  },
  {
    id: 3,
    name: 'The Grooming Lounge',
    location: 'Ngamwongwan, Nonthaburi',
    rating: 4.3,
    hours: '10:00 - 21:00',
    image: 'GL',
    queue: 1,
    barbers: [
      { name: 'Nattapong', specialty: 'Trendy Styles', rating: 4.5 },
      { name: 'Siriporn', specialty: 'Color & Treat', rating: 4.4 },
    ],
    services: [
      { name: 'Haircut', price: 180, duration: 30 },
      { name: 'Hair Coloring', price: 600, duration: 90 },
      { name: 'Scalp Treatment', price: 350, duration: 45 },
    ],
  },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const testFiles = [
  { file: 'HealthCheckTest.php', covers: 'GET /api/test', count: 1 },
  { file: 'BarberApiTest.php', covers: 'Barber CRUD endpoints', count: 23 },
  { file: 'ServiceApiTest.php', covers: 'Service CRUD endpoints', count: 25 },
  { file: 'ShopApiTest.php', covers: 'Shop CRUD + geolocation', count: 26 },
  { file: 'BookingApiTest.php', covers: 'Booking CRUD + queue + double-booking', count: 37 },
  { file: 'OverviewApiTest.php', covers: 'Dashboard stats + revenue', count: 14 },
];

const apiGroups = [
  {
    prefix: 'shop', endpoints: [
      { method: 'GET', path: '/api/shop/all', desc: 'List all shops' },
      { method: 'POST', path: '/api/shop/nearby', desc: 'Find nearby shops (Haversine)' },
      { method: 'POST', path: '/api/shop/create', desc: 'Create a shop' },
      { method: 'GET', path: '/api/shop/{id}', desc: 'Get shop details' },
      { method: 'POST', path: '/api/shop/{id}/update', desc: 'Update shop' },
      { method: 'POST', path: '/api/shop/{id}/delete', desc: 'Soft-delete shop' },
    ],
  },
  {
    prefix: 'booking', endpoints: [
      { method: 'POST', path: '/api/booking/create', desc: 'Create booking (with double-booking check)' },
      { method: 'POST', path: '/api/booking/my-bookings', desc: 'User bookings + queue position' },
      { method: 'POST', path: '/api/booking/shop-bookings', desc: 'Shop owner bookings' },
      { method: 'POST', path: '/api/booking/{id}/status', desc: 'Update booking status' },
      { method: 'POST', path: '/api/booking/{id}/cancel', desc: 'Cancel booking' },
    ],
  },
  {
    prefix: 'admin', endpoints: [
      { method: 'POST', path: '/api/admin/dashboard-stats', desc: 'System-wide stats' },
      { method: 'POST', path: '/api/admin/users', desc: 'Manage users' },
      { method: 'POST', path: '/api/admin/shops', desc: 'Manage shops' },
      { method: 'POST', path: '/api/admin/bookings', desc: 'Manage all bookings' },
    ],
  },
];

const stepLabels = ['Browse Shops', 'Shop Detail', 'Book', 'Queue'];

export const BarbershopDemoContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'api'>('overview');
  const [step, setStep] = useState(0);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'confirmed' | 'completed'>('idle');
  const [queuePos, setQueuePos] = useState(0);
  const [expandedPrefix, setExpandedPrefix] = useState<string | null>(null);

  const resetDemo = () => {
    setStep(0);
    setSelectedShop(null);
    setSelectedBarber(null);
    setSelectedService(null);
    setSelectedTime(null);
    setBookingStatus('idle');
    setQueuePos(0);
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setStep(1);
  };

  const handleBook = () => {
    setStep(3);
    setBookingStatus('booking');
    const pos = Math.floor(Math.random() * 3) + 1;
    setQueuePos(pos);

    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 1500);

    setTimeout(() => {
      setBookingStatus('completed');
    }, 6000);
  };

  return (
    <>
      {/* Tab Navigation */}
      <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            gap: 0,
            marginBottom: '2.5rem',
          }}
        >
          {(['overview', 'demo', 'api'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab !== 'demo') resetDemo();
              }}
              style={{
                flex: 1,
                maxWidth: '200px',
                padding: '0.75rem 1.5rem',
                fontFamily: 'var(--mono)',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid var(--text-primary)' : '2px solid transparent',
                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-tertiary)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              {tab === 'overview' ? '◈ OVERVIEW' : tab === 'demo' ? '▶ LIVE DEMO' : '⎔ API & TESTS'}
            </button>
          ))}
        </div>

        {/* ────────────── TAB 1: OVERVIEW ────────────── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Key Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
              }}
            >
              {[
                { label: 'QUEUE DISPATCH', value: '< 15ms', desc: 'Average queue processing latency' },
                { label: 'TEST COVERAGE', value: '100%', desc: '126 Pest API tests' },
                { label: 'POS LATENCY', value: '< 120ms', desc: 'Point-of-sale transaction time' },
                { label: 'CONCURRENT QPS', value: '8,500', desc: 'Peak database throughput' },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    backgroundColor: 'var(--card-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
                    {m.label}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {m.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Architecture Diagram */}
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>
                SYSTEM ARCHITECTURE
              </span>
              <div
                style={{
                  backgroundColor: 'var(--code-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                  overflowX: 'auto',
                }}
              >
                <pre style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', lineHeight: 1.5, color: 'var(--text-primary)', margin: 0 }}>
{`┌──────────────────────────────────────────────────────────┐
│                   CLIENT BROWSER (Blade + Bootstrap)        │
│                   jQuery AJAX  •  Leaflet Maps              │
│                   FullCalendar  •  Flatpickr                │
└────────────────────────┬───────────────────────────────────┘
                         │ 28 REST API Endpoints (JSON)
                         ▼
┌──────────────────────────────────────────────────────────┐
│               LARAVEL 12 APPLICATION CORE                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ Booking  │ │  Barber  │ │  Shop    │ │  Auth/Admin  │  │
│  │ Controller│ │Controller│ │Controller│ │  Controllers │  │
│  └──────────┘ └──────────┘ └──────────┘ └─────────────┘  │
│       │            │           │              │            │
│       ▼            ▼           ▼              ▼            │
│  ┌───────────────────────────────────────────────────┐     │
│  │         Eloquent ORM  •  Validation  •  SoftDeletes│     │
│  │         Role Auth (customer/barber/admin)          │     │
│  └───────────────────────────────────────────────────┘     │
└────────────────────────┬───────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
┌──────────────────────┐  ┌──────────────────────┐
│   PostgreSQL DB       │  │   Pest Test Suite    │
│   (Haversine Index)   │  │   (126 tests, 6 files)│
│   • shops             │  │   • CRUD validation   │
│   • barbers           │  │   • Double-booking    │
│   • services          │  │   • Status transitions│
│   • bookings          │  │   • Revenue calc      │
│   • notifications     │  │   • Geo queries       │
└──────────────────────┘  └──────────────────────┘`}
                </pre>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>
                TECHNOLOGY STACK
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Laravel 12', 'PHP 8.2', 'PostgreSQL', 'Bootstrap 5', 'jQuery', 'Leaflet.js', 'FullCalendar 6', 'Flatpickr', 'SweetAlert2', 'Pest PHP', 'Tabler Icons', 'Vite', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.7rem',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--card-bg)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>
                KEY FEATURES
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {[
                  { title: 'Role-Based Dashboards', desc: 'Customer booking view, shop owner management panel, admin oversight — all from a single codebase with middleware-gated routes.' },
                  { title: 'Geolocation & Haversine', desc: 'Leaflet.js maps with Haversine formula distance calculation for finding nearby shops within a configurable radius.' },
                  { title: 'Double-Booking Prevention', desc: 'Server-side validation prevents overlapping appointments for the same barber at the same time, tested with 3 dedicated Pest tests.' },
                  { title: 'Real-Time Queue Position', desc: 'Dynamic queue position calculated per shop based on booking_time ordering, displayed live on customer dashboards.' },
                  { title: 'Smart Notification System', desc: 'Custom notifications for booking lifecycle events (created, confirmed, completed, cancelled) with unread badge count.' },
                  { title: '100% Pest Test Coverage', desc: '126 comprehensive tests covering CRUD validation, business rules, edge cases, and database integrity across all 28 API endpoints.' },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {f.title}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {f.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ────────────── TAB 2: LIVE DEMO ────────────── */}
        {activeTab === 'demo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Step Progress */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              {stepLabels.map((label, i) => (
                <React.Fragment key={label}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      opacity: i <= step ? 1 : 0.3,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: i <= step ? 'var(--accent)' : 'transparent',
                        border: '1px solid',
                        borderColor: i <= step ? 'var(--accent)' : 'var(--border)',
                        color: i <= step ? 'var(--bg)' : 'var(--text-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.7rem',
                        color: i <= step ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        display: 'none',
                      }}
                      className="step-label-desktop"
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <span
                      style={{
                        width: '24px',
                        height: '1px',
                        backgroundColor: i < step ? 'var(--accent)' : 'var(--border)',
                        transition: 'background-color 0.3s',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 0: Browse Shops */}
            {step === 0 && (
              <div>
                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Select a barbershop to start the booking experience.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  {shops.map((shop) => (
                    <div
                      key={shop.id}
                      onClick={() => handleShopSelect(shop)}
                      style={{
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: 'var(--card-bg)',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--text-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--code-bg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--mono)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border)',
                          marginBottom: '1rem',
                        }}
                      >
                        {shop.image}
                      </div>

                      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {shop.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
                        {shop.location}
                      </span>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        <span>⭐ {shop.rating}</span>
                        <span style={{ fontFamily: 'var(--mono)' }}>{shop.hours}</span>
                      </div>

                      <div
                        style={{
                          marginTop: '0.75rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Queue: <strong style={{ color: 'var(--text-primary)' }}>{shop.queue}</strong>
                        </span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          View Shop →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Shop Detail */}
            {step === 1 && selectedShop && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{selectedShop.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {selectedShop.location} • ⭐ {selectedShop.rating} • {selectedShop.hours}
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    Book Appointment →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-2">
                  {/* Barbers */}
                  <div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>
                      BARBERS
                    </span>
                    {selectedShop.barbers.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderBottom: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 500, fontSize: '0.85rem', display: 'block' }}>{b.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{b.specialty}</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>⭐ {b.rating}</span>
                      </div>
                    ))}
                  </div>

                  {/* Services */}
                  <div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>
                      SERVICES
                    </span>
                    {selectedShop.services.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderBottom: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{s.name}</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>
                            ฿{s.price}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{s.duration} min</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setStep(0); setSelectedShop(null); }}
                  className="btn-secondary"
                  style={{ alignSelf: 'flex-start', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  ← Back to Shops
                </button>
              </div>
            )}

            {/* Step 2: Book */}
            {step === 2 && selectedShop && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  Book at {selectedShop.name}
                </h3>

                {/* Select Barber */}
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>
                    SELECT BARBER
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedShop.barbers.map((b, i) => (
                      <label
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: selectedBarber?.name === b.name ? 'var(--text-primary)' : 'var(--border)',
                          backgroundColor: selectedBarber?.name === b.name ? 'var(--code-bg)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          fontSize: '0.85rem',
                        }}
                      >
                        <input
                          type="radio"
                          name="barber"
                          checked={selectedBarber?.name === b.name}
                          onChange={() => setSelectedBarber(b)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <span style={{ flexGrow: 1, fontWeight: 500 }}>{b.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{b.specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Select Service */}
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>
                    SELECT SERVICE
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedShop.services.map((s, i) => (
                      <label
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: selectedService?.name === s.name ? 'var(--text-primary)' : 'var(--border)',
                          backgroundColor: selectedService?.name === s.name ? 'var(--code-bg)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          fontSize: '0.85rem',
                        }}
                      >
                        <input
                          type="radio"
                          name="service"
                          checked={selectedService?.name === s.name}
                          onChange={() => setSelectedService(s)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <span style={{ flexGrow: 1, fontWeight: 500 }}>{s.name}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                          ฿{s.price}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{s.duration}m</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Select Time */}
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>
                    SELECT TIME
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.75rem',
                          padding: '0.4rem 0.7rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: selectedTime === t ? 'var(--text-primary)' : 'var(--border)',
                          backgroundColor: selectedTime === t ? 'var(--accent)' : 'transparent',
                          color: selectedTime === t ? 'var(--bg)' : 'var(--text-primary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={handleBook}
                    disabled={!selectedBarber || !selectedService || !selectedTime}
                    className="btn-primary"
                    style={{
                      padding: '0.6rem 1.2rem',
                      opacity: !selectedBarber || !selectedService || !selectedTime ? 0.5 : 1,
                    }}
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                    style={{ padding: '0.6rem 1.2rem' }}
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Queue / Confirmation */}
            {step === 3 && selectedShop && selectedBarber && selectedService && selectedTime && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '2rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--card-bg)',
                  textAlign: 'center',
                  maxWidth: '500px',
                  margin: '0 auto',
                }}
              >
                {bookingStatus === 'booking' && (
                  <>
                    <div className="booking-spinner" />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      PROCESSING BOOKING...
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                      Checking availability & securing your slot
                    </span>
                  </>
                )}

                {(bookingStatus === 'confirmed' || bookingStatus === 'completed') && (
                  <>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Booking Confirmed!</h3>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem',
                        width: '100%',
                        textAlign: 'left',
                        padding: '1rem',
                        backgroundColor: 'var(--code-bg)',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span style={{ color: 'var(--text-tertiary)' }}>Shop</span>
                      <span style={{ fontWeight: 500 }}>{selectedShop.name}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>Barber</span>
                      <span style={{ fontWeight: 500 }}>{selectedBarber.name}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>Service</span>
                      <span style={{ fontWeight: 500 }}>{selectedService.name}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>Time</span>
                      <span style={{ fontWeight: 500, fontFamily: 'var(--mono)' }}>{selectedTime}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>Price</span>
                      <span style={{ fontWeight: 600, fontFamily: 'var(--mono)' }}>฿{selectedService.price}</span>
                    </div>

                    {/* Queue Position */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        width: '100%',
                        backgroundColor: 'var(--code-bg)',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
                        YOUR QUEUE POSITION
                      </span>
                      <div
                        className="queue-pulse"
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        #{queuePos}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {queuePos === 1 ? "You're next!" : `Approx. ${queuePos * 30} min wait`}
                      </span>
                    </div>

                    {/* Status Lifecycle */}
                    <div style={{ width: '100%' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem' }}>
                        STATUS LIFECYCLE
                      </span>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {['PENDING', 'CONFIRMED', 'COMPLETED'].map((stage, i) => {
                          const isPast =
                            (i === 0) ||
                            (i === 1) ||
                            (i === 2 && bookingStatus === 'completed');
                          return (
                            <span
                              key={stage}
                              style={{
                                fontFamily: 'var(--mono)',
                                fontSize: '0.7rem',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '4px',
                                border: '1px solid',
                                borderColor: isPast ? 'var(--text-primary)' : 'var(--border)',
                                backgroundColor: isPast ? 'var(--accent)' : 'transparent',
                                color: isPast ? 'var(--bg)' : 'var(--text-tertiary)',
                                transition: 'all 0.3s',
                              }}
                            >
                              {stage}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {bookingStatus === 'completed' && (
                      <div style={{ fontSize: '0.85rem', color: '#22c55e', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                        ✓ SERVICE COMPLETED
                      </div>
                    )}

                    <button onClick={resetDemo} className="btn-secondary" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      ← Start Over
                    </button>
                  </>
                )}
              </div>
            )}

            {bookingStatus === 'confirmed' && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textAlign: 'center', fontFamily: 'var(--mono)' }}>
                ⏱ Status auto-advances to COMPLETED after a moment (simulated)
              </p>
            )}
          </div>
        )}

        {/* ────────────── TAB 3: API & TESTS ────────────── */}
        {activeTab === 'api' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* API Endpoints */}
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '1rem' }}>
                API ENDPOINTS (28 ROUTES)
              </span>
              {apiGroups.map((group) => (
                <div key={group.prefix} style={{ marginBottom: '0.75rem' }}>
                  <button
                    onClick={() => setExpandedPrefix(expandedPrefix === group.prefix ? null : group.prefix)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 1rem',
                      backgroundColor: 'var(--code-bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--code-bg)'}
                  >
                    <span>/{group.prefix}/* ({group.endpoints.length} routes)</span>
                    <span style={{ transform: expandedPrefix === group.prefix ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                      ▼
                    </span>
                  </button>
                  {expandedPrefix === group.prefix && (
                    <div
                      style={{
                        border: '1px solid var(--border)',
                        borderTop: 'none',
                        borderRadius: '0 0 6px 6px',
                        overflow: 'hidden',
                      }}
                    >
                      {group.endpoints.map((ep, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.5rem 1rem',
                            borderBottom: i < group.endpoints.length - 1 ? '1px solid var(--border)' : 'none',
                            fontSize: '0.8rem',
                            backgroundColor: 'var(--card-bg)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--mono)',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '3px',
                              backgroundColor: ep.method === 'GET' ? '#dbeafe' : ep.method === 'POST' ? '#dcfce7' : '#fef3c7',
                              color: ep.method === 'GET' ? '#1d4ed8' : ep.method === 'POST' ? '#15803d' : '#92400e',
                              minWidth: '42px',
                              textAlign: 'center',
                            }}
                          >
                            {ep.method}
                          </span>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                            {ep.path}
                          </span>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginLeft: 'auto' }}>
                            {ep.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Test Suite */}
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '1rem' }}>
                TEST SUITE (126 PEST TESTS)
              </span>
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                {testFiles.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem 1rem',
                      borderBottom: i < testFiles.length - 1 ? '1px solid var(--border)' : 'none',
                      backgroundColor: 'var(--card-bg)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        minWidth: '180px',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {t.file}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flexGrow: 1 }}>
                      {t.covers}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        minWidth: '30px',
                        textAlign: 'right',
                      }}
                    >
                      {t.count}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--code-bg)',
                    borderTop: '1px solid var(--border)',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  <span>TOTAL</span>
                  <span>{testFiles.reduce((acc, t) => acc + t.count, 0)}</span>
                </div>
              </div>
            </div>

            {/* Test Highlights */}
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.75rem' }}>
                KEY TESTED BEHAVIORS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { case: 'Double-Booking Prevention', detail: 'Same barber + same time → 409 Conflict. Different barber same time → 201 Created.' },
                  { case: 'Status Transition Rules', detail: 'Pending → Confirmed → Completed. Cancelled bookings cannot be re-activated. Completed bookings cannot be cancelled.' },
                  { case: 'Revenue Calculation', detail: 'Only completed bookings contribute to revenue totals via service price aggregation.' },
                  { case: 'Geolocation Query (Haversine)', detail: 'Nearby shops filtered by raw SQL Haversine formula with configurable radius parameter.' },
                  { case: 'Soft Delete Cascade', detail: 'Deleting a user cascades to shops → barbers/services/bookings with soft delete integrity.' },
                  { case: 'CRUD Validation Matrix', detail: 'Required fields, max length, enum values, email format, and partial update handling across all 28 endpoints.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      backgroundColor: 'var(--card-bg)',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>
                      {item.case}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demo-specific animations */}
        <style>{`
          .booking-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid var(--border);
            border-top-color: var(--text-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          .queue-pulse {
            animation: queuePulse 2s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes queuePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @media (max-width: 768px) {
            .step-label-desktop {
              display: none !important;
            }
          }
        `}</style>
    </>
  );
};

export const BarbershopDemoSection: React.FC = () => (
  <section id="barbershop-demo" className="section">
    <div className="container">
      <span className="mono-tag">[02 / DEMO]</span>
      <h2 style={{ marginBottom: '3rem' }}>
        Barbershop Booking & Queue Management System
      </h2>
      <BarbershopDemoContent />
    </div>
  </section>
);
