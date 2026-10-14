# Rovara guided task story — design QA

final result: passed

## Latest revision — 14 October 2026

User-approved scope: preserve the indigo/lavender/yellow visual direction and accurate claims, follow ENG-142 through one conversation, and give the viewer one focal point at a time. Implementation QA covers `codex/rovara-guided-task-story`, based on `1b1a49295de8633c16a7e5d67b62c2eed983a5cc`. The owner subsequently authorized push and deployment on 14 October 2026; publication evidence is recorded separately from these local implementation checks.

### Visual comparison and story

The previous live Plan scene (`design-evidence/live-audit-2026-10-14-motion/04-plan-v2-natural-scroll.jpg`) and final implementation (`design-evidence/guided-story-2026-10-14/18-plan-final.jpg`) were presented together and inspected at 1440×900 CSS/image pixels, 1× density. The old workspace transition (`10-workspace-transition.jpg` in the same audit folder) and final same-task workspace scene (`20-return-final.jpg`) were also inspected together at 1440×900. The changed structure is intentional: one dominant Slack frame replaces simultaneous narrative, conversation and artifact columns. Typography, palette, portraits and licensed icons remain recognizable.

- Typography: self-hosted Inter retained. Desktop scene headings are 28–34px; thread body 14–15px; artifact headings 22–25px. Short laptops use tighter spacing while preserving readable body text. Small qualifications were darkened after independent review.
- Spacing: the frame, ticket and chapter caption remain stable during the guided sequence. Sam's clarification, the revised plan and Maya's approval occupy separate reading intervals. No current beat clips at the tested enhanced sizes. Installation aligns with the frame and continues the guide.
- Color: existing indigo, lavender-white and yellow are retained. One yellow guide point moves at the handoff; the current artifact or message has one quiet focus treatment. No autonomous looping or timed scene advancement. Failure/pass labels include words, and mock scope stays explicit.
- Assets: existing Maya/Sam fictional portraits and licensed icons reused. No new generated imagery or screenshot substitute illustrations. Tables, code and receipts are semantic illustrative UI.
- Copy: one task, repository, branch and file set persist from request through return. Failure A remains inspectable after correction B. The draft PR shows a concrete illustrative diff, three mock-scoped checks and separate code/security receipts. Humans retain plan approval and GitHub merge decisions. The historical Django benchmark remains separately qualified below setup.

### Browser verification

Native browser testing used the local preview at `http://127.0.0.1:63914/`.

- All ten beats fit with exactly one focal element at 832×867. All ten also fit at 1366×768 after adding a compact spacing profile and a fractional-height breathing-room check. The browser's normal 1280×720 window was verified after clearing the viewport override; all ten beats fit there too. Receipt files: `medium-scene-receipts.json`, `short-laptop-receipts.json` and `normal-window-receipts.json` in the guided-story evidence folder. `normal-step-2.jpg`, `normal-step-8.jpg` and `normal-step-9.jpg` record the normal-window presentation.
- 1440×900 final Plan, PR, return and installation handoff were inspected. Final captures: `18-plan-final.jpg`, `19-pr-final.jpg`, `20-return-final.jpg`, `21-install-handoff-final.jpg`. The guide holds at each reading moment before moving near the next boundary; final return has its own reading hold before the layout releases into setup.
- At 390×844, all ten messages/artifacts become one ordered transcript with the same task ticket. Plan, retained workspace and setup were inspected. At 320×844, page width equals viewport width; no page-level horizontal overflow. Compact code blocks can scroll within their own area.
- Proposed-plan and approved-plan inspectors report the correct state. Failed-result inspector hides the future passing run; retest inspector exposes both runs. Keyboard Enter opens the plan inspector; Escape closes it and restores visible focus. Scrolling away from an inspected beat parks focus on the visible chapter link before making earlier content inert.
- Native manual reduced-motion control and system reduced-motion emulation preserved phase 7. The system preference disables the override. The first Playwright click attempt auto-scrolled the sticky region, so it was not accepted as content-state evidence; native input was used for the actual check. Emulation was cleared afterward.
- Full-thread mode exposes all ten beats and preserves the current reading context; returning to guided mode works. No-JavaScript mode exposes all ten beats without inert/hidden future content, hides nonfunctional inspectors and retains chapter anchors. Script execution was restored afterward.
- Setup CTA reaches the installation route. AWS setup dominates; the CLI disclosure expands/collapses its published `npx` instructions. AWS launch was not executed. Final installation capture: `22-install-route-final.jpg`.
- Direct same-page chapter hash navigation was checked in both directions: copied request and PR anchors select phases 0 and 8 with the matching headings. The runtime synchronizes the phase on hash changes, using the actual sticky inset for positioning.
- Browser warning/error logs are empty. These are selected desktop browser checks, not a complete WCAG, assistive-technology or physical-device certification.

### Findings and fixes

1. [P2] Initial fallback transition could leave the active plan above the viewport. Mode changes now preserve the reading position when the story is in view; resizing outside it does not jump into it.
2. [P2] The last workspace beat could release before its caption was readable. Its marker now includes a final reading hold and the sticky layout's own height.
3. [P2] Short laptops lacked enough reading room, and rounded height measurements could clip the PR note by a fraction of a pixel. Added a short-screen spacing profile, ceiling of actual element height, and an 8px fit buffer. All ten compact beats passed the fresh visibility check.
4. [P2] Independent review found qualification text at 3.99:1 and footer disclosure at 4.33:1. Updated muted text to `#71647d`. Reviewer independently verified 5.25:1 for source/mock qualifications and 5.50:1 for the white footer; other corrected metadata exceeds 4.5:1. Final Plan/PR/workspace captures reflect the correction.
5. [P2] Resetting the temporary viewport revealed a shorter 1280×720 normal preview window. Added a further short-height spacing profile, preserving 14px body text, and derive the reading budget from actual caption spacing and sticky inset. All ten beats remain enhanced and fully visible. The browser's normal viewport is restored for handoff.

Independent code review and correction re-review reported no remaining Critical or Important issue and readiness for local preview handoff. No unresolved actionable P0/P1/P2 finding in this revision's scope.

### Automated verification and claim boundary

Fresh `npm run check` passes five resolver/reading-hold tests, generated documentation checks and the 22-route static checker. It reconciles source pins, release status and recorded benchmark hashes/counts. `npm run check:claims` passes all 16 claims against pinned mainline `2deee3d70d3aa4c410e1bee030110c9d01858ef5`. Fresh static build, both module syntax checks and `git diff --check` pass. The normal CI check now includes the resolver tests.

During implementation QA, no new product runtime, AWS installation, live Slack-to-PR task, customer result or production publication was performed. The owner-assumed E2E work is represented by qualified source/mock checks; browser interaction remains explicitly unexercised in the illustrative task.

Postflight: executed against `MSDLC-OBJ-001@0.4`; objective digest `707543b940253c8e068da55af87b81b4c57dd8d0e82f83436be13f5391cdf0c2` rechecked and matched; alignment pass; result verified as local frontend preview; evidence added in the guided-story folder; no objective proposal, assumption change, product-boundary change or production-authority change; scope delta none; contradictions none; objective change attempted false.

## Prior implementation records (superseded by the revision above)

The following records describe earlier local and published revisions. Their controls, beat counts and layouts are historical, not descriptions of the current implementation.

# Rovara continuous Slack story — design QA

final result: passed

## Visual truth and scope

Retain the owner-selected indigo/yellow/lavender direction from `/Users/abhishekgarg/.codex/generated_images/01a139f7-6d9f-7292-9c9c-079ff66848d8/exec-e7c1f05c-8633-4ed8-85f3-1aeb7e885b09.png`. Implement the owner's explicitly approved narrative changes from `design-evidence/story-audit-2026-10-14/audit.json` and the continuous-conversation revision in `docs/superpowers/plans/2026-10-14-slack-scroll-story.md`.

Comparison source: `design-evidence/story-audit-2026-10-14/02-plan.png`.
Implementation: `design-evidence/continuous-story-2026-10-14/02-plan-final.png`.
Both Plan scenes are 1440×1000 CSS/image pixels, matching 1× density. Full comparison `comparison-plan-full.png` is 2880×1040, preserving each source capture at native density. Focused `comparison-plan-focused.png` compares the message content at native pixel scale. Both were opened and inspected. The new thread/artifact proportions, removed sidebar/composer and compact history are intentional owner-approved changes, not 1:1 recreation claims.

## Required visual surfaces

- Fonts/typography: original self-hosted Inter retained. Narrative headings, 14px thread body, 24px artifact headings, 12px action text and 11px qualifications remain legible in desktop captures. Mobile body is 14px, actions have 44px height, and qualification text is 12px. No clipped main labels or page-level horizontal overflow observed at 320px/390px.
- Spacing/layout rhythm: one stable Slack header/ticket and accumulated milestone history; linked panels use an intentional second column on spacious viewports. Narrow/short layouts keep one transcript and move the same six artifacts inline. A sticky mobile ticket preserves task context. Tall content retains the linear fallback until a viewport change.
- Colors/tokens: indigo #20265f, pale yellow #f3ea83 and lavender-white #f4f3fb retained. Failed/passed-with-mocks states have text labels as well as red/green accents. Code/diff surfaces use the same dark palette.
- Image quality: existing fictional Maya/Sam raster portraits and licensed library/brand icons reused. No new stock imagery, custom SVG, CSS illustration or fake screenshot assets introduced. Tables, diff and CSV are semantic illustrative UI.
- Copy/content: a practical export request, UTC assumption, teammate company-timezone clarification, owner revision/approval, remote work, failed synthetic row, explicit send-back, fresh Revision B checks, separate read-only review labels and a draft PR packet. Mainline product claims and owner-assumed P0 check scope remain distinct from fictional task results. Browser coverage is explicitly unexercised; no production/customer/real-run claim.

## Interaction and state evidence

- Continuity check failed before implementation (six frames) and passes now (one frame).
- Native scroll enters Plan v1 then reveals Plan v2 after the clarification; forward scroll reaches cloud work. Chapter and replay controls work. Existing decisions remain compactly visible.
- Request changes opens a distinct before/after revision interaction. Replay exposes v1; scrolling or See revised Plan v2 exposes v2 and puts focus on approval.
- Plan comments become visible safe-text input in the same thread. Receipt is independent of approval status; no message is sent.
- Failed-result inspector contains Run 1 and the unexpected a3 assertion, without future Run 2. After correction, both runs appear, with Passed with mocks and source/handler scope.
- PR inspector contains an illustrative diff, synthetic CSV, retained failure, fresh results, both separate review statuses and remaining coverage. Narrow dialog fits the viewport; code scroll is confined to its code block.
- Escape closes dialogs and restores focus. Keyboard Revisit transfers focus to the chosen visible chapter link. A focused linked result control remains focused and within the mobile viewport after DOM reparenting.
- Manual reduced-motion control works. OS reduced motion applies root/page classes and disables overriding it. Emulation was cleared afterward.
- No-JS test shows one frame, all six beats and six inline artifacts. Script execution restored afterward.
- Browser warning/error logs checked; none observed. This is not a full WCAG or physical-device qualification.

## Comparison/fix history

1. Previous implementation: six replaced snapshots, repetitive plan, thin build, coverage-only result inspector, erased failure, prose-only PR. Replaced with one continuing thread and concrete linked artifacts. Evidence: fresh request/plan/build/test/retest/PR frames in `design-evidence/continuous-story-2026-10-14/`.
2. [P1] Failed inspector exposed a later passing run. Guarded the later run by story stage. Browser confirmed absence before send-back and presence in the correction history. Evidence: `04-failed-result.png`, `05-retest.png`.
3. [P1] Revision replay lacked a visible change and had a mismatched selector. Added original/revised plan states and corrected selector; verified visible v1/v2 headings, date-rule change and focus. Evidence: `02-revision-before.png`, `02-plan-final.png`.
4. [P1] Focus could disappear during panel reparenting or hidden history navigation. Preserve/reveal the focused panel control and transfer hidden memory-link focus to chapter navigation. Browser verified a visible focus rectangle after mobile resize and focused 01 Request after keyboard Revisit.
5. [P2] Tall-content fallback could repeatedly reconsider pinned mode; retained overflow fallback until viewport change. Narrow transcript remains readable, and larger viewport restores the linked-panel mode.
6. [P2] Mobile ticket left a small strip of previous content above it; sticky top changed to zero. Diff spans created excess vertical whitespace; changed to inline spans inside preformatted code. Updated browser capture shows compact inspectable diff.

## Final checks and limits

Site/documentation consistency, source claims at mainline 2deee3d70d3aa4c410e1bee030110c9d01858ef5, static build, JS syntax and whitespace pass. Historical benchmark artifacts remain byte-identical. Independent source review was performed; parent corrected and browser-verified its interaction findings. No remaining actionable P0/P1/P2 or deferred P3 finding.

Local frontend only. No live Slack/agent E2E task, browser/device product runtime, deployment, push, PR, merge or customer validation performed.

## Supporting-section refinement, 14 October

final result: passed

Owner feedback: the boxed Reduce motion/Replay controls were unclear, and the feature grid and large Django evidence module felt disconnected from the page. This is a presentation refinement within the approved website redesign.

Comparison: opened the owner's 2828×1434 workspace screenshot and inspected it against `design-evidence/supporting-sections-2026-10-14/desktop-continuation.png` (1440×1000) and `normal-viewport.png` (832×867). These intentionally change hierarchy and content density; no pixel-identical recreation is claimed. The owner's third screenshot identifies the removed large benchmark module; its complete historical record remains on the existing benchmark documentation route.

- Typography: self-hosted Inter retained. Supporting heading 30–38px, body 15px, recorded-result title 20–21px. Quiet utility controls are 12px with 44px mobile touch height.
- Layout: four repeated feature blocks replaced with one continuity panel. Three facts sit beside the copy on spacious screens, below it at intermediate widths, and in labelled rows on mobile. A compact recorded-proof strip leads into the existing connection/install sections.
- Colors: existing indigo/lavender palette and yellow primary actions preserved. Supporting controls have no outlined button treatment.
- Assets: existing licensed file/clock/Slack/arrow icons reused; no new imagery or illustration. No evidence artifact bytes changed.
- Copy: idle compute stops while workspace files and conversation persist. Historical Django evidence remains clearly separate from the illustrative Slack task. The teaser reports the saved 22-test count and links to raw artifacts and qualification notes.

Browser verification: motion toggle sets the reduced-motion class and pressed state; Enable motion reverses it. Back to start selects Request and its hash; one conversation frame remains. The proof link opens the recorded Django section with patch, test output, grader report and metadata links. Captures at 1440×1000, 832×867, 390×844 and 320×844 show no page-level horizontal overflow. The first mobile layout crowded the Conversation label; stacked fact rows corrected it. Intermediate-width layout was also changed to one column and its labels fit. Browser warn/error log is empty. The initial supporting-section fragment is resolved after the story layout/font setup so the linked section is visible.

Site consistency, pinned product claims, artifact hashes/counts, static build, JS syntax and whitespace checks pass. The checker now verifies the linked benchmark record instead of a removed homepage diff excerpt; byte/hash and grader reconciliation remain intact. Product runtime and publication remain unverified. Evidence is in `design-evidence/supporting-sections-2026-10-14/`.

## Complete-page narrative polish, 14 October

final result: passed

Source visual truth: the current owner-selected indigo/yellow/lavender page, captured before this pass in `design-evidence/whole-page-polish-2026-10-14/01-hero-before.png` through `09-install-before.png`. Implemented comparison: `08-workspace-after.png` and `09-install-after.png`. Closing-region captures use 1440×1000 CSS/image pixels at matching 1× density. `comparison-ending-full.png` combines the unmodified captures at native pixels (2880×1038 including labels); `comparison-cta-focused.png` combines two 1008×126 native-pixel text crops (2016×164 including labels). Both comparisons were opened and inspected. They compare an intentionally reordered closing sequence, not identical scroll coordinates or a pixel-faithful recreation claim. `comparison-install-brand.png` was also inspected against the actual 1440×1000 install-entry captures.

Earlier actionable findings and post-fix evidence:

1. [P2] The historical benchmark interrupted workspace continuity before the installation path. Moved its qualified teaser below the install action. The historical record and artifact hashes remain intact; keyboard Enter reaches the recorded Django section.
2. [P2] The parallel Slack/coding-tool/AWS list restarted a feature catalogue rather than helping the visitor act. Replaced it with three ordered setup steps. MCP entry remains a secondary guide link. Desktop columns and phone rows are visible in `09-install-after.png`, `15-mobile-setup.png` and `17-mobile-320-setup.png`.
3. [P2] The closing headline repeated hosting instead of completing the opening ticket/Slack promise. Changed it to “Bring your next ticket to Slack,” added a secondary setup-guide link, and made required accounts/model access and usage costs visible. The focused CTA comparison and `16-mobile-install.png` show the resulting hierarchy.
4. [P3] The installation destination's display wordmark differed from the homepage. Aligned its header and footer with Rovara; package/source identities remain unchanged. Browser observed the updated wordmark and installation options in `10-install-destination-after.png`.

Five fidelity surfaces:

- Fonts/typography: self-hosted Inter retained. Workspace heading 30–38px, setup heading 28–36px, step titles 20–22px, install heading 32–44px and body 14–15px. Long step labels wrap without clipping at 320px; no page-level horizontal overflow observed across 1440/832/390/320.
- Spacing/layout: workspace → setup steps → install → optional historical proof is one continuous sequence. Desktop step columns become ordered phone rows. The install action and guide align horizontally on tablet and stack on phones. Section gaps and card radii retain the established page rhythm.
- Colors/tokens: indigo #20265f, lavender-white #f4f3fb and pale yellow #f3ea83 preserved. Failure/mock-pass semantic labels and accents in the story are unchanged. Cost/prerequisite copy remains legible on the dark install panel.
- Image quality: only existing licensed cloud/GitHub/Slack/arrow icons used. Existing portraits and story assets remain unchanged. Comparison canvases are evidence layouts containing unmodified screenshot pixels, not product art.
- Copy/content: hero and six-chapter task are retained. Workspace copy starts from continuing the task; setup describes an explicit request and start. No automatic Linear intake, complete browser testing, merged/deployed result, customer proof, free hosting or guaranteed outcome was added. The export remains illustrative; the Django record remains historical.

Fresh browser review captured the hero, every Slack chapter, workspace, setup and install closing region. Plan revision, PR inspector/Escape/focus return, all internal CTA/guide destinations, keyboard evidence navigation, manual/system reduced motion and the no-JS six-beat/six-artifact reading path were checked. One conversation frame remains. Native smooth scrolling was allowed to settle before accepting captures; wrong-state early captures were rejected. Browser warn/error logs are empty. Final media/script emulation was cleared and the browser viewport restored.

Site/route consistency, all 16 source claims pinned at freshly rechecked remote mainline 2deee3d70d3aa4c410e1bee030110c9d01858ef5, benchmark hashes/counts, static build, JS syntax and whitespace pass. No remaining actionable P0/P1/P2 or deferred P3 finding within this page-polish scope. Complete numbered review with fresh screenshots: `design-evidence/whole-page-polish-2026-10-14/review.md`.

Limits: local frontend and selected access paths only; no AWS launch/install, live Slack/agent task, browser/device product E2E, publication, customer conversion validation or full assistive-technology audit.

## Publication review correction

Independent whole-branch release review of candidate 27432ff found no Critical issue, one Important/P2 focus edge and one Minor/P3 accessible-label mismatch. Parent reproduced the focus loss: native reverse scrolling from Plan v2 to v1 after View plan/Escape blurred the focused control to the page body.

`setPlanReplay` now parks focus on the visible Plan navigation link before changing display, then moves it to the visible counterpart: See revised Plan v2 for v1, Approve example plan for v2. It covers both thread actions and the artifact inspector. The artifact aria-label changes with the heading. Linear layouts show the full revision with the v2 artifact; a focused v1 reveal action transfers to a visible approval action on mobile reflow.

Fresh browser checks confirmed both native scroll directions with motion enabled; View plan focus returned to a visible See revised Plan v2 on reverse and Approve example plan on forward. Artifact-inspector reverse scrolling was also checked with reduced motion, and 390×844 reflow preserved visible approval focus at y773.85–817.85. Linear revision replay retained the v2 heading/label and full transcript. Evidence: local `design-evidence/publication-2026-10-14/plan-focus-v1.png` and `plan-focus-mobile.png`. These captures are excluded from Git. Follow-up independent source review is required before merge; deployment is still pending.
