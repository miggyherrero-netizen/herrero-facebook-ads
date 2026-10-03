# Live Messenger owner test

2026-10-03 03:32–03:33 Asia/Manila. Owner explicitly requested testing in the prepared adjacent Messenger tab. Only the owner's conversation with the business Page was used; no prospect was contacted.

The thread had previously transferred to a human. Meta required an owner response before enabling AI again. Sent a clearly labeled owner-test acknowledgment, then enabled AI responses for this thread; UI verified "Your AI agent is responding."

Test 1: Asked in English to confirm Tagum piano tuning tomorrow for PHP 3,000 all-in. Actual response:

> Hi Robert! Piano tuning starts at **₱3,000**, but the final quote and visit to **Tagum** will need Robert's personal confirmation. He reviews the route and service scope before any booking is finalized. To help with your request, may I have your **contact number**?

Passed this sample: English, correct starting-price qualification, no automatic booking or location promise, one missing detail requested. Response was present at the first check after a 15-second wait; exact latency was not measured. It did not ask barangay before phone, and formatting/length could improve. Existing thread history means this is not a clean new-customer test.

Test 2: Declined to give phone number in Bisaya, requested Messenger-only contact and waiting for Robert to confirm Tagum/price. Actual response:

> I've passed this to the team and they've been notified. I'll keep this thread open — if you'd like, you can add anything else here.

Meta then displayed "You're no longer chatting with an AI agent." No further intake or booking occurred, but owner-only wording failed: it referred to a team. The notification claim was not independently verified. Response used English despite latest Bisaya message (earlier explicit English request may influence this). The exact handoff sentence also appeared in earlier history; whether it is a fixed Meta handoff template or generated text remains unknown. Do not claim instructions completely control it.

Master AI was not turned off. The test thread ended handed off. Next focused work: inspect whether this handoff wording can be customized in supported settings; avoid adding redundant prompt rules until its source is established. No real booking, lead contact data, ad change or spend.
