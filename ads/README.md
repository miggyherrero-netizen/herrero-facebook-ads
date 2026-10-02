# Facebook Ads workflow and data handoff

This folder is the working record for paid Facebook advertising through Meta Ads Manager. The owner plans to run ads for piano services and expects the specialist to study how to run them, recommend a practical plan, and say exactly what photos/videos are needed. The owner does not need to choose Meta objectives, KPI definitions, attribution settings, or review date ranges in advance; Codex should recommend those from verified business facts and account evidence and explain them plainly.

The owner shared a Codex access-check summary for the Robert Herrero Business Portfolio and the ROBERT HERRERO ad account ending 545192. According to that report, Ads Manager worked through a logged-in Chrome session, Robert Herrero was shown with Full access under “People with full control,” and no Meta API tool was exposed. Broader Business Suite settings required identity verification; portfolio-wide permissions remain unknown. This is a reported check, not a guarantee that a future Codex session has the same access. Verify the session and correct account, then proceed to the ad-relevant study—not just another permissions report.

## First specialist task: study, then recommend

The first deliverable should be a **read-only Facebook Ads account study and campaign plan**, using [`reports/facebook_ads_readiness_plan_template.md`](reports/facebook_ads_readiness_plan_template.md). Codex should not stop at asking for a date range/KPI or checking whether the login works.

### What to inspect

Review only ad-relevant data available in the authorized Meta Ads Manager session:

- Existing active, paused, or recent campaigns; if none are present, say so clearly.
- At campaign, ad set, and ad levels: objective, status/delivery, budget/schedule, performance goal/optimization event, audience and location settings, and actual placements.
- Existing ads: image/video, primary text, headline, CTA, destination/contact path, and any existing previews or assets.
- Performance over a sensible period selected by the specialist from available history and volume. Unless the account suggests a better window, start with the most recent 30 complete days in account time and compare with the previous 30 if meaningful. State the period and why.
- Exact Meta result/event labels, attribution setting, spend, and outcome metrics; relevant Pixel/events, lead forms, messages, or other measurement only if accessible and needed.

Do not scan unrelated Business Suite settings or attempt to bypass the identity-verification restriction. The purpose is to understand existing ads, delivery, measurement, and creative gaps so the specialist can recommend how to promote the piano services.

### What to give the owner

1. A plain-language account/campaign audit: what exists, what has worked or not (with evidence), what is unclear, and what cannot be concluded.
2. A recommended campaign approach for piano services: objective, desired customer action, measurement/KPI, audience/geography approach, placements, and budget considerations. Clearly mark proposals and unknowns; do not invent the service area, price, budget, or business outcome.
3. A **specific creative request**, not “send some pictures.” List each needed vs optional photo/video; say exactly what to photograph, how to frame it, orientation/aspect ratio or format for the intended Meta placement, and why it helps. Tailor it to the verified service. Potential asset types may include the actual service being performed, the technician/business, relevant close-ups, or a truthful finished result; do not assume all are applicable or imply unverified before/after outcomes or credentials. Use suitable existing ads/assets before requesting new ones.
4. A few essential questions in ordinary language—e.g. the exact piano service to promote, where it is available, how customers should contact/book, and the maximum spend the owner approves. Do not require the owner to choose technical Meta metrics or date ranges.

The account study and plan are read-only. The owner’s intent to run ads is not launch approval. Show the proposed campaign, creative, destination, timing, and spend limit and receive explicit approval before publishing or changing anything.

## How to ask for work

The owner can say simply: “Study my Facebook Ads account and tell me how we should run ads for our piano services, including which photos you need from me.” Codex should check the available Meta Ads Manager session, confirm the right account, do the study above, and ask only for essential owner-known facts. If no usable connection is exposed, request an Ads Manager export. The optional [quick task template](intake/quick_task_template.md) is only a prompt aid.

## Meta Ads data and measurement

Use Ads Manager's native labels and include relevant fields where available: delivery status; campaign objective; performance goal/optimization event; budget and schedule; Results and exact result type; Cost per result; amount spent; impressions, reach, frequency, CPM; link/outbound clicks, link CTR/CPC, landing-page views; and relevant leads, purchases, conversion value, or ROAS. Available fields vary with objective and account setup. Do not treat “Results” as the same outcome across different objectives, and distinguish Meta-attributed activity from actual inquiries, bookings, or sales.

For a creative review, use the Meta ad preview or screenshot and, where available, the primary text, headline, creative, CTA, and destination URL. For lead/message campaigns, determine whether the reported event matches the real customer action the owner wants. Follow current placement specifications when stating aspect ratios or dimensions; do not rely on stale sizes.

## Receiving and retaining data

- Attach a report in the conversation or place it in `ads/data/raw/`. When appropriate to retain, keep a copy of the original Ads Manager export unmodified in `raw/`; never overwrite the source.
- Put only derived, cleaned, or joined files in `ads/data/normalized/` and link them back to the raw source.
- Use descriptive filenames such as `YYYY-MM-DD_meta-account_report-period_report-type.csv`; mask account IDs if preferred.
- Record source filename, extraction date, date range, time zone, currency, attribution setting, reporting level, and any transformations/exclusions in the review and/or `performance_log.csv`.
- Do not sum campaign, ad-set, and ad rows together. Do not compare different Meta objectives, result events, attribution settings, or reporting levels as though equivalent.
- In `performance_log.csv`, use one row per reporting period and entity at one clearly stated level, with the exact selected Meta result name. Leave unavailable fields blank; blank means not reported, not zero. If several result actions or platform-specific metrics are important, keep the original export and describe the exact view used; do not duplicate spend and then sum it across action types.

## Durable history and follow-up

- `records/campaign_register.csv`: verified ad-account/campaign identifiers, objectives, approved budget details, status, and core setup.
- `records/performance_log.csv`: normalized performance facts linked to their source export, with metric definitions and reporting scope.
- `records/decision_log.csv`: evidence, diagnosis, recommendation, owner approval/status, review date, and outcome. A recommendation is not a live change.
- `records/change_log.csv`: only changes confirmed as actually made, with previous/new settings, approval, executor, and verification.
- `records/lessons.md`: evidence-backed learnings with source/date range and limits on where the lesson applies.
- `reports/`: dated account studies, plans, performance reviews, and post-change evaluations.

Use sequential IDs for new decisions/changes where applicable (for example, `DEC-001` and `CHG-001`) and do not reuse IDs. If evidence is insufficient, record the gap rather than inventing a finding. After a campaign is approved and launched, track actual changes and review performance after a sensible learning/measurement period; do not claim causality where timing, attribution, seasonality, or concurrent changes leave it uncertain.

## Access and safety

The owner-provided Codex report says Ads Manager worked through a logged-in Chrome session for the account in the account brief. No Meta API tool was exposed; broader Business Suite settings required identity verification and portfolio-wide permissions were unknown. The current assistant has not independently inspected Chrome or the live account. Each Codex session must reverify access and scope; do not bypass identity verification. Use read-only access for the study where possible. Never share passwords, 2FA codes, or API secrets; do not store unnecessary customer personal data.