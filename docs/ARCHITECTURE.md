# Architecture

## High-level structure

```
elementary-kit/
├── content/
│   └── onboarding.ts        # single shared content model (copy, CTAs, line items)
├── theme/
│   ├── tokens.ts            # theme token type definitions
│   ├── saas.ts
│   ├── ecommerce.ts
│   └── dark.ts
├── components/
│   └── shared/              # Elements-based building blocks reused across surfaces
│       ├── Header.tsx
│       ├── HeroSection.tsx
│       ├── CTAButton.tsx
│       └── Footer.tsx
├── surfaces/
│   ├── email/
│   │   └── WelcomeEmail.tsx     # uses Elements <Email> root
│   ├── web/
│   │   └── LandingPage.tsx      # uses Elements web/flexbox root
│   └── pdf/
│       └── Receipt.tsx          # uses Elements <Document> root
├── app/                      # demo Next.js app: theme switcher + live preview of all 3 surfaces
├── scripts/
│   └── render-all.ts         # renders email HTML, web HTML, and PDF to /output for reviewers
└── README.md
```

## Data flow

```
content/onboarding.ts  ─┐
                         ├──▶ surfaces/email  ──▶ renderToHtml()  ──▶ email.html
theme/{selected}.ts    ─┤
                         ├──▶ surfaces/web    ──▶ renderToHtml()  ──▶ page.html
                         │
                         └──▶ surfaces/pdf    ──▶ renderToPdf()   ──▶ receipt.pdf
```

The same `content` object and `theme` object are passed as props into all three surface components. Each surface only decides *how* to lay things out for its medium (table-based for email, flexbox for web, print-optimized for PDF) — never *what* the content or brand colors are.

## Key architectural decision

Shared building blocks (`Header`, `HeroSection`, `CTAButton`, `Footer`) live once in `components/shared` and are composed differently inside each surface's root wrapper (`<Email>`, web root, `<Document>`), per Elements' "same content components, different wrapper decides the mode" model.

## Demo app

A small Next.js app (`/app`) renders a live theme switcher. Selecting a theme re-renders all three surfaces side-by-side in the browser (PDF shown as an embedded preview) — this is the centerpiece of the demo GIF for the submission.

## Testing

- Snapshot test that `renderToHtml()`/`renderToJson()` output doesn't throw for any theme × surface combination.
- Manual visual QA checklist (see `docs/qa-checklist.md`).
