# Bizy — Project Context

AI-powered platform helping Canadians start and grow businesses. Built with Next.js 14, TypeScript, Tailwind, Auth0, Gemini AI, and Recharts.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` |
| Auth | Auth0 (`@auth0/nextjs-auth0`) |
| AI | Google Gemini (`@google/generative-ai`) — model: `gemini-2.5-flash` |
| Charts | Recharts |
| UI primitives | Radix UI (dialog, select, tabs, checkbox, progress, dropdown) |
| Forms | react-hook-form + zod |
| Icons | lucide-react |
| Class utils | clsx + tailwind-merge via `cn()` from `@/lib/utils` |
| Component variants | class-variance-authority (CVA) |

---

## Directory Structure

```
app/                          # Next.js App Router
  layout.tsx                  # Root layout (fonts, Auth0 UserProvider)
  page.tsx                    # Landing page (server component)
  globals.css                 # Tailwind base + CSS variables
  onboarding/page.tsx         # 3-step onboarding flow
  dashboard/
    layout.tsx                # Sidebar + AIChat (client component)
    page.tsx                  # Dashboard home
    viability/page.tsx        # AI viability scanner
    roadmap/page.tsx          # AI launch roadmap
    analytics/page.tsx        # AI analytics dashboard
    compliance/
      page.tsx                # Compliance hub
      cra/page.tsx            # CRA form explorer + AI explainer
      hr/page.tsx             # HR/employer duties
      licenses/page.tsx       # Business licenses
    grants/page.tsx           # Grant finder
    storefront/page.tsx       # Website builder
    calculator/page.tsx       # Startup cost calculator
    name-generator/page.tsx   # Business name generator
    competitor-map/page.tsx   # Competitor map
    tax-calendar/page.tsx     # Tax deadline calendar
  api/
    auth/[auth0]/route.ts     # Auth0 handler
    gemini/route.ts           # Chat endpoint (Gemini)
    viability/route.ts        # Viability scan (Gemini)
    roadmap/route.ts          # Roadmap generator (Gemini)
    analytics-insights/route.ts   # Market insights (Gemini)
    analytics-ai/route.ts        # Business analysis (Gemini)
    analytics-predict/route.ts    # Growth predictions (Gemini)
    grants/route.ts           # Grant matching
    translate/route.ts        # Translation
    places/route.ts           # Google Places
    reactiv/route.ts          # Reactiv storefront

components/
  ui/button.tsx               # CVA button (variants: default, accent, outline, ghost, link)
  layout/
    Sidebar.tsx               # Dashboard sidebar navigation
    TopNav.tsx                # Top navigation bar
    MobileNav.tsx             # Mobile navigation
  chat/
    AIChat.tsx                # Floating chat widget (bottom-right)
    ChatMessage.tsx           # Chat bubble component
    ChatInput.tsx             # Chat text input
  viability/
    ViabilityScan.tsx         # Scan CTA + rotating loading messages
    ViabilityScore.tsx        # Circular SVG progress gauge
    MarketChart.tsx           # Recharts bar chart
    SurvivalStats.tsx         # Progress bar survival rates
    RiskCards.tsx             # Severity-coded risk cards
    OpportunityCards.tsx      # Green opportunity cards
    MarketInsights.tsx        # AI market analysis
    AIRecommendations.tsx     # AI recommendations
    NextSteps.tsx             # Numbered action steps
    Opportunities.tsx         # Opportunities display
  analytics/
    KPICard.tsx               # KPI card with icon + change %
    RevenueChart.tsx          # Recharts line chart
    BenchmarkTable.tsx        # Industry comparison table
    BusinessHealthScore.tsx   # Circular health gauge
  roadmap/
    RoadmapTimeline.tsx       # Step timeline
    RoadmapStep.tsx           # Individual step card
    ProgressTracker.tsx       # Progress indicator
    StepDetailModal.tsx       # Step detail modal
    RoadmapAdvisor.tsx        # AI roadmap advisor
    LaunchReadinessScore.tsx  # Launch readiness gauge
    NextBestAction.tsx        # Next recommended action
  compliance/
    CRADocCard.tsx            # CRA form card + AI explainer
    HRChecklist.tsx           # HR onboarding checklist
    LicenseCard.tsx           # Business license card
  grants/
    GrantCard.tsx             # Grant display card
    GrantFilter.tsx           # Grant filter controls
  onboarding/
    OnboardingProgress.tsx    # Step progress indicator
    StepOne.tsx               # Business type + name
    StepTwo.tsx               # Location + budget
    StepThree.tsx             # Goals + description
    StepFour.tsx              # Additional details
  storefront/
    WebsiteBuilder.tsx        # Drag-and-drop website builder
    WebsitePreview.tsx        # Live website preview
    AppClipBuilder.tsx        # Reactiv app clip builder
    AppClipPreview.tsx        # App clip preview
  translation/
    T.tsx                     # Translation wrapper component
    LanguageSelector.tsx      # Language picker

hooks/
  useBusinessProfile.ts       # Load/save profile from localStorage
  useViabilityScore.ts        # POST /api/viability, returns ViabilityResult
  useGeminiChat.ts            # Chat via /api/gemini with message history
  useAnalytics.ts             # Derive metrics from profile + viability, fetch AI insights
  useRoadmap.ts               # Roadmap generation + step management

lib/
  gemini.ts                   # Gemini client (promptGemini, promptGeminiJSON)
  auth0.ts                    # Auth0 server helpers (getSession, getUser)
  firebase.ts                 # Firebase app init (auth, firestore, storage)
  storage.ts                  # localStorage helpers for business profile
  employee-storage.ts         # localStorage helpers for employee data
  utils.ts                    # cn() — clsx + tailwind-merge
  reactiv.ts                  # Reactiv API client
  utils/
    cn.ts                     # cn() duplicate
    province.ts               # Province names, HST/GST helpers
    viability.ts              # calculateViabilityScore() composite formula
    website-generator.ts      # Website HTML generator
  data/
    industry-stats.ts         # INDUSTRY_STATS[] — StatsCan benchmarks
    grants.ts                 # GRANTS[] — Canadian grants/loans
    cra-forms.ts              # CRA_FORMS[] — tax forms
    licenses.ts               # LICENSES[] — business licenses
    employer-duties.ts        # Employer onboarding duties
    translations.ts           # UI translations

types/index.ts                # All shared TypeScript interfaces
context/AppContext.tsx         # Global state (useReducer)
middleware.ts                 # Auth0 middleware (protects /dashboard, /onboarding)
```

---

## Design System

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-primary` | `#1a1a2e` | Headings, dark backgrounds, primary buttons |
| `brand-accent` | `#e94560` | CTAs, highlights, interactive elements |
| `brand-secondary` | `#16213e` | Secondary backgrounds |
| `brand-highlight` | `#f5a623` | Warnings, special callouts |
| `success` | `#27ae60` | Positive indicators |
| `warning` | `#f39c12` | Caution states |
| `danger` | `#e74c3c` | Error states |

### Typography

- **Headings**: `font-heading` (Syne)
- **Body**: `font-body` (DM Sans)
- **Mono**: `font-mono` (DM Mono)

### Common Patterns

```tsx
// Card container
<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

// Section heading
<h4 className="font-heading text-sm font-semibold text-brand-primary">

// Page title
<h1 className="text-3xl font-heading font-bold text-brand-primary mb-6">

// Class merging
import { cn } from '@/lib/utils'
<div className={cn('base-class', condition && 'conditional-class')}>

// Button variants
<Button variant="default|accent|outline|ghost|link" size="default|sm|lg|icon">
```

---

## Key Types (`types/index.ts`)

```typescript
BusinessProfile {
  uid, email?, businessName, businessType, businessDescription,
  province, city, targetCustomers, stage, budget, goals, background?, createdAt
}

ViabilityResult {
  score, marketCondition, averageRevenue, survivalRate,
  grantsAvailable, topRisks, topOpportunities,
  verdict, verdictSummary, marketInsights?, recommendedNextSteps?
}

Risk { title, description, mitigation, severity }

RoadmapStep {
  id, title, description, estimatedTime, estimatedCost,
  actionUrl, category, isComplete, isRequired, dependsOn?, priority?, difficulty?
}

ChatMessage { id, role, content, timestamp }

IndustryBenchmark {
  businessType, province, avgRevenue, avgEmployees,
  survivalRate, avgStartupCost, source
}

CRAForm { id, name, code, description, whenNeeded, url, categories }
Grant { id, name, provider, amount, type, eligibility, deadline?, url, description }
```

---

## Gemini Integration

### Client (`lib/gemini.ts`)

```typescript
import { promptGemini, promptGeminiJSON } from '@/lib/gemini'

// Text response
const text = await promptGemini(prompt, systemPrompt?)

// Typed JSON response
const data = await promptGeminiJSON<MyType>(prompt, systemPrompt?)
```

Default model: `gemini-2.5-flash`. Functions accept an optional `model` parameter override.

### API Route Pattern

All Gemini routes follow this pattern:
1. Parse + validate request body
2. Call `promptGemini` or `promptGeminiJSON` inside a try/catch
3. If Gemini fails, return graceful fallback (empty data, not a 500)
4. Return structured JSON response

---

## Auth Flow

- Auth0 handles login/logout via `/api/auth/[auth0]`
- Middleware protects `/dashboard/*` and `/onboarding`
- `useUser()` from `@auth0/nextjs-auth0/client` for client-side user state
- `getSession()` from `@/lib/auth0` for server-side session
- Business profile stored in localStorage via `useBusinessProfile()`

---

## State Management

- **AppContext** (`context/AppContext.tsx`): Global state via `useReducer` — user, businessProfile, viabilityResult, roadmapProgress, chatHistory
- **Feature hooks**: `useViabilityScore`, `useAnalytics`, `useGeminiChat`, `useRoadmap` — each manages its own fetch/state cycle
- **localStorage**: Business profile and employee data persist across sessions

---

## Component Conventions

1. All interactive components use `'use client'` directive
2. Types imported from `@/types` — never duplicate interfaces
3. Styling via Tailwind only — no CSS modules or styled-components
4. Icons from `lucide-react` exclusively
5. `cn()` from `@/lib/utils` for conditional class merging
6. `Button` from `@/components/ui/button` for all buttons (CVA variants)
7. Cards use `rounded-xl border border-gray-200 bg-white p-6`
8. Section headers use `font-heading text-sm font-semibold text-brand-primary`
9. Loading states use `Loader2` from lucide with `animate-spin`
10. Error states use `AlertTriangle` from lucide with red-50 background

---

## Environment Variables

```env
# Auth0
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000/
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# Gemini AI
GEMINI_API_KEY=

# Firebase (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Google Translate
GOOGLE_TRANSLATE_API_KEY=

# Reactiv
REACTIV_API_KEY=
REACTIV_STORE_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000/
```

---

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
