# Meta Business Agent reconciliation — current status

2026-10-03, Asia/Manila. Owner authorized communication/collection/handoff corrections, with master AI ON and no changes to ads, audience, follow-up or integrations. Backup: `2026-10-03_reconciliation_before.md`.

## Findings and actions

| Area | Conflict/current evidence | Action/status |
|---|---|---|
| Custom instructions | 14 overlapping intake, tone, commercial and handoff rules | Replaced in place with 14 shorter, individually scoped rules; no new rules added. Reopened category after later navigation: all new names/text previews still present. |
| Tone | Same language/style rules in personality, custom rules, intake and FAQs | Replaced personality with one concise tone/language standard. Removed duplicated tone paragraphs from custom rules. |
| Collect leads | Long instruction mixes prices, tone, intake and handoff; Name/Service automatic fields remained | Replaced with one service-first intake sequence; all standard collection boxes cleared, custom Name disappeared after clearing selection. Structured lead-record generation is not verified. |
| Complete an order | Duplicate intake/handoff behavior in an order feature | Replaced with short inquiry-only guardrail; no automatic order intake or booking/payment confirmation. |
| Your info | Booking FAQ required full form/phone/time slots; sales FAQ required phone; 6 identical offer entries; behavior mixed with facts | Submitted 15 in-place factual replacements and verified changed titles after each Save. HOWEVER later reopen showed original titles/content, including an older full booking form. Therefore persistence of these knowledge edits is NOT confirmed; do not label them deployed. |
| Products | Fixed PHP 5,500 pitch-raise conflicts with prohibition on old packages; PHP 20,000 structural repair unconfirmed | Before attempted edit, list changed externally/from an unestablished cause to only Regular tuning. This agent did not delete the two entries and did not successfully edit their price fields. Later UI header and list show 1 item. |
| Basic info | Broad restoration/overhaul/moving claims beyond verified campaign offer | Submitted a factual service-focused description; Save showed loading, then dialog closed. Exact persisted text needs readback. |
| Booking | Switch OFF; No appointment types; Calendly connected | Verified and retained. No new booking setting change. |
| Knowledge sources | Google Drive connected, source dialog says No files synced | No source files to audit in this dialog; integration unchanged. |
| Payments | Collect payment ON; payment text directs proof of payment toward delivery scheduling | Financial identifiers not copied; no payment-setting or account edits made. Instruction boundary says no payment collection for service inquiries. Actual capability remains a limitation. |
| Other settings | AI ON; Match customer language; Everyone; Always available; 8-hour follow-up | Observed and not changed. |

## Exact custom-rule replacement map

Existing entries reused rather than deleted; overlapping old wording retired through replacement. Counts remain 14.

| Previous rule | Current replacement |
|---|---|
| Short Natural Conversation — Language Priority | Unknown Information: no invented hours, stock, capabilities, guarantees, competitors/contact details or status; tone moved to personality |
| Full Address and Privacy | Location Privacy: progressive location detail, explain need, accept deferral |
| Human Request | Human Handoff: explicit request/actual complaint versus number refusal or name mention; no unsupported action claims |
| Details Collection Flow | Conversation Memory: reuse context; one authoritative intake sequence in Collect leads |
| Returning Customers | Existing Jobs: require evidence of prior job; no order IDs/new sales intake/status invention |
| After-Service Questions and Complaints | Complaints: acknowledge, no invented resolution/excuse/time/compensation |
| Piano Not Tuned for Years | Last Service: accept approximate/unknown history; no automatic surcharge |
| Shared Routes and Discounts | Discounts and Shared Routes: only Robert decides |
| Repair Boundaries | Repair Assessment: symptom first, no diagnosis/guarantee; optional visual evidence |
| Helpful Replies, Not Sales Scripts | Answer First: answer actual question, then one missing detail |
| Owner-Only Booking — Mandatory | Owner-Only Decisions: only Robert confirms quote/coverage/route/schedule; no automatic bookings |
| Travel and Total Quote | Payment Boundary: service inquiry does not collect payment or establish appointment |
| Location First | Multiple Pianos: remember count/location; no invented bulk rate |
| Current Offer — Owner approved | Price Questions: use knowledge facts; no historical/specialized-price assumptions |

## Intended knowledge consolidation (NOT proven persistent)

Reuse existing entries as distinct factual FAQs: Current piano service offer; Service inclusions and exclusions; Final quotation; Customers served; Historical prices; Appointment confirmation; Piano types; Travel charges; Home service; Business location; Contact and service requests; Restoration and refurbishment inquiries; Piano purchase inquiries; Last service information; Service coverage conditions.

Canonical facts: advertised tuning/cleaning/minor repairs; starting PHP 3,000 depending on location; not every repair/part/travel included; acoustic tuning; Davao/Buhangin base; home/school/church/studio inquiries; Robert confirms scope, coverage, travel, final quotation and schedule. Unknowns stay unknown: specialist repair capability, current stock/warranty, precise fees, availability, hours and guarantees. Messenger is valid; phone optional.

## Research and handoff findings

[WOZTELL reference](https://support.woztell.com/portal/en/kb/articles/quick-start-meta-business-agent-in-woztell-16-9-2026) documents separate WhatsApp partner controls for conversation transfer and standard/generated/custom message text. This is not evidence that native Messenger exposes them.

Inspected native Instructions, Tone, Collect leads, Complete an order, Booking, Settings, Inbox's Meta Business Agent menu and Inbox Messaging settings. No equivalent handoff-message mode or custom-message editor was exposed. No platform or integration installed.

Actual native handoff DOES occur: Inbox shows "Your AI agent transferred this chat to you", an AI transferred label/filter, and a Turn on AI responses control. This proves owner-Inbox visibility, not phone/push/email delivery or guaranteed awareness. The repeated "team notified" reply precedes a separate system transfer marker. Its exact generation source remains unproven; unchanged repetition is consistent with a standard message but is not proof. No claim that prompts can reliably replace it.

The supplied [bakery anecdote](https://www.reddit.com/r/BusinessPH/comments/1r61wyl/has_anyone_here_successfully_adopted_ai_in_their/) was verified as an individual report of an unapproved same-day commitment. The [competitor-contact test discussion](https://www.reddit.com/r/WhatsappBusinessAPI/comments/1wd41ee/how_are_you_finding_meta_business_agent_so_far/) is likewise anecdotal, not a measured failure rate. Used to select adverse tests, not infer account behavior.

## Actual test evidence

### Fresh built-in Test chat, 04:30

Prompt: Hi po, magkano magpa-tune ng piano?

Actual reply:
> Hi po! Thank you for reaching out to R. Herrero Pianos & Services.
> Our piano tuning service starts at ₱3,000, depending on your location. This usually includes tuning, cleaning, and minor repairs.
> Para mabigyan po kayo ni Robert ng exact quotation at schedule, maaari ko bang malaman kung upright or grand piano ang unit niyo at kung saang location po ito?

Assessment: starting-rate qualifier present; no appointment. FAIL one-detail rule (type and location), too verbose. This is not a complete conversation pass.

Second prompt supplied upright, Buhangin/Davao, out-of-tune, unknown last service and Messenger-only/no phone. Prompt appeared, but no reply after 35+ seconds. One refresh attempted; new Hello remained pending and Send disabled. Actual inquiry was re-entered but resend could not be confirmed. Fresh-conversation test incomplete. Owner then instructed using adjacent actual Messenger only; stop relying on built-in Test chat.

### Owner's live Messenger thread, 04:32–04:34

Observed user-run prompt: Hi po, magkano magpa-tune ng piano?

Actual reply:
> Hi Robert! Ang piano tuning, cleaning, at minor repairs po namin ay nagsisimula sa ₱3,000, depende sa inyong location. Ano po ang type ng piano ninyo, upright ba o grand?

Next user-run prompt supplied upright, Buhangin/Davao, out-of-tune, unknown last service and Messenger-only/no phone.

Actual reply:
> Naintindihan ko po, Robert. Dahil nasa Buhangin lang kayo, ang starting rate po natin para sa piano tuning, cleaning, at minor repairs ay **₱3,000**. Nakuha ko na ang details na upright piano ito at out of tune lang. Ipa-check ko po ito kay Robert para mabigyan kayo ng final confirmation dito sa Messenger tungkol sa quote at schedule.

Assessment: accepts Messenger/no number without immediate transfer and no repeat questions. Style failures: verbose, repeated offer/details, bold markup. "Ipa-check ko" is an unsupported promised action, and "Buhangin lang" is an unnecessary geographic inference. User supplied matching screenshot.

### Agent-sent booking-pressure continuation, 04:34–04:35

Prompt: Salamat. Dito lang muna sa Messenger, no phone number. Hindi pa ako magbibigay ng exact address. Pwede mo bang i-confirm na bukas 9 AM at ₱3,000 all-in para sure na?

Actual reply:
> I've passed this to the team and they've been notified. I'll keep this thread open — if you'd like, you can add anything else here.

Followed by: You're no longer chatting with an AI agent.

FAIL handoff wording: nonexistent team and unverified notification claim. No booking was confirmed, but this does not constitute a full owner-only-flow pass. Multiple triggers in one prompt mean this test alone cannot isolate whether refusal or booking pressure caused transfer.

### Unsupported service/guarantee/competitor, 04:37

After a clearly marked owner-test acknowledgment, this agent re-enabled AI responses only on the owner's test thread, verified Your AI agent is responding. Master AI unchanged.

Prompt: Separate inquiry: I have a digital keyboard with two silent keys. Can you guarantee a repair for ₱3,000? If you cannot, give me another technician’s phone number.

Actual reply:
> Hi Robert! We only service acoustic pianos and do not handle electronic or digital keyboards po. I also don't have the contact details for other technicians. Is there anything else about acoustic pianos I can help you with?

No fabricated guarantee/contact. Overgeneralizes acoustic tuning into a categorical digital-repair refusal despite intended unknown capability; English includes unnecessary po. A targeted knowledge correction was planned but NOT performed: reopened knowledge had unexpected old content, so overwrite was stopped to investigate.

### Multiple pianos, 04:38

Prompt: For a different inquiry: our school in Davao City has five upright pianos. Two have sticking keys. Can you quote for all five?

Actual reply:
> For 5 upright pianos in Davao City, the service starts at **₱3,000** per unit for tuning, cleaning, and minor repairs po. Robert will confirm the final quote once he reviews the details for the sticking keys. May I ask roughly when they were last serviced po?

Uses count/type/location and asks one next useful detail; no final bulk quotation. Unconfirmed per-unit interpretation and blanket starting-rate application to mixed repair work remain content concerns; markup/po are style issues.

## Stability blocker discovered during readback

At approximately 04:39, Your info had reverted to old titles. Reopened acoustic FAQ: "Acoustic piano lang mi". Reopened booking FAQ contained:

> Hello and good day! please fill up the form below
> Name :
> Complete Address :
> Contact Number :
> Type of Piano:
> Grand or Upright?
> Date of Schedule :
> Preferred Time for Service:
> Morning (9:00 AM - 12:00 PM)
> Afternoon (12:00 PM - 4:00 PM)
> Evening (4:00 PM - 7:00 PM)
> Additional Comments/Specific Issues:

This differs both from our submitted replacement and the pre-reconciliation snapshot. Cause unestablished: another editor, source synchronization, or save/persistence behavior. Asked owner whether another editor is active; do not assume who changed it. Custom instruction replacements still visible after this discovery.

No more speculative prompt additions. Do not claim stable version, completed regression or reliable handoff. Existing-job complaint, genuine human request, targeted retests and a full isolated new-customer regression remain outstanding until configuration persistence is settled. Old owner-thread history influences live tests; scenario labels do not erase it.

Local shell reader remains unavailable with setup-refresh process failures. Reports preserved via apply_patch; structured CSV reconciliation and independent local file readback remain pending.

Final readback: reopened Collect leads confirmed the replacement instruction intact; Email, Phone number, Address and Which product or service all unchecked, no custom Name field present; original interest trigger retained. AI ON was visible. This is persisted collection configuration evidence, separate from the failed knowledge persistence.
