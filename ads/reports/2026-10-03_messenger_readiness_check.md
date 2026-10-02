# Messenger readiness check — 2026-10-03

Authenticated Chrome inspection of R. Herrero Piano Sales & Services, Page ending 273500, approximately 02:24–02:30 Asia/Manila. This pass was read-only. No messages, settings, automations, ads or budgets were changed. Sources: Inbox Automations, Inbox Settings (Messaging, Calls, Suggestions), Business Agent Settings, and Page notification preferences.

## Verified current settings

| Area | Observed | Implication |
|---|---|---|
| Business Agent master state | AI is off | Preserve until separately approved controlled test/activation. |
| Audience | Everyone; UI says new chats and existing chats inactive at least 2 days | Can re-enter existing customer conversations when enabled. Recommend first-time contacts for initial customer rollout, after team-only testing. |
| Audience testing option | Only your team; Page admins for testing | Available narrow test scope; actual inbound Messenger handoff test still pending. |
| AI follow-up | After 8 hours; Do not follow up option available | Recommend Do not follow up for initial rollout to avoid chasing complaints/previously confirmed clients. |
| Standard Inbox automations | Auto reply, Frequently asked questions, Away message, Contact information, Hours, Location OFF | No need to switch these off again; historical old replies do not prove they are currently running. Their stored content was not fully audited. |
| Identify unanswered messages | OFF; editor displayed 6 hours and Mark as unread, Messenger unchecked | This optional workflow is not configured for use. Do not enable defaults blindly; AI replies may affect what counts as unanswered. A separate owner-review queue is still necessary. |
| Leads - Responsive leads | ON at automation level; definition moves Intake to Qualified after 5 exchanged messages | Qualified is not reliable proof of serviceability, budget acceptance, appointment or conversion. Editor also showed Messenger channel unchecked, so effective channel applicability is uncertain. |
| Leads - Ordered leads | ON in list | Detailed trigger/action not inspected; no change recommended without inspection. |
| Page notification preferences | Allow all notifications ON; Messages ON | Configuration verified, not phone push delivery. |
| Notification feed | Historical waiting-for-reply reminders visible | Reminder generation exists; does not prove timely phone alert or owner response. No reminder links or mark-as-read controls clicked. |
| Calls | Receive/make calls ON; desktop call notifications ON; daily hours 00:00–23:59 | Not proof of message notification delivery; phone app preferences explicitly separate. Do not change call hours without actual owner availability. |
| Suggestions | Direct-message/comment suggestions, Orders/Payments and Saved replies suggestions ON | UI says these are optional suggestions to send/dismiss, not automatically sent messages. Do not misidentify them as the source of automatic call prompts. |
| Partner knowledge | Google Drive connected | Source contents remain unaudited; possible conflicting prices not ruled out. |

## Proposed exact next changes — not yet applied

1. Business Agent Follow up: **After 8 hours → Do not follow up**.
2. Business Agent Audience: **Everyone → Only your team** for controlled testing. Keep master AI OFF while preparing. Separate approval is needed for enabling the agent for the admin-only test. After passing, recommend **Anyone messaging for the first time** for the initial customer rollout, so existing service clients remain owner-handled.
3. Keep automatic appointments OFF. Do not create new bookings or use appointment labels as evidence of owner confirmation.
4. Use existing AI transferred and Follow up views as the proposed owner review queue; do not automatically treat Qualified as booked. No actual customer labels/assignments changed. Test whether completed intake reliably triggers transfer; a conversational claim alone is insufficient.

No spend implications; this is Page messaging configuration only. Apply approved settings immediately before controlled testing. No fixed response-hours claim should be published until Robert confirms his actual availability.

## Readiness gates

**Not ready for customer-facing AI or paid traffic yet.** Ready for the next configuration approval and controlled test.

- Booking restriction and current offer: earlier changes and limited Test chat evidence saved in the Business Agent flow report. No universal reliability claim.
- Remaining content audit: specialized product prices, connected Drive sources, saved replies and ad greeting/question templates still require review. Source of generic call prompts remains unresolved.
- Synthetic tests: distant booking pressure; already-supplied details; specific repair; text-only preference; existing-job complaint. Require short relevant replies and no invented prices, travel, slots, notifications or diagnoses.
- Actual handoff test: one clearly labelled test inquiry sent by an authorized Page admin in a controlled admin-only setup, containing synthetic details. Verify transfer is visible in the real Inbox and Robert receives the alert on his actual device. Do not send from a personal account or enable AI without approval.
- Owner completes the final notification observation; browser settings cannot establish phone permissions, app delivery or whether Robert sees the alert.
- Only after passing and owner approval: limited first-time-contact rollout. Ads have a separate readiness gate for final geography/dates, photo creative, final plan and maximum approved budget.

No trustworthy activation date can be promised before the handoff test. Technical preparation can continue now; readiness is based on these observable checks, not an arbitrary number of hours. If the alert fails, resolve that before customer activation.

Related: [communication study](2026-10-03_inbox_communication_review.md), [applied AI changes and earlier tests](2026-10-03_business_agent_flow_update.md).
