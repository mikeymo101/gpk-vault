#!/usr/bin/env bash
set -euo pipefail

# GPK Vault AI handoff scaffold
TARGET_DIR="${1:-.}"
HANDOFF_DIR="$TARGET_DIR/ai-handoff"
ASSETS_DIR="$HANDOFF_DIR/assets"

mkdir -p \
  "$ASSETS_DIR/references" \
  "$ASSETS_DIR/logos" \
  "$ASSETS_DIR/backgrounds" \
  "$ASSETS_DIR/stickers" \
  "$ASSETS_DIR/icons" \
  "$ASSETS_DIR/cards"

cat > "$HANDOFF_DIR/00-read-me-first.md" <<'EOF'
# Read Me First

Use the files in `/ai-handoff` as the source of truth for the redesign.

## Implementation priority
1. Homepage
2. Dashboard
3. Collection page
4. Card detail page
5. Shared component system

## Rules
- Preserve current product functionality
- Do not change backend logic unless required for UI rendering
- Do not rename routes unless explicitly necessary
- Use existing app structure where possible
- Prefer reusable React components
- Prefer Tailwind if already used in the repo
- Match the approved visual direction in `/ai-handoff/assets/references/`

## Definition of success
- The site visually matches the approved comic/slime aesthetic
- The app remains usable and readable
- Shared components are consistent across pages
- The design feels bold, but not messy
EOF

cat > "$HANDOFF_DIR/01-master-brief.md" <<'EOF'
# GPK Vault Master Brief

## Product
GPK Vault is a tracking and collection-management platform for Garbage Pail Kids collectors.

## Goal
Redesign the frontend to match the approved comic/slime visual direction while preserving usability, clarity, and current core functionality.

## Brand Feel
- Loud
- Collectible
- Comic-book
- Sticker-heavy
- Slimey
- High-energy
- Nostalgic but usable

## Visual Strategy
Use controlled chaos:
- Decorative surfaces can be loud
- Functional UI must stay clean and readable

## Non-Negotiables
- Responsive on desktop and mobile
- Maintain clear hierarchy and readable text
- Keep navigation straightforward
- Do not break existing flows
- Use supplied assets where available

## Design Priorities
1. Strong hero and landing-page conversion
2. Fun but readable dashboards
3. Reusable design system
4. Consistent styling across product pages

## Build Priorities
1. Homepage
2. Dashboard
3. Collection page
4. Card detail page
5. Shared UI components
EOF

cat > "$HANDOFF_DIR/02-design-system.md" <<'EOF'
# Design System

## Core Principle
The design should feel like a loud collectible sticker universe layered on top of a clean, usable application UI.

## Primary Colors
- Slime Green: #7ED957
- Toxic Yellow: #FFE600
- Bubble Pink: #FF4FA3
- Sky Cyan: #4CC9F0
- Ink Black: #111111

## Secondary Colors
- Sickly Green: #4CAF50
- Acid Lime: #C7F464
- Rotten Orange: #FF7A00
- Bruise Purple: #8E44AD
- Flesh Tone: #F5C6A5
- Dirty Beige: #F2E8D5
- Blood Red: #D7263D

## Color Usage Rules
- Use no more than 2 strong accent colors in one section
- Use Ink Black for outlines and key text
- Use Dirty Beige or dark neutral surfaces to calm busy sections
- Decorative areas can be louder than app surfaces

## Borders
- Major UI elements should use bold black outlines
- Border thickness should feel comic-inspired, not delicate

## Corners
- Rounded corners are welcome, but should feel chunky and playful

## Shadows
- Use hard-edged or comic-style shadows, not soft SaaS shadows

## Typography Direction
- Big, bold, high-impact display headings
- Clean, readable body copy
- Strong hierarchy
- No ultra-thin fonts

## Button Rules
- Primary buttons should feel loud and clickable
- Thick outline
- High contrast text
- Strong hover states
- Avoid generic modern gradient buttons

## Stickers and Callouts
- Use burst shapes, slime drips, sticker tags, comic labels
- These should support the page, not block readability

## Backgrounds
- Prefer slime textures, halftone comic textures, or gritty graphic fields
- Keep background noise lower in dense product areas

## App UI Rule
Marketing surfaces = louder
Application surfaces = cleaner
EOF

cat > "$HANDOFF_DIR/03-page-map.md" <<'EOF'
# Page Map

## Homepage
Purpose: Explain the product and drive signups
Must include:
- Hero
- Main CTA
- Value proposition
- Feature strip
- Product preview
- Testimonials or collector trust signals
- Final CTA

## Dashboard
Purpose: Show collection progress at a glance
Must include:
- Total cards
- Set completion
- Recently added
- Missing cards
- Value or activity panel
- Quick navigation

## Collection Page
Purpose: Browse and manage owned cards
Must include:
- Search
- Filters
- Grid/list view
- Ownership states
- Card tiles
- Sorting

## Card Detail Page
Purpose: Inspect and manage one card
Must include:
- Card image
- Metadata
- Ownership status
- Series info
- Notes or value area
- Related cards or set context

## Set Completion Page
Purpose: Show progress toward completing a series
Must include:
- Completion percentage
- Missing cards
- Owned cards
- Progress visualization
- CTA to view or add cards

## Wishlist / Missing Cards Page
Purpose: Help users identify what they still need
Must include:
- Missing card list
- Filters
- Priority states
- Trade or acquisition hooks if supported
EOF

cat > "$HANDOFF_DIR/04-component-specs.md" <<'EOF'
# Component Specs

## Header / Navigation
- Bold logo area
- Clear nav links
- Auth buttons
- Sticky or semi-sticky behavior is acceptable if useful

## Primary Button
- Loud fill color
- Black outline
- High contrast text
- Bold label
- Hover and pressed states required

## Secondary Button
- Lower emphasis than primary
- Still on-brand
- Can use pink, cyan, or black-backed treatment

## Stat Card
- Used for dashboard metrics
- Clear number hierarchy
- Bold title
- Clean internal spacing
- Decorative framing allowed

## Card Tile
- Must support owned / missing / duplicate states
- Image-first presentation
- Easy to scan in a grid
- Should look collectible, not generic

## Search Bar
- Highly usable
- Clear focus state
- Can have comic styling without reducing clarity

## Filter Chips
- Easy to toggle
- Strong active state
- Reusable across collection pages

## Section Header
- Reusable headline block with optional sticker/callout styling

## Testimonial Card
- Should feel branded and fun
- Readable quote text
- Good for homepage trust area

## Value Chart Container
- Chart styling should fit brand
- Surrounding panel should match UI system
EOF

cat > "$HANDOFF_DIR/05-copy-deck.md" <<'EOF'
# Copy Deck

## Homepage Hero
Headline: Track. Hunt. Complete Your Collection.
Subhead: Know what you own, find what you need, and finally make your collection feel organized.
Primary CTA: Start Tracking
Secondary CTA: Browse Cards

## Feature Strip
Track Your Collection
Find Missing Cards
See Set Progress
Track Value and Activity

## Dashboard
Section Title: Your Collection
Section Subtitle: Everything you own, need, and want to complete.

## Final CTA
Headline: Ready to complete your collection?
CTA: Start Tracking Free
EOF

cat > "$HANDOFF_DIR/06-acceptance-criteria.md" <<'EOF'
# Acceptance Criteria

## Global
- Site is responsive
- Text remains readable
- Contrast is strong
- Styling is consistent
- Shared components are reused
- Pages feel cohesive

## Homepage
- Hero immediately communicates what the product does
- Primary CTA is obvious
- Product preview is visible
- Visual style matches approved references

## Dashboard
- Key stats are visible quickly
- Layout is easy to scan
- Decorative elements do not interfere with usability

## Collection Page
- Search and filters are clear
- Card states are obvious
- Browsing feels fast and organized

## General Quality
- No placeholder styling left behind
- No generic SaaS look
- No overuse of loud colors in dense UI areas
EOF

cat > "$HANDOFF_DIR/07-asset-manifest.md" <<'EOF'
# Asset Manifest

## Reference Images
- homepage-approved.png — approved homepage mock
- dashboard-direction.png — dashboard style reference

## Planned Assets
- logo-primary.png — main logo
- logo-alt.png — alternate logo
- hero-slime-bg.webp — homepage hero background
- slime-divider-green.svg — section divider
- sticker-track-it.png — callout sticker
- sticker-find-it.png — callout sticker
- icon-collection.svg — feature icon
- icon-search.svg — feature icon
- icon-value.svg — feature icon
- icon-trophy.svg — feature icon

## Card Assets
- all supplied card images stored in `/assets/cards/`
EOF

cat > "$HANDOFF_DIR/08-claude-implementation-prompt.md" <<'EOF'
Use the files in `/ai-handoff` as the source of truth.

Task:
Redesign the existing frontend of GPK Vault to match the approved comic/slime visual system while preserving current functionality and usability.

Implementation instructions:
1. Review `/ai-handoff/00-read-me-first.md`
2. Follow `/ai-handoff/01-master-brief.md`
3. Follow `/ai-handoff/02-design-system.md` for visual decisions
4. Use `/ai-handoff/03-page-map.md` for page requirements
5. Use `/ai-handoff/04-component-specs.md` for reusable UI
6. Use `/ai-handoff/05-copy-deck.md` for text
7. Validate work against `/ai-handoff/06-acceptance-criteria.md`
8. Use `/ai-handoff/07-asset-manifest.md` and files in `/ai-handoff/assets/`

Constraints:
- Preserve backend logic
- Do not rename routes unless necessary
- Prefer reusable React components
- Prefer Tailwind if already present
- Keep the decorative layer bold, but the application layer clean

Deliverables:
- Updated homepage
- Updated dashboard
- Updated collection page
- Shared component styling system

Start with the homepage and shared components first.
EOF

cat > "$HANDOFF_DIR/README.md" <<'EOF'
# GPK Vault AI Handoff Package

## What this is
A starter handoff pack for Claude or another coding agent wired into your repo.

## What you still need to add
1. Approved mock images into `assets/references/`
2. Real card images into `assets/cards/`
3. Any existing logo files into `assets/logos/`
4. Any additional backgrounds, stickers, or icons

## Recommended filenames
- `assets/references/homepage-approved.png`
- `assets/references/dashboard-direction.png`
- `assets/references/collection-page-direction.png`

## Recommended next move
After adding assets, point Claude at `ai-handoff/08-claude-implementation-prompt.md`.
EOF

printf '\nDone. Created AI handoff scaffold at: %s\n' "$HANDOFF_DIR"
