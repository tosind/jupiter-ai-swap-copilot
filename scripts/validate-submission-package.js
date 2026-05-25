import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = "submissions/jupiter-not-your-regular-bounty-manifest.json";

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`OK ${message}`);
}

function requireFile(filePath) {
  const absolute = path.join(root, filePath);
  if (!existsSync(absolute) || !statSync(absolute).isFile()) {
    fail(`missing file: ${filePath}`);
    return false;
  }
  pass(`found ${filePath}`);
  return true;
}

function requireDirectory(dirPath) {
  const absolute = path.join(root, dirPath);
  if (!existsSync(absolute) || !statSync(absolute).isDirectory()) {
    fail(`missing directory: ${dirPath}`);
    return false;
  }
  pass(`found ${dirPath}/`);
  return true;
}

function sha256(filePath) {
  const content = readFileSync(path.join(root, filePath));
  return createHash("sha256").update(content).digest("hex");
}

function scanForBlockedSecrets(filePath) {
  const content = readFileSync(path.join(root, filePath), "utf8");
  const blockedPatterns = [
    /-----BEGIN (RSA |EC |OPENSSH |)?PRIVATE KEY-----/,
    /\bNETLIFY_AUTH_TOKEN\s*=/,
    /\bJUPITER_API_KEY\s*=/,
    /\bPRIVATE_KEY\s*=/,
    /\bSEED_PHRASE\s*=/
  ];

  const hit = blockedPatterns.find((pattern) => pattern.test(content));
  if (hit) {
    fail(`blocked secret-like pattern in ${filePath}: ${hit}`);
    return;
  }
  pass(`no blocked secret patterns in ${filePath}`);
}

if (!requireFile(manifestPath)) {
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(path.join(root, manifestPath), "utf8"));
const project = manifest.project;
const archive = project.submissionArchive;

[
  project.descriptionFile,
  project.dxReportFile,
  project.appEntry,
  project.validationScript,
  project.deployConfig,
  project.deployHandoff,
  project.githubPublicationHandoff,
  project.colosseumProfileHandoff,
  project.ceoApprovalRequest,
  project.approvalDecisionLog,
  archive.notesFile,
  ...project.sourceFiles,
  ...project.testFiles,
  ...project.screenshots
].forEach(requireFile);

requireDirectory("dist");
requireFile(archive.path);

const actualHash = sha256(archive.path);
if (actualHash !== archive.sha256) {
  fail(`archive SHA-256 mismatch: expected ${archive.sha256}, got ${actualHash}`);
} else {
  pass(`archive SHA-256 matches ${archive.sha256}`);
}

if (manifest.safetyBoundary.liveApiCallsEnabled !== false) {
  fail("manifest safety boundary must keep liveApiCallsEnabled=false");
}
if (manifest.safetyBoundary.walletSigningEnabled !== false) {
  fail("manifest safety boundary must keep walletSigningEnabled=false");
}
if (manifest.safetyBoundary.transactionExecutionEnabled !== false) {
  fail("manifest safety boundary must keep transactionExecutionEnabled=false");
}
if (manifest.readiness.finalSubmission !== "blocked") {
  fail("finalSubmission must remain blocked until BAI-10 fields are supplied");
} else {
  pass("final submission remains blocked pending owner fields");
}
if (manifest.readiness.ceoReview !== "approved") {
  fail("ceoReview must be approved after approval 968fa89c-94be-4954-8b62-a88e071e1e24");
} else {
  pass("CEO review approval recorded");
}

[
  "README.md",
  project.descriptionFile,
  project.dxReportFile,
  project.deployHandoff,
  project.githubPublicationHandoff,
  project.colosseumProfileHandoff,
  project.ceoApprovalRequest,
  project.approvalDecisionLog
].forEach(scanForBlockedSecrets);

if (!process.exitCode) {
  pass("submission package validation complete");
}
