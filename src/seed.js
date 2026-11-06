// Fictional sample data for the Salvora prototype. Any resemblance to real records is coincidental.
export const seed = {
  "team": [
    {
      "name": "Sarah Whitfield",
      "role": "Lead Surveyor"
    },
    {
      "name": "Kofi Mensah",
      "role": "Surveyor"
    },
    {
      "name": "Elena Rossi",
      "role": "Surveyor"
    },
    {
      "name": "Ben Carter",
      "role": "Recovery Planner"
    },
    {
      "name": "Nadia Haddad",
      "role": "Client Viewer"
    }
  ],
  "items": [
    {
      "id": "SLV-301",
      "title": "Internal doors — oak veneer, single leaf",
      "subtitle": "46 proposed from 61 photos",
      "group": "Level 3",
      "metrics": [
        [
          "Proposed qty",
          "46"
        ],
        [
          "Schedule qty",
          "42"
        ],
        [
          "Dimensions",
          "926 × 2040mm (schedule)"
        ],
        [
          "Condition",
          "Not yet recorded"
        ]
      ],
      "flags": [
        {
          "label": "Quantity mismatch",
          "severity": "high",
          "confidence": 0.79,
          "explanation": "Photos suggest 46 doors, the door schedule lists 42. Nine photos may show the same three doors from different angles, which would explain most of the gap.",
          "evidence": [
            [
              "Detections",
              "61 photos · 46 distinct",
              "Detection model"
            ],
            [
              "Door schedule",
              "42 × type D2",
              "Door schedule p.3"
            ],
            [
              "Possible duplicates",
              "9 photos → 3 doors",
              "Duplicate matcher"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-302",
      "title": "Raised-floor panels — 600mm",
      "subtitle": "212 visible; area suggests ~1,450",
      "group": "Level 3",
      "metrics": [
        [
          "Visible panels",
          "212"
        ],
        [
          "Floor area",
          "520 m²"
        ],
        [
          "Estimated total",
          "~1,450"
        ],
        [
          "Pedestals",
          "Not visible"
        ]
      ],
      "flags": [
        {
          "label": "Quantity estimate",
          "severity": "medium",
          "confidence": 0.68,
          "explanation": "Only exposed panels can be counted from photos. The total is estimated from the floor area on the plan and must be confirmed on site.",
          "evidence": [
            [
              "Counted in photos",
              "212",
              "Detection model"
            ],
            [
              "Raised-floor area",
              "520 m²",
              "Floor plan L3"
            ],
            [
              "Panel size",
              "600 × 600mm",
              "Spec sheet extract"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-303",
      "title": "Kitchenette cabinets — laminate",
      "subtitle": "14 units, condition uncertain",
      "group": "Level 2",
      "metrics": [
        [
          "Proposed qty",
          "14 units"
        ],
        [
          "Material",
          "Laminate / chipboard (est.)"
        ],
        [
          "Water damage",
          "Possible on 3"
        ],
        [
          "Photos",
          "18"
        ]
      ],
      "flags": [
        {
          "label": "Condition uncertain",
          "severity": "medium",
          "confidence": 0.6,
          "explanation": "Three base units show staining near the sink that may indicate water damage. Chipboard carcasses are often unsuitable for reuse if swollen; a hands-on check is needed.",
          "evidence": [
            [
              "Staining detected",
              "3 units",
              "Image analysis"
            ],
            [
              "Material",
              "Laminate on chipboard (0.71)",
              "Material classifier"
            ],
            [
              "Plumbing",
              "Sink above units",
              "Photo context"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-304",
      "title": "Fire doors — FD30 (labelled)",
      "subtitle": "12 proposed from photos",
      "group": "Level 2",
      "metrics": [
        [
          "Proposed qty",
          "12"
        ],
        [
          "Labels visible",
          "7 of 12"
        ],
        [
          "Closers",
          "Fitted"
        ],
        [
          "Reuse status",
          "Requires inspection"
        ]
      ],
      "flags": [
        {
          "label": "Inspection required",
          "severity": "high",
          "confidence": 0.85,
          "explanation": "Fire-rated doors need certification checks before any reuse. Labels are visible on 7 doors; the rest could not be read in photos.",
          "evidence": [
            [
              "Labels read",
              "7 of 12",
              "Text extraction from photos"
            ],
            [
              "Door schedule",
              "FD30 × 12",
              "Door schedule p.4"
            ],
            [
              "Requirement",
              "Certification check needed",
              "Recovery rules"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-305",
      "title": "Ceiling light fittings — LED panels",
      "subtitle": "88 proposed",
      "group": "Level 3",
      "metrics": [
        [
          "Proposed qty",
          "88"
        ],
        [
          "Model",
          "Not identified"
        ],
        [
          "Electrical test",
          "Required"
        ],
        [
          "Photos",
          "40"
        ]
      ],
      "flags": [
        {
          "label": "Missing specification",
          "severity": "low",
          "confidence": 0.66,
          "explanation": "Fittings are visible but the model and rating could not be identified. Labels or the M&E schedule would be needed before recovery planning.",
          "evidence": [
            [
              "Detections",
              "88 panels",
              "Detection model"
            ],
            [
              "Model identified",
              "No",
              "Text extraction"
            ],
            [
              "M&E schedule",
              "Not uploaded",
              "Document index"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-306",
      "title": "Glass partition panels",
      "subtitle": "Material and size ambiguous",
      "group": "Level 1",
      "metrics": [
        [
          "Proposed qty",
          "22 panels"
        ],
        [
          "Material",
          "Toughened glass? (0.52)"
        ],
        [
          "Dimensions",
          "Missing"
        ],
        [
          "Photos",
          "15"
        ]
      ],
      "flags": [
        {
          "label": "Material ambiguous",
          "severity": "medium",
          "confidence": 0.52,
          "explanation": "The classifier is unsure whether panels are toughened or laminated glass, and no dimensions are available. Markings may be visible on site.",
          "evidence": [
            [
              "Material",
              "Toughened 0.52 · laminated 0.41",
              "Material classifier"
            ],
            [
              "Dimensions",
              "Not in drawings",
              "Plan extraction"
            ],
            [
              "Kitemarks",
              "Not visible in photos",
              "Image analysis"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-307",
      "title": "Carpet tiles — 500mm",
      "subtitle": "Visible wear in circulation areas",
      "group": "Level 1",
      "metrics": [
        [
          "Area",
          "~610 m²"
        ],
        [
          "Worn areas",
          "~35%"
        ],
        [
          "Brand",
          "Not identified"
        ],
        [
          "Reuse demand",
          "Moderate"
        ]
      ],
      "flags": [
        {
          "label": "Condition varies",
          "severity": "low",
          "confidence": 0.63,
          "explanation": "Tiles in circulation routes show visible wear. Office areas appear in better condition and may be worth separating during lift.",
          "evidence": [
            [
              "Wear detected",
              "~35% of area",
              "Image analysis"
            ],
            [
              "Total area",
              "610 m²",
              "Floor plan L1"
            ],
            [
              "Reuse demand",
              "Moderate",
              "Recovery priorities"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-308",
      "title": "Washroom cubicle partitions",
      "subtitle": "Possible duplicate project photos",
      "group": "Level 2",
      "metrics": [
        [
          "Proposed qty",
          "16"
        ],
        [
          "Duplicate group",
          "6 photos"
        ],
        [
          "Fixings",
          "Visible"
        ],
        [
          "Condition",
          "Good (visible)"
        ]
      ],
      "flags": [
        {
          "label": "Possible duplicates",
          "severity": "low",
          "confidence": 0.71,
          "explanation": "Six photos taken from the corridor and inside the washroom may show the same cubicles. Confirming the count will prevent double-counting.",
          "evidence": [
            [
              "Photos grouped",
              "6",
              "Duplicate matcher"
            ],
            [
              "Washrooms on L2",
              "2 (plan)",
              "Floor plan L2"
            ],
            [
              "Expected cubicles",
              "12–16",
              "Plan extraction"
            ]
          ]
        }
      ],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    },
    {
      "id": "SLV-309",
      "title": "Kitchen worktops — solid oak",
      "subtitle": "Confirmed by survey team",
      "group": "Level 2",
      "metrics": [
        [
          "Quantity",
          "6 lengths"
        ],
        [
          "Dimensions",
          "3000 × 600 × 40mm"
        ],
        [
          "Condition",
          "Good"
        ],
        [
          "Status",
          "Ready to confirm"
        ]
      ],
      "flags": [],
      "status": "open",
      "assignee": null,
      "notes": [],
      "decision": null
    }
  ]
};
