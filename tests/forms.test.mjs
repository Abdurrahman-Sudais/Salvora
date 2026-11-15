import test from 'node:test';
import assert from 'node:assert/strict';
import {COMPANY_SIZES, ORG_TYPES, PROGRESS, TOPICS, USE_CASES, blankContact, blankPilot, contactPayload, hubspot, pilotPayload, validateContact, validatePilot} from '../src/forms.js';
import {STAGES, SERVICES} from '../src/aws.js';

const ctx = {pageUri: 'https://salvora.space/', pageName: 'Salvora'};

test('pilot request needs company size, organisation type and use case', () => {
  const f = {...blankPilot(), name: 'Kemi Ade', email: 'kemi@example.com', company: 'Ade Demolition', consent: true};
  assert.deepEqual(Object.keys(validatePilot(f)).sort(), ['kind', 'size', 'useCase']);
  const ok = {...f, size: COMPANY_SIZES[1], kind: ORG_TYPES[0], useCase: USE_CASES[0]};
  assert.deepEqual(validatePilot(ok), {});
  const names = pilotPayload(ok, ctx).fields.map((x) => x.name);
  for (const n of ['firstname', 'lastname', 'email', 'company', 'company_size', 'organisation_type', 'primary_use_case']) assert.ok(names.includes(n), n);
});

test('contact form has its own topic and HubSpot form', () => {
  assert.ok(validateContact(blankContact()).topic);
  const c = {...blankContact(), name: 'Ola', email: 'ola@example.com', topic: TOPICS[2], message: 'We buy reclaimed doors.', consent: true};
  assert.deepEqual(validateContact(c), {});
  assert.equal(contactPayload(c, ctx).fields.find((x) => x.name === 'contact_topic').value, 'Salvage or resale partnership');
  assert.equal(hubspot('contact', {VITE_HUBSPOT_PORTAL_ID: '1', VITE_HUBSPOT_FORM_GUID: 'p'}), null);
  assert.deepEqual(hubspot('pilot', {VITE_HUBSPOT_PORTAL_ID: '1', VITE_HUBSPOT_FORM_GUID: 'p'}), {portal: '1', form: 'p'});
});

test('AWS section covers every stage service in the services table', () => {
  const listed = new Set(SERVICES.map(([n]) => n));
  for (const [, , svcs] of STAGES) for (const s of svcs) assert.ok(listed.has(s), s);
  assert.equal(PROGRESS.at(-1)[1], 'Next');
});
