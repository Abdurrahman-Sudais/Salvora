import React, {useState} from 'react';
import site from './content.js';
import {COMPANY_SIZES, ORG_TYPES, PROGRESS, USE_CASES, blankPilot, hubspot, pilotPayload, send, validatePilot} from './forms.js';

export default function LeadForm() {
  const [f, setF] = useState(blankPilot);
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(null);
  const set = (k, v) => setF((x) => ({...x, [k]: v}));
  const submit = async (ev) => {
    ev.preventDefault();
    const e = validatePilot(f); setErr(e);
    if (Object.keys(e).length) { document.getElementById(`lf-${Object.keys(e)[0]}`)?.focus(); return; }
    if (f.website) { setSent('local'); return; }
    const hs = hubspot('pilot');
    if (hs) { try { if (await send(hs, pilotPayload(f, {pageUri: location.href, pageName: document.title}))) { setSent('hubspot'); return; } } catch { /* fall back to email */ } }
    try { const k = 'salvora-pilot-requests'; localStorage.setItem(k, JSON.stringify([...JSON.parse(localStorage.getItem(k) || '[]'), {...f, website: undefined, at: new Date().toISOString()}])); } catch { /* storage unavailable */ }
    setSent('local');
  };
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Salvora survey pilot — ${f.company}`)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nCompany: ${f.company}\nCompany size: ${f.size}\nType: ${f.kind}\nUse case: ${f.useCase}\nBuilding: ${f.building}\n\n${f.message}`)}`;
  const field = (k) => ({id: `lf-${k}`, 'aria-invalid': err[k] ? true : undefined, 'aria-describedby': err[k] ? `lf-${k}-e` : undefined});
  const E = ({k}) => (err[k] ? <span className="err" id={`lf-${k}-e`} role="alert">{err[k]}</span> : null);
  const opts = (list) => [<option key="" value="">Choose…</option>, ...list.map((x) => <option key={x}>{x}</option>)];
  return (
    <section className="sheet" id="pilot" aria-labelledby="pilot-title">
      <div className="sheet-h"><span className="sn">12</span><h2 id="pilot-title">Progress and pilot programme.</h2></div>
      <div className="pilot">
        <div>
          <p className="sheet-intro">Salvora is in its building stage and opening its first pilots. A pilot covers one building: your photographs, plans and survey records in, a verified recovery inventory out. Your surveyors judge every suggestion before anything is relied on.</p>
          <h3 className="sub">Where Salvora is today</h3>
          <table className="revs progress"><thead><tr><th>Rev</th><th>Status</th><th>Milestone</th></tr></thead>
            <tbody>{PROGRESS.map(([r, st, t, d]) => <tr key={r} className={st === 'Next' ? 'next' : ''}><td>{r}</td><td>{st}</td><td><b>{t}</b><span>{d}</span></td></tr>)}</tbody></table>
        </div>
        {sent ? (
          <div className="sent" role="status">
            <h3>Received — thank you, {f.name.split(' ')[0] || 'there'}.</h3>
            {sent === 'hubspot' ? <p>Your request is on its way. {site.team[0].name.split(' ')[0]} will reply personally.</p> : <><p>Your request is saved in this browser. Send it as an email so it reaches us — it is pre-filled.</p><a className="bx" href={mailto}>Email {site.email}</a></>}
            <button type="button" className="link" onClick={() => setSent(null)}>Edit request</button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="form" aria-label="Request a survey pilot">
            <label>Full name *<input {...field('name')} autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} /><E k="name" /></label>
            <label>Work email *<input {...field('email')} type="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} /><E k="email" /></label>
            <label>Company *<input {...field('company')} autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} /><E k="company" /></label>
            <label>Company size *<select {...field('size')} value={f.size} onChange={(e) => set('size', e.target.value)}>{opts(COMPANY_SIZES)}</select><E k="size" /></label>
            <label>Organisation type *<select {...field('kind')} value={f.kind} onChange={(e) => set('kind', e.target.value)}>{opts(ORG_TYPES)}</select><E k="kind" /></label>
            <label>Primary use case *<select {...field('useCase')} value={f.useCase} onChange={(e) => set('useCase', e.target.value)}>{opts(USE_CASES)}</select><E k="useCase" /></label>
            <label className="wide">Building for the pilot (optional)<input value={f.building} placeholder="e.g. 4-storey office, ~5,000 m², strip-out in Q2" onChange={(e) => set('building', e.target.value)} /></label>
            <label className="wide">Message (optional)<textarea rows="3" value={f.message} onChange={(e) => set('message', e.target.value)} /></label>
            <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label></div>
            <label className="check wide"><input type="checkbox" {...field('consent')} checked={f.consent} onChange={(e) => set('consent', e.target.checked)} /> Salvora may contact me about this request. *<E k="consent" /></label>
            <button className="bx wide" type="submit">Request a pilot</button>
            <p className="note wide">We use these details only to respond to your request. See the <a href="/privacy">privacy notice</a>.</p>
          </form>
        )}
      </div>
    </section>
  );
}
