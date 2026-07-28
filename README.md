# Elementary Kit

> One component tree. Every surface.

**Live Demo:** [elementary-kit.vercel.app](https://elementary-kit.vercel.app)

A themeable onboarding content system — welcome email, landing page, and PDF receipt — all rendered from the **same** React component tree using [Unlayer Elements](https://github.com/unlayer/elements). Switch themes and watch all three surfaces update together.

![demo](./docs/demo.webp)

## Why

Most teams hand-code emails, web pages, and PDFs separately, even when they share the same brand and content. Elementary Kit proves you don't have to — built for the [Build with Elements Challenge](./docs/CHALLENGE.md).

## What's inside

| Surface | Rendered as |
|---|---|
| Welcome email | Outlook-safe table HTML |
| Landing page | Responsive flexbox HTML |
| PDF receipt | Print-ready document |

Plus a live **theme switcher** with 3 themes: SaaS, E-commerce, Dark Mode.

## Quick start

```bash
git clone https://github.com/Ahtisham992/elementary-kit.git
cd elementary-kit
npm install
npm run dev        # launches the demo app with the theme switcher
npm run render-all # renders email.html, page.html, and receipt.pdf to /output
```

## Deployment (Vercel)

This project is a standard Next.js application and is 100% zero-config compatible with Vercel. 
The PDF generation via Puppeteer (`npm run render-all`) is isolated to a CLI script and is NOT executed during the standard Next.js `build` process, meaning there are no serverless function size limits or Chromium dependency issues to worry about during deployment.

To deploy your own live demo:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and authenticate
3. Run `vercel` in the project root to deploy
4. Follow the prompts (defaults are fine)

Alternatively, just push the repo to GitHub and import it via the Vercel dashboard.

## Project docs

- [Project description](./docs/DESCRIPTION.md)
- [Challenge details](./docs/CHALLENGE.md)
- [Implementation plan](./docs/IMPLEMENTATION_PLAN.md)
- [Styles & themes](./docs/STYLES_AND_THEMES.md)
- [Rules](./docs/RULES.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Submission checklist](./docs/SUBMISSION_CHECKLIST.md)
- [Technical challenge solved](./docs/TECHNICAL_CHALLENGE.md)

## Built with

[Unlayer Elements](https://github.com/unlayer/elements) — write once in React, render emails, web pages, and PDFs from the same component tree.

## License

[MIT](./LICENSE)

---

Built for the Unlayer (YC W22) **#BuiltWithElements** challenge.
