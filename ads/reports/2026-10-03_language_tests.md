# English and Taglish private test results

## Approved changes applied, approximately 03:14–03:16

Owner explicitly approved recommendation. Replaced existing Short Natural Conversation rule with language priority: explicit language request first, otherwise latest substantive customer message; English-only for English, natural Taglish for mixed Tagalog/English, Bisaya for Bisaya. Added equivalent three-language complaint examples and clarified all older examples are meaning/tone guidance, not fixed Bisaya scripts. Preserved short, warm replies and booking/quote/honesty safeguards. Added matching LANGUAGE FIRST priority to personality instruction while preserving its calm accommodating content.

Both rules reopened and full text compared with intended replacements: exact matches. AI master setting unchanged by this work.

Retested exact prior English complaint. Message appeared but no answer after approximately 20 seconds deliberate wait plus tool intervals. Refreshed once; waited 12 seconds then another 10 seconds for the greeting to finish. Greeting still unanswered and Send disabled; English retest was prepared but could not be resent. Stopped in accordance with owner's bounded retry preference. Language behavior after these changes remains **unverified**, not passed. No production-latency conclusion. Next action: when greeting completes, resend the prepared English scenario and inspect actual reply.

2026-10-03 approximately 03:06–03:09 Asia/Manila. No configuration changes. Synthetic missed-appointment complaints; explicit message-only preference.

English prompt: "I waited for my piano service appointment, but nobody arrived. I am disappointed. Please reply here rather than calling. What happens next?"

Actual response: "Pasensya na gayud sa imong paghulat ug sa nahitabo. Importante imong concern, ug si Robert mismo ang mo-review niini aron mahibal-an nato ang update sa imong piano service. Salamat sa imong pasensya."

Result: FAIL language matching; calm tone but Bisaya response to English. Hypothesis: Bisaya examples in instructions may be dominating, not proven root cause.

Taglish prompt: "Hi po, naghintay ako sa piano service appointment pero walang dumating. Medyo disappointed po ako. Message lang please, no calls. Ano po next step?"

Initial fresh-chat response delayed; refreshed once, waited for greeting, re-entered and sent the prompt. Actual response: "Pasensya na po sa paghihintay at sa nangyari. Mahalaga po ang concern ninyo, at si Robert mismo ang magre-review nito para mabigyan kayo ng update. Salamat po sa inyong pasensya."

Result: appropriate polite Tagalog with English term; no team, order ID, call promise, invented appointment or fake important flag. Platform explicitly displayed: "Your AI agent transferred this chat to you. Start a new chat to continue testing". This verifies the test-chat transfer event, not phone alert delivery, unread marking or real task creation.

Recommendation: explicit language precedence based on latest customer message; equivalent English/Taglish/Bisaya examples instead of Bisaya-only default examples. Retest English before declaring language matching fixed. No further instruction change applied in this test-only pass.
