# bizy

**Your first Canadian co-founder.**

AI-powered platform for Canadian small business owners. Viability scan, launch roadmap, compliance hub, and instant storefront.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- Google Gemini AI
- Reactiv App Clip API

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — React components (layout, onboarding, viability, etc.)
- `lib/` — Firebase, Gemini, Reactiv clients; data and utils
- `hooks/` — Custom React hooks
- `context/` — AppContext for global state
- `types/` — TypeScript type definitions
