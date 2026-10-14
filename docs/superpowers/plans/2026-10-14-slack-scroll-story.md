# Rovara Slack scroll story

Execute in the existing task-owned website clone on `codex/rovara-slack-scroll-story`.
Visual target: `/Users/abhishekgarg/.codex/generated_images/01a139f7-6d9f-7292-9c9c-079ff66848d8/exec-e7c1f05c-8633-4ed8-85f3-1aeb7e885b09.png`.

## Preflight

```yaml
objective_snapshot: MSDLC-OBJ-001@0.4
objective_digest: sha256:707543b940253c8e068da55af87b81b4c57dd8d0e82f83436be13f5391cdf0c2
task: Redesign the website around a scroll-driven illustrative Slack task
contributes_to: Standalone Rovara native task-to-PR experience
decision_rights: implement
must_preserve:
  - Explicit owner initiation and plan approval
  - Current source-qualified claims and clearly labelled illustrative scenes
  - Declared source/mock coverage and unexercised native/browser coverage
  - Separate code/security reviews and human merge authority
  - Existing docs, install routes and immutable historical benchmark evidence
non_goals: [publication, product runtime changes, production authority, customer claims]
assumptions_relied_on:
  - Owner-selected third visual direction and revised story
  - Scoped pre-PR E2E work is assumed implemented per owner instruction
required_evidence: [browser interaction, responsive screenshots, structural checks, source claim checks, fresh branch review]
stop_conditions: [unresolved material claim contradiction]
```

## Work

1. Replace homepage hero and illustrative journey with one ticket-to-PR story. Use source assets and generated fictional Maya/Sam portraits. Preserve historical benchmark artifact bytes.
2. Add `site/assets/scroll-story.css` for indigo/yellow visual direction and responsive scenes. Add `site/assets/scroll-story.js` for native-scroll chapter selection, purposeful message reveals, plan/results dialogs, direct chapter navigation and reduced motion. Without JS, all scenes remain readable. On small/short viewports, avoid pinned content taller than the viewport.
3. Update source pin to mainline `2deee3d70d3aa4c410e1bee030110c9d01858ef5`; reconcile serial task-dependency documentation. Record E2E as a scoped assumption, distinct from mainline and runtime proof. Regenerate docs and update copy-integrity checks to the newly selected story.
4. Verify routes, assets, claims, build, desktop scroll progression, approval/send-back links, plan/results dialogs, keyboard close/focus, mobile, reduced motion and no-JS fallback. Save visual comparisons and `design-qa.md`. Obtain one fresh whole-branch review and fix material findings.

## Motion contract

- Keep wheel/touch scrolling native; no wheel interception or scroll library.
- Scroll advances Request, Plan, Build, Test, Fix + retest, Draft PR.
- Preserve the Slack shell across stages; reveal new messages, acceptance rows, workspace activity and results where the user action occurs.
- Failed check shows expected versus observed. A fresh candidate/retest clears the old outcome before new results appear.
- Respect OS reduced motion and a page control. No autonomous loop, fictional percent-complete, typing simulation or decorative background movement.
- Chapter progress represents the website story, never a real task execution percentage.

## Verification strategy

Use the existing site/source checks plus browser-visible behavior. These reversible presentation changes do not justify implementation-mirroring unit tests. Browser checks must include fast scrolling/reverse scrolling, chapter links, interactive dialogs, mobile overflow, reduced motion, no-JS content and preserved benchmark evidence interaction.

## Execution record

- Existing source clone was clean on main; branch created for this work. Baseline site checks passed earlier; baseline claim check exposed the old mainline pin, addressed as part of source refresh.
- Website runtime is already a static HTML/CSS/JS project. Preserve it rather than initialize a new prototype template.
- Asset generation delegated only for two individual fictional portraits as required by Product Design image-to-code. Implementation and browser verification remain inline.
- Implementation and browser verification completed; see project-root `design-qa.md` and `design-evidence/`.
- Independent whole-branch review found a stale dependency heading and responsive/motion issues. Corrected them and verified the regressions. A later native-wheel discrepancy was reproduced; removed asynchronous observer gating and verified native forward/reverse progression.
- Release refresh found published v0.3.4, source tag `a0984e3d26b15618505ac37a53dd55de594c38a4`. Native workflow references also match that tag; serial task dependencies are newer mainline. Registry metadata, GitHub release/tag and source references were inspected; this is separate from live installation proof.

## Postflight

```yaml
executed_against: MSDLC-OBJ-001@0.4
alignment: pass
result_status: verified
evidence_added:
  - Browser-rendered desktop/mobile story and focused visual comparisons
  - Native scroll, reverse scroll, chapter links, dialog/comment and keyboard checks
  - Responsive chapter/focus preservation, manual/system reduced motion and no-JS fallback
  - Current mainline and published v0.3.4 source/registry references
  - Site, source-claim, build, syntax and whitespace checks
decision_proposals: []
assumption_changes:
  - Published native workflow status refreshed from stale v0.3.1 to v0.3.4
scope_delta: none
contradictions: []
objective_change_attempted: false
objective_digest_match: true
```

Verified refers to this website frontend. Product runtime E2E, deployment, publication, merge and customer validation are outside this work.

## Owner-approved continuous-conversation revision

On 2026-10-14 the owner approved implementing the screenshot-backed story audit: retain the visual direction, use one continuous Slack conversation, show meaningful planning/cloud work/scoped checks, and finish with a concrete illustrative PR. This is a bounded revision of the existing local flow; the design recommendation in `design-evidence/story-audit-2026-10-14/audit.json` is the accepted brief.

```yaml
objective_snapshot: MSDLC-OBJ-001@0.4
objective_digest: sha256:707543b940253c8e068da55af87b81b4c57dd8d0e82f83436be13f5391cdf0c2
task: Implement the approved continuous Slack story improvements
decision_rights: implement
contributes_to: Inspectable standalone Rovara task-to-PR experience
must_preserve: [explicit owner start, versioned plan approval, declared mock scope, fresh candidate checks, separate reviews, human merge, historical evidence]
non_goals: [product changes, live task execution, publishing, push, PR, merge, deployment]
assumptions_relied_on: [owner-assumed scoped P0 E2E work, current mainline source pin, fictional export task]
required_evidence: [fresh browser scenes, causal result/revision controls, keyboard focus, responsive reflow, reduced motion, no-JS transcript, site and source checks]
stop_conditions: [unresolved material claim contradiction, inaccessible browser QA]
```

| Requirement | Classification | Full-product status | Current-phase status | Reason |
|---|---|---|---|---|
| Cloud execution and persistent task context | capability | retained | included | Current source supports AWS workspace and idle persistence; website demonstrates it illustratively. |
| Team input and owner plan/feedback decisions | invariant | retained | included | Comments remain input; explicit owner decisions advance the depicted task. |
| Source/mock checks with exact expectations | capability | retained | included | Owner assumes scoped P0 E2E work; selected checks disclose synthetic data and mocked database. |
| Qualified browser/device testing | capability | retained | phased | This example does not exercise those runtimes and cannot claim their success. |
| Candidate-bound fresh checks and separate reviews | invariant | retained | included | Revision A failure is retained; Revision B has fresh illustrative results and separate review labels. |
| Human GitHub merge authority | invariant | retained | included | The story ends with a draft PR and human review, without merge or deployment controls. |

Implemented one DOM conversation frame with compact prior milestones, a persistent ticket header, and six linked artifact nodes. In the wide pinned mode, artifacts sit beside the thread; in the linear narrow/short mode, the same nodes move inline. No-JS source already contains the complete transcript and inline artifacts. Native scrolling reveals the original date assumption and revised Plan v2; the revision has a keyboard-operable advance button. No wheel interception, typing loop, percentage or fictitious duration is introduced.

Browser RED→GREEN: the old walkthrough contained six Slack frames; the revised walkthrough contains one. Fresh checks also establish that the failed-result inspector hides future Run 2 until the correction chapter, the plan replay has observable v1/v2 states, comments appear in the thread, and the example PR exposes a diff/CSV/scoped results. Keyboard Revisit transfers focus to the selected chapter; panel reparenting preserves a visible focused control.

Independent source review reported no Critical findings, three Important interaction findings and one minor receipt-copy issue. Parent corrected future result disclosure, revision replay, and both focus cases, then reproduced their browser behavior. The timeless comment receipt was corrected editorially. No deferred finding remains. Reviewer did not qualify rendered layout, live product behavior, fictional code executability, registry publication or full assistive-technology compliance; rendered layout and selected interaction checks were handled in parent browser QA, and the other areas remain outside this task.

```yaml
executed_against: MSDLC-OBJ-001@0.4
alignment: pass
result_status: verified
evidence_added:
  - One-thread browser regression and fresh desktop/mobile screenshots
  - Native scroll planning revision and retained failure/fresh results
  - Concrete illustrative PR diff, CSV and separate review statuses
  - Keyboard/modal/reparented-focus checks, reduced motion and no-JS transcript
  - Independent source review and corrected interaction findings
  - Site, pinned source-claim, build, syntax and whitespace checks
decision_proposals: []
assumption_changes: []
scope_delta: none
contradictions: []
objective_change_attempted: false
objective_digest_match: true
```

`Verified` is limited to this local website frontend. Mainline was freshly rechecked by remote ref and remained `2deee3d70d3aa4c410e1bee030110c9d01858ef5`. Product runtime, publication and customer outcomes are not established by these website checks.

## Supporting-section feedback refinement

The owner's screenshot feedback is handled within the existing authorized local redesign: explain the motion/replay utilities, reduce their emphasis, replace the repetitive supporting grid with workspace continuity, and move the detailed historical benchmark behind its existing documentation link. No product scope or authority changes.

```yaml
objective_snapshot: MSDLC-OBJ-001@0.4
objective_digest: sha256:707543b940253c8e068da55af87b81b4c57dd8d0e82f83436be13f5391cdf0c2
task: Refine supporting sections and walkthrough utility hierarchy
decision_rights: implement
contributes_to: Clear and accurate standalone Rovara task-to-PR presentation
must_preserve: [selected palette, continuous Slack story, reduced-motion accessibility, historical artifacts, mock-scope disclosure, human merge]
non_goals: [product changes, live task execution, publication, push, PR, merge, deployment]
assumptions_relied_on: [existing owner authorization for website redesign, pinned mainline claims, owner-assumed scoped P0 work]
required_evidence: [responsive screenshots, motion and return-to-start interaction, historical-record link, unchanged artifact hashes, source claims, build]
stop_conditions: [material claim contradiction, inaccessible browser verification]
```

```yaml
executed_against: MSDLC-OBJ-001@0.4
alignment: pass
result_status: verified
evidence_added:
  - Desktop and 832px/390px/320px responsive supporting-section captures
  - Verified motion toggle, return to Request, one retained thread and historical-record navigation
  - Site/source consistency, benchmark hashes/counts, build, syntax and whitespace checks
  - Screenshot-backed design QA with corrected mobile and intermediate-width label layout
decision_proposals: []
assumption_changes: []
scope_delta: none
contradictions: []
objective_change_attempted: false
objective_digest_match: true
```

Verification applies to the local website frontend. All historical artifacts remain unchanged, and the source/mock story remains illustrative. The final browser viewport was restored to 832×867. No external write or publication occurred.

## Owner-requested whole-page polish

The owner asked for a complete-page review and authorized polishing the natural progression from the Slack walkthrough into workspace continuity and installation. The preflight was internally verified against the unchanged objective before implementation.

```yaml
objective_snapshot: MSDLC-OBJ-001@0.4
objective_digest: sha256:707543b940253c8e068da55af87b81b4c57dd8d0e82f83436be13f5391cdf0c2
task: Review the complete homepage and polish the workspace-to-install narrative
contributes_to: Accurate and understandable standalone Rovara task-to-PR presentation
decision_rights: implement
must_preserve: [owner-selected palette, six-chapter continuous thread, explicit start and owner decisions, source/mock qualification, candidate-bound fresh results, human GitHub merge, historical artifact identity, native installer identity]
non_goals: [product changes, live agent execution, installation, deployment, publishing, push, PR, merge]
assumptions_relied_on: [owner-assumed scoped P0 E2E work, pinned current mainline, illustrative export task]
required_evidence: [fresh full-page flow captures, comparison of closing sequence, responsive layout, link/keyboard/modal behavior, reduced-motion/no-JS paths, source claims and build]
stop_conditions: [unresolved material claim contradiction, inaccessible browser verification]
```

Changed the closing feature row into three ordered setup steps, shifted historical proof below the primary install action, made the last heading complete the ticket/Slack story, and exposed prerequisites/costs and a setup-guide link. Workspace continuity now begins with returning to the same task. The installer destination's display wordmark matches Rovara; canonical package/configuration/evidence identities were preserved. This is Tier 1 presentation work within the approved redesign.

```yaml
executed_against: MSDLC-OBJ-001@0.4
alignment: pass
result_status: verified
evidence_added:
  - Fresh hero, six Slack chapters, workspace/setup/install and phone/tablet captures
  - Native-pixel full/focused closing comparisons and installation-brand comparison
  - Verified guide/installer/MCP/evidence destinations, keyboard navigation and PR modal focus return
  - Manual/system reduced motion, one retained conversation and no-JS reading path
  - Site/source claims, unchanged historical artifacts, build, syntax and whitespace checks
  - Complete numbered screenshot-backed review and updated design QA
decision_proposals: []
assumption_changes: []
scope_delta: none
contradictions: []
objective_change_attempted: false
objective_digest_match: true
```

Verified refers to this local website frontend and its selected links/interactions. The mainline ref was freshly rechecked and remains 2deee3d70d3aa4c410e1bee030110c9d01858ef5. Product runtime, AWS installation, publication and customer outcomes remain outside this task.

## Owner-authorized website publication

On 14 October 2026 the owner explicitly requested: “push the code and deploy the website.” This supersedes the earlier local-only stopping condition for this website. The target is the existing public `rovara-dev/rovara-dev.github.io` repository and its configured GitHub Pages site; no product/AWS runtime deployment is authorized by this website request.

```yaml
objective_snapshot: MSDLC-OBJ-001@0.4
objective_digest: sha256:707543b940253c8e068da55af87b81b4c57dd8d0e82f83436be13f5391cdf0c2
task: Push the reviewed website and publish through its existing GitHub Pages workflow
contributes_to: Accurate public standalone Rovara task-to-PR presentation
decision_rights: implement
must_preserve: [approved visual/story direction, qualified mock and historical evidence, human product merge authority, source and release identities, existing Pages permissions]
non_goals: [product release, AWS infrastructure changes, new credentials, runtime acceptance, customer validation]
assumptions_relied_on: [existing Pages workflow and main branch, owner publication authorization, pinned product claims]
required_evidence: [fresh checks/build/source claims, independent source review, remote commit and CI, successful Pages deployment, live content and browser inspection]
stop_conditions: [unresolved important review finding, target mismatch, failed required checks, branch-protection rejection, deployment failure]
```

Local browser screenshots and detailed audit captures remain preserved locally and are excluded from Git. Current README/design/product/asset notes distinguish the selected 14 October story from historical directions and release snapshots.
