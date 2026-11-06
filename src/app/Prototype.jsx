import React, {useEffect, useMemo, useState} from 'react';
import {ArrowLeft, Bot, Download, RotateCcw, Search, ShieldCheck, X, FileText, ListChecks, LayoutDashboard, History} from 'lucide-react';
import site from '../content.js';
import {seed} from '../seed.js';
import {act, assistant, can, initialState, stats, topFlag} from './engine.js';
import Logo from '../site/Logo.jsx';

const KEY = `${site.slug}-prototype-v1`;
const A = site.app;
const actorFor = (role) => seed.team.find((m) => m.role === role) || seed.team[0];

function Sev({f}) { return f ? <span className={`sev sev-${f.severity}`}>{f.label}</span> : <span className="sev sev-none">No flags</span>; }
function Conf({value}) { return <span className="conf-wrap"><span className="conf" style={{'--c': `${Math.round(value * 100)}%`}}><i /></span><small>{Math.round(value * 100)}%</small></span>; }

function Detail({item, state, run, onClose}) {
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');
  const r = (action, after) => { const res = run(action); setMsg(res.ok ? '' : res.error); if (res.ok && after) after(); };
  const allow = (p) => can(A.roles, state.role, p);
  return (
    <div className="drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer-head">
          <div><p className="kicker">{item.group} · {item.id}</p><h2 id="drawer-title">{item.title}</h2><p className="muted">{item.subtitle}</p></div>
          <button className="icon-btn" onClick={onClose} aria-label="Close record"><X size={18} /></button>
        </div>
        <dl className="metrics">{item.metrics.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <h3 className="drawer-h">AI flags <span className="muted">— suggestions for review, not conclusions</span></h3>
        {item.flags.length ? item.flags.map((f) => (
          <div className="flag" key={f.label}>
            <div className="flag-top"><Sev f={f} /><Conf value={f.confidence} /></div>
            <p>{f.explanation}</p>
            <table className="evidence"><thead><tr><th>Evidence</th><th>Value</th><th>Source</th></tr></thead><tbody>{f.evidence.map(([k, v, s]) => <tr key={k + s}><td>{k}</td><td>{v}</td><td className="muted">{s}</td></tr>)}</tbody></table>
          </div>
        )) : <p className="muted">No flags were raised for this {A.itemNoun}.</p>}
        <div className="drawer-row">
          <label>Assigned reviewer<select value={item.assignee || ''} disabled={!allow('assign')} title={allow('assign') ? undefined : 'Your role cannot assign'} onChange={(e) => r({type: 'assign', itemId: item.id, member: e.target.value})}><option value="">Unassigned</option>{seed.team.map((m) => <option key={m.name} value={m.name}>{m.name} — {m.role}</option>)}</select></label>
        </div>
        <h3 className="drawer-h">Notes</h3>
        <ul className="notes">{item.notes.map((n, i) => <li key={i}><b>{n.actor}</b> {n.text}</li>)}{!item.notes.length && <li className="muted">No notes yet.</li>}</ul>
        <div className="inline-form"><input aria-label="Add a note" placeholder="Add a note for the team" value={note} disabled={!allow('note')} onChange={(e) => setNote(e.target.value)} /><button className="button small ghost" disabled={!allow('note')} onClick={() => r({type: 'note', itemId: item.id, text: note}, () => setNote(''))}>Add note</button></div>
        <h3 className="drawer-h">Decision <span className="muted">— recorded by a person, with a reason</span></h3>
        {item.status !== 'open' ? (
          <div className="decided"><ShieldCheck size={18} aria-hidden="true" /><div><b>{item.decision?.label}</b><p>“{item.decision?.reason}” — {item.decision?.by}</p></div>{allow('decide') && <button className="text-link" onClick={() => r({type: 'reopen', itemId: item.id})}>Reopen</button>}</div>
        ) : (
          <>
            <textarea aria-label="Reason for decision" rows="2" placeholder="Why? (required, at least 8 characters)" value={reason} onChange={(e) => setReason(e.target.value)} />
            <div className="decisions">
              <button className="button small" disabled={!allow('decide')} onClick={() => r({type: 'decide', itemId: item.id, decision: 'confirm', reason}, () => setReason(''))}>{A.decisions.confirm}</button>
              <button className="button small ghost" disabled={!allow('decide')} onClick={() => r({type: 'decide', itemId: item.id, decision: 'dismiss', reason}, () => setReason(''))}>{A.decisions.dismiss}</button>
              <button className="button small ghost" disabled={!allow('escalate')} onClick={() => r({type: 'decide', itemId: item.id, decision: 'escalate', reason}, () => setReason(''))}>{A.decisions.escalate}</button>
            </div>
            {!allow('decide') && <p className="muted small">Your current role can review and comment but not decide.</p>}
          </>
        )}
        {msg && <p className="err" role="alert">{msg}</p>}
      </aside>
    </div>
  );
}

function Assistant({state}) {
  const [q, setQ] = useState('');
  const [ans, setAns] = useState(() => assistant('', state, A));
  const ask = (text) => { setQ(text); setAns(assistant(text, state, A)); };
  return (
    <section className="panel assistant" aria-labelledby="as-title">
      <div className="panel-head"><h2 id="as-title"><Bot size={17} aria-hidden="true" /> Ask about these records</h2><span className="badge">Grounded · sample data</span></div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="inline-form"><input id="assistant-q" aria-label="Ask a question" value={q} onChange={(e) => setQ(e.target.value)} placeholder={A.examples[0]} /><button className="button small">Ask</button></form>
      <div className="chips">{A.examples.map((x) => <button key={x} type="button" className="chip" onClick={() => ask(x)}>{x}</button>)}</div>
      <div className={`answer ${ans.kind}`} aria-live="polite"><b>{ans.title}</b><ul>{ans.lines.map((l) => <li key={l}>{l}</li>)}</ul>{ans.sources.length > 0 && <p className="muted small">Sources: {ans.sources.join(', ')}</p>}</div>
    </section>
  );
}

export default function Prototype() {
  const [state, setState] = useState(() => initialState(seed, A.roles));
  const [tab, setTab] = useState('overview');
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState({q: '', status: 'open', sev: ''});
  useEffect(() => { try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s?.items) setState(s); } catch { /* ignore */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }, [state]);
  const role = A.roles.find((r) => r.id === state.role);
  const actor = actorFor(role.label).name;
  const run = (action) => { const res = act(state, action, {roles: A.roles, actor, decisions: A.decisions}); if (res.ok) setState(res.state); return res; };
  const s = stats(state);
  const rows = useMemo(() => state.items.filter((i) => (!filter.status || i.status === filter.status) && (!filter.sev || topFlag(i)?.severity === filter.sev) && (!filter.q || `${i.id} ${i.title} ${i.subtitle} ${i.group}`.toLowerCase().includes(filter.q.toLowerCase()))), [state.items, filter]);
  const groups = [...new Set(state.items.map((i) => i.group))];
  const exportCsv = () => {
    const lines = [['time', 'actor', 'role', 'record', 'change'], ...state.audit.map((a) => [a.at, a.actor, a.role, a.itemId, a.summary])].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','));
    const url = URL.createObjectURL(new Blob([lines.join('\n')], {type: 'text/csv'}));
    const a = document.createElement('a'); a.href = url; a.download = `${site.slug}-audit-log.csv`; a.click(); URL.revokeObjectURL(url);
  };
  const tabs = [['overview', 'Overview', LayoutDashboard], ['queue', A.queueTitle, ListChecks], ['audit', 'Audit log', History]];
  const item = open && state.items.find((i) => i.id === open);
  return (
    <div className="app">
      <header className="app-top">
        <a href="/" className="app-back" aria-label={`Back to the ${site.name} website`}><ArrowLeft size={16} /> <Logo /></a>
        <div className="app-controls">
          <label className="demo-as">Demo as<select id="demo-as" value={state.role} onChange={(e) => run({type: 'role', role: e.target.value})}>{A.roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
          <button className="button small ghost" onClick={() => { setState(initialState(seed, A.roles)); setOpen(null); }}><RotateCcw size={14} aria-hidden="true" /> Reset demo data</button>
        </div>
      </header>
      <div className="app-banner"><ShieldCheck size={15} aria-hidden="true" /> Prototype with fictional data. {A.humanNote}</div>
      <nav className="app-tabs" aria-label="Prototype sections">{tabs.map(([id, label, Icon]) => <button key={id} className={tab === id ? 'on' : ''} aria-pressed={tab === id} onClick={() => setTab(id)}><Icon size={15} aria-hidden="true" /> {label}</button>)}</nav>
      <main className="app-main">
        <h1 className="app-title">{A.title}</h1>
        <p className="muted app-sub">{A.subtitle}</p>
        {tab === 'overview' && (
          <>
            <div className="kpis">
              {[['Open', s.open], ['High severity', s.high], ['Confirmed', s.confirmed], ['Escalated', s.escalated]].map(([k, v]) => <div className="kpi" key={k}><span>{k}</span><b>{v}</b></div>)}
            </div>
            <div className="app-grid">
              <section className="panel" aria-labelledby="by-group">
                <div className="panel-head"><h2 id="by-group">Open {A.itemNounPlural} by {A.groupLabel}</h2></div>
                <ul className="bars">{groups.map((g) => { const n = state.items.filter((i) => i.group === g && i.status === 'open').length; return <li key={g}><span>{g}</span><span className="bar"><i style={{width: `${(n / Math.max(1, s.total)) * 100 * 2.2}%`}} /></span><b>{n}</b></li>; })}</ul>
                <h3 className="drawer-h">Needs attention first</h3>
                <ul className="top-list">{state.items.filter((i) => i.status === 'open' && i.flags.length).sort((a, b) => topFlag(b).confidence - topFlag(a).confidence).slice(0, 4).map((i) => <li key={i.id}><button onClick={() => setOpen(i.id)}><b>{i.id}</b> {i.title}</button><Sev f={topFlag(i)} /></li>)}</ul>
              </section>
              <Assistant state={state} />
            </div>
          </>
        )}
        {tab === 'queue' && (
          <section className="panel" aria-labelledby="q-title">
            <div className="panel-head"><h2 id="q-title">{A.queueTitle}</h2><span className="muted small">{rows.length} shown</span></div>
            <div className="filters">
              <label className="search"><Search size={15} aria-hidden="true" /><input aria-label={`Search ${A.itemNounPlural}`} placeholder="Search ID, name or group" value={filter.q} onChange={(e) => setFilter({...filter, q: e.target.value})} /></label>
              <select aria-label="Filter by status" value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})}><option value="">All statuses</option><option value="open">Open</option><option value="confirmed">Confirmed</option><option value="dismissed">Dismissed</option><option value="escalated">Escalated</option></select>
              <select aria-label="Filter by severity" value={filter.sev} onChange={(e) => setFilter({...filter, sev: e.target.value})}><option value="">All severities</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
            </div>
            <div className="table-wrap">
              <table className="queue">
                <thead><tr><th>ID</th><th>{A.itemNoun[0].toUpperCase() + A.itemNoun.slice(1)}</th><th>{A.groupLabel[0].toUpperCase() + A.groupLabel.slice(1)}</th><th>Top flag</th><th>Confidence</th><th>Status</th></tr></thead>
                <tbody>{rows.map((i) => { const f = topFlag(i); return (
                  <tr key={i.id} onClick={() => setOpen(i.id)} className="clickable">
                    <td><button className="link-btn" onClick={(e) => { e.stopPropagation(); setOpen(i.id); }} aria-label={`Open ${i.id}`}>{i.id}</button></td>
                    <td><b>{i.title}</b><span className="muted small block">{i.subtitle}</span></td><td>{i.group}</td><td><Sev f={f} /></td><td>{f ? <Conf value={f.confidence} /> : '—'}</td><td><span className={`status st-${i.status}`}>{i.status}</span></td>
                  </tr>); })}
                  {!rows.length && <tr><td colSpan="6" className="empty">No {A.itemNounPlural} match these filters.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {tab === 'audit' && (
          <section className="panel" aria-labelledby="au-title">
            <div className="panel-head"><h2 id="au-title"><FileText size={16} aria-hidden="true" /> Audit log</h2>{can(A.roles, state.role, 'export') ? <button className="button small ghost" onClick={exportCsv}><Download size={14} aria-hidden="true" /> Export CSV</button> : <span className="muted small">Export available to {A.roles.filter((r) => r.can.includes('export')).map((r) => r.label).join(', ')}</span>}</div>
            <table className="perm"><thead><tr><th>Role</th>{['view', 'note', 'assign', 'decide', 'escalate', 'export'].map((p) => <th key={p}>{p}</th>)}</tr></thead><tbody>{A.roles.map((r) => <tr key={r.id}><td>{r.label}</td>{['view', 'note', 'assign', 'decide', 'escalate', 'export'].map((p) => <td key={p}>{r.can.includes(p) ? '✓' : '—'}</td>)}</tr>)}</tbody></table>
            <ul className="audit">{state.audit.map((a, i) => <li key={i}><time>{new Date(a.at).toLocaleString()}</time><b>{a.actor}</b><span className="muted">{a.role}</span><span>{a.itemId}</span><span>{a.summary}</span></li>)}{!state.audit.length && <li className="muted">No changes yet. Open a record and make a decision — it will appear here.</li>}</ul>
          </section>
        )}
      </main>
      {item && <Detail item={item} state={state} run={run} onClose={() => setOpen(null)} />}
    </div>
  );
}
