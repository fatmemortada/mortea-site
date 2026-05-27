# Mortéa Final Repaired Site

This folder is a safe repaired Mortéa website package based on the rework session notes.

## What was fixed

- The homepage has a luxury curated design.
- Homepage CSS is scoped to `body.mortea-home`.
- Inner pages are protected from the homepage redesign.
- Basic repaired pages are included:
  - `index.html`
  - `discover.html`
  - `professional-onboarding.html`
  - `login.html`
  - `style.css`

## Important rule

Do not replace the entire global `style.css` with homepage-only styles again. Keep homepage-specific styles under:

```css
body.mortea-home
```

## How to test locally

Open `index.html` in your browser.

Then test:

- `discover.html`
- `professional-onboarding.html`
- `login.html`

## Git commands

```bash
git add .
git commit -m "Repair Mortéa luxury homepage and protect inner pages"
git push origin main
```
