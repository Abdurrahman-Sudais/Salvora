import React, {useState} from 'react';
import site from './content.js';
import Survey from './Survey.jsx';
import LeadForm from './LeadForm.jsx';

function Mark({size = 30}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" fill="#111" /><path d="M8 24V12l8-5 8 5v12" fill="none" stroke="#f7f6f1" strokeWidth="2.2" /><path d="M13 24v-6h6v6" fill="none" stroke="#ff5a1f" strokeWidth="2.2" /></svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['01 Catalogue', '/#catalogue'], ['02 Duplicates', '/#duplicates'], ['03 Process', '/#process'], ['04 Inspection', '/#inspection'], ['05 Fees', '/#fees'], ['06 Team', '/#team']];
  return (
    <header className="tb">
      <a href="/" className="tb-brand" aria-label="Salvora home"><Mark /><span>SALVORA</span></a>
      <span className="tb-ref" aria-hidden="true">DWG 001 · REV C</span>
      <nav id="nav" className={open ? 'tb-nav open' : 'tb-nav'} aria-label="Main">
        {nav.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a className="tb-app" href="/app" onClick={() => setOpen(false)}>Open survey ↗</a>
      </nav>
      <button className="tb-menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'INDEX'}</button>
    </header>
  );
}

const PLAN_BOXES = [
  [42, 52, 30, 10, 'DOOR · 0.94'], [42, 182, 30, 10, 'DOOR · 0.91'], [258, 52, 30, 10, 'DOOR · 0.93'],
  [112, 98, 120, 62, 'RAISED FLOOR · 520 m²'], [306, 196, 58, 44, 'CABINETS · 0.71'], [300, 92, 64, 50, 'GLASS · 0.52'],
];

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-l">
        <p className="label">Building-material recovery planning</p>
        <h1 id="hero-title">Find the reuse potential before demolition starts.</h1>
        <p className="lede">{site.about}</p>
        <div className="hero-cta"><a className="bx" href="/app">Open the survey inventory</a><a className="bx line" href="#pilot">Request a survey pilot</a></div>
      </div>
      <figure className="plan" aria-label="Floor plan of a fictional office level with detected candidate items outlined">
        <svg viewBox="0 0 400 280" className="plan-svg">
          <defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 v6" stroke="#1d3a8a" strokeWidth="1" opacity=".35" /></pattern></defs>
          <g className="walls">
            <rect x="20" y="20" width="360" height="240" />
            <path d="M20 120 H100 M180 20 V80 M180 120 V260 M240 180 H380 M290 20 V180" />
            <rect x="20" y="20" width="360" height="240" fill="none" strokeWidth="6" />
          </g>
          <rect x="190" y="190" width="40" height="60" fill="url(#hatch)" className="core" />
          <text x="196" y="224" className="pl-txt">CORE</text>
          <g className="swings"><path d="M44 120 a28 28 0 0 1 28 -28" /><path d="M44 120 h28" /><path d="M180 92 a26 26 0 0 1 -26 26" /><path d="M290 70 a24 24 0 0 0 -24 24" /></g>
          {PLAN_BOXES.map(([x, y, w, h, t], i) => (
            <g key={t} className="det" style={{'--i': i}}>
              <rect x={x} y={y} width={w} height={h} />
              <text x={x} y={y - 4}>{t}</text>
            </g>
          ))}
          <g className="dim"><path d="M20 272 H380 M20 268 v8 M380 268 v8" /><text x="186" y="270">24.0 m</text></g>
        </svg>
        <table className="tblock" aria-hidden="true">
          <tbody><tr><td>PROJECT</td><td>Harbour House (fictional)</td></tr><tr><td>LEVEL</td><td>03 · open office</td></tr><tr><td>STATUS</td><td className="o">Proposed — awaiting surveyor</td></tr></tbody>
        </table>
      </figure>
    </section>
  );
}

const CATALOGUE = [
  ['Internal doors', 'Timber veneer · 926 × 2040', '46 proposed', 'UNCONFIRMED'],
  ['Raised-floor panels', 'Steel-encased · 600 × 600', '~1,450 est.', 'UNCONFIRMED'],
  ['Kitchen cabinets', 'Laminate on chipboard', '14 proposed', 'CHECK CONDITION'],
  ['Fire doors FD30', 'Labelled · 826 × 2040', '12 proposed', 'INSPECTION REQ.'],
  ['LED ceiling panels', 'Model unread', '88 proposed', 'INSPECTION REQ.'],
  ['Reception desk', 'Solid oak top · 3200 × 800', '1 confirmed', 'CONFIRMED'],
];

function Catalogue() {
  return (
    <section className="sheet" id="catalogue" aria-labelledby="cat-title">
      <div className="sheet-h"><span className="sn">01</span><h2 id="cat-title">What a building is still holding.</h2></div>
      <p className="sheet-intro">Doors, flooring, fixtures and components can often be recovered — if someone finds them, counts them and records their condition before strip-out. Salvora proposes the list from your photographs; surveyors decide what is real.</p>
      <div className="catalogue">
        {CATALOGUE.map(([t, spec, qty, st], i) => (
          <article key={t} className="lot" data-plot>
            <span className="lot-no">LOT {String(i + 1).padStart(3, '0')}</span>
            <h3>{t}</h3>
            <dl><div><dt>Spec</dt><dd>{spec}</dd></div><div><dt>Qty</dt><dd>{qty}</dd></div></dl>
            <span className={`stamp st-${st.split(' ')[0].toLowerCase()}`}>{st}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function DoorView({skew}) {
  return (
    <svg viewBox="0 0 120 150" aria-hidden="true"><rect width="120" height="150" fill="#f7f6f1" />
      <g transform={`translate(60 75) skewY(${skew}) scale(${1 - Math.abs(skew) / 60} 1) translate(-60 -75)`} fill="none" stroke="#1d3a8a" strokeWidth="2"><rect x="35" y="20" width="50" height="115" /><circle cx="78" cy="80" r="2.5" fill="#1d3a8a" /><rect x="42" y="30" width="36" height="40" opacity=".5" /></g>
      <rect x="28" y="12" width="64" height="130" fill="none" stroke="#ff5a1f" strokeWidth="2" strokeDasharray="5 3" />
    </svg>
  );
}

function Duplicates() {
  return (
    <section className="sheet" id="duplicates" aria-labelledby="dup-title">
      <div className="sheet-h"><span className="sn">02</span><h2 id="dup-title">Photographed three times. Counted once.</h2></div>
      <div className="dup" data-merge>
        <div className="dup-photos">
          {[-12, 0, 12].map((s, i) => <figure key={s} className="dup-photo" style={{'--i': i}}><DoorView skew={s} /><figcaption>IMG_04{18 + i * 7}.jpg</figcaption></figure>)}
        </div>
        <svg className="dup-lines" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 C50 60 150 60 150 120" /><path d="M150 0 V120" /><path d="M250 0 C250 60 150 60 150 120" /></svg>
        <div className="dup-row"><b>1 × Internal door, veneer</b><span>3 observations · match 0.93 · surveyor to confirm</span></div>
      </div>
      <p className="sheet-intro">Duplicate-observation matching groups photographs that may show the same physical item, so inventories are not inflated. Document extraction pulls references from door schedules and surveys to cross-check counts — and a person settles every disagreement.</p>
    </section>
  );
}

const PROCESS = [
  ['A', 'Upload', 'Room photographs, plans and existing survey records.'],
  ['B', 'Propose', 'Candidate items, each linked to the images and documents it came from.'],
  ['C', 'Confirm', 'Surveyors confirm category, quantity, dimensions and condition.'],
  ['D', 'Constrain', 'Access, removal considerations and inspection requirements are added.'],
  ['E', 'Prioritise', 'Ranking uses confirmed inputs only: condition, access, handling and demand.'],
  ['F', 'Export', 'A recovery inventory and inspection plan, with who confirmed what.'],
];

function Process() {
  return (
    <section className="sheet" id="process" aria-labelledby="proc-title">
      <div className="sheet-h"><span className="sn">03</span><h2 id="proc-title">The survey, as a revision schedule.</h2></div>
      <table className="revs">
        <thead><tr><th>Rev</th><th>Stage</th><th>Description</th><th>By</th></tr></thead>
        <tbody>{PROCESS.map(([r, t, d], i) => <tr key={r} data-plot><td className="rev">{r}</td><td><b>{t}</b></td><td>{d}</td><td className="by">{i === 1 ? 'Salvora' : i === 4 ? 'Salvora + surveyor' : 'Surveyor'}</td></tr>)}</tbody>
      </table>
    </section>
  );
}

const STAMPS = [
  ['Structural suitability', 'Qualified inspection or testing'],
  ['Hazardous substances', 'Qualified survey and testing'],
  ['Regulatory acceptability', 'Responsible professionals'],
  ['Resale marketplace', 'Not in scope'],
];

function Inspection() {
  return (
    <section className="sheet hazard" id="inspection" aria-labelledby="insp-title">
      <div className="sheet-h"><span className="sn">04</span><h2 id="insp-title">Some questions need an inspector, not a model.</h2></div>
      <p className="sheet-intro">AI can help with visible condition. It cannot certify a structure, clear a material of hazardous substances or decide what regulations allow. Salvora records that an inspection is required and tracks it — the first version covers nonstructural interior items only.</p>
      <div className="stamps">{STAMPS.map(([t, by], i) => <div key={t} className="rstamp" data-plot style={{'--r': `${[-3, 2, -1.5, 3][i]}deg`}}><b>{t}</b><span>→ {by}</span></div>)}</div>
    </section>
  );
}

function Tonnage() {
  return (
    <section className="sheet concrete" aria-labelledby="ton-title">
      <div className="sheet-h"><span className="sn">05</span><h2 id="ton-title">The scale of what leaves site.</h2></div>
      <div className="blocks">{site.stats.map((s) => (
        <figure key={s.label} className="cblock" data-plot><b>{s.value}<small>{s.unit}</small></b><figcaption>{s.label}<a href={s.url} target="_blank" rel="noopener noreferrer">SRC: {s.source} ↗</a></figcaption></figure>
      ))}</div>
      <p className="note">Published estimates from the sources linked. They describe construction waste broadly, not Salvora results.</p>
    </section>
  );
}

const WHO = [['Deconstruction & demolition contractors', 'Plan recovery before strip-out', 'Quantities you can price'], ['Architectural salvage businesses', 'See what a project could supply', 'Better buying decisions'], ['Property developers', 'Understand reuse early in refurbishment', 'Reuse in the plan'], ['Survey & material-reuse consultancies', 'Produce pre-demolition inventories', 'Faster, consistent surveys']];

function Who() {
  return (
    <section className="sheet" aria-labelledby="who-title">
      <div className="sheet-h"><span className="sn">06</span><h2 id="who-title">Schedule of users.</h2></div>
      <table className="sched"><thead><tr><th>Customer</th><th>Uses Salvora to</th><th>Outcome</th></tr></thead><tbody>{WHO.map(([a, b, c]) => <tr key={a}><td><b>{a}</b></td><td>{b}</td><td className="o">{c}</td></tr>)}</tbody></table>
      <p className="note">Pre-demolition surveyors, recovery planners, site managers, salvage buyers and sustainability teams. Organisation types are prospective customers; no affiliation is implied.</p>
    </section>
  );
}

function Fees() {
  return (
    <section className="sheet" id="fees" aria-labelledby="fee-title">
      <div className="sheet-h"><span className="sn">07</span><h2 id="fee-title">Fee schedule.</h2></div>
      <p className="sheet-intro">A project-based assessment fee, or a subscription for contractors running several sites. Illustrative pricing for a proposed product.</p>
      <table className="fees">
        <thead><tr><th>Item</th><th>Project</th><th className="hot">Contractor</th><th>Portfolio</th></tr></thead>
        <tbody>
          <tr><td>Fee</td><td><b>$1,800</b> / project</td><td className="hot"><b>$950</b> / month</td><td><b>Custom</b></td></tr>
          <tr><td>Coverage</td><td>Up to 5,000 m²</td><td className="hot">Up to 6 active projects</td><td>Unlimited projects</td></tr>
          <tr><td>Photo-based inventory suggestions</td><td>●</td><td className="hot">●</td><td>●</td></tr>
          <tr><td>Duplicate review & item confirmation</td><td>●</td><td className="hot">●</td><td>●</td></tr>
          <tr><td>Document & schedule extraction</td><td>–</td><td className="hot">●</td><td>●</td></tr>
          <tr><td>Recovery prioritisation</td><td>–</td><td className="hot">●</td><td>●</td></tr>
          <tr><td>Portfolio reporting & integrations</td><td>–</td><td className="hot">–</td><td>●</td></tr>
          <tr><td /><td><a className="bx line sm" href="#pilot">Request</a></td><td className="hot"><a className="bx sm" href="#pilot">Request</a></td><td><a className="bx line sm" href="#pilot">Talk to us</a></td></tr>
        </tbody>
      </table>
    </section>
  );
}

function SiteNotes() {
  return (
    <section className="sheet" aria-labelledby="notes-title">
      <div className="sheet-h"><span className="sn">08</span><h2 id="notes-title">Site notes — why Salvora exists.</h2></div>
      <div className="clipboard" data-plot>
        <span className="clip" aria-hidden="true" />
        <p className="cn-h">SITE WALK · LEVEL 3 · 14:20</p>
        <p>Forty-odd veneer doors in good order. Raised floor throughout. Kitchen units, glass partitions, a solid oak desk. Strip-out starts Monday.</p>
        <p>No time to count properly. Photos taken — six hundred of them. They will sit in a folder. The doors will go in a skip.</p>
        <p className="cn-h">LATER</p>
        <p>This is the moment Salvora is for. Turn the photos into a proposed inventory in an afternoon, let the surveyor confirm what is really there, and get a recovery plan to the people who can use the materials before the skips arrive.</p>
        <p className="cn-sig">— {site.team[0].name}, Founder</p>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="sheet" id="team" aria-labelledby="team-title">
      <div className="sheet-h"><span className="sn">09</span><h2 id="team-title">Site passes.</h2></div>
      <div className="passes">{site.team.map((p) => (
        <article key={p.name} className="pass" data-plot>
          <div className="pass-band" aria-hidden="true" />
          <div className="pass-body"><span className="pass-id" aria-hidden="true">{p.initials}</span><div><p className="pass-role">{p.role}</p><h3>{p.name}</h3></div></div>
          <p className="pass-bio">{p.bio}</p>
        </article>
      ))}</div>
      <p className="note">Contact: <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </section>
  );
}

const SYS = [['S3', 'Site photos & plans'], ['SageMaker', 'Detect · segment · classify'], ['Textract', 'Survey & schedule extraction'], ['PostgreSQL', 'Inventory & review records'], ['Bedrock', 'Evidence-linked summaries']];

function System() {
  return (
    <section className="sheet" aria-labelledby="sys-title">
      <div className="sheet-h"><span className="sn">10</span><h2 id="sys-title">System diagram (proposed, AWS).</h2></div>
      <ol className="sys">{SYS.map(([a, b]) => <li key={a} data-plot><b>{a}</b><span>{b}</span></li>)}</ol>
      <p className="note">Proposed, not deployed. This website and the survey inventory run in your browser on fictional data.</p>
    </section>
  );
}

const FAQ = [
  ['What does the first version cover?', 'Nonstructural commercial-interior items — doors, cabinets, raised-floor panels and similar. Structural assessment and a resale marketplace are deliberately out of scope.'],
  ['Can Salvora tell us whether a material contains asbestos?', 'No. Hazardous-substance questions need qualified surveys and testing. Salvora records that an inspection is required and tracks its status.'],
  ['How are quantities kept accurate?', 'Possible duplicate photos are grouped for review, document references are cross-checked, and only surveyor-confirmed quantities reach the exported inventory.'],
  ['Is Salvora live?', 'Not yet. It is a proposed product; the survey inventory is a prototype running in your browser on fictional data.'],
];

function Faq() {
  return (
    <section className="sheet" aria-labelledby="faq-title">
      <div className="sheet-h"><span className="sn">11</span><h2 id="faq-title">Clarifications.</h2></div>
      <ol className="clauses">{FAQ.map(([q, a], i) => <li key={q}><details><summary><span>11.{i + 1}</span>{q}</summary><p>{a}</p></details></li>)}</ol>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ftb">
      <table><tbody>
        <tr><td className="ftb-brand" rowSpan="3"><Mark size={44} /> SALVORA</td><td>DRAWING</td><td>{site.tagline}</td></tr>
        <tr><td>CONTACT</td><td><a href={`mailto:${site.email}`}>{site.email}</a></td></tr>
        <tr><td>SHEETS</td><td><a href="/app">Survey inventory</a> · <a href="/#fees">Fees</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></td></tr>
      </tbody></table>
      <p className="note">© 2026 Salvora. Founded by {site.team[0].name}. A proposed product: pricing is illustrative and the survey inventory uses fictional data.</p>
    </footer>
  );
}

function Home() {
  return (<><Hero /><Catalogue /><Duplicates /><Process /><Inspection /><Tonnage /><Who /><Fees /><SiteNotes /><Team /><System /><Faq /><LeadForm /></>);
}

const LEGAL = {
  privacy: ['Privacy notice', [
    ['This website', 'Salvora is a proposed product. This website and the survey inventory run in your browser on fictional data.'],
    ['Survey inventory', 'Your changes are stored in your browser’s local storage (key salvora-survey-v1) and never leave your device. “Reset” clears them.'],
    ['Pilot requests', `Until a form service is connected, the form keeps your request in this browser and opens a pre-filled email to ${site.email}. Nothing is sent until you send it. This notice will be updated before any customer-relationship service is connected.`],
    ['Cookies & analytics', 'None.'],
  ]],
  terms: ['Terms of use', [
    ['A proposed product', 'Nothing here is an offer of service. Pricing is illustrative.'],
    ['Demonstration only', 'The survey inventory uses fictional data and must not be relied on for real recovery, structural or hazardous-material decisions.'],
    ['People decide', 'Salvora proposes; surveyors confirm. Structural, hazardous-substance and regulatory questions require qualified professionals.'],
    ['No affiliation', 'Organisation types named are prospective customers; no affiliation is implied.'],
  ]],
};

function Legal({kind}) {
  const [title, items] = LEGAL[kind];
  return <section className="sheet legal"><p className="label">Review draft</p><h1>{title}</h1>{items.map(([t, d]) => <div key={t}><h2>{t}</h2><p>{d}</p></div>)}</section>;
}

function NotFound() {
  return <section className="sheet legal"><p className="label">Sheet missing</p><h1>This sheet isn’t in the set.</h1><p><a className="bx" href="/">Back to drawing 001</a></p></section>;
}

export default function App({path = '/'}) {
  if (path.startsWith('/app')) return <Survey />;
  const page = path === '/' ? <Home /> : path === '/privacy' ? <Legal kind="privacy" /> : path === '/terms' ? <Legal kind="terms" /> : <NotFound />;
  return (<><a className="skip" href="#main">Skip to content</a><Header /><main id="main">{page}</main><Footer /></>);
}
