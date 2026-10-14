# Rovara Code agent guide

Public source: https://github.com/PrepLabsAI/Rovara. Install with Launch in AWS or npx @preplabsai/rovara-code init --env <name>; see docs/install. Node 22.19 or newer is required for the CLI (Node 22 LTS recommended). The package supplies rovara and agentx aliases. Published v0.3.4 includes the native workflow. These docs follow product mainline 2deee3d70d3aa4c410e1bee030110c9d01858ef5, which includes later changes; deployment configuration and feature flags still apply. Source presence is separate from runtime acceptance. Workflow source record: 2deee3d70d3aa4c410e1bee030110c9d01858ef5. Mainline contains opt-in serial task dependencies; the flag is off by default and runtime activation/qualification remains separate. See docs/release for qualification.

# Rovara Code documentation

Give a task, agree on the plan, inspect the evidence, and keep the final decision with your team.

## A coding agent with a workflow you control

Rovara Code is a coding workflow that runs in your AWS account. Ask in Slack or from your coding tool. Rovara Code suggests a Quick or Full path, writes a plan for you to approve, codes it, runs named checks and separate code and security AI reviews, and opens a draft PR. It also proposes fixes for PR feedback. Your team owns the final merge. Request Approve plan Code, checks + reviews Draft PR + feedback Your merge

## Start with one useful task

Your first Quick task One plan approval. A concrete change. Evidence and a draft PR. Follow the tutorial → Use your coding tool Delegate from Claude Code, Codex or Cursor through MCP. Connect your tool → New to Rovara? Deploy in your AWS account, connect GitHub and Slack, then give it a task. Install Rovara →

## Follow the complete journey

Plan a larger feature Requirements, design and coding-plan approvals in Full. Decide on the task page Answer the plan’s decisions, comment and ask AgentX. Inspect changes, checks and reviews Read actual output and identify gaps or stale evidence. Respond to PR feedback Review proposals and approve the fixes you want. Run Rovara loop on GitHub issues The same workflow, run on your computer by your own Claude Code or Codex. Follow linked PRs Understand what the task is waiting for.

## Understand your environment

System architecture Where work, decisions and evidence live. Projects and checks Repository setup, required checks and optional check choices. Sign in with ChatGPT Run each developer’s tasks on their own ChatGPT plan. Workspaces and costs Continue, cancel, close and retain the record. Troubleshooting Find the next useful action without duplicating work.

## Inspect recorded evidence

The historical benchmark report includes the saved Django patch and grader output, plus all 50 outcomes in a selected Pro batch. These records are separate from the illustrative new workflow. Read the benchmark evidence →

# Install Rovara

Deploy in your AWS account with Launch in AWS, or start the guided installer from a terminal.

## Choose your installation path

Launch in AWS is the recommended path in the Rovara README . It opens a setup page and needs nothing installed on your computer. The terminal path uses the published npm CLI. Both paths set up GitHub, Slack and your first project. AWS and model usage are billed to you. Region: us-east-1 The current installation guide supports US East (N. Virginia). The buttons and explicit-region examples here use that region.

## Before you start

An AWS account, ideally dedicated to Rovara, and permission to create IAM roles for installation. A GitHub organization or personal account to own the GitHub App. A Slack workspace where you can create and install apps. Your workspace may require admin approval. Model access: Amazon Bedrock, or an OpenRouter, Anthropic or OpenAI API key. An email address for setup and alerts. Terminal path only: Node.js 22.19 or newer; Node 22 LTS is recommended, with an authenticated AWS admin profile. The installer checks regional capacity, including EC2 vCPUs and two free Elastic IPs. Full prerequisite and quota details →

## 1. Launch in AWS

Launch in AWS ↗ On the AWS Create stack page, enter your email, GitHub owner and install name. Review the IAM acknowledgement and create the installer stack. Look for the temporary-password email (the README estimates about five minutes). The installer stack’s SetupPageUrl output has the same setup-page address. Sign in, choose a new password and follow the build progress. The installation guide estimates about 20 minutes for the AWS build. Connect the GitHub App and Slack app on the page, then choose your first repository and Slack channel. Confirm alerts and mention the bot. The setup ends at its first Slack reply. After Rovara answers in Slack, you can delete only the agentx-installer stack to remove the installer; Rovara’s environment keeps running. Removing the environment itself is a separate action. Detailed AWS setup instructions →

## 2. Install from a terminal

Check node --version , then use an AWS admin profile authenticated for the target account. Replace both placeholders: export AWS_PROFILE=<an admin profile for the target account> npx @preplabsai/rovara-code init --env <name> This is the command from the README. For an explicit region: npx @preplabsai/rovara-code --env <name> init --region us-east-1 Use a lower-case install name with letters, digits and hyphens, such as prod or staging . Keep the terminal open and your computer awake until setup finishes. On your own computer, the installer opens a browser page served only from 127.0.0.1 . It shows your choices, the resource plan and estimated cost before creating the environment, then guides GitHub, Slack and project setup. To stay in the terminal: npx @preplabsai/rovara-code --env <name> init --region us-east-1 --no-ui CloudShell and SSH normally use the terminal. CloudShell needs Node 22 first; use the checksum-verified setup instructions in Node 22 in AWS CloudShell . Other installation paths →

## 3. Give it a first task

In the project channel, select the installed bot through Slack’s mention picker. Its default name still uses AgentX . @AgentX Add CSV export to the orders page. Export only selected dates and our company’s orders; viewers must be blocked. A plain mention is routed first: a question is answered, while a change gets a card suggesting Quick or Full . The requester presses Start , then reviews the proposed plan before code changes. Use chat: to ask the chat agent directly. Inspect the changes and check evidence before merging. Your team decides what gets merged. Follow the Quick tutorial → Upgrading an existing install? To save thread replies that do not mention AgentX, the Slack app needs the channels:history and groups:history scopes and the message.channels and message.groups events. Update the app from the manifest agentx init generates, then reinstall it to the workspace. Prefer an IDE? Connect Claude Code, Codex or Cursor →

## Resume or diagnose setup

If setup stops, run the same init command again. The installer resumes at the first unfinished step. If Slack needs an admin to approve the app, wait for approval and rerun it. After installation, use operator access to check the environment: npx @preplabsai/rovara-code --env <name> doctor --region us-east-1 Read the failures and next actions before changing anything. Browser, SSH and recovery details →

## Upgrade or remove an environment

Use the target release’s CLI version for an upgrade; review the changes before accepting: npx @preplabsai/rovara-code@<version> --env <name> upgrade --region us-east-1 Operations, projects, connectors and upgrades → Removal deletes the environment’s workspaces, stacks and stored data. It needs admin credentials and explicit environment confirmation. Save anything you need first and read the full teardown guide : npx @preplabsai/rovara-code --env <name> destroy --region us-east-1

## Rovara name, compatible commands

The product repository is PrepLabsAI/Rovara . The published package is @preplabsai/rovara-code . You can install the CLI once: npm install -g @preplabsai/rovara-code rovara --help The package also provides agentx as a compatibility command. AWS resources, ~/.agentx , MCP server/tool IDs and the default Slack app retain their existing names. Use the examples as written. Installation commands checked against the README and linked guides on 13 October 2026. Release, licence and documentation status →

# Core concepts

The ideas that explain where work happens, who decides, and what comes back.

## Project

A registered definition of repositories, setup, checks, model/tool guidance and access policy. Use the exact project name returned by your environment.

## Task and workflow

The unit connecting a request, plan versions, operations, decisions, evidence and PR links. A workflow task follows Quick (one coding plan) or Full (requirements, design, then a coding plan). Direct tasks ( chat: in Slack, agentx_start_task in a coding tool) are a separate path without plan approvals.

## Plan and owner decision

A saved document describes approved scope and approach. Its version and digest identify what the owner decided. A revised document requires a current decision. Only the task owner decides; teammates in the channel can reply, comment and suggest.

## Task page

The authenticated web page for one task, linked from every approval card. The owner answers the plan’s decisions and approves or requests changes there; teammates comment and suggest. Task page guide →

## Workspace

The remote project files and task context in your AWS account. Follow-ups can reuse it; workspace closure and task-record retention are different.

## Candidate

The identified code version being checked or reviewed. Results for one candidate do not qualify a changed candidate.

## Checks and AI review

Named command results are evidence of those checks in their recorded environment. Separate code and security AI reviews start once the checks pass; only problems the change introduced block. Review reports are attributed findings, not a guarantee of correctness.

## Pull request and feedback

GitHub hosts the proposed change, repository CI, comments and merge decision. Rovara Code opens a draft PR of exactly the checked and reviewed code, follows it through signed GitHub events, and proposes feedback fixes for owner approval.

# Your first Quick task

Approve one plan, let Rovara Code code, check and review the change, then review its draft PR.

## Before you start

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → You need access to a registered project and its Slack channel, or a coding-tool connection . Starting tasks from Slack needs shared tasks turned on for the Slack service; if AgentX asks an admin to turn them on, see Starting tasks from Slack . Use Slack’s mention picker to select the app installed in your channel. Its default name still uses AgentX . Quick is the simplest planning path Use it for a well-defined fix. For ambiguous or larger work, choose Full .

## 1. Request a bounded change

In the project-bound channel, start the request with quick: to go straight to Quick: @AgentX quick: Make the docs Copy button reset its label after copying. Announce success accessibly, preserve manual copy if the clipboard fails, and add checks for success, reset and failure. Without a prefix, AgentX sorts the request first. A question is answered in the thread. A small change gets a card, “Looks like a small change. I’ll use Quick.”, with Start , Use Full instead and Just answer . An unclear request offers all three. You can also reply quick , full or answer in the thread. Only the person who asked can choose, and the card waits for a day. Nothing that changes code starts without that click. Other prefixes: full: starts Full, workflow: asks Quick or Full with no suggestion, and chat: goes to the chat agent.

## 2. Read the plan

AgentX inspects the request with read-only tools and posts an approval card: what is waiting, up to three summary lines and a link to the plan (a Slack Canvas, or the task page when the workspace cannot create Canvases). Open review opens the task page . Does it describe the change you actually want? Are the acceptance checks useful? Are assumptions or dependencies missing? Reply in the thread with anything the plan should know. Every reply, yours or a teammate’s, is saved for the task’s next step. Replies never move the task; only the owner’s buttons do.

## 3. Approve the current version

Press Approve on the card or the task page. The project’s readiness checks always run; you can add any optional checks the project offers. Your choices are saved with the decision. To change the plan, press Request changes on the task page with at least one comment or a note. AgentX writes the next version and answers each comment “Done:” or “Not changed because:”. A decision applies to the version it names; an old card cannot approve a newer plan.

## 4. Let the checks and reviews run

After approval, AgentX codes the plan in the project’s remote workspace and runs the required and chosen checks on that exact code. When they pass, it starts the separate code and security reviews by itself. Only problems the change introduced block. An older problem outside the changed lines is noted but does not block. If a check or review blocks, the thread lists the problems with Send back to coding , Retry reviews and Close task . Send back gives the problems to coding, and the checks and reviews run again on the new code. From a coding tool, the owner can also accept a blocking finding with a reason, which the draft PR then lists. How to read the reviews →

## 5. Review the draft PR

When the checks and both reviews pass, AgentX opens a draft PR of exactly the checked code and posts the link in the thread. Its description says what the approved plan set out to do and which checks and reviews passed, and links the task page. If the PR did not open, the thread offers Retry opening the pull request . Review repository CI and the diff in GitHub. You decide what gets merged.

## 6. Handle reviewer feedback

When reviewers comment on the PR, AgentX reviews the comments and posts “PR feedback is ready” in the thread, with its recommendations and the highest priority. Approve the fixes you want, answer its questions, or dismiss. Approved fixes go through checks and reviews again and are pushed to the same PR. Follow the feedback tutorial →

## 7. Finish and preserve the work

The task finishes when GitHub reports its PRs merged. It gives back its workspace, frees its place in your open-task limit, and shows as closed. Canvas copies are cleaned up after the task’s documents and decisions are saved. To stop a running task from its Slack thread, the owner sends @AgentX stop . A plain stop without the mention is saved as a reply. Workspace and closeout guide →

# Plan a larger feature

Use Full to agree on requirements, design and the coding plan before implementation.

## Before you start

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → You need access to a registered project and its Slack channel, or a coding-tool connection. Choose Full when behavior, interfaces or implementation choices need discussion. Full changes planning depth; it does not relax project-required checks or reviews.

## 1. Choose Full at task start

Start the request with full: in the bound channel: @AgentX full: Add password reset to the account page. Keep existing sign-in behavior. Without a prefix, a larger change gets a card suggesting Full, with Start , Use Quick instead and Just answer . From a coding tool, ask it to call agentx_start_workflow with workflow_path: "full" for your project.

## 2. Agree on requirements

Inspect intended behavior, constraints, non-goals and acceptance scenarios. On the task page, each of the document’s decisions shows AgentX’s recommendation already picked; choose another option where you disagree, and comment on any claim. Approve the current document when it represents the work you want. For password reset, discuss expiry, error messages and existing authentication behavior here, not after implementation.

## 3. Review the design

The design is written from the approved requirements. Inspect the proposed interfaces, component boundaries, dependencies and failure behavior. Ask for alternatives or corrections before approving this version.

## 4. Approve the coding plan

The coding plan is written from the approved design. Review the implementation steps and check choices. Required project checks stay on; add the project’s optional checks you want. Approve this version to start coding.

## 5. Review the work

Coding, checks and reviews run as in Quick, and AgentX opens a draft PR when they pass. PR feedback follows the same owner-controlled proposal and fix loop. What happens after approval →

## When a document changes

Request changes needs at least one comment or a note. AgentX writes the next version and answers each comment you sent under it. Comments you send with an Approve are answered by the next document, for example “Done in the coding plan: …”. Each comment stays on the same claim, decision or check if it is still there, marked “from v1”; otherwise it moves under “Removed claims”. An approval applies only to the version it names. Task page guide →

# Decide on the task page

Answer the plan’s decisions, comment with your team, and approve or request changes from one page.

## Open the task page

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → Every approval card links the task page ( Open review ). Sign in if asked. The page’s first line says what you can do: You’re the task owner. Answer the plan’s decisions, comment, and press Approve or Request changes . You can read and comment on this task. You are in the task’s channel and can use its project. Comment, reply and press Suggest this on a decision option. Only owners decide. You don’t have access to this task. Also what a link to a task that does not exist says.

## Answer the plan’s decisions

Each decision shows its options with AgentX’s recommendation already picked. Pick another option to change the answer. The bar at the bottom counts the decisions you have not looked at yet; press it to jump to the next one. You do not have to answer every decision: any you leave keep AgentX’s answer. Teammates’ suggestions show under each decision, for example “Priya and Sam suggest: Above”. The Approve and Request changes buttons name the document they act on, such as “Approve coding plan v1”.

## Comment and reply

Press Comment under a claim, a decision, a check or the whole document, and Reply under a comment. Comments are plain text and can be edited or deleted until they are sent with a decision. When a new version arrives, each comment stays on the same claim, decision or check if it is still there, marked “from v1”; otherwise it moves under “Removed claims”. While open, the page checks for new comments and versions every 20 seconds and offers Show it .

## Approve or request changes

Both buttons open a short summary before anything is sent: your answers that differ from AgentX’s, the decisions left to AgentX, and the open comments to send (all ticked; untick any to keep for later). You can add a note of up to 500 characters. Approve and start coding (or Approve and continue for requirements and design) moves the task on. Comments sent with it are answered by the next document. Request changes needs at least one comment or a note. AgentX writes the next version and answers each comment “Done:” or “Not changed because:”. Your answers and comments go to the next step as part of the plan. Comments are passed on as teammates’ quoted words, never as instructions that override your answers. Nothing is coded until the owner approves.

## Slack and the page stay in step

A decision on the page edits the Slack card the same way a button press does, for example “Approved by @Maya · 1 answer changed · 2 comments included”. Approve in Slack uses AgentX’s answers and includes the page’s open comments (up to 25, oldest first). Request changes in Slack sends no comments. Exactly one decision is recorded however many places it is pressed: the second place says “Already approved by …” and keeps what you typed. A teammate who comments triggers at most one Slack message every 10 minutes, without the comment text.

## Ask AgentX about a comment

Tick Ask AgentX to reply to this comment when you post. AgentX replies under it from what it knows about the task, marked “AgentX (AI) · answering” and the asker’s name. It cannot change code, choose answers or decide. This works only on tasks started in Slack. If no answer comes within 10 minutes, the comment says “AgentX couldn’t answer this one.” An answer to a comment edited or deleted in the meantime is not shown.

## Limits

Limit Value Comment length 2,000 characters Per person, per task, in 10 minutes 30 comments and 60 suggestion changes Per task 300 comments, replies and AgentX answers; 20 replies per comment Comments sent with one decision 25; the rest stay open for the next version AgentX answers 6 per person and 20 per task an hour; 30 per person across tasks an hour; 5 per comment thread Decision note 500 characters

## Phones and no JavaScript

The page is built for Slack’s in-app browser: nothing scrolls sideways, buttons are large enough to tap and the summary opens full screen. Without JavaScript the page still shows the plan, every comment and AgentX’s answers; the buttons that need JavaScript stay hidden. Unsent answers and comment text survive a refresh, but not closing the tab or the end of the sign-in.

# Connect your coding tool

Delegate from Claude Code, Codex or Cursor through an MCP connection.

## Before you start

You need Node 22.19 or newer (Node 22 LTS recommended), access to a deployed Rovara project, and your installation’s control-plane URL from your admin. Developers do not need AWS credentials. Install an environment first → The package is @preplabsai/rovara-code . The MCP server remains agentx , and tools retain the agentx_ prefix.

## 1. Sign in

npx @preplabsai/rovara-code login <your-control-plane-url> Sign in through the browser with Slack or your company’s configured sign-in. The CLI shows your identity and available projects. Use the URL your administrator gives you; it is your team’s deployment, not a Rovara-hosted service.

## 2. Add the MCP connection

Run the command for your client, as yourself (without sudo ): Claude Code claude mcp add --scope user agentx -- npx -y @preplabsai/rovara-code mcp Or use npx @preplabsai/rovara-code mcp install --client claude-code . Codex npx @preplabsai/rovara-code mcp install --client codex Cursor npx @preplabsai/rovara-code mcp install --client cursor Reopen your client if needed. mcp install pins the CLI version in the client entry; rerun it to update. Add --env <name> before mcp install if your administrator supplied an environment name. Manual configuration and removal instructions →

## 3. Start a task

After connecting, ask your client to list your Rovara projects and start a task in the chosen project, for example “Hand Rovara the navigation fix in <project-name> and run the relevant tests.” This direct-task path uses agentx_start_task and has no plan approvals. It is available in v0.3.4. Published coding-tool guide →

## Start a Quick or Full workflow

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → Ask your client to find your projects and start a workflow. workflow_path is required: quick asks once for a coding plan; full asks for requirements, design and the coding plan. List my Rovara Code projects. Start a Quick workflow in <project-name> to improve the docs Copy button. Reset its label after copying, announce success accessibly, and preserve manual copy on clipboard failure. Show me the plan before implementing. The client uses agentx_start_workflow . Include the context the remote task needs; it does not receive your local conversation.

## Read and decide on the plan

agentx_get_task shows the current approval document, its digest and the workflow revision. Ask the client to show the whole document before you decide, or open the task page. Your explicit decision calls agentx_decide_workflow with that revision and digest. An assistant should not approve a plan on your behalf without your instruction. Show the current plan for task <task-id>, including checks and scope.

## Follow checks, reviews and the draft PR

After approval, checks, reviews and the draft PR follow on their own. A wait can time out while work continues; get the current task before retrying. When a step blocks, the owner chooses: agentx_send_workflow_back : give the failed checks and findings the change introduced to coding. agentx_resolve_review_findings : accept each blocking finding with a reason, or have it fixed. agentx_review_workflow_candidate : retry a blocked review on the same code. agentx_retry_workflow or agentx_retry_workflow_publish : restart blocked planning, coding or checks, or retry opening the PR. For PR comments, read the proposal with agentx_get_pr_feedback and decide with agentx_decide_pr_feedback . Tool reference →

## Sharing into Slack

Tasks are private by default unless the project requires sharing. View mode lets channel members watch. Continue mode, when allowed, lets them send follow-ups in the thread. Check the channel and mode before sharing. When finished, close the task to release its workspace. Workspace actions →

## Use your own ChatGPT plan

If your admin turned on Sign in with ChatGPT, connect your Plus or Pro plan so your tasks run on it: npx @preplabsai/rovara-code chatgpt connect Sign in with ChatGPT →

# Inspect changes, checks and reviews

Read the evidence for the current code, identify gaps, and decide what your team needs before merging.

## Start with the change

Read the diff against the task you requested. Then inspect the named checks, their output and anything that was not verified. The agent’s summary is useful context; the diff and output are what you inspect.

## Check which code was inspected

In the native workflow, required checks and review reports bind to the candidate. Compare their candidate reference with the PR head you are reviewing. Changing the code invalidates dependent earlier evidence. Open the evidence diagram

## Read the separate AI reviews

Code and security reviews start automatically once the required and chosen checks pass on the current candidate. They run in separate read-only sessions. Inspect their findings, rationale, scope and reviewer/model attribution. A finding blocks only when the change introduced it; an older problem outside the changed lines is noted. The owner can send blocking findings back to coding, or accept one with a reason, which the draft PR then lists. A passing review is an AI assessment; it does not replace tests or your team’s judgment.

## Read the result

Result Meaning Your next step Passed The named command passed in that run. Check that it covers your change. Regression A check passed before and fails now. Inspect the failure and ask for a fix. Already failing The check failed before the change too. Decide whether this task should address it. No baseline There is no earlier result for comparison. Read the current output without assuming an earlier pass. Not verified / not run The required observation is missing. Read the reason and request the missing check if needed. When a previously passing check regresses, the runtime gives the agent at most one extra attempt. Any remaining failure stays visible.

## Know which checks you are looking at

Workflow readiness Required checks and both review reports must apply to the current candidate before AgentX opens the draft PR. Existing direct-task verification The runtime reruns usable checks and compares before/after where possible. Failed or missing evidence can be described on a draft PR. Repository CI Your normal GitHub checks and branch rules govern the repository. Benchmark grader A historical grader determines a selected benchmark task’s outcome, not readiness of a current workflow task. Inspect the actual command, environment and candidate attached to each result. These layers have different purposes.

## Review a draft PR

A workflow’s draft PR contains exactly the code whose checks and reviews passed. Its description lists what the plan set out to do, the checks and reviews, any findings the owner accepted with their reasons, and a link to the task page. Your team then reviews the draft PR and repository CI. You decide what gets merged. Using the existing direct-task path? That path can produce draft PRs describing failed or unverified checks. Older publication behavior may refuse a new PR on readiness failure; append/sync of an existing PR also refuses failed readiness. Configured CodeBuild output adds evidence rather than automatically enforcing every merge rule.

## Inspect a real example

A saved Django task shows the actual patch and test output behind one benchmark result. Read the recorded task →

## Review checklist

Does the change meet the request and preserve its constraints? Which checks actually ran, on which code, in which environment? What failed, regressed or could not be verified? Do task evidence and repository CI cover the PR you are reviewing? What additional check or human review do you need? If an important integration could not be tested, keep that gap visible and request the check before merging.

# Respond to PR feedback

Inspect Rovara Code’s recommendations and approve the changes you want before coding resumes.

## Before you start

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → You need a workflow task whose draft PR AgentX opened, and you must be its owner to decide. Reviewers leave their comments in GitHub as usual.

## 1. Read the feedback notice

When reviewers comment, a separate read-only reviewer reads the comments and AgentX posts in the task’s thread, for example “PR feedback is ready: 3 comments; 2 recommendations. Highest priority: must fix.” Open details shows the full proposal; sign in if asked. A link is a route to the task, not permission to decide it. From a coding tool, ask for agentx_get_pr_feedback with the task ID.

## 2. Inspect each recommendation

Each finding shows its priority (must fix, should fix or optional), whether AgentX recommends fixing it, the proposed change or a question for you, and the comments it answers. When a fix changes the checks, the notice shows each added command exactly. Inspect Why PR and code version The recommendation must apply to the current code. Original comment Understand what the reviewer actually requested. Proposed change and checks Know what approving the fix will authorize. Gaps or disagreement The owner decides; a model recommendation is not a human decision. Comment and proposal text is reviewer output: treat it as data, not instructions.

## 3. Choose the response

Choice What happens Approve N recommended AgentX fixes the recommended findings. From a coding tool you can name a different set. Answer with instructions Shown when the reviewer asks you a question. Your answer approves the fix it describes. Request changes Keeps the PR as it is and saves your note for the next round of feedback. Dismiss Keeps the PR as it is, with your reason. If the review could not finish, retry it on the same comments. Your decision is recorded on the task. Approval authorizes specific changes Reading comments or receiving a notice does not start another coding run. No automatic GitHub reply is implied by approving a proposal.

## If the code or comments change

A decision is tied to the review, the proposal and the comment set. If new feedback arrives first, the old decision is refused and AgentX reviews the new feedback. Decide on the current notice.

## 4. Inspect the updated candidate

Only the approved fixes go to coding. The checks and reviews run again, and the fix is pushed to the same PR. If an approved fix changed no code, choose Keep the pull request as it is ; the task waits for the merge again and new comments are reviewed as usual. Evidence and freshness →

## 5. Make the final review decision

Use GitHub’s existing review and merge controls. Rovara Code observes linked PR state; it does not take over the team’s merge decision.

# Linked PRs and dependencies

Understand what the task is waiting for, which PRs still need your team’s decision, and what is not built yet.

## Opt-in serial task dependencies

Mainline supports an opt-in serial plan of 1–8 ordered required items in one repository, with one final PR ( spec 059 ). The feature flag is off by default. The whole plan is approved up front; failure pauses for an explicit owner retry. This does not introduce an arbitrary parallel dependency graph. For a change across several repositories, Rovara loop runs one loop per pull request on your computer.

## When work is blocked

A blocked step says why and offers the owner’s options: retry planning, send back to coding, retry reviews, retry opening the PR, or close the task. Inspect the reason before retrying. What to do at each step →

## Track the complete PR set

Rovara Code registers the PRs it opens against the task. GitHub events arrive signed, and missed deliveries are recovered; unrelated PR events do not advance this task. GitHub’s API remains the authority on PR state.

## Understand partial merges

The task finishes when GitHub reports every required PR merged; a coding tool then shows it as closed with stage MERGED . A partial merge stays incomplete. If a linked PR reopens, inspect the updated task state rather than relying on an earlier notification.

## Recover without creating duplicate work

Read current task state and authoritative PR links first. Event delivery can be retried, so duplicate notices should not be treated as permission for a new coding run. Use the installed retry action for a blocked operation and inspect its result.

## Work starts with an explicit request

Hosted Rovara Code starts work only when asked in Slack or through your coding tool. Creating or updating a GitHub issue does not start a hosted task. PR comments produce feedback proposals; the owner approves fixes before implementation. The separate Rovara loop runs on your own computer and does start work from collaborators’ /rovara comments on issues.

# Rovara loop on GitHub issues

Run Rovara’s workflow on your own computer: your GitHub issues drive your own Claude Code or Codex.

## What Rovara loop is

rovara loop turns collaborators’ comments on your GitHub issues into work for your own Claude Code or Codex, and drives that work through plan approval, checks, reviews and a pull request. It needs no Rovara install and no AWS account: only the Rovara CLI, the GitHub CLI ( gh , signed in), tmux , git , and Claude Code or Codex. Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → Available today: the Do, Quick, Full, Review and Contribute loops. Webhooks, Slack approvals and Jira come later. The idea is inspired by the-loop by Rohith Ramakrishnan; Rovara loop is Rovara’s own implementation.

## Set up a repository

In a checkout of the repository: rovara loop init # writes .rovara/loop.yaml, with you as its one collaborator git add .rovara/loop.yaml && git commit -m "chore: rovara loop config" rovara loop add # lets the loop read this repository's issues rovara loop start # runs the daemon in the background .rovara/loop.yaml says who the loop obeys and how changes are proved: version: 1 collaborators: # the only GitHub logins whose comments start, steer or stop a loop - maya - sam harness: name: claude-code # or codex args: [] checks: # run before a pull request, in order - name: tests run: npm test reviews: enabled: true harness: codex # a different agent from the one doing the work is a real critic security: true maxRounds: 3 Comments from anyone else are never read as instructions. A repository is read from the moment it is added; older comments are never replayed.

## Choose a loop

Comment What it does /rovara do <instruction> Works on its own branch with no gates. Commits, but never pushes or opens a PR. /rovara quick <instruction> Plan → approval → code → checks → reviews → pull request. /rovara full <instruction> Requirements, design and plan, each approved, then as Quick. /rovara review [brief] Reviews open PRs against a collaborator’s brief. Changes no code. /rovara contribute Joins an existing issue or someone else’s PR to meet a stated goal and success criteria. Steer with replies on the issue. /rovara approve passes a gate, /rovara changes: … (or any reply) asks for changes, and /rovara stop or closing the issue ends the loop. The issue’s rovara:* label shows where it stands.

## Quick and Full

Quick: the agent writes docs/rovara/<issue>/plan.md (Summary, Changes, Testing) and changes no code. A collaborator approves it, which locks it. The agent codes, commits and writes a self-review; the loop runs the repository’s checks and reviews. Then the loop itself, never the agent, pushes rovara/<issue> and opens a PR that closes the issue. Full adds requirements.md and design.md before the plan, each with its own gate. A later claim that changed an approved document is refused. /rovara full --skip design declares a phase away, and the PR says who declared it. Before publishing, the loop commits checks.md and reviews.md to docs/rovara/<issue>/evidence/ . Nothing is pushed before the plan is approved, the checks pass and the reviews pass, or a person accepts them.

## Reviews

The agent’s own review , written to evidence/self-review.md . A claim without it is refused. A code review and a security review , run headless and read-only: Claude Code in plan mode, or Codex in its read-only sandbox with reviews.harness: codex . The blocking rule. A finding blocks when the change introduced it; a security finding is never advisory. A blocking finding goes back to the agent. After maxRounds rounds that still block, or a review that could not run, a person decides. A review that could not run never counts as a pass.

## Pull requests and several repositories

Once the loop opens a PR, collaborators’ comments, inline review comments and change-requesting reviews reach the agent like replies on the issue. The loop reruns checks and reviews and pushes to the same PR. Merging closes the issue, which ends the loop. When the plan lists a ## Repositories section, the loop starts one per-PR loop for each repository, each with its own agent, worktree, branch, checks and reviews under that repository’s .rovara/loop.yaml . Each PR is approved on itself. When every PR is approved, the issue lists them and waits for you to merge.

## Watch and answer the agent

The agent runs interactively in tmux. tmux attach -t =rovara-<owner>_<repo>-<issue> shows it; detach with Ctrl-b d . Claude Code starts in its default permission mode and asks before edits or commands. Pass a permission mode in harness.args to change that. Codex starts in its workspace-write sandbox, without network access. When the agent has waited on a permission prompt for a minute, the loop says so on the issue. A session that ends while working is resumed up to three times in a row.

## Commands

Command Does rovara loop init [path] Writes .rovara/loop.yaml . rovara loop add [path] · remove <owner/name> Starts or stops reading a repository’s issues. rovara loop start · stop · status Controls the background daemon. Its log is ~/.rovara/loop/daemon.log . rovara loop do · quick · full --issue <n> <instruction> Posts the matching /rovara comment on the issue, as you. rovara loop review · contribute --issue <n> [brief] Posts /rovara review or contribute , as you. rovara loop check <issue> Shows where an issue’s loop stands without running anything.

## What is kept where

Your computer: each work item’s cached state, event log, worktree and the agent’s MCP configuration, under ~/.rovara/loop/ . Nothing is written into your Claude Code or Codex settings. GitHub: the issue holds the truth: its comments and its rovara:* label. Credentials: the loop uses your own gh login and stores no token. Full Rovara loop guide →

# Workspaces and costs

Keep the context you need, stop the work you do not, and understand what remains on the bill.

## Come back to the same workspace

Follow-ups reuse the files and conversation state. Idle compute can stop while the workspace remains. Continue the same task or Slack thread when you want to pick up where it left off. Retained storage still costs money while compute is idle.

## Cancel, close or remove

Action What it does What to remember Stop a task Stops the current work. In a Slack workflow thread, only the owner can stop, with @AgentX stop . The workspace and changes stay. Close a workspace Checks for unpublished work before releasing workspace storage. Preserve unfinished changes if closure refuses. Remove the environment A separate operator teardown procedure. Use the release-matched instructions. Each person has a limit of open tasks (3 by default). Closing a task, or a workflow task finishing, frees its place. See the workspace lifecycle →

## Understand task status

Coding-tool tasks can be STARTING , RUNNING , SUCCEEDED , FAILED , CANCELLED , INTERRUPTED or CLOSED . CLOSED also covers a workflow task that finished; its workflow stage says whether its PRs merged ( MERGED ) or its plan was rejected ( CLOSED ). SUCCEEDED describes task execution, not a guarantee that every check passed. A timed-out wait can leave the task running. Read its current status and evidence before retrying.

## Understand the next action

What you see What to do A Quick/Full suggestion card Press Start, switch path, or Just answer. Only the requester can choose. Waiting for a plan decision Read the current document, then approve or request changes in Slack or on the task page. Checks or reviews are running Nothing; a draft PR opens when both reviews pass. A check or review blocked Read the problems; send back to coding, retry reviews, or close the task. The draft PR didn’t open Retry opening the pull request, or close the task. PR feedback is ready Open details and choose the response. Waiting for merge Use GitHub review and merge controls. Closeout retry needed Check preserved artifacts and retry the failed cleanup. Task execution status is distinct from workflow stage and PR merge state.

## What you pay for

You pay for AWS services, retained storage and model usage. Task usage telemetry, installer estimates and budget alerts help explain usage. Budget alerts are notifications, not spending caps. Tasks of developers who connected a ChatGPT plan use that plan instead of the installation’s model where it can. Illustrative estimate: about $211 per month Assumes us-east-1, default Bedrock models, 1,000 turns, 100 worker sessions, 60 instance-hours and 10 retained workspaces. The source pricing calculation returns $211.13. This is an example, not a subscription price; actual usage and prices vary.

## Check environment health

With an installed CLI and operator access, use: npx @preplabsai/rovara-code --env <env> doctor --region <region> Read the reported failures before making changes. On mainline, doctor also reports Sign in with ChatGPT when this computer holds the admin sign-in. Upgrade and teardown instructions → Troubleshoot a problem →

## Task history and Canvas cleanup

At terminal closeout, Rovara Code verifies its canonical artifacts and decisions and saves their references before deleting task Canvas copies, including earlier plan versions. A preservation or cleanup failure remains visible and retryable. Canvas cleanup does not delete Slack thread messages or original GitHub comments. Artifact retention follows your configured policy; do not assume indefinite storage. Workspace storage and deployment teardown are separate operations.

# Projects and checks

Set the repositories, setup commands and checks the coding agent should use.

## Define a project

A project file names repositories, setup commands, readiness checks, and orchestration guidance. It contains credential references, not secret values. Deployment and sign-in settings belong to a separate deployment file. Example project configuration name: export-service revision: 1 repositories: - name: export-service url: https://github.com/example/export-service.git path: repo/export-service defaultBranch: main credentialRef: github-agentx-sdlc setup: - cwd: repo/export-service executable: npm args: [ci] timeoutSeconds: 600 readiness: - cwd: repo/export-service executable: npm args: [test] timeoutSeconds: 600 orchestratorInstructions: >- Delegate repository reads, edits, builds, and tests to the remote Rovara Code worker. Replace the example repository and credential reference with your configured project values. Use agentx admin project register --help to see the registration options for your installed version. Increase the immutable revision before changing a registered definition.

## Choose the checks

Use readiness commands for your test suite, lint, or type check. Each command has a working directory, executable, arguments, and timeout. If no readiness commands are available, the runtime can use recognized agent test commands; that gives narrower coverage. A configured devcontainer runs shell, setup, and readiness in the prepared project environment. Adding one to a later project revision does not move an existing workspace into it.

## Required and optional workflow checks

Project readiness checks always run in Quick and Full and cannot be turned off. A project can also offer up to 20 named optional checks; the task owner chooses among them when approving the coding plan. The chosen IDs are saved with the decision, and a new plan starts with none selected. developerTasks: enabled: true optionalWorkflowChecks: - id: coverage label: Coverage report command: cwd: repo/payments-api executable: npm args: [run, coverage] timeoutSeconds: 600 A check name should describe its useful coverage. Optional selection does not bypass required checks or change repository merge controls.

## Starting tasks from Slack

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → developerTasks.enabled controls whether developers may start tasks on the project from an AI tool or a Slack workflow. Starting from Slack also needs shared tasks ( SHARED_TASKS ) on for the Slack service; without them, AgentX answers every start asking an admin to turn them on. A plain top-level mention is sorted by the classifier model chosen at agentx init . It sees a fixed instruction and the message text only, never repository content, and waits at most 4 seconds. There is no separate routing model setting. Prefixes ( quick: , full: , workflow: , chat: ) skip the model. To save thread replies that do not mention AgentX, the app needs the channels:history and groups:history scopes and the message.channels and message.groups events. Existing installs must update the app from the generated manifest and reinstall it. AgentX ignores, and does not store, channel messages outside task threads.

## Repositories AgentX can publish

When AgentX runs Git itself (to read the agent’s changes or publish them), it ignores what the repository’s Git config asks Git to run: Git LFS repositories are not supported yet; publishing is refused when any file uses filter=lfs . Other filters are switched off, so an encryption filter such as git-crypt would stage plaintext. Do not register such a repository. Submodules checked out in the workspace, or a nested repository the agent creates, stop publication; the error names the path. Hooks, signing and credential helpers do not run. Pushes go to the registered URL over HTTPS only, and are refused while the repository sets other url.* , http.* or remote.* keys. Setup and readiness commands are the project’s own code and run with the worker’s normal Git settings.

## Dev container rules

The dev container runs on the worker host’s Docker, and the agent can edit its configuration. So AgentX checks the merged configuration before each start, and the running container after, and refuses settings that reach the host: initializeCommand and dockerComposeFile . privileged , securityOpt , and added capabilities other than SYS_PTRACE . runArgs that share the host’s processes, network, devices or namespaces. Bind mounts of / , the Docker socket, the workspace root or anything outside the workspace. Features AgentX cannot pin to the content it checked, and builds that read outside the workspace. Images, builds, features, lifecycle commands, environment variables, named volumes and bind mounts inside the workspace are allowed. Full dev container and publication rules →

## Models, connections and access

Models Choose approved provider/model pairs. Worker and orchestration configuration are distinct. External providers receive model requests outside AWS. Developers can also run their own tasks on a connected ChatGPT plan when an admin allows it. Connectors Linear, Jira, Asana, GitHub, and remote MCP tools have configured project scopes and server-side credential handling. Action policy Rules allow, ask, or deny orchestrator tool calls. They do not gate every shell command or file edit on the coding worker. Developer tasks Project settings control whether coding-tool and Slack workflow tasks are enabled and how they may be shared into Slack. Do not place credentials in command environment fields or project YAML. Verify scope and provider availability before enabling a connection.

# Sign in with ChatGPT

Let each developer run their own tasks on their own ChatGPT Plus or Pro plan.

## Who can use it

Published native workflow · current source reference Rovara v0.3.4 includes the native workflow. This page follows the inspected mainline source, which may include later changes. Deployment settings and feature flags still apply. Release and coverage details → A developer connects their own ChatGPT plan, and the coding tasks they start run on it instead of the installation’s model. People who have not connected a plan keep using the installation’s model. A ChatGPT Plus or Pro plan, under OpenAI’s eligibility rules . Rovara checks the plan when you connect. One person’s own plan: only their tasks use it, including tasks they share. One plan never serves a team. An installation where an admin turned it on. It is off by default.

## Turn it on (admins)

With the admin sign-in ( login --admin ): npx @preplabsai/rovara-code --env <env> config set models.chatgpt.enabled true The change shows its effect and asks first, and is recorded like every admin change. Turning it off stops new connections and sends every task back to the installation’s model; existing connections are kept. The preferred model is gpt-6.1-sol ; change it with config set models.chatgpt.preferredModel <model> . A task uses it only where the person’s plan allows. doctor shows whether the feature is on, how many people connected, and whether the control plane reaches OpenAI.

## Connect your plan

From the CLI, which catches the sign-in on 127.0.0.1:1455 itself: npx @preplabsai/rovara-code chatgpt connect --no-browser prints the link instead. If the port is busy (the Codex CLI uses it while signing in) or your browser is on another computer, the CLI asks you to paste the address. chatgpt status and chatgpt disconnect show and remove the connection. From Slack, mention Rovara with connect chatgpt in a project channel (only you see the answer). Press Sign in with ChatGPT and allow Rovara. Your browser then shows an error such as can’t connect to 127.0.0.1 : that is expected. Copy the whole address, press Paste the address , paste it and press Connect . The link works for 10 minutes and only for you.

## When your plan cannot serve a task

The rest of the task runs on the installation’s model in the same turn, without starting over, when: the plan reaches its usage limit (your next tasks use the installation’s model for an hour, then try your plan again); the connection was revoked or expired (connect again); the plan no longer allows the model (your next task picks one it allows). AgentX says so once in the task’s Slack thread. An OpenAI outage does not trigger the fallback: the task fails as on any provider.

## How the connection is kept

The control plane keeps your ChatGPT tokens encrypted with a key only it can use. The refresh token never leaves the control plane. The machine running your task gets a short-lived access token, kept only in memory. No Slack message, CLI output or API answer includes the tokens. Disconnecting deletes the stored tokens. To also withdraw the permission at OpenAI, remove Rovara under ChatGPT’s Settings → Connected apps . Full Sign in with ChatGPT guide →

# System architecture

Where the task, workspace, decisions and evidence live—and which systems remain authoritative.

## A task record connects the surfaces

Slack, the coding-tool MCP client and the authenticated task page are entry and review surfaces. The Rovara Code task/workflow record connects plans, operations, decisions, candidate evidence and linked PRs. Open the architecture diagram full size

## Entry and authorization

Surface Role Slack Request routing card; task thread; approval cards and owner buttons; thread replies saved for the next step. Coding tool Local agentx MCP client calls the authorized developer task API. Task page Authenticated, task-scoped plan decisions, comments, Ask AgentX and PR feedback details. GitHub Repository access, signed webhooks, comments, CI and authoritative PR/merge state.

## Coding, checks and reviewers

EC2 provides the coding workspace with encrypted EBS storage. The configured devcontainer supplies the project environment. Coding tools read/edit files and run shell commands. Runtime check execution does not accept the coding agent’s success prose as test output. Code and security AI reviewers run in separate read-only sessions or operations. Separate review roles do not imply separate physical hosts. Coding, check and review runs never receive a push token. A separate publish step stops the task’s processes and containers, then pushes the checked commit from an isolated temporary repository. Known limitation: without a dev container, the coding step on EC2 currently has the worker’s Docker access ( #325 ).

## State and evidence

DynamoDB holds task, workflow and operation state. S3 holds artifacts and session data. EBS holds the workspace files. The control plane verifies candidate references and records decisions and review applicability. GitHub events are signed, task-scoped and deduplicated; GitHub API state remains authoritative for PR reconciliation.

## Account and external services

Your AWS account is the documented security boundary. Environments in the same account are not separate security boundaries. Bedrock is AWS-hosted; configured external model providers, connected ChatGPT plans and vendor MCP servers receive their respective requests outside the account. ChatGPT tokens stay encrypted in the control plane. Action policy can allow, ask or deny orchestrator tool calls. It does not gate every worker shell command or edit.

## Retention and closeout

Rovara Code preserves canonical task artifacts and decisions under configured retention. Canvas cleanup follows a verified preservation record. Original Slack replies and GitHub comments remain subject to their services’ retention. Closeout details →

# MCP tool reference

The developer tools exposed to Claude Code, Codex and Cursor by the Rovara Code MCP server.

## Connect a client

Start with the coding-tool connection guide . Tool names keep the agentx_ prefix. The coding client calls these tools; you normally ask for the action in plain language.

## Direct-task tools (v0.3.1)

Tool Use agentx_whoami Check your environment and sign-in Returns developer identity, environment and API versions. agentx_list_projects Find projects you can use Returns authorized projects and their task/sharing policies. agentx_start_task Delegate a task Give the exact project name and complete instructions. Returns a task ID; wait_seconds is optional. agentx_get_task Inspect status and results Returns progress, changed files, artifacts and PR links when available. agentx_wait_for_task Wait for work to end Waits 1–600 seconds. A timeout does not stop the task. agentx_list_tasks Find your existing tasks Lists tasks; use the returned IDs to inspect or continue them. agentx_continue_task Send a follow-up Requires the task ID and complete new instructions. Reuses the workspace and branch after the current run ends. agentx_cancel_task Stop current work Cancels the task; cancelling a wait alone does not do this. agentx_close_task Release the workspace Checks for unpublished work; inspect the result if closure refuses. agentx_share_task Share into the project’s Slack channel View lets others watch; continue permits follow-ups when project policy allows. agentx_open_pull_request Request a PR Requires task ID and title. Draft defaults to true; inspect the task later for the PR URL.

## Workflow tools

These tools support Quick/Full workflow tasks and are included in v0.3.4. Use the tools your deployed server advertises. Tool Use agentx_start_workflow Start a workflow with project, complete instructions and a required workflow_path ( quick or full ). Returns the task and workflow state. agentx_decide_workflow Decide on the current document with task_id, expected_revision, artifact_digest, decision, reason and a retry-safe request_id. agentx_review_workflow_candidate Reviews start on their own after checks pass. Use this to retry a blocked review, with the exact expected_revision and candidate_digest; refused if the code or checks changed. agentx_retry_workflow Restart blocked read-only planning or blocked coding, or rerun checks for a blocked VERIFY stage. Rerunning checks needs expected_revision. agentx_send_workflow_back Send a blocked change back to coding with the failed checks and findings the change introduced, plus your instructions. Owner only. agentx_resolve_review_findings Answer every blocking finding: accept with a reason (listed in the draft PR) or fix with optional instructions. At most 20 per call. Owner only. agentx_retry_workflow_publish Retry opening the draft PR for the code whose checks and reviews passed. Owner only. agentx_get_pr_feedback Read AgentX’s proposal for PR comments: each finding’s ID, priority, recommendation, proposed change or question, and the comments it answers. Owner only. agentx_decide_pr_feedback Decide that proposal: APPROVE (optionally naming finding_ids), REQUEST_CHANGES, DISMISS or RETRY_REVIEW. Copy the digests from agentx_get_pr_feedback . Owner only. agentx_keep_pull_request After an approved feedback fix changed no code, keep the PR as it is and wait for the merge again. Owner only.

## Task People tools (mainline)

These tools show and propose changes to who can use a task. Role changes and invitations are behind environment settings that default to off. Tool Use agentx_get_task_people Show the current People revision and who can use the task. Use person_id, not names, for changes. agentx_get_task_people_request Check the receipt of a People request. It never confirms a pending request. agentx_set_task_person Propose a role change. A human must confirm before it commits. agentx_take_task_ownership Propose taking ownership of an orphaned task. A human must confirm before it commits.

## Decision inputs

Field Meaning task_id The existing workflow task. expected_revision The current positive workflow revision from the task. artifact_digest The SHA-256 of the current approval document. decision APPROVE, REQUEST_CHANGES, REJECT or SKIP. SKIP is refused unless the project allows it. reason A non-empty reason for the decision (maximum 500 characters). request_id A UUID for safe retry. Repeat the same request unchanged after a timeout. The server validates identity, state and freshness. Never reuse an older document digest to approve a revised plan. Workflow and feedback calls that carry an expected revision or digest are refused when the task has moved on; read the task again and decide on the current state.

## Waits and retries

Waits can time out without cancelling the task. Check the existing task before starting duplicate work. Mutating tools use request IDs to recognize retries; a new request ID means a new action. Continuing a task that is still running returns TASK_BUSY . Wait for its current run to end.

## Access and sharing

Project access and task policy are enforced by the server. Sharing into Slack must follow that project’s channel and sharing policy. Additional admin tools depend on a valid admin sign-in; they are outside this developer-tool table.

# Troubleshooting

Find the next useful check before repeating work or changing the environment.

## The Slack channel does not respond

Confirm you used the installed app mention in a project-bound channel. Ask the administrator to check the channel binding and the registered project. A newly registered project revision applies to new threads.

## My mention got a card instead of an answer

On mainline, a plain top-level mention is routed and a change gets a Quick/Full card. Press Just answer , or start the request with chat: to always reach the chat agent. Mentions inside a thread the chat agent already answers need no prefix.

## AgentX asks an admin to turn on shared tasks

Starting tasks from Slack needs shared tasks ( SHARED_TASKS ) on for the Slack service, and the project’s developer tasks enabled. Other refusals name the reason: the open-task limit, a thread that already has a task, or a channel not connected to a project you can use. Anything else comes with a reference to give an admin.

## Thread replies are not reaching the task

Replies without an @AgentX mention need the Slack app’s channels:history and groups:history scopes and the message.channels and message.groups events. Ask an admin to update the app from the manifest agentx init generates and reinstall it. Until then only @AgentX replies are saved.

## The coding tool asks me to sign in

Complete the installed client’s sign-in flow. Ask the client to use agentx_whoami to confirm the environment and identity. If a tool reports a version mismatch, use the CLI version matched to that deployment.

## My project is missing

Ask for agentx_list_projects . Project access may depend on membership in its Slack channel. Ask an administrator to check access and whether developer tasks are enabled. A Slack-unavailable notice can mean some channel-derived projects are temporarily missing.

## The wait timed out

Ask for agentx_get_task with the same task ID. The task can still be running. Cancelling a wait only stops the wait.

## A follow-up says TASK_BUSY

The previous run is still active. Wait for it to end, or explicitly cancel the task if you want to stop that work. Send the follow-up afterward.

## The result says not verified

Read the reason and identify which check is missing. Missing setup, an unavailable command or a stopped task can leave no usable result. Ask for the required check instead of assuming the change passed.

## The workspace will not close

Inspect the unpublished-work report and preserve the remaining changes. Close again after the work is published or otherwise safely kept. Do not confuse cancel with close.

## Publishing is refused for my repository

Read the refusal: it names the cause. Git LFS files, checked-out submodules, extra url.* , http.* or remote.* keys, and dev container settings that reach the host are refused. Repository and dev container rules →

## My task did not use my ChatGPT plan

Check chatgpt status . The task falls back to the installation’s model when your plan hits its usage limit (for an hour), the connection was revoked or expired, or the plan no longer allows the model. AgentX says so in the task’s Slack thread. Admins can check doctor . Fallback rules →

## The environment itself is unhealthy

An operator with access can run: npx @preplabsai/rovara-code --env <env> doctor --region <region> When asking for help, include the CLI version, task ID, exact error and relevant redacted output. Keep credentials out of reports.

## The approval says it is stale

Open the latest task prompt and document. The workflow revision or document digest has changed; decide on the current version. Do not keep submitting the old approval.

## Checks or reviews blocked the task

Read the failed check or blocking finding and the current candidate. Only problems the change introduced block. Send the change back to coding, retry the reviews on the same code, or accept a finding with a reason from a coding tool ( agentx_resolve_review_findings ). A review that could not run or be read never counts as a pass. agentx_retry_workflow restarts blocked planning or coding, or reruns checks. If the draft PR did not open, retry opening it.

## The task page asks me to sign in

Sign in with the identity the task authorizes and return to the same page. “You don’t have access to this task” means you are not the owner or in the task’s channel with access to its project, or the task does not exist. Possessing the link does not grant decision rights.

## A merged PR did not finish the task

Check the full required PR set and current GitHub state. Other required PRs may still be open or reopened. Inspect any delivery/reconciliation blocker before repeating work.

## Rovara loop ignores my comment

Check that your GitHub login is in the repository’s .rovara/loop.yaml collaborators, that the repository was added with rovara loop add on the computer running the loop, and that rovara loop status shows the daemon running. Comments made before the repository was added are never replayed. rovara loop check <issue> shows where the loop stands.
