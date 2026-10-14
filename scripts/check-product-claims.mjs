#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

if (!process.env.AGENTX_SOURCE) {
  console.error(
    "Set AGENTX_SOURCE to an authorized AgentX clone with freshly fetched origin/mainline.",
  );
  process.exit(2);
}
const root = resolve(process.env.AGENTX_SOURCE);
const ledger = JSON.parse(
  readFileSync(resolve("site/data/claims.json"), "utf8"),
);
const failures = [];
const docsHtml = readFileSync(
  resolve("site/docs/release/index.html"),
  "utf8",
).toLowerCase();
const git = (...args) =>
  execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
const commit = ledger.source.commit;
try {
  git("cat-file", "-e", `${commit}^{commit}`);
} catch {
  console.error(`Claim check cannot find source commit ${commit} in ${root}`);
  process.exit(1);
}
if (!docsHtml.includes(commit.slice(0, 12).toLowerCase()))
  failures.push(
    "documentation source snapshot does not match the claim ledger commit",
  );
const sourceRef = git("rev-parse", `${ledger.source.ref}^{commit}`);
if (sourceRef !== commit)
  failures.push(
    `mainline advanced to ${sourceRef}; review and update the pinned source commit before publishing`,
  );
const readSource = (path) =>
  git("show", `${commit}:${path}`).replace(/\s+/g, " ");
const installation = JSON.parse(readFileSync(resolve("site/data/installation.json"), "utf8"));
if (ledger.source.releaseCommit !== installation.releaseCommit || ledger.source.releaseTag !== installation.releaseTag)
  failures.push("published-release source differs between claim and installation records");
for (const claim of ledger.claims) {
  for (const path of claim.websiteEvidence ?? []) {
    try { readFileSync(resolve("site", path)); }
    catch { failures.push(`${claim.id}: website evidence is missing: ${path}`); }
  }
  for (const item of claim.evidence ?? []) {
    try {
      if (!readSource(item.file).includes(item.contains))
        failures.push(`${claim.id}: wording no longer exists in ${item.file}`);
      if (claim.releasedSourceReference && !git("show", `${ledger.source.releaseCommit}:${item.file}`).replace(/\s+/g, " ").includes(item.contains))
        failures.push(`${claim.id}: published-release qualification is not supported by the pinned release source`);
    } catch {
      failures.push(`${claim.id}: cannot read ${item.file} at pinned source`);
    }
  }
  console.log(`reviewed source reference: ${claim.id}`);
}

// Keep the developer tool reference in sync with actual tool definitions.
const toolSource = readSource("packages/mcp/src/tools.ts");
const sourceTools = [...toolSource.matchAll(/name:\s*"(agentx_[a-z_]+)"/g)].map(x => x[1]).sort();
const toolDoc = readFileSync(resolve("site/docs/mcp/index.html"), "utf8");
const documentedTools = [...toolDoc.matchAll(/<td>\s*<code>(agentx_[a-z_]+)<\/code>\s*<\/td>/g)].map(x => x[1]).sort();
const preview = JSON.parse(readFileSync(resolve("site/data/workflow-preview.json"), "utf8"));
let nativeTools = [];
if (preview.nativeWorkflowSource === commit) {
  // The workflow merged into mainline: its tools are already in sourceTools.
  if (!docsHtml.includes(commit.toLowerCase())) failures.push("workflow source pin missing in release documentation");
} else if (process.env.AGENTX_WORKFLOW_SOURCE) {
  try {
    const nativeSource = execFileSync("git", ["-C", resolve(process.env.AGENTX_WORKFLOW_SOURCE), "show", `${preview.nativeWorkflowSource}:packages/mcp/src/tools.ts`], {encoding: "utf8"});
    nativeTools = [...nativeSource.matchAll(/name:\s*"(agentx_[a-z_]+)"/g)].map(x => x[1]).sort();
    if (!docsHtml.includes(preview.nativeWorkflowSource)) failures.push("native workflow source pin missing in release documentation");
  } catch { failures.push("cannot read the pinned native workflow source in AGENTX_WORKFLOW_SOURCE"); }
} else {
  failures.push("Set AGENTX_WORKFLOW_SOURCE to the authorized native-workflow clone to qualify the expanded MCP reference");
}
const expectedTools = [...new Set([...sourceTools, ...nativeTools])].sort();
if (JSON.stringify(expectedTools) !== JSON.stringify(documentedTools)) failures.push("MCP tool reference differs from the combined pinned mainline and native workflow sources");
else console.log(`MCP reference reconciles: ${documentedTools.length} tools at the pinned source`);

// Derive the advertised figure from the actual source formula and sample load.
const cost = readSource("packages/cli/src/init/cost.ts");
const config = readSource("packages/model-runtime/src/config.ts");
const val = (source, regex, label) => {
  const found = source.match(regex);
  if (!found) throw new Error(`cannot find ${label} in pinned source`);
  const result = Number(found[1].replaceAll(",", ""));
  if (!Number.isFinite(result)) throw new Error(`cannot parse ${label}`);
  return result;
};
const getProp = (source, key) =>
  val(source, new RegExp(`${key}:\\s*([0-9,.]+)`), key);
const getModel = (source, key) => {
  const found = source.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  if (!found) throw new Error(`cannot find default ${key} model`);
  return found[1];
};
const getPrice = (variable, id) => {
  const map = cost.match(
    new RegExp(`const ${variable}[^=]*=\\s*\\{([^}]*)\\}`),
  );
  if (!map) throw new Error(`cannot find ${variable}`);
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return val(
    map[1],
    new RegExp(`"${escaped}"\\s*:\\s*([0-9.]+)`),
    `price for ${id}`,
  );
};
try {
  const usageText = cost.match(/STATED_USAGE\s*=\s*\{([^}]+)\}/)?.[1];
  if (!usageText) throw new Error("cannot find sample usage");
  const usage = Object.fromEntries(
    [
      "turnsPerMonth",
      "workerSessionsPerMonth",
      "workerInstanceHoursPerMonth",
      "keptWorkspaces",
    ].map((key) => [key, getProp(usageText, key)]),
  );
  const modelsText = config.match(
    /DEFAULT_BEDROCK_MODELS\s*=\s*\{([^}]+)\}/,
  )?.[1];
  if (!modelsText) throw new Error("cannot find default Bedrock models");
  const models = Object.fromEntries(
    ["worker", "orchestrator", "classifier"].map((key) => [
      key,
      getModel(modelsText, key),
    ]),
  );
  const p = Object.fromEntries(
    [
      "natGatewayHour",
      "m6gMediumHour",
      "gp3GbMonth",
      "workspaceGiB",
      "ec2WorkerRootVolumeGiB",
      "smallServicesMonth",
    ].map((key) => [key, getProp(cost, key)]),
  );
  const vcpu = getProp(cost, "fargateArmVcpuHour");
  const gb = getProp(cost, "fargateArmGbHour");
  const lineCents = (x) => Math.round(x * 100);
  const modelUse =
    getPrice("ORCHESTRATOR_PER_TURN", models.orchestrator) *
      usage.turnsPerMonth +
    getPrice("CLASSIFIER_PER_CHECK", models.classifier) * usage.turnsPerMonth +
    getPrice("WORKER_PER_SESSION", models.worker) *
      usage.workerSessionsPerMonth;
  const items = [
    2 * p.natGatewayHour * 730,
    (0.5 * vcpu + gb) * 730,
    p.m6gMediumHour * usage.workerInstanceHoursPerMonth,
    usage.workerInstanceHoursPerMonth *
      p.ec2WorkerRootVolumeGiB *
      (p.gp3GbMonth / 730),
    usage.keptWorkspaces * p.workspaceGiB * p.gp3GbMonth,
    p.smallServicesMonth,
    modelUse,
  ];
  const actual = items.reduce((sum, item) => sum + lineCents(item), 0) / 100;
  const expected = ledger.claims.find(
    (claim) => claim.id === "cost-example",
  )?.expectedRoundedUsd;
  if (Math.round(actual) !== expected)
    failures.push(
      `cost example recalculates to $${actual.toFixed(2)}, expected round-to-dollar $${expected}`,
    );
  else
    console.log(
      `illustrative cost reconciles: $${actual.toFixed(2)} rounds to $${expected}`,
    );
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

if (failures.length) {
  for (const failure of failures)
    console.error(`CLAIM CHECK FAILED: ${failure}`);
  process.exit(1);
}
console.log(
  `all ${ledger.claims.length} claims match source evidence pinned at ${commit}`,
);
