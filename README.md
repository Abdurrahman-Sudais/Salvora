# Salvora

**Find the reuse potential before demolition starts.**

Salvora helps deconstruction teams identify and organise potentially reusable building materials. AI turns site photographs and survey documents into a proposed inventory that surveyors can verify, prioritise, and export for recovery planning.

> Salvora is a proposed startup concept. The team is fictional, pricing is illustrative and the prototype uses fictional data. Named organisation types are prospective customers with no implied affiliation. The domain `www.salvora.com` and email `hello@salvora.com` are placeholders — check availability with a registrar before use.

Categories: AI · Construction Technology · Circular Economy

## What's here

- **Marketing site** (`/`): hero, purpose and stakes (with sourced statistics), problem, solution, how it works, customers, public-sector angle, AI safeguards, principles, founders' letter, vision, pricing, proposed AWS architecture, team, FAQ and an early-access form.
- **Interactive prototype** (`/app`): a review workspace on fictional candidate items. Switch roles with *Demo as*, open a record to see AI flags with evidence and confidence, assign reviewers, add notes and record decisions (a reason is required). Every change is written to an audit log you can export as CSV. A grounded assistant answers only from the records and refuses decisions that belong to people. Changes persist in `localStorage`.
- **Legal drafts**: `/privacy` and `/terms` (review drafts; operator details to be confirmed).

## Team

- **Ikenna Obiora** — Founder/CEO. Pre-demolition surveyor with experience on commercial refurbishment projects.
- **Toyin Adebanjo** — Co-founder. Circular economy consultant focused on material reuse in construction.
- **Mustapha Aliyu** — CTO. Computer vision engineer working on detection and segmentation.

## Sources for the statistics

- 600m tons — Construction and demolition debris generated in the United States in 2018. ([US EPA](https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/construction-and-demolition-material-specific))
- 38% — Share of total EU waste generation from construction in 2022. ([Statista, citing Eurostat](https://www.statista.com/statistics/1340946/european-union-waste-generation-share-by-source))
- >35% — The European Commission’s figure for construction’s share of EU waste, confirmed by fact-checkers. ([EUFactcheck](https://eufactcheck.eu/factcheck/true-construction-is-responsible-for-producing-35-of-all-waste-in-the-eu/))

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build   # Vite build, server render, and static prerender of /, /app, /privacy, /terms and 404.html
npm test        # Engine and content tests (node --test)
npm run preview
```

The build output in `dist/` is fully static. `public/_headers` and `public/_redirects` cover Netlify/Cloudflare Pages; `vercel.json` covers Vercel.

### Early-access form

Without configuration the form saves the request in the browser and offers a pre-filled email to hello@salvora.com. To send submissions to HubSpot, set `VITE_HUBSPOT_PORTAL_ID` and `VITE_HUBSPOT_FORM_GUID` at build time, and update the privacy notice first.

### Motion

Scroll reveals, word-by-word manifesto lighting, count-up statistics, timeline and step lines, card tilt and magnetic buttons live in `src/motion.js`. Content is server-rendered and fully visible without JavaScript; motion is skipped when the visitor prefers reduced motion.

## Structure

```
src/content.js        all site copy (edit here)
src/seed.js           fictional prototype records
src/theme.css         colours and fonts
src/App.jsx           marketing pages
src/Purpose.jsx       purpose, stakes, principles, letter, vision
src/app/engine.js     prototype rules (permissions, decisions, audit, assistant)
src/app/Prototype.jsx prototype UI
scripts/prerender.mjs static HTML for every route
```
