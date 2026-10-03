# Automated Optimization System — Meta Ads to Piano-Service Jobs

**Date:** 2026-10-03  
**Status:** Proposed design only — not deployed; no account changes or spend authorized  
**Scope assumption:** "System" means the Facebook/Meta Ads → Messenger inquiry → booked/completed piano-service job workflow for R. Herrero Piano Sales & Services. This is not a diagnosis of a website, app, server, or computer-performance issue.

## Executive recommendation

Build a **read-only, human-approved optimization loop first**. Automate data collection, validation, reporting, and alerts; do not let an AI agent publish ads, change budgets, alter geography, or confirm appointments. Only consider narrowly scoped writes after access, outcome measurement, Messenger handoff, and saved configuration are verified and the owner approves an exact version-specific change.

The first constraint is not proven compute speed. The records show a measurement and operating-control gap: Ads results were manually transcribed, conversations are not linked to verified business outcomes, and Messenger handoff/configuration reliability is not fully established. No system latency, throughput, or infrastructure benchmark was provided, so a technical performance diagnosis would be premature.

## Evidence and starting state

- The last saved Ads Manager study is dated **2026-10-02**. It reviewed selected historical rows for 2026-01-01–2026-09-30, manually transcribed from the interface, not a native export. A saved check showed the PIANO dataset had no received events/integrations. Current Ads Manager state and access were not reverified in this session; no Meta Ads API/connector was exposed.
- The saved study found the GenSan-named draft actually used PH locations, PHP 880/day, and no end date. The draft was not launch-ready. No current spend limit is approved; neither that draft setting nor the earlier PHP 3,500/14-day proposal is authorization.
- Owner-provided offer: piano tuning, cleaning, and minor repairs starting at PHP 3,000 depending on location. Davao City generally; General Santos City for October 2026, with exact dates/boundaries still unknown. Messenger is the intended contact path.
- The latest October 3 Business Agent notes record master AI ON at the owner's instruction and automatic appointments OFF. They also document reappearing old FAQ content, incomplete behavioral validation, and unverified production notification/owner handoff. These are saved reports, not a live recheck today.
- Paid-social creative remains **static-photo-only**, per the owner's standing preference. Qualified inquiries, owner-confirmed bookings, completed jobs, and financial outcomes must remain distinct from Meta messaging conversations.

## Bottlenecks to address first

| Bottleneck | Evidence | Automation response |
|---|---|---|
| Manual and partial reporting | Historical results were manually transcribed; no fresh native export is in this session | Import an unmodified Ads Manager export and validate its reporting scope before analysis |
| No business-outcome feedback loop | Conversation counts exist, but qualified inquiries/bookings/completed jobs and margin are not established in the saved Ads study | Add aggregate outcome counts by period/campaign; do not store customer names, phone numbers, or addresses in the optimization dataset |
| Setup-name mismatch risk | Draft name did not match actual location, budget, and schedule fields | Compare actual settings to the approved plan; never infer settings from names |
| Unproven inquiry handoff/configuration | AI and appointment controls have changed over time; handoff notification delivery and saved FAQ persistence remain uncertain | Hold automated lead-quality conclusions and customer-facing AI changes until readback and handoff tests pass |
| No measured technical baseline | No latency, throughput, error-rate, or report-preparation-time measurements supplied | Measure workflow freshness, missing data, manual effort, and response-time aggregates before setting targets |

## Proposed architecture

### 1. Data sources — read-only at first

1. **Meta Ads Manager:** export campaign/ad-set/ad performance and settings for a defined period. Preserve the raw export unchanged under `ads/data/raw/`; derive normalized records separately under `ads/data/normalized/`.
2. **Business outcomes:** enter aggregate counts for qualified inquiries, owner-confirmed bookings, completed jobs, and revenue/margin when available. An inquiry is qualified only when it concerns an offered service, is within the confirmed service area, and requests a quote or scheduling. Deduplicate inside the business workflow; retain only aggregate counts here.
3. **Configuration snapshot:** record the actual account, campaign objective, exact Meta result event, locations, schedule, spend limit, placement, CTA, and destination, with source and verification timestamp.

If a native export or authorized integration is unavailable, keep CSV export as the fallback. Do not request passwords, one-time codes, API tokens, or unnecessary customer data in chat or project files.

### 2. Canonical data and quality gate

Every performance record must preserve: source filename, extraction timestamp, report start/end, account time zone, currency, reporting level, objective, optimization event, attribution setting, exact Meta result name, spend, and any available delivery fields. Keep campaign, ad-set, and ad rows separate. A blank value means not reported, not zero.

Before analysis, reject or quarantine data when account identity, reporting period, currency, attribution, result definition, reporting level, or source is missing or inconsistent. Mark the report **HOLD** rather than filling gaps by guesswork.

### 3. Metrics and deterministic monitor

- **Platform diagnostics:** delivery/status, spend pacing, impressions/reach/frequency, clicks where relevant, exact Meta Results and Cost per result.
- **Business measures:** cost per qualified inquiry = spend ÷ qualified inquiries; cost per completed job = spend ÷ completed jobs, only when the denominator is actually reported and nonzero.
- Never compare unlike objectives, result events, attribution settings, reporting levels, currencies, or date ranges as though equivalent. A Messenger conversation is not a booking or sale.
- Flag approved-cap risk, delivery stops, missing/stale data, account/settings mismatches, out-of-area inquiries, destination failures, and material differences from a verified baseline. Use the owner-approved spend limit and cost guardrail; do not invent fixed thresholds.
- A missing feed or failed validation suppresses recommendations and triggers an alert. It must never cause a budget change or a guessed zero.

### 4. Agent roles and decision rights

| Role | Responsibility | Permission boundary |
|---|---|---|
| **Ops Orchestrator** | Runs scheduled checks, tracks workflow state, routes exceptions, and produces a concise status report | No Meta account writes; cannot approve work |
| **Read-only Data Collector** | Imports allowed exports, checks schema/provenance, normalizes metrics, and flags gaps | Read-only access only; no customer-level lead data |
| **Performance Analyst** | Explains pacing/anomalies and proposes one evidence-backed next test | Recommendations only; no publish, pause, budget, targeting, or creative changes |
| **Independent Guardrail Reviewer** | Checks the recommendation against account identity, exact metric definitions, approved service area/spend, photo-only preference, and privacy rules | Can mark PASS/HOLD/REJECT; cannot publish or approve spend |
| **Owner / authorized operator** | Confirms service facts and approves an exact change packet; a human operator executes and verifies it | Only the owner approves. Execution is limited to the approved version and action |

Use a review handoff: **Collect → Validate → Analyze → Independent review → Owner approval → Execute only if approved → Verify and log**. Each handoff records what was done, source/artifact, verification steps, open issues, and next action.

### 5. Change-control boundary

**Initial mode:** shadow/read-only. Agents can draft a recommendation packet, never apply it.

A later execution mode requires all of the following: verified account access; an approved exact plan with account, service/area, objective/event, creative, destination, dates, total spend cap, and action; a fresh pre-change state check; a dry-run diff; a bounded allowlist; an idempotent action; post-change verification; an audit-log entry; and a tested rollback/escalation path. Approval expires if the account state or material plan fields change. No autonomous budget increases, new campaign publishing, geography expansion, creative substitution, or appointment confirmation.

Any future pre-authorized pause/contingency must be specified by the owner in the approval packet. Until then, alerts are notifications only; they do not authorize live actions.

## Operating cadence and alerts

After an owner-approved launch, use the existing project cadence as proposed checkpoints: early delivery/destination check around 48 hours, aggregate inquiry-quality review around day 7, full-test review around day 14, and an attribution refresh where appropriate. These are proposed review points, not an active scheduled automation. The system should immediately flag a broken destination, wrong account, unexpected geography, settings drift, missing data, or spend nearing the approved cap; it should not silently correct the campaign.

## Rollout

1. **Readiness:** reverify the Ads account/session and current campaign state; confirm the exact service dates/areas, Messenger response capacity, saved FAQ configuration, actual handoff/notification, and owner-approved total spend. Resolve any material discrepancy before connecting automation.
2. **Shadow reporting:** start from read-only Ads Manager exports and aggregate owner-reported business outcomes. Validate the schema and reconcile totals with the source UI before producing recommendations.
3. **Baseline:** measure report preparation time, data freshness, missing/invalid rows, spend-pacing variance, aggregate response-time bands, qualified-inquiry share, bookings, and completed jobs. Set targets only after a baseline exists.
4. **Recommendation mode:** produce evidence-linked alerts and one-variable test proposals. Keep creative tests static-photo-only and keep all launch decisions with the owner.
5. **Optional bounded execution:** only after the owner selects an integration/runtime, authorizes least-privilege access, and separately approves a specific write workflow. Run in shadow mode first and compare proposed versus actual decisions before considering any pre-authorized mechanical action.

## Install and capability status

- This session ran two **task-scoped** subagents for independent bottleneck and safety review. They are temporary collaborators, not persistent agents installed into the workspace or WorkBuddy.
- Marketplace searches for Facebook Ads optimization, Meta Ads, marketing automation agents, and security-audit skills returned no matching skills. No new skill was installed.
- Relevant skills already available in this workspace include `paid-ads`, `analytics-tracking`, `ab-test-setup`, and `agent-team-orchestration`. These guide strategy, measurement, testing, and team roles; they do not connect to Meta or install a persistent agent team.
- No Meta connector or persistent-agent deployment target was exposed. A live integration cannot be safely configured until the target runtime and permissions are specified.

## Decision needed before implementation

Confirm whether "system" means this Meta Ads/Messenger workflow. If yes, the next implementation step is a read-only export-based shadow report, after live account access and current settings are verified. If the request instead means an internal website/app/server, provide its stack, where users observe slowness, available logs/metrics, and the target where agents should be installed; this design does not diagnose that system.
