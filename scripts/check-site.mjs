import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createHash } from "node:crypto";

const root = resolve("site");
const failures = [];
const docPages = JSON.parse(readFileSync("docs/content/pages.json", "utf8"));
const pages = [
  "index.html",
  "how-it-works/index.html",
  "deployment/index.html",
  ...docPages.map((p) =>
    p.slug ? `docs/${p.slug}/index.html` : "docs/index.html",
  ),
];
const get = (file) => readFileSync(resolve(root, file), "utf8");
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = resolve(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const page of pages) {
  if (!existsSync(resolve(root, page))) {
    failures.push(`Missing page: ${page}`);
    continue;
  }
  const html = get(page);
  if (!html.includes('name="viewport"')) failures.push(`${page}: no viewport`);
  if (!html.includes("Skip to content")) failures.push(`${page}: no skip link`);
  if (!html.includes("Rovara"))
    failures.push(`${page}: inconsistent display brand`);
  if (
    !html.includes("Public source") &&
    !html.includes("Self-hosted") &&
    !html.includes("Published installer") &&
    !html.includes("docs-status")
  )
    failures.push(`${page}: release status missing`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) failures.push(`${page}: duplicate IDs`);
}
for (const file of walk(root).filter((p) => p.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  for (const [, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const [path, hash] = value.split("#");
    let target = path.startsWith("/")
      ? resolve(root, `.${path}`)
      : resolve(dirname(file), path || ".");
    if (existsSync(target) && statSync(target).isDirectory())
      target = resolve(target, "index.html");
    if (!existsSync(target)) {
      failures.push(`${file}: broken ${attr} ${value}`);
      continue;
    }
    if (
      hash &&
      target.endsWith(".html") &&
      !readFileSync(target, "utf8").includes(`id="${hash}"`)
    )
      failures.push(`${file}: missing anchor ${value}`);
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(img[0]))
      failures.push(`${file}: image has no alt`);
  }
}
const home = get("index.html");
for (const phrase of [
  "Give your agents a ticket.",
  "Work with them in Slack.",
  "Your team inspects the change and decides what gets merged.",
  "Come back to",
  "the same work.",
  "Historical benchmark evidence, separate from the illustrative Slack task.",
  "Illustrative task",
  "Browser interaction is not exercised.",
  "data-scroll-story",
  "data-motion-toggle",
]) {
  if (!home.includes(phrase))
    failures.push(`Approved homepage phrase missing: ${phrase}`);
}
if (home.includes("AgentX cannot merge"))
  failures.push("Homepage presents merge authority as a missing feature");
const css = get("assets/site.css");
if (!css.includes("prefers-reduced-motion"))
  failures.push("Reduced-motion support missing");
const js = get("assets/site.js");
if (!js.includes("showModal") || !js.includes("close"))
  failures.push("Evidence dialog behavior missing");
const ledger = JSON.parse(get("data/claims.json"));
if (!get("docs/release/index.html").includes(ledger.source.commit.slice(0, 12)))
  failures.push("Source pin mismatch in docs");
if (
  !get("docs/release/index.html").includes("22.19.0") ||
  !get("docs/release/index.html").includes("Node 22 LTS")
)
  failures.push("Supported Node range missing");
const install = JSON.parse(get("data/installation.json"));
for (const route of ["deployment/index.html", "docs/install/index.html"]) {
  const html = get(route);
  if (!html.includes(install.npmPackage)) failures.push(`${route}: npm scope mismatch`);
  if (!html.includes(install.awsLaunchUrl.replaceAll("&", "&amp;"))) failures.push(`${route}: AWS launch URL mismatch`);
}
for (const file of walk(root).filter((p) => p.endsWith(".html") || p.endsWith(".md"))) {
  const content = readFileSync(file, "utf8");
  if (/github\.com\/PrepLabsAI\/AgentX|@preplabs\/rovara-code|@charterarc\/agentx/.test(content)) failures.push(`${file}: obsolete product repository or package`);
  if (/Installation coming soon|Public release in preparation|public self-hosted installation guide is not available/.test(content)) failures.push(`${file}: obsolete installation status`);
}
const recordRoot = "assets/evidence/django-11099";
const record = JSON.parse(get(`${recordRoot}/record.json`));
for (const [name, artifact] of Object.entries(record.artifacts)) {
  const data = readFileSync(resolve(root, recordRoot, name));
  if (
    data.length !== artifact.bytes ||
    createHash("sha256").update(data).digest("hex") !== artifact.sha256
  )
    failures.push(`Recorded benchmark artifact changed: ${name}`);
}
const report = JSON.parse(get(`${recordRoot}/harness-report.json`))[
  record.instanceId
];
if (!report?.resolved || !report.patch_successfully_applied)
  failures.push("Recorded benchmark grader outcome mismatch");
for (const [key, count] of [
  ["FAIL_TO_PASS", record.failToPass],
  ["PASS_TO_PASS", record.passToPass],
]) {
  const group = report?.tests_status?.[key];
  if (
    group?.success.length !== count.passed ||
    group?.failure.length !== count.total - count.passed
  )
    failures.push(`Recorded benchmark count mismatch: ${key}`);
}
if (
  !get(`${recordRoot}/test-output.txt`).includes(
    `Ran ${record.failToPass.total + record.passToPass.total} tests`,
  )
)
  failures.push("Recorded benchmark raw output count mismatch");
// The homepage links to the historical record. Keep that destination's
// count and artifact links tied to the saved output, without a duplicate diff.
const benchmarks = get("docs/benchmarks/index.html");
const totalRecordedTests = record.failToPass.total + record.passToPass.total;
if (!benchmarks.includes(`Ran ${totalRecordedTests} tests`))
  failures.push("Benchmark documentation count differs from saved raw output");
for (const name of ["patch.diff", "test-output.txt", "harness-report.json", "record.json"]) {
  if (!benchmarks.includes(`../../${recordRoot}/${name}`))
    failures.push(`Benchmark documentation missing recorded artifact: ${name}`);
}
if (!home.includes('href="docs/benchmarks/index.html#recorded-run"'))
  failures.push("Homepage must link to the qualified historical record");
if (/all checks passed|pytest|\+12|−4/.test(home.toLowerCase()))
  failures.push("Homepage contains unsupported generated evidence");
const totalTests = record.failToPass.passed + record.passToPass.passed;
if (!home.includes(`${totalTests} tests passed`))
  failures.push("Homepage count differs from the recorded report");
// Qualify the selected batch from grader artifacts, never the agent's claim.
const batchRoot = "assets/evidence/evaluation-batches";
const receipts = JSON.parse(get(`${batchRoot}/pro-50-receipts.json`));
const history = JSON.parse(get(`${batchRoot}/batch-history.json`));
const batch = history.find(b => b.batch_id === receipts.batch_id);
if (receipts.runs.length !== 50 || new Set(receipts.runs.map(r => r.run_id)).size !== 50)
  failures.push("Selected batch must contain 50 unique grader receipts");
let resolved = 0;
for (const run of receipts.runs) {
  for (const [suffix, key] of [["test-sh.log", "test_summary_sha256"], ["output.json", "grader_output_sha256"]]) {
    const bytes = readFileSync(resolve(root, batchRoot, "pro-50-harness", `${run.run_id}-${suffix}`));
    if (createHash("sha256").update(bytes).digest("hex") !== run[key])
      failures.push(`Selected batch artifact changed: ${run.run_id}-${suffix}`);
  }
  const grader = JSON.parse(get(`${batchRoot}/pro-50-harness/${run.run_id}-output.json`));
  const summary = get(`${batchRoot}/pro-50-harness/${run.run_id}-test-sh.log`);
  const verdict = summary.match(/RESULT:\s*(PASSED|FAILED)/)?.[1];
  const required = Number(summary.match(/Required tests:\s*(\d+)/)?.[1]);
  const passed = Number(summary.match(/Required tests that passed:\s*(\d+)/)?.[1]);
  if (!Array.isArray(grader.tests) || verdict !== run.grader_verdict
      || (verdict === "PASSED") !== run.resolved || required !== run.required_tests
      || passed !== run.required_tests_passed
      || required !== run.fail_to_pass.total + run.pass_to_pass.total
      || passed !== run.fail_to_pass.passed + run.pass_to_pass.passed)
    failures.push(`Selected batch grader outcome mismatch: ${run.run_id}`);
  if (run.resolved) resolved++;
}
if (resolved !== 40 || batch?.resolved !== resolved || batch?.finished_slots !== 50)
  failures.push("Selected batch summary differs from saved grader outcomes");
if (!benchmarks.includes("40") || !benchmarks.includes("50") || !benchmarks.includes("selected"))
  failures.push("Benchmark documentation is missing selected-batch context");
if (failures.length) {
  failures.forEach((x) => console.error(`FAIL: ${x}`));
  process.exit(1);
}
console.log(
  `PASS: ${pages.length} pages; local routes, anchors, assets, approved copy, release status, source pin, and interaction hooks.`,
);
console.log(
  "PASS: recorded benchmark artifact hashes and reported test counts reconcile.",
);
console.log("PASS: selected Pro batch reconciles to 40/50; all 100 grader downloads retain their recorded hashes.");
console.log(
  "Browser interaction, visual, accessibility and live-install checks require separate evidence.",
);
