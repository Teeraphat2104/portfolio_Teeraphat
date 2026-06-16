---
id: university
title: "University Database System"
role: "Full-Stack Developer & Architect"
description: "A full-featured PDF management and archiving platform for university academic documents, featuring role-based access control, dual file storage strategy, and Thai language support — built with Next.js 16, MongoDB, and Prisma."
technologies: [Next.js 16, TypeScript, MongoDB, Prisma, Docker, NextAuth v5, Tailwind CSS]
metrics:
  - label: STORAGE STRATEGY
    value: "Dual (Vercel Blob / Local)"
  - label: AUTH TIERS
    value: 3-Tier RBAC
  - label: FILE LIMIT
    value: 50 MB Configurable
  - label: SEARCH
    value: Regex Multi-Field
github: https://github.com/example/university-database-system
demo: https://university-database-system.vercel.app/
challenges:
  - problem: "MongoDB lacks native JOINs, making relational queries with Prisma's MongoDB provider limited compared to SQL providers."
    solution: "Used embedded ObjectId references with Prisma's `include` for eager-loading related documents across User to Pdf and Category to Pdf relationships."
  - problem: "The system must work both in development (no cloud blob token) and production (Vercel Blob), requiring a transparent fallback strategy."
    solution: "Abstracted storage behind a single `filePath` field; download logic checks if path is a blob URL or local path, then redirects or streams accordingly."
  - problem: "Permissions must be enforced at middleware, Server Components, API routes, and client UI — four separate layers with consistent rules."
    solution: "Four-layer enforcement — proxy middleware blocks routes, Server Actions check auth() before mutations, API routes verify roles, client components conditionally render UI from session props."
  - problem: "Thai characters require specific font loading, and MongoDB text search doesn't support Thai word segmentation natively."
    solution: "Loaded Noto Sans Thai via next/font, used regex-based matching on title/description instead of MongoDB text indexes to avoid Thai segmentation complexity."
---

# University Database System — Architecture

A production-grade PDF management platform purpose-built for university academic document workflows. This document covers system architecture, data flow, user roles, and design decisions.

---

## Project Architecture

### High-Level Structure

```cmd
university-database-system/
├── prisma/             # Database schema + seed
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router (pages + API routes)
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Server Actions, auth config, utilities
├── uploads/            # Local file storage (fallback)
├── nginx/              # Reverse proxy + SSL config
├── docker-compose.yml  # Multi-service orchestration
├── Dockerfile          # App container
└── components.json     # shadcn/ui config
```

### Route Grouping

| Group | Path | Auth Required | Description |
|---|---|---|---|
| `(app)/` | `/dashboard`, `/pdfs`, `/categories`, `/admins`, `/settings` | Yes (Editor/Admin) | Authenticated app shell with sidebar + topbar |
| `(auth)/` | `/login` | No | Login page (redirects to dashboard if already authenticated) |
| `browse/` | `/browse/categories`, `/browse/pdfs/[id]`, `/browse/search` | No | Public-facing browse and search |
| `api/` | `/api/auth/*`, `/api/pdf/*`, `/api/category/*` | Mixed | Route handlers for AJAX calls and file serving |

### Data-Fetching Strategy (Hybrid)

The project uses three complementary patterns:

- **Server Components (RSC)** — Direct `prisma` calls during server-side rendering for initial page loads. No HTTP round-trip.
- **Server Actions** — `"use server"` functions for mutations (create, update, delete). Called from client components via `formAction` or `useActionState`. Mutations call `revalidatePath()` to refresh cached pages.
- **Fetch API (Route Handlers)** — Traditional `fetch()` calls to `/api/*` routes for non-form interactions (delete confirmation, modal data loading, file downloads).

### Route Protection

Middleware (`src/proxy.ts`) uses NextAuth's `authorized` callback to enforce three tiers:

- **Public** — Accessible without authentication (`/`, `/browse/*`, `/login`)
- **Editor** — Requires valid session with `role: "editor"` or `"admin"` (`/dashboard`, `/pdfs/*`)
- **Admin** — Requires `role: "admin"` (`/categories`, `/admins`, `/settings`)

---

## Tech Stack

**Core Frameworks:** Next.js 16, React 19, TypeScript 5, Node.js 20 (Alpine)

**Styling & UI:** Tailwind CSS v4, shadcn/ui, @base-ui/react, @tabler/icons-react, lucide-react, framer-motion, Geist/Geist_Mono/Noto_Sans_Thai via next/font

**Database & ORM:** MongoDB Atlas, Prisma, @auth/prisma-adapter

**Authentication:** next-auth v5 with Credentials provider, bcryptjs, JWT session strategy

**File Storage:** Vercel Blob (primary with @vercel/blob), Local filesystem (fallback to `uploads/` directory)

**Forms & Validation:** react-hook-form, @hookform/resolvers (Zod integration), zod, react-dropzone

**Infrastructure:** Docker + Dockerfile, nginx reverse proxy with SSL, docker-compose

---

## System Architecture

### Component Diagram

```mermaid
flowchart TB
    subgraph Client["Browser (Client)"]
        UI[Next.js App Shell]
    end

    subgraph Proxy["Reverse Proxy"]
        NGINX["nginx\nSSL + HTTP/2"]
    end

    subgraph Server["Next.js Server (App Router)"]
        direction TB
        Prisma["Prisma ORM"]
        Auth["NextAuth v5\nCredentials + JWT"]
        Storage["File Storage"]
        Blob["Vercel Blob"]
        LocalFS["Local FS"]
        Storage --- Blob
        Storage --- LocalFS
    end

    subgraph DB["MongoDB Atlas"]
        Mongo[(MongoDB)]
    end

    Client --> NGINX
    NGINX --> Server
    Server --> DB
```

### Authentication Flow

```mermaid
flowchart TD
    A[Login Form] --> B[Server Action]
    B --> C[NextAuth authorize]
    C --> D{Credentials valid?}
    D -->|Yes| E[Generate JWT + Set Session Cookie]
    D -->|No| F[Return Error Message]
    E --> G[Redirect to /dashboard]
```

### Database Schema (Prisma)

```mermaid
erDiagram
    User ||--o{ Pdf : uploads
    Category ||--o{ Pdf : categorizes

    User {
        string id PK
        string name
        string email
        string hashedPwd
        enum role
        datetime createdAt
        datetime updatedAt
    }

    Category {
        string id PK
        string name
        string slug
        string imagePath
        datetime createdAt
        datetime updatedAt
    }

    Pdf {
        string id PK
        string categoryId FK
        string title
        string description
        int year
        int month
        string filePath
        string originalName
        int fileSize
        string uploadedById FK
        datetime createdAt
        datetime updatedAt
    }
```

### File Storage Strategy

```mermaid
flowchart LR
    A[uploadPdf formData] --> B{BLOB_READ_WRITE_TOKEN set?}
    B -->|Yes| C[Upload to Vercel Blob]
    B -->|No| D[Save to local uploads/]
    C --> E[Store blob URL in filePath]
    D --> F[Store local path in filePath]
    E --> G[Create Pdf record in DB]
    F --> G
```

---

## System Flow

### 4.1 PDF Upload Flow

```mermaid
flowchart TD
    A[User selects file via drag-drop or picker] --> B[Upload Zone Step 1 of 3]
    B --> C[Metadata Form Step 2 of 3 Title, Category, Year, Month, Description]
    C --> D[Upload & Progress Step 3 of 3 XMLHttpRequest + progress tracking]
    D --> E[POST /api/pdf/create Route Handler]
    E --> F[Authenticate via auth]
    F --> G[Verify file type & size]
    G --> H[Upload to Vercel Blob or Local]
    H --> I[Create Pdf record via Prisma]
    I --> J[Return success response]
    J --> K[Client redirects to /pdfs/newId]
    K --> L[Server revalidates affected paths]
```

### 4.2 PDF View / Download Flow

```mermaid
flowchart TD
    A[User clicks PDF card] --> B[GET /browse/pdfs/id Server Component]
    B --> C[Fetch Pdf + Category from Prisma]
    C --> D[Render iframe with src=/api/pdf/id/download]
    D --> E[Browser requests /api/pdf/id/download]
    E --> F[Fetch Pdf from Prisma]
    F --> G{Storage type?}
    G -->|Blob URL| H[Redirect 307 to blob URL]
    G -->|Local path| I[Read file + stream Content-Type: application/pdf]
    H --> J[Display inline in iframe]
    I --> J
```

### 4.5 Settings Update Flow

```mermaid
flowchart TD
    A[Admin navigates to /settings] --> B[Settings page loads via getCachedSettings]
    B --> C[Admin edits fields General / Upload / Contact / Appearance / Landing]
    C --> D[UpdateSettingsAction Server Action]
    D --> E[Validate user is admin auth]
    E --> F[Upsert each setting key-value pair]
    F --> G[revalidatePath /settings]
```
