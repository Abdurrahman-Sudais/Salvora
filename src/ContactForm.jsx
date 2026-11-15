import React, {useState} from 'react';
import site from './content.js';
import {TOPICS, blankContact, contactPayload, hubspot, send, validateContact} from './forms.js';

export default function ContactForm() {
  const [f, setF] = useState(blankContact);
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(null);
  const set = (k, v) => setF((x) => ({...x, [k]: v}));
  const submit = async (ev) => {
    ev.preventDefault();
    const e = validateContact(f); setErr(e);
    if (Object.keys(e).length) { document.getElementById(`cf-${Object.keys(e)[0]}`)?.focus(); return; }
    if (f.website) { setSent('local'); return; }
    const hs = hubspot('contact');
    if (hs) { try { if (await send(hs, contactPayload(f, {pageUri: location.href, pageName: document.title}))) { setSent('hubspot'); return; } } catch { /* fall back to email */ } }
    setSent('local');
  };
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${f.topic || 'Question'} — ${f.name}`)}&body=${encodeURIComponent(`${f.message}\n\nName: ${f.name}\nCompany: ${f.company}`)}`;
  const field = (k) => ({id: `cf-${k}`, 'aria-invalid': err[k] ? true : undefined, 'aria-describedby': err[k] ? `cf-${k}-e` : undefined});
  const E = ({k}) => (err[k] ? <span className="err" id={`cf-${k}-e`} role="alert">{err[k]}</span> : null);
  return (
    <section className="sheet" id="contact" aria-labelledby="contact-title">
      <div className="sheet-h"><span className="sn">13</span><h2 id="contact-title">Talk to the Salvora team.</h2></div>
      <div className="pilot">
        <div>
          <p className="sheet-intro">Questions about the product, the pilot programme, salvage partnerships or how site photographs and documents are handled. Messages go directly to the founders.</p>
          <dl className="contact-list"><div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div><div><dt>Founder</dt><dd>{site.team[0].name}</dd></div></dl>
        </div>
        {sent ? (
          <div className="sent" role="status">
            <h3>Thanks, {f.name.split(' ')[0] || 'there'}.</h3>
            {sent === 'hubspot' ? <p>Your message has reached the founders. We reply by email.</p> : <><p>No form service is connected yet, so please send your message as an email — it is pre-filled.</p><a className="bx" href={mailto}>Email {site.email}</a></>}
            <button type="button" className="link" onClick={() => setSent(null)}>Edit message</button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="form" aria-label="Send a message">
            <label>Name *<input {...field('name')} autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} /><E k="name" /></label>
            <label>Email *<input {...field('email')} type="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} /><E k="email" /></label>
            <label>Company (optional)<input {...field('company')} autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} /></label>
            <label>Topic *<select {...field('topic')} value={f.topic} onChange={(e) => set('topic', e.target.value)}><option value="">Choose…</option>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select><E k="topic" /></label>
            <label className="wide">Message *<textarea {...field('message')} rows="4" value={f.message} onChange={(e) => set('message', e.target.value)} /><E k="message" /></label>
            <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label></div>
            <label className="check wide"><input type="checkbox" {...field('consent')} checked={f.consent} onChange={(e) => set('consent', e.target.checked)} /> Salvora may reply to this message. *<E k="consent" /></label>
            <button className="bx wide" type="submit">Send message</button>
          </form>
        )}
      </div>
    </section>
  );
}
