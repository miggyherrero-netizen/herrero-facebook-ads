# Live connector setup

## Current implementation

SignalDesk now has a **Meta Ads read-only OAuth/API connector** behind a small Node.js server. It is deliberately separate from the static reporting UI and only requests Meta's `ads_read` permission. The code can list the authorized user's accessible ad accounts, associate one account with a client workspace, and read campaign-level delivery/insights for a selected date range. It has no publish, edit, pause, budget, audience, lead-download, Messenger-inbox or Page-message endpoint.

The connector is **not live until you register/configure your own Meta Developer app, satisfy Meta's permission requirements, and authorize it**. No Meta app ID/secret or user token is present in this repository. The app does not collect credentials through the browser.

## One-time Meta setup

1. Create or select a Meta Developer app owned by the business, then configure the applicable Facebook Login product and valid OAuth redirect URI.
2. Use the exact callback URL below in the Meta app's valid OAuth redirect URI list:
   - Local development: `http://localhost:4173/api/connectors/meta/callback`
   - Hosted/live preview: `https://YOUR-STABLE-APP-ORIGIN/api/connectors/meta/callback`
3. Request only `ads_read` for this initial reporting connector. Meta controls development-mode roles, business verification and any review/advanced-access requirement. Do not add write, lead, Page messaging or inbox permissions for this read-only scope.
4. Copy `.env.example` to `.env`, restrict its file permissions, then fill in the values locally:

   ```bash
   cp -n .env.example .env
   chmod 600 .env
   ```

   - `APP_ACCESS_PASSWORD` — a strong, unique workspace password; the server requires it before enabling connector APIs and the UI login gate. It does not encrypt the dashboard data in browser `localStorage`.
   - `META_APP_ID`
   - `META_APP_SECRET`
   - `APP_PUBLIC_URL` (the exact app origin)
   - `META_OAUTH_REDIRECT_URI` (the exact callback URL registered with Meta)
   - `TOKEN_ENCRYPTION_KEY`, generated on the machine with `openssl rand -base64 32`
5. Run the app server from the repository root:

   ```bash
   node dashboard/server.mjs
   ```

6. Open **Connections → Meta Ads Manager → Connect Meta**, authorize through Meta, choose the correct ad account for the active client, and run a read-only campaign sync for a defined report window. Recheck account identity, currency, time zone, reporting period, attribution and result definitions in Ads Manager before relying on the report.

Meta's Insights API documents `ads_read` for read-only Insights access and describes account-level `/act_<AD_ACCOUNT_ID>/insights` reporting. See the [Insights API](https://developers.facebook.com/docs/marketing-api/insights/) and [OAuth manual flow](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/). Platform requirements can change; use the current Meta app dashboard and documentation when configuring an app.

## Secret handling and storage

- The workspace password is exchanged for a short-lived, HttpOnly, same-site session cookie; the browser does not keep the Meta access token. The in-memory session expires after eight hours or when the server restarts.
- `.env` is ignored by Git. Never paste the workspace password, app secret, encryption key, OAuth code or access token into chat or commit them.
- Access tokens are encrypted at rest in `.data/meta-connection.enc` with AES-256-GCM; `.data/` is ignored by Git. Tokens are only used by the server and are never returned to browser JavaScript.
- The encryption key must remain stable. If it changes or is lost, the encrypted token file cannot be decrypted; reconnect after removing the old local token file.
- Use a durable secret manager, HTTPS, protected server logs, backups and an access-controlled database before production. The Node server in this repo is a development connector, not a hardened multi-user production service.
- Disconnect removes the local encrypted token. To revoke the app's authorization, also remove the app from the Meta account's connected-business/integrations settings.
- The stored owner token is global to this app; ad-account selection is stored per local client workspace. Only connect accounts the current Meta user is authorized to read.

## What sync imports

- Campaign-level rows for the exact start/end dates requested.
- Campaign name, objective, effective delivery status, currency, spend, reach and impressions.
- The Insights API's exact action-type breakdown is retained when returned. A single action type may appear as the row result; multiple action types are not combined into a guessed “result.”
- Attribution settings are not silently inferred. The row states that the API attribution definition should be checked against Ads Manager.
- If the API returns no insights row for a campaign/date range, metric fields stay blank, not zero.

Overview totals include campaign-level rows only; ad-set/ad rows are never summed with them. The initial connection does not expose customer-level leads or conversations. Business outcomes remain aggregate owner-entered counts.

## Other connectors

Google Ads, TikTok Ads, LinkedIn, GA4, CRM, Sheets, booking/call and payment sources remain **setup guides only**. Each requires its own provider app, scopes, user authorization and server-side token strategy. Add them one at a time after the Meta reporting path is verified; do not request unnecessary customer data or broad write permissions.
