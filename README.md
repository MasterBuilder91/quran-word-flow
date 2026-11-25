# Quran Word Flow

A comprehensive Quranic Arabic learning platform. Covers reading fundamentals, vocabulary, grammar (Sarf/morphology), an interactive Mushaf, a community forum, flashcards, and AI-assisted tools — all in one progressive web app.

**Live site:** *(add Netlify/Vercel URL in repo Settings → About once deployed)*

---

## What it does

| Feature | Description |
|---|---|
| **Learn to Read** | Step-by-step Arabic letter and reading lessons |
| **Quran Browser (Mushaf)** | Full Quran with word-by-word lookup |
| **Quran Word Lookup** | AI-powered word analysis (root, grammar, translation) |
| **Sarf (Morphology)** | Generative verb conjugation drills across patterns |
| **Flashcards** | Vocabulary flashcards with audio |
| **Practice Playground** | Free-form Arabic writing and reading practice |
| **Modules** | Structured grammar modules with progression |
| **Forum** | Community discussion board |
| **Ask About Islam** | AI Q&A for Islamic questions |
| **Heritage / Desert Runner** | Cultural enrichment features |
| **Admin Dashboard** | Visitor chat management and location analytics |

---

## Screenshot

![Quran Word Flow screenshot placeholder](docs/screenshot.png)

*(replace with an actual screenshot)*

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Routing | React Router v6 |
| State | Zustand + TanStack React Query |
| Backend / Auth | Supabase (PostgreSQL, Auth, Edge Functions, Realtime) |
| Maps | Mapbox GL |
| AI features | Supabase Edge Functions calling Anthropic Claude |
| TTS | ElevenLabs (via Supabase Edge Function) |
| PWA | vite-plugin-pwa |

---

## Architecture

```
src/
  pages/            ← Route-level page components
  components/       ← Shared UI components (nav, chat widget, admin, flashcards…)
  sarf/             ← Sarf (morphology) drill sub-app
  App.tsx           ← Router and global providers
  App.css           ← Global styles

supabase/
  functions/        ← Edge Functions (AI features, TTS, Quran API calls)
    arabic-assistant/     ← Arabic grammar assistant
    arabic-word-analysis/ ← Word-level Quranic analysis
    chat-api/             ← Visitor chat backend
    elevenlabs-tts/       ← Text-to-speech proxy
    get-mapbox-token/     ← Secure Mapbox token delivery
    quran-browser/        ← Quran text and verse data
    quran-word-lookup/    ← Word-by-word lookup
    send-cheatsheet/      ← Cheatsheet email delivery
  migrations/       ← SQL migration files
  config.toml       ← Supabase project config

public/             ← Static assets (images, audio, PDFs, fonts)
```

---

## Run locally

**Prerequisites:** Node.js 18+, a Supabase project (free tier works).

```bash
git clone https://github.com/MasterBuilder91/quran-word-flow.git
cd quran-word-flow
npm install
```

Create a `.env` file (do **not** commit it):

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
```

```bash
npm run dev
```

Open `http://localhost:5173`.

**Deploy Edge Functions:**

```bash
npx supabase functions deploy
```

Set any secret keys (Anthropic, ElevenLabs, Mapbox) in the Supabase dashboard under Edge Functions → Secrets.

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | `.env` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `.env` | Supabase anon/public key |
| `ANTHROPIC_API_KEY` | Supabase secrets | Claude API for AI features |
| `ELEVENLABS_API_KEY` | Supabase secrets | TTS audio generation |
| `MAPBOX_ACCESS_TOKEN` | Supabase secrets | Maps (admin dashboard) |

> **Important:** Keep secret keys in Supabase Edge Function secrets — never commit them. The `.env` file contains only the public Supabase URL and anon key (safe for browser use, governed by Row Level Security), but it should still be added to `.gitignore` to avoid accidental commits.

---

## Database

Migrations live in `supabase/migrations/`. Run them against your Supabase project with:

```bash
npx supabase db push
```

Row Level Security policies control access — anonymous users can read public content; authenticated users can post to the forum and save progress.
