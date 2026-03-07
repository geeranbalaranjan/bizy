# Bizy — Context for External Development

This document describes the **Bizy** codebase structure and everything an external agent needs to know to **implement Gemini features in the Viability Scan section**.

---

## 1. Task Summary

**Goal:** Implement Gemini-powered features in the **Viability Scan** section of the dashboard.

**Current state:**
- The **backend** and **Gemini integration** for viability are **already implemented**: `POST /api/viability` accepts a `BusinessProfile`, computes a base score, calls Gemini for risks/opportunities/verdict, and returns a `ViabilityResult`.
- The **Viability Scan UI** (component, hook, subcomponents) exists but is **not wired** to the dashboard: the viability page at `/dashboard/viability` only shows "Content coming soon."
- **Next step:** Connect the page to the existing viability flow (profile + scan + results) and optionally extend with additional Gemini features (e.g. richer prompts, follow-up insights, or new AI-generated sections).

**What an external agent should do:**
1. **Wire the Viability Scan** so the dashboard page uses `ViabilityScan`, `useViabilityScore`, and (optionally) `AppContext` to run scans and display results.
2. **Optionally extend Gemini usage** in the Viability Scan (e.g. more structured output, opportunities section in the UI, or new AI-generated content) while keeping the existing API and types as the source of truth.

---

## 2. Repository Structure

```
bizy/
├── app/
│   ├── api/                          # Next.js App Router API routes
│   │   ├── auth/[auth0]/route.ts     # Auth0 callback
│   │   ├── gemini/route.ts           # Chat → Gemini (multi-turn)
│   │   ├── grants/route.ts           # Grants listing
│   │   ├── reactiv/route.ts          # Reactiv storefront
│   │   ├── roadmap/route.ts          # Roadmap → Gemini JSON
│   │   ├── translate/route.ts        # Google Translate
│   │   └── viability/route.ts        # Viability scan → Gemini + score  ★
│   ├── dashboard/
│   │   ├── layout.tsx                # Sidebar + main content
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── viability/page.tsx        # Viability Scan page (currently placeholder) ★
│   │   └── ...                       # analytics, compliance, grants, roadmap, storefront
│   ├── onboarding/page.tsx
│   ├── globals.css
│   ├── layout.tsx                    # Root: UserProvider, TranslationProvider, AppProvider
│   └── page.tsx                      # Landing
├── components/
│   ├── viability/                    # ★ Viability Scan UI
│   │   ├── ViabilityScan.tsx         # Main container: empty / loading / results
│   │   ├── ViabilityScore.tsx        # Circular score display
│   │   ├── RiskCards.tsx             # Top risks with severity
│   │   ├── MarketChart.tsx           # Bar chart (generic data)
│   │   └── SurvivalStats.tsx         # Year 1/3/5 survival bars
│   ├── chat/                         # AI chat (uses /api/gemini)
│   ├── layout/                       # Sidebar, TopNav, etc.
│   └── ...
├── context/
│   └── AppContext.tsx                # Global state: viabilityResult, businessProfile, etc.
├── hooks/
│   ├── useViabilityScore.ts         # runScan(profile) → POST /api/viability ★
│   ├── useBusinessProfile.ts        # Profile from localStorage + Auth0
│   └── useGeminiChat.ts             # Chat → /api/gemini
├── lib/
│   ├── gemini.ts                     # promptGemini, promptGeminiJSON (Gemini 1.5 Flash) ★
│   ├── utils/viability.ts            # calculateViabilityScore (base score, no AI) ★
│   ├── data/                         # industry-stats, grants, etc.
│   ├── auth0.ts
│   ├── storage.ts                    # localStorage business profile
│   └── ...
├── types/
│   └── index.ts                     # BusinessProfile, ViabilityResult, Risk, etc. ★
├── .env.example
├── middleware.ts                    # Auth0 protection for /dashboard/*, /onboarding
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json                     # Path alias: @/* → project root
```

★ = Directly relevant to Viability Scan + Gemini.

---

## 3. Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **UI:** Tailwind CSS, Radix UI, `lucide-react`, `recharts`
- **Auth:** Auth0 (`@auth0/nextjs-auth0`); middleware protects `/dashboard/*` and `/onboarding`
- **AI:** Google Gemini via `@google/generative-ai`; model: `gemini-1.5-flash`
- **Path alias:** `@/*` points to project root

---

## 4. Viability Scan — Detailed Blueprint

### 4.1 Route and navigation

- **Page:** `app/dashboard/viability/page.tsx`  
  - Currently: title "Viability Scan" + "Content coming soon."  
  - Should render the full Viability Scan flow (see §4.4).
- **Nav:** `components/layout/Sidebar.tsx` — link to `/dashboard/viability` with label "Viability Scan" (icon: Zap).

### 4.2 API: `POST /api/viability`

- **File:** `app/api/viability/route.ts`
- **Request body:** `BusinessProfile` (JSON).
- **Required fields:** `businessType`, `province`.
- **Flow:**
  1. Validate profile.
  2. `calculateViabilityScore(profile)` from `lib/utils/viability.ts` → base numeric score, verdict, market condition, revenue, survival rates.
  3. `promptGeminiJSON<GeminiViabilityResponse>(prompt, systemPrompt)` from `lib/gemini.ts` → `topRisks`, `topOpportunities`, `verdictSummary`.
  4. Filter `GRANTS` by profile province/business type; set `grantsAvailable`.
  5. Merge into `ViabilityResult` and return JSON.

**Gemini contract (internal):**
- `GeminiViabilityResponse`: `{ topRisks: Risk[], topOpportunities: string[], verdictSummary: string }`
- System prompt: Canadian small business advisor; return 3 risks (with title, description, mitigation, severity), 3 opportunities, 2–3 sentence verdict summary.

### 4.3 Types (`types/index.ts`)

**BusinessProfile** (required for scan):
- `uid`, `email?`, `businessName`, `businessType`, `businessDescription`, `province`, `city`, `targetCustomers`, `stage`, `budget`, `goals`, `background?`, `createdAt`

**Risk:**
- `title`, `description`, `mitigation`, `severity`: `'high' | 'medium' | 'low'`

**ViabilityResult** (returned by API):
- `score` (number), `marketCondition`, `averageRevenue`, `survivalRate`, `grantsAvailable`
- `topRisks: Risk[]`, `topOpportunities: string[]`
- `verdict`: `'strong' | 'viable' | 'challenging' | 'risky'`
- `verdictSummary`: string

### 4.4 Hook: `useViabilityScore`

- **File:** `hooks/useViabilityScore.ts`
- **Returns:** `{ result, loading, error, runScan }`
- **Usage:** `runScan(profile: BusinessProfile)` → POST `/api/viability` → sets `result` (or `error`), toggles `loading`.

### 4.5 Component: `ViabilityScan`

- **File:** `components/viability/ViabilityScan.tsx`
- **Props:** `viabilityResult: ViabilityResult | null`, `onRunScan: () => void`, `isLoading?: boolean`
- **Behavior:**
  - No result: empty state with "Run Viability Scan" and primary CTA.
  - Loading: spinner + "Analyzing your business...".
  - With result: "Viability Results" header, `ViabilityScore`, `verdictSummary` in a gray box, "Run scan again" button.
- **Not yet used on the page:** The dashboard viability page does not import or render `ViabilityScan`.

### 4.6 Subcomponents (available, not all used in `ViabilityScan`)

- **ViabilityScore** — `score: number`, `size?: 'sm'|'md'|'lg'`; circular score display. **Used** in `ViabilityScan` results.
- **RiskCards** — `risks: Risk[]`; shows top risks with severity and mitigation. **Not** currently rendered in `ViabilityScan`; result includes `topRisks`.
- **SurvivalStats** — `survivalRate: { year1, year3, year5 }`; progress bars. **Not** used in `ViabilityScan`; result includes `survivalRate`.
- **MarketChart** — `data: { name, value }[]`; bar chart. **Not** used; could be driven by market/competition data if extended.

### 4.7 Global state (optional)

- **File:** `context/AppContext.tsx`
- **State:** `state.viabilityResult`, `state.businessProfile`, etc.
- **Actions:** `setViabilityResult(result)`, `setBusinessProfile(profile)`
- **Hook:** `useAppContext()`
- Persisting viability result in context is optional; the page can rely on `useViabilityScore` local state or sync with context for cross-page use.

### 4.8 Business profile source

- **Hook:** `hooks/useBusinessProfile.ts` — returns `businessProfile`, `loading`, `setBusinessProfile`, `needsOnboarding`, etc.
- **Persistence:** `lib/storage.ts` — localStorage key `bizy_business_profile`.
- For running a scan, the page must have access to a `BusinessProfile` (e.g. from `useBusinessProfile().businessProfile` or from `AppContext`). If the user has not completed onboarding, the page should handle missing profile (e.g. redirect to onboarding or show "Complete your profile first").

---

## 5. Gemini Integration (existing)

- **File:** `lib/gemini.ts`
  - Uses `process.env.GEMINI_API_KEY`, model `gemini-1.5-flash`.
  - `promptGemini(prompt, systemPrompt?)` → raw text.
  - `promptGeminiJSON<T>(prompt, systemPrompt?)` → JSON (used by viability and roadmap).
- **Viability usage:** Only in `app/api/viability/route.ts` via `promptGeminiJSON` for risks, opportunities, and verdict summary.
- **Env:** `GEMINI_API_KEY` must be set (see `.env.example`). No other LLM providers in the project.

---

## 6. Environment and config

- **Env file:** `.env.local` (or equivalent); `.env.example` lists variables.
- **Viability/Gemini:** `GEMINI_API_KEY` is required for the viability API.
- Server-only keys are read via `process.env` in API routes and `lib/gemini.ts`.

---

## 7. What to Implement (checklist for external agent)

1. **Wire Viability Scan page**
   - In `app/dashboard/viability/page.tsx`:
     - Use `useBusinessProfile()` to get `businessProfile`.
     - Use `useViabilityScore()` to get `result`, `loading`, `error`, `runScan`.
     - Render `ViabilityScan` with `viabilityResult={result}`, `onRunScan={() => runScan(businessProfile!)}`, `isLoading={loading}`.
     - Handle missing profile (e.g. prompt to complete onboarding or redirect).
     - Optionally sync `result` to `AppContext.setViabilityResult` when scan completes.

2. **Surface full result in UI (optional but recommended)**
   - In `ViabilityScan.tsx` (or on the page), when `viabilityResult` is present:
     - Render `RiskCards` with `viabilityResult.topRisks`.
     - Render a list or section for `viabilityResult.topOpportunities`.
     - Optionally render `SurvivalStats` with `viabilityResult.survivalRate` and/or `MarketChart` if you add suitable data.

3. **Extend Gemini features (optional)**
   - Possible extensions (without changing existing API contract unless needed):
     - Richer system/user prompts in `app/api/viability/route.ts` for more nuanced risks/opportunities.
     - Additional Gemini-generated fields (e.g. "key next steps") and corresponding types + UI.
     - Follow-up or “explain this score” via a separate API route that calls `promptGemini` and returns text.

4. **Error and edge cases**
   - Show `error` from `useViabilityScore` on the page.
   - Disable "Run Scan" when profile is missing or when required fields (`businessType`, `province`) are absent.

---

## 8. Quick reference — key files

| Purpose | Path |
|--------|------|
| Viability page (wire here) | `app/dashboard/viability/page.tsx` |
| Viability API + Gemini | `app/api/viability/route.ts` |
| Viability UI container | `components/viability/ViabilityScan.tsx` |
| Run scan hook | `hooks/useViabilityScore.ts` |
| Business profile hook | `hooks/useBusinessProfile.ts` |
| Gemini client | `lib/gemini.ts` |
| Base score (no AI) | `lib/utils/viability.ts` |
| Types | `types/index.ts` |
| Global state | `context/AppContext.tsx` |

---

This context should be sufficient for an external agent to implement and extend Gemini features in the Viability Scan section without guessing the structure or contracts.
