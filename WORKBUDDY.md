# WorkBuddy project context entry point

**Important:** WorkBuddy's documented task workflow lets you choose this workspace and reference or attach files with `@`. The documentation does not confirm automatic discovery of `WORKBUDDY.md` or `AGENTS.md`; include the references below when starting a task.

## For the task creator

1. Set the working directory to this project folder: `E:/R. HERRERO PIANO SALES & SERVICES/ADS MANAGER/facebook ads oct 2026`.
2. In a Meta Ads optimization task, reference these project files in the prompt (using WorkBuddy's `@` file picker):
   - `@WORKBUDDY.md`
   - `@AGENTS.md`
   - `@deliverables/marketing-campaign/automated-optimization-architecture-2026-10-03.md`
   - `@ads/intake/business_and_account_brief.md`
   - The latest relevant study/report and records under `@ads/`.
3. Say what outcome you want, for example: “Follow the attached project rules and optimization architecture. Start in read-only mode, verify what data is available, and propose the next step. Do not make live account changes.”

## Project rules

- `AGENTS.md` is the canonical source of project scope, facts, account-access precautions, measurement definitions, the static-photo-only preference, and explicit owner-approval requirements. Follow it; do not invent facts or treat historical configuration as current.
- The automated optimization architecture is a **proposal**, not an integration or deployed automation. No persistent agent team, Meta connector, scheduled monitoring job, or live campaign optimizer was installed by creating these files.
- Default to read-only/shadow mode: validate source exports and aggregate outcomes; report data gaps; recommend, but do not execute, changes. A missing/stale/invalid feed means HOLD/alert, not a guessed value or automatic correction.
- Do not store customer names, phone numbers, addresses, credentials, or unnecessary personal data in optimization reports. Use aggregate inquiry, booking, completed-job, and financial counts when available.
- A Meta messaging conversation is not automatically a qualified inquiry, booking, completed job, sale, or profit. Use exact Meta result labels and definitions; compare only like-for-like reporting periods/settings.
- Keep paid-social creative static-photo-only unless the owner changes that preference.
- Never create, publish, pause, edit, change spend/budget/geography/creative/tracking, activate customer-facing automation, or confirm appointments without the specific owner approval and verification required in `AGENTS.md`.
- If live access is unavailable, say so and ask for the relevant Ads Manager export. Never bypass identity checks or request login secrets.

## Handoff expectation

State which files/data were examined, what is verified versus proposed or unknown, any validation failures, and the next owner decision needed. Link outputs in the project; update durable project records only for newly verified facts or actions actually completed.
