import React, {useState} from 'react';
import {ArrowRight, Check} from 'lucide-react';
import site from '../content.js';

const empty = {name: '', email: '', org: '', type: '', message: '', consent: false, marketing: false, website: ''};
const hubspot = () => {
  const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};
  return env.VITE_HUBSPOT_PORTAL_ID && env.VITE_HUBSPOT_FORM_GUID ? {portal: env.VITE_HUBSPOT_PORTAL_ID, form: env.VITE_HUBSPOT_FORM_GUID} : null;
};

export function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid work email.';
  if (!f.org.trim()) e.org = 'Please enter your organisation.';
  if (!f.type) e.type = 'Please choose an organisation type.';
  if (!f.consent) e.consent = 'Please confirm we may contact you.';
  return e;
}

export default function LeadForm() {
  const [f, setF] = useState(empty);
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(null);
  const set = (k, v) => setF((x) => ({...x, [k]: v}));
  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate(f); setErr(e);
    if (Object.keys(e).length) { document.getElementById(`lf-${Object.keys(e)[0]}`)?.focus(); return; }
    if (f.website) { setSent('local'); return; }
    const hs = hubspot();
    if (hs) {
      try {
        const [firstname, ...rest] = f.name.trim().split(/\s+/);
        const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${hs.portal}/${hs.form}`, {method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({fields: [['firstname', firstname], ['lastname', rest.join(' ')], ['email', f.email], ['company', f.org], ['organisation_type', f.type], ['message', f.message]].filter(([, v]) => v).map(([name, value]) => ({name, value})),
            context: {pageUri: location.href, pageName: document.title}, legalConsentOptions: {consent: {consentToProcess: true, text: `I agree that ${site.name} may contact me about this request.`}}})});
        if (res.ok) { setSent('hubspot'); return; }
      } catch { /* fall back to email below */ }
    }
    try { const k = `${site.slug}-early-access`; localStorage.setItem(k, JSON.stringify([...(JSON.parse(localStorage.getItem(k) || '[]')), {...f, website: undefined, at: new Date().toISOString()}])); } catch { /* storage unavailable */ }
    setSent('local');
  };
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${site.name} early access — ${f.org}`)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nOrganisation: ${f.org}\nType: ${f.type}\n\n${f.message}`)}`;
  const field = (k) => ({id: `lf-${k}`, 'aria-invalid': err[k] ? true : undefined, 'aria-describedby': err[k] ? `lf-${k}-e` : undefined});
  const E = ({k}) => (err[k] ? <span className="err" id={`lf-${k}-e`} role="alert">{err[k]}</span> : null);
  return (
    <section className="section dark" id="early-access" aria-labelledby="ea-title">
      <div className="wrap split">
        <div data-rv>
          <p className="kicker">Early access</p>
          <h2 id="ea-title">{site.early.title}</h2>
          <p className="large">{site.early.text}</p>
          <ol className="ea-steps">{site.early.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <div className="form-card" data-rv style={{'--rv-d': '120ms'}}>
          {sent ? (
            <div className="sent" role="status">
              <Check size={28} aria-hidden="true" />
              <h3>Thank you, {f.name.split(' ')[0] || 'there'}.</h3>
              {sent === 'hubspot' ? <p>Your request has been sent. A founder will reply personally.</p> : <><p>Your request is saved in this browser. To make sure it reaches us, send it as an email — it is pre-filled.</p><a className="button" href={mailto}>Email {site.email}</a></>}
              <button type="button" className="text-link" onClick={() => setSent(null)}>Edit request</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <div className="form-grid">
                <label>Full name<input {...field('name')} autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} /><E k="name" /></label>
                <label>Work email<input {...field('email')} type="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} /><E k="email" /></label>
                <label>Organisation<input {...field('org')} autoComplete="organization" value={f.org} onChange={(e) => set('org', e.target.value)} /><E k="org" /></label>
                <label>Organisation type<select {...field('type')} value={f.type} onChange={(e) => set('type', e.target.value)}><option value="">Choose…</option>{site.audiences.map((a) => <option key={a.title}>{a.title}</option>)}<option>Other</option></select><E k="type" /></label>
                <label className="full">What would you like to improve? (optional)<textarea rows="3" value={f.message} onChange={(e) => set('message', e.target.value)} /></label>
                <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label></div>
                <label className="check full"><input type="checkbox" {...field('consent')} checked={f.consent} onChange={(e) => set('consent', e.target.checked)} /> I agree that {site.name} may contact me about this request.<E k="consent" /></label>
                <label className="check full"><input type="checkbox" checked={f.marketing} onChange={(e) => set('marketing', e.target.checked)} /> Send me occasional product updates (optional).</label>
              </div>
              <button className="button full-btn" type="submit">Request early access <ArrowRight size={16} aria-hidden="true" /></button>
              <p className="form-note">Nothing is sent until you confirm. See the <a href="/privacy">privacy notice</a>.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
