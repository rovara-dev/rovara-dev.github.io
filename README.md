# Rovara Code website

Standalone public website for Rovara Code, the coding workflow product. Static HTML, CSS, JavaScript, self-hosted fonts and licensed icon assets. Hosted by GitHub Pages from `rovara-dev/rovara-dev.github.io`.

## Local preview

Use Node 20 or newer for the website tooling (the published product CLI requires Node 22.19 or newer; Node 22 LTS is recommended). No package installation is required.

```sh
npm run dev
```

Open `http://127.0.0.1:8766/`. Choose another port with `npm run dev -- --port 8767`. The server binds to the loopback interface by default.

## Pages

- `site/index.html`: complete product story, six-stage illustrative native workflow, Quick/Full planning, PR feedback decisions, linked PRs, historical Django evidence and an earlier 20-second workspace video.
- `site/how-it-works/index.html`: four connected native-workflow diagrams: journey, candidate evidence, workspace/task lifecycle and architecture.
- `site/deployment/index.html`: Launch in AWS and terminal installation options.
- `site/docs/install/index.html`: prerequisites, setup, first Slack task, recovery, upgrades and teardown, reconciled with the public Rovara README.
- `site/docs/index.html`: documentation hub with nineteen pages, persistent navigation, local full-text search, copyable examples and page contents.

The revised walkthrough shows request → plan approval → coding → check/review evidence → draft PR → feedback decision → refreshed evidence. The installation guide follows the public README and uses the published `@preplabsai/rovara-code` package. The native workflow is distinct from existing direct tasks. It is merged into product mainline but not in published v0.3.1, so its guides carry an "On mainline, not yet released" callout.

All pages use relative links. Evidence controls open an accessible native dialog; without JavaScript they lead to expandable explanations. Mobile navigation remains available without JavaScript. Reduced motion is respected.

## Check and build

```sh
npm run check
AGENTX_SOURCE=/path/to/current/Rovara npm run check:claims
npm run build
```

`check` first checks that generated documentation and its search index match their authoring source, then inspects local routes, anchors, assets and required copy. It also checks artifact hashes/test counts and that both homepage regex excerpts match the preserved patch. `check:claims` checks pinned mainline source references against the authorized Rovara clone, verifies that its fetched mainline has not advanced, reconciles the MCP tool reference against the pinned source's tool definitions, and recomputes the illustrative cost. It is a drift guard, not proof of runtime behavior. `site/data/workflow-preview.json` records the workflow source; it now equals the mainline pin. Set `AGENTX_WORKFLOW_SOURCE` only if that record points at a separate branch again. Fresh code review and runtime evidence still qualify product claims.

`build` copies the static artifact to `dist/`. GitHub Pages currently uploads `site/` directly; no framework or runtime backend is needed.

## Publication

Live URL: `https://rovara-dev.github.io/`. `.github/workflows/pages.yml` deploys only from `main` or a manually requested workflow run. Review branches do not publish this site. The approved redesign requires owner approval before live merge/publication.

## Product claim maintenance

`site/data/claims.json` records the reviewed source commit and primary references. Fetch current product mainline, read the affected implementation, then update the pin and copy together. Do not advertise a public installer until the product source, license and release artifacts are actually available.

The current source license is MIT for PrepLabsAI-owned code, and the previously issued Apache-2.0 grant remains available. The public source, npm CLI and release artifacts are tracked in `site/data/installation.json`. Their publication does not establish a fresh live installation, customer results, an official full-benchmark score, security certification or automatic merge enforcement. Public display branding does not rename CLI commands, authorization or evidence identities.

Design decisions: `DESIGN.md`. Product messaging: `PRODUCT.md`. Asset provenance: `ASSET-LICENSES.md`. Browser evidence: `design-qa.md`.

## Connected explanations

Editable task journey, architecture, verification, and lifecycle sources: `docs/diagrams/`. Their SVG exports ship without a diagram runtime. User-started Motion walkthrough has direct stage selection, pause/replay, keyboard controls, reduced-motion handling, and a static no-JavaScript fallback.

The Copy-button walkthrough is a constructed explanation, not real run evidence. A separate historical Django benchmark now has an inspectable patch, raw harness output, grader report, and allowlisted metadata in `site/assets/evidence/django-11099/`. Hashes and test counts are checked by `npm run check`. This selected task is not a full Slack-to-PR demo, aggregate solve rate, or proof of the current verification loop. The locally rendered 20-second video is embedded with controls, captions and a transcript. Production notes live in `docs/video/`; share media lives in `site/assets/video/`. The approved design is already public; new branch changes publish only after merge.

## Documentation authoring

Edit `docs/content/pages.json` and run `npm run docs:generate`. The generator writes all documentation pages, the search index and `site/agent-guide.md` from the same content. Do not edit those generated files directly. `npm run check` refuses stale generated output.

The reading order is overview → install → concepts → first Quick task → Full planning → task page → coding-tool connection → evidence → PR feedback → linked PRs → Rovara loop → workspaces → configuration → Sign in with ChatGPT → architecture → MCP reference → recorded benchmarks → troubleshooting → release and licence. Tutorials state their prerequisites, user action, expected result and next step. Installation is now the primary destination, following the owner's instruction on 6 October 2026.

`site/assets/docs.css` and `site/assets/docs.js` provide the docs shell, responsive navigation, native search dialog, keyboard controls and copy buttons. Docs retain native links and disclosures without JavaScript. Search is hidden without JavaScript.

Fresh reference review and browser checks: `docs/research/docs-review-2026-10-05.md`. This records website checks, not live AgentX deployment acceptance. The current recorded Django example remains historical evidence, not a campaign-wide score.

## Native workflow preview

Approved direction: docs/superpowers/plans/2026-10-05-native-workflow-site.md. Diagram source: scripts/generate-workflow-diagrams.mjs; matching SVG and editable role layouts regenerate together. Four native MCP additions are documented from source, without inventing a feedback-tool API. Feedback/browser, dependency and closeout content includes the owner-approved design; match it to the installed release before public installation.

This pass preserves the existing benchmark artifacts and their failures. It adds no tests and does not execute an AgentX live task or publish the website. The generated docs and static build are local artifacts. New real-run video capture remains bounded by its environment, repository and live-run authorization; storyboard: docs/video/native-workflow-storyboard.md.

## Review and deployment checks

Pull requests and review branches run the static website checks and build in GitHub Actions. The Pages deployment repeats those checks before uploading the site. Source-code claim reconciliation runs locally against the authorized product clones; public CI does not need product credentials. The selected 50-task benchmark is checked against all saved grader receipts, outcomes and downloadable artifact hashes.

## Installation source maintenance (6 October 2026)

Product repository: https://github.com/PrepLabsAI/Rovara. `site/data/installation.json` pins the reviewed README/guides, current package, release and AWS launch link separately from historical architecture/workflow evidence. Update the installation authoring page, deployment options, coding-tool commands, release status and generated search/agent guide together. The npm CLI declares Node >=22.19.0; recommend Node 22 LTS. Preserve `agentx` compatibility commands, MCP IDs, configuration paths and historical evidence.

Installation was checked against mainline `a03326359542ff3934838566d464cd188624c15e`; published v0.2.0 has its own source commit in the installation record. This update checked published artifact availability, not a new AWS deployment. Native workflow material remains qualified as preview.

## Mainline docs sync (13 October 2026)

Docs were reconciled with product mainline `b18fe4ebde93dc4c872e84ef65bc723367d79b2f`, which is ahead of the latest published release (v0.3.1, still current on npm). Added pages: task page decisions and comments, Rovara loop, and Sign in with ChatGPT. Quick, Full, evidence, feedback, coding-tool, configuration, architecture, MCP (25 tools), troubleshooting and release pages now describe Slack request routing, saved thread replies, automatic reviews and draft PRs, and the feedback decisions. Task dependencies remain a design draft. Pages describing unreleased behavior carry an "On mainline, not yet released" callout; remove it, and repin, once a release includes them. Sources: `site/data/claims.json` and `site/data/workflow-preview.json`. No live AWS installation or workflow run was performed.
