# Project Rules

## Repo rules (to satisfy challenge qualification)

- Repository must remain **public** for the duration of judging.
- Must include complete, runnable source code — no partial snippets or private dependencies.
- README must not be edited after the submission deadline in a way that changes the substance of the entry (minor typo fixes are fine).
- The Elements repository must be starred from the account submitting.

## Code rules

- All three surfaces (email, web, PDF) must consume the **same shared content + theme model** — no surface may hardcode its own copy or colors.
- No inline styles duplicated across surfaces; shared tokens live in one place (`/theme`).
- Keep dependencies minimal — this is a demo/reference kit, not a production app.
- Every component must render without errors in Elements' validation (respect the `Email > Row > Column > content` nesting Elements enforces).

## Documentation rules

- README must include: project description, setup/run instructions, and at least one screenshot or GIF of the rendered output (challenge requirement).
- Any non-obvious design decision gets a one-line comment or a note in `ARCHITECTURE.md`.

## Submission rules

- Submit once per meaningfully distinct project (the challenge allows multiple submissions — don't spam near-duplicates).
- Always credit Unlayer/Elements in the README and tag `#BuiltWithElements` when sharing publicly.

## License

- MIT, matching Elements' own license, to keep the project maximally reusable by others.
