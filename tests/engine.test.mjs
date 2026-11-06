import test from 'node:test';
import assert from 'node:assert/strict';
import site from '../src/content.js';
import {seed} from '../src/seed.js';
import {act, assistant, can, initialState} from '../src/app/engine.js';

const A = site.app;
const ctx = (state) => ({roles: A.roles, actor: 'Test Reviewer', decisions: A.decisions});

test('seed data is well formed', () => {
  assert.ok(seed.items.length >= 8);
  for (const i of seed.items) { assert.match(i.id, /^[A-Z]{2,4}-\d{2,4}$/); for (const f of i.flags) { assert.ok(f.confidence > 0 && f.confidence < 1); assert.ok(f.evidence.length); } }
});

test('decisions need permission and a reason, and are audited', () => {
  let s = initialState(seed, A.roles);
  const id = seed.items.find((i) => i.flags.length).id;
  const viewer = A.roles.find((r) => !r.can.includes('decide'));
  s = act(s, {type: 'role', role: viewer.id}, ctx(s)).state;
  assert.equal(act(s, {type: 'decide', itemId: id, decision: 'confirm', reason: 'Matches the evidence'}, ctx(s)).ok, false);
  const decider = A.roles.find((r) => r.can.includes('decide'));
  s = act(s, {type: 'role', role: decider.id}, ctx(s)).state;
  assert.equal(act(s, {type: 'decide', itemId: id, decision: 'confirm', reason: 'short'}, ctx(s)).ok, false);
  const r = act(s, {type: 'decide', itemId: id, decision: 'confirm', reason: 'Matches the linked evidence'}, ctx(s));
  assert.equal(r.ok, true);
  assert.equal(r.state.items.find((i) => i.id === id).status, 'confirmed');
  assert.equal(r.state.audit.length, 1);
});

test('every role can view; at least one role cannot decide', () => {
  for (const r of A.roles) assert.ok(can(A.roles, r.id, 'view'));
  assert.ok(A.roles.some((r) => !r.can.includes('decide')));
});

test('assistant answers from records and refuses decisions it must not make', () => {
  const s = initialState(seed, A.roles);
  for (const q of A.examples.slice(0, 2)) assert.equal(assistant(q, s, A).kind, 'answer');
  for (const q of A.refuseExamples) assert.equal(assistant(q, s, A).kind, 'refusal', q);
  assert.equal(assistant(seed.items[0].id, s, A).sources[0], seed.items[0].id);
});

test('content credits a three-person team and links every statistic', () => {
  assert.equal(site.team.length, 3);
  assert.deepEqual(site.team.map((p) => p.role), ['Founder/CEO', 'Co-founder', 'CTO']);
  for (const st of site.purpose.stats) assert.match(st.url, /^https:\/\//);
});
