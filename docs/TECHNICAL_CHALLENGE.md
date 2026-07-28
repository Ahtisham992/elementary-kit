# Technical Challenge: The Next.js Hydration Mismatch

During the development of Elementary Kit, we ran into an interesting architectural challenge when trying to render the Unlayer `<Email>` component directly within our Next.js App Router.

## The Problem
Next.js's App Router relies on a root `layout.tsx` that provides the `<html>` and `<body>` tags for the entire web application.

However, `@unlayer/react-elements` is designed to be a complete rendering solution for emails and documents. When you use the `<Email>` or `<Document>` root wrappers, Unlayer generates its own `<html>`, `<head>`, and `<body>` tags under the hood to ensure the output is universally compatible with email clients and print layouts.

When we placed our `<WelcomeEmail />` component directly onto the Next.js `page.tsx`, React attempted to render Unlayer's `<body>` tag *inside* Next.js's existing `<body>` tag. This resulted in an invalid HTML tree and a loud **Hydration Mismatch** error on the client.

## The Solution
We needed a way to perfectly preview the exact HTML output of the Unlayer components without breaking the Next.js DOM hierarchy. 

To solve this, we leveraged `renderToHtml()` from `@unlayer/react-elements` on the client. Instead of rendering the React components natively into the DOM, we:
1. Passed our `theme` and `content` models into the surface components.
2. Compiled them into raw, isolated HTML strings via `renderToHtml()`.
3. Injected those HTML strings directly into the `srcDoc` attribute of three `iframe` elements.

This completely isolated the Unlayer DOMs from the Next.js DOM, curing the hydration mismatch while simultaneously providing a 100% accurate preview of the final rendered outputs!
