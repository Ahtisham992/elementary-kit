# Elementary Kit

> One component tree. Every surface.

A themeable onboarding content system — welcome email, landing page, and PDF receipt — all rendered from the **same** React component tree using [Unlayer Elements](https://github.com/unlayer/elements). Switch themes and watch all three surfaces update together.

!![demo](./docs/demo.webp)


## Why

Most teams hand-code emails, web pages, and PDFs separately, even when they share the same brand and content. Elementary Kit proves you don't have to — built for the [Build with Elements Challenge](./docs/CHALLENGE.md).

## What's inside

| Surface | Rendered as |
|---|---|
| 📧 Welcome email | Outlook-safe table HTML |
| 🌐 Landing page | Responsive flexbox HTML |
| 📄 PDF receipt | Print-ready document |

Plus a live **theme switcher** with 3 themes: SaaS, E-commerce, Dark Mode.

## Quick start

```bash
git clone https://github.com/<your-username>/elementary-kit.git
cd elementary-kit
npm install
npm run dev        # launches the demo app with the theme switcher
npm run render-all # renders email.html, page.html, and receipt.pdf to /output
```

## Project docs

- [Project description](./docs/DESCRIPTION.md)
- [Challenge details](./docs/CHALLENGE.md)
- [Implementation plan](./docs/IMPLEMENTATION_PLAN.md)
- [Styles & themes](./docs/STYLES_AND_THEMES.md)
- [Rules](./docs/RULES.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Submission checklist](./docs/SUBMISSION_CHECKLIST.md)

## Built with

[Unlayer Elements](https://github.com/unlayer/elements) — write once in React, render emails, web pages, and PDFs from the same component tree.

## License

MIT

---

Built for the Unlayer (YC W22) **#BuiltWithElements** challenge.
