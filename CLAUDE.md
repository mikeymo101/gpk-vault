# GPK Vault — Project Guide

## 🎯 What this is

**GPK Vault is a Garbage Pail Kids collector platform.** Manage your collection, track what you have vs. want, propose trades with other collectors, and (eventually) buy/sell via marketplace.

Live at **gpk-vault.vercel.app**. Deployed on Vercel.

---

## ⚠️ Critical: bleeding-edge stack

**This project runs Next.js 16 and React 19.** Both have breaking changes from earlier versions. **Read `AGENTS.md` before writing code.**

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.2 (App Router) |
| **UI** | React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Components** | shadcn/ui + @base-ui/react |
| **Database + Auth** | Supabase (via @supabase/ssr) |
| **Hosting** | Vercel |

**Package manager:** npm

---

## 🚀 Running Locally

```bash
cd ~/Projects/gpk-vault
npm install
npm run dev
# Open http://localhost:3000
```

**Scripts:**

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at :3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:seed` | Seed GPK card database (needs SERVICE_ROLE_KEY) |

---

## 🗂️ Project structure

**Source lives in `src/` — not at root.**

- `src/app/` — Next.js pages (App Router)
- `src/components/` — React components
- `src/lib/` — Utilities + Supabase clients
- `src/middleware.ts` — Auth session refresh
- `src/types/` — Shared TypeScript types
- `scripts/` — 25+ data seeding scripts
- `supabase/` — DB schema + migrations
- `assets/` — Brand icons and logo (not shipped)
- `public/` — Static assets (shipped)
- `ai-handoff/` — Handoff docs for AI context
- `AGENTS.md` — ⚠️ Stack-specific warnings

### Route groups

- `(auth)` — login, signup, reset password
- `(main)` — the authenticated app

### Supabase clients

- `src/lib/supabase/client.ts` — browser
- `src/lib/supabase/server.ts` — server components + API routes

---

## 🗄️ Database

**Supabase project ref:** `fyqdtbatoarwndosjtmr`

Tables: `sets`, `cards`, `profiles`, `user_cards`, `trades`, `trade_items`, `listings`

**Row Level Security enabled on all tables** — always check RLS.

---

## 📐 Key business rules

- `user_cards.status` enum: `"have" | "want" | "for_sale" | "for_trade"`
- **Prices always stored as `price_cents` (integer).** Never floats.
- A card can be both `"have"` AND `"for_sale"` (quantity > 1)
- Trade matching: users where `their_have ∩ my_want ≠ ∅`
- Stripe scaffolded but NOT active until Phase 4

---

## 📐 File conventions

- React components: PascalCase `.tsx`
- Utilities: camelCase `.ts`
- API routes: `src/app/api/[resource]/route.ts`
- DB migrations: `supabase/migrations/YYYYMMDDHHMMSS_name.sql`

---

## 🚦 Phase tracker

- [x] Phase 1: Foundation + checklist UI
- [ ] Phase 2: Trading system
- [ ] Phase 3: Marketplace
- [ ] Phase 4: Monetization (Stripe)
