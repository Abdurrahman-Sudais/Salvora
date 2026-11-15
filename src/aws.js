// The proposed AWS architecture shown on the home page (see docs/architecture.md).
export const STAGES = [
  ['1', 'Site intake', ['Amazon S3'], 'Site photographs, floor plans, door schedules and survey PDFs are uploaded to per-project storage with versioning.'],
  ['2', 'Detect & extract', ['Amazon SageMaker AI', 'Amazon Textract', 'AWS Lambda'], 'Vision models propose candidate items and duplicate groups from photos; Textract reads schedules and surveys; Lambda links each proposal to its evidence.'],
  ['3', 'Inventory records', ['Amazon RDS for PostgreSQL'], 'Candidate items, quantities, dimensions, conditions and every surveyor decision are stored as linked records.'],
  ['4', 'Summaries', ['Amazon Bedrock'], 'Plain-language recovery notes are drafted from confirmed records only, and cannot change a quantity or condition.'],
  ['5', 'Survey workspace', ['Amazon API Gateway', 'Amazon Cognito'], 'Authenticated review, prioritisation and export APIs serve the survey inventory, with surveyor and manager roles.'],
];

export const ACROSS = [['AWS Lambda', 'runs processing and cross-check rules'], ['Amazon CloudWatch', 'monitors jobs, model endpoints and APIs'], ['AWS KMS', 'encrypts each customer’s project data'], ['Amazon SES', 'sends review and pilot-request notifications']];

export const SERVICES = [
  ['Amazon S3', 'Stores site photographs, plans, survey documents and exported recovery inventories, separated by customer and project.'],
  ['Amazon SageMaker AI', 'Hosts the detection and segmentation models that propose candidate items, and the matching model that groups possible duplicate photos.'],
  ['Amazon Textract', 'Extracts tables and text from door schedules, finishes schedules and pre-demolition surveys, with page references for every value.'],
  ['AWS Lambda', 'Runs the processing steps and the deterministic rules that cross-check photo counts against document quantities.'],
  ['Amazon RDS for PostgreSQL', 'Holds projects, candidate items, evidence links, surveyor decisions and the audit log.'],
  ['Amazon Bedrock', 'Drafts recovery summaries from confirmed records; it never sets quantities, conditions or hazard status.'],
  ['Amazon API Gateway', 'Exposes the review, prioritisation and export endpoints used by the workspace, and the website’s pilot-request intake.'],
  ['Amazon Cognito', 'Signs users in and separates surveyor, project-manager and viewer roles.'],
  ['Amazon SES', 'Delivers review assignments, pilot-request and contact-form notifications.'],
  ['Amazon CloudWatch', 'Collects logs and metrics for uploads, model jobs, extraction failures and API latency.'],
];
