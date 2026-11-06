// Site copy for Salvora. A proposed startup concept: fictional team, illustrative pricing.
const site = {
  "name": "Salvora",
  "tagline": "Find the reuse potential before demolition starts.",
  "categories": [
    "AI",
    "Construction Technology",
    "Circular Economy"
  ],
  "about": "Salvora helps deconstruction teams identify and organise potentially reusable building materials. AI turns site photographs and survey documents into a proposed inventory that surveyors can verify, prioritise, and export for recovery planning.",
  "logoSvg": "<rect width=\"32\" height=\"32\" rx=\"9\" fill=\"#14231c\"/><path d=\"M8 24V12l8-5 8 5v12\" fill=\"none\" stroke=\"#9fd8b4\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M13 24v-6h6v6\" fill=\"none\" stroke=\"#f0b35a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"m19.5 9.5 3-3m0 0h-2.6m2.6 0v2.6\" stroke=\"#f0b35a\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "words": {
    "records": "candidate items",
    "decider": "surveyors",
    "sources": "site photographs, plans, schedules and survey records",
    "model": "Detection, segmentation and classification models propose candidate items from photographs; matching models group possible duplicates; a ranking model uses only surveyor-confirmed inputs.",
    "store": "Amazon Textract"
  },
  "hero": {
    "eyebrow": "Material recovery planning",
    "before": "Find the reuse potential ",
    "em": "before demolition starts",
    "after": ".",
    "points": [
      "Candidate items proposed from site photographs",
      "Every suggestion linked to its source image",
      "Surveyors confirm what goes in the inventory"
    ],
    "floatTitle": "46 doors proposed",
    "floatText": "9 photos may show the same doors · review"
  },
  "problem": {
    "title": "Reusable materials are lost because nobody had time to count them.",
    "text": "Buildings can contain doors, flooring, fixtures and components worth recovering. Finding them means walking every floor, then reconciling photographs, plans, schedules and notes into one list. Opportunities are missed, and inventories end up with uncertain quantities, duplicates and gaps in condition information.",
    "fragments": [
      "Hundreds of site photos and no list",
      "The same door photographed from three angles, counted three times",
      "Door schedules that no longer match what is installed",
      "Condition noted for some items and not others"
    ]
  },
  "solution": {
    "title": "A proposed inventory your surveyors can trust because they confirm it.",
    "text": "Salvora detects candidate items in site photographs, suggests material categories with uncertainty, groups photos that may show the same item, pulls references from survey documents, and helps rank confirmed items for recovery.",
    "capabilities": [
      {
        "title": "Detection and classification",
        "text": "Finds candidate items in photographs and suggests a material category, showing uncertainty for ambiguous cases.",
        "demoLabel": "Level 3",
        "demoValue": "46 doors · 212 floor panels"
      },
      {
        "title": "Duplicate review",
        "text": "Groups photographs that may show the same physical item, so counts are not inflated.",
        "demoLabel": "Possible duplicates",
        "demoValue": "9 photos → 3 doors?"
      },
      {
        "title": "Documents and priorities",
        "text": "Extracts item references from schedules and surveys, and ranks confirmed items by condition, access and reuse demand.",
        "demoLabel": "Priority",
        "demoValue": "Raised-floor panels · high"
      }
    ]
  },
  "stepsTitle": "From site walk to recovery inventory.",
  "steps": [
    [
      "Upload",
      "Add room photographs, plans and existing survey records for the project."
    ],
    [
      "Propose",
      "Salvora suggests candidate items, linked to the images and documents they came from."
    ],
    [
      "Confirm",
      "Surveyors confirm categories, quantities, dimensions and condition, and add access and inspection notes."
    ],
    [
      "Export",
      "Confirmed items are prioritised and exported as a recovery inventory and inspection plan."
    ]
  ],
  "stepsNote": "Priorities are calculated only from surveyor-confirmed inputs. Unconfirmed suggestions never reach the exported inventory.",
  "audiencesTitle": "For teams who decide what a building leaves behind.",
  "audiences": [
    {
      "title": "Deconstruction and demolition contractors",
      "text": "Plan recovery before strip-out, with quantities you can price.",
      "outcome": "More recovered material"
    },
    {
      "title": "Architectural salvage businesses",
      "text": "See what a project could supply before committing to buy.",
      "outcome": "Better sourcing decisions"
    },
    {
      "title": "Property developers",
      "text": "Understand reuse potential early in a refurbishment.",
      "outcome": "Reuse built into the plan"
    },
    {
      "title": "Survey and material-reuse consultancies",
      "text": "Produce pre-demolition inventories faster and more consistently.",
      "outcome": "Faster, consistent surveys"
    }
  ],
  "publicSector": {
    "kicker": "Honest limits",
    "title": "Photographs show what is visible. Some questions need an inspector.",
    "text": "Salvora helps teams find and organise candidate items. Whether a component is structurally suitable, free of hazardous substances or acceptable under regulations is for qualified people to establish.",
    "points": [
      "Structural suitability requires qualified inspection or testing",
      "Hazardous substances require qualified surveys and testing",
      "Regulatory acceptability is confirmed by the responsible professionals",
      "The first version focuses on nonstructural commercial-interior items"
    ]
  },
  "ai": {
    "title": "The model proposes. The surveyor confirms.",
    "intro": "A recovery inventory has to stand up on site. Salvora speeds up finding and organising items, and leaves verification with surveyors.",
    "does": [
      "Detects candidate items in site photographs",
      "Suggests material categories, with uncertainty shown",
      "Groups photos that may show the same item",
      "Extracts item references from surveys, schedules and plans"
    ],
    "never": [
      "Certifies structural suitability",
      "Declares materials free of hazardous substances",
      "Adds unconfirmed items to the exported inventory",
      "Guarantees resale value or buyers"
    ]
  },
  "pricing": {
    "model": "Project-based assessment fee, or a subscription for contractors handling multiple sites.",
    "tiers": [
      {
        "name": "Project",
        "summary": "For a single assessment.",
        "price": "$1,800",
        "unit": "/ project",
        "features": [
          "Up to 5,000 m²",
          "Photo-based inventory suggestions",
          "Duplicate review",
          "Inventory export"
        ],
        "cta": "Request a pilot"
      },
      {
        "name": "Contractor",
        "summary": "For teams running several sites.",
        "price": "$950",
        "unit": "/ month",
        "features": [
          "Up to 6 active projects",
          "Everything in Project",
          "Document and schedule extraction",
          "Recovery prioritisation",
          "Unlimited users"
        ],
        "cta": "Request a pilot",
        "featured": true
      },
      {
        "name": "Portfolio",
        "summary": "For developers and large contractors.",
        "price": "Custom",
        "unit": "",
        "features": [
          "Unlimited projects",
          "Portfolio reporting",
          "Integrations",
          "Dedicated support"
        ],
        "cta": "Talk to us"
      }
    ]
  },
  "architectureIntro": "How Salvora could run in production, from site photographs to an evidence-linked recovery inventory.",
  "architecture": [
    [
      "Store",
      "Amazon S3",
      "Site photographs, plans and survey documents per project."
    ],
    [
      "Detect",
      "Amazon SageMaker",
      "Detection, segmentation and material classification models."
    ],
    [
      "Extract",
      "Amazon Textract",
      "Item references and specifications from supported survey documents."
    ],
    [
      "Record",
      "Amazon RDS for PostgreSQL",
      "Inventory, review decisions, inspection status and evidence links."
    ],
    [
      "Summarise",
      "Amazon Bedrock",
      "Recovery summaries that cite the images and documents behind them."
    ],
    [
      "Govern",
      "AWS CloudTrail · AWS KMS",
      "Access logging and encryption per customer."
    ]
  ],
  "team": [
    {
      "name": "Ikenna Obiora",
      "role": "Founder/CEO",
      "initials": "IO",
      "bio": "Pre-demolition surveyor with experience on commercial refurbishment projects.",
      "focus": [
        "Pre-demolition surveys",
        "Recovery planning",
        "Partnerships"
      ]
    },
    {
      "name": "Toyin Adebanjo",
      "role": "Co-founder",
      "initials": "TA",
      "bio": "Circular economy consultant focused on material reuse in construction.",
      "focus": [
        "Material reuse",
        "Sustainability",
        "Market development"
      ]
    },
    {
      "name": "Mustapha Aliyu",
      "role": "CTO",
      "initials": "MA",
      "bio": "Computer vision engineer working on detection and segmentation.",
      "focus": [
        "Computer vision",
        "Document extraction",
        "Platform"
      ]
    }
  ],
  "faq": [
    [
      "What items does the first version cover?",
      "Nonstructural commercial-interior items such as doors, cabinets and raised-floor panels. Structural assessment and a resale marketplace are deliberately out of scope."
    ],
    [
      "Can Salvora tell us if materials contain asbestos?",
      "No. Hazardous-substance questions need qualified surveys and testing. Salvora can record that an inspection is required and track its status."
    ],
    [
      "How are quantities kept accurate?",
      "Possible duplicate photos are grouped for review, and only surveyor-confirmed quantities go into the exported inventory."
    ],
    [
      "Is Salvora a live product?",
      "Not yet. Salvora is a proposed startup concept. The team is fictional, pricing is illustrative and the prototype runs on fictional data in your browser."
    ],
    [
      "Does the AI make decisions?",
      "No. Salvora flags, ranks and explains. Surveyors review the evidence and record every decision with a reason."
    ],
    [
      "How would our data be protected?",
      "In production, data would be encrypted, isolated per customer, access-controlled by role and never used to train models for other customers. Data-sharing terms are agreed before any pilot."
    ]
  ],
  "purpose": {
    "eyebrow": "Why Salvora exists",
    "manifesto": "Every building is a store of materials someone already made, carried and installed. Too often it leaves site as rubble because no one had time to see what was worth saving. We want the reuse potential found before the first wall comes down.",
    "purpose": "Help deconstruction teams find, verify and plan the recovery of reusable building materials.",
    "why": "Construction and demolition produce some of the largest waste streams in the world. Recovering even part of what buildings contain saves materials, money and carbon, but only if it is identified in time.",
    "stakesTitle": "The scale of construction waste.",
    "stats": [
      {
        "value": 600,
        "suffix": "m tons",
        "label": "Construction and demolition debris generated in the United States in 2018.",
        "source": "US EPA",
        "url": "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/construction-and-demolition-material-specific"
      },
      {
        "value": 38,
        "suffix": "%",
        "label": "Share of total EU waste generation from construction in 2022.",
        "source": "Statista, citing Eurostat",
        "url": "https://www.statista.com/statistics/1340946/european-union-waste-generation-share-by-source"
      },
      {
        "value": 35,
        "prefix": ">",
        "suffix": "%",
        "label": "The European Commission’s figure for construction’s share of EU waste, confirmed by fact-checkers.",
        "source": "EUFactcheck",
        "url": "https://eufactcheck.eu/factcheck/true-construction-is-responsible-for-producing-35-of-all-waste-in-the-eu/"
      }
    ],
    "changeTitle": "From photo folders to a verified inventory.",
    "before": [
      "Hundreds of photos sorted by hand",
      "Duplicate counts from overlapping photos",
      "Schedules and site reality reconciled late",
      "Inspection needs remembered, not tracked"
    ],
    "after": [
      "Candidate items proposed from photos",
      "Possible duplicates grouped for review",
      "Document references linked to each item",
      "Inspection status tracked per item"
    ],
    "principlesTitle": "What we believe about material recovery.",
    "principles": [
      [
        "Surveyors verify",
        "Nothing enters the inventory until a surveyor confirms it."
      ],
      [
        "Every item has evidence",
        "Each entry links to the photos and documents behind it."
      ],
      [
        "Uncertainty is shown",
        "Ambiguous materials are marked as ambiguous."
      ],
      [
        "Safety needs inspectors",
        "Structure and hazards are for qualified people."
      ],
      [
        "Start where reuse is proven",
        "Interior items first, done well."
      ],
      [
        "Count once",
        "Duplicate observations are resolved, not multiplied."
      ]
    ],
    "letterTitle": "Why we are building Salvora.",
    "letter": [
      "Ikenna has walked buildings days before strip-out, photographing doors, panels and fixtures that would have been worth saving, knowing there was no time to turn those photos into a usable list.",
      "Toyin works with organisations trying to reuse more materials and sees how often recovery fails for lack of reliable quantities. Mustapha builds vision models and knows that a proposal is only useful if people can check it quickly.",
      "Salvora is designed to do the tedious part, finding and grouping candidate items, so surveyors can spend their time verifying, prioritising and planning recovery."
    ],
    "visionTitle": "Where Salvora is going.",
    "visionIntro": "From interior items to portfolio-wide recovery planning.",
    "vision": [
      {
        "stage": "Now",
        "title": "Concept and prototype",
        "text": "An interactive prototype on fictional survey data, and conversations with contractors."
      },
      {
        "stage": "Next",
        "title": "Interior inventory",
        "text": "Photo-based suggestions, duplicate review, confirmation, inspection status and export for doors, cabinets and floor panels."
      },
      {
        "stage": "Then",
        "title": "More item types",
        "text": "Fixtures, finishes and further categories as models are validated."
      },
      {
        "stage": "Later",
        "title": "Portfolio planning",
        "text": "Recovery reporting across many buildings, with integrations for partners."
      }
    ],
    "statsNote": "Figures are published estimates from the sources linked; they describe the wider problem, not results from this product."
  },
  "app": {
    "title": "Inventory review",
    "subtitle": "Candidate recoverable items proposed from photographs of a fictional office refurbishment, for surveyor confirmation.",
    "itemNoun": "candidate item",
    "itemNounPlural": "candidate items",
    "groupLabel": "floor",
    "queueTitle": "Candidate queue",
    "humanNote": "Suggestions are unconfirmed until a surveyor verifies them.",
    "decisions": {
      "confirm": "Confirm item",
      "dismiss": "Reject candidate",
      "escalate": "Refer for inspection"
    },
    "roles": [
      {
        "id": "lead",
        "label": "Lead Surveyor",
        "can": [
          "view",
          "note",
          "assign",
          "decide",
          "escalate",
          "export"
        ]
      },
      {
        "id": "reviewer",
        "label": "Surveyor",
        "can": [
          "view",
          "note",
          "assign",
          "decide"
        ]
      },
      {
        "id": "analyst",
        "label": "Recovery Planner",
        "can": [
          "view",
          "note",
          "escalate"
        ]
      },
      {
        "id": "auditor",
        "label": "Client Viewer",
        "can": [
          "view",
          "export"
        ]
      }
    ],
    "examples": [
      "Which candidate items need review first?",
      "Summarise the review status",
      "Show Level 3",
      "Explain SLV-303"
    ],
    "refuse": "\\b(asbestos|hazard(ous)?[- ]free|safe to (remove|reuse)|structural(ly)? (sound|safe|suitable)|load[- ]bearing|compliant|meets? (the )?regulations|certif)",
    "refuseText": "Salvora can show what was detected and why, but structural suitability, hazardous substances and regulatory acceptability must be established by qualified inspection or testing.",
    "refuseExamples": [
      "Are these ceiling tiles asbestos free?",
      "Is this beam structurally sound?",
      "Do the fire doors meet regulations for reuse?"
    ]
  },
  "slug": "salvora",
  "url": "https://www.salvora.com",
  "email": "hello@salvora.com",
  "safeguards": [
    [
      "People decide",
      "Every candidate item is confirmed, dismissed or escalated by surveyors, never by the model."
    ],
    [
      "Evidence first",
      "Each flag links to the site photographs, plans, schedules and survey records behind it, so a reviewer can check the reasoning before acting."
    ],
    [
      "Confidence shown",
      "Scores come with a confidence level and the data gaps that lower it, so weak signals are not mistaken for facts."
    ],
    [
      "Role-based access",
      "Permissions are set per role: who can view, comment, assign, decide, escalate or export."
    ],
    [
      "Complete audit trail",
      "Assignments, notes and decisions are time-stamped with the person and reason, and can be exported."
    ],
    [
      "Your data stays yours",
      "Customer data is isolated per tenant, encrypted at rest and in transit, and never used to train models for other customers."
    ]
  ],
  "early": {
    "title": "Pilot Salvora with your own team.",
    "text": "We are looking for a small number of early partners to shape Salvora. A pilot starts with a sample of your historical data and a fixed review period, so you can judge the results before committing.",
    "steps": [
      "Tell us about your team and the records you work with.",
      "A founder replies personally to arrange a short call.",
      "We agree a pilot scope, data-sharing terms and how success will be measured."
    ]
  }
};
export default site;
