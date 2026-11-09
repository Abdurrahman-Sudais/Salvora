import test from 'node:test';
import assert from 'node:assert/strict';
import site from '../src/content.js';
import {access, conditions, items, roles} from '../src/data.js';
import {act, exportCsv, initial, inventory, priority} from '../src/engine.js';

const ctx = {roles, actor: 'Test Surveyor', conditions, access};
const as = (s, role) => act(s, {type: 'role', role}, ctx).state;
const good = {qty: '40', dims: '926 × 2040 mm', condition: 'Good', access: 'Easy', reason: 'Checked every door on level 3'};

test('items are well formed and boxes sit inside the room drawing', () => {
  for (const i of items) {
    assert.match(i.id, /^SLV-\d{3}$/);
    const [x, y, w, h] = i.box; assert.ok(x >= 0 && y >= 13 && x + w <= 400 && y + h <= 240, i.id);
    const total = i.probs.reduce((a, [, p]) => a + p, 0); assert.ok(Math.abs(total - 1) < 0.011, i.id);
  }
});

test('duplicates must be resolved before confirming, and resolving adjusts the proposed count', () => {
  let s = as(initial(items, roles), 'surveyor');
  assert.equal(act(s, {type: 'confirm', id: 'SLV-301', ...good}, ctx).ok, false);
  s = act(s, {type: 'merge', id: 'SLV-301'}, ctx).state;
  assert.equal(s.items[0].proposedQty, 40);
  assert.equal(act(s, {type: 'confirm', id: 'SLV-301', ...good}, ctx).ok, true);
});

test('confirmation needs quantity, dimensions, condition, access, a reason and the right role', () => {
  let s = as(initial(items, roles), 'planner');
  assert.equal(act(s, {type: 'confirm', id: 'SLV-308', ...good, qty: '1'}, ctx).ok, false);
  s = as(s, 'surveyor');
  assert.equal(act(s, {type: 'confirm', id: 'SLV-308', ...good, qty: '0'}, ctx).ok, false);
  assert.equal(act(s, {type: 'confirm', id: 'SLV-308', ...good, qty: '1', dims: ''}, ctx).ok, false);
  assert.equal(act(s, {type: 'confirm', id: 'SLV-308', ...good, qty: '1', condition: 'Great'}, ctx).ok, false);
  assert.equal(act(s, {type: 'confirm', id: 'SLV-308', ...good, qty: '1', reason: 'ok'}, ctx).ok, false);
  const r = act(s, {type: 'confirm', id: 'SLV-308', ...good, qty: '1'}, ctx);
  assert.equal(r.ok, true);
  assert.equal(r.state.log.length, 1);
});

test('priority and export use confirmed items only; inspection requirements travel with them', () => {
  let s = as(initial(items, roles), 'lead');
  assert.equal(priority(s.items[0]), null);
  assert.equal(inventory(s).length, 0);
  s = act(s, {type: 'confirm', id: 'SLV-304', ...good, qty: '12', dims: '826 × 2040 mm'}, ctx).state;
  assert.equal(s.items.find((i) => i.id === 'SLV-304').status, 'inspection');
  s = act(s, {type: 'reject', id: 'SLV-303', reason: 'Swollen carcasses throughout'}, ctx).state;
  const csv = exportCsv(s);
  assert.match(csv, /SLV-304/); assert.match(csv, /Required before recovery/); assert.doesNotMatch(csv, /SLV-303/);
});

test('credits the founder and contact details', () => {
  assert.equal(site.team[0].name, 'Adaora Nnamdi');
  assert.equal(site.team[0].role, 'Founder/CEO');
  assert.equal(site.email, 'adaora@salvora.space');
  assert.equal(site.url, 'https://salvora.space');
});
