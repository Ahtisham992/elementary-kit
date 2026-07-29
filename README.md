# Elementary Kit

> One component tree. Every surface.

**Live Demo:** [elementary-kit.vercel.app](https://elementary-kit.vercel.app)

A themeable onboarding content system — welcome email, landing page, and PDF receipt — all rendered from the **same** React component tree using [Unlayer Elements](https://github.com/unlayer/elements). Switch themes and watch all three surfaces update together.

![demo](

https://github.com/user-attachments/assets/4413be75-e7bc-49d6-a6ff-c85b9dca5b4d

)

## Why

Most teams hand-code emails, web pages, and PDFs separately, even when they share the same brand and content. **Elementary Kit** proves you don't have to. Built for the [Build with Elements Challenge](./docs/CHALLENGE.md).

## 🚀 Features (The Studio Mode)

Elementary Kit has evolved from a simple static demo into a fully interactive workspace powered by Unlayer Elements. 

- **Live Content Editor:** Modify the headline, CTA, body copy, and receipt items directly in the UI. Watch the changes instantly reflect across all 3 surfaces (Email, Web, PDF).
- **Custom Theme Builder:** Use native color pickers and sliders to tweak your Primary/Background/Text colors, typography, and border-radius in real-time.
- **Dynamic Receipt Engine:** A frontend calculator that automatically tallies up your custom receipt items, taxes, and extra charges.
- **Save & Load Presets:** Securely save your custom UI configurations directly to your browser's `localStorage` and swap between them seamlessly.
- **Export Center:** Download your fully-compiled, platform-ready HTML files instantly, or copy the React JSON payload to use in your own production backend.
- **Zero-Dependency Architecture:** Deploys instantly on Vercel Serverless. Uses native browser `window.print()` for Custom PDF generation to completely avoid bloated backend Chromium dependencies.

## What's inside

| Surface | Rendered as |
|---|---|
| Welcome email | Outlook-safe table HTML |
| Landing page | Responsive flexbox HTML |
| PDF receipt | Print-ready document |

## Quick start

```bash
git clone https://github.com/Ahtisham992/elementary-kit.git
cd elementary-kit
npm install
npm run dev        # Launches the full Studio Mode application locally
npm run render-all # (Optional) Renders static HTML/PDF fallbacks to /output
```

## Deployment (Vercel)

This project is a standard Next.js application and is 100% zero-config compatible with Vercel. 
**No Heavy Backend Dependencies:** We explicitly designed the Custom PDF generator to utilize the browser's native `window.print()` isolated renderer. This avoids the infamous Vercel Serverless 50MB function limit caused by packages like `puppeteer-core` and `@sparticuz/chromium`.

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
