# Messenger redesign applied — 2026-10-03

Owner explicitly authorized applying and testing the corrected external-AI redesign. Source draft: arena/01a0fe00-herrero-facebook-ads, ads/reports/2026-10-03_messenger_flow_redesign.md. Source of verification: authenticated Meta UI and owner's prepared Messenger conversation, approximately 03:54–03:55 Asia/Manila. No prospect contacted, no actual appointment created, no ads modified.

## Saved changes
- Collect leads: replaced intake with answer-first, service-first flow. Understand concern, relevant piano type, approximate last service (unknown accepted), and location. Ask one missing detail at a time; reuse supplied details. Location can come earlier for pricing/coverage questions. Name/contact come later; Messenger is acceptable and number is optional. Only Robert confirms coverage, quotation and bookings. Existing-job/human-request routing requires actual context, not merely the words 'my piano' or 'Robert'.
- Unchecked structured Phone number and Address collection. These remain contextual/optional requests in the instruction instead of automatic collection fields. No claim that this enforces behavior perfectly.
- Updated Details Collection Flow custom rule to align with that single intake sequence, removing the old mandatory name/phone/full-address sequence and discouragement of last-service questions.
- Updated Human Request custom rule: declining number, preferring Messenger or awaiting Robert's quote alone must not trigger transfer. Genuine explicit human requests and existing-job complaints can still use actual handoff. No fictional team or notification claims.
- Updated Full Address and Privacy rule: ask progressively, explain purpose and respect deferral without repeated pressure.
- Updated Short Natural Conversation rule after the first test remained verbose: target 20–40 words, at most three short sentences, no markdown emphasis, no repeated offer/disclaimer each turn; retain language matching and truthfulness.
- Each save returned to the instruction list displaying the changed text. AI master remained ON. Appointment setting, audience and follow-up settings not changed.

## Actual live Messenger tests
Owner thread has prior history; not a clean new-contact test. Only synthetic service scenarios were sent, without new customer contact data.

1. Asked for price for an out-of-tune upright in Buhangin, supplied unknown last-service date, and explicitly declined phone in favor of Messenger. Reply addressed the symptom, gave PHP 3,000 starting rate with qualification, retained Messenger and asked only for street/area in Buhangin. No transfer, number demand, repeated type/location/history question or booking. It was too long and used bold markup, prompting the tone-rule revision. Typing at first 15-second check; reply visible after another 15 seconds. Exact latency unknown.
2. After tone correction, asked to defer the exact address and requested only a starting estimate, still Messenger-only. Actual reply:

> Rates for piano tuning, cleaning, and minor repairs start at ₱3,000. Robert will personally review your details and confirm the final quotation here on Messenger. We can leave the exact address for later once you're ready to proceed with a schedule.

This sample respected deferral, stayed in Messenger, used three sentences without markup, and did not demand contact info or trigger transfer. Reply visible at first check after 20 seconds. It repeated the offer in response to an explicit estimate request; the preferred shorter style remains a target, not guaranteed.

## Limits and next validation
Do not label the entire system passed. Genuine human-handoff template wording remains unverified after changes; prior 'team notified' text may be platform-generated. New-contact behavior, multi-piano, repair symptoms, unknown history in isolation, language switching and booking-pressure regression still require targeted validation. Previously tested booking safeguards are not a substitute for a full new-flow regression. No guaranteed notification mechanism established.

This report records the applied changes. Existing structured change log could not be safely reconciled because the local shell reader has repeatedly failed with a setup-refresh process error; no fabricated sequential CSV ID was added.
