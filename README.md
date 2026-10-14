# Rovara website

Public website for cloud coding agents and persistent workspaces directed from Slack. Static HTML, CSS, JavaScript, self-hosted fonts and licensed icons. Hosted by GitHub Pages from `rovara-dev/rovara-dev.github.io`.

## Local preview

Website tooling requires Node 20 or newer; no dependency installation is required. The product CLI has its own supported Node range, documented on the installation pages.

```sh
npm run dev
```

Open `http://127.0.0.1:8766/`, or choose a port with `npm run dev -- --port 8767`. The server binds to loopback by default.

## Current page story

The owner-selected 14 October 2026 direction uses indigo, pale yellow and lavender-white, with self-hosted Inter. The homepage starts with **Give your agents a ticket. Work with them in Slack.**

One continuous illustrative conversation follows request → collaborative plan revision → owner approval → cloud work → a failed check → correction and fresh checks → separate reviews → draft PR. Native scrolling reveals the chapters and the plan revision. Chapter links provide direct navigation. Spacious viewports use a pinned thread and linked artifacts; narrow or short viewports keep the full transcript and artifacts inline. Reduced motion and a no-JavaScript reading path remain available.

The closing sequence is persistent workspace → three setup steps → installation → optional historical benchmark evidence. Humans review and merge in GitHub. The example does not submit Slack messages, run agents, create PRs or deploy software.

## Files and routes

- `site/index.html`: homepage, continuous Slack conversation, illustrative plan/check/PR inspectors, workspace continuity and setup/install path.
- `site/assets/scroll-story.css` and `scroll-story.js`: responsive story layout and native scroll/dialog behavior.
- `site/deployment/index.html`: AWS launch and terminal installation options.
- `site/how-it-works/index.html`: workflow, verification, workspace and architecture explanations.
- `site/docs/`: nineteen generated documentation pages with search, navigation and copyable examples.
- `docs/content/pages.json`: canonical documentation authoring source. Run `npm run docs:generate` after editing it; do not edit generated pages directly.
- `site/data/claims.json`, `installation.json` and `workflow-preview.json`: separate source, release and workflow provenance.
- `site/assets/evidence/`: preserved historical benchmark artifacts and grader receipts.

Editable diagrams remain in `docs/diagrams/`. Existing video, captions and transcript assets remain available; the video is not part of the current homepage sequence. Fonts, icons, Motion and fictional portrait provenance are in `ASSET-LICENSES.md`.

## Claims and qualification

The reviewed product mainline is `2deee3d70d3aa4c410e1bee030110c9d01858ef5`. Published v0.3.4 is recorded separately at `a0984e3d26b15618505ac37a53dd55de594c38a4`. Native workflow references also match that release; serial task dependencies use newer mainline source. Match the documentation to the installed release.

The scoped pre-PR E2E work is an owner-requested assumption. The export example uses fictional people, synthetic rows and selected source checks with a mocked database. Browser/device interaction is not exercised. Model review conclusions, command output and benchmark grades remain distinct. No full live Slack-to-PR, AWS installation, customer result, universal coverage, automatic merge or production delivery is established by this website.

The Django patch, test output, grader report and metadata are unchanged historical artifacts. The saved 22-test result is separate from the illustrative Slack task. The selected Pro batch reconciles to 40/50 from its saved grader receipts; this is not an official full-benchmark score or qualification of the current runtime loop.

## Check and build

```sh
npm run check
AGENTX_SOURCE=/path/to/current/Rovara npm run check:claims
npm run build
```

`check` validates generated documentation/search output, local routes and anchors, image assets, copy and interaction hooks, benchmark artifact hashes/counts, and the linked historical record. `check:claims` reconciles pinned product references, release qualification, MCP tools and illustrative cost against an authorized product clone. Public CI does not need product credentials. These checks do not establish product runtime acceptance.

`build` copies `site/` into `dist/`. GitHub Pages uploads the checked static `site/` directory; no framework or backend is required.

## Publication

Live URL: https://rovara.dev/. `.github/workflows/pages.yml` checks and deploys from `main` or an explicitly dispatched workflow. Review branches run PR checks and do not automatically publish. The owner explicitly authorized pushing and deploying this redesign on 14 October 2026.

GitHub Pages serves the custom domain; Squarespace remains the registrar and the existing Route 53 hosted zone manages DNS. The apex A/AAAA records point to GitHub Pages, and `www` points to `rovara-dev.github.io`. The custom domain is configured in repository Pages settings because this site publishes through GitHub Actions. Preserve the domain-verification TXT record and existing email records when editing DNS.

Display branding does not rename CLI commands, MCP IDs, configuration, authorization or evidence identities. The product repository is `PrepLabsAI/Rovara`, the package is `@preplabsai/rovara-code`, and `agentx` compatibility commands remain. MIT is the current grant for PrepLabsAI-owned code; the previously issued Apache-2.0 grant remains available.

Current design and messaging are recorded in `DESIGN.md` and `PRODUCT.md`. `design-qa.md` records local visual/interaction checks and their limits. Browser captures and detailed local audit reports in `design-evidence/` are preserved locally and excluded from Git. Older dated notes remain historical records rather than current release claims.
