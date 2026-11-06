import React, {useState} from 'react';
import {ArrowRight, ArrowUpRight, Check, Menu, X, ShieldCheck, Sparkles, Mail} from 'lucide-react';
import site from './content.js';
import {seed} from './seed.js';
import {PurposeTop, PurposeBottom} from './Purpose.jsx';
import LeadForm from './site/LeadForm.jsx';
import Prototype from './app/Prototype.jsx';
import Logo from './site/Logo.jsx';

const NAV = [['Purpose', '/#purpose'], ['Product', '/#product'], ['How it works', '/#how-it-works'], ['Safeguards', '/#safeguards'], ['Pricing', '/#pricing'], ['Team', '/#team'], ['FAQ', '/#faq']];
const d = (ms) => ({'--rv-d': `${ms}ms`});

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" aria-label={`${site.name} home`}><Logo /></a>
        <nav id="site-nav" className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          {NAV.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          <a className="nav-mobile-cta" href="/app" onClick={() => setOpen(false)}>Open the prototype</a>
        </nav>
        <div className="header-cta">
          <a className="text-link hide-sm" href="/#early-access">Request early access</a>
          <a className="button small" href="/app">Open the prototype <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  );
}

function HeroVisual() {
  const items = seed.items.filter((i) => i.flags.length).slice(0, 3);
  return (
    <div className="hero-visual" aria-label={`Example ${site.app.itemNoun} review queue with fictional data`}>
      <div className="hv-card">
        <div className="hv-top"><span className="hv-dot" aria-hidden="true" /> {site.app.queueTitle} <span className="hv-badge">Sample data</span></div>
        {items.map((it) => {
          const f = it.flags[0];
          return (
            <div className="hv-row" key={it.id}>
              <div><b>{it.id}</b><span>{it.title}</span></div>
              <div className="hv-flag"><span className={`sev sev-${f.severity}`}>{f.label}</span><span className="conf" style={{'--c': `${Math.round(f.confidence * 100)}%`}}><i /></span></div>
            </div>
          );
        })}
        <p className="hv-foot"><ShieldCheck size={14} aria-hidden="true" /> {site.app.humanNote}</p>
      </div>
      <div className="hv-float" aria-hidden="true"><Sparkles size={15} /><span><b>{site.hero.floatTitle}</b><small>{site.hero.floatText}</small></span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" aria-hidden="true" /> {site.hero.eyebrow}</p>
          <h1>{site.hero.before}<em>{site.hero.em}<span className="h1-after">{site.hero.after}</span></em></h1>
          <p className="lead">{site.about}</p>
          <div className="actions">
            <a className="button" href="/app">Try the interactive prototype <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="text-link" href="#early-access">Request early access <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
          <ul className="hero-points">{site.hero.points.map((p) => <li key={p}><Check size={15} aria-hidden="true" /> {p}</li>)}</ul>
        </div>
        <HeroVisual />
      </div>
      <div className="wrap hero-strip"><span>{site.tagline}</span><span className="hero-cats">{site.categories.join(' · ')}</span></div>
    </section>
  );
}

function Heading({kicker, title, intro, id}) {
  return (
    <div className="heading" data-rv>
      <p className="kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="intro">{intro}</p>}
    </div>
  );
}

function Problem() {
  return (
    <section className="section" id="product" aria-labelledby="problem-title">
      <div className="wrap split">
        <Heading kicker="The problem" title={site.problem.title} id="problem-title" />
        <div className="problem-copy" data-rv style={d(120)}>
          <p className="large">{site.problem.text}</p>
          <ul className="fragments">{site.problem.fragments.map((f, i) => <li key={f} style={d(i * 80)}><span>{String(i + 1).padStart(2, '0')}</span>{f}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="section tint" aria-labelledby="solution-title">
      <div className="wrap">
        <Heading kicker="The solution" title={site.solution.title} intro={site.solution.text} id="solution-title" />
        <div className="capabilities">
          {site.solution.capabilities.map((c, i) => (
            <article className="capability tilt" key={c.title} data-rv style={d(i * 110)}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="cap-demo"><span>{c.demoLabel}</span><b>{c.demoValue}</b></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="section" id="how-it-works" aria-labelledby="steps-title">
      <div className="wrap">
        <Heading kicker="How it works" title={site.stepsTitle} id="steps-title" />
        <ol className="steps">
          <span className="steps-line" aria-hidden="true"><i /></span>
          {site.steps.map(([t, text], i) => (
            <li key={t} data-rv style={d(i * 100)}><span className="step-n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{text}</p></li>
          ))}
        </ol>
        <p className="note" data-rv>{site.stepsNote}</p>
      </div>
    </section>
  );
}

function Audiences() {
  return (
    <section className="section tint" id="customers" aria-labelledby="aud-title">
      <div className="wrap">
        <Heading kicker="Who it’s for" title={site.audiencesTitle} id="aud-title" />
        <div className="audiences">
          {site.audiences.map((a, i) => (
            <article className="audience tilt" key={a.title} data-rv style={d((i % 4) * 90)}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <small>{a.outcome} <ArrowUpRight size={14} aria-hidden="true" /></small>
            </article>
          ))}
        </div>
        <p className="note" data-rv>Named organisation types are prospective customers. No affiliation or endorsement is implied.</p>
      </div>
    </section>
  );
}

function PublicSector() {
  const p = site.publicSector;
  return (
    <section className="section dark" aria-labelledby="ps-title">
      <div className="wrap split">
        <div data-rv><p className="kicker">{p.kicker || 'For the public sector'}</p><h2 id="ps-title">{p.title}</h2></div>
        <div data-rv style={d(120)}>
          <p className="large">{p.text}</p>
          <ul className="ticks">{p.points.map((t) => <li key={t}><Check size={16} aria-hidden="true" /> {t}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Safeguards() {
  return (
    <section className="section" id="safeguards" aria-labelledby="safe-title">
      <div className="wrap">
        <Heading kicker="AI, used carefully" title={site.ai.title} intro={site.ai.intro} id="safe-title" />
        <div className="ai-grid">
          <div className="ai-col" data-rv><p className="kicker">What the AI does</p><ul>{site.ai.does.map((t) => <li key={t}><Check size={16} aria-hidden="true" /> {t}</li>)}</ul></div>
          <div className="ai-col never" data-rv style={d(120)}><p className="kicker">What it never does</p><ul>{site.ai.never.map((t) => <li key={t}><X size={16} aria-hidden="true" /> {t}</li>)}</ul></div>
        </div>
        <div className="safeguards">
          {site.safeguards.map(([t, text], i) => (
            <div className="safeguard tilt" key={t} data-rv style={d((i % 3) * 90)}><ShieldCheck size={20} aria-hidden="true" /><h3>{t}</h3><p>{text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section tint" id="pricing" aria-labelledby="price-title">
      <div className="wrap">
        <Heading kicker="Pricing" title="Simple plans that grow with you." intro={site.pricing.model} id="price-title" />
        <div className="plans">
          {site.pricing.tiers.map((t, i) => (
            <article className={`plan tilt${t.featured ? ' featured' : ''}`} key={t.name} data-rv style={d(i * 100)}>
              {t.featured && <span className="plan-tag">Most popular</span>}
              <h3>{t.name}</h3>
              <p className="plan-sum">{t.summary}</p>
              <p className="price"><b>{t.price}</b><span>{t.unit}</span></p>
              <ul>{t.features.map((f) => <li key={f}><Check size={15} aria-hidden="true" /> {f}</li>)}</ul>
              <a className={t.featured ? 'button' : 'button ghost'} href="#early-access">{t.cta}</a>
            </article>
          ))}
        </div>
        <p className="note center" data-rv>Illustrative pricing for a proposed product. Final pricing is agreed with early-access customers and excludes taxes.</p>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="section" id="architecture" aria-labelledby="arch-title">
      <div className="wrap">
        <Heading kicker="Proposed production design" title="Architecture on Amazon Web Services" intro={site.architectureIntro} id="arch-title" />
        <ol className="pipeline">
          {site.architecture.map(([t, svc, text], i) => (
            <li key={t} data-rv style={d(i * 90)}><span className="num">{String(i + 1).padStart(2, '0')} <ArrowRight size={14} aria-hidden="true" /></span><h3>{t}</h3><strong>{svc}</strong><p>{text}</p></li>
          ))}
        </ol>
        <p className="note" data-rv>Proposed, not deployed. No AWS services are connected to this website or the prototype, which run in your browser on fictional data.</p>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section tint" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <Heading kicker="The team" title={`The people building ${site.name}`} intro="A proposed founding team for this concept." id="team-title" />
        <div className="team">
          {site.team.map((p, i) => (
            <article className="person tilt" key={p.name} data-rv style={d(i * 120)}>
              <div className="avatar" aria-hidden="true"><b>{p.initials}</b></div>
              <p className="role">{p.role}</p>
              <h3>{p.name}</h3>
              <p>{p.bio}</p>
              <ul className="tags" aria-label="Focus areas">{p.focus.map((f) => <li key={f}>{f}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap split">
        <div data-rv><p className="kicker">FAQ</p><h2 id="faq-title">Questions people ask</h2><a className="text-link" href={`mailto:${site.email}`}><Mail size={15} aria-hidden="true" /> {site.email}</a></div>
        <div className="faq" data-rv style={d(120)}>
          {site.faq.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div><Logo light /><p>{site.tagline}</p><a href={`mailto:${site.email}`}>{site.email}</a></div>
        <div><h4>Product</h4><a href="/#product">Overview</a><a href="/#how-it-works">How it works</a><a href="/app">Prototype</a><a href="/#pricing">Pricing</a></div>
        <div><h4>Company</h4><a href="/#purpose">Purpose</a><a href="/#team">Team</a><a href="/#faq">FAQ</a><a href="/#early-access">Early access</a></div>
        <div><h4>Legal</h4><a href="/privacy">Privacy notice</a><a href="/terms">Terms of use</a></div>
      </div>
      <div className="wrap footer-legal">
        <p>© 2026 {site.name}. Founded by {site.team.map((p) => `${p.name} (${p.role})`).join(', ')}.</p>
        <p>{site.name} is a proposed startup concept. The team is fictional, pricing is illustrative and the prototype uses fictional data. Named organisation types are prospective customers with no implied affiliation.</p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <PurposeTop />
      <Problem />
      <Solution />
      <Steps />
      <Audiences />
      <PublicSector />
      <Safeguards />
      <PurposeBottom />
      <Pricing />
      <Architecture />
      <Team />
      <Faq />
      <LeadForm />
    </>
  );
}

const LEGAL = {
  privacy: ['Privacy notice', [
    ['What this website is', `This website describes ${site.name}, a proposed product, and includes an interactive prototype that runs in your browser on fictional data. No customer systems are connected.`],
    ['Prototype data', `The prototype saves your changes in your browser’s local storage (key ${site.slug}-prototype-v1) so they survive a reload. That data never leaves your device; “Reset demo data” or clearing site data removes it.`],
    ['Early-access requests', `Until a form service is connected, the early-access form saves your request in your browser and opens a pre-filled email to ${site.email}; nothing is sent until you send it. If the operator later connects a customer-relationship service (proposed: HubSpot), submitting sends the fields you enter and your consent choices to that service. This notice must be updated before that is switched on.`],
    ['Analytics and cookies', 'This website includes no analytics or advertising trackers and sets no cookies.'],
    ['Your requests', `Contact ${site.email} with questions about information you have sent.`],
  ]],
  terms: ['Terms of use', [
    ['A proposed product', `${site.name} is a startup concept. The team shown is fictional, pricing is illustrative, and nothing on this site is an offer of service.`],
    ['Demonstration only', 'The prototype uses fictional data and must not be used for real decisions.'],
    ['People decide', `${site.name} is designed to flag and organise information for authorised people to review. Decisions remain with those people.`],
    ['No affiliation', 'Named organisation types are prospective customers. No affiliation, partnership or endorsement is implied.'],
    ['Changes', 'These terms are a review draft. Operator details and governing law will be set out before launch.'],
  ]],
};

function Legal({kind}) {
  const [title, items] = LEGAL[kind];
  return (
    <section className="section legal">
      <div className="wrap narrow">
        <p className="kicker">Review draft · operator details to be confirmed</p>
        <h1>{title}</h1>
        {items.map(([t, text]) => <div key={t}><h2>{t}</h2><p>{text}</p></div>)}
      </div>
    </section>
  );
}

function NotFound() {
  return <section className="section legal"><div className="wrap narrow"><p className="kicker">404</p><h1>This page isn’t here.</h1><p><a className="text-link" href="/">Back to {site.name} <ArrowRight size={15} /></a></p></div></section>;
}

export default function App({path = '/'}) {
  if (path.startsWith('/app')) return <Prototype />;
  const page = path === '/' ? <Home /> : path === '/privacy' ? <Legal kind="privacy" /> : path === '/terms' ? <Legal kind="terms" /> : <NotFound />;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">{page}</main>
      <Footer />
    </>
  );
}
