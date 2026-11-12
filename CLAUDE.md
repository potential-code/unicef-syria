# UNICEF Syria Youth Pathways mockup

Clickable front-end mockup for UNICEF Syria. Spec: `docs/brief.txt` (Rawzaba's developer brief, 11 Nov 2026). The brief is the source of truth; section 24 is the definition of done. All data is fictional.

## Run

- `bun run dev` (port 5190), `bun run build` (typecheck + vite build to `dist/unicef/syria-youth-pathways`), `bun run test`, `bun run lint`.
- Publishing: copy the dist folder to `potential-mockups/sites/unicef/syria-youth-pathways/`. Needs `base: './'` and hash routing (already set). Never use root-absolute asset paths; use `asset()` from `@/lib/asset` or `SmartImage`/`Avatar`.

## Architecture (one-way imports)

`shared/types.ts` → `src/data` (pure seed) → `src/domain` (pure rules, unit tested) → `src/store` (db + actions) → `src/features/<area>` → `src/routes` (thin).

- Pages never import seed data for mutable state; read state through store hooks (`useDb`, `useMe`, `useMyYouth`, `useYouth`, `useOpportunities`, `useApplications`, `useSessions`, `useBookings`, `useFollowUps`, `usePosts`) and change it only through `src/store/actions/*`. Static catalogue data (courses, sessions, mentors, coaches, orgs, personas, labour, analytics rows) may be imported from `src/data`.
- Rules (scoring, points, completion, stages, KPI maths, access scope) live in `src/domain`. Do not duplicate them in components.
- Routes: one file per URL in `src/routes/<role>/...`, each only `createFileRoute(...)({ component: XPage })` importing from `@/features/<area>/pages/XPage`.
- Features: `src/features/<area>/{pages,components,hooks}`. Pages under ~250 lines; one component per file; static config arrays in `src/data` or the feature's `config.ts`, not inside pages.
- Shared and frozen (do not edit without the lead): `shared/`, `src/data`, `src/domain`, `src/store`, `src/components/{ui,layout,shared,motion}`, `src/styles`, `src/i18n/index.ts`, `src/i18n/*/common.json`, `src/config`, `src/lib`. Need a new shared piece? Build it inside your feature folder.

## UI rules

- Brand: UNICEF cyan `cyan`, blue `blue` (primary), `navy`, `yellow`, `orange`, `red`, tints `sky-50/100/200`, `blue-50`. Tailwind token classes only, never raw hex. Gradients: `bg-grad-unicef`, `bg-grad-sky`, `bg-grad-sunrise`, `text-grad-unicef`. Never cyan text on white (fails contrast); use `text-blue`.
- Tone: public site and youth screens are energetic and youthful (bold type, colour blocks, playful cards, motion). Trainer, employer and admin screens are calm and data-first.
- Motion: heavy scroll effects (Lenis, GSAP ScrollTrigger, pinned sections, parallax, SplitWords, CountUp) on the public homepage only. Elsewhere use light Motion (`Reveal`, `Stagger`, `StaggerItem`, `MotionPage`, hover lifts). Import GSAP only from `@/lib/gsap`. Respect `useReducedMotion` from `@/hooks/use-reduced-motion`.
- Shape: pill buttons for primary CTAs (`rounded-full`), `rounded-2xl` cards, `shadow-sm` → `shadow-lg` on hover (`lift`).
- Every string through i18n: your area's namespace in `src/i18n/{en,ar}/<ns>.json` (both languages, same keys). Seed content is `Localized`; render with `useLocalized().l(x)`; when `isPlaceholder(x)` is true show a small "Arabic content placeholder" label (`t('common:arabicPlaceholder')`).
- RTL: logical classes only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`). Directional icons get `rtl-mirror`.
- Status is always text plus optional icon (`StatusBadge`), never colour alone. Tap targets ≥ 44px. Labels on every input. Inline validation and success toasts (`sonner`).
- Empty, no-results and error states on every list (`EmptyState`). Empty states explain the next step.
- Show `DemoTag` (already in the shell). Never write "accredited", never promise jobs or funding, never show a hiring probability.
- No em dashes in UI copy. No `any`, no `console.log`.
- Dates: `formatDate`/`formatTime` from `@/i18n` (Syria time). Demo clock: `now()` from `@/lib/clock`, never `new Date()` for record timestamps.

## Demo

- Personas in `src/data/personas.ts` drive the sign-in cards and the presenter switcher (`DemoControls`). Reset restores the seeded snapshot.
- Images: `public/images/generated/*.webp` (see `docs/ASSET-INVENTORY.md`); `SmartImage`/`Avatar` fall back to a branded gradient or initials if a file is missing.

## Design system v2 (after Aliya's review, 12 Nov) — mandatory

- **Brand motifs, not blobs.** Never use decorative blurred blobs, `rounded-full bg-white/10` circles, `blur-3xl` glows or random rings. Use `@/components/brand`: `Motif` (variants `banner`, `card`, `corner`, `sidebar`, `auth`), `LaurelBranch`, `LaurelWreath`, `GlobeGrid`, `Rings` — the laurel and globe come from the UNICEF emblem. Colour them with low-opacity text classes (`text-white/[0.12]` on blue, `text-blue/10` on white). Parent needs `relative overflow-hidden`.
- **Stat cards.** Every metric/KPI/count tile uses `StatCard` from `@/components/shared/StatCard` with a coloured `tone` (`blue`, `cyan`, `navy`, `yellow`, `orange`, `sky`); cycle `STAT_TONES` in a row so neighbours differ; pass `to` when the card links somewhere (whole card clickable). Delete feature-local tile components (`MetricTile`, `KpiTile`, …) or make them thin wrappers around `StatCard`. Denominator/definition goes in `hint`.
- **No icon chips.** Do not put icons in their own coloured circles/squares (`flex size-10 items-center justify-center rounded-full bg-…`). Put the icon inline beside its text (`size-4`/`size-5`, brand colour), or as a large low-opacity watermark inside a coloured card. Choice cards (assessment options, route cards, tabs) are whole selectable cards: quiet letter or icon, selected state = blue background + white text + check.
- **Badges** use `BadgeMedal` (laurel medallion; earned vs locked).
- **Cards** always lift: use the `card` utility (`rounded-2xl border border-border/70 bg-white shadow-md`) or shadcn `Card`; clickable cards add `card-hover`. No flat bordered boxes without shadow. Tables live inside a `card` with `overflow-hidden`.
- **Compact controls.** Buttons default h-10 (`size="sm"` h-9 in toolbars/filters), inputs and selects h-10 (filters: `size="sm"` select, h-9). Filter bars: one compact row/grid, labels `text-xs font-semibold text-ink-soft`, search input h-10 with a leading icon, no giant pill inputs. No `min-h-12`/`min-h-14`/`h-14` controls.
- **Contrast.** On `blue`/`navy`/`orange` backgrounds text is white (secondary `text-white/80` minimum). On `cyan`/`yellow` backgrounds text is `text-ink`. Never ink/brown text on orange, never navy buttons on orange, never cyan text on white, never gradients fading to grey. A button on a coloured banner is white (`bg-white text-navy`) or yellow (`bg-yellow text-ink`).
- **Page banners** (hero strip at the top of a page): `bg-grad-unicef` (or `bg-grad-unicef-v`), white text, `Motif variant="banner"`, `shadow-lg`, `rounded-3xl`.
- **Tables:** use the shadcn `Table` (compact uppercase header, row hover). Cells wrap; never force horizontal scroll on desktop. Content-like lists (points ledger, rules) can be row cards instead of tables.
