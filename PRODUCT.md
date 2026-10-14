# Product story

## Current owner-approved website story — 14 October 2026

Rovara is the public display brand for this standalone cloud-agent and workspace website. Lead with **Give your agents a ticket. Work with them in Slack.** The team supplies context and shapes a plan, the task owner makes workflow decisions, coding runs in the customer AWS workspace, and named checks and separate reviews accompany a draft PR. Humans decide what gets merged in GitHub.

The homepage follows one illustrative task into persistent-workspace continuation, three setup steps and self-hosted installation. Slack is the primary story; coding-tool entry remains available through MCP. No automatic issue/ticket intake, autonomous merge, deployment or customer-outcome promise is added.

Source claims pin mainline `2deee3d70d3aa4c410e1bee030110c9d01858ef5`. Published v0.3.4 is recorded separately at `a0984e3d26b15618505ac37a53dd55de594c38a4`; native workflow references also match the release, while serial dependencies use newer mainline. The scoped pre-PR E2E work remains an owner-requested assumption. Synthetic source/mock checks and historical benchmarks do not prove browser/device coverage or a live customer run.

The owner authorized website publication on 14 October 2026. Public source/package/release availability remains separate from fresh installation, runtime and customer acceptance. Display branding preserves the `PrepLabsAI/Rovara` repository, `@preplabsai/rovara-code` package, AgentX compatibility commands, MCP/configuration identifiers and evidence provenance.

## Historical messaging decisions

The earlier notes below are preserved as dated context; current positioning and release/source references above supersede conflicting earlier wording.


### Owner-approved direction

Standalone website; public self-hosted install is the primary destination. Rovara is the chosen public display brand; The product repository is PrepLabsAI/Rovara; existing internal identifiers and the agentx compatibility CLI remain. Do not rename configuration, evidence IDs or commands as part of website branding.

Hero: **Give it a task. Get the work back.**

Explanation: Hand off a coding task from Slack or your coding tool. Rovara works in your AWS account and brings back code changes and evidence from tests and checks for you to inspect.

Authority: **You decide what gets merged.**

Supporting value: **Code to review. Evidence to inspect.**

### Audience

Developers need a concrete task workflow: delegate, inspect, follow up in the same workspace, request a PR. CTOs and VPs need quick understanding of infrastructure ownership, cost, visible evidence and human review authority. Both see the same product, with operational depth on supporting pages.

### Story order

1. Task outcome and human authority.
2. Slack/coding-tool → AWS workspace → change and evidence → human review.
3. Persistent workspace for follow-up.
4. Bounded task examples and familiar connections.
5. Ownership and operating model.
6. Installation through Launch in AWS or the published npm CLI, with documentation for the first task and operations.

Verification strengthens the complete coding workflow. It is not presented as the whole product or as proof of correctness. Missing checks, stopped runs, unrerun commands and failing checks must remain visible in the detailed explanation.

### Current boundaries

The Rovara repository is public, @preplabsai/rovara-code is published, and GitHub releases v0.1.0, v0.2.0 and v0.3.0 exist. MIT is the current grant for PrepLabsAI-owned code, and the previously issued Apache-2.0 grant remains available. Keep release availability separate from fresh installation acceptance. Do not imply a working public install, all checks passing before PR creation, universal exact-commit verification, automatic merge, cost caps, customer success or a controlled public benchmark.

Implementation review is recorded in `site/data/claims.json` at `8acb7ac00c97e3e5ff547cb13af07e5ff160bc86`. Source references are drift guards; the repository is now publicly accessible. Refreshed installation references live separately in site/data/installation.json.

### Launch transition

When public release artifacts exist, update the primary CTA, exact installation instructions, source link, license wording and operator guide together. Verify a fresh self-hosted installation through a first task, follow-up, PR and cleanup before claiming that path works. A website build does not establish that product acceptance.


### Approved native workflow story (5 October 2026)

Category: A coding agent with a workflow you control. Keep “Give it a task. Get the work back.” and “You decide what gets merged.”

Request → approve plan → coding → candidate-bound check evidence and separate AI reviews → draft PR → proposed feedback fixes → owner decision → refreshed evidence. Quick has one implementation-plan approval; Full has requirements, design and coding-plan approvals. Dependencies, blockers and all required PRs stay visible. The website uses the owner-approved completed-scope baseline as a preview, not a claim of recorded live acceptance.

AI findings, command output, repository CI and benchmark grades have different meanings. Preserve their provenance. No automatic issue intake, model-claimed correctness, parallel-agent execution claim, automatic human approval or production delivery.


### 2026-10-14 website story

Lead with cloud coding agents and persistent workspaces directed from Slack. Show a person supplying a ticket, collaborative planning, owner approval, cloud implementation, a meaningful failed check, owner send-back, fresh retest, separate reviews and a draft PR. The whole team may contribute context; the task owner makes workflow decisions and humans merge. The current pre-PR E2E work is an owner-requested scoped assumption, not universal native/browser coverage or a live customer outcome.
