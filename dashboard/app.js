(() => {
  'use strict';

  const STORAGE_KEY = 'signaldesk.workspace.v1';
  const app = document.getElementById('app');
  const modalRoot = document.getElementById('modal-root');
  const toastRoot = document.getElementById('toast-root');

  const iconPaths = {
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    megaphone: '<path d="m4 13 16-7v12l-16-6v1a3 3 0 0 0 3 3h1l2 4h3l-2.5-5.1"/><path d="M4 12v2"/>',
    clients: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V20"/><circle cx="10" cy="7" r="3.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 6.8M20 20v-1.5a4 4 0 0 0-3-3.87"/>',
    trackers: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    connections: '<path d="M10 13a5 5 0 0 0 7.07 0l2-2A5 5 0 0 0 12 3.93l-1.15 1.14"/><path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 12 20.07l1.15-1.14"/>',
    reports: '<path d="M14 2.8H6a2 2 0 0 0-2 2v14.4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 1 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 1 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V4a1.7 1.7 0 1 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 1 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m7 10 5 5 5-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    upload: '<path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5"/><path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
    download: '<path d="M12 4v12m0 0 4.5-4.5M12 16l-4.5-4.5"/><path d="M5 20h14"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    coins: '<circle cx="8.5" cy="8" r="5.5"/><path d="M18 8.5a5.5 5.5 0 1 1-5.5 5.5"/><path d="M8.5 5v6M6.5 7h3M6.5 9h3"/>',
    message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    checkCircle: '<path d="M21 11.1V12a9 9 0 1 1-5.3-8.25"/><path d="m8.5 11.5 3.2 3.2L21 5.4"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    server: '<rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 8h.01"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    spark: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4h6v4M8 7h1M15 7h1M8 11h1M15 11h1"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8h18M16 14h2"/><path d="M6 5V3h12v2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
    camera: '<path d="M14 4h-4l-2 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3Z"/><circle cx="12" cy="13" r="3.5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    facebook: '<path d="M14.2 21v-7.8h2.6l.4-3h-3V8.3c0-.9.3-1.5 1.5-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8.2v3h2.7V21h3.3Z"/>',
    sheet: '<path d="M6 3h12l3 3v15H3V6l3-3Z"/><path d="M6 3v6h12V3M8 13h2M14 13h2M8 17h2M14 17h2"/>',
    pixel: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12h2l2-3 2 6 2-3h2"/>',
    flow: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6h5a4.5 4.5 0 0 1 4.5 4.5v5"/><path d="m15 13 3 3 3-3"/>',
    web: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    shop: '<path d="M3 9h18l-1-5H4L3 9Z"/><path d="M5 9v11h14V9M9 20v-6h6v6M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5h6v3H9zM8 12h8M8 16h8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.07 0l2-2A5 5 0 0 0 12 3.93l-1.15 1.14"/><path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 12 20.07l1.15-1.14"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-8.2-8.2V3h9.4l8.8 8.8a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.4-3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/><path d="M12 14v3"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h7"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
    checkSquare: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 2.5 2.5L16 9"/>',
    circle: '<circle cx="12" cy="12" r="8"/>',
  };

  const icon = (name, size = 18, extraClass = '') => `<svg class="${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.circle}</svg>`;
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const nullableText = (value) => value === null || value === undefined || value === '' ? '—' : escapeHtml(value);
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const uid = (prefix = 'row') => `${prefix}-${globalThis.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;

  const initialData = {
    version: 1,
    activeClientId: 'rh-piano',
    clients: [
      {
        id: 'rh-piano',
        name: 'R. Herrero Piano Sales & Services',
        channel: 'Meta Ads',
        accountLabel: 'ROBERT HERRERO',
        accountSuffix: '545192',
        currency: 'PHP',
        timezone: 'Asia/Singapore (GMT+8)',
        serviceArea: 'Davao City generally; General Santos City for October 2026',
        services: 'Piano tuning, piano cleaning and minor repairs; rates start at PHP 3,000 depending on location.',
        goal: 'Qualified Messenger inquiries, then owner-confirmed bookings and completed jobs.',
        contactPath: 'Facebook Page Messenger (owner-reported)',
        lastReview: '2026-10-02',
        sourceRef: 'ads/intake/business_and_account_brief.md',
      },
    ],
    campaigns: [
      {
        id: 'historic-120248256042240311', clientId: 'rh-piano', sourceEntityId: '120248256042240311',
        name: 'Bring Your Piano Back to Life | Sales | Apr 2026', objective: 'Sales', status: 'Off', level: 'campaign',
        periodStart: '2026-01-01', periodEnd: '2026-09-30', spend: 12262.25, resultCount: 332,
        resultLabel: 'Messaging conversations started', costPerResult: 36.93, reach: 60205, impressions: 199188,
        attribution: '7-day click or 1-day view; All conversions', currency: 'PHP',
        source: 'Saved Ads Manager study (manual transcription)', sourceFile: 'ads/reports/2026-10-02_facebook_ads_study_and_plan.md',
        verifiedOn: '2026-10-02', importedAt: '2026-10-02T00:00:00.000Z',
        notes: 'Historical campaign-level figures from selected Ads Manager rows. Not a native export; messages are not verified bookings or completed jobs.',
        ownerApproval: 'Historical record only',
      },
      {
        id: 'draft-120256256249910311', clientId: 'rh-piano', sourceEntityId: '120256256249910311',
        name: 'RH | GenSan | Piano Tuning & Repair | Messenger | Oct 2026', objective: 'Engagement', status: 'In draft', level: 'campaign',
        periodStart: '', periodEnd: '', spend: null, resultCount: null, resultLabel: '', costPerResult: null,
        reach: null, impressions: null, attribution: '', currency: 'PHP',
        source: 'Saved account setup review', sourceFile: 'ads/reports/2026-10-02_facebook_ads_study_and_plan.md',
        verifiedOn: '2026-10-02', importedAt: '2026-10-02T00:00:00.000Z',
        observedBudget: 'Observed draft ad-set budget: PHP 880/day (not owner-approved).',
        notes: 'The draft name says GenSan, but the observed ad set had PH locations and no end date. The draft was not approved; this workspace does not publish or change it.',
        ownerApproval: 'Not approved; no spend authorized',
      },
    ],
    outcomes: [],
    experiments: [],
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return clone(initialData);
      const parsed = JSON.parse(saved);
      if (!parsed || !Array.isArray(parsed.clients) || !Array.isArray(parsed.campaigns)) return clone(initialData);
      return {
        ...clone(initialData), ...parsed,
        clients: parsed.clients,
        campaigns: Array.isArray(parsed.campaigns) ? parsed.campaigns : [],
        outcomes: Array.isArray(parsed.outcomes) ? parsed.outcomes : [],
        experiments: Array.isArray(parsed.experiments) ? parsed.experiments : [],
      };
    } catch (error) {
      return clone(initialData);
    }
  }

  let db = loadData();
  let currentPage = 'overview';
  let selectedPeriodKey = null;
  let campaignFilters = { search: '', level: 'all', status: 'all' };
  let pendingImport = null;
  let importDefaultLevel = 'campaign';
  let toastTimer = null;
  let connectorState = { server: false, meta: { configured: false, connected: false, expired: false, selectedAccount: null, storeError: false } };
  let authState = { required: false, authenticated: true, checked: false };
  let connectorRefreshId = 0;

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      return true;
    } catch (error) {
      showToast('Could not save in this browser. Check storage settings.', 'error');
      return false;
    }
  }

  function getActiveClient() {
    return db.clients.find((client) => client.id === db.activeClientId) || db.clients[0] || null;
  }
  function clearSelectedMetaAccount() {
    if (connectorState.meta) connectorState.meta = { ...connectorState.meta, selectedAccount: null };
  }
  function campaignsFor(clientId) { return db.campaigns.filter((row) => row.clientId === clientId); }
  function outcomesFor(clientId) { return db.outcomes.filter((row) => row.clientId === clientId); }
  function experimentsFor(clientId) { return db.experiments.filter((row) => row.clientId === clientId); }
  function clientInitials(name) {
    const bits = String(name || 'Client').trim().split(/\s+/).filter(Boolean);
    return (bits.length > 1 ? `${bits[0][0]}${bits[bits.length - 1][0]}` : bits[0].slice(0, 2)).toUpperCase();
  }
  function formatNumber(value, digits = 0) {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return '—';
    return new Intl.NumberFormat('en', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(Number(value));
  }
  function formatMoney(value, currency = 'PHP') {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return '—';
    try {
      return new Intl.NumberFormat('en', { style: 'currency', currency: /^[A-Z]{3}$/.test(currency) ? currency : 'PHP', currencyDisplay: 'code', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value));
    } catch (error) {
      return `${currency || 'PHP'} ${formatNumber(value, 2)}`;
    }
  }
  function formatDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '—';
    const [year, month, day] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
  }
  function formatShortDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '—';
    const [year, month, day] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
  }
  function formatRange(start, end) {
    if (!start || !end) return 'No report period';
    if (start === end) return formatDate(start);
    return `${formatShortDate(start)} – ${formatDate(end)}`;
  }
  function periodKey(start, end) { return `${start}|${end}`; }
  function availablePeriods(clientId) {
    const seen = new Map();
    campaignsFor(clientId).forEach((row) => {
      if (row.periodStart && row.periodEnd) seen.set(periodKey(row.periodStart, row.periodEnd), { key: periodKey(row.periodStart, row.periodEnd), start: row.periodStart, end: row.periodEnd });
    });
    return [...seen.values()].sort((a, b) => b.end.localeCompare(a.end) || b.start.localeCompare(a.start));
  }
  function getSelectedPeriod(clientId) {
    const periods = availablePeriods(clientId);
    if (!periods.length) return null;
    let period = periods.find((item) => item.key === selectedPeriodKey);
    if (!period) {
      period = periods[0];
      selectedPeriodKey = period.key;
    }
    return period;
  }
  function periodSelect(clientId, className = '') {
    const periods = availablePeriods(clientId);
    const selected = getSelectedPeriod(clientId);
    return `<div class="select-wrap"><select class="${className}" data-role="period-picker" aria-label="Select report period" ${periods.length ? '' : 'disabled'}>${periods.length ? periods.map((period) => `<option value="${escapeHtml(period.key)}" ${selected?.key === period.key ? 'selected' : ''}>${escapeHtml(formatRange(period.start, period.end))}</option>`).join('') : '<option value="">No campaign report periods</option>'}</select></div>`;
  }
  function selectedPeriodRows(clientId) {
    const period = getSelectedPeriod(clientId);
    if (!period) return [];
    return campaignsFor(clientId).filter((row) => row.level === 'campaign' && row.periodStart === period.start && row.periodEnd === period.end);
  }
  function completeSum(rows, field) {
    if (!rows.length || rows.some((row) => row[field] === null || row[field] === undefined || row[field] === '' || !Number.isFinite(Number(row[field])))) return null;
    return rows.reduce((total, row) => total + Number(row[field]), 0);
  }
  function metricSummary(rows) {
    const currencies = [...new Set(rows.map((row) => String(row.currency || '').trim()).filter(Boolean))];
    const sameCurrency = rows.length <= 1 || (rows.every((row) => String(row.currency || '').trim()) && currencies.length === 1);
    const spend = sameCurrency ? completeSum(rows, 'spend') : null;
    const labels = [...new Set(rows.map((row) => (row.resultLabel || '').trim()).filter(Boolean))];
    const sameResultDefinition = labels.length === 1 && rows.every((row) => row.resultCount !== null && row.resultCount !== undefined && row.resultCount !== '' && row.resultLabel);
    const attributions = [...new Set(rows.map((row) => (row.attribution || '').trim()).filter(Boolean))];
    const attributionVerified = rows.every((row) => String(row.attribution || '').trim() && !/not returned|not reported|not provided|unknown|verify|n\/a/i.test(String(row.attribution)));
    const sameAttribution = rows.length <= 1 || (attributionVerified && attributions.length === 1);
    const resultCount = sameResultDefinition && sameAttribution ? completeSum(rows, 'resultCount') : null;
    let costPerResult = null;
    if (sameCurrency && rows.length === 1 && rows[0].costPerResult !== null && rows[0].costPerResult !== undefined) {
      costPerResult = Number(rows[0].costPerResult);
    } else if (sameCurrency && spend !== null && resultCount !== null && resultCount > 0) {
      costPerResult = spend / resultCount;
    }
    const reach = rows.length === 1 && rows[0].reach !== null && rows[0].reach !== undefined ? Number(rows[0].reach) : null;
    const impressions = completeSum(rows, 'impressions');
    return { spend, labels, sameResultDefinition, sameAttribution, sameCurrency, currency: currencies[0] || '', resultCount, costPerResult, reach, impressions };
  }
  function matchingOutcome(clientId, period) {
    if (!period) return null;
    return outcomesFor(clientId).find((row) => row.periodStart === period.start && row.periodEnd === period.end) || null;
  }
  function statusWords(status) { return String(status || '').toLowerCase().split(/[^a-z]+/).filter(Boolean); }
  function statusClass(status) {
    const value = String(status || '').toLowerCase();
    const words = statusWords(value);
    if (words.some((word) => ['active', 'completed', 'available'].includes(word))) return 'badge-green';
    if (words.some((word) => ['draft', 'review', 'pending'].includes(word)) || value.includes('not approved')) return 'badge-amber';
    if (value.includes('not connected') || words.includes('missing')) return 'badge-amber';
    if (words.some((word) => ['off', 'paused'].includes(word)) || value === 'not reported') return 'badge-muted';
    return 'badge-blue';
  }
  function sourceShort(source) {
    if (!source) return 'Internal record';
    if (source.toLowerCase().includes('csv')) return 'CSV import';
    if (source.toLowerCase().includes('manual')) return 'Manual review';
    if (source.toLowerCase().includes('setup')) return 'Setup review';
    return source;
  }
  function moneyOrBlank(value, currency) { return value === null || value === undefined || value === '' ? '—' : formatMoney(value, currency); }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'grid' },
    { id: 'campaigns', label: 'Campaigns', icon: 'megaphone' },
    { id: 'clients', label: 'Clients', icon: 'clients' },
    { id: 'trackers', label: 'Trackers', icon: 'trackers' },
    { id: 'connections', label: 'Connections', icon: 'connections' },
    { id: 'reports', label: 'Reports', icon: 'reports' },
  ];
  const pageTitles = { overview: 'Overview', campaigns: 'Campaigns', clients: 'Clients', trackers: 'Trackers', connections: 'Connections', reports: 'Reports' };

  function renderSidebar(client) {
    const meta = connectorState.meta || {};
    const liveConnected = Boolean(meta.connected && !meta.expired);
    const connectorHeading = liveConnected ? 'Meta Ads read-only connected' : meta.expired ? 'Meta token expired' : meta.configured ? 'Meta OAuth ready' : 'No live connection';
    const connectorCopy = liveConnected ? `Read-only access${meta.selectedAccount?.name ? ` · ${meta.selectedAccount.name}` : ' · choose an ad account'}.` : meta.configured ? 'Authorize the Meta app to import campaign reporting.' : 'Configure a Meta Developer app and local .env to enable OAuth.';
    return `<aside class="sidebar" id="sidebar">
      <div class="brand"><div class="brand-mark">S</div><div class="brand-copy"><div class="brand-name">signal<span>desk</span></div><div class="brand-caption">CLIENT ADS WORKSPACE</div></div></div>
      <button class="workspace-switcher" type="button" data-action="navigate" data-page="clients" aria-label="Open client workspaces">
        <span class="workspace-avatar">${escapeHtml(client ? clientInitials(client.name) : 'SD')}</span>
        <span class="workspace-info"><span class="workspace-label">ACTIVE WORKSPACE</span><span class="workspace-name">${escapeHtml(client ? client.name : 'No client selected')}</span></span>
        ${icon('chevronDown', 15, 'workspace-chevron')}
      </button>
      <div class="nav-label">WORKSPACE</div>
      <nav class="nav-list" aria-label="Main navigation">${navItems.map((item) => `<button type="button" class="nav-item ${currentPage === item.id ? 'active' : ''}" data-action="navigate" data-page="${item.id}" aria-current="${currentPage === item.id ? 'page' : 'false'}">${icon(item.icon, 17)}<span>${item.label}</span></button>`).join('')}</nav>
      <div class="sidebar-spacer"></div>
      <div class="sidebar-connect">
        <div class="sidebar-connect-heading"><span class="connection-indicator ${liveConnected ? 'connected' : ''}"></span><span>${escapeHtml(connectorHeading)}</span></div>
        <p>${escapeHtml(connectorCopy)}</p>
        <button type="button" data-action="navigate" data-page="connections">Review connections ${icon('arrowRight', 13)}</button>
      </div>
      <div class="sidebar-footer"><div class="profile-avatar">${escapeHtml(client ? clientInitials(client.name) : 'SD')}</div><div class="profile-info"><strong>Workspace</strong><span>Local browser prototype</span></div></div>
    </aside>`;
  }

  function renderTopbar() {
    const title = pageTitles[currentPage] || 'Overview';
    const client = getActiveClient();
    return `<header class="topbar">
      <div class="topbar-left"><button class="topbar-icon mobile-menu" type="button" data-action="toggle-mobile" aria-label="Open navigation">${icon('menu', 17)}</button><div class="breadcrumb"><span>SignalDesk</span>${icon('chevron', 13)}<strong>${title}</strong></div><span class="topbar-divider"></span><span class="topbar-context">${escapeHtml(client?.name || 'No client selected')}</span></div>
      <div class="topbar-right"><button class="topbar-icon" type="button" data-action="navigate" data-page="connections" aria-label="Connection status">${icon('link', 16)}</button>${authState.required ? `<button class="topbar-icon" type="button" data-action="logout" aria-label="Lock workspace" title="Lock workspace">${icon('lock', 15)}</button>` : ''}<div class="topbar-avatar">${escapeHtml(client ? clientInitials(client.name) : 'SD')}</div></div>
    </header>`;
  }

  async function refreshConnectorStatus(redraw = true) {
    const client = getActiveClient();
    const requestId = ++connectorRefreshId;
    try {
      const sessionResponse = await fetch('/api/session/status', { cache: 'no-store', headers: { Accept: 'application/json' } });
      if (sessionResponse.ok) {
        const session = await sessionResponse.json();
        if (requestId !== connectorRefreshId) return;
        authState = { required: Boolean(session.authRequired), authenticated: Boolean(session.authenticated), checked: true };
        if (authState.required && !authState.authenticated) { renderLoginGate(); return; }
      } else authState = { required: false, authenticated: true, checked: true };
      if (redraw) renderApp();
      const response = await fetch(`/api/health${client ? `?clientId=${encodeURIComponent(client.id)}` : ''}`, { cache: 'no-store', headers: { Accept: 'application/json' } });
      if (!response.ok || requestId !== connectorRefreshId) return;
      const payload = await response.json();
      if (requestId !== connectorRefreshId) return;
      connectorState = { server: Boolean(payload.server), meta: payload.meta || connectorState.meta };
      if (redraw) renderApp();
    } catch {
      if (requestId === connectorRefreshId) {
        authState = { ...authState, checked: true };
        connectorState = { server: false, meta: connectorState.meta };
        if (redraw) renderApp();
      }
    }
  }

  function renderLoginGate() {
    app.innerHTML = `<main class="login-screen"><section class="login-card"><div class="brand-mark login-brand-mark">S</div><div class="brand-name login-brand-name">signal<span>desk</span></div><div class="page-eyebrow login-eyebrow"><span class="eyebrow-dot"></span>PRIVATE CLIENT WORKSPACE</div><h1>Sign in to SignalDesk</h1><p class="page-subtitle">A workspace password is required before live connector access. Your password is checked by the local server and is not saved in browser storage.</p><form id="login-form"><div class="form-field"><label for="workspace-password">Workspace password</label><input id="workspace-password" name="password" type="password" autocomplete="current-password" required autofocus></div><button class="button button-primary login-submit" type="submit">Unlock workspace ${icon('arrowRight', 14)}</button></form><p class="login-foot">Session expires after 8 hours or when the server restarts.</p></section></main>`;
    setTimeout(() => app.querySelector('#workspace-password')?.focus(), 0);
  }

  async function handleLoginSubmit(form) {
    const values = formDataObject(form);
    await apiJson('/api/session/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: values.password }) });
    authState = { required: true, authenticated: true, checked: true };
    renderApp();
    await refreshConnectorStatus(false);
    renderApp();
    showToast('Workspace unlocked.');
  }

  async function logoutWorkspace() {
    try { await apiJson('/api/session/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }); }
    catch { /* Clear the UI gate even if the session already expired. */ }
    authState = { required: true, authenticated: false, checked: true };
    renderLoginGate();
  }

  function consumeMetaCallbackNotice() {
    if (typeof window === 'undefined' || !window.location?.search) return;
    const params = new URLSearchParams(window.location.search);
    const result = params.get('meta_connection');
    if (!result) return;
    const messages = {
      success: 'Meta authorization completed. Choose the ad account to sync.',
      denied: 'Meta authorization was declined; no connection was added.',
      failed: 'Meta connection did not complete. Check the app setup guide and try again.',
      state_expired: 'Meta authorization expired. Start the connection again.',
    };
    showToast(messages[result] || 'Meta connection status updated.', result === 'success' ? 'success' : 'error');
    window.history?.replaceState?.({}, document.title, `${window.location.pathname}${window.location.hash}`);
  }

  function renderApp() {
    if (!authState.checked) { app.innerHTML = '<div class="boot-screen"><span class="boot-mark">S</span><span>Checking workspace access…</span></div>'; return; }
    if (authState.required && !authState.authenticated) { renderLoginGate(); return; }
    const client = getActiveClient();
    const content = currentPage === 'overview' ? renderOverview(client)
      : currentPage === 'campaigns' ? renderCampaignsPage(client)
      : currentPage === 'clients' ? renderClientsPage(client)
      : currentPage === 'trackers' ? renderTrackersPage(client)
      : currentPage === 'connections' ? renderConnectionsPage()
      : renderReportsPage(client);
    app.innerHTML = `<div class="app-shell">${renderSidebar(client)}<div class="mobile-backdrop" data-action="close-mobile"></div><main class="main">${renderTopbar()}<section class="page-wrap">${content}</section></main></div>`;
  }

  function pageHeading(title, subtitle, eyebrow, actions = '') {
    return `<div class="page-heading"><div><div class="page-eyebrow"><span class="eyebrow-dot"></span>${escapeHtml(eyebrow)}</div><h1>${escapeHtml(title)}</h1><p class="page-subtitle">${escapeHtml(subtitle)}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
  }
  function metricCard(label, value, foot, iconName, valueClass = '') {
    return `<article class="metric-card"><div class="metric-top"><div class="metric-label">${escapeHtml(label)}</div><div class="metric-icon">${icon(iconName, 15)}</div></div><div class="metric-value ${valueClass}">${escapeHtml(value)}</div><div class="metric-foot">${icon('info', 11)}<span>${escapeHtml(foot)}</span></div></article>`;
  }
  function periodLabelOrMissing(period) { return period ? formatRange(period.start, period.end) : 'No campaign report imported'; }

  function renderJourney(client, period, summary) {
    const outcome = matchingOutcome(client.id, period);
    const resultText = summary.resultCount === null ? '—' : formatNumber(summary.resultCount);
    const resultDescription = summary.labels.length === 1 ? summary.labels[0] : 'Meta-reported results';
    const stages = [
      { title: resultDescription, caption: 'Meta Ads · campaign level', value: resultText, unknown: summary.resultCount === null, icon: 'message' },
      { title: 'Qualified inquiries', caption: 'Business outcome · same period', value: outcome?.qualifiedInquiries == null ? 'Not reported' : formatNumber(outcome.qualifiedInquiries), unknown: outcome?.qualifiedInquiries == null, icon: 'target' },
      { title: 'Owner-approved opportunities', caption: 'Feasibility and intent confirmed', value: outcome?.opportunities == null ? 'Not reported' : formatNumber(outcome.opportunities), unknown: outcome?.opportunities == null, icon: 'checkCircle' },
      { title: 'Booked / completed jobs', caption: 'Business outcome · same period', value: outcome ? `${outcome.bookings == null ? '—' : formatNumber(outcome.bookings)} booked · ${outcome.completedJobs == null ? '—' : formatNumber(outcome.completedJobs)} done` : 'Not reported', unknown: !outcome || (outcome.bookings == null && outcome.completedJobs == null), icon: 'briefcase' },
    ];
    return `<div class="journey-body">${stages.map((stage, index) => `<div class="journey-row"><div class="journey-node ${stage.unknown ? 'muted' : ''}">${icon(stage.icon, 14)}</div><div class="journey-text"><strong>${escapeHtml(stage.title)}</strong><span>${escapeHtml(stage.caption)}</span></div><div class="journey-value ${stage.unknown ? 'unknown' : ''}">${escapeHtml(stage.value)}</div></div>`).join('')}<div class="journey-note">Meta conversations are not automatically qualified inquiries, bookings or completed work. Blank data is shown as “Not reported,” never as zero.${outcome ? ` This outcome entry matches ${escapeHtml(formatRange(period.start, period.end))}.` : ''}</div></div>`;
  }

  function renderHealthList(client, hasReport) {
    const isHerrero = client?.id === 'rh-piano';
    const meta = connectorState.meta || {};
    const liveConnected = Boolean(meta.connected && !meta.expired);
    const metaStatusText = liveConnected ? (meta.selectedAccount?.name || 'Authorized · choose an ad account') : meta.expired ? 'Token expired · reconnect required' : meta.configured ? 'App configured · authorization pending' : 'No live OAuth connection in this workspace';
    const metaStatusLabel = liveConnected ? 'Connected' : meta.expired ? 'Expired' : meta.configured ? 'Ready' : 'Not connected';
    return `<div class="health-list">
      <div class="health-row"><div class="health-icon ${liveConnected ? '' : 'warn'}">${icon('connections', 14)}</div><div class="health-copy"><strong>Meta Ads reporting · read-only</strong><span>${escapeHtml(metaStatusText)}</span></div><span class="health-status ${liveConnected ? '' : 'warn'}">${escapeHtml(metaStatusLabel)}</span></div>
      <div class="health-row"><div class="health-icon">${icon('database', 14)}</div><div class="health-copy"><strong>Campaign performance data</strong><span>${hasReport ? 'Saved historical snapshot; manual source' : 'No report period imported yet'}</span></div><span class="health-status">${hasReport ? 'Historical' : 'Missing'}</span></div>
      <div class="health-row"><div class="health-icon neutral">${icon('pixel', 14)}</div><div class="health-copy"><strong>Pixel / Conversions API</strong><span>${isHerrero ? 'Last saved review: no events or integrations (Oct 2)' : 'No connection or event evidence uploaded'}</span></div><span class="health-status ${isHerrero ? 'warn' : ''}">${isHerrero ? 'Review needed' : 'Not checked'}</span></div>
      <div class="health-row"><div class="health-icon neutral">${icon('briefcase', 14)}</div><div class="health-copy"><strong>Business outcomes</strong><span>Use aggregate counts; customer details are not needed here</span></div><span class="health-status">${outcomesFor(client.id).length ? `${outcomesFor(client.id).length} periods` : 'Not tracked'}</span></div>
    </div>`;
  }

  function statusBadge(status) {
    return `<span class="badge ${statusClass(status)}">${escapeHtml(status || 'Not reported')}</span>`;
  }
  function levelName(level) {
    const value = String(level || 'campaign').toLowerCase();
    return value === 'ad set' || value === 'adset' ? 'Ad set' : value.charAt(0).toUpperCase() + value.slice(1);
  }
  function resultCell(row) {
    if (row.resultCount === null || row.resultCount === undefined || row.resultCount === '') {
      const actionNote = Array.isArray(row.actionBreakdown) && row.actionBreakdown.length > 1 ? 'Multiple action types · see details' : Array.isArray(row.actionBreakdown) && row.actionBreakdown.length === 1 ? 'Action value not reported' : 'No result reported';
      return `<span class="text-strong">—</span><span class="campaign-meta">${escapeHtml(actionNote)}</span>`;
    }
    return `<span class="text-strong">${escapeHtml(formatNumber(row.resultCount))}</span><span class="campaign-meta">${escapeHtml(row.resultLabel || 'Result label not supplied')}</span>`;
  }
  function campaignRowsMarkup(rows, client, { compact = false } = {}) {
    if (!rows.length) return `<tr><td colspan="${compact ? 7 : 9}" class="empty-cell">No campaign records match this view.<br>Import a Meta Ads report or add an internal tracking record.</td></tr>`;
    return rows.map((row) => `<tr>
      <td><div class="campaign-cell"><span class="campaign-title">${escapeHtml(row.name || 'Unnamed campaign')}</span><span class="campaign-meta">${row.sourceEntityId ? `ID · ${escapeHtml(row.sourceEntityId)}` : escapeHtml(sourceShort(row.source))}</span></div></td>
      <td>${escapeHtml(row.objective || '—')}</td>
      ${compact ? '' : `<td>${escapeHtml(levelName(row.level))}</td>`}
      <td>${statusBadge(row.status)}</td>
      <td class="text-strong">${escapeHtml(moneyOrBlank(row.spend, row.currency || client?.currency || 'PHP'))}</td>
      <td><div>${resultCell(row)}</div></td>
      <td>${escapeHtml(row.periodStart && row.periodEnd ? formatRange(row.periodStart, row.periodEnd) : '—')}</td>
      ${compact ? '' : `<td><span class="campaign-meta">${escapeHtml(sourceShort(row.source))}</span></td>`}
      <td><button class="button button-small button-quiet" type="button" data-action="campaign-details" data-id="${escapeHtml(row.id)}">Details</button></td>
    </tr>`).join('');
  }
  function sortCampaigns(rows) {
    return [...rows].sort((a, b) => {
      const aDate = a.periodEnd || '';
      const bDate = b.periodEnd || '';
      if (aDate && bDate) return bDate.localeCompare(aDate) || (a.level === 'campaign' ? -1 : 1);
      if (aDate) return -1;
      if (bDate) return 1;
      const statusRank = (s) => String(s).toLowerCase().includes('draft') ? 1 : 2;
      return statusRank(a.status) - statusRank(b.status) || String(a.name).localeCompare(String(b.name));
    });
  }

  function renderOverview(client) {
    if (!client) return renderNoClient();
    const period = getSelectedPeriod(client.id);
    const rows = selectedPeriodRows(client.id);
    const summary = metricSummary(rows);
    const rangeText = periodLabelOrMissing(period);
    const action = `<div class="select-wrap"><select data-role="client-picker" aria-label="Choose client">${db.clients.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === client.id ? 'selected' : ''}>${escapeHtml(item.name)}</option>`).join('')}</select></div><button type="button" class="button button-primary" data-action="open-import">${icon('upload', 14)} Import report</button>`;
    const reportRows = sortCampaigns(campaignsFor(client.id)).slice(0, 4);
    const snapshotHeadline = rows.length ? 'Saved report snapshot · no live Meta connection' : 'No report loaded · no live Meta connection';
    const savedStudyContext = client.id === 'rh-piano' ? 'Last saved account study: Oct 2, 2026.' : 'No live account data has been verified for this client.';
    const spendAuthorizationNote = client.id === 'rh-piano' ? 'No spend limit is approved in the saved client brief.' : 'Any live spend needs separate owner approval outside this app.';
    const resultMetricLabel = summary.labels.length === 1 ? summary.labels[0] : 'Meta-reported results';
    const spendFoot = !summary.sameCurrency ? 'Mixed currencies · not combined' : period ? `${rangeText} · campaign-level data` : 'No campaign report imported';
    const resultFoot = summary.resultCount === null ? (!summary.sameAttribution && summary.sameResultDefinition ? 'Attribution not verified · not combined' : 'Exact result type / totals unavailable') : `${rangeText} · not a booked-job count`;
    const costFoot = !summary.sameCurrency ? 'Mixed currencies · not comparable' : summary.costPerResult === null ? 'Requires comparable result + spend data' : `Meta cost per ${summary.labels[0] || 'reported result'}`;
    const reachFoot = rows.length > 1 ? 'Not summed across campaigns; audiences can overlap' : rows.length === 1 ? `${rangeText} · Meta-reported` : 'No reach data supplied';
    return `${pageHeading('Overview', 'A calm, client-by-client view of ad delivery, business outcomes and tracking gaps.', 'Client workspace', action)}
      <div class="status-banner"><div class="status-banner-icon">${icon('shield', 16)}</div><div class="status-banner-copy"><strong>${escapeHtml(snapshotHeadline)}</strong><span>Numbers below come from saved records, not a live API sync. This workspace cannot publish ads or change budgets. ${escapeHtml(spendAuthorizationNote)} ${escapeHtml(savedStudyContext)}</span></div><button type="button" class="button" data-action="navigate" data-page="connections">${icon('link', 13)} Connection setup</button></div>
      <div class="period-control">${icon('calendar', 13)}<span>Reporting period</span>${periodSelect(client.id, 'period-select')}<span>·</span><span>${rows.length ? `${rows.length} campaign-level row${rows.length === 1 ? '' : 's'}` : 'No matching campaign rows'}</span></div>
      <div class="metrics-grid">
        ${metricCard('Amount spent', formatMoney(summary.spend, summary.currency || client.currency), spendFoot, 'coins', 'small-value')}
        ${metricCard(resultMetricLabel, summary.resultCount === null ? '—' : formatNumber(summary.resultCount), resultFoot, 'message')}
        ${metricCard('Cost per result', formatMoney(summary.costPerResult, summary.currency || client.currency), costFoot, 'target', 'small-value')}
        ${metricCard('Reach', summary.reach === null ? '—' : formatNumber(summary.reach), reachFoot, 'eye')}
      </div>
      <div class="grid-two">
        <section class="panel"><div class="panel-header"><div><h2 class="panel-title">From ad result to real-world outcome</h2><p class="panel-subtitle">Keep Meta activity separate from qualified leads, bookings and completed work.</p></div><button class="panel-header-action" type="button" data-action="navigate" data-page="trackers">Open trackers ${icon('arrowRight', 13)}</button></div>${renderJourney(client, period, summary)}</section>
        <section class="panel"><div class="panel-header"><div><h2 class="panel-title">Tracking health</h2><p class="panel-subtitle">Current workspace setup and the most recent saved evidence.</p></div><button class="panel-header-action" type="button" data-action="navigate" data-page="connections">Manage ${icon('arrowRight', 13)}</button></div>${renderHealthList(client, rows.length > 0)}</section>
      </div>
      <section class="panel table-panel"><div class="panel-header"><div><h2 class="panel-title">Campaign records</h2><p class="panel-subtitle">Reporting log only — these controls do not modify Meta Ads Manager.</p></div><button class="panel-header-action" type="button" data-action="navigate" data-page="campaigns">All campaign records ${icon('arrowRight', 13)}</button></div>
        <div class="table-wrap"><table><thead><tr><th>Campaign</th><th>Objective</th><th>Delivery</th><th>Spend</th><th>Results</th><th>Report period</th><th>Details</th></tr></thead><tbody>${campaignRowsMarkup(reportRows, client, { compact: true })}</tbody></table></div>
        <div class="table-footer"><span>Source: ${client.id === 'rh-piano' ? 'saved study · manually transcribed from Ads Manager' : 'client workspace records'}</span><span>Blank values mean not reported — not zero.</span></div>
      </section>`;
  }

  function renderNoClient() {
    return `${pageHeading('Welcome to SignalDesk', 'Create a client workspace to start tracking campaign reports and business outcomes.', 'Getting started')}
      <div class="panel client-empty"><div><div class="client-empty-icon">${icon('clients', 21)}</div><h3>No client workspace yet</h3><p>Create a client profile. This local prototype stores business-level details and aggregate reporting only—no passwords, access tokens or customer contact details.</p><button class="button button-primary" type="button" data-action="new-client">${icon('plus', 14)} Add a client</button></div></div>`;
  }

  function renderCampaignsPage(client) {
    if (!client) return renderNoClient();
    const actions = `<button class="button" type="button" data-action="export-report" data-report="campaigns">${icon('download', 14)} Export CSV</button><button class="button" type="button" data-action="open-import">${icon('upload', 14)} Import Ads CSV</button><button class="button button-primary" type="button" data-action="new-campaign">${icon('plus', 14)} Add record</button>`;
    return `${pageHeading('Campaigns', 'Review Meta campaign, ad set and ad snapshots without changing anything in the connected account.', 'Performance log', actions)}
      <div class="subtle-note">${icon('info', 15)}<span><strong>Tracking only:</strong> adding a row records information in this browser; it does not create, publish, pause or edit a Meta campaign. To avoid double-counting, the overview rolls up campaign-level rows only.</span></div>
      <div class="toolbar"><div class="toolbar-left"><div class="search-field">${icon('search', 15)}<input id="campaign-search" type="search" value="${escapeHtml(campaignFilters.search)}" placeholder="Search campaigns, IDs or objectives…" aria-label="Search campaign records"></div><select class="toolbar-select" data-role="campaign-level" aria-label="Filter by reporting level"><option value="all" ${campaignFilters.level === 'all' ? 'selected' : ''}>All levels</option><option value="campaign" ${campaignFilters.level === 'campaign' ? 'selected' : ''}>Campaign</option><option value="ad set" ${campaignFilters.level === 'ad set' ? 'selected' : ''}>Ad set</option><option value="ad" ${campaignFilters.level === 'ad' ? 'selected' : ''}>Ad</option></select><select class="toolbar-select" data-role="campaign-status" aria-label="Filter by status"><option value="all" ${campaignFilters.status === 'all' ? 'selected' : ''}>All delivery</option><option value="active" ${campaignFilters.status === 'active' ? 'selected' : ''}>Active</option><option value="draft" ${campaignFilters.status === 'draft' ? 'selected' : ''}>In draft</option><option value="off" ${campaignFilters.status === 'off' ? 'selected' : ''}>Off / paused</option></select></div><div class="toolbar-right"><span class="source-note" id="campaign-table-count">${campaignsFor(client.id).length} tracked row${campaignsFor(client.id).length === 1 ? '' : 's'}</span></div></div>
      <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Campaign / entity</th><th>Objective</th><th>Level</th><th>Delivery</th><th>Spend</th><th>Results</th><th>Report period</th><th>Source</th><th></th></tr></thead><tbody id="campaign-table-body">${campaignRowsMarkup(filterCampaignRows(client), client)}</tbody></table></div><div class="table-footer"><span>Imported CSV rows save only mapped aggregate fields; uploaded files are not sent to a server.</span><span>Workspace is browser-local · no live sync</span></div></section>
      <div class="report-data-note"><strong>Data integrity:</strong> keep the exact Meta result name, attribution window, currency and report period with every import. Blank values remain blank. Don't sum campaign, ad set and ad rows together.</div>`;
  }

  function filterCampaignRows(client) {
    const query = campaignFilters.search.trim().toLowerCase();
    return sortCampaigns(campaignsFor(client.id).filter((row) => {
      if (campaignFilters.level !== 'all' && String(row.level || 'campaign').toLowerCase() !== campaignFilters.level) return false;
      const statusTokens = statusWords(row.status);
      if (campaignFilters.status === 'active' && !statusTokens.includes('active')) return false;
      if (campaignFilters.status === 'draft' && !statusTokens.includes('draft')) return false;
      if (campaignFilters.status === 'off' && !(statusTokens.includes('off') || statusTokens.includes('paused'))) return false;
      if (query && ![row.name, row.objective, row.status, row.sourceEntityId].some((value) => String(value || '').toLowerCase().includes(query))) return false;
      return true;
    }));
  }

  function renderClientsPage(client) {
    const actions = `<button class="button button-primary" type="button" data-action="new-client">${icon('plus', 14)} Add client</button>`;
    const list = db.clients.map((item) => `<button type="button" class="client-list-row ${item.id === client?.id ? 'selected' : ''}" data-action="select-client" data-id="${escapeHtml(item.id)}"><span class="client-logo">${escapeHtml(clientInitials(item.name))}</span><span class="client-list-copy"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.channel || 'No primary platform')} · ${item.accountLabel ? 'account added' : 'setup incomplete'}</span></span>${icon('chevron', 14)}</button>`).join('');
    const selected = client ? renderClientProfile(client) : `<div class="client-empty"><div><div class="client-empty-icon">${icon('clients', 20)}</div><h3>Select a client</h3><p>Choose a workspace or add a new client to get started.</p></div></div>`;
    return `${pageHeading('Clients', 'Keep separate ad accounts, report periods and business outcome trackers for each client.', 'Client workspaces', actions)}
      <div class="subtle-note">${icon('lock', 14)}<span>Client details are saved in this browser only. Store business-level settings here; do not enter passwords, access tokens, customer names, phone numbers or service addresses.</span></div>
      <div class="clients-layout"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Your clients</h2><p class="panel-subtitle">${db.clients.length} workspace${db.clients.length === 1 ? '' : 's'} · local browser data</p></div></div><div class="client-list-panel">${list || '<p class="source-note">No clients yet.</p>'}</div></section><section class="panel">${selected}</section></div>`;
  }

  function renderClientProfile(client) {
    const account = client.accountLabel ? `${client.accountLabel}${client.accountSuffix ? ` · ending ${client.accountSuffix}` : ''}` : 'Not added';
    const connection = client.id === 'rh-piano' ? 'Not connected · saved historical review only' : 'Not connected · OAuth setup required';
    const lastReview = client.lastReview ? formatDate(client.lastReview) : 'No review saved';
    const details = [
      ['Primary platform', client.channel || 'Not specified'],
      ['Business / ad account', account],
      ['Currency · time zone', `${client.currency || 'Not set'} · ${client.timezone || 'Not set'}`],
      ['Service area', client.serviceArea || 'Not provided'],
      ['Products / services', client.services || 'Not provided'],
      ['Primary business outcome', client.goal || 'Not provided'],
      ['Customer contact path', client.contactPath || 'Not provided'],
      ['Connection status', connection],
      ['Last saved account review', lastReview],
    ];
    return `<div class="client-profile"><div class="client-profile-head"><div class="client-profile-logo">${escapeHtml(clientInitials(client.name))}</div><div class="client-profile-title"><h2>${escapeHtml(client.name)}</h2><p>${escapeHtml(client.channel || 'Platform not selected')} workspace · local profile</p></div><button class="button button-small" type="button" data-action="edit-client" data-id="${escapeHtml(client.id)}">${icon('edit', 13)} Edit profile</button></div><div class="client-detail-grid">${details.map(([label, value]) => `<div class="detail-item"><span class="detail-label">${escapeHtml(label)}</span><span class="detail-value">${escapeHtml(value)}</span></div>`).join('')}</div><div class="client-profile-foot"><span class="source-note">${client.sourceRef ? `Profile source: ${escapeHtml(client.sourceRef)}` : 'No source reference added'}</span><button class="button button-small" type="button" data-action="navigate" data-page="connections">View connections ${icon('arrowRight', 12)}</button></div></div>`;
  }

  function trackerCard({ title, description, iconName, state, button, action, dataId = '', page = '', tint = '' }) {
    return `<article class="info-card"><div class="info-card-top"><div class="info-card-icon ${tint}">${icon(iconName, 17)}</div><div class="info-card-heading"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(state)}</p></div></div><p class="info-card-text">${escapeHtml(description)}</p><div class="info-card-bottom"><small>${escapeHtml(state)}</small><button class="button button-small" type="button" data-action="${escapeHtml(action)}" ${page ? `data-page="${escapeHtml(page)}"` : ''} ${dataId ? `data-id="${escapeHtml(dataId)}"` : ''}>${escapeHtml(button)} ${icon('arrowRight', 12)}</button></div></article>`;
  }

  function renderOutcomesTable(client) {
    const rows = [...outcomesFor(client.id)].sort((a, b) => b.periodEnd.localeCompare(a.periodEnd));
    if (!rows.length) return `<div class="table-wrap"><table class="outcome-table"><thead><tr><th>Reporting window</th><th>Qualified inquiries</th><th>Approved opportunities</th><th>Bookings</th><th>Completed jobs</th><th>Net cash collected</th><th>Direct costs</th></tr></thead><tbody><tr><td colspan="7" class="empty-cell">No aggregate business-outcome periods entered.<br>Add counts only—customer contact details are not required.</td></tr></tbody></table></div>`;
    return `<div class="table-wrap"><table class="outcome-table"><thead><tr><th>Reporting window</th><th>Qualified inquiries</th><th>Approved opportunities</th><th>Bookings</th><th>Completed jobs</th><th>Net cash collected</th><th>Direct costs</th></tr></thead><tbody>${rows.map((row) => `<tr><td><span class="text-strong">${escapeHtml(formatRange(row.periodStart, row.periodEnd))}</span><span class="campaign-meta">Aggregate entry · ${escapeHtml(formatDate(row.updatedOn || row.createdOn || todayISO()))}</span></td><td class="outcome-cell">${escapeHtml(row.qualifiedInquiries == null ? '—' : formatNumber(row.qualifiedInquiries))}</td><td class="outcome-cell">${escapeHtml(row.opportunities == null ? '—' : formatNumber(row.opportunities))}</td><td class="outcome-cell">${escapeHtml(row.bookings == null ? '—' : formatNumber(row.bookings))}</td><td class="outcome-cell">${escapeHtml(row.completedJobs == null ? '—' : formatNumber(row.completedJobs))}</td><td>${escapeHtml(moneyOrBlank(row.netCashCollected, client.currency))}</td><td>${escapeHtml(moneyOrBlank(row.directCosts, client.currency))}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderExperimentTable(client) {
    const rows = [...experimentsFor(client.id)].sort((a, b) => String(b.periodEnd || '').localeCompare(String(a.periodEnd || '')));
    if (!rows.length) return `<div class="empty-cell">No creative-test rows yet. Add a tracking note after a campaign result has been verified; this does not change any ad creative.</div>`;
    return `<div class="table-wrap"><table><thead><tr><th>Variant / test</th><th>Format</th><th>Campaign</th><th>Spend</th><th>Exact result</th><th>Period</th></tr></thead><tbody>${rows.map((row) => `<tr><td><span class="text-strong">${escapeHtml(row.name)}</span></td><td>${escapeHtml(row.format)}</td><td>${escapeHtml(row.campaignName || 'Not linked')}</td><td>${escapeHtml(moneyOrBlank(row.spend, client.currency))}</td><td>${row.resultCount == null ? '—' : `${escapeHtml(formatNumber(row.resultCount))} · ${escapeHtml(row.resultLabel || 'label not supplied')}`}</td><td>${escapeHtml(row.periodStart && row.periodEnd ? formatRange(row.periodStart, row.periodEnd) : '—')}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderTrackersPage(client) {
    if (!client) return renderNoClient();
    const campaignCount = campaignsFor(client.id).length;
    const outcomeCount = outcomesFor(client.id).length;
    const creativeCount = experimentsFor(client.id).length;
    const isHerrero = client.id === 'rh-piano';
    const cards = [
      trackerCard({ title: 'Meta Ads performance', description: 'Campaign, ad set and ad reporting: spend, delivery, reach, impressions, exact result labels, attribution and report provenance.', iconName: 'chart', state: campaignCount ? `${campaignCount} saved record${campaignCount === 1 ? '' : 's'} · no live sync` : 'No records yet', button: 'View campaigns', action: 'navigate', page: 'campaigns', tint: '' }),
      trackerCard({ title: 'Qualified inquiries & pipeline', description: 'Record aggregate inquiry quality, owner-approved opportunities, bookings and completed jobs by matching report period.', iconName: 'target', state: outcomeCount ? `${outcomeCount} aggregate period${outcomeCount === 1 ? '' : 's'}` : 'No outcome periods', button: 'Add aggregate counts', action: 'new-outcome', tint: 'blue' }),
      trackerCard({ title: 'Pixel & event quality', description: 'Keep a dated record of Pixel / Conversions API setup and event receipts. No live event feed is connected in this build.', iconName: 'pixel', state: isHerrero ? 'Last saved review: no events / integrations' : 'Not checked for this client', button: 'View setup', action: 'open-connector', dataId: 'meta-pixel', tint: 'amber' }),
      trackerCard({ title: 'Creative test log', description: 'Compare static photo variants with exact reporting windows and result definitions. Log only verified, comparable rows.', iconName: 'camera', state: creativeCount ? `${creativeCount} test row${creativeCount === 1 ? '' : 's'}` : 'No creative tests logged', button: 'Add test row', action: 'new-experiment', tint: '' }),
      trackerCard({ title: 'Attribution & UTM source', description: 'Track landing-page or referral source only when tags and source evidence are actually available; unknown stays unknown.', iconName: 'tag', state: 'No source-tag evidence imported', button: 'View setup', action: 'open-connector', dataId: 'utm', tint: 'gray' }),
      trackerCard({ title: 'Client & account health', description: 'Track each client’s account label, currency, time zone, last checked date and connection status without storing credentials.', iconName: 'building', state: `${db.clients.length} client workspace${db.clients.length === 1 ? '' : 's'}`, button: 'Open clients', action: 'navigate', page: 'clients', tint: 'blue' }),
      trackerCard({ title: 'Spend & authorization', description: 'Separate observed account budgets from owner-approved limits. Compare approved spend only after its scope and stop control are verified.', iconName: 'wallet', state: client.id === 'rh-piano' ? 'No approved spend limit in the saved brief' : 'Approval not recorded', button: 'Review records', action: 'navigate', page: 'campaigns', tint: 'amber' }),
    ].join('');
    const period = getSelectedPeriod(client.id);
    const outcomeAction = `<button class="button button-primary" type="button" data-action="new-outcome">${icon('plus', 13)} Add aggregate outcomes</button>`;
    const experimentAction = `<button class="button" type="button" data-action="new-experiment">${icon('plus', 13)} Add creative test row</button>`;
    const reportDesc = period ? `The current campaign report period is ${formatRange(period.start, period.end)}. Business outcomes are compared only when the date range matches exactly.` : 'Import a campaign report first; business outcomes remain separate until report dates are aligned.';
    return `${pageHeading('Trackers', 'Connect ad delivery to measurable business outcomes—without collecting unnecessary customer data.', 'Measurement workspace', `<button class="button" type="button" data-action="export-report" data-report="outcomes">${icon('download', 13)} Export outcomes</button>`)}
      <section class="tracker-hero"><div class="tracker-hero-copy"><div class="eyebrow">MEASUREMENT, NOT GUESSWORK</div><h2>Keep platform results and real jobs in separate lanes.</h2><p>${escapeHtml(reportDesc)} A Meta conversation is not automatically a qualified lead, booking, sale or profit.</p></div><button class="button button-primary" type="button" data-action="new-outcome">${icon('plus', 14)} Add outcome period</button></section>
      <div class="cards-grid">${cards}</div>
      <div class="section-heading"><div><h2>Business outcome tracker</h2><p>One aggregate row per exact reporting window. Blank means not supplied; zero means explicitly confirmed zero.</p></div>${outcomeAction}</div>
      <section class="panel table-panel">${renderOutcomesTable(client)}<div class="table-footer"><span>No customer names, phone numbers, addresses or message contents are stored.</span><span>Only matched date ranges are compared to ad results.</span></div></section>
      <div class="section-heading"><div><h2>Creative test log</h2><p>Internal measurement entries only; no creative changes are performed here.</p></div>${experimentAction}</div>
      <section class="panel table-panel">${renderExperimentTable(client)}<div class="table-footer"><span>Use the exact Meta result label and attribution setting.</span><span>Do not declare a winner from unmatched or small samples.</span></div></section>`;
  }

  const connectorGroups = [
    {
      title: 'Meta ecosystem · primary',
      items: [
        { id: 'meta-business', name: 'Meta Business Suite', icon: 'facebook', description: 'Business portfolio, Pages and asset context for each client workspace.', state: 'Not connected', tint: 'blue', detail: 'A live link needs a Meta developer app, reviewed permissions and a secure server-side OAuth callback. Business identity checks remain on Meta.', steps: ['Create and configure a Meta app for the approved business use case.', 'Complete Meta review for the least-privilege permissions required by the selected assets.', 'Implement OAuth on a secure backend; keep tokens encrypted on the server, never in browser storage.', 'Select and verify the client’s Business Portfolio and Page using a read-only test first.'], warning: 'This static prototype does not sign into Meta, request permissions or bypass identity verification.' },
        { id: 'meta-ads', name: 'Meta Ads Manager', icon: 'megaphone', description: 'Campaign structure, delivery, budget settings and performance exports.', state: 'Not connected', tint: '', detail: 'The read-only Meta Marketing API OAuth flow is implemented in the Node server, but no Meta app credentials or account authorization are configured yet. Saved rows remain historical or local CSV data until the user completes setup.', steps: ['Create and configure a Meta Developer app for the business; register the exact /api/connectors/meta/callback URI.', 'Request only ads_read for the initial reporting connector and complete any Meta app review/advanced access required for the authorized user.', 'Set a strong APP_ACCESS_PASSWORD, then add the app ID, app secret and a locally generated 32-byte encryption key to the ignored .env file; never paste secrets into chat.', 'Authorize through Meta, choose the correct ad account for the client and verify currency, time zone, attribution and reporting level before relying on the sync.'], warning: 'Publishing, budget edits, pausing, targeting changes, lead retrieval and inbox messages are not implemented. Connecting read-only reports does not authorize spend.' },
        { id: 'meta-pixel', name: 'Meta Pixel & Conversions API', icon: 'pixel', description: 'Website event receipt, event match quality and server-side event health.', state: 'Not connected', tint: 'amber', detail: 'This is a tracking-health slot only. The last saved study for the PIANO dataset reported no received events and no integrations on Oct 2, 2026; that is not a live check.', steps: ['Confirm whether a website or server-side event source actually exists.', 'Verify the correct dataset and permitted event names with the account owner.', 'Add a server-side event relay with deduplication and consent controls if applicable.', 'Record a fresh test event and timestamp before interpreting conversion performance.'], warning: 'Do not paste Pixel tokens, access tokens or customer-level event data into this prototype.' },
        { id: 'meta-leads', name: 'Meta Leads & Messenger', icon: 'message', description: 'Lead forms and messaging activity, with a strict boundary between chats and verified outcomes.', state: 'Not connected', tint: 'blue', detail: 'No lead or Messenger API feed is connected. The tracker is designed around aggregate stage counts, not customer conversations.', steps: ['Confirm which Page, lead form or inbox is in scope and who can access it.', 'Complete the relevant Meta app review and Page permissions.', 'Use a secure server-side webhook and minimize retained data.', 'Test handoff, deduplication and owner confirmation before relying on lead-stage metrics.'], warning: 'Do not upload customer exports or message contents here. Customer names, phone numbers and addresses are deliberately excluded.' },
      ],
    },
    {
      title: 'Optional ad networks · not connected',
      items: [
        { id: 'google-ads', name: 'Google Ads', icon: 'megaphone', description: 'Optional paid-search campaign delivery and conversion-action reporting.', state: 'Optional · not connected', tint: 'blue', detail: 'Google Ads is an optional future source; this build does not access any Google Ads account.', steps: ['Create an approved Google Ads API project and secure OAuth client.', 'Configure access on a backend with read-only reporting scopes.', 'Choose the customer account and manager-account relationship for this client.', 'Validate currency, account time zone, conversion action and report level before comparison.'], warning: 'This is a setup outline only. No Google Ads login or conversion feed is active.' },
        { id: 'tiktok-ads', name: 'TikTok Ads', icon: 'megaphone', description: 'Optional campaign, ad group and ad reporting with exact platform result labels.', state: 'Optional · not connected', tint: 'gray', detail: 'TikTok Ads is an optional future source; API access, app approval and advertiser authorization would be required.', steps: ['Register an approved developer app for the intended advertising reporting use.', 'Implement OAuth and token handling only on a secure backend.', 'Select the advertiser account and request read-only reporting access.', 'Map spend, results, attribution and report level without mixing child rows.'], warning: 'No TikTok account has been connected or inspected.' },
        { id: 'linkedin-ads', name: 'LinkedIn Campaign Manager', icon: 'megaphone', description: 'Optional B2B campaign delivery and lead-form reporting.', state: 'Optional · not connected', tint: 'blue', detail: 'LinkedIn Campaign Manager is an optional future source; app approval, account authorization and minimum necessary permissions would be required.', steps: ['Register an approved LinkedIn developer app for the reporting use case.', 'Set up secure server-side OAuth and token revocation.', 'Select the client’s ad account and read-only reporting entities.', 'Validate form result definitions, date range, currency and attribution.'], warning: 'No LinkedIn campaign or lead data is available in this workspace.' },
      ],
    },
    {
      title: 'Imports & shared reporting',
      items: [
        { id: 'csv', name: 'Meta Ads CSV import', icon: 'sheet', description: 'Import aggregate campaign, ad set or ad snapshots from a CSV file on this device.', state: 'Available now · local import', tint: '', available: true },
        { id: 'sheets', name: 'Google Sheets', icon: 'sheet', description: 'Optional shared tracker source for approved business-level reporting.', state: 'Not connected', tint: 'blue', detail: 'A live sync would need an approved Google OAuth or service-account design, access scopes and a secure backend.', steps: ['Choose the specific client-owned workbook and the minimum fields to sync.', 'Set up Google OAuth or a restricted service account on a secure backend.', 'Map column names and protect against duplicate or overlapping periods.', 'Test read-only sync, access removal and audit logs.'], warning: 'This app does not accept Google credentials or spreadsheet share tokens.' },
      ],
    },
    {
      title: 'Optional sources · add only when useful',
      items: [
        { id: 'ga4', name: 'Google Analytics 4', icon: 'web', description: 'Optional website sessions and tagged traffic source reporting.', state: 'Optional · not connected', tint: 'blue', detail: 'An analytics connector is only useful when a client has a site, consent-compliant tagging and a verified conversion path.', steps: ['Confirm the client’s site, property and lawful consent setup.', 'Define the events that match the business outcome; do not equate visits with leads.', 'Configure read-only server-side OAuth and select the correct property.', 'Validate the time zone, attribution model and event definitions before comparison.'], warning: 'No Google Analytics data is currently loaded. This does not imply that any client has a website.' },
        { id: 'crm', name: 'CRM / lead stages', icon: 'clients', description: 'Optional HubSpot, Pipedrive or similar aggregate stage feedback.', state: 'Optional · not connected', tint: 'gray', detail: 'A CRM can help reconcile qualified inquiries, bookings and outcomes when its data is accurate and access is authorized.', steps: ['Select only the client-approved object and outcome fields.', 'Use server-side OAuth and aggregate/redact customer-level data before saving reports.', 'Define “qualified,” “booked” and “completed” consistently with the owner.', 'Test sample counts against the source and document attribution limitations.'], warning: 'Do not store CRM passwords, API keys, private customer notes or unnecessary lead details in this app.' },
        { id: 'utm', name: 'UTM / source attribution', icon: 'tag', description: 'Campaign tags and source labels to understand where inquiries originated.', state: 'Optional · no evidence imported', tint: 'amber', detail: 'UTM tags are useful only if the destination captures them and the source is preserved through the customer journey.', steps: ['Agree a consistent naming pattern for source, medium and campaign.', 'Add tags only after the destination and reporting path are verified.', 'Retain source evidence and reporting window with the aggregate outcome.', 'Keep “unknown” when a source cannot be reliably matched.'], warning: 'A tag or click is not proof of a qualified inquiry or sale.' },
        { id: 'calls-bookings', name: 'Calls & booking tools', icon: 'phone', description: 'Optional Calendly, booking platform or call tracking source for confirmed appointment stages.', state: 'Optional · manual first', tint: 'gray', detail: 'Booking data can be summarized manually first. A live sync is only needed if it is authorized, secure and operationally useful.', steps: ['Define what counts as requested, confirmed, completed or canceled.', 'Start with aggregate counts by reporting period to test the workflow.', 'If required, add an approved provider connector through a secure backend.', 'Reconcile cancellations and completed jobs before calculating acquisition cost.'], warning: 'A booking request is not a confirmed appointment; an appointment is not a completed job.' },
        { id: 'commerce', name: 'Payments & revenue', icon: 'wallet', description: 'Optional payment or commerce outcomes for clients who actually use those systems.', state: 'Optional · not connected', tint: 'blue', detail: 'Payment data should only be connected when a client has an applicable payment system and an approved, privacy-minimized reporting need.', steps: ['Choose aggregate paid, refunded and direct-cost fields with the owner.', 'Never collect payment credentials or card data in this app.', 'Use a server-side, read-only connector with access logs and revocation.', 'Distinguish cash collected, earned revenue, refunds, job costs and profit.'], warning: 'No financial outcome is inferred from ad spend or messaging counts.' },
      ],
    },
  ];

  function connectorDisplay(connector) {
    const meta = connectorState.meta || {};
    if (connector.id === 'meta-ads') {
      if (meta.connected && meta.expired) return { state: 'Token expired · reconnect', action: 'connect-meta', button: 'Reconnect Meta', dot: 'warn' };
      if (meta.connected && meta.selectedAccount) return { state: `Read-only · ${meta.selectedAccount.name}`, action: 'sync-meta', button: 'Sync report', dot: 'available' };
      if (meta.connected) return { state: 'Authorized · choose an ad account', action: 'choose-meta-account', button: 'Choose account', dot: 'available' };
      if (meta.configured) return { state: 'App configured · authorization pending', action: 'connect-meta', button: 'Connect Meta', dot: 'warn' };
      return { state: meta.storeError ? 'Check token encryption key' : 'Not configured · no app credentials', action: 'open-connector', button: 'Setup guide', dot: 'warn' };
    }
    if (connector.id === 'meta-business') return { state: 'Business Suite inbox not requested', action: 'open-connector', button: 'Setup guide', dot: '' };
    return { state: connector.state, action: connector.available ? 'open-import' : 'open-connector', button: connector.available ? 'Import file' : 'Setup guide', dot: connector.available ? 'available' : connector.id === 'meta-pixel' ? 'warn' : '' };
  }

  function renderConnectionsPage() {
    const meta = connectorState.meta || {};
    const metaLive = Boolean(meta.connected && !meta.expired);
    const selected = meta.selectedAccount;
    const headline = meta.storeError ? 'Meta token store needs attention' : metaLive ? 'Meta Ads read-only connection is active' : meta.expired ? 'Reconnect Meta to continue reporting' : meta.configured ? 'Meta OAuth is configured and ready' : 'Meta app configuration is still needed';
    const description = meta.storeError ? 'The encrypted token file could not be opened. Check the same TOKEN_ENCRYPTION_KEY used when it was saved; no token is returned to the browser.' : metaLive ? `${selected ? `Selected ad account: ${selected.name} · ${selected.currency || 'currency not returned'}.` : 'Meta user authorized; no client ad account has been selected yet.'} Only Ads Insights read access is enabled. Business Suite inbox and message data are not connected.` : meta.expired ? 'The stored Meta token has expired. Reconnect through Meta to renew read-only access.' : meta.configured ? 'The app is configured. Authorize a Meta user through Meta, then choose the correct ad account for this client.' : connectorState.server ? 'Add your own Meta Developer app values to the ignored local .env file and register the exact callback URI. Never paste app secrets into chat.' : 'Start the Node connector server, then configure your own Meta Developer app in the ignored .env file. The Python/static-only server does not expose OAuth routes.';
    const topAction = metaLive ? (selected ? 'sync-meta' : 'choose-meta-account') : meta.configured ? 'connect-meta' : 'open-connector';
    const topLabel = metaLive ? (selected ? 'Sync campaign report' : 'Choose ad account') : meta.configured ? 'Connect Meta' : 'Meta setup guide';
    const groups = connectorGroups.map((group) => `<div class="group-label">${escapeHtml(group.title)}</div><div class="cards-grid">${group.items.map((connector) => {
      const display = connectorDisplay(connector);
      const stateCopy = connector.id === 'meta-pixel' ? 'Saved evidence: PIANO dataset had no events/integrations on Oct 2; recheck in the source account.' : connector.id === 'meta-ads' ? (metaLive ? `Connected as ${meta.userName || 'Meta user'} · ${selected ? `account ${selected.name}` : 'select an account to sync'}.` : 'Connect with ads_read only. The token stays on the server; this UI never receives it.') : connector.id === 'meta-business' ? 'Meta Business Suite inbox/pages are not connected by the Ads Insights permission used here.' : connector.id === 'csv' ? 'The file is parsed in this browser; only selected aggregate columns are saved locally.' : 'Available as a future connector. No account or credentials have been added.';
      return `<article class="info-card connector-card"><div class="info-card-top"><div class="info-card-icon ${escapeHtml(connector.tint || '')}">${icon(connector.icon, 17)}</div><div class="info-card-heading"><h3>${escapeHtml(connector.name)}</h3><p>${escapeHtml(connector.description)}</p></div></div><p class="info-card-text">${escapeHtml(stateCopy)}</p><div class="status-line"><span class="mini-dot ${display.dot}"></span>${escapeHtml(display.state)}</div><div class="info-card-bottom"><small>${connector.id === 'meta-ads' ? 'Read-only · ads_read' : connector.available ? 'No external account access needed' : 'OAuth / provider approval required'}</small><button type="button" class="button button-small ${connector.available || connector.id === 'meta-ads' && meta.configured ? 'button-primary' : ''}" data-action="${display.action}" data-id="${escapeHtml(connector.id)}">${escapeHtml(display.button)} ${icon('arrowRight', 12)}</button></div></article>`;
    }).join('')}</div>`).join('');
    return `${pageHeading('Connections', 'Bring in the sources you need, then keep each report’s exact definitions and provenance.', 'Integrations & data sources', `<button type="button" class="button" data-action="open-import">${icon('upload', 14)} Import CSV</button>`)}
      <div class="connection-top"><div class="connection-top-copy"><div class="connection-top-icon">${icon(metaLive ? 'checkCircle' : 'lock', 17)}</div><div><h2>${escapeHtml(headline)}</h2><p>${escapeHtml(description)}</p></div></div><div class="connection-top-actions"><span class="badge ${metaLive ? 'badge-green' : 'badge-amber'}">${metaLive ? 'Read-only connected' : connectorState.server ? 'Local connector server' : 'Server not detected'}</span><button type="button" class="button button-small ${meta.configured && !metaLive ? 'button-primary' : ''}" data-action="${topAction}" data-id="meta-ads">${escapeHtml(topLabel)} ${icon('arrowRight', 12)}</button>${metaLive && selected ? `<button type="button" class="button button-small" data-action="choose-meta-account">Change account</button><button type="button" class="button button-small button-quiet" data-action="disconnect-meta">Disconnect</button>` : ''}</div></div>${groups}
      <div class="report-data-note"><strong>Privacy by design:</strong> CSV files are read in the browser and are not uploaded. Meta tokens are server-side only and encrypted at rest when configured. The initial connector does not access inbox messages or customer leads; local outcome tracking stores aggregates only.</div>`;
  }

  function renderReportsPage(client) {
    if (!client) return renderNoClient();
    const reports = [
      { kind: 'campaigns', title: 'Campaign performance snapshot', description: 'Campaign/ad set/ad tracking rows, exact result labels, date windows and source metadata.', icon: 'chart', button: 'Download campaign CSV' },
      { kind: 'outcomes', title: 'Business outcomes', description: 'Aggregate inquiries, opportunities, bookings, completed jobs, net cash and direct costs.', icon: 'briefcase', button: 'Download outcomes CSV' },
      { kind: 'clients', title: 'Client workspace register', description: 'Business-level client profile, account label suffix, currency, time zone and connection state.', icon: 'clients', button: 'Download client CSV' },
      { kind: 'sources', title: 'Data-source register', description: 'Connector availability and the setup status of supported source categories.', icon: 'database', button: 'Download source CSV' },
    ];
    return `${pageHeading('Reports', 'Export clean, privacy-conscious snapshots for a client review or handoff.', 'Reporting desk', `<button class="button" type="button" data-action="print-report">${icon('file', 14)} Print this page</button>`)}
      <div class="report-grid">${reports.map((report) => `<article class="report-card"><div class="report-card-icon">${icon(report.icon, 17)}</div><div class="report-card-copy"><h3>${escapeHtml(report.title)}</h3><p>${escapeHtml(report.description)}</p><button type="button" class="button button-small" data-action="export-report" data-report="${report.kind}">${icon('download', 12)} ${escapeHtml(report.button)}</button></div></article>`).join('')}</div>
      <div class="report-data-note"><strong>Current client:</strong> ${escapeHtml(client.name)}. Exports contain workspace-level and aggregate fields only. Campaign reports retain reporting period, attribution, level, result label and source; missing values remain blank. ${connectorState.meta?.connected && !connectorState.meta?.expired ? 'Meta sync is read-only and requires a fresh verification of the source account.' : 'Meta live sync is not currently connected for this client.'}</div>
      <div class="section-heading"><div><h2>Reporting rules</h2><p>Keep decisions grounded in comparable data.</p></div></div>
      <section class="panel"><div class="health-list"><div class="health-row"><div class="health-icon">${icon('calendar', 14)}</div><div class="health-copy"><strong>Use aligned reporting windows</strong><span>Compare business outcomes only with an exactly matching ad-report period.</span></div><span class="health-status">Required</span></div><div class="health-row"><div class="health-icon">${icon('layers', 14)}</div><div class="health-copy"><strong>Keep reporting levels separate</strong><span>Campaign, ad set and ad rows are not summed together.</span></div><span class="health-status">Required</span></div><div class="health-row"><div class="health-icon">${icon('message', 14)}</div><div class="health-copy"><strong>Separate platform and business results</strong><span>Conversations do not establish qualified inquiries, bookings or completed work.</span></div><span class="health-status">Required</span></div><div class="health-row"><div class="health-icon">${icon('lock', 14)}</div><div class="health-copy"><strong>Minimize personal data</strong><span>Store aggregate outcome counts; omit customer names, phone numbers and addresses.</span></div><span class="health-status">Required</span></div></div></section>`;
  }

  function renderClientOptions(selectedId = '') {
    return db.clients.map((client) => `<option value="${escapeHtml(client.id)}" ${client.id === selectedId ? 'selected' : ''}>${escapeHtml(client.name)}</option>`).join('');
  }

  function showModal(title, description, body, options = {}) {
    const wide = options.wide ? 'modal-wide' : '';
    const footer = options.footer || '';
    modalRoot.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal ${wide}" role="dialog" aria-modal="true" aria-labelledby="modal-heading"><header class="modal-header"><div><h2 id="modal-heading">${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Close dialog">${icon('x', 16)}</button></header><div class="modal-body">${body}</div>${footer ? `<footer class="modal-footer">${footer}</footer>` : ''}</section></div>`;
    const firstFocusable = modalRoot.querySelector('input:not([type="hidden"]), select, button, textarea');
    if (firstFocusable) setTimeout(() => firstFocusable.focus(), 0);
  }
  function closeModal() { modalRoot.innerHTML = ''; pendingImport = null; }

  function openClientModal(clientId = '') {
    const client = db.clients.find((item) => item.id === clientId) || null;
    const title = client ? 'Edit client profile' : 'Add a client workspace';
    const description = 'Save only business-level profile and account-label information. Never add login credentials or customer contact details.';
    const currencies = ['PHP', 'USD', 'AUD', 'CAD', 'EUR', 'GBP', 'SGD', 'NZD', 'JPY', 'Other'];
    const body = `<form id="client-form" data-client-id="${escapeHtml(client?.id || '')}"><div class="form-grid">
      <div class="form-field full"><label for="client-name">Business / client name *</label><input id="client-name" name="name" required maxlength="120" value="${escapeHtml(client?.name || '')}" placeholder="e.g. Example Piano Services"></div>
      <div class="form-field"><label for="client-channel">Primary platform</label><select id="client-channel" name="channel"><option ${!client?.channel || client.channel === 'Meta Ads' ? 'selected' : ''}>Meta Ads</option><option ${client?.channel === 'Google Ads' ? 'selected' : ''}>Google Ads</option><option ${client?.channel === 'TikTok Ads' ? 'selected' : ''}>TikTok Ads</option><option ${client?.channel === 'LinkedIn Ads' ? 'selected' : ''}>LinkedIn Ads</option><option ${client?.channel === 'Multi-channel' ? 'selected' : ''}>Multi-channel</option><option ${client?.channel === 'Other' ? 'selected' : ''}>Other</option></select></div>
      <div class="form-field"><label for="client-currency">Reporting currency</label><select id="client-currency" name="currency">${currencies.map((currency) => `<option value="${currency}" ${(client?.currency || 'PHP') === currency ? 'selected' : ''}>${currency}</option>`).join('')}</select></div>
      <div class="form-field"><label for="client-account-label">Business / ad account label</label><input id="client-account-label" name="accountLabel" maxlength="100" value="${escapeHtml(client?.accountLabel || '')}" placeholder="Optional label only"></div>
      <div class="form-field"><label for="client-account-suffix">Account ID suffix <span class="optional">(optional)</span></label><input id="client-account-suffix" name="accountSuffix" maxlength="8" value="${escapeHtml(client?.accountSuffix || '')}" placeholder="Last 4–8 digits only"><div class="form-help">Do not store a full account ID, access token or secret here.</div></div>
      <div class="form-field"><label for="client-timezone">Account time zone</label><input id="client-timezone" name="timezone" maxlength="80" value="${escapeHtml(client?.timezone || '')}" placeholder="e.g. Asia/Manila (GMT+8)"></div>
      <div class="form-field full"><label for="client-service-area">Service area / market</label><input id="client-service-area" name="serviceArea" maxlength="240" value="${escapeHtml(client?.serviceArea || '')}" placeholder="Business-level area only"></div>
      <div class="form-field full"><label for="client-services">Products / services</label><textarea id="client-services" name="services" maxlength="500" placeholder="Optional business-level offer summary">${escapeHtml(client?.services || '')}</textarea></div>
      <div class="form-field full"><label for="client-goal">Primary business outcome</label><input id="client-goal" name="goal" maxlength="240" value="${escapeHtml(client?.goal || '')}" placeholder="e.g. qualified inquiries and completed jobs"></div>
      <div class="form-field full"><label for="client-contact-path">Contact / booking path</label><input id="client-contact-path" name="contactPath" maxlength="180" value="${escapeHtml(client?.contactPath || '')}" placeholder="e.g. Messenger; owner confirms bookings"></div>
    </div><div class="form-note">${icon('lock', 14)}<span>Saved to this browser’s local storage. No server sync is active. Do not enter passwords, API tokens, customer names, phone numbers or addresses.</span></div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${client ? 'Save profile' : 'Create workspace'}</button></div></form>`;
    showModal(title, description, body, { wide: true });
  }

  function openCampaignModal() {
    const client = getActiveClient();
    if (!client) return;
    const body = `<form id="campaign-form"><div class="form-grid">
      <div class="form-field full"><label for="camp-name">Campaign / entity name *</label><input id="camp-name" name="name" required maxlength="180" placeholder="Name as reported in Ads Manager"></div>
      <div class="form-field"><label for="camp-level">Reporting level *</label><select id="camp-level" name="level"><option value="campaign">Campaign</option><option value="ad set">Ad set</option><option value="ad">Ad</option></select></div>
      <div class="form-field"><label for="camp-objective">Objective</label><input id="camp-objective" name="objective" maxlength="100" placeholder="Exact platform label"></div>
      <div class="form-field"><label for="camp-status">Delivery / status</label><select id="camp-status" name="status"><option>Not reported</option><option>Active</option><option>Paused</option><option>Off</option><option>In draft</option><option>Completed</option></select></div>
      <div class="form-field"><label for="camp-entity-id">Campaign / entity ID</label><input id="camp-entity-id" name="sourceEntityId" maxlength="80" placeholder="Optional source identifier"></div>
      <div class="form-field"><label for="camp-start">Report start <span class="optional">(optional)</span></label><input id="camp-start" name="periodStart" type="date"></div>
      <div class="form-field"><label for="camp-end">Report end <span class="optional">(optional)</span></label><input id="camp-end" name="periodEnd" type="date"></div>
      <div class="form-field"><label for="camp-spend">Amount spent (${escapeHtml(client.currency)})</label><input id="camp-spend" name="spend" type="number" min="0" step="0.01" placeholder="Leave blank if not reported"></div>
      <div class="form-field"><label for="camp-results">Results count</label><input id="camp-results" name="resultCount" type="number" min="0" step="1" placeholder="Blank means not reported"></div>
      <div class="form-field full"><label for="camp-result-label">Exact result name</label><input id="camp-result-label" name="resultLabel" maxlength="160" placeholder="e.g. Messaging conversations started"></div>
      <div class="form-field"><label for="camp-cost">Cost per result (${escapeHtml(client.currency)})</label><input id="camp-cost" name="costPerResult" type="number" min="0" step="0.01" placeholder="Optional"></div>
      <div class="form-field"><label for="camp-reach">Reach</label><input id="camp-reach" name="reach" type="number" min="0" step="1" placeholder="Optional"></div>
      <div class="form-field"><label for="camp-impressions">Impressions</label><input id="camp-impressions" name="impressions" type="number" min="0" step="1" placeholder="Optional"></div>
      <div class="form-field"><label for="camp-attribution">Attribution setting</label><input id="camp-attribution" name="attribution" maxlength="160" placeholder="Exact setting, if reported"></div>
    </div><div class="form-note">${icon('info', 14)}<span>Internal tracker row only; no Meta account changes. Use blanks for unavailable values and keep campaign/ad set/ad rows separate.</span></div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Save tracking record</button></div></form>`;
    showModal('Add campaign record', `For ${client.name} · this does not create or change a live campaign.`, body, { wide: true });
  }

  function openOutcomeModal() {
    const client = getActiveClient();
    if (!client) return;
    const period = getSelectedPeriod(client.id);
    const body = `<form id="outcome-form"><div class="form-grid">
      <div class="form-field"><label for="outcome-start">Reporting window starts *</label><input id="outcome-start" name="periodStart" type="date" required value="${escapeHtml(period?.start || '')}"></div>
      <div class="form-field"><label for="outcome-end">Reporting window ends *</label><input id="outcome-end" name="periodEnd" type="date" required value="${escapeHtml(period?.end || '')}"></div>
      <div class="form-field"><label for="outcome-qualified">Qualified inquiries</label><input id="outcome-qualified" name="qualifiedInquiries" type="number" min="0" step="1" placeholder="Leave blank if unknown"></div>
      <div class="form-field"><label for="outcome-opportunities">Owner-approved opportunities</label><input id="outcome-opportunities" name="opportunities" type="number" min="0" step="1" placeholder="Leave blank if unknown"></div>
      <div class="form-field"><label for="outcome-bookings">Bookings recorded</label><input id="outcome-bookings" name="bookings" type="number" min="0" step="1" placeholder="Leave blank if unknown"></div>
      <div class="form-field"><label for="outcome-completed">Completed jobs</label><input id="outcome-completed" name="completedJobs" type="number" min="0" step="1" placeholder="Leave blank if unknown"></div>
      <div class="form-field"><label for="outcome-cash">Net cash collected (${escapeHtml(client.currency)})</label><input id="outcome-cash" name="netCashCollected" type="number" step="0.01" placeholder="Optional · after refunds"></div>
      <div class="form-field"><label for="outcome-costs">Recorded direct job costs (${escapeHtml(client.currency)})</label><input id="outcome-costs" name="directCosts" type="number" min="0" step="0.01" placeholder="Optional · include travel"></div>
      <div class="form-field full"><div class="form-help">One aggregate record per exact window. Saving the same window updates its existing row. A blank field stays missing; enter 0 only when confirmed.</div></div>
    </div><div class="form-note">${icon('lock', 14)}<span>Do not enter names, phone numbers, addresses, conversation text or customer IDs. This tracker is aggregate-only and stays in this browser.</span></div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Save outcome totals</button></div></form>`;
    showModal('Add business outcome period', `Aggregate results for ${client.name}. Match the Ads Manager date range exactly where possible.`, body, { wide: true });
  }

  function openExperimentModal() {
    const client = getActiveClient();
    if (!client) return;
    const period = getSelectedPeriod(client.id);
    const campaignOptions = campaignsFor(client.id).map((row) => `<option value="${escapeHtml(row.id)}">${escapeHtml(row.name)}</option>`).join('');
    const creativeFormats = client.id === 'rh-piano' ? ['Static photo'] : ['Static photo', 'Carousel', 'Video', 'Other'];
    const body = `<form id="experiment-form"><div class="form-grid">
      <div class="form-field full"><label for="experiment-name">Creative / variant label *</label><input id="experiment-name" name="name" required maxlength="120" placeholder="Use an internal label, not customer information"></div>
      <div class="form-field"><label for="experiment-format">Format</label><select id="experiment-format" name="format">${creativeFormats.map((format) => `<option>${escapeHtml(format)}</option>`).join('')}</select></div>
      <div class="form-field"><label for="experiment-campaign">Campaign record</label><select id="experiment-campaign" name="campaignId"><option value="">Not linked</option>${campaignOptions}</select></div>
      <div class="form-field"><label for="experiment-start">Report start</label><input id="experiment-start" name="periodStart" type="date" value="${escapeHtml(period?.start || '')}"></div>
      <div class="form-field"><label for="experiment-end">Report end</label><input id="experiment-end" name="periodEnd" type="date" value="${escapeHtml(period?.end || '')}"></div>
      <div class="form-field"><label for="experiment-spend">Spend (${escapeHtml(client.currency)})</label><input id="experiment-spend" name="spend" type="number" min="0" step="0.01" placeholder="Optional"></div>
      <div class="form-field"><label for="experiment-results">Result count</label><input id="experiment-results" name="resultCount" type="number" min="0" step="1" placeholder="Optional"></div>
      <div class="form-field full"><label for="experiment-label">Exact result name</label><input id="experiment-label" name="resultLabel" maxlength="160" placeholder="e.g. Messaging conversations started"></div>
    </div><div class="form-note">${icon('info', 14)}<span>This is a measurement note only; it does not edit ads or creative. Record the exact period, attribution and Meta result name before comparing variants.</span></div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Save test row</button></div></form>`;
    showModal('Add creative test row', `Measurement entry for ${client.name}.`, body, { wide: true });
  }

  function openImportModal() {
    pendingImport = null;
    importDefaultLevel = 'campaign';
    renderImportModal();
  }
  function renderImportModal() {
    const selectedDefault = pendingImport?.defaultLevel || importDefaultLevel;
    const preview = pendingImport ? `<div class="import-preview"><div class="import-preview-top"><span>${escapeHtml(pendingImport.rows.length)} row${pendingImport.rows.length === 1 ? '' : 's'} ready to review</span><span class="badge ${pendingImport.rows.length ? 'badge-green' : 'badge-red'}">${pendingImport.rows.length ? 'Mapped' : 'No usable rows'}</span></div><p>File: ${escapeHtml(pendingImport.fileName)}. Rows without an explicit level column are treated as ${escapeHtml(levelName(pendingImport.defaultLevel))}. Mapped fields: entity name, level, objective, status, period, spend, exact results, reach, impressions and attribution. Other columns are ignored.</p>${pendingImport.errors.length ? `<p class="import-preview-errors">${pendingImport.errors.map((error) => escapeHtml(error)).join(' ')}</p>` : ''}</div>` : '';
    const body = `<div class="subtle-note" style="margin-top:0">${icon('shield', 14)}<span>Choose a Meta Ads Manager performance export. The file is parsed locally in your browser and is not uploaded. Do not select lead/customer exports or files containing personal data.</span></div><div class="form-field" style="margin-bottom:12px"><label for="import-level">Default reporting level when the CSV has no level column</label><select id="import-level" data-role="import-level"><option value="campaign" ${selectedDefault === 'campaign' ? 'selected' : ''}>Campaign</option><option value="ad set" ${selectedDefault === 'ad set' ? 'selected' : ''}>Ad set</option><option value="ad" ${selectedDefault === 'ad' ? 'selected' : ''}>Ad</option></select><div class="form-help">If the CSV includes a Reporting level column, its value takes precedence. Export one level at a time when possible.</div></div><label class="dropzone" for="csv-file">${icon('upload', 18, 'dropzone-icon')}<strong>${pendingImport ? 'Choose a different report' : 'Select an Ads Manager CSV'}</strong><span>CSV only. Use a performance export, not lead details. Overview totals use campaign rows only.</span><input id="csv-file" type="file" accept=".csv,text/csv"></label>${preview}<div class="form-note">${icon('info', 14)}<span>To prevent double counting, overview totals use campaign-level rows only. The original file is not retained; mapped fields are stored in this browser’s local storage.</span></div><div class="modal-footer-right" style="justify-content:space-between;margin-top:16px"><button class="button button-small" type="button" data-action="download-template">${icon('download', 12)} Download CSV template</button><div class="modal-footer-right"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="button" data-action="confirm-import" ${!pendingImport?.rows.length ? 'disabled' : ''}>Import mapped rows</button></div></div>`;
    showModal(pendingImport ? 'Review CSV import' : 'Import Ads Manager report', 'Import aggregate campaign performance without connecting or editing a live account.', body, { wide: true });
  }

  function normalizeHeader(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === '"') {
        if (quoted && text[i + 1] === '"') { cell += '"'; i += 1; }
        else quoted = !quoted;
      } else if (char === ',' && !quoted) {
        row.push(cell); cell = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && text[i + 1] === '\n') i += 1;
        row.push(cell); cell = '';
        if (row.some((item) => String(item).trim() !== '')) rows.push(row);
        row = [];
      } else cell += char;
    }
    if (cell.length || row.length) {
      row.push(cell);
      if (row.some((item) => String(item).trim() !== '')) rows.push(row);
    }
    return rows;
  }
  function headerIndex(headers, candidates) {
    const normalized = headers.map(normalizeHeader);
    for (const candidate of candidates) {
      const index = normalized.findIndex((name) => name === normalizeHeader(candidate));
      if (index >= 0) return index;
    }
    for (const candidate of candidates) {
      const normalizedCandidate = normalizeHeader(candidate);
      const index = normalized.findIndex((name) => name.includes(normalizedCandidate));
      if (index >= 0) return index;
    }
    return -1;
  }
  function fieldValue(row, index) { return index >= 0 ? String(row[index] ?? '').trim() : ''; }
  function parseOptionalNumber(value) {
    const text = String(value ?? '').trim();
    if (!text || text === '—' || text === '-' || text.toLowerCase() === 'n/a') return null;
    const negativeParentheses = /^\(.*\)$/.test(text);
    const cleaned = text.replace(/,/g, '').replace(/\((.*)\)/, '$1').replace(/[^0-9.\-]/g, '');
    if (!cleaned || cleaned === '-' || cleaned === '.') return null;
    const num = Number(cleaned);
    if (!Number.isFinite(num)) return null;
    return negativeParentheses ? -Math.abs(num) : num;
  }
  function parseDateValue(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    const isoMatch = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) return `${isoMatch[1]}-${String(isoMatch[2]).padStart(2, '0')}-${String(isoMatch[3]).padStart(2, '0')}`;
    const usMatch = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (usMatch) return `${usMatch[3]}-${String(usMatch[1]).padStart(2, '0')}-${String(usMatch[2]).padStart(2, '0')}`;
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString().slice(0, 10);
  }
  function normalizeLevel(value, hasAdSet, hasAd) {
    const level = String(value || '').toLowerCase();
    if (level.includes('ad set') || level.includes('adset')) return 'ad set';
    if (level === 'ad' || level.includes('advertisement')) return 'ad';
    if (level.includes('campaign')) return 'campaign';
    if (hasAd) return 'ad';
    if (hasAdSet) return 'ad set';
    return 'campaign';
  }
  function mapCSVRows(text, fileName, client, defaultLevel = 'campaign') {
    const parsed = parseCSV(text.replace(/^\uFEFF/, ''));
    if (parsed.length < 2) return { rows: [], errors: ['The CSV needs a header row and at least one data row.'] };
    const headers = parsed[0];
    const nameIndexGeneral = headerIndex(headers, ['campaign name', 'entity name', 'campaign', 'name']);
    const campaignNameIndex = headerIndex(headers, ['campaign name', 'campaign']);
    const adSetNameIndex = headerIndex(headers, ['ad set name', 'ad set']);
    const adNameIndex = headerIndex(headers, ['ad name', 'ad']);
    const idIndex = headerIndex(headers, ['campaign id', 'entity id', 'ad set id', 'ad id', 'id']);
    const levelIndex = headerIndex(headers, ['reporting level', 'entity level', 'level']);
    const objectiveIndex = headerIndex(headers, ['objective', 'campaign objective']);
    const statusIndex = headerIndex(headers, ['delivery', 'status', 'campaign status']);
    const spendIndex = headerIndex(headers, ['amount spent', 'spend', 'spent']);
    const resultsIndex = headerIndex(headers, ['results', 'result count', 'conversions']);
    const resultLabelIndex = headerIndex(headers, ['result indicator', 'result name', 'exact result', 'result type', 'primary result name']);
    const costIndex = headerIndex(headers, ['cost per result', 'cost per results']);
    const reachIndex = headerIndex(headers, ['reach']);
    const impressionsIndex = headerIndex(headers, ['impressions']);
    const startIndex = headerIndex(headers, ['reporting starts', 'report start', 'date start', 'start date', 'report_start']);
    const endIndex = headerIndex(headers, ['reporting ends', 'report end', 'date end', 'end date', 'report_end']);
    const attributionIndex = headerIndex(headers, ['attribution setting', 'attribution window', 'attribution']);
    const currencyIndex = headerIndex(headers, ['currency', 'account currency', 'reporting currency', 'report currency']);
    if (nameIndexGeneral < 0 && campaignNameIndex < 0 && adSetNameIndex < 0 && adNameIndex < 0) return { rows: [], errors: ['No campaign, ad set or ad name column was found. Download the template to see supported headers.'] };
    const errors = [];
    const now = new Date().toISOString();
    const rows = [];
    for (let index = 1; index < parsed.length; index += 1) {
      const row = parsed[index];
      const rawLevel = fieldValue(row, levelIndex);
      const level = rawLevel ? normalizeLevel(rawLevel, false, false) : defaultLevel;
      const preferredNameIndex = level === 'ad' && adNameIndex >= 0 ? adNameIndex : level === 'ad set' && adSetNameIndex >= 0 ? adSetNameIndex : campaignNameIndex >= 0 ? campaignNameIndex : nameIndexGeneral >= 0 ? nameIndexGeneral : adSetNameIndex >= 0 ? adSetNameIndex : adNameIndex;
      const name = fieldValue(row, preferredNameIndex);
      if (!name) { errors.push(`Skipped CSV row ${index + 1}: entity name is blank.`); continue; }
      const resultCellValue = fieldValue(row, resultsIndex);
      const resultCount = parseOptionalNumber(resultCellValue);
      const resultLabel = fieldValue(row, resultLabelIndex) || (resultCellValue && resultCount === null ? resultCellValue : '');
      const periodStart = parseDateValue(fieldValue(row, startIndex));
      const periodEnd = parseDateValue(fieldValue(row, endIndex));
      if (periodStart && periodEnd && periodEnd < periodStart) { errors.push(`Skipped CSV row ${index + 1}: report end date is before its start date.`); continue; }
      const sourceEntityId = fieldValue(row, idIndex);
      const rawCurrency = fieldValue(row, currencyIndex).toUpperCase();
      const currencyMatch = rawCurrency.match(/\b[A-Z]{3}\b/);
      const rowCurrency = currencyMatch ? currencyMatch[0] : (client.currency || 'PHP');
      rows.push({
        id: uid('import'), clientId: client.id, sourceEntityId,
        name, objective: fieldValue(row, objectiveIndex), status: fieldValue(row, statusIndex) || 'Not reported', level,
        periodStart, periodEnd, spend: parseOptionalNumber(fieldValue(row, spendIndex)),
        resultCount, resultLabel, costPerResult: parseOptionalNumber(fieldValue(row, costIndex)),
        reach: parseOptionalNumber(fieldValue(row, reachIndex)), impressions: parseOptionalNumber(fieldValue(row, impressionsIndex)),
        attribution: fieldValue(row, attributionIndex), currency: rowCurrency,
        source: 'Meta Ads CSV import', sourceFile: fileName, importedAt: now, verifiedOn: todayISO(),
        notes: '', ownerApproval: 'Not applicable · reporting record only',
      });
    }
    if (!rows.length && !errors.length) errors.push('No usable data rows were found.');
    return { rows, errors: [...new Set(errors)].slice(0, 8) };
  }

  function downloadCSV(fileName, headers, records) {
    const csvValue = (value) => {
      const text = value === null || value === undefined ? '' : String(value);
      return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const content = [headers, ...records].map((row) => row.map(csvValue).join(',')).join('\r\n');
    const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = fileName; document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }
  function downloadTemplate() {
    downloadCSV('signaldesk_meta_ads_import_template.csv', ['Campaign ID', 'Campaign name', 'Objective', 'Delivery', 'Reporting level', 'Amount spent', 'Currency', 'Results', 'Result indicator', 'Cost per result', 'Reach', 'Impressions', 'Reporting starts', 'Reporting ends', 'Attribution setting'], []);
    showToast('CSV header template downloaded.');
  }
  function downloadReport(kind) {
    const activeClient = getActiveClient();
    if (kind === 'campaigns') {
      const headers = ['client_name', 'account_label', 'account_id_suffix', 'entity_level', 'entity_id', 'entity_name', 'objective', 'status', 'report_start', 'report_end', 'currency', 'spend', 'exact_result_name', 'results', 'reported_cost_per_result', 'reach', 'impressions', 'attribution_setting', 'source', 'source_file', 'verified_on', 'owner_approval', 'meta_action_breakdown_json', 'meta_cost_breakdown_json'];
      const scoped = db.campaigns.filter((row) => !activeClient || row.clientId === activeClient.id);
      const rows = scoped.map((row) => { const client = db.clients.find((item) => item.id === row.clientId) || {}; return [client.name, client.accountLabel, client.accountSuffix, row.level, row.sourceEntityId, row.name, row.objective, row.status, row.periodStart, row.periodEnd, row.currency || client.currency, row.spend, row.resultLabel, row.resultCount, row.costPerResult, row.reach, row.impressions, row.attribution, row.source, row.sourceFile, row.verifiedOn, row.ownerApproval, JSON.stringify(row.actionBreakdown || []), JSON.stringify(row.costBreakdown || [])]; });
      downloadCSV('signaldesk_campaign_records.csv', headers, rows);
    } else if (kind === 'outcomes') {
      const headers = ['client_name', 'report_start', 'report_end', 'qualified_inquiries', 'owner_approved_opportunities', 'bookings', 'completed_jobs', 'net_cash_collected', 'direct_job_costs', 'currency', 'source', 'updated_on'];
      const scoped = db.outcomes.filter((row) => !activeClient || row.clientId === activeClient.id);
      const rows = scoped.map((row) => { const client = db.clients.find((item) => item.id === row.clientId) || {}; return [client.name, row.periodStart, row.periodEnd, row.qualifiedInquiries, row.opportunities, row.bookings, row.completedJobs, row.netCashCollected, row.directCosts, client.currency, row.source, row.updatedOn]; });
      downloadCSV('signaldesk_business_outcomes.csv', headers, rows);
    } else if (kind === 'clients') {
      const headers = ['client_name', 'primary_platform', 'account_label', 'account_id_suffix', 'currency', 'time_zone', 'service_area', 'services', 'business_outcome', 'contact_path', 'connection_status', 'last_saved_review'];
      const rows = activeClient ? [[activeClient.name, activeClient.channel, activeClient.accountLabel, activeClient.accountSuffix, activeClient.currency, activeClient.timezone, activeClient.serviceArea, activeClient.services, activeClient.goal, activeClient.contactPath, 'Not connected · OAuth not configured', activeClient.lastReview]] : [];
      downloadCSV('signaldesk_client_register.csv', headers, rows);
    } else if (kind === 'sources') {
      const headers = ['source', 'category', 'availability', 'status', 'notes'];
      const rows = connectorGroups.flatMap((group) => group.items.map((item) => [item.name, group.title, item.available ? 'Available · local file import' : 'Not connected', item.state, item.description]));
      downloadCSV('signaldesk_data_sources.csv', headers, rows);
    }
    showToast('CSV report downloaded.');
  }

  function openConnectorGuide(id) {
    const connector = connectorGroups.flatMap((group) => group.items).find((item) => item.id === id);
    if (!connector) return;
    if (connector.available) { openImportModal(); return; }
    const steps = (connector.steps || ['Confirm the data source is actually used by the client.', 'Choose the minimum fields and access required.', 'Add a secure server-side connector and validate its output.']).map((step) => `<li>${escapeHtml(step)}</li>`).join('');
    const body = `<p class="source-note" style="font-size:10px;line-height:1.65">${escapeHtml(connector.detail || connector.description)}</p><div class="subtle-note">${icon('info', 14)}<span><strong>Status:</strong> ${escapeHtml(connector.state)}. A live connector is not implemented in this prototype.</span></div><ol class="connector-steps">${steps}</ol><div class="guide-warning">${escapeHtml(connector.warning || 'Do not paste secrets or customer personal data into this app.')}</div>`;
    showModal(`${connector.name} · setup guide`, 'Planning checklist only — this does not start an OAuth connection.', body, { footer: `<span class="source-note">No credentials are collected or stored here.</span><div class="modal-footer-right"><button class="button button-primary" type="button" data-action="close-modal">Got it</button></div>` });
  }

  async function apiJson(url, options = {}) {
    const response = await fetch(url, { cache: 'no-store', ...options, headers: { Accept: 'application/json', ...(options.headers || {}) } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `Request failed (${response.status}).`);
    return payload;
  }

  function connectMeta() {
    if (!connectorState.server) { showToast('Start the Node connector server to use Meta OAuth.', 'error'); return; }
    if (!connectorState.meta?.configured) { openConnectorGuide('meta-ads'); return; }
    window.location.assign('/api/connectors/meta/start');
  }

  async function openMetaAccountModal() {
    const client = getActiveClient();
    if (!client) return;
    showModal('Loading Meta ad accounts', `Getting the accounts available to the authorized Meta user for ${client.name}.`, '<div class="empty-cell">Read-only request in progress…</div>');
    try {
      const payload = await apiJson('/api/connectors/meta/accounts');
      const accounts = payload.accounts || [];
      if (!accounts.length) {
        showModal('No ad accounts returned', 'The authorized Meta user has no ad accounts available to this app.', `<p class="source-note">Check the correct Facebook profile, Business access and the app’s approved ads_read access in Meta. This app does not request other users’ access or bypass identity verification.</p>`, { footer: `<span class="source-note">No campaign changes were made.</span><div class="modal-footer-right"><button class="button button-primary" type="button" data-action="close-modal">Close</button></div>` });
        return;
      }
      const current = connectorState.meta?.selectedAccount?.id || '';
      const options = accounts.map((account) => `<option value="${escapeHtml(account.id)}" ${account.id === current ? 'selected' : ''}>${escapeHtml(account.name)} · ${escapeHtml(account.currency || 'currency not returned')} · ${escapeHtml(account.timezone || 'time zone not returned')} · ${escapeHtml(String(account.accountId || account.id).slice(-6))}</option>`).join('');
      const body = `<form id="meta-account-form"><div class="form-field"><label for="meta-account-choice">Select the ad account for ${escapeHtml(client.name)} *</label><select id="meta-account-choice" name="accountId" required>${options}</select><div class="form-help">Only accounts returned to the currently authorized Meta user are listed. Verify the account name and currency before syncing.</div></div><div class="form-note">${icon('shield', 14)}<span>This selects a reporting source for this client. It does not change any Meta campaign or grant permission beyond the approved read-only app scope.</span></div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Use this account</button></div></form>`;
      showModal('Choose a Meta ad account', `Read-only account selection · ${client.name}`, body);
    } catch (error) {
      showModal('Could not load Meta accounts', 'No reporting data was changed.', `<div class="guide-warning">${escapeHtml(error.message)}</div><p class="source-note">If you just authorized Meta, check that the user has ad-account read access and that the app has the required Meta approval.</p>`, { footer: `<span class="source-note">No token is shown in this browser.</span><div class="modal-footer-right"><button class="button button-primary" type="button" data-action="close-modal">Close</button></div>` });
    }
  }

  async function handleMetaAccountSubmit(form) {
    const client = getActiveClient();
    if (!client) throw new Error('Select a client before choosing an ad account.');
    const values = formDataObject(form);
    const payload = await apiJson('/api/connectors/meta/select-account', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ clientId: client.id, accountId: values.accountId }) });
    connectorState.meta = { ...connectorState.meta, connected: true, selectedAccount: payload.selectedAccount };
    closeModal(); renderApp(); showToast(`Read-only account selected for ${client.name}.`);
  }

  function openMetaSyncModal() {
    const client = getActiveClient();
    if (!client) return;
    if (!connectorState.meta?.connected || connectorState.meta?.expired) { connectMeta(); return; }
    if (!connectorState.meta?.selectedAccount) { openMetaAccountModal(); return; }
    const period = getSelectedPeriod(client.id);
    const body = `<form id="meta-sync-form"><div class="form-grid"><div class="form-field"><label for="meta-sync-start">Report starts *</label><input id="meta-sync-start" name="startDate" type="date" required value="${escapeHtml(period?.start || '')}"></div><div class="form-field"><label for="meta-sync-end">Report ends *</label><input id="meta-sync-end" name="endDate" type="date" required value="${escapeHtml(period?.end || '')}"></div></div><div class="form-note">${icon('shield', 14)}<span>Read-only campaign structure and Insights data will be fetched from ${escapeHtml(connectorState.meta.selectedAccount.name)}. No campaign write scopes are requested. Multiple action types are shown separately rather than guessed as “results.”</span></div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Sync report</button></div></form>`;
    showModal('Sync Meta campaign report', `Choose the exact reporting window for ${client.name}.`, body, { wide: true });
  }

  async function handleMetaSyncSubmit(form) {
    const client = getActiveClient();
    if (!client) throw new Error('Select a client before syncing.');
    const values = formDataObject(form);
    validateRange(values.startDate, values.endDate, true);
    showModal('Syncing Meta campaign data', 'Read-only request in progress. No Meta campaign settings will be changed.', '<div class="empty-cell">Fetching campaign status and Insights for the selected reporting window…</div>');
    try {
      const payload = await apiJson('/api/connectors/meta/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ clientId: client.id, startDate: values.startDate, endDate: values.endDate }) });
      const rows = Array.isArray(payload.rows) ? payload.rows : [];
      let inserted = 0; let updated = 0;
      const existingByKey = new Map(db.campaigns.map((row, index) => [rowDuplicateKey(row), index]));
      for (const sourceRow of rows) {
        const row = { ...sourceRow, id: uid('meta'), clientId: client.id };
        const key = rowDuplicateKey(row);
        const existingIndex = existingByKey.get(key);
        if (existingIndex !== undefined) { row.id = db.campaigns[existingIndex].id; db.campaigns[existingIndex] = row; updated += 1; }
        else { db.campaigns.push(row); existingByKey.set(key, db.campaigns.length - 1); inserted += 1; }
      }
      selectedPeriodKey = periodKey(values.startDate, values.endDate);
      persist(); closeModal(); currentPage = 'campaigns'; renderApp();
      showToast(`${inserted} campaign row${inserted === 1 ? '' : 's'} added${updated ? ` · ${updated} refreshed` : ''}${payload.partial ? ' · paging incomplete; review sync coverage' : ''}.`, payload.partial ? 'error' : 'success');
    } catch (error) {
      showModal('Meta report sync failed', 'No campaign write operation was performed.', `<div class="guide-warning">${escapeHtml(error.message)}</div><p class="source-note">Check the selected ad account, read permissions, API version and report dates. Blank or missing metrics are not converted to zero.</p>`, { footer: `<span class="source-note">No Meta settings were changed.</span><div class="modal-footer-right"><button class="button button-primary" type="button" data-action="close-modal">Close</button></div>` });
    }
  }

  function openMetaDisconnectModal() {
    showModal('Remove local Meta connection?', 'This removes the encrypted token stored by this app; it does not delete or modify Meta ads.', `<div class="guide-warning">To revoke the app’s authorization entirely, also remove it from the Meta account’s connected-business/integrations settings. No campaign changes are made either way.</div><div class="modal-footer-right" style="justify-content:flex-end;margin-top:16px"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="button" data-action="confirm-meta-disconnect">Remove local connection</button></div>`);
  }

  async function disconnectMeta() {
    try {
      await apiJson('/api/connectors/meta/disconnect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      connectorState.meta = { ...connectorState.meta, connected: false, expired: false, selectedAccount: null };
      closeModal(); renderApp(); showToast('Encrypted Meta token removed locally. Revoke the app in Meta settings too if needed.');
    } catch (error) { showToast(error.message, 'error'); }
  }

  function openCampaignDetails(id) {
    const row = db.campaigns.find((item) => item.id === id);
    if (!row) return;
    const client = db.clients.find((item) => item.id === row.clientId) || {};
    const values = [
      ['Reporting level', levelName(row.level)], ['Status', row.status || 'Not reported'], ['Objective', row.objective || 'Not reported'],
      ['Report period', row.periodStart && row.periodEnd ? formatRange(row.periodStart, row.periodEnd) : 'No performance period'],
      ['Entity ID', row.sourceEntityId || 'Not provided'], ['Spend', moneyOrBlank(row.spend, row.currency || client.currency)],
      ['Exact result name', row.resultLabel || 'Not reported'], ['Results', row.resultCount == null ? 'Not reported' : formatNumber(row.resultCount)],
      ['Cost per result', moneyOrBlank(row.costPerResult, row.currency || client.currency)], ['Reach', row.reach == null ? 'Not reported' : formatNumber(row.reach)],
      ['Impressions', row.impressions == null ? 'Not reported' : formatNumber(row.impressions)], ['Attribution', row.attribution || 'Not provided'],
      ['Source', row.source || 'Not specified'], ['Source file', row.sourceFile || 'Not specified'],
      ['Verified / imported', row.verifiedOn ? formatDate(row.verifiedOn) : row.importedAt ? formatDate(row.importedAt.slice(0, 10)) : 'Not dated'],
      ['Owner approval', row.ownerApproval || 'Not recorded'],
    ];
    const note = row.notes || row.observedBudget || '';
    const warning = String(row.status || '').toLowerCase().includes('draft') ? `<div class="guide-warning">Draft record only. This does not indicate an approved launch, live campaign, or authorized spend. ${escapeHtml(row.observedBudget || '')}</div>` : '';
    const actionRows = Array.isArray(row.actionBreakdown) ? row.actionBreakdown : [];
    const costRows = Array.isArray(row.costBreakdown) ? row.costBreakdown : [];
    const costByType = new Map(costRows.map((item) => [item.action_type, item]));
    const actionMarkup = actionRows.length ? `<div class="report-data-note"><strong>Meta action-type breakdown (exact API labels)</strong><div class="action-breakdown">${actionRows.map((item) => { const actionValues = Object.entries(item).filter(([key]) => key !== 'action_type').map(([key, value]) => `${key}: ${value}`).join(' · '); const cost = costByType.get(item.action_type); const costValues = cost ? Object.entries(cost).filter(([key]) => key !== 'action_type').map(([key, value]) => `cost ${key}: ${value}`).join(' · ') : ''; return `<div class="action-breakdown-row"><strong>${escapeHtml(item.action_type || 'Unlabeled action')}</strong><span>${escapeHtml([actionValues, costValues].filter(Boolean).join(' · ') || 'Value not returned')}</span></div>`; }).join('')}</div><div class="form-help">Action types are platform metrics, not verified business outcomes. The app does not add unlike action types together.</div></div>` : '';
    const body = `${warning}<div class="detail-modal-grid">${values.map(([label, value]) => `<div class="detail-box"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>${actionMarkup}${note ? `<div class="report-data-note"><strong>Source note:</strong> ${escapeHtml(note)}</div>` : ''}`;
    showModal(row.name, 'Saved record details and data provenance.', body, { wide: true, footer: `<span class="source-note">Tracker record only · no Meta account changes</span><div class="modal-footer-right"><button class="button button-primary" type="button" data-action="close-modal">Close</button></div>` });
  }

  function showToast(message, type = 'success') {
    if (!toastRoot) return;
    toastRoot.innerHTML = `<div class="toast ${type === 'error' ? 'error' : ''}">${icon(type === 'error' ? 'info' : 'checkCircle', 16)}<span>${escapeHtml(message)}</span></div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastRoot.innerHTML = ''; }, 3200);
  }

  function formDataObject(form) { return Object.fromEntries(new FormData(form).entries()); }
  function optionalNumber(value) {
    const str = String(value ?? '').trim();
    return str === '' ? null : parseOptionalNumber(str);
  }
  function optionalInteger(value, label) {
    const number = optionalNumber(value);
    if (number === null) return null;
    if (!Number.isInteger(number) || number < 0) throw new Error(`${label} must be a whole number greater than or equal to zero.`);
    return number;
  }
  function validateRange(start, end, required = false) {
    if (required && (!start || !end)) throw new Error('Enter both the reporting start date and end date.');
    if (!!start !== !!end) throw new Error('Enter both reporting dates or leave both blank.');
    if (start && end && end < start) throw new Error('The report end date cannot be before its start date.');
  }

  function handleClientSubmit(form) {
    const values = formDataObject(form);
    const existingId = form.dataset.clientId;
    const name = String(values.name || '').trim();
    if (!name) throw new Error('Enter a client or business name.');
    const client = {
      id: existingId || uid('client'), name, channel: values.channel || 'Meta Ads',
      accountLabel: String(values.accountLabel || '').trim(), accountSuffix: String(values.accountSuffix || '').replace(/\D/g, '').slice(-8),
      currency: values.currency || 'PHP', timezone: String(values.timezone || '').trim(),
      serviceArea: String(values.serviceArea || '').trim(), services: String(values.services || '').trim(),
      goal: String(values.goal || '').trim(), contactPath: String(values.contactPath || '').trim(),
      lastReview: existingId ? db.clients.find((item) => item.id === existingId)?.lastReview || '' : '',
      sourceRef: existingId ? db.clients.find((item) => item.id === existingId)?.sourceRef || '' : '',
    };
    if (existingId) {
      db.clients = db.clients.map((item) => item.id === existingId ? client : item);
    } else {
      db.clients.push(client);
      db.activeClientId = client.id;
      clearSelectedMetaAccount();
      currentPage = 'clients';
      selectedPeriodKey = null;
    }
    persist(); closeModal(); renderApp(); void refreshConnectorStatus(); showToast(existingId ? 'Client profile updated.' : 'Client workspace created.');
  }

  function handleCampaignSubmit(form) {
    const values = formDataObject(form);
    const client = getActiveClient();
    validateRange(values.periodStart, values.periodEnd);
    const row = {
      id: uid('manual'), clientId: client.id, sourceEntityId: String(values.sourceEntityId || '').trim(),
      name: String(values.name || '').trim(), objective: String(values.objective || '').trim(), status: values.status || 'Not reported',
      level: values.level || 'campaign', periodStart: values.periodStart || '', periodEnd: values.periodEnd || '',
      spend: optionalNumber(values.spend), resultCount: optionalInteger(values.resultCount, 'Results'),
      resultLabel: String(values.resultLabel || '').trim(), costPerResult: optionalNumber(values.costPerResult),
      reach: optionalInteger(values.reach, 'Reach'), impressions: optionalInteger(values.impressions, 'Impressions'),
      attribution: String(values.attribution || '').trim(), currency: client.currency || 'PHP', source: 'Manual tracker entry',
      sourceFile: '', importedAt: new Date().toISOString(), verifiedOn: todayISO(), notes: '', ownerApproval: 'Not applicable · internal tracker only',
    };
    if (!row.name) throw new Error('Enter a campaign or entity name.');
    const duplicateIndex = db.campaigns.findIndex((existing) => rowDuplicateKey(existing) === rowDuplicateKey(row));
    const updated = duplicateIndex >= 0;
    if (updated) { row.id = db.campaigns[duplicateIndex].id; db.campaigns[duplicateIndex] = row; }
    else db.campaigns.push(row);
    persist();
    if (row.periodStart && row.periodEnd) selectedPeriodKey = periodKey(row.periodStart, row.periodEnd);
    closeModal(); currentPage = 'campaigns'; renderApp(); showToast(`${updated ? 'Existing period updated' : 'Campaign tracking record saved'}. No live campaign was changed.`);
  }

  function handleOutcomeSubmit(form) {
    const values = formDataObject(form);
    const client = getActiveClient();
    validateRange(values.periodStart, values.periodEnd, true);
    const outcome = {
      id: uid('outcome'), clientId: client.id, periodStart: values.periodStart, periodEnd: values.periodEnd,
      qualifiedInquiries: optionalInteger(values.qualifiedInquiries, 'Qualified inquiries'),
      opportunities: optionalInteger(values.opportunities, 'Owner-approved opportunities'),
      bookings: optionalInteger(values.bookings, 'Bookings'),
      completedJobs: optionalInteger(values.completedJobs, 'Completed jobs'),
      netCashCollected: optionalNumber(values.netCashCollected), directCosts: optionalNumber(values.directCosts),
      source: 'Aggregate browser entry', createdOn: todayISO(), updatedOn: todayISO(),
    };
    const key = periodKey(outcome.periodStart, outcome.periodEnd);
    const existing = db.outcomes.findIndex((row) => row.clientId === client.id && periodKey(row.periodStart, row.periodEnd) === key);
    if (existing >= 0) {
      outcome.id = db.outcomes[existing].id;
      outcome.createdOn = db.outcomes[existing].createdOn || todayISO();
      db.outcomes[existing] = outcome;
    } else db.outcomes.push(outcome);
    persist(); closeModal(); currentPage = 'trackers'; renderApp(); showToast(existing >= 0 ? 'Outcome totals updated for this report window.' : 'Aggregate outcome totals saved.');
  }

  function handleExperimentSubmit(form) {
    const values = formDataObject(form);
    const client = getActiveClient();
    validateRange(values.periodStart, values.periodEnd);
    const campaign = db.campaigns.find((row) => row.id === values.campaignId);
    const test = {
      id: uid('test'), clientId: client.id, name: String(values.name || '').trim(), format: values.format || 'Static photo',
      campaignId: campaign?.id || '', campaignName: campaign?.name || '', periodStart: values.periodStart || '', periodEnd: values.periodEnd || '',
      spend: optionalNumber(values.spend), resultCount: optionalInteger(values.resultCount, 'Results'), resultLabel: String(values.resultLabel || '').trim(),
      createdOn: todayISO(),
    };
    if (!test.name) throw new Error('Enter a creative or variant label.');
    db.experiments.push(test); persist(); closeModal(); currentPage = 'trackers'; renderApp(); showToast('Creative test row saved. No ad creative was changed.');
  }

  function rowDuplicateKey(row) {
    const entity = row.sourceEntityId ? `id:${row.sourceEntityId}` : `name:${String(row.name).toLowerCase()}`;
    return `${row.clientId}|${row.level}|${entity}|${row.periodStart}|${row.periodEnd}`;
  }
  function handleConfirmImport() {
    if (!pendingImport?.rows?.length) return;
    const existingByKey = new Map(db.campaigns.map((row, index) => [rowDuplicateKey(row), index]));
    let inserted = 0; let updated = 0;
    for (const row of pendingImport.rows) {
      const key = rowDuplicateKey(row);
      const foundIndex = existingByKey.get(key);
      if (foundIndex !== undefined) {
        row.id = db.campaigns[foundIndex].id;
        db.campaigns[foundIndex] = row;
        updated += 1;
      } else {
        db.campaigns.push(row);
        existingByKey.set(key, db.campaigns.length - 1);
        inserted += 1;
      }
    }
    const client = getActiveClient();
    const firstPeriod = pendingImport.rows.find((row) => row.periodStart && row.periodEnd);
    if (firstPeriod) selectedPeriodKey = periodKey(firstPeriod.periodStart, firstPeriod.periodEnd);
    persist(); closeModal(); currentPage = 'campaigns'; renderApp(); showToast(`Imported ${inserted} row${inserted === 1 ? '' : 's'}${updated ? ` · updated ${updated}` : ''}.`);
  }

  function handleFile(file) {
    if (!file) return;
    if (!/\.csv$/i.test(file.name) && file.type !== 'text/csv') { showToast('Please choose a CSV report.', 'error'); return; }
    if (file.size > 8 * 1024 * 1024) { showToast('CSV is over 8 MB. Export a smaller reporting period.', 'error'); return; }
    const client = getActiveClient();
    if (!client) { showToast('Select a client before importing.', 'error'); return; }
    const reader = new FileReader();
    const defaultLevel = document.getElementById('import-level')?.value || importDefaultLevel;
    reader.onload = () => {
      const rawText = String(reader.result || '');
      const mapped = mapCSVRows(rawText, file.name, client, defaultLevel);
      pendingImport = { fileName: file.name, rawText, defaultLevel, rows: mapped.rows, errors: mapped.errors };
      renderImportModal();
    };
    reader.onerror = () => showToast('Could not read this file in the browser.', 'error');
    reader.readAsText(file);
  }

  function buildReportSourceRows() {
    return connectorGroups.flatMap((group) => group.items.map((item) => [item.name, group.title, item.available ? 'Available · local file import' : 'Not connected', item.state, item.description]));
  }

  function handleClick(event) {
    const closeTarget = event.target.closest('[data-action="backdrop-close"]');
    if (closeTarget && event.target === closeTarget) { closeModal(); return; }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id || '';
    if (action === 'navigate') {
      currentPage = button.dataset.page || 'overview';
      const sidebar = document.getElementById('sidebar'); if (sidebar) sidebar.classList.remove('mobile-open');
      const backdrop = app.querySelector('.mobile-backdrop'); if (backdrop) backdrop.classList.remove('visible');
      renderApp();
    } else if (action === 'toggle-mobile') {
      const sidebar = document.getElementById('sidebar'); const backdrop = app.querySelector('.mobile-backdrop');
      sidebar?.classList.toggle('mobile-open'); backdrop?.classList.toggle('visible');
    } else if (action === 'close-mobile') {
      document.getElementById('sidebar')?.classList.remove('mobile-open'); app.querySelector('.mobile-backdrop')?.classList.remove('visible');
    } else if (action === 'new-client') openClientModal()
    else if (action === 'edit-client') openClientModal(id)
    else if (action === 'select-client') { db.activeClientId = id; selectedPeriodKey = null; clearSelectedMetaAccount(); persist(); renderApp(); void refreshConnectorStatus(); }
    else if (action === 'open-import') openImportModal()
    else if (action === 'new-campaign') openCampaignModal()
    else if (action === 'new-outcome') openOutcomeModal()
    else if (action === 'new-experiment') openExperimentModal()
    else if (action === 'close-modal') closeModal()
    else if (action === 'open-connector') openConnectorGuide(id)
    else if (action === 'connect-meta') connectMeta()
    else if (action === 'choose-meta-account') openMetaAccountModal()
    else if (action === 'sync-meta') openMetaSyncModal()
    else if (action === 'disconnect-meta') openMetaDisconnectModal()
    else if (action === 'confirm-meta-disconnect') disconnectMeta()
    else if (action === 'campaign-details') openCampaignDetails(id)
    else if (action === 'download-template') downloadTemplate()
    else if (action === 'confirm-import') handleConfirmImport()
    else if (action === 'export-report') downloadReport(button.dataset.report)
    else if (action === 'print-report') window.print()
    else if (action === 'logout') logoutWorkspace()
    else if (action === 'reset-local-data') {
      db = clone(initialData); persist(); currentPage = 'overview'; selectedPeriodKey = null; closeModal(); renderApp(); showToast('Local workspace reset to its saved starting snapshot.');
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches('[data-role="client-picker"]')) {
      db.activeClientId = target.value; selectedPeriodKey = null; clearSelectedMetaAccount(); persist(); renderApp(); void refreshConnectorStatus();
    } else if (target.matches('[data-role="period-picker"]')) {
      selectedPeriodKey = target.value || null; renderApp();
    } else if (target.matches('[data-role="campaign-level"]')) {
      campaignFilters.level = target.value; renderApp();
    } else if (target.matches('[data-role="campaign-status"]')) {
      campaignFilters.status = target.value; renderApp();
    } else if (target.matches('[data-role="import-level"]')) {
      importDefaultLevel = target.value;
      if (pendingImport?.rawText) {
        const mapped = mapCSVRows(pendingImport.rawText, pendingImport.fileName, getActiveClient(), importDefaultLevel);
        pendingImport = { ...pendingImport, defaultLevel: importDefaultLevel, rows: mapped.rows, errors: mapped.errors };
        renderImportModal();
      }
    } else if (target.matches('#csv-file')) {
      handleFile(target.files?.[0]);
    }
  }

  function handleInput(event) {
    if (event.target.matches('#campaign-search')) {
      campaignFilters.search = event.target.value;
      const client = getActiveClient();
      const tbody = document.getElementById('campaign-table-body');
      const counter = document.getElementById('campaign-table-count');
      if (tbody && client) {
        const rows = filterCampaignRows(client);
        tbody.innerHTML = campaignRowsMarkup(rows, client);
        if (counter) counter.textContent = `${rows.length} matching row${rows.length === 1 ? '' : 's'}`;
      }
    }
  }

  function handleSubmit(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const handlers = {
      'login-form': handleLoginSubmit,
      'client-form': handleClientSubmit,
      'campaign-form': handleCampaignSubmit,
      'outcome-form': handleOutcomeSubmit,
      'experiment-form': handleExperimentSubmit,
      'meta-account-form': handleMetaAccountSubmit,
      'meta-sync-form': handleMetaSyncSubmit,
    };
    const handler = handlers[form.id];
    if (!handler) return;
    event.preventDefault();
    try {
      const result = handler(form);
      if (result && typeof result.catch === 'function') result.catch((error) => showToast(error.message || 'Please check the form values.', 'error'));
    } catch (error) { showToast(error.message || 'Please check the form values.', 'error'); }
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('change', handleChange);
  document.addEventListener('input', handleInput);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalRoot.innerHTML) closeModal();
  });

  renderApp();
  consumeMetaCallbackNotice();
  void refreshConnectorStatus();
})();
