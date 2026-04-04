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
