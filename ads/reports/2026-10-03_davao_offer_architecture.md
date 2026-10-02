# Davao offer architecture — proposal

**Date:** 2026-10-03 · **Status:** PROPOSAL. Prices are proposals, not confirmed business facts. Nothing here is approved for ads, AI knowledge, or customer-facing use until the owner signs off.
**Scope:** Davao area only. General Santos City excluded by owner instruction (DEC-006).

---

## 1. Why the offer, not the ads

Account evidence, Jan 1–Sep 30 2026 (manually transcribed, PHP, Singapore Time, 7-day click/1-day view):

| Signal | Value | What it means |
|---|---|---|
| Conversations generated | ~930 across five conversation campaigns (~103/month) | Demand generation is working |
| Cost per conversation | PHP 24.11–43.07 | Traffic is not expensive |
| Spend | ~PHP 42,205 across six visible campaigns (~PHP 4,700/month) | Spend is low relative to capacity |
| Booked jobs / revenue / margin | **Not recorded anywhere** | The outcome is unmeasured |

Owner-stated capacity is **3–5 jobs/day**. Against ~103 conversations/month, that implies the business is running far below capacity. **Demand, not service capacity, is the likely binding constraint — if inquiries convert.**

When traffic is cheap and capacity is spare, the bottleneck is almost never the ad account. It is the conversion of an inquiry into a booked, completed, paid job. The offer and the reply process are where that conversion happens.

## 2. What is wrong with the current offer

Current owner-approved wording: *"Piano tuning, piano cleaning and minor repairs; rates start at PHP 3,000 depending on location."*

| Problem | Consequence |
|---|---|
| **"Starts at"** | The customer anchors on PHP 3,000, receives a higher quote later, and experiences it as a bait-and-switch. This forces a negotiation over Messenger before any commitment. |
| **"Depending on location"** | The price is unknowable without asking. It converts a buyer into a question-asker and adds a round-trip to every conversation. |
| **Three services bundled vaguely** (tuning + cleaning + minor repairs) | The customer cannot tell what they are buying, and the business cannot price it. "Minor repairs" is an unbounded promise. |
| **No reason to act now** | Nothing in the offer creates urgency, so every inquiry becomes "I'll message you later" — the pattern visible in cases C03 and C09. |
| **Conflicting prices in circulation** | Historical ads and inbox replies used PHP 3,500; the current approved offer says PHP 3,000; specialized product prices and the connected Google Drive sources were never audited. The AI can quote any of them. |

Evidence basis: `2026-10-02_facebook_ads_study_and_plan.md`, `2026-10-03_inbox_communication_review.md`, `2026-10-03_business_agent_flow_update.md`. The inbox sample is 10 selected conversations, not a measured rate — it shows these failure modes occur, not how often.

## 3. Proposed offer structure (all prices require owner approval)

### Offer A — Route Day (the volume and margin engine)

A named barangay on a named date at a published discount.

- **Route day price: PHP 3,000** — tuning on the published route day only.
- **Standard price: PHP 3,800** — any other date, Davao City proper.
- Route days should batch 3–5 jobs in one barangay (e.g. Buhangin, Toril, Bunawan).

Why this is the highest-leverage change:

1. **It converts a discount into scheduling control.** You are not discounting to win a job; you are paying PHP 800 to choose when and where the job happens.
2. **Travel cost collapses.** Three jobs in one barangay instead of three cross-city trips. For a solo technician, travel is the largest uncontrollable cost in the job.
3. **It gives the ad a true reason to act now.** "We're in Buhangin on Thursday the 16th" is real scarcity, not manufactured urgency — no false claim is required.
4. **It gives the AI a single, safe, quotable answer.** Exactly the failure in case C09 (repair question answered with repeated generic price paragraphs) is avoided when there is one concrete price and one concrete date.

### Offer B — Standard tuning (the baseline)

- **PHP 3,800 flat within Davao City proper.**
- **+PHP 500 outside the named boundary** (state the barangays explicitly in the ad and the AI knowledge).
- Delete "starts at" from all advertising and all AI knowledge. State the number.

The advertised floor moves from PHP 3,000 to PHP 3,800 for non-route-day work. This is deliberate: a price that is true beats a price that is low. **This is the decision most likely to be contested and it needs explicit owner approval.** The counter-argument — that raising the floor reduces inquiry volume — is legitimate and untested here.

### Offer C — Institutional / multi-piano (the margin leader)

For schools, churches, music studios and other establishments, which the owner already lists as a target segment.

- **First piano PHP 3,500; each additional piano on the same visit PHP 2,000.**
- Five pianos at one location = **PHP 11,500 for one trip**, filling a full day with a single sale and near-zero marginal travel.
- **Annual tuning contract: PHP 6,000 per piano per year, two visits.** Converts one-off jobs into recurring, predictable revenue.

This is the highest-margin revenue available to the business and it is the segment that best fits owner-stated capacity of 3–5 jobs/day. One sale fills a day; a homeowner sale fills a slot.

### What NOT to advertise

- **Do not bundle "minor repairs" into an advertised package.** Repair scope is unbounded and cannot be quoted by an AI. Keep repair as a separate, human-quoted path: *"Send a photo and Robert will assess the repair and quote it."* This directly addresses case C09, where a specific repair symptom received a generic tuning price.
- **Do not promise before/after restoration, same-day visits, or diagnosis from a photo.**
- **Do not republish the historical PHP 3,500 tuning/cleaning/repair bundle** with its trust and urgency claims. Those are historical claims, not current confirmed facts.

## 4. Pre-launch gate — three items, non-negotiable

Spending money before these are resolved converts a cheap-traffic advantage into paid reputation damage.

1. **Every unanswered message must be visible to a human.**
   The "Identify unanswered messages" workflow was observed OFF. Case C10 shows a prospect who supplied location, piano model and a specific symptom and received **no visible reply**. That is the most expensive single failure in the business and it is currently invisible. Enable it or check the inbox twice daily. A manual tally beats a broken pixel.

2. **The AI must not promise contact, callbacks, or "Robert will call you right away."**
   This is a documented failure: the agent offered a callback and promised immediate contact to a customer who had explicitly requested text only. It is not hypothetical — cases C08 and C04 are real customers who waited for AI-confirmed appointments, and Robert apologised in both. Until re-tested and passing, restrict the AI to answering price and area questions only, with no booking and no response-time promises.

3. **One price, everywhere.**
   Reconcile the AI knowledge entries, the connected Google Drive sources, the specialized product prices, and the ad copy to the approved offer. Conflicting prices are already documented as an open risk and were never audited.

## 5. What I would NOT touch yet

| Item | Why not |
|---|---|
| Video creative | The owner's photo-only preference is unproven but untested as a bottleneck. Creative is not what is limiting this business. Do not spend attention here. |
| Pixel, CAPI, website, landing pages | No website and the PIANO dataset has 0 events. The conversion in this business happens inside Messenger. Instrumentation is a distraction until there is something to instrument. |
| Interest targeting, lookalikes, retargeting | Volume is too low to split. Broad Davao geography is appropriate. |
| Scaling spend | Scale only after a qualified-inquiry and completed-job tally exists. There is no baseline to scale against. |
| General Santos City | Excluded by owner instruction (DEC-006). |
| The existing GenSan draft campaign | Out of scope. Its PHP 880/day and PH-wide targeting are not authorized defaults. |

## 6. What could prove this wrong

- **Robert is already booked 3–5 jobs/day.** Then capacity *is* the constraint and the correct move flips from generating volume to **raising prices** — the opposite of the route-day discount.
- **Conversations already convert above roughly 25%.** Then the response layer is not leaking, and the correct move is to increase spend immediately rather than restructure the offer.
- **Average ticket is materially above PHP 3,000.** Then margin is less fragile and route-day discounting matters less; institutional work becomes the only meaningful lever.
- **Inquiries are concentrated in barangays that cannot be batched.** Then route days will not deliver their travel savings and Offer A weakens.

## 7. Open items deliberately NOT re-asked

The owner declined to restate these, stating they were already provided to an AI. They remain absent from this workspace and are carried as explicit unknowns in every analysis:

- Conversation → paid, completed job conversion rate (**unknown**)
- Average actual ticket and per-job direct cost / margin (**unknown**)

Per `ads/records/decision_log.csv` DEC-006, these are recorded as unknowns, not as blanks to be filled with assumptions.

---

**Nothing in this document is a live change.** No ad, campaign, budget, AI setting, price or customer-facing message has been modified. All prices are proposals requiring explicit owner approval.
