---
title: Barbershop Booking & Queue Management System
role: Lead Developer & Architect
description: A comprehensive scheduling and real-time barber queue management system featuring point-of-sale integration and a full-coverage Pest API test suite.
technologies: [SQL, REST APIs, PostgreSQL, GitHub Actions]
metrics:
  - label: QUEUE DISPATCH TIME
    value: < 15ms
  - label: TEST SUITE COVERAGE
    value: 100% (Pest)
  - label: POS TX LATENCY
    value: < 120ms
challenges:
  - problem: Preventing double-booking and concurrency conflicts during high-frequency appointment spikes.
    solution: Implemented strict pessimistic database locks on active booking transactions combined with multi-layered Eloquent validation rules.
  - problem: Ensuring real-time synchronization of queue counters for customer and barber dashboards.
    solution: Built an active polling and transactional event dispatch dispatcher that syncs frontend client slots with local database states instantaneously.
github: https://github.com/example/Barbershop-Booking-Queue-Management-System
demo: /projects/barbershop/demo
---

## System Architecture

```mermaid
flowchart TB
    Client[Client Browser - Blade UI]
    API[HTTP/JSON APIs]
    Laravel[Laravel Core App]
    Booking[BookingController]
    Barber[BarberController]
    POS[POSBarber Module]
    DB[(PostgreSQL)]
    Pest[Pest Test Suite]

    Client --> API --> Laravel
    Laravel --> Booking & Barber & POS
    Booking --> DB
    Barber --> DB
    POS --> DB
    DB -.-> Pest
```

The system follows a monolithic Laravel architecture with clear separation of concerns. The Blade frontend communicates with the Laravel backend through RESTful JSON APIs. Core business logic is distributed across three controllers, each responsible for a distinct domain: booking, barber management, and point-of-sale.

## System Flow

1. **Customer browses** available time slots via the Blade UI
2. **Booking request** is sent as a JSON POST to `BookingController`
3. **Pessimistic lock** is acquired on the target time slot row
4. **Validation layer** runs multi-layered Eloquent rules (no double-booking, shop hours, barber availability)
5. **Transaction commits** and queue position is assigned
6. **Event dispatcher** broadcasts the updated queue state
7. **Barber dashboard** polls the API and reflects changes in real-time

## User Flow

```mermaid
sequenceDiagram
    actor C as Customer
    actor B as Barber
    participant UI as Blade UI
    participant API as Laravel API
    participant DB as Database

    C->>UI: Browse available slots
    UI->>API: GET /api/slots
    API->>DB: Query available times
    DB-->>API: Available slots
    API-->>UI: Render slot grid
    C->>UI: Select time & book
    UI->>API: POST /api/bookings
    API->>DB: Acquire lock + validate
    DB-->>API: Confirm
    API-->>UI: Booking confirmed + queue position
    B->>UI: Open barber dashboard
    UI->>API: Poll /api/queue
    API-->>UI: Current queue state
```

## Challenges & Solutions

### Concurrency & Double-Booking

The primary technical challenge was preventing race conditions during high-frequency booking spikes. Multiple customers could request the same time slot within milliseconds.

**Solution:** Pessimistic database locks were implemented at the transaction level. Before any booking is created, the system acquires a `FOR UPDATE` lock on the target time slot row. Combined with Eloquent's validation pipeline, this guarantees that only one booking transaction succeeds per slot.

### Real-Time Queue Sync

Customer-facing queue counters and barber dashboards needed to reflect state changes instantly without expensive WebSocket infrastructure.

**Solution:** An active polling mechanism was paired with a transactional event dispatch system. Whenever a booking state changes, the dispatcher broadcasts the delta to all active frontend sessions. The polling interval is adaptive — shorter during peak hours, longer during idle periods — keeping server load predictable.
