# Styles & Themes

## Design principles

- **One content model, many skins.** No theme should ever require touching copy or layout — only tokens (color, font, spacing).
- **Restraint over decoration.** Clean, professional layouts that read well in an inbox, a browser, and a printed PDF — avoid anything that only looks good in one medium.
- **Accessible contrast.** All themes must pass basic WCAG AA contrast for text/background pairs.

## Theme tokens

Each theme defines:
- `primaryColor`, `secondaryColor`, `backgroundColor`, `textColor`
- `fontFamily` (email-safe font stack + fallback)
- `borderRadius` (buttons/cards)
- `spacingScale` (base unit for padding/margins)

## Themes

### 1. SaaS (default)
- Clean, light background, blue/indigo primary accent
- Rounded buttons, generous whitespace
- Evokes: Stripe, Linear, Notion-style onboarding

### 2. E-commerce
- Warm background, product-forward imagery placeholder
- Bolder CTA buttons, higher contrast for "Buy/Track order" actions
- Evokes: order confirmation / receipt emails from DTC brands

### 3. Dark Mode
- Dark background, high-contrast text, muted accent color
- Must remain legible in email clients that don't support `prefers-color-scheme` (fallback to light-safe values in email HTML)

## Where themes apply

| Surface | What changes with theme |
|---|---|
| Email | Background, button color, font stack (email-safe subset) |
| Web page | Full CSS custom properties, hover states |
| PDF | Background, accent color, print-safe font substitutions |

## Non-goals

- No per-theme copy changes — the point is proving one content tree, many skins.
- No animation dependent theming (PDF/email can't animate).
