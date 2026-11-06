/* Prototype engine: pure functions so the review rules can be tested without a browser. */
export const PERMS = ['view', 'note', 'assign', 'decide', 'escalate', 'export'];

export const can = (roles, roleId, perm) => !!roles.find((r) => r.id === roleId)?.can.includes(perm);

export function initialState(seed, roles) {
  return {items: structuredClone(seed.items), audit: [], role: roles[0].id};
}

const stamp = () => new Date().toISOString();

/** Apply an action; returns {state, ok, error}. Every successful change is written to the audit log. */
export function act(state, action, {roles, actor, decisions}) {
  const fail = (error) => ({state, ok: false, error});
  const item = action.itemId && state.items.find((i) => i.id === action.itemId);
  if (action.itemId && !item) return fail('Record not found.');
  const log = (summary) => ({...state, items: state.items.map((i) => (i.id === item.id ? next : i)), audit: [{at: stamp(), actor, role: state.role, itemId: item.id, summary}, ...state.audit]});
  let next;
  switch (action.type) {
    case 'assign':
      if (!can(roles, state.role, 'assign')) return fail('Your role cannot assign records.');
      next = {...item, assignee: action.member || null};
      return {state: log(action.member ? `Assigned to ${action.member}` : 'Unassigned'), ok: true};
    case 'note': {
      if (!can(roles, state.role, 'note')) return fail('Your role cannot add notes.');
      const text = (action.text || '').trim();
      if (text.length < 3) return fail('Write a note first.');
      next = {...item, notes: [...item.notes, {at: stamp(), actor, text}]};
      return {state: log('Added a note'), ok: true};
    }
    case 'decide': {
      const perm = action.decision === 'escalate' ? 'escalate' : 'decide';
      if (!can(roles, state.role, perm)) return fail('Your role cannot make this decision.');
      if (!decisions[action.decision]) return fail('Unknown decision.');
      const reason = (action.reason || '').trim();
      if (reason.length < 8) return fail('Record a reason of at least 8 characters — decisions must be explainable.');
      next = {...item, status: action.decision === 'confirm' ? 'confirmed' : action.decision === 'dismiss' ? 'dismissed' : 'escalated', decision: {by: actor, at: stamp(), label: decisions[action.decision], reason}};
      return {state: log(`${decisions[action.decision]} — “${reason}”`), ok: true};
    }
    case 'reopen':
      if (!can(roles, state.role, 'decide')) return fail('Your role cannot reopen records.');
      next = {...item, status: 'open', decision: null};
      return {state: log('Reopened for review'), ok: true};
    case 'role':
      return {state: {...state, role: action.role}, ok: true};
    default:
      return fail('Unknown action.');
  }
}

export const sevRank = {high: 0, medium: 1, low: 2};
export const topFlag = (item) => [...item.flags].sort((a, b) => sevRank[a.severity] - sevRank[b.severity] || b.confidence - a.confidence)[0];

export function stats(state) {
  const by = (s) => state.items.filter((i) => i.status === s).length;
  return {total: state.items.length, open: by('open'), confirmed: by('confirmed'), dismissed: by('dismissed'), escalated: by('escalated'),
    high: state.items.filter((i) => i.status === 'open' && topFlag(i)?.severity === 'high').length};
}

/** Grounded assistant: answers only from the records in the prototype, and refuses decisions it must not make. */
export function assistant(question, state, app) {
  const q = question.trim();
  if (!q) return {kind: 'help', title: 'Ask about the records', lines: app.examples, sources: []};
  if (new RegExp(app.refuse, 'i').test(q)) return {kind: 'refusal', title: 'That decision belongs to a person', lines: [app.refuseText], sources: []};
  const id = q.toUpperCase().match(/[A-Z]{2,4}-\d{2,4}/)?.[0];
  if (id) {
    const it = state.items.find((i) => i.id === id);
    if (!it) return {kind: 'answer', title: `No record called ${id}`, lines: ['That ID is not in this prototype.'], sources: []};
    const f = topFlag(it);
    return {kind: 'answer', title: `${it.id} · ${it.title}`, lines: [it.subtitle, f ? `Top flag: ${f.label} (${Math.round(f.confidence * 100)}% confidence) — ${f.explanation}` : 'No flags raised.', `Status: ${it.status}${it.assignee ? ` · assigned to ${it.assignee}` : ' · unassigned'}.`], sources: [it.id, ...(f ? f.evidence.map((e) => e[2]) : [])]};
  }
  const open = state.items.filter((i) => i.status === 'open' && i.flags.length).sort((a, b) => sevRank[topFlag(a).severity] - sevRank[topFlag(b).severity] || topFlag(b).confidence - topFlag(a).confidence);
  if (/review|attention|priorit|first|urgent|high|risk|top/i.test(q)) {
    return {kind: 'answer', title: `${open.length} open ${app.itemNounPlural} need review`, lines: open.slice(0, 5).map((i) => `${i.id} — ${i.title}: ${topFlag(i).label} (${topFlag(i).severity}, ${Math.round(topFlag(i).confidence * 100)}%)`), sources: open.slice(0, 5).map((i) => i.id)};
  }
  const group = state.items.find((i) => q.toLowerCase().includes(i.group.toLowerCase()))?.group;
  if (group) {
    const g = state.items.filter((i) => i.group === group);
    return {kind: 'answer', title: `${group}: ${g.length} ${app.itemNounPlural}`, lines: g.map((i) => `${i.id} — ${i.title} · ${i.status}${i.flags.length ? ` · ${topFlag(i).label}` : ''}`), sources: g.map((i) => i.id)};
  }
  if (/how many|count|summar|overview|status|progress/i.test(q)) {
    const s = stats(state);
    return {kind: 'answer', title: 'Where the review stands', lines: [`${s.open} open, ${s.confirmed} confirmed, ${s.dismissed} dismissed, ${s.escalated} escalated (of ${s.total}).`, `${s.high} open ${app.itemNounPlural} carry a high-severity flag.`], sources: ['All records']};
  }
  return {kind: 'help', title: 'I can answer questions about these records', lines: app.examples, sources: []};
}
