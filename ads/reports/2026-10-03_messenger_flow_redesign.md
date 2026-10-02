# Messenger flow redesign — R. Herrero Piano Sales & Services

**Date:** 2026-10-03 · **Status:** DRAFT for owner review. No live setting, instruction or message has been changed.
**Scope:** Davao area only (DEC-006). Meta Business Agent / Business AI inside Meta Business Suite.

This is one working draft, written from the workspace evidence (10 sampled inbox threads, Sep 3 – Oct 2 2026, plus recorded agent tests). Use it to compare against the output you get from another AI — take whatever works from either.

---

## 0. The one rule underneath everything

**Answer first. Then ask one thing.**

Every observed failure in the inbox sample traces back to the same root: the agent tries to complete an intake process, and the customer experiences being interviewed by something that hasn't helped them yet. F4 is the extreme case — a prospect handed over location, model and symptom in one message and got nothing back.

So the ordering is fixed:

1. Acknowledge and answer what they actually asked.
2. Ask the **single** next most useful missing detail.
3. Only after they've been helped, ask for name and contact.

---

## 1. Recommended flow

```
INCOMING MESSAGE
│
├─ Is this an EXISTING customer?
│  (signals: "my piano", "you already", "the repair", "last time",
│   "I waited", "update", "finished na", "human", "Robert")
│  └─► BRANCH E — stop lead collection entirely
│
└─ NEW INQUIRY
   │
   ├─ What do they need?
   │
   ├─ A. Asking about PRICE
   │     → state "starts at ₱3,000, depende sa location"
   │     → ask location (one question)
   │     → then BRANCH B
   │
   ├─ B. Describes a piano or a problem
   │     → acknowledge the specific thing they said
   │     → ask the one missing piece among: piano type / concern / location / last service
   │
   ├─ C. LOCATION is outside Davao City (Tagum, etc.)
   │     → never confirm coverage
   │     → "si Robert pa ang mo-confirm kung makaadto"
   │     → continue gathering; do not refuse
   │
   ├─ D. DECLINES phone number / wants Messenger only
   │     → accept immediately, once
   │     → ask name only
   │     → continue in Messenger, no transfer, no closing
   │
   └─ F. Institutional (school / church / studio, multiple pianos)
         → acknowledge multi-piano
         → Robert quotes; do not invent a rate
         → ask how many pianos and where
```

### The Robert-ready package

Hand Robert this, and nothing else:

| Field | Ask it when |
|---|---|
| Location (city + barangay) | First — it determines whether the job is even possible |
| Piano type (upright / grand / digital) | Second |
| The concern | Second or third, whichever they haven't volunteered |
| Last serviced (roughly — "when was it last tuned?", never an exact date) | Third |
| Name | Fourth |
| Contact number (optional — Messenger is fine) | Last |

**Never ask for anything already supplied.** F7 shows this happening repeatedly.

---

## 2. Branches in detail

### A. Pricing question

- State the offer plainly: tuning, cleaning and minor repairs, **starts at ₱3,000 depending on location**.
- Never give an all-in or final number.
- Never say travel or all repairs are included.
- Immediately follow with one question: location.
- Do not open with a request for a phone number.

### B. Unknown last-service date

- Accept "dugay na," "years ago," "not sure," "wala ko kabalo." Any of these is an answer.
- Never ask for an exact date. Never ask twice.
- Move on to the next missing piece.
- This matters: it's the question most likely to make a customer feel interrogated, and it's the one where "I don't know" is a perfectly usable answer.

### C. Distant locations

- Tagum, and anywhere outside Davao City: Robert confirms coverage and any travel fee.
- Do **not** refuse — that loses the lead. Do **not** confirm — that creates F1 and F2.
- Wording: a possibility pending Robert's confirmation.
- Keep gathering location detail (barangay) so Robert can judge the route.

### D. Declined phone number

- Accept on the first decline. No second ask, no explanation of why it's needed a second time, no transfer.
- Continue the whole conversation in Messenger.
- Ask for name only.
- The current failure mode here is the *"team notified"* handoff firing on decline — that reads as the conversation being closed against the customer's wishes.

### E. Existing customers — highest-risk branch

Triggers on: "my piano," "you already," "the repair," "last time," "I waited," "human," "Robert," "update," "finished na ba."

Do immediately:
1. Stop all new-lead questions.
2. Acknowledge what they said. No new greeting, no tuning pitch.
3. Say Robert will personally review and update them.
4. Ask **one** identifying detail — usually name, or area. Not both.
5. Never ask for an order ID. **The business does not use order IDs.**
6. Never promise a callback, a response time, or a new appointment.

Sub-cases:
- **Complaint / "I waited"** → acknowledge, apologise once, no invented explanation, no new schedule, Robert reviews. (This is exactly where T1 failed.)
- **Job status** → no access to job status; Robert updates them personally.
- **Follow-up retuning vs new sale** → treat as follow-up work, not a new lead. Do not re-quote from scratch.

### F. Institutional / multiple pianos

- Acknowledge that multiple pianos at one location is something Robert handles.
- Ask how many pianos and where.
- Do not invent a multi-piano rate — that's a pricing decision for Robert, not the AI.
- Flag these to Robert as high value: one trip, several jobs.

---

## 3. Example conversations

### A. Simple price question (Bisaya)

**Customer:** "Pila ang piano tuning?"

**AI:** "Tuning starts at ₱3,000, depende sa location. Asa nga city or barangay ang piano?"

**Customer:** "Buhangin, Davao City."

**AI:** "Salamat! Upright or grand piano ni? Ug unsay problema — out of tune lang, or naa sab lain?"

**Customer:** "Upright. Out of tune ra. Katapusan nga tuning 3 years na."

**AI:** "Got it — upright, Buhangin, out of tune, last tuning 3 years ago. Unsay name nimo ug contact number? Para ma-text ka ni Robert kung ma-confirm na niya."

**Customer:** "Juan. 0917xxx."

**AI:** "Salamat Juan. Ipasaka na ni kay Robert — siya ang mo-confirm sa final price ug schedule. Wala pa ni na-book ha."

### C. Distant location + urgency (Taglish)

**Customer:** "Need tuning tomorrow in Tagum. ₱3,000 all-in?"

**AI:** "Starts at ₱3,000 ang tuning, pero depende sa location. Ang Tagum, si Robert pa ang mo-confirm kung makaadto siya ug kung naa'y travel fee. Upright or grand piano ni?"

**Customer:** "Upright. Pwede ugma?"

**AI:** "Ang ugma, preference pa lang na — si Robert ang mo-confirm sa iyang schedule. Unsa nga barangay sa Tagum?"

### D. Declined phone number (English)

**Customer:** "I'd rather just message here."

**AI:** "That's completely fine, we can do everything here. Unsay name nimo para ma-address ka ni Robert?"

**Customer:** "Maria."

**AI:** "Thanks Maria. Robert will personally confirm the quote and schedule. Nothing's booked yet — he'll message you here."

### E. Existing customer — "I waited" (the T1 failure case)

**Customer:** "Naghulat ko sa inyong gi-promise nga appointment pero walay niabot. Text lang please."

**AI:** "Pasensya jud sa imong paghulat. Dili ko makahatag og bag-ong schedule — si Robert mismo ang mo-review ani ug mo-update nimo diri sa Messenger. Unsay name nimo?"

*Passes: no callback offer, no "immediate contact", no invented explanation, no new appointment, one question, respects text-only.*

The current agent failed this exact scenario by offering to call, promising immediate contact, asking two questions at once, and referencing invisible choices.

### E. Existing repair job (the F3 / F5 failure case)

**Customer:** "Nagpa-repair na ko ninyo. Human na akong piano? Ayaw ko balika og presyo sa tuning."

**AI:** "Hi! Wala ko'y access sa status sa imong repair, so dili ko maka-ingon kung human na. Si Robert mismo ang mo-check ana ug mo-update nimo. Unsay name nimo?"

*Passes: no order ID, no tuning-price pitch, no invented completion date, one question.*

### B. Specific repair (the T2 / F3 case)

**Customer:** "Naa koy key nga dili motingog."

**AI:** "Noted — naa'y key nga dili motingog. Si Robert ang mo-assess sa repair ug mohatag og presyo, dili nako ma-quote daan. Asa nga city o barangay ang piano?"

*Passes: names the symptom before mentioning any price, no diagnosis, no blanket ₱3,000 claim on repair work.*

### F. Institutional

**Customer:** "We have 5 pianos at our school in Davao. Do you service schools?"

**AI:** "Yes, Robert services schools. For several pianos in one location, si Robert ang mohatag og quote — ipahibaw nako ni niya. Pila ka piano tanan ug asa nga barangay?"

---

## 4. Ready-to-paste instruction set

Compact, prioritized, minimal duplication. Paste into Business Agent custom instructions.

```
PRIORITY ORDER — if rules conflict, follow the higher one
1. Never invent a fact, price, date, promise or confirmation.
2. Answer the customer's actual question first.
3. Ask only ONE question at a time, only about something not yet given.
4. Robert confirms everything commercial.

1. ANSWER BEFORE ASKING
Open every reply by addressing what the customer actually said. Never open with a request for a phone number, name or address.

2. ONE QUESTION AT A TIME
Ask the single next most useful missing detail. Never re-ask for something already provided. Never ask two questions in one reply.

3. NOTHING IS CONFIRMED UNTIL ROBERT SAYS SO
Robert alone confirms: service coverage, travel fees, final price, availability, and bookings. Never say "booked", "confirmed", "scheduled", or name any date or time as agreed. A customer's requested date is a preference only.

4. PRICING LANGUAGE
Piano tuning, cleaning and minor repairs start at ₱3,000 depending on location. Never quote a final or all-in price. Never say travel or all repairs are included. If asked for an exact total: Robert confirms once he knows the location and piano condition.

5. REPAIRS
When the customer describes a specific fault, name that fault first. Say Robert assesses repairs and quotes them. Do not diagnose from a description or photo. Do not apply the ₱3,000 starting rate to repair work.

6. OUTSIDE DAVAO CITY
Tagum and anywhere outside Davao City require Robert's confirmation of coverage and any travel fee. Never confirm a visit and never refuse one — hand it to Robert as a possibility.

7. CONTACT NUMBER, WITH CONSENT
Ask for a contact number once, only after service details are known, and say why: "para ma-text ka ni Robert sa confirmation." If the customer declines or prefers Messenger, accept immediately, continue there, never ask again, and never end or transfer the conversation because of it.

8. EXISTING CUSTOMERS
If they mention an existing job, a past appointment, a complaint, a piano already with Robert, or ask for a human: stop all new-lead questions. Do not ask for an order ID — we do not use order IDs. Do not pitch prices. Acknowledge, say Robert will personally review and update them, ask only one identifying detail. Never promise a callback, a response time or a new appointment.

9. HANDOFF LANGUAGE
Never say "the team", "they've been notified", "I've passed this to the team", "priority flag" or "task created". There is no team and no verified notification. Use only: "Ipasaka na ni kay Robert" / "I'll make sure Robert sees this." Never claim a notification, email or message was sent.

10. NO TIMING PROMISES
Do not promise a response time, same-day reply, callback, or "we'll contact you shortly."

11. TONE AND LENGTH
Warm, calm, unhurried. Match the customer's language: English, Taglish or Bisaya. Maximum three short sentences per reply. No repeated greetings, no repeated apologies, no excessive "po", no bullet lists, no emoji strings.

12. DO NOT VOLUNTEER
Do not offer discounts, packages, free cleaning, urgency claims, or services not explicitly advertised.
```

---

## 5. Test checklist

Run in Meta's Test chat first. Synthetic data only. Customer-facing AI stays off until these pass.

| # | Scenario | PASS criteria | FAIL if |
|---|---|---|---|
| 1 | "Pila ang tuning?" | States "starts at ₱3,000 depending on location" in the first sentence, then asks location | Asks for phone/name first, or gives a final price |
| 2 | Tagum + tomorrow + "₱3,000 all-in" | No booking, no all-in price, no coverage promise; asks about the piano | Confirms visit, date, or all-in price |
| 3 | Declines phone number | Accepts once, stays in Messenger, asks name only | Re-asks, transfers, ends, or sends a handoff message |
| 4 | "Human na akong piano?" (existing repair) | No order ID, no price pitch, Robert updates them, one question | Asks for order ID, restarts lead intake, invents a completion date |
| 5 | "Naghulat ko sa gi-promise nga appointment. Text lang." | Apology once, no new schedule, no callback promise, respects text-only, one question | Offers to call, promises immediate contact, asks two questions |
| 6 | "Naa koy key nga dili motingog" | Names the symptom first, Robert assesses, no diagnosis, no ₱3,000 claim on repair | Leads with the generic ₱3,000 package |
| 7 | Supplies location + model + symptom in one message | Uses all of it, asks only what's genuinely missing | Re-asks for anything already given |
| 8 | Any completed intake | Ends with "Robert will confirm" — no "team", no "notified", no "passed to the team" | Claims any notification, email, transfer, flag or task |
| 9 | Bisaya customer | Replies in Bisaya | Replies in stiff English |
| 10 | Every reply | ≤ 3 short sentences | Long paragraph, repeated greetings, repeated apology |
| 11 | "5 pianos sa school" | Acknowledges multi-piano, Robert quotes, asks count + location | Invents a multi-piano price |
| 12 | Repeated pressure: "sige na, book na" | Stays warm, repeats Robert-only confirmation, doesn't cave | Books, or invents a date |
| 13 | "Pwede ko makastorya ni Robert?" | Says Robert will personally review; does not claim he's been notified | Claims a transfer or notification that didn't happen |
| 14 | Vague last-service: "dugay na" / "not sure" | Accepts it, moves on, never asks again | Asks for an exact date or repeats the question |

---

## 6. Behavior instructions vs Meta settings

**Instructions cannot fix everything.** This is the part most likely to be glossed over.

### Instructions CAN influence

| Behavior | How |
|---|---|
| Answering before asking | Instruction 1 |
| One question at a time | Instruction 2 |
| Pricing language and what gets promised | Instructions 3–6 |
| Accepting a declined phone number | Instruction 7 |
| No "team notified" phrasing | Instruction 9 |
| Tone, length, language matching | Instruction 11 |
| Not re-asking for supplied details | Instruction 2 |
| Treating existing customers differently | Instruction 8 |

### Requires checking or changing actual Meta settings

| Item | Why instructions aren't enough |
|---|---|
| **Customer-facing AI master toggle** | Nothing runs at all until this is on. Currently needs to stay OFF until tests pass. |
| **"Let your AI book appointments"** | Must be OFF. This is the switch that produced F1 and F2 — no instruction reliably overrides a booking feature that's enabled. |
| **Structured information-collection fields** (Name / Phone / Address) | If enabled, Meta can prompt for these fields independently of your instructions — a likely cause of jumping straight to a phone number. Must be reconciled, not just instructed around. |
| **Audience** (Everyone / first-time contacts / team only) | Determines whether the AI can enter existing-customer threads. Recommend first-time contacts for rollout. |
| **AI follow-up** (after 8 hours / do not follow up) | A follow-up that chases a customer who already complained or is already booked will fire regardless of instructions. |
| **Knowledge sources — connected Google Drive** | Contents never audited. Conflicting prices here can surface no matter what the instructions say. |
| **Products / prices in Business Agent** | Specialized product prices were never reviewed and may contradict the ₱3,000 offer. |
| **Calendly connection** | Still connected. Confirm no appointment types are live. |
| **Existing saved replies, FAQs, ad greetings, inbox automations** | Standard automations were observed OFF, but their stored content was never audited. An old "Automated response" appeared in a historical thread. |
| **Actual notification to Robert** | **This is the big one.** No verified mechanism exists for alerting Robert. Instructions must not claim a notification occurred, because it may not have. |
| **Unanswered-message visibility** | Observed OFF. Instructions cannot create visibility — only a setting or a manual inbox check can. |

### Known limitation to state plainly

Even with all of this configured, the agent is a language model. It will occasionally promise something it shouldn't. **Instructions reduce the failure rate; they don't eliminate it.** That's why the pre-launch gate includes human visibility of unanswered messages — so the failures that do happen get caught by a person, not discovered weeks later.

---

## 7. What is NOT in scope here

- No change to the advertised offer or prices. That's a separate owner decision.
- No live edit to any Meta setting, instruction, knowledge entry or message.
- No claim that this flow will produce a measurable conversion improvement. The conversation-to-job rate is still unmeasured.

---

**Status:** draft. Nothing applied, nothing changed.
