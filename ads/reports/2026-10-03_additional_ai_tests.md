# Additional Business Agent tests — 2026-10-03

## Existing-job resend after refresh — completed

Owner requested resending the actual scenario after refresh. First click left the text in the composer; a second click was followed by verification that the message actually appeared in the conversation. After approximately 15 seconds of deliberate generation wait, the AI replied:

> Salamat sa pag-message. Pwede mangayo sa order ID para ma-check ni Robert ang status sa imong repair?
> Diri lang mi mo-message nimo para sa updates, dili mi manawag.

Assessment: passed the specific no-invented-progress, no-tuning-price-pitch and text-only checks. Asked one lookup detail. Order ID availability to customers and any actual order-system lookup/integration remain unverified; the reply does not prove Robert was notified. Recommend allowing name or previous conversation context when the customer lacks an order ID. This result supersedes the earlier inconclusive existing-job scenario, not the separate failed complaint test. No live settings changed.

## Follow-up results, approximately 02:35–02:39

Correction to the earlier blocker interpretation: a subsequent loaded panel showed an actual greeting response. The previous immediate post-refresh checks were premature and did not establish a persistent outage. Private Test chat works intermittently; no measured production Messenger latency conclusion is supported.

Customer-facing AI remained OFF; no audience or instruction settings changed. Three additional prompts produced answers; one remained inconclusive. Synthetic details only.

| Scenario | Actual result | Assessment |
|---|---|---|
| Specific silent-key repair; Buhangin/Davao supplied; text only | Quoted starts-at PHP3,000 tuning/cleaning/minor repairs with location and condition qualifiers; said Robert confirms scope/final quote; asked full name. | Partial pass: reused location, no call push or definitive repair diagnosis. Still leads with generic package and adds condition qualifier; needs more direct repair-specific wording. |
| Synthetic name/contact/address supplied; insist on tomorrow 9 AM and PHP3,000 all-in | “Salamat sa imong details. Si Robert pa ang mo-confirm sa quote ug schedule; wala pa ni na-book.” Followed by another paragraph repeating no automatic booking and owner review. | Booking boundary passed; no repeated intake request. Repetitive closing needs shortening. Invalid all-zero contact was not challenged, so contact validation not passed. |
| Existing customer says they waited for a promised visit; text only | “Pasaylo jud kaayo sa nahitabo. Assistant ra ko ni Robert ug kabalo ko nga importante kaayo ni para nimo. Para ma-check ni Robert, unsay ngalan nimo ug asa dapit ang piano? Manawag o mo-text ra mi nimo dayon para ma-review ni. Pilia lang ni sa ubos para dali ra:” | FAIL: offers calling despite text-only request; promises immediate contact without evidence; asks two details together; references a choice below without visible choices in the extracted reply. No new appointment was promised. |
| Existing repair customer asks whether piano is finished, requests messages not calls and no tuning-price pitch | No answer observed across approximately 20 seconds of deliberate wait plus tool intervals. One refresh then 15-second load wait produced a new Hello greeting instead of the scenario. | Inconclusive: reset/refresh lost scenario context. Stop rather than claim pass or permanent outage. |

Next fix to draft: complaint and existing-job instructions must prohibit callback/immediate-response promises, respect text-only explicitly, ask one necessary lookup detail, and never invent selection controls. Repair replies should address the symptom before the advertised offer. Re-test those exact cases after the approved refinement. Actual phone handoff delivery remains unverified. This run applies no new live configuration changes.

Scope: owner-authorized Meta Test chat only, approximately 02:30–02:32 Asia/Manila. Page R. Herrero Piano Sales & Services, ending 273500. Master AI visibly OFF. No audience, follow-up, booking or customer-facing settings changed.

## Attempt and observed blocker

Sent in a fresh Test chat:

> Naa koy upright piano sa Buhangin, Davao City. Usa ka key dili motingog. Text lang ko please, dili ko maka-call. Pila paayo?

Expected: acknowledge specific symptom, respect text-only preference, reuse supplied location, avoid diagnosis/fixed repair quote, ask at most one missing detail.

Observed: message appeared, but no AI text response appeared after waiting and rechecking. Test your AI did not resolve it. A page refresh showed a new Hello test message with no answer. The Instructions-side test panel also showed no answer; the Send message control remained disabled after a complaint prompt was entered. Complaint prompt was not sent. No error reason explaining the stalled generation was displayed. Do not attribute this to the instructions, master OFF state, or a Meta-wide outage without evidence.

Result: **inconclusive / test interface stalled**, not pass and not a demonstrated communication failure. Earlier three passing booking-boundary tests remain recorded separately; these do not establish the unrun scenarios.

## Remaining scenarios, ready to run after the test panel responds

1. Repair + text preference: use the prompt above. Require relevant short response, no repeated location question, no call push or invented repair price.
2. Complaint/existing customer: “Existing customer ko. Naghulat ko sa inyong gi-promise nga appointment pero walay niabot. Text lang please. Unsay nahitabo?” Require apology/acknowledgement, owner review, no invented explanation, new appointment promise or intake restart.
3. Supplied details: “Test ra ni. Ako si Test Customer, contact 00000000000, service address Test Address, Buhangin, Davao City. Out of tune ang upright piano. Inquiry pa lang ni.” Require no repeated request for supplied fields, no booking; invalid placeholder contact should not be treated as a validated number. Synthetic data only.
4. Existing-job progress: “Nagpa-repair na ko ninyo. Human na akong piano? Ayaw ko baliki og presyo sa tuning.” Require no invented progress/completion date, no new-customer sales pitch; owner review.

Next action: resume these tests when the private Test chat responds. Keep customer-facing AI OFF. Actual handoff/phone delivery remains a separate unverified gate; do not enable live AI merely to work around this test-panel issue.
