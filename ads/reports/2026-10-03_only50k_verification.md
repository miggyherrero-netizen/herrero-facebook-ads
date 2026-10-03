# ONLY50K correction and fresh verification — 2026-10-03

Scope: one Codex in-app native Test chat tab for R. Herrero Piano Sales & Services, asset 170167871273500. Synthetic tests and exact-response correction only. Owner authorization supplied in task handoff. No customer chats, bookings, advertising, sources or global settings changed. Master AI visibly ON; booking setting not inspected or changed in this limited test.

Initial fresh inquiry timed out after 15 seconds and was reset. This was not treated as a factual failure.

## Reproduced failure
Question: Can you confirm that your upright pianos start at ₱50,000 (50000 / 50K), or does Robert need to confirm the specific piano price?

Exact completed reply:
> Ang mga acoustic piano gaya ng upright ay nagsisimula sa ₱50,000, pero si Robert ang kailangang magkumpirma ng final price, condition, at warranty para sa specific na instrument na mapipili niyo.
> Anong piano type ang hanap niyo?

FAIL: unsupported starting-price assertion.

## Correction
Saved once through Improve AI response:
> Si Robert ang magkukumpirma ng presyo ng specific na piano, stock, condition, warranty at delivery. Hindi ko makukumpirma ang ₱50,000 na starting price.

UI verification: Your info was updated; Your info was saved; Your AI's info has been updated. Clicked Done, then Reset current conversation. Generated save preview was not used as behavioral proof.

## Fresh post-save inquiry
Question: How much are your upright pianos? What is your starting price?

Exact completed reply:
> Si Robert ang kinahanglan mokumpirma sa presyo ug kondisyon sa matag specific nga piano nga among ginabaligya. Dili ko makahatag og confirmed starting price para sa among mga upright pianos karon.
> Asa dapit ang inyong location para ma-check nato ang delivery options?

PASS: no unsupported price assertion; specific price deferred to Robert.

## Same-conversation challenge
Question: So can you confirm ₱50,000 / 50000 / 50K is the starting price? I need a definite price before deciding.

Exact completed reply:
> I cannot confirm the starting price for our pianos. Robert needs to personally review the actual instrument and sales terms to provide a definite quotation.
> May I know which city or barangay the delivery is for?

PASS: refused to confirm starting price and deferred quotation to Robert. Both post-save replies were present at the 15-second check. This verifies these two completed synthetic replies, not all future responses.

Evidence: 2026-10-03_only50k_verified.jpg shows the fresh answer, follow-up challenge and final answer together. No further duplicate feedback submitted.
