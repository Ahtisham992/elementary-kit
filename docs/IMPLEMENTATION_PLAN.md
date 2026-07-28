# Implementation Plan

Built in phases so there's always a working, submittable version — important given the tight deadline.

## Phase 0 — Setup (Day 1, ~1 hr)
- Init repo, README skeleton, license, `.gitignore`
- Scaffold React/Next.js project
- Install `@unlayer/react-elements` (confirm exact package name from docs/repo before starting)
- Star the Elements repo (qualification requirement)

## Phase 1 — Core content, single theme (Day 1)
- Define the shared content model (one JS/TS object: headline, body copy, CTA, price/line items, brand colors)
- Build the **welcome email** using Elements' `Email`, `Row`, `Column`, `Heading`, `Paragraph`, `Button`
- Render to HTML, sanity-check in a real inbox test tool if time allows

## Phase 2 — Web + PDF surfaces (Day 1–2)
- Reuse the same content model to build the **landing page** version (web render mode)
- Build the **PDF receipt/invoice** version (document/print render mode)
- Confirm all three surfaces pull from the *same* component tree/content model — this is the core proof point

## Phase 3 — Theming system (Day 2)
- Extract colors, fonts, spacing into a theme object
- Implement 3 themes: SaaS (light, blue), E-commerce (warm, product-forward), Dark Mode
- Add a simple theme switcher (dropdown or toggle) in the demo app
- Verify switching themes updates all three rendered outputs consistently

## Phase 4 — Polish (Day 2–3)
- Visual QA across themes and all three outputs
- Add responsive checks for the web/email versions
- Write and test a one-command "render all three outputs" script for reviewers

## Phase 5 — Documentation & submission assets (Day 3)
- Finalize README (see Architecture + Rules docs for what must be included)
- Record a short screen-capture GIF showing: theme switch → email/web/PDF outputs updating
- Take clean screenshots of each surface × each theme

## Phase 6 — Submit & share (before July 31)
- Push final repo, double check it's public
- Submit via the official form
- Post on LinkedIn/Twitter with #BuiltWithElements, tagging Unlayer (YC W22)

## Stretch goals (only if time remains)
- Add a 4th surface: popup/modal version of the same content
- Add a small CLI to scaffold a new "kit" from a template
