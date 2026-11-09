// Fictional survey: a four-storey office refurbishment, "Harbour House". Not a real building.

export const project = {name: 'Harbour House — strip-out survey', ref: 'SLV-24-017', scope: 'Nonstructural commercial-interior items'};

export const roles = [
  {id: 'lead', label: 'Lead Surveyor', can: ['view', 'note', 'confirm', 'refer', 'export']},
  {id: 'surveyor', label: 'Surveyor', can: ['view', 'note', 'confirm']},
  {id: 'planner', label: 'Recovery Planner', can: ['view', 'note', 'refer']},
  {id: 'client', label: 'Client Viewer', can: ['view', 'export']},
];
export const people = {lead: 'Sarah Whitfield', surveyor: 'Kofi Mensah', planner: 'Ben Carter', client: 'Nadia Haddad'};

export const conditions = ['Good', 'Fair', 'Poor'];
export const access = ['Easy', 'Moderate', 'Difficult'];

export const rooms = [
  {id: 'L3', name: 'Level 3 — open office', scene: 'office'},
  {id: 'L2K', name: 'Level 2 — kitchenette', scene: 'kitchen'},
  {id: 'L2W', name: 'Level 2 — washrooms & stairs', scene: 'washroom'},
  {id: 'L1', name: 'Level 1 — reception', scene: 'reception'},
];

const item = (o) => ({status: 'proposed', confirmed: null, notes: [], decision: null, merged: false, ...o});

// box: [x, y, w, h] on a 400 × 240 drawing of the room.
export const items = [
  item({id: 'SLV-301', room: 'L3', box: [24, 70, 52, 120], label: 'Internal doors — veneer, single leaf', probs: [['Timber veneer door', 0.81], ['Laminate door', 0.15], ['Other', 0.04]],
    proposedQty: 46, scheduleQty: 42, photos: 61, demand: 'High', dims: '926 × 2040 mm (from door schedule)',
    flag: {label: 'Quantity mismatch', why: 'Photos suggest 46 doors; the door schedule lists 42. Nine photos may show the same three doors from different angles.', evidence: [['Detections', '61 photos → 46 distinct', 'Detection model'], ['Door schedule', '42 × type D2', 'Door schedule p.3'], ['Possible duplicates', '9 photos → 3 doors', 'Duplicate matcher']]},
    dup: {photos: 9, likely: 3}, inspection: false}),
  item({id: 'SLV-302', room: 'L3', box: [96, 186, 210, 44], label: 'Raised-floor panels — 600 mm', probs: [['Steel-encased panel', 0.74], ['Chipboard panel', 0.22], ['Other', 0.04]],
    proposedQty: 1450, scheduleQty: null, photos: 23, demand: 'High', dims: '600 × 600 mm (spec sheet)',
    flag: {label: 'Estimated quantity', why: 'Only 212 exposed panels can be counted in photos. The total is estimated from the raised-floor area on the plan and must be confirmed on site.', evidence: [['Counted in photos', '212', 'Detection model'], ['Raised-floor area', '520 m²', 'Floor plan L3'], ['Panel size', '600 × 600 mm', 'Spec sheet extract']]},
    dup: null, inspection: false}),
  item({id: 'SLV-303', room: 'L2K', box: [40, 120, 150, 80], label: 'Kitchenette base cabinets — laminate', probs: [['Laminate on chipboard', 0.71], ['Solid timber', 0.18], ['Other', 0.11]],
    proposedQty: 14, scheduleQty: null, photos: 18, demand: 'Medium', dims: '',
    flag: {label: 'Condition uncertain', why: 'Three units show staining near the sink that may be water damage. Swollen chipboard is rarely reusable; a hands-on check is needed.', evidence: [['Staining detected', '3 units', 'Image analysis'], ['Material', 'Laminate on chipboard (0.71)', 'Material classifier'], ['Plumbing', 'Sink above units', 'Photo context']]},
    dup: null, inspection: false}),
  item({id: 'SLV-304', room: 'L2W', box: [250, 60, 60, 132], label: 'Fire doors — FD30, labelled', probs: [['FD30 fire door', 0.85], ['Standard door', 0.12], ['Other', 0.03]],
    proposedQty: 12, scheduleQty: 12, photos: 20, demand: 'Medium', dims: '826 × 2040 mm (schedule)',
    flag: {label: 'Inspection required', why: 'Fire-rated doors need certification checks before any reuse. Labels were readable on 7 of 12 doors.', evidence: [['Labels read', '7 of 12', 'Text extraction'], ['Door schedule', 'FD30 × 12', 'Door schedule p.4'], ['Rule', 'Certification check before reuse', 'Recovery requirements']]},
    dup: null, inspection: true}),
  item({id: 'SLV-305', room: 'L3', box: [120, 14, 170, 26], label: 'Ceiling LED panels', probs: [['LED panel 600 × 600', 0.88], ['Fluorescent troffer', 0.1], ['Other', 0.02]],
    proposedQty: 88, scheduleQty: null, photos: 40, demand: 'Low', dims: '600 × 600 mm (est.)',
    flag: {label: 'Missing specification', why: 'Fittings are visible but the model and rating could not be read. Labels or the M&E schedule would be needed, and electrical testing before reuse.', evidence: [['Detections', '88 panels', 'Detection model'], ['Model identified', 'No', 'Text extraction'], ['M&E schedule', 'Not uploaded', 'Document index']]},
    dup: null, inspection: true}),
  item({id: 'SLV-306', room: 'L1', box: [150, 50, 200, 140], label: 'Glass partition panels', probs: [['Toughened glass', 0.52], ['Laminated glass', 0.41], ['Other', 0.07]],
    proposedQty: 22, scheduleQty: null, photos: 15, demand: 'Medium', dims: '',
    flag: {label: 'Material ambiguous', why: 'The classifier is unsure whether panels are toughened or laminated glass, and no dimensions are available. Markings may be visible on site.', evidence: [['Material', 'Toughened 0.52 · laminated 0.41', 'Material classifier'], ['Dimensions', 'Not in drawings', 'Plan extraction'], ['Kitemarks', 'Not visible in photos', 'Image analysis']]},
    dup: null, inspection: false}),
  item({id: 'SLV-307', room: 'L2W', box: [30, 70, 180, 122], label: 'Washroom cubicle partitions', probs: [['Compact laminate cubicle', 0.79], ['MDF cubicle', 0.17], ['Other', 0.04]],
    proposedQty: 16, scheduleQty: null, photos: 6, demand: 'Medium', dims: '',
    flag: {label: 'Possible duplicates', why: 'Six photos taken from the corridor and inside the washroom may show the same cubicles. Confirming the count prevents double-counting.', evidence: [['Photos grouped', '6', 'Duplicate matcher'], ['Washrooms on L2', '2', 'Floor plan L2'], ['Expected cubicles', '12–16', 'Plan extraction']]},
    dup: {photos: 6, likely: 12}, inspection: false}),
  item({id: 'SLV-308', room: 'L1', box: [30, 120, 100, 80], label: 'Reception desk — solid oak top', probs: [['Solid oak', 0.84], ['Oak veneer', 0.14], ['Other', 0.02]],
    proposedQty: 1, scheduleQty: null, photos: 9, demand: 'High', dims: '3200 × 800 mm (survey note)', flag: null, dup: null, inspection: false}),
];
