// Pilot-request and contact-form rules, and the HubSpot Forms API payloads (see docs/crm-plan.md).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const ORG_TYPES = ['Deconstruction or demolition contractor', 'Architectural salvage business', 'Property developer', 'Survey or material-reuse consultancy', 'Other'];
export const COMPANY_SIZES = ['1–10 employees', '11–50 employees', '51–200 employees', '201–1,000 employees', '1,000+ employees'];
export const USE_CASES = ['Pilot on one building', 'Pre-demolition reuse inventory', 'Recovery planning for strip-out', 'Sourcing reclaimed materials', 'Portfolio or multi-site rollout', 'Other'];
export const TOPICS = ['Product question', 'Pilot programme', 'Salvage or resale partnership', 'Technical or security question', 'Press or media', 'Other'];

/** Where the company is today, newest last; the final entry is what comes next. */
export const PROGRESS = [
  ['A', '2026', 'Company founded', 'Founded by Adaora Nnamdi to recover materials before demolition.'],
  ['B', 'Done', 'Review method defined', 'Photo suggestions, duplicate grouping, document cross-checks and surveyor confirmation.'],
  ['C', 'Done', 'Survey inventory prototype', 'Verification, prioritisation and export shown on a fictional office refurbishment.'],
  ['D', 'Done', 'AWS reference architecture', 'Intake, vision models, extraction, records and workspace layers designed.'],
  ['E', 'Next', 'First pilots', 'One building per pilot, compared with what your surveyors count by hand.'],
];

export const blankPilot = () => ({name: '', email: '', company: '', size: '', kind: '', useCase: '', building: '', message: '', consent: false, website: ''});
export const blankContact = () => ({name: '', email: '', company: '', topic: '', message: '', consent: false, website: ''});

export function validatePilot(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Your name, please.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'A valid work email, please.';
  if (!f.company.trim()) e.company = 'Which company?';
  if (!COMPANY_SIZES.includes(f.size)) e.size = 'Choose a company size.';
  if (!ORG_TYPES.includes(f.kind)) e.kind = 'Choose the closest match.';
  if (!USE_CASES.includes(f.useCase)) e.useCase = 'Choose a use case.';
  if (!f.consent) e.consent = 'Please confirm we may contact you.';
  return e;
}

export function validateContact(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Your name, please.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'A valid email, please.';
  if (!TOPICS.includes(f.topic)) e.topic = 'Choose a topic.';
  if (f.message.trim().length < 10) e.message = 'A short message, please (10+ characters).';
  if (!f.consent) e.consent = 'Please confirm we may reply.';
  return e;
}

const fields = (pairs) => pairs.filter(([, v]) => v).map(([name, value]) => ({objectTypeId: '0-1', name, value}));
const names = (n) => { const [first, ...rest] = n.trim().split(/\s+/); return [['firstname', first], ['lastname', rest.join(' ')]]; };

export const pilotPayload = (f, context) => ({fields: fields([...names(f.name), ['email', f.email.trim()], ['company', f.company.trim()], ['company_size', f.size], ['organisation_type', f.kind], ['primary_use_case', f.useCase], ['pilot_building', f.building.trim()], ['enquiry_message', f.message.trim()]]), context,
  legalConsentOptions: {consent: {consentToProcess: true, text: 'Salvora may contact me about this request.', communications: []}}});

export const contactPayload = (f, context) => ({fields: fields([...names(f.name), ['email', f.email.trim()], ['company', f.company.trim()], ['contact_topic', f.topic], ['enquiry_message', f.message.trim()]]), context,
  legalConsentOptions: {consent: {consentToProcess: true, text: 'Salvora may reply to this message.', communications: []}}});

/** HubSpot form ids from the build environment; the contact form has its own GUID. */
export function hubspot(kind, env = (typeof import.meta !== 'undefined' && import.meta.env) || {}) {
  const portal = env.VITE_HUBSPOT_PORTAL_ID;
  const form = kind === 'contact' ? env.VITE_HUBSPOT_CONTACT_FORM_GUID : env.VITE_HUBSPOT_FORM_GUID;
  return portal && form ? {portal, form} : null;
}

export async function send(hs, payload) {
  const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(hs.portal)}/${encodeURIComponent(hs.form)}`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
  return res.ok;
}
