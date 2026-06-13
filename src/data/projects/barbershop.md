---
id: barbershop
title: "Barbershop Booking & Queue Management System"
role: "Full-Stack Developer & Architect"
description: "A comprehensive scheduling and real-time barber queue management system featuring point-of-sale integration and a full-coverage Pest API test suite."
technologies: [blade, Bootstrap, SQL, REST APIs, GitHub]
metrics:
  - label: QUEUE DISPATCH TIME
    value: "< 15ms"
  - label: TEST SUITE COVERAGE
    value: "100% (Pest)"
  - label: POS TX LATENCY
    value: "< 120ms"
github: https://github.com/example/Barbershop-Booking-Queue-Management-System
challenges:
  - problem: "Preventing double-booking and concurrency conflicts during high-frequency appointment spikes."
    solution: "Implemented strict pessimistic database locks on active booking transactions combined with multi-layered Eloquent validation rules."
  - problem: "Ensuring real-time synchronization of queue counters for customer and barber dashboards."
    solution: "Built an active polling and transactional event dispatch dispatcher that syncs frontend client slots with local database states instantaneously."
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
    DB[(MySQL)]
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

1. Customer browses available time slots via the Blade UI
2. Booking request is sent as a JSON POST to BookingController
3. Pessimistic lock is acquired on the target time slot row
4. Validation layer runs multi-layered Eloquent rules (no double-booking, shop hours, barber availability)
5. Transaction commits and queue position is assigned
6. Event dispatcher broadcasts the updated queue state
7. Barber dashboard polls the API and reflects changes in real-time

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
