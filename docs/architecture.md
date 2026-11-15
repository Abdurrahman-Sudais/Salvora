# Architecture

Status: **proposed**. The website and survey inventory run entirely in the browser on a fictional office refurbishment. None of the AWS services below are deployed or connected.

## Today: browser-only prototype

- Vite + React, server-rendered to static HTML for every route (`scripts/prerender.mjs`).
- Candidate items, photos and schedule quantities are fictional (`src/data.js`); the review rules are pure functions in `src/engine.js`, tested with `node --test`.
- Changes persist in `localStorage`; roles are switched in the UI, not authenticated.

## Why AWS

Salvora’s work is image- and document-heavy: hundreds of site photographs and survey pages per building, each traceable to the quantities a contractor prices. On AWS, storage, vision models, document extraction and model access run as managed services, and each customer’s projects stay isolated as they grow from one pilot building to a portfolio.

## Proposed production service

| Stage | Services | What happens |
|---|---|---|
| 1. Site intake | Amazon S3 | Photos, plans, door schedules and survey PDFs land in per-project storage with versioning |
| 2. Detect & extract | Amazon SageMaker AI, Amazon Textract, AWS Lambda | Vision models propose candidate items and duplicate groups; Textract reads schedules and surveys; Lambda links each proposal to its evidence |
| 3. Inventory records | Amazon RDS for PostgreSQL | Candidate items, quantities, dimensions, conditions and every surveyor decision as linked records |
| 4. Summaries | Amazon Bedrock | Recovery notes drafted from confirmed records only; cannot change a quantity or condition |
| 5. Survey workspace | Amazon API Gateway, Amazon Cognito | Authenticated review, prioritisation and export APIs with surveyor and manager roles |
| Across every stage | AWS Lambda, Amazon CloudWatch, AWS KMS, Amazon SES | Processing and cross-check rules, monitoring, per-customer encryption, notifications |

The services list with each one’s role is in `src/aws.js` and shown on the home page (`#technology`).

### Design rules

1. **Surveyors confirm everything.** Model output is a proposal; only confirmed items reach the exported inventory.
2. **Quantities are cross-checked.** Possible duplicate photos are grouped and document quantities compared by deterministic rules.
3. **No hazard calls.** Salvora records that an inspection (e.g. asbestos) is required; it never decides that a material is safe.
4. **Isolated by customer.** Separate storage prefixes, database rows filtered by customer, and customer-specific KMS keys.

## Website lead capture

The pilot and contact forms post to HubSpot (see `docs/crm-plan.md`). If a server-side intake is needed later, API Gateway + Lambda can validate submissions and Amazon SES can notify the founders.
