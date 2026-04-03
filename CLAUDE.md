# CLAUDE.md — GPK Vault

## Project overview
GPK Vault is a Garbage Pail Kids collector platform.
Core features: collection management, trade matching, marketplace.
Stack: Next.js (App Router), Supabase, Vercel, TypeScript,
Tailwind CSS, shadcn/ui.

## Architecture
- App Router with route groups: (auth) and (main)
- Server components by default; client components only when needed
- Supabase client in lib/supabase/client.ts (browser)
  and lib/supabase/server.ts (server components + API routes)
- All DB types in types/index.ts
- Row Level Security enabled on all tables — always check RLS
- Middleware handles session refresh + auth redirects

## Database (Supabase)
- Project ref: fyqdtbatoarwndosjtmr
- sets: GPK series/sets metadata
- cards: individual cards (A/B variants, images, parallels)
- profiles: user profiles (FK to auth.users, auto-created on signup)
- user_cards: collection entries (status: have/want/for_sale/for_trade)
- trades + trade_items: trade proposals and their card contents
- listings: marketplace sale listings

## Key business rules
- user_cards.status enum: "have" | "want" | "for_sale" | "for_trade"
- price always stored as price_cents (integer) — never floats
- A card can be both "have" AND "for_sale" (quantity > 1)
- Trade matching: find users where their have_cards ∩ my want_cards ≠ ∅
- RLS: users can only write their own user_cards, profiles, listings
- Stripe is scaffolded but NOT active until Phase 4

## File conventions
- React components: PascalCase, .tsx
- Utility functions: camelCase, .ts
- API routes: app/api/[resource]/route.ts
- DB migrations: supabase/migrations/YYYYMMDDHHMMSS_name.sql

## Commands
- npm run dev          — local dev server
- npm run db:seed      — seed GPK card database (needs SUPABASE_SERVICE_ROLE_KEY)
- npm run build        — production build
- npm run lint         — eslint

## Phase tracker
- [x] Phase 1: Foundation + checklist UI
- [ ] Phase 2: Trading system
- [ ] Phase 3: Marketplace
- [ ] Phase 4: Monetization (Stripe)
