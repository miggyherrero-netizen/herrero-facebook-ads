import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DASHBOARD_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(DASHBOARD_DIR, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');
const STORE_DIR = path.join(ROOT_DIR, '.data');
const STORE_FILE = path.join(STORE_DIR, 'meta-connection.enc');
const DEFAULT_VERSION = 'v25.0';
const STATE_TTL_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const GRAPH_HOST = 'graph.facebook.com';
const oauthStates = new Map();
const sessions = new Map();
const failedLoginAttempts = new Map();
let connection = null;
let connectionReadError = false;

function loadEnvFile() {
  return fs.readFile(ENV_FILE, 'utf8').then((text) => {
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || Object.prototype.hasOwnProperty.call(process.env, match[1])) continue;
      let value = match[2];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      else value = value.replace(/\s+#.*$/, '');
      process.env[match[1]] = value;
    }
  }).catch((error) => {
    if (error.code !== 'ENOENT') console.error('Could not read .env configuration file.');
  });
}

function safeVersion() {
  const version = process.env.META_API_VERSION || DEFAULT_VERSION;
  return /^v\d+\.\d+$/.test(version) ? version : DEFAULT_VERSION;
}

function urlConfig() {
  try {
    const appUrl = new URL(process.env.APP_PUBLIC_URL || '');
    const redirectUri = new URL(process.env.META_OAUTH_REDIRECT_URI || '');
    const localHost = ['localhost', '127.0.0.1'].includes(appUrl.hostname);
    const secureAppUrl = appUrl.protocol === 'https:' || localHost;
    const secureRedirect = redirectUri.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(redirectUri.hostname);
    const callbackPathOkay = redirectUri.pathname === '/api/connectors/meta/callback' && redirectUri.origin === appUrl.origin;
    return { appUrl, redirectUri, valid: secureAppUrl && secureRedirect && callbackPathOkay };
  } catch {
    return { appUrl: null, redirectUri: null, valid: false };
  }
}

function encryptionKey() {
  const raw = process.env.TOKEN_ENCRYPTION_KEY || '';
  const key = Buffer.from(raw, 'base64');
  return key.length === 32 ? key : null;
}

function accessPasswordReady() {
  return Buffer.byteLength(process.env.APP_ACCESS_PASSWORD || '', 'utf8') >= 24;
}

function metaConfigured() {
  return Boolean(accessPasswordReady() && process.env.META_APP_ID && process.env.META_APP_SECRET && urlConfig().valid && encryptionKey());
}

function encryptConnection(value) {
  const key = encryptionKey();
  if (!key) throw new Error('TOKEN_ENCRYPTION_KEY must decode to exactly 32 bytes.');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  return JSON.stringify({ version: 1, iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: encrypted.toString('base64') });
}

function decryptConnection(payload) {
  const key = encryptionKey();
  if (!key) throw new Error('The configured encryption key is missing or invalid.');
  const record = JSON.parse(payload);
  if (record.version !== 1 || !record.iv || !record.tag || !record.data) throw new Error('Encrypted connection file has an unsupported format.');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(record.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(record.tag, 'base64'));
  const clear = Buffer.concat([decipher.update(Buffer.from(record.data, 'base64')), decipher.final()]).toString('utf8');
  const parsed = JSON.parse(clear);
  if (!parsed || typeof parsed.accessToken !== 'string' || !parsed.accessToken) throw new Error('Encrypted connection file has no access token.');
  return parsed;
}

async function saveConnection(value) {
  if (!metaConfigured()) throw new Error('Meta connector is not configured for secure token storage.');
  await fs.mkdir(STORE_DIR, { recursive: true, mode: 0o700 });
  await fs.chmod(STORE_DIR, 0o700).catch(() => {});
  const temporary = `${STORE_FILE}.${process.pid}.tmp`;
  await fs.writeFile(temporary, encryptConnection(value), { encoding: 'utf8', mode: 0o600 });
  await fs.rename(temporary, STORE_FILE);
  await fs.chmod(STORE_FILE, 0o600).catch(() => {});
  connection = value;
  connectionReadError = false;
}

async function removeConnection() {
  connection = null;
  connectionReadError = false;
  await fs.rm(STORE_FILE, { force: true });
}

async function readConnection() {
  try {
    const payload = await fs.readFile(STORE_FILE, 'utf8');
    connection = decryptConnection(payload);
    connectionReadError = false;
  } catch (error) {
    if (error.code === 'ENOENT') {
      connection = null;
      connectionReadError = false;
    } else {
      connection = null;
      connectionReadError = true;
      console.error('Stored Meta connection could not be decrypted. Check TOKEN_ENCRYPTION_KEY; no token was logged.');
    }
  }
}

function publicMetaStatus(clientId = '') {
  const connected = Boolean(process.env.APP_ACCESS_PASSWORD && connection?.accessToken);
  const expired = connected && Number(connection.expiresAt || 0) > 0 && Date.now() >= Number(connection.expiresAt);
  const selectedAccount = connected && clientId && connection?.selectedAccounts ? connection.selectedAccounts[clientId] || null : null;
  return {
    configured: metaConfigured(),
    connected,
    expired,
    userName: connected ? connection?.userName || '' : '',
    connectedAt: connected ? connection?.connectedAt || '' : '',
    expiresAt: connected ? connection?.expiresAt || null : null,
    selectedAccount,
    storeError: connectionReadError,
    apiVersion: safeVersion(),
    permission: 'ads_read',
  };
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}
function redirect(res, location) {
  res.writeHead(303, { Location: location, 'Cache-Control': 'no-store' });
  res.end();
}
function readCookie(req, cookieName) {
  const raw = String(req.headers.cookie || '');
  for (const part of raw.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === cookieName) return decodeURIComponent(rest.join('='));
  }
  return '';
}
function sessionForRequest(req) {
  const id = readCookie(req, 'signaldesk_session');
  if (!id) return null;
  const expiry = sessions.get(id);
  if (!expiry || expiry <= Date.now()) { sessions.delete(id); return null; }
  return id;
}
function isAuthenticated(req) {
  return !process.env.APP_ACCESS_PASSWORD || Boolean(sessionForRequest(req));
}
function setSessionCookie(res, sessionId, maxAge) {
  const secure = urlConfig().appUrl?.protocol === 'https:' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `signaldesk_session=${encodeURIComponent(sessionId)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`);
}
function clearSessionCookie(res) {
  const secure = urlConfig().appUrl?.protocol === 'https:' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `signaldesk_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`);
}
function passwordMatches(candidate) {
  const expected = Buffer.from(String(process.env.APP_ACCESS_PASSWORD || ''), 'utf8');
  const supplied = Buffer.from(String(candidate || ''), 'utf8');
  return expected.length > 0 && supplied.length === expected.length && crypto.timingSafeEqual(expected, supplied);
}
function publicErrorMessage(error) {
  const message = String(error?.message || 'The connector request failed.');
  return message.replace(/access_token\s*[:=]\s*[^\s&]+/ig, 'access_token=[redacted]').slice(0, 320);
}

function appSecretProof(accessToken) {
  return crypto.createHmac('sha256', process.env.META_APP_SECRET).update(accessToken).digest('hex');
}

async function graphGet(pathOrUrl, params = {}, accessToken = connection?.accessToken) {
  if (!accessToken) throw new Error('Meta is not connected.');
  let target;
  if (/^https:\/\//i.test(pathOrUrl)) {
    target = new URL(pathOrUrl);
    if (target.hostname !== GRAPH_HOST || target.protocol !== 'https:') throw new Error('Meta returned an unexpected pagination host.');
  } else {
    const safePath = String(pathOrUrl).replace(/^\/+/, '');
    target = new URL(`https://${GRAPH_HOST}/${safeVersion()}/${safePath}`);
  }
  for (const [key, value] of Object.entries(params)) target.searchParams.set(key, String(value));
  target.searchParams.set('access_token', accessToken);
  target.searchParams.set('appsecret_proof', appSecretProof(accessToken));
  const response = await fetch(target, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) {
    const code = payload?.error?.code ? ` (${payload.error.code})` : '';
    const description = payload?.error?.message || `Meta Graph API returned HTTP ${response.status}.`;
    throw new Error(`Meta API${code}: ${description}`);
  }
  return payload;
}

async function graphPages(pathOrUrl, params = {}, maxPages = 20) {
  const first = await graphGet(pathOrUrl, params);
  const output = Array.isArray(first.data) ? [...first.data] : [];
  let next = first?.paging?.next || '';
  let pages = 1;
  while (next && pages < maxPages) {
    const page = await graphGet(next);
    if (Array.isArray(page.data)) output.push(...page.data);
    next = page?.paging?.next || '';
    pages += 1;
  }
  return { data: output, partial: Boolean(next) };
}

function sameOriginRequest(req) {
  const origin = req.headers.origin;
  const configuredOrigin = urlConfig().appUrl?.origin;
  return Boolean(origin && configuredOrigin && origin === configuredOrigin);
}

async function readJsonBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new Error('Request body is too large.');
  }
  if (!body) return {};
  try { return JSON.parse(body); }
  catch { throw new Error('Request body must be valid JSON.'); }
}

function validClientId(value) {
  const id = String(value || '');
  return /^[A-Za-z0-9_-]{1,100}$/.test(id) ? id : '';
}
function validDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')); }
function dateOrdinal(value) { return Number(String(value).replaceAll('-', '')); }
function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}
function safeActions(actions) {
  if (!Array.isArray(actions)) return [];
  const allowed = new Set(['action_type', 'value', '1d_click', '7d_click', '1d_view', '7d_view', '28d_click', '28d_view']);
  return actions.slice(0, 80).map((item) => Object.fromEntries(Object.entries(item || {}).filter(([key]) => allowed.has(key))));
}
function exactSingleAction(actions) {
  return Array.isArray(actions) && actions.length === 1 ? actions[0] : null;
}

async function accountList() {
  const result = await graphPages('me/adaccounts', {
    fields: 'id,account_id,name,currency,timezone_name,timezone_offset_hours_utc,account_status',
    limit: '100',
  });
  return result;
}

async function syncCampaigns(clientId, startDate, endDate) {
  if (!connection?.accessToken) throw new Error('Connect Meta before syncing.');
  const selected = connection.selectedAccounts?.[clientId];
  if (!selected?.accountId) throw new Error('Choose a Meta ad account for this client first.');
  if (!validDate(startDate) || !validDate(endDate) || dateOrdinal(endDate) < dateOrdinal(startDate)) throw new Error('Enter a valid report start and end date.');
  const days = (Date.parse(`${endDate}T00:00:00Z`) - Date.parse(`${startDate}T00:00:00Z`)) / 86400000;
  if (days > 730) throw new Error('Use a report window of 730 days or less per sync.');

  const rawId = String(selected.accountId).replace(/^act_/, '');
  const accountPath = `act_${encodeURIComponent(rawId)}`;
  const [campaignResult, insightResult] = await Promise.all([
    graphPages(`${accountPath}/campaigns`, { fields: 'id,name,objective,effective_status,status', limit: '100' }),
    graphPages(`${accountPath}/insights`, {
      level: 'campaign',
      time_range: JSON.stringify({ since: startDate, until: endDate }),
      fields: 'campaign_id,campaign_name,impressions,reach,spend,actions,cost_per_action_type',
      limit: '100',
    }),
  ]);
  const insightById = new Map(insightResult.data.map((item) => [String(item.campaign_id || ''), item]));
  const campaigns = campaignResult.data;
  const idsSeen = new Set(campaigns.map((campaign) => String(campaign.id || '')));
  const reportRows = [...campaigns];
  for (const insight of insightResult.data) {
    const id = String(insight.campaign_id || '');
    if (id && !idsSeen.has(id)) {
      reportRows.push({ id, name: insight.campaign_name || 'Campaign name not returned', objective: '', effective_status: 'Not returned' });
      idsSeen.add(id);
    }
  }

  const rows = reportRows.map((campaign) => {
    const id = String(campaign.id || '');
    const insight = insightById.get(id) || null;
    const actions = safeActions(insight?.actions);
    const costActions = safeActions(insight?.cost_per_action_type);
    const onlyAction = exactSingleAction(actions);
    const matchingCost = onlyAction ? costActions.find((item) => item.action_type === onlyAction.action_type) : null;
    return {
      sourceEntityId: id,
      name: campaign.name || insight?.campaign_name || 'Campaign name not returned',
      objective: campaign.objective || '',
      status: campaign.effective_status || campaign.status || 'Not returned',
      level: 'campaign',
      periodStart: startDate,
      periodEnd: endDate,
      currency: insight?.account_currency || selected.currency || '',
      spend: numberOrNull(insight?.spend),
      impressions: numberOrNull(insight?.impressions),
      reach: numberOrNull(insight?.reach),
      resultCount: onlyAction ? numberOrNull(onlyAction.value) : null,
      resultLabel: onlyAction?.action_type || '',
      costPerResult: matchingCost ? numberOrNull(matchingCost.value) : null,
      actionBreakdown: actions,
      costBreakdown: costActions,
      attribution: 'Not returned by connector; verify attribution in Ads Manager',
      source: 'Meta Ads API · read-only sync',
      sourceFile: `Meta Marketing API ${safeVersion()}`,
      verifiedOn: new Date().toISOString().slice(0, 10),
      importedAt: new Date().toISOString(),
      notes: insight ? '' : 'No insights row was returned for this campaign and window; metric fields remain blank, not zero.',
      ownerApproval: 'Read-only reporting sync · no write access requested',
    };
  });
  return { rows, partial: campaignResult.partial || insightResult.partial, apiVersion: safeVersion(), selectedAccount: selected };
}

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/session/status') {
    sendJson(res, 200, { server: true, authRequired: Boolean(process.env.APP_ACCESS_PASSWORD), authenticated: isAuthenticated(req) });
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/session/login') {
    if (!sameOriginRequest(req)) { sendJson(res, 403, { error: 'Same-origin request required.' }); return; }
    if (!process.env.APP_ACCESS_PASSWORD) { sendJson(res, 409, { error: 'Set a strong APP_ACCESS_PASSWORD in the ignored .env file before enabling a live connector.' }); return; }
    try {
      const ipKey = req.socket.remoteAddress || 'unknown';
      const now = Date.now();
      const previousFailures = failedLoginAttempts.get(ipKey);
      if (previousFailures?.blockedUntil > now) { sendJson(res, 429, { error: 'Too many login attempts. Wait before trying again.' }); return; }
      const body = await readJsonBody(req);
      if (!passwordMatches(body.password)) {
        const attempts = previousFailures && previousFailures.windowUntil > now ? previousFailures.attempts + 1 : 1;
        failedLoginAttempts.set(ipKey, { attempts, windowUntil: now + 15 * 60 * 1000, blockedUntil: attempts >= 10 ? now + 15 * 60 * 1000 : 0 });
        sendJson(res, 401, { error: 'Workspace password was not accepted.' }); return;
      }
      failedLoginAttempts.delete(ipKey);
      for (const [id, expiry] of sessions) if (expiry <= now) sessions.delete(id);
      const sessionId = crypto.randomBytes(32).toString('hex');
      const sessionExpiry = now + 8 * 60 * 60 * 1000;
      sessions.set(sessionId, sessionExpiry);
      setSessionCookie(res, sessionId, 8 * 60 * 60);
      sendJson(res, 200, { authenticated: true, expiresAt: sessionExpiry });
    } catch (error) { sendJson(res, 400, { error: publicErrorMessage(error) }); }
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/session/logout') {
    if (!sameOriginRequest(req)) { sendJson(res, 403, { error: 'Same-origin request required.' }); return; }
    const sessionId = sessionForRequest(req);
    if (sessionId) sessions.delete(sessionId);
    clearSessionCookie(res);
    sendJson(res, 200, { loggedOut: true });
    return;
  }
  if (url.pathname.startsWith('/api/connectors/') && !accessPasswordReady()) {
    sendJson(res, 503, { error: 'Configure an APP_ACCESS_PASSWORD of at least 24 characters in the ignored .env file before enabling live connectors.' });
    return;
  }
  if (process.env.APP_ACCESS_PASSWORD && !isAuthenticated(req)) {
    sendJson(res, 401, { error: 'Workspace login required.' });
    return;
  }
  if (req.method === 'GET' && url.pathname === '/api/health') {
    const clientId = validClientId(url.searchParams.get('clientId'));
    sendJson(res, 200, { server: true, meta: publicMetaStatus(clientId) });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/connectors/meta/start') {
    if (!metaConfigured()) { sendJson(res, 503, { error: 'Meta OAuth is not configured. Follow dashboard/CONNECTORS.md and keep app secrets in the ignored .env file.' }); return; }
    const { appUrl, redirectUri } = urlConfig();
    const state = crypto.randomBytes(32).toString('hex');
    oauthStates.set(state, Date.now());
    const now = Date.now();
    for (const [key, created] of oauthStates) if (now - created > STATE_TTL_MS) oauthStates.delete(key);
    const auth = new URL(`https://www.facebook.com/${safeVersion()}/dialog/oauth`);
    auth.searchParams.set('client_id', process.env.META_APP_ID);
    auth.searchParams.set('redirect_uri', redirectUri.href);
    auth.searchParams.set('state', state);
    auth.searchParams.set('scope', 'ads_read');
    auth.searchParams.set('response_type', 'code');
    auth.searchParams.set('auth_type', 'rerequest');
    auth.searchParams.set('display', 'page');
    if (appUrl.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(appUrl.hostname)) { sendJson(res, 400, { error: 'Meta OAuth requires HTTPS outside local development.' }); return; }
    res.writeHead(302, { Location: auth.href, 'Cache-Control': 'no-store' }); res.end();
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/connectors/meta/callback') {
    const { appUrl } = urlConfig();
    const state = url.searchParams.get('state') || '';
    const created = oauthStates.get(state);
    oauthStates.delete(state);
    if (!created || Date.now() - created > STATE_TTL_MS) { redirect(res, `${appUrl?.origin || '/'}?meta_connection=state_expired`); return; }
    if (url.searchParams.get('error')) { redirect(res, `${appUrl.origin}/?meta_connection=denied`); return; }
    const code = url.searchParams.get('code');
    if (!code) { redirect(res, `${appUrl.origin}/?meta_connection=failed`); return; }
    try {
      const { redirectUri } = urlConfig();
      const tokenUrl = new URL(`https://${GRAPH_HOST}/${safeVersion()}/oauth/access_token`);
      tokenUrl.searchParams.set('client_id', process.env.META_APP_ID);
      tokenUrl.searchParams.set('client_secret', process.env.META_APP_SECRET);
      tokenUrl.searchParams.set('redirect_uri', redirectUri.href);
      tokenUrl.searchParams.set('code', code);
      const tokenResponse = await fetch(tokenUrl, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
      const shortToken = await tokenResponse.json().catch(() => ({}));
      if (!tokenResponse.ok || !shortToken.access_token) throw new Error('Meta did not return an access token. Check OAuth app settings and redirect URI.');
      let accessToken = shortToken.access_token;
      let expiresIn = Number(shortToken.expires_in) || 3600;
      try {
        const exchangeUrl = new URL(`https://${GRAPH_HOST}/${safeVersion()}/oauth/access_token`);
        exchangeUrl.searchParams.set('grant_type', 'fb_exchange_token');
        exchangeUrl.searchParams.set('client_id', process.env.META_APP_ID);
        exchangeUrl.searchParams.set('client_secret', process.env.META_APP_SECRET);
        exchangeUrl.searchParams.set('fb_exchange_token', shortToken.access_token);
        const exchangeResponse = await fetch(exchangeUrl, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
        const longToken = await exchangeResponse.json().catch(() => ({}));
        if (exchangeResponse.ok && longToken.access_token) {
          accessToken = longToken.access_token;
          expiresIn = Number(longToken.expires_in) || 60 * 24 * 60 * 60;
        }
      } catch { /* Keep the valid short-lived token; the UI will show its expiry. */ }
      const profile = await graphGet('me', { fields: 'id,name' }, accessToken);
      await saveConnection({
        accessToken,
        userId: String(profile.id || ''),
        userName: String(profile.name || ''),
        connectedAt: new Date().toISOString(),
        expiresAt: Date.now() + expiresIn * 1000,
        selectedAccounts: connection?.selectedAccounts || {},
      });
      redirect(res, `${appUrl.origin}/?meta_connection=success`);
    } catch (error) {
      console.error('Meta OAuth callback failed:', publicErrorMessage(error));
      redirect(res, `${appUrl.origin}/?meta_connection=failed`);
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/connectors/meta/accounts') {
    if (!connection?.accessToken) { sendJson(res, 401, { error: 'Connect Meta Ads first.' }); return; }
    const expiry = Number(connection.expiresAt || 0);
    if (expiry && Date.now() >= expiry) { sendJson(res, 401, { error: 'Meta access expired. Reconnect to continue.' }); return; }
    try {
      const result = await accountList();
      sendJson(res, 200, { accounts: result.data.map((account) => ({ id: String(account.id || ''), accountId: String(account.account_id || ''), name: String(account.name || 'Unnamed ad account'), currency: String(account.currency || ''), timezone: String(account.timezone_name || ''), status: account.account_status ?? null })), partial: result.partial });
    } catch (error) { sendJson(res, 502, { error: publicErrorMessage(error) }); }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/connectors/meta/select-account') {
    if (!sameOriginRequest(req)) { sendJson(res, 403, { error: 'Same-origin request required.' }); return; }
    if (!connection?.accessToken) { sendJson(res, 401, { error: 'Connect Meta Ads first.' }); return; }
    try {
      const body = await readJsonBody(req);
      const clientId = validClientId(body.clientId);
      const requestedId = String(body.accountId || '');
      if (!clientId || !requestedId) { sendJson(res, 400, { error: 'Choose a client and an ad account.' }); return; }
      const result = await accountList();
      const selected = result.data.find((account) => String(account.id) === requestedId || String(account.account_id) === requestedId);
      if (!selected) { sendJson(res, 404, { error: 'That ad account is not available to the authorized Meta user.' }); return; }
      const selectedAccounts = { ...(connection.selectedAccounts || {}), [clientId]: {
        id: String(selected.id || ''), accountId: String(selected.account_id || ''), name: String(selected.name || ''),
        currency: String(selected.currency || ''), timezone: String(selected.timezone_name || ''), selectedAt: new Date().toISOString(),
      } };
      await saveConnection({ ...connection, selectedAccounts });
      sendJson(res, 200, { selectedAccount: selectedAccounts[clientId] });
    } catch (error) { sendJson(res, 400, { error: publicErrorMessage(error) }); }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/connectors/meta/sync') {
    if (!sameOriginRequest(req)) { sendJson(res, 403, { error: 'Same-origin request required.' }); return; }
    if (!connection?.accessToken) { sendJson(res, 401, { error: 'Connect Meta Ads first.' }); return; }
    try {
      const body = await readJsonBody(req);
      const clientId = validClientId(body.clientId);
      if (!clientId) { sendJson(res, 400, { error: 'Choose an active client workspace.' }); return; }
      const result = await syncCampaigns(clientId, body.startDate, body.endDate);
      sendJson(res, 200, result);
    } catch (error) { sendJson(res, 400, { error: publicErrorMessage(error) }); }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/connectors/meta/disconnect') {
    if (!sameOriginRequest(req)) { sendJson(res, 403, { error: 'Same-origin request required.' }); return; }
    try {
      await removeConnection();
      sendJson(res, 200, { disconnected: true, message: 'Local encrypted token removed. Revoke the app in Meta settings as well if you want to withdraw its permission.' });
    } catch { sendJson(res, 500, { error: 'Could not remove the local encrypted connection file.' }); }
    return;
  }

  sendJson(res, 404, { error: 'API route not found.' });
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
};

function addSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'");
}

async function serveStatic(req, res, url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); res.end('Bad path.'); return; }
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const target = path.resolve(DASHBOARD_DIR, requested);
  if (target !== DASHBOARD_DIR && !target.startsWith(`${DASHBOARD_DIR}${path.sep}`)) { res.writeHead(404); res.end('Not found.'); return; }
  try {
    const stat = await fs.stat(target);
    if (!stat.isFile()) { res.writeHead(404); res.end('Not found.'); return; }
    const content = await fs.readFile(target);
    res.writeHead(200, { 'Content-Type': contentTypes[path.extname(target).toLowerCase()] || 'application/octet-stream', 'Content-Length': content.length, 'Cache-Control': path.extname(target) === '.html' ? 'no-cache' : 'no-cache' });
    res.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') { res.writeHead(404); res.end('Not found.'); return; }
    res.writeHead(500); res.end('Could not read the app file.');
  }
}

async function main() {
  await loadEnvFile();
  await readConnection();
  const port = Number(process.env.PORT || 4173);
  const server = http.createServer(async (req, res) => {
    addSecurityHeaders(res);
    let url;
    try { url = new URL(req.url || '/', 'http://internal.invalid'); }
    catch { res.writeHead(400); res.end('Bad request.'); return; }
    if (url.pathname.startsWith('/api/')) {
      try { await handleApi(req, res, url); }
      catch (error) {
        console.error('API request failed:', publicErrorMessage(error));
        if (!res.headersSent) sendJson(res, 500, { error: publicErrorMessage(error) });
      }
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end('Method not allowed.'); return; }
    await serveStatic(req, res, url);
  });
  server.listen(port, '0.0.0.0', () => {
    console.log(`SignalDesk listening on 0.0.0.0:${port}.`);
    console.log(metaConfigured() ? `Meta Ads OAuth configured (${safeVersion()}, ads_read only).` : 'Meta Ads OAuth not configured; local CSV mode remains available.');
  });
}

main().catch((error) => {
  console.error('SignalDesk server could not start:', error.message);
  process.exitCode = 1;
});
