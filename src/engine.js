// Survey inventory rules: suggestions stay unconfirmed until a surveyor confirms quantity, dimensions and
// condition; priorities use only confirmed inputs; only confirmed items are exported.

export const can = (roles, roleId, perm) => !!roles.find((r) => r.id === roleId)?.can.includes(perm);

export function initial(items, roles) {
  return {items: structuredClone(items), log: [], role: roles[0].id};
}

const now = () => new Date().toISOString();

export function act(state, a, {roles, actor, conditions, access}) {
  const fail = (error) => ({state, ok: false, error});
  if (a.type === 'role') return {state: {...state, role: a.role}, ok: true};
  const it = state.items.find((i) => i.id === a.id);
  if (!it) return fail('Item not found.');
  const allow = (p) => can(roles, state.role, p);
  const put = (next, summary) => ({ok: true, state: {...state, items: state.items.map((i) => (i.id === it.id ? next : i)), log: [{at: now(), actor, role: state.role, id: it.id, summary}, ...state.log]}});
  const reason = (a.reason || '').trim();

  switch (a.type) {
    case 'merge': {
      if (!allow('confirm')) return fail('Your role cannot resolve duplicates.');
      if (!it.dup || it.merged) return fail('There is no open duplicate group on this item.');
      const qty = it.proposedQty - (it.dup.photos - it.dup.likely);
      return put({...it, merged: true, proposedQty: qty}, `Resolved duplicate photos: ${it.dup.photos} photos counted as ${it.dup.likely} items (proposed ${it.proposedQty} → ${qty})`);
    }
    case 'note': {
      if (!allow('note')) return fail('Your role cannot add notes.');
      const text = (a.text || '').trim();
      if (text.length < 3) return fail('Write a note first.');
      return put({...it, notes: [...it.notes, {at: now(), actor, text}]}, 'Added a note');
    }
    case 'confirm': {
      if (!allow('confirm')) return fail('Your role cannot confirm items.');
      if (it.status !== 'proposed') return fail('Reopen the item before changing it.');
      if (it.dup && !it.merged) return fail('Resolve the possible duplicate photos first.');
      const qty = Number(a.qty);
      if (!Number.isInteger(qty) || qty < 1) return fail('Enter the quantity you confirmed on site.');
      if (!(a.dims || '').trim()) return fail('Enter the dimensions you confirmed.');
      if (!conditions.includes(a.condition)) return fail('Choose the condition you observed.');
      if (!access.includes(a.access)) return fail('Choose how easy the item is to remove.');
      if (reason.length < 8) return fail('Add a short reason or observation (at least 8 characters).');
      const confirmed = {qty, dims: a.dims.trim(), condition: a.condition, access: a.access, category: a.category || it.probs[0][0]};
      return put({...it, status: it.inspection ? 'inspection' : 'confirmed', confirmed, decision: {by: actor, at: now(), label: 'Confirmed by surveyor', reason}},
        `Confirmed ${qty} × ${confirmed.category} (${a.condition}, ${a.access.toLowerCase()} access)${it.inspection ? ' — inspection still required' : ''}`);
    }
    case 'reject': {
      if (!allow('confirm')) return fail('Your role cannot reject items.');
      if (reason.length < 8) return fail('Add a reason (at least 8 characters).');
      return put({...it, status: 'rejected', decision: {by: actor, at: now(), label: 'Not suitable for recovery', reason}}, `Rejected — “${reason}”`);
    }
    case 'refer': {
      if (!allow('refer')) return fail('Your role cannot refer items for inspection.');
      if (reason.length < 8) return fail('Add a reason (at least 8 characters).');
      return put({...it, inspection: true, notes: [...it.notes, {at: now(), actor, text: `Inspection requested: ${reason}`}]}, `Referred for qualified inspection — “${reason}”`);
    }
    case 'reopen':
      if (!allow('confirm')) return fail('Your role cannot reopen items.');
      return put({...it, status: 'proposed', confirmed: null, decision: null}, 'Reopened');
    default:
      return fail('Unknown action.');
  }
}

/** Recovery priority from confirmed inputs only: condition, access, demand and quantity. Unconfirmed items have none. */
export function priority(it) {
  if (!it.confirmed) return null;
  const c = {Good: 3, Fair: 2, Poor: 0}[it.confirmed.condition];
  const a = {Easy: 2, Moderate: 1, Difficult: 0}[it.confirmed.access];
  const d = {High: 3, Medium: 2, Low: 1}[it.demand];
  const q = Math.min(2, Math.log10(it.confirmed.qty + 1));
  return Math.round((c * 2 + a + d * 1.5 + q) * 10) / 10;
}

export function inventory(state) {
  return state.items.filter((i) => i.confirmed && i.status !== 'rejected').map((i) => ({...i, score: priority(i)})).sort((x, y) => y.score - x.score);
}

export function exportCsv(state) {
  const rows = [['rank', 'id', 'category', 'qty', 'dimensions', 'condition', 'access', 'demand', 'inspection', 'priority', 'confirmed_by']];
  inventory(state).forEach((i, n) => rows.push([n + 1, i.id, i.confirmed.category, i.confirmed.qty, i.confirmed.dims, i.confirmed.condition, i.confirmed.access, i.demand, i.inspection ? 'Required before recovery' : 'Not required', i.score, i.decision.by]));
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}
