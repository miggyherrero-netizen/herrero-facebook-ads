# SignalDesk — client ads workspace

A no-frontend-build client workspace for Meta Ads reporting and privacy-conscious outcome tracking. It uses browser JavaScript plus a small Node.js server for the optional read-only Meta OAuth connector.

## Run locally

From the repository root:

```bash
node dashboard/server.mjs
```

Open `http://localhost:4173`. The UI has no package install or frontend build step; the Node server uses built-in modules only. To enable the Meta OAuth flow, configure a local `.env` using [`.env.example`](../.env.example) and follow [`CONNECTORS.md`](CONNECTORS.md). Without those app settings, local CSV mode still works.

## What works in this prototype

- Client workspaces with business-level account label, currency, time zone, services, service area and goal.
- Campaign / ad set / ad reporting records, filters, detail views, a CSV template and CSV exports.
- Browser-side Meta Ads CSV import. The original file is not uploaded or retained; only mapped aggregate reporting fields are saved.
- Aggregate business-outcome tracking by exact period: qualified inquiries, owner-approved opportunities, bookings, completed jobs, net cash collected and direct costs.
- A creative-test log, tracking-health summary and optional integration catalogue.
- Data persistence in this browser's `localStorage`.

## Meta and third-party connections

The **read-only Meta OAuth/API flow is implemented but not configured or authorized yet**. Until a Meta Developer app is registered and `.env` is configured, the only active data path is local CSV import. The other connector cards are setup guides only. Nothing in this app publishes ads, edits campaigns, changes budgets, pauses delivery or authorizes spend; the server requests only `ads_read`.

See [`CONNECTORS.md`](CONNECTORS.md) for the workspace password, Meta app, redirect URI and local secret setup. Never paste workspace passwords, 2FA codes, app secrets or API tokens into chat or the browser. The app deliberately tracks aggregate outcomes instead of storing names, phone numbers, addresses or message contents.

## Starting data and reporting rules

The initial **R. Herrero Piano Sales & Services** workspace is populated from the repository's saved account study and intake brief. The historical campaign row reflects the manually transcribed campaign-level figures for Jan 1–Sep 30, 2026; the report is not a native export or live sync. Its draft row is explicitly marked not approved. No qualified-lead, booking or completed-job totals have been invented.

The app keeps reporting levels separate. Overview totals use campaign-level rows only, and reach is not summed across multiple campaigns because audiences can overlap. A Meta conversation is not counted as a qualified inquiry, booking, completed job or profit. Blank values mean not reported, not zero. Business outcomes are compared with Ads data only when the reporting dates match exactly.

## Storage note

Client profiles, campaign rows and aggregate outcomes are saved in the current browser profile. They are not encrypted, synced, backed up or shared across users. If configured, the Meta user token is stored separately by the local Node server, encrypted at rest in the Git-ignored `.data/` directory. Use CSV exports for a controlled handoff and clear browser data when appropriate. Do not treat this prototype as a secure production database.
