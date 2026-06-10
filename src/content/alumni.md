---
title: Alumni Portal Platform
role: Lead Full-Stack Developer
description: A scalable educational networking portal integrating career path workflows, automated flows, and a custom security routing module.
technologies: [TypeScript, REST APIs, SQL]
metrics:
  - label: CONNECTION RESOLVE
    value: < 25ms
  - label: ACTIVE PROFILES
    value: 50,000+
  - label: ASSET BUILD TIME
    value: < 1.8s
challenges:
  - problem: Generating custom networking recommendations across thousands of nested alumni graph connections without bottlenecking.
    solution: Implemented eager load relational policies combined with key-based Memcached indexes to fetch active graph branches in O(1) time.
  - problem: Ensuring secure multi-tier user registration and onboarding states across multiple directories.
    solution: Designed distinct database verification models integrated with standard route middleware to validate registration states securely.
github: https://github.com/example/alumni.app.local
demo: /projects/alumni/demo
---

## System Architecture

```mermaid
flowchart TB
    Client[Alumni Client - Vite/TS]
    API[API Paths]
    Bandit[Bandit System]
    RM[Route Profiling]
    MC[Matchmaking Core]
    DB[(Database Cluster)]
    Cache[Memcached Store]

    Client --> API --> Bandit
    Bandit --> RM & MC
    RM --> DB
    MC --> Cache
    MC --> DB
```

The alumni portal uses a Vite + TypeScript frontend communicating with a Bandit backend system. Bandit handles both route profiling (determining optimal data access patterns) and matchmaking (generating alumni connection recommendations). The database cluster stores all profile and relationship data while Memcached provides O(1) lookup for frequently-accessed graph branches.

## System Flow

1. **User authenticates** and their profile is loaded from the database cluster
2. **Bandit Matchmaking** evaluates the user's graph position
3. **Eager loading policies** fetch connected profiles in batch
4. **Memcached** serves cached relationship branches when available
5. **Recommendations** are ranked by connection strength and relevance
6. **Client renders** the networking dashboard

## User Flow

```mermaid
sequenceDiagram
    actor G as Graduate
    actor A as Admin
    participant C as Client
    participant B as Bandit System
    participant M as Memcached
    participant D as Database

    G->>C: Login & view profile
    C->>B: Request network recommendations
    B->>M: Check cached graph branches
    M-->>B: Cache hit/miss
    B->>D: Eager-load profile connections
    D-->>B: Connection data
    B-->>C: Ranked recommendations
    C-->>G: Networking dashboard

    A->>C: Moderate registrations
    C->>B: Verify pending users
    B->>D: Check verification models
    D-->>B: Registration state
    B-->>C: Approval status
    C-->>A: Moderation queue
```

## Challenges & Solutions

### Graph-Based Recommendations

The alumni network connects thousands of graduates through multiple relationship types (classmates, colleagues, mentors, shared interests). Naively traversing this graph for every recommendation request caused unacceptable latency.

**Solution:** Eager loading policies were implemented at the ORM level, pre-fetching relationship branches in batch. Key-based Memcached indexes store the most active graph branches (users who logged in within the last 30 days, recently updated profiles), enabling O(1) retrieval for the majority of requests.

### Multi-Tier Registration Security

The platform supports different user types (students, graduates, faculty, employers) each with distinct registration flows and verification requirements. Managing state across these tiers securely was complex.

**Solution:** Each user type has its own verification model in the database, linked to the core user record. Route middleware checks registration state at each step, ensuring no user can skip verification stages or access unauthorized flows. This approach kept the codebase modular while maintaining strict security boundaries.
