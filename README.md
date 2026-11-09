# Salvora

**Find the reuse potential before demolition starts.**

Salvora helps deconstruction teams identify and organise potentially reusable building materials. AI turns site photographs and survey documents into a proposed inventory that surveyors can verify, prioritise, and export for recovery planning.

> Salvora is a proposed product. Pricing is illustrative and the prototype uses fictional data. Founded by **Adaora Nnamdi** (adaora@salvora.space). Organisation types named on the site are prospective customers with no implied affiliation. Check `salvora.space` with your registrar before launch.

## Design

A survey drawing set. Blueprint linework on concrete-grey paper with a grid, square corners and heavy borders, Archivo (expanded and condensed) for headings and IBM Plex Mono for annotations, safety orange and hazard yellow for emphasis.

- **Hero** — a floor plan where detection boxes are plotted one by one, with a title block and a CAD-style crosshair that follows the pointer.
- Every section is a numbered **sheet**; elements are revealed with a pen-plotter sweep.
- **Catalogue** of salvage lots with status stamps, **duplicates** shown as three photos of one door collapsing into one inventory line, the **process** as a revision schedule, **inspection limits** inside hazard tape with landing stamps, **statistics** on concrete blocks, **fees** as a schedule table, the founder’s **site notes** on a clipboard and the **team** as site passes.

## Survey inventory (`/app`)

A fictional office strip-out survey. Room drawings show candidate items outlined; select one to see the suggested category with model probabilities, the proposed and scheduled quantities, the flag with evidence and any duplicate-photo group. Surveyors must resolve duplicates, then confirm category, quantity, dimensions, condition and removal access (with an observation) — or reject the candidate. Planners can refer items for qualified inspection. Only confirmed items enter the inventory, ranked from confirmed inputs, and export as CSV with inspection requirements attached. Roles: Lead Surveyor, Surveyor, Recovery Planner, Client Viewer.

Every decision in the prototype is made by a person, needs a reason, and is written to an exportable log. Changes persist in `localStorage`. Motion is skipped when the visitor prefers reduced motion, and all content is server-rendered and readable without JavaScript.

## Structure

```
src/content.js   site facts, team, sourced statistics
src/data.js      fictional project, rooms, candidate items, roles
src/engine.js    merge, confirm, reject, refer, priority, export
src/App.jsx      marketing pages
src/Scene.jsx    room drawings used in the survey inventory
src/Survey.jsx   the survey inventory
src/motion.js    plotted detections, plotter reveals, stamps, crosshair
src/styles.css   all styling
scripts/prerender.mjs  static HTML for every route
tests/                 node --test suites
```

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build   # Vite build, server render, static prerender of /, /app, /privacy, /terms and 404.html
npm test        # rules and content tests (node --test)
npm run preview
```

The output in `dist/` is fully static. `public/_headers` and `public/_redirects` cover Netlify/Cloudflare Pages; `vercel.json` covers Vercel.

The early-access form keeps requests in the browser and opens a pre-filled email until a form service is connected. To send submissions to HubSpot, set `VITE_HUBSPOT_PORTAL_ID` and `VITE_HUBSPOT_FORM_GUID` at build time and update the privacy notice first.
