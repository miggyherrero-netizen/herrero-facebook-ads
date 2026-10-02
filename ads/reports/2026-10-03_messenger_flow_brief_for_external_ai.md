<!--
COPY EVERYTHING BELOW THIS LINE INTO ANOTHER AI.
Self-contained: includes business context, verified current setup, and observed real failures.
Nothing below depends on any external file.
-->

---

# Redesign the Messenger conversation flow for R. Herrero Piano Sales & Services

## 1. The task

Redesign the Messenger conversation flow for **R. Herrero Piano Sales & Services**, using **Meta's built-in Business AI** (Meta Business Agent, configured inside Meta Business Suite → Inbox → Business Agent).

**Robert is the sole owner/operator.** There is no team, no staff, no dispatcher. The AI should answer inquiries warmly, gather useful details, and prepare requests for Robert's review. **Only Robert confirms service coverage, final quotations, availability and bookings.**

## 2. Business context

| Item | Detail |
|---|---|
| Business | R. Herrero Piano Sales & Services, Facebook Page (asset ID ending 273500) |
| Owner / operator | Robert — sole technician. Personally does all quoting, routing and scheduling. |
| Services advertised | Piano tuning, piano cleaning, and minor repairs |
| Price | **Rates start at ₱3,000, depending on location.** Do not assume all repairs or travel are included. |
| Base | Davao City |
| Service area | **Davao area only** for current planning. Locations such as Tagum require Robert's confirmation of coverage and any travel fee. General Santos City is not currently in scope. |
| Capacity | Robert can do 3–5 piano jobs per day. Rest day is not fixed. |
| Customer segments | Homes, schools, churches, music studios, other establishments |
| Languages customers use | English, Taglish, Bisaya/Cebuano — often mixed inside one conversation |
| Responder today | Meta Business Agent AI |

## 3. Current offer — exact wording to use

**"Piano tuning, piano cleaning and minor repairs. Rates start at ₱3,000, depending on location."**

Hard limits on this offer:
- It is **not** an all-in price.
- It does **not** mean every repair is included.
- Travel is **not** automatically included.
- Coverage outside Davao City is **not** guaranteed.

## 4. What needs improvement

1. **Natural conversation flow.** The AI currently jumps straight to asking for a phone number. It should answer the customer's question first, then build up the picture Robert needs: piano type, condition/concern, last service, and exact location. Ask **one relevant question at a time** and remember details already provided — never ask twice.

2. **Consent and contact preference.** Ask politely for a contact number and explain its purpose. If the customer prefers Messenger, continue there without pressure, without repeating the request, and **without automatically transferring or ending the conversation** just because they declined.

3. **Warm, concise tone.** Calm, kind, accommodating, not scripted. Natural English, Taglish or Bisaya matched to the customer. Avoid long paragraphs, repeated explanations, repeated greetings and excessive "po."

4. **Accurate expectations.** Never promise a booking, a fixed travel-inclusive price, a response time, a diagnosis, or service coverage without Robert's confirmation.

5. **Better owner handoff.** The current reply says: *"I've passed this to the team and they've been notified."* **There is no team.** Do not claim notifications, priority flags or tasks were created unless the system actually performed them. The source of this repeated handoff sentence — a Meta template or a generated reply — is still unverified. Design wording that is truthful regardless.

6. **Separate new inquiries from existing customers.** Complaints, appointment updates and existing-job questions must not restart lead collection and must not request an order ID. **The business does not use order IDs.**

## 5. Real observed failures — design against these specifically

These are paraphrased from actual Messenger conversations (sample of 10 threads active Sep 3 – Oct 2, 2026) and from controlled tests of the current agent. They are real customer interactions, not hypotheticals.

**F1 — Customer waited for an AI-confirmed appointment.** An AI-marked reply offered slots, confirmed an appointment and total including travel, requested an email again after it was supplied, and promised email confirmation. A later AI follow-up asked if the customer was still interested *despite* the confirmation. The customer later reported waiting for the visit. Robert apologised for the mistaken booking.

**F2 — Second booking-confusion case.** Robert explicitly apologised to another customer for an unexpected AI booking. The customer then asked whether the visit would still proceed, followed up again, and later supplied location only after Robert requested details again.

**F3 — Repair question answered with a price paragraph.** A customer described stiff keys and damaged straps. The AI gave a multi-item intake checklist, repeatedly returned to the tuning price, promised onsite repair and immediate team assistance, and showed a system transfer marker. No owner reply followed in the visible exchange.

**F4 — Customer who supplied everything and got no reply.** A prospect sent location, piano model and a specific symptom in one short message. No business response was visible.

**F5 — Existing customer preferred text, not calls.** A repair customer explicitly requested written messages over calls. Call prompts appeared across multiple threads, including a complaint thread.

**F6 — Existing client confused about follow-up work.** A client postponed a retuning visit and later questioned whether the original tuning had been finished — follow-up work mistaken for a new sale.

**F7 — Repeated intake friction.** Prospects who had already supplied substantial detail were asked for it again.

**Controlled test failures (current agent):**

**T1 — FAILED:** Existing customer says they waited for a promised visit, requests text only. The agent apologised, then **offered to call**, **promised immediate contact**, **asked two details at once**, and referenced a choice selector that was not visible.

**T2 — PARTIAL:** Specific repair (silent key), Buhangin supplied, text only. Quoted the ₱3,000 starting rate with qualifiers and correctly deferred to Robert — but **led with the generic package instead of addressing the symptom**, and added extra condition qualifiers.

**T3 — PASSED (with note):** Customer supplied name/contact/address and insisted on tomorrow 9 AM at ₱3,000 all-in. Correctly refused to book or quote all-in. Note: contact validation did not challenge an obviously invalid placeholder number.

**T4 — PASSED:** Tagum + tomorrow 9 AM + ₱3,000 all-in. Correctly deferred route, schedule and travel fee to Robert.

## 6. Deliverables required

1. **Recommended conversation flow** with explicit branches for:
   - pricing questions
   - unknown last-service date
   - distant locations (Tagum and outside Davao City)
   - declined phone numbers / Messenger-only preference
   - existing-job questions, complaints and previously promised appointments
   - (recommended) institutional inquiries — schools, churches, studios with multiple pianos

2. **Short example conversations** showing natural replies, in English, Taglish and Bisaya.

3. **A compact, ready-to-paste Meta Business AI instruction set** with clear priorities and minimal duplication. It must be small enough to paste into the Business Agent custom-instructions field without redundancy.

4. **A test checklist** with specific pass/fail criteria per scenario.

5. **A clear distinction between:**
   - what **behavior instructions can influence**
   - what **requires checking or changing Meta's actual settings** (switches, structured fields, knowledge sources, integrations)

## 7. Hard constraints

- **Do not invent business facts.** No prices, travel fees, service inclusions, response times, credentials, testimonials, guarantees or coverage areas beyond what is stated above.
- **Do not claim that instructions guarantee perfect AI behavior.** Note where behavior depends on model compliance versus enforced settings.
- **Never promise a notification, email, transfer, task or flag** that the system has not demonstrably performed.
- **The goal: customers should feel helped, not interviewed.**
- Keep replies short — aim for a maximum of about three short sentences.

## 8. Definition of a Robert-ready inquiry

The AI's job is to hand Robert enough to quote and route without a second round of questions:

- location (city/municipality and barangay)
- piano type (upright / grand / digital)
- the concern or symptom
- roughly when it was last serviced
- customer name and a way to reach them (Messenger is acceptable)

Contact details come **last**, after the customer has already been helped — not first.

---

<!-- END OF COPY-PASTE BLOCK -->
