import React, {useEffect, useState} from 'react';
import site from './content.js';
import {access, conditions, items, people, project, roles, rooms} from './data.js';
import {act, can, exportCsv, initial, inventory} from './engine.js';
import Scene from './Scene.jsx';

const KEY = 'salvora-survey-v1';
const STATUS = {proposed: 'Proposed', confirmed: 'Confirmed', inspection: 'Confirmed · inspection required', rejected: 'Rejected'};

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], {type: 'text/csv'}));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}

export default function Survey() {
  const [state, setState] = useState(() => initial(items, roles));
  const [room, setRoom] = useState('L3');
  const [sel, setSel] = useState('SLV-301');
  const [msg, setMsg] = useState('');
  const [note, setNote] = useState('');
  const [tab, setTab] = useState('inventory');
  useEffect(() => { try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s?.items) setState(s); } catch { /* ignore */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }, [state]);

  const actor = people[state.role];
  const allow = (p) => can(roles, state.role, p);
  const run = (a, after) => { const r = act(state, a, {roles, actor, conditions, access}); setMsg(r.ok ? '' : r.error); if (r.ok) { setState(r.state); after?.(); } };
  const it = state.items.find((i) => i.id === sel);
  const inRoom = state.items.filter((i) => i.room === room);
  const inv = inventory(state);
  const counts = {proposed: state.items.filter((i) => i.status === 'proposed').length, confirmed: inv.length, inspection: state.items.filter((i) => i.inspection && i.status !== 'rejected').length};

  return (
    <div className="survey">
      <header className="sv-top">
        <a href="/" className="tb-brand" aria-label="Back to the Salvora website">← SALVORA</a>
        <table className="sv-block"><tbody><tr><td>PROJECT</td><td>{project.name}</td><td>REF</td><td>{project.ref}</td></tr><tr><td>SCOPE</td><td colSpan="3">{project.scope}</td></tr></tbody></table>
        <label className="sv-role">ROLE <select value={state.role} onChange={(e) => run({type: 'role', role: e.target.value})}>{roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
        <button className="bx line sm" onClick={() => { setState(initial(items, roles)); setMsg(''); }}>RESET</button>
      </header>
      <p className="sv-tape">FICTIONAL SURVEY DATA · SUGGESTIONS ARE UNCONFIRMED UNTIL A SURVEYOR VERIFIES THEM · STRUCTURE & HAZARDS NEED QUALIFIED INSPECTION</p>
      <h1 className="sr">{site.app.title}</h1>
      <div className="sv-counts"><span><b>{counts.proposed}</b> proposed</span><span><b>{counts.confirmed}</b> in inventory</span><span><b>{counts.inspection}</b> need inspection</span></div>

      <div className="sv-grid">
        <section className="sv-photos" aria-labelledby="ph-title">
          <h2 id="ph-title" className="sv-h">PHOTOGRAPHS</h2>
          <div className="sv-rooms" role="tablist">{rooms.map((r) => <button key={r.id} role="tab" aria-selected={room === r.id} className={room === r.id ? 'on' : ''} onClick={() => { setRoom(r.id); const first = state.items.find((i) => i.room === r.id); if (first) setSel(first.id); }}>{r.id}</button>)}</div>
          <p className="sv-room">{rooms.find((r) => r.id === room).name}</p>
          <div className="sv-scene">
            <Scene scene={rooms.find((r) => r.id === room).scene} label={`Drawing of ${rooms.find((r) => r.id === room).name} with candidate items outlined`}>
              {inRoom.map((i) => { const [x, y, w, h] = i.box; return (
                <g key={i.id} className={`bbox s-${i.status}${i.id === sel ? ' on' : ''}`} onClick={() => setSel(i.id)} role="button" tabIndex={0} aria-label={`${i.id} ${i.label}`} onKeyDown={(e) => e.key === 'Enter' && setSel(i.id)}>
                  <rect x={x} y={y} width={w} height={h} /><rect x={x} y={y - 13} width={Math.max(54, i.id.length * 7)} height="13" className="bbox-tag" /><text x={x + 3} y={y - 3}>{i.id}</text>
                </g>); })}
            </Scene>
          </div>
          <ul className="sv-list">{inRoom.map((i) => <li key={i.id}><button className={i.id === sel ? 'on' : ''} onClick={() => setSel(i.id)}><b>{i.id}</b> {i.label}<em>{STATUS[i.status]}</em></button></li>)}</ul>
        </section>

        <section className="sv-item" aria-labelledby="it-title">
          <p className="sv-h">{it.id} · {STATUS[it.status]}</p>
          <h2 id="it-title">{it.label}</h2>
          <h3 className="sv-sub">Suggested category <small>— model estimate</small></h3>
          <ul className="probs">{it.probs.map(([c, p]) => <li key={c}><span>{c}</span><i style={{'--w': `${p * 100}%`}} /><b>{Math.round(p * 100)}%</b></li>)}</ul>
          <dl className="sv-facts"><div><dt>Proposed qty</dt><dd>{it.proposedQty.toLocaleString()}</dd></div><div><dt>Schedule qty</dt><dd>{it.scheduleQty ?? '—'}</dd></div><div><dt>Photos</dt><dd>{it.photos}</dd></div><div><dt>Reuse demand</dt><dd>{it.demand}</dd></div></dl>
          {it.flag && (
            <div className="sv-flag"><b>{it.flag.label}</b><p>{it.flag.why}</p>
              <table><thead><tr><th>Evidence</th><th>Value</th><th>Source</th></tr></thead><tbody>{it.flag.evidence.map(([k, v, s]) => <tr key={k}><td>{k}</td><td>{v}</td><td>{s}</td></tr>)}</tbody></table></div>
          )}
          {it.dup && (
            <div className="sv-dup">
              <p><b>Duplicate review</b> — {it.dup.photos} photos may show only {it.dup.likely} physical items.</p>
              {it.merged ? <p className="ok">Resolved: counted as {it.dup.likely}. Proposed quantity now {it.proposedQty}.</p> : <button className="bx sm" disabled={!allow('confirm')} onClick={() => run({type: 'merge', id: it.id})}>Count these photos as {it.dup.likely} items</button>}
            </div>
          )}
          {it.inspection && <p className="sv-insp">INSPECTION REQUIRED before recovery — Salvora tracks the requirement; a qualified person carries it out.</p>}

          {it.status === 'proposed' ? <ConfirmForm key={it.id + it.proposedQty} it={it} allow={allow} run={run} /> : (
            <div className="sv-done"><b>{it.decision.label}</b><p>“{it.decision.reason}” — {it.decision.by}</p>{it.confirmed && <p>{it.confirmed.qty} × {it.confirmed.category} · {it.confirmed.dims} · {it.confirmed.condition} · {it.confirmed.access} access</p>}{allow('confirm') && <button className="bx line sm" onClick={() => run({type: 'reopen', id: it.id})}>Reopen</button>}</div>
          )}
          {allow('refer') && !it.inspection && it.status !== 'rejected' && <ReferForm onRefer={(reason) => run({type: 'refer', id: it.id, reason})} />}
          <h3 className="sv-sub">Notes</h3>
          <ul className="sv-notes">{it.notes.map((n, i) => <li key={i}><b>{n.actor}</b> {n.text}</li>)}{!it.notes.length && <li className="muted">No notes.</li>}</ul>
          <div className="sv-row"><input aria-label="Add a note" value={note} disabled={!allow('note')} onChange={(e) => setNote(e.target.value)} placeholder="Site note" /><button className="bx line sm" disabled={!allow('note')} onClick={() => run({type: 'note', id: it.id, text: note}, () => setNote(''))}>ADD</button></div>
          {msg && <p className="sv-err" role="alert">{msg}</p>}
        </section>

        <aside className="sv-side" aria-label="Inventory and log">
          <div className="sv-tabs">{[['inventory', 'INVENTORY'], ['log', 'LOG']].map(([id, t]) => <button key={id} aria-pressed={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{t}</button>)}</div>
          {tab === 'inventory' ? (
            <div>
              <p className="muted">Confirmed items only, ranked from surveyor-confirmed inputs.</p>
              <ol className="sv-inv">{inv.map((i) => <li key={i.id}><b>{i.confirmed.qty} × {i.confirmed.category}</b><span>{i.id} · priority {i.score}{i.inspection ? ' · inspection req.' : ''}</span></li>)}{!inv.length && <li className="muted">Nothing confirmed yet.</li>}</ol>
              {allow('export') ? <button className="bx sm" disabled={!inv.length} onClick={() => download('salvora-recovery-inventory.csv', exportCsv(state))}>EXPORT INVENTORY</button> : <p className="muted">Export: {roles.filter((r) => r.can.includes('export')).map((r) => r.label).join(', ')}.</p>}
            </div>
          ) : (
            <div>
              <ul className="sv-log">{state.log.map((l, i) => <li key={i}><time>{new Date(l.at).toLocaleTimeString()}</time> <b>{l.actor}</b> · {l.id} · {l.summary}</li>)}{!state.log.length && <li className="muted">Every confirmation, rejection and referral is logged here.</li>}</ul>
              <table className="sv-perm"><thead><tr><th>Role</th><th>Note</th><th>Confirm</th><th>Refer</th><th>Export</th></tr></thead><tbody>{roles.map((r) => <tr key={r.id}><td>{r.label}</td>{['note', 'confirm', 'refer', 'export'].map((p) => <td key={p}>{r.can.includes(p) ? '■' : '□'}</td>)}</tr>)}</tbody></table>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function ConfirmForm({it, allow, run}) {
  const [f, setF] = useState({qty: String(it.proposedQty), dims: it.dims || '', condition: '', access: '', category: it.probs[0][0], reason: ''});
  const set = (k) => (e) => setF({...f, [k]: e.target.value});
  const off = !allow('confirm');
  return (
    <fieldset className="sv-confirm" disabled={off}>
      <legend>SURVEYOR CONFIRMATION</legend>
      <label>Category<select value={f.category} onChange={set('category')}>{it.probs.filter(([c]) => c !== 'Other').map(([c]) => <option key={c}>{c}</option>)}</select></label>
      <label>Quantity on site<input inputMode="numeric" value={f.qty} onChange={set('qty')} /></label>
      <label className="w">Dimensions<input value={f.dims} onChange={set('dims')} placeholder="e.g. 926 × 2040 mm" /></label>
      <label>Condition<select value={f.condition} onChange={set('condition')}><option value="">Choose…</option>{conditions.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Removal access<select value={f.access} onChange={set('access')}><option value="">Choose…</option>{access.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label className="w">Observation / reason<input value={f.reason} onChange={set('reason')} placeholder="What you saw on site" /></label>
      <div className="sv-row w">
        <button type="button" className="bx sm" onClick={() => run({type: 'confirm', id: it.id, ...f})}>CONFIRM ITEM</button>
        <button type="button" className="bx line sm" onClick={() => run({type: 'reject', id: it.id, reason: f.reason})}>REJECT CANDIDATE</button>
      </div>
      {off && <p className="muted w">Your role can review and comment, but surveyors confirm items.</p>}
    </fieldset>
  );
}

function ReferForm({onRefer}) {
  const [r, setR] = useState('');
  return <div className="sv-row"><input aria-label="Reason for inspection" value={r} onChange={(e) => setR(e.target.value)} placeholder="Why it needs a qualified inspection" /><button className="bx line sm" onClick={() => onRefer(r)}>REFER FOR INSPECTION</button></div>;
}
