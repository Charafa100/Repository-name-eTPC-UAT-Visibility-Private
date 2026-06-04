/* TPC v2 — charts, drawer, site map, mock data */

(function () {

  /* ============== SPARKLINE ============== */
  function sparkline(points, opts) {
    opts = opts || {};
    const w = opts.width || 100;
    const h = opts.height || 28;
    const pad = 2;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const stepX = (w - pad * 2) / (points.length - 1);
    const ys = points.map(v => h - pad - ((v - min) / range) * (h - pad * 2));
    const xs = points.map((_, i) => pad + i * stepX);
    let line = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < points.length; i++) {
      const px = (xs[i - 1] + xs[i]) / 2;
      line += ` Q ${xs[i - 1]} ${ys[i - 1]}, ${px} ${(ys[i - 1] + ys[i]) / 2}`;
      line += ` T ${xs[i]} ${ys[i]}`;
    }
    const area = `${line} L ${xs[xs.length - 1]} ${h} L ${xs[0]} ${h} Z`;
    const lastX = xs[xs.length - 1], lastY = ys[ys.length - 1];
    const trend = points[points.length - 1] > points[0] ? 'spark-up'
                : points[points.length - 1] < points[0] ? 'spark-down'
                : 'spark-flat';
    const cls = opts.cls || trend;
    return `<svg class="sparkline ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <path class="area" d="${area}"/>
      <path class="line" d="${line}"/>
      <circle cx="${lastX}" cy="${lastY}" r="2.4"/>
    </svg>`;
  }

  /* ============== RING (DONUT) ============== */
  function ring(segments, opts) {
    opts = opts || {};
    const size = opts.size || 84;
    const stroke = opts.stroke || 8;
    const r = (size - stroke) / 2;
    const cx = size / 2, cy = size / 2;
    const circ = 2 * Math.PI * r;
    const total = segments.reduce((s, x) => s + x.value, 0) || 1;
    let offset = 0;
    let svg = `<svg class="ring-svg" viewBox="0 0 ${size} ${size}">
      <circle class="ring-track" cx="${cx}" cy="${cy}" r="${r}"/>`;
    segments.forEach(seg => {
      const portion = seg.value / total;
      const dash = portion * circ;
      const gap = circ - dash;
      svg += `<circle class="ring-segment" cx="${cx}" cy="${cy}" r="${r}"
        stroke="${seg.color}"
        stroke-dasharray="${dash} ${gap}"
        stroke-dashoffset="${-offset}"
        stroke-width="${stroke}"/>`;
      offset += dash;
    });
    svg += `</svg>`;
    return svg;
  }

  /* ============== HYDRATE SPARKLINES ============== */
  function hydrateSparklines() {
    document.querySelectorAll('[data-sparkline]').forEach(el => {
      if (el.dataset.sparkRendered === '1') return;
      const points = el.getAttribute('data-sparkline').split(',').map(Number);
      const cls = el.getAttribute('data-spark-cls') || '';
      el.innerHTML = sparkline(points, { cls });
      el.dataset.sparkRendered = '1';
    });
  }

  /* ============== HYDRATE RINGS ============== */
  function hydrateRings() {
    document.querySelectorAll('[data-ring]').forEach(el => {
      if (el.dataset.ringRendered === '1') return;
      try {
        const segs = JSON.parse(el.getAttribute('data-ring'));
        const center = el.getAttribute('data-ring-center') || '';
        el.classList.add('ring-wrap');
        el.innerHTML = ring(segs) + `<div class="ring-center">${center}</div>`;
        el.dataset.ringRendered = '1';
      } catch (e) { console.warn('Bad ring data', e); }
    });
  }

  /* ============== SITE MAP ============== */
  function renderSiteMap(container) {
    if (!container) return;
    // approximate positions on a 100x80 canvas, mapped to Chad outline
    const sites = [
      { id: 'douala', name: 'Douala HQ',     x: 12, y: 70, load: 4, status: 'on',     count: 47 },
      { id: 'ps2',    name: 'PS2-Dompta',    x: 52, y: 38, load: 3, status: 'warn',   count: 18 },
      { id: 'ps3',    name: 'PS3-Belabo',    x: 32, y: 55, load: 2, status: 'on',     count: 12 },
      { id: 'prs',    name: 'PRS-Kribi',     x: 8,  y: 78, load: 1, status: 'on',     count: 9 },
      { id: 'fso',    name: 'FSO Offshore',  x: 2,  y: 72, load: 4, status: 'danger', count: 23 },
      { id: 'wh',     name: 'Warehouse',     x: 18, y: 64, load: 2, status: 'on',     count: 36 }
    ];

    // simple Chad-ish silhouette outline (approximated, decorative)
    const chad = `M 30 8 L 55 4 L 76 10 L 86 22 L 88 36 L 80 50 L 70 58 L 65 70 L 50 78 L 42 84 L 30 80 L 20 70 L 22 56 L 18 42 L 26 24 Z`;

    const dots = sites.map(s => {
      const colorMap = { on: 'var(--success)', warn: 'var(--warning)', danger: 'var(--danger)' };
      const color = colorMap[s.status];
      return `<g class="site-dot" data-site="${s.id}" transform="translate(${s.x}, ${s.y})">
        <circle class="pulse" r="4" style="fill:${color}"/>
        <circle class="core" r="4" style="fill:${color}"/>
        <text class="label-bg" x="6" y="2" stroke="var(--surface)" stroke-width="2.5" paint-order="stroke">${s.name}</text>
        <text x="6" y="2" fill="var(--text)">${s.name}</text>
      </g>`;
    }).join('');

    const map = `<svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
      <path class="country" d="${chad}"/>
      <path class="river" d="M 25 30 Q 35 50 50 60 T 75 60"/>
      ${dots}
    </svg>`;

    const list = sites.map(s => {
      const segs = Array.from({ length: 4 }, (_, i) => {
        const on = i < s.load;
        const cls = on ? (s.status === 'danger' ? 'danger' : s.status === 'warn' ? 'warn' : 'on') : '';
        return `<span class="seg ${cls}"></span>`;
      }).join('');
      const bullet = s.status === 'on' ? 'var(--success)' : s.status === 'warn' ? 'var(--warning)' : 'var(--danger)';
      return `<button class="site-row" data-site="${s.id}">
        <span class="site-bullet" style="background:${bullet}"></span>
        <div>
          <div class="site-name">${s.name}</div>
          <div class="site-meta">${s.count} chemicals · ${s.load * 2 + 1} pending</div>
        </div>
        <div class="site-load">${segs}</div>
        <span style="color:var(--text-4)" data-icon="chevron-right"></span>
      </button>`;
    }).join('');

    container.querySelector('.site-map-canvas').innerHTML = map;
    container.querySelector('.site-list').innerHTML = list;
    if (window.TPCIconHydrate) window.TPCIconHydrate(container);
  }

  /* ============== DRAWER ============== */
  let _drawerReqId = null;

  const MOCK_REQUESTS = {
    'CHM-156': {
      id: '#CHM-156', platformId: 'TPC-2026-156', moduleKey: 'safety', type: 'new-chemical',
      title: 'Acetone — New chemical',
      submittedBy: 'Ahmed Mahamat', submitterRole: 'user', site: 'Douala', date: '14 May 2026',
      manufacturer: 'Sigma-Aldrich', use: 'Cleaning',
      hazards: ['flame','exclamation'],
      hazardClass: 'H225 / H319 / H336',
      ppe: ['Safety glasses','Nitrile gloves','Lab coat','Local exhaust'],
      currentStage: 'Safety Review',
      status: 'submitted', slaStatus: 'at_risk',
      submittedAt: '2026-05-14T09:32:00.000Z', updatedAt: '2026-05-14T09:32:00.000Z',
      payload: { chemicalName: 'Acetone', intendedUse: 'Cleaning', manufacturerName: 'Sigma-Aldrich' },
      timeline: [
        { status: 'done',    stage: 'Submission',    by: 'Ahmed Mahamat',           date: '14 May, 09:32', note: 'eSDS attached. Requesting bulk approval for lab cleaning workflow.' },
        { status: 'active',  stage: 'Safety Review', by: 'Oumar Cheikh (waiting)',  date: '— Pending 2d',  note: '' },
        { status: 'pending', stage: 'EMP Review',    by: 'Nadia Al-Farsi',          date: '' },
        { status: 'pending', stage: 'IH Review',     by: 'Mariam Deby',             date: '' }
      ]
    },
    'CHM-154': {
      id: '#CHM-154', platformId: 'TPC-2026-154', moduleKey: 'safety', type: 'new-chemical',
      title: 'Methanol — New chemical',
      submittedBy: 'Ibrahim Saleh', submitterRole: 'user', site: 'PS3-Belabo', date: '12 May 2026',
      manufacturer: 'Brenntag Chad', use: 'Laboratory Analysis',
      hazards: ['flame','skull','health'],
      hazardClass: 'H225 / H301 / H311 / H331 / H370',
      ppe: ['Chemical-resistant gloves','Full face shield','SCBA','Apron'],
      currentStage: '—',
      status: 'rejected', slaStatus: 'breached',
      submittedAt: '2026-05-12T11:14:00.000Z', updatedAt: '2026-05-15T16:40:00.000Z',
      payload: { chemicalName: 'Methanol', intendedUse: 'Laboratory Analysis', manufacturerName: 'Brenntag Chad' },
      timeline: [
        { status: 'done',     stage: 'Submission', by: 'Ibrahim Saleh', date: '12 May, 11:14', note: 'Required for HPLC mobile phase prep.' },
        { status: 'rejected', stage: 'IH Review',  by: 'Mariam Deby',   date: '15 May, 16:40', note: 'Quantity exceeds site allowance. Resubmit with reduced volume or split into multiple containers per IH-2024-08.' }
      ]
    },
    'CHM-155': {
      id: '#CHM-155', platformId: 'TPC-2026-155', moduleKey: 'safety', type: 'add-to-site',
      title: 'Diesel — Add to PS2-Dompta',
      submittedBy: 'Fatima Moussa', submitterRole: 'sm', site: 'PS2-Dompta', date: '13 May 2026',
      manufacturer: 'TotalEnergies', use: 'Fuel',
      hazards: ['flame','exclamation','environment'],
      hazardClass: 'H226 / H304 / H332 / H351 / H411',
      ppe: ['Safety glasses','Nitrile gloves','Hard hat','Steel-toe boots'],
      currentStage: 'Review Complete',
      status: 'review_complete', slaStatus: 'ok',
      submittedAt: '2026-05-13T07:01:00.000Z', updatedAt: '2026-05-14T16:30:00.000Z',
      payload: { chemicalName: 'Diesel', intendedUse: 'Fuel', manufacturerName: 'TotalEnergies' },
      timeline: [
        { status: 'done', stage: 'Submission',      by: 'Fatima Moussa',  date: '13 May, 07:01', note: '' },
        { status: 'done', stage: 'Safety Review',   by: 'Oumar Cheikh',   date: '13 May, 14:55', note: 'Standard fuel-handling PPE applies.' },
        { status: 'done', stage: 'EMP Review',      by: 'Nadia Al-Farsi', date: '14 May, 09:10', note: 'Containment plan verified.' },
        { status: 'done', stage: 'IH Review',       by: 'Mariam Deby',    date: '13 May, 11:30', note: 'Standard fuel — pre-approved class.' },
        { status: 'done', stage: 'Review Complete', by: 'System',         date: '14 May, 16:30', note: 'All review stages completed.' }
      ]
    }
  };

  function openDrawer(reqId) {
    const liveStore = (window.TPC && window.TPC.requests) || {};
    const key = reqId.replace('#', '');
    const r = liveStore[key] || MOCK_REQUESTS[key];
    if (!r) return;
    const drawer = document.getElementById('drawer');
    const backdrop = document.getElementById('drawer-backdrop');

    drawer.querySelector('.drawer-id').textContent = r.id;
    drawer.querySelector('.drawer-title').textContent = r.title;

    drawer.querySelector('#dw-by').textContent = r.submittedBy;
    drawer.querySelector('#dw-site').textContent = r.site;
    drawer.querySelector('#dw-date').textContent = r.date;
    drawer.querySelector('#dw-mfr').textContent = r.manufacturer;
    drawer.querySelector('#dw-use').textContent = r.use;
    drawer.querySelector('#dw-stage').textContent = r.currentStage;

    // hazards
    const haz = drawer.querySelector('#dw-hazards');
    haz.innerHTML = `
      <span class="ghs-stack">${r.hazards.map(t => window.TPCGhs(t)).join('')}</span>
      <div class="haz-info">
        <span class="haz-cls">Hazard classification</span>
        <span class="haz-stmt">${r.hazardClass}</span>
      </div>`;

    // PPE
    drawer.querySelector('#dw-ppe').innerHTML = r.ppe.map(p =>
      `<span class="ppe-chip"><span data-icon="hard-hat"></span>${p}</span>`).join('');

    // timeline
    const stageIcons = { Submission: 'send', 'Safety Review': 'shield-check', 'EMP Review': 'leaf', 'IH Review': 'flask', 'Review Complete': 'check-circle', Resubmission: 'refresh-cw' };
    drawer.querySelector('#dw-timeline').innerHTML = r.timeline.map(t => `
      <div class="tl-item ${t.status}">
        <div class="tl-node">${t.status === 'done' ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : t.status === 'rejected' ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>` : `<span data-icon="${stageIcons[t.stage] || 'clock'}"></span>`}</div>
        <div class="tl-content">
          <div class="tl-title">${t.stage}${t.status === 'rejected' ? ' <span class="badge badge-danger">Rejected</span>' : t.status === 'active' ? ' <span class="badge badge-warning badge-dot">In progress</span>' : ''}</div>
          <div class="tl-meta">${t.by}${t.date ? ' · ' + t.date : ''}</div>
          ${t.note ? `<div class="tl-note">${t.note}</div>` : ''}
        </div>
      </div>
    `).join('');

    if (window.TPCIconHydrate) window.TPCIconHydrate(drawer);

    // Action zone visibility: show only for live, actionable requests + reviewer roles
    _drawerReqId = key;
    const actionZone = document.getElementById('dw-action-zone');
    if (actionZone) {
      const isLive     = !!liveStore[key];
      const actionable = isLive && (r.status === 'submitted' || r.status === 'under_review');
      const viewer     = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
      const canReview  = ['she', 'admin', 'ga'].includes(viewer.role);
      actionZone.style.display = (actionable && canReview) ? 'flex' : 'none';
    }

    drawer.classList.add('open');
    backdrop.classList.add('open');
  }

  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawer-backdrop').classList.remove('open');
    _drawerReqId = null;
  }

  /* ============== MASTER SHEET ============== */
  const INVENTORY = [
    { code: 'CHM-001', name: 'Acetone',              cas: '67-64-1',     mfr: 'Sigma-Aldrich',   site: 'Douala',        hazards: ['flame','exclamation'],     hclass: 'H225', haz: 'h2', qty: 18,  cap: 50,  ppe: 3 },
    { code: 'CHM-002', name: 'Diesel',                cas: '68476-34-6',  mfr: 'TotalEnergies',   site: 'PS2-Dompta',    hazards: ['flame','exclamation','environment'], hclass: 'H226', haz: 'h2', qty: 480, cap: 600, ppe: 4 },
    { code: 'CHM-003', name: 'Methanol',              cas: '67-56-1',     mfr: 'Brenntag Chad',   site: 'PS3-Belabo',    hazards: ['flame','skull','health'],  hclass: 'H225/H301', haz: 'h1', qty: 12,  cap: 20,  ppe: 5 },
    { code: 'CHM-004', name: 'Hydraulic Fluid ISO 46',cas: '64742-65-0',  mfr: 'Castrol Industrial', site: 'PS2-Dompta', hazards: ['exclamation'],             hclass: 'H319',  haz: 'h3', qty: 95,  cap: 200, ppe: 3 },
    { code: 'CHM-005', name: 'Sodium Hypochlorite',   cas: '7681-52-9',   mfr: 'Brenntag Chad',   site: 'PRS-Kribi',     hazards: ['corrosion','environment'], hclass: 'H314',  haz: 'h1', qty: 35,  cap: 60,  ppe: 5 },
    { code: 'CHM-006', name: 'Lithium Grease',        cas: '7620-77-1',   mfr: 'Shell Chemicals', site: 'PS2-Dompta',    hazards: ['exclamation'],             hclass: 'H315',  haz: 'h4', qty: 22,  cap: 40,  ppe: 2 },
    { code: 'CHM-007', name: 'Compressed Nitrogen',   cas: '7727-37-9',   mfr: 'TotalEnergies',   site: 'Douala',        hazards: ['cylinder'],                hclass: 'H280',  haz: 'h3', qty: 8,   cap: 12,  ppe: 2 },
    { code: 'CHM-008', name: 'Hydrochloric Acid 32%', cas: '7647-01-0',   mfr: 'Sigma-Aldrich',   site: 'Douala',        hazards: ['corrosion','exclamation'], hclass: 'H314',  haz: 'h1', qty: 5,   cap: 10,  ppe: 5 },
    { code: 'CHM-009', name: 'Isopropyl Alcohol',     cas: '67-63-0',     mfr: 'Sigma-Aldrich',   site: 'Douala',        hazards: ['flame','exclamation'],     hclass: 'H225',  haz: 'h2', qty: 28,  cap: 40,  ppe: 3 },
    { code: 'CHM-010', name: 'Kerosene Jet A-1',      cas: '8008-20-6',   mfr: 'TotalEnergies',   site: 'FSO',           hazards: ['flame','health','environment'], hclass: 'H226/H304', haz: 'h2', qty: 1200, cap: 1500, ppe: 4 },
    { code: 'CHM-011', name: 'Mercaptan Odorant',     cas: '75-08-1',     mfr: 'Shell Chemicals', site: 'FSO',           hazards: ['flame','skull','exclamation','environment'], hclass: 'H225/H330', haz: 'h1', qty: 3,   cap: 8,   ppe: 5 },
    { code: 'CHM-012', name: 'Ethylene Glycol',       cas: '107-21-1',    mfr: 'Brenntag Chad',   site: 'PS3-Belabo',    hazards: ['exclamation','health'],    hclass: 'H302/H373', haz: 'h2', qty: 40,  cap: 80,  ppe: 3 }
  ];

  function renderInventory(container) {
    if (!container) return;
    const rows = INVENTORY.map(c => {
      const ppeChips = `<span class="badge badge-neutral mono">${c.ppe}</span>`;
      const pct = (c.qty / c.cap) * 100;
      const fillCls = pct > 80 ? 'danger' : pct > 60 ? 'warn' : '';
      return `<tr data-req="${c.code}">
        <td class="id-cell">${c.code}</td>
        <td>
          <div style="font-weight:600;color:var(--text)">${c.name}</div>
          <div class="mono" style="font-size:11px;color:var(--text-4);margin-top:2px">CAS ${c.cas}</div>
        </td>
        <td><div class="haz-cell">${c.hazards.map(t => window.TPCGhs(t, 'sm')).join('')}</div></td>
        <td><span class="haz-class-pill ${c.haz}">${c.hclass}</span></td>
        <td>${c.mfr}</td>
        <td>${c.site}</td>
        <td>
          <span class="inv-bar">
            <span class="inv-bar-track"><span class="inv-bar-fill ${fillCls}" style="width:${pct}%"></span></span>
            <span class="inv-bar-val">${c.qty}/${c.cap}</span>
          </span>
        </td>
        <td>${ppeChips}</td>
      </tr>`;
    }).join('');
    container.querySelector('tbody').innerHTML = rows;
  }

  function bindMsFilters() {
    document.querySelectorAll('.ms-chip-filter').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.parentElement.querySelectorAll('.ms-chip-filter').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }

  /* ============== PPE DATA ============== */
  const PPE_MAP = {
    flame:       { label: 'Flammable',          items: ['Antistatic clothing', 'No ignition source'],                  active: true },
    skull:       { label: 'Toxic',              items: ['Full face shield', 'SCBA', 'Chemical-resistant suit'],        active: true },
    exclamation: { label: 'Irritant',           items: ['Safety glasses', 'Nitrile gloves'],                          active: true },
    health:      { label: 'Health Hazard',      items: ['Respirator', 'Medical surveillance'],                        active: true },
    cylinder:    { label: 'Gas under pressure', items: ['Hard hat', 'Steel-toe boots', 'Cylinder cart'],              active: true },
    oxidizer:    { label: 'Oxidising',          items: ['Face shield', 'Apron', 'No combustible nearby'],             active: true },
    corrosion:   { label: 'Corrosive',          items: ['Acid-resistant gloves', 'Splash goggles', 'Apron'],          active: true },
    environment: { label: 'Environmental',      items: ['Containment tray', 'Spill kit'],                            active: true },
    bomb:        { label: 'Explosive',          items: ['Blast shield', 'Remote handling', 'SCBA'],                  active: true }
  };

  /* ============== PPE ADMIN STATE ============== */
  let _ppeQuery   = '';
  let _ppeShowAll = false;
  let _ppeBound   = false;
  let _editPpeKey = null;

  /* ============== HAZARD PICKER (form) ============== */
  function renderHazardPicker(container) {
    if (!container) return;
    const list = Object.keys(PPE_MAP).filter(k => PPE_MAP[k].active !== false);
    container.innerHTML = list.map(t => `
      <button type="button" class="hazard-opt" data-haz="${t}">
        ${window.TPCGhs(t, 'sm')}
        <span class="haz-name">${window.TPCGhsLabels[t]}</span>
      </button>`).join('');
    container.querySelectorAll('.hazard-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        updatePpeRecommendation();
      });
    });
  }

  function updatePpeRecommendation() {
    const sel = Array.from(document.querySelectorAll('.hazard-opt.selected')).map(el => el.getAttribute('data-haz'));
    const set = new Set();
    sel.forEach(h => (PPE_MAP[h]?.items || []).forEach(p => set.add(p)));
    const strip = document.getElementById('ppe-strip');
    if (!strip) return;
    if (set.size === 0) {
      strip.style.display = 'none';
      return;
    }
    strip.style.display = '';
    strip.innerHTML = `<div class="ppe-strip-head"><span data-icon="hard-hat"></span>Recommended PPE based on selected hazards</div>` +
      Array.from(set).map(p => `<span class="ppe-chip"><span data-icon="hard-hat"></span>${p}</span>`).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(strip);
  }

  /* ============== USER GUIDE PDF ============== */
  function bindUserGuide() {
    const drop = document.getElementById('guide-pdf-drop');
    const viewer = document.getElementById('guide-pdf-viewer');
    if (!drop || !viewer) return;
    const showPdf = url => {
      viewer.innerHTML = `<iframe src="${url}" style="width:100%;height:600px;border:1px solid var(--border);border-radius:8px"></iframe>`;
      viewer.style.display = '';
      drop.style.display = 'none';
    };
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
    drop.addEventListener('drop', e => {
      e.preventDefault();
      drop.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') showPdf(URL.createObjectURL(file));
    });
    drop.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = 'application/pdf';
      input.onchange = () => { if (input.files[0]) showPdf(URL.createObjectURL(input.files[0])); };
      input.click();
    });
  }

  /* ============== PPE REFERENCE ============== */
  function renderPPEReference(el) {
    if (!el) return;
    const user    = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    const isAdmin = user.role === 'ga' || user.role === 'admin';
    const q       = _ppeQuery.toLowerCase().trim();

    let entries = Object.entries(PPE_MAP);
    if (!_ppeShowAll) entries = entries.filter(([, v]) => v.active !== false);
    if (q) entries = entries.filter(([k, v]) =>
      v.label.toLowerCase().includes(q) ||
      k.toLowerCase().includes(q) ||
      v.items.some(i => i.toLowerCase().includes(q))
    );

    if (entries.length === 0) {
      el.innerHTML = '<div style="color:var(--text-4);padding:var(--s-6);font-size:14px">No hazard classes match.</div>';
      return;
    }

    el.innerHTML = entries.map(([key, v]) => {
      const inactive = v.active === false;
      const namePart = v.label + (inactive
        ? ' <span class="badge badge-neutral" style="font-size:10px;margin-left:4px">Inactive</span>'
        : '');
      const actions = isAdmin ? (inactive
        ? `<div class="ppe-card-actions">
             <button class="btn btn-sm btn-ghost ppe-react-btn" data-key="${key}">
               <span data-icon="refresh-cw"></span>Reactivate
             </button>
           </div>`
        : `<div class="ppe-card-actions">
             <button class="btn btn-sm btn-ghost ppe-edit-btn" data-key="${key}">
               <span data-icon="edit-2"></span>Edit
             </button>
             <button class="btn btn-sm btn-ghost ppe-deact-btn" data-key="${key}">
               <span data-icon="slash"></span>Deactivate
             </button>
           </div>`)
        : '';
      const chips = v.items.map(i =>
        `<span class="ppe-chip"><span data-icon="hard-hat"></span>${i}</span>`).join('');
      return `
        <div class="ppe-class-card${inactive ? ' ppe-inactive' : ''}" data-ppe-key="${key}">
          <div class="ppe-card-head">
            <span class="ppe-ghs">${window.TPCGhs ? window.TPCGhs(key) : ''}</span>
            <div class="ppe-card-info">
              <div class="ppe-card-label">${namePart}</div>
              <div class="ppe-card-key">${key}</div>
            </div>
            ${actions}
          </div>
          <div class="ppe-card-items">${chips}</div>
        </div>`;
    }).join('');

    if (window.TPCIconHydrate) window.TPCIconHydrate(el);
  }

  /* ============== PPE ADMIN — REFRESH HELPERS ============== */
  function refreshHazardPicker() {
    const container = document.getElementById('hazard-picker');
    if (container) renderHazardPicker(container);
    updatePpeRecommendation(); // update strip in case selected classes changed
    if (window.TPC && window.TPC.resetLazy) window.TPC.resetLazy('new-chemical');
  }

  function refreshPpeReference() {
    const el = document.getElementById('ppe-reference');
    if (el) renderPPEReference(el);
  }

  function refreshPpeKPIs() {
    const count = Object.values(PPE_MAP).filter(v => v.active !== false).length;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('hub-kpi-ppe',  count);
    set('hub-meta-ppe', 'GHS reference · ' + count + ' hazard classes');
    set('sa-ppe-count', count);
  }

  /* ============== PPE ADMIN — MUTATION FUNCTIONS ============== */
  function updatePpeClass(key, data) {
    const entry = PPE_MAP[key];
    if (!entry) return { error: 'Unknown hazard class' };
    const label = (data.label || '').trim();
    if (!label) return { error: 'Label is required' };
    if (label.length > 60) return { error: 'Label exceeds 60 characters' };
    const items = (data.items || []).map(s => s.trim()).filter(Boolean);
    if (items.length === 0) return { error: 'At least one PPE item is required' };
    entry.label = label;
    entry.items = items;
    refreshHazardPicker();
    refreshPpeReference();
    refreshPpeKPIs();
    return { key };
  }

  function deactivatePpeClass(key) {
    const entry = PPE_MAP[key];
    if (!entry) return;
    entry.active = false;
    refreshHazardPicker();
    refreshPpeReference();
    refreshPpeKPIs();
  }

  function reactivatePpeClass(key) {
    const entry = PPE_MAP[key];
    if (!entry) return;
    entry.active = true;
    refreshHazardPicker();
    refreshPpeReference();
    refreshPpeKPIs();
  }

  /* ============== PPE ADMIN — FORM HELPERS ============== */
  function openPpeEditForm(key) {
    const entry = PPE_MAP[key];
    if (!entry) return;
    _editPpeKey = key;
    const title   = document.getElementById('ppe-form-title');
    const sub     = document.getElementById('ppe-form-subtitle');
    const keyDisp = document.getElementById('ppe-f-key-display');
    const labelEl = document.getElementById('ppe-f-label');
    const itemsEl = document.getElementById('ppe-f-items');
    const panel   = document.getElementById('ppe-form-panel');
    if (title)   title.textContent = 'Edit hazard class';
    if (sub)   { sub.textContent   = 'Editing: ' + entry.label; sub.style.display = ''; }
    if (keyDisp) keyDisp.innerHTML = (window.TPCGhs ? window.TPCGhs(key, 'sm') : '') +
      '<span class="mono" style="font-size:12px;color:var(--text-3);margin-left:6px">' + key + '</span>';
    if (labelEl) labelEl.value     = entry.label;
    if (itemsEl) itemsEl.value     = entry.items.join('\n');
    if (panel) { panel.style.display = ''; panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    if (labelEl) labelEl.focus();
  }

  function closePpeForm() {
    const panel = document.getElementById('ppe-form-panel');
    const sub   = document.getElementById('ppe-form-subtitle');
    if (panel) panel.style.display = 'none';
    if (sub)  { sub.textContent = ''; sub.style.display = 'none'; }
    _editPpeKey = null;
  }

  /* ============== PPE ADMIN — PAGE BINDING ============== */
  function injectPpeAdminCSS() {
    if (document.getElementById('ppe-admin-css')) return;
    const s = document.createElement('style');
    s.id = 'ppe-admin-css';
    s.textContent = `
#ppe-reference{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:var(--s-4);padding:var(--s-1) 0}
.ppe-class-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden}
.ppe-class-card.ppe-inactive{opacity:0.5}
.ppe-card-head{display:flex;align-items:center;gap:var(--s-3);padding:var(--s-4) var(--s-5);border-bottom:1px solid var(--border);background:var(--surface-2)}
.ppe-ghs{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ppe-ghs .ghs{width:34px;height:34px}
.ppe-card-info{flex:1;min-width:0}
.ppe-card-label{font-size:14px;font-weight:600;color:var(--text)}
.ppe-card-key{font-size:11px;color:var(--text-4);margin-top:2px;font-family:var(--font-mono)}
.ppe-card-actions{flex-shrink:0;display:flex;gap:var(--s-2);margin-left:auto}
.ppe-card-items{padding:var(--s-3) var(--s-5);display:flex;flex-wrap:wrap;gap:var(--s-2);min-height:44px}
    `;
    document.head.appendChild(s);
  }

  function bindPpePage() {
    if (_ppeBound) return;
    _ppeBound = true;
    injectPpeAdminCSS();

    const searchEl = document.getElementById('ppe-search');
    if (searchEl) searchEl.addEventListener('input', () => {
      _ppeQuery = searchEl.value;
      refreshPpeReference();
    });

    const fActive = document.getElementById('ppe-filter-active');
    const fAll    = document.getElementById('ppe-filter-all');
    [fActive, fAll].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        _ppeShowAll = btn === fAll;
        if (fActive) fActive.classList.toggle('active', !_ppeShowAll);
        if (fAll)    fAll.classList.toggle('active',     _ppeShowAll);
        refreshPpeReference();
      });
    });

    const cancelBtn = document.getElementById('ppe-form-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closePpeForm);

    const saveBtn = document.getElementById('ppe-form-save');
    if (saveBtn) saveBtn.addEventListener('click', () => {
      if (!_editPpeKey) return;
      const label    = (document.getElementById('ppe-f-label') || {}).value || '';
      const itemsRaw = (document.getElementById('ppe-f-items') || {}).value || '';
      const items    = itemsRaw.split('\n').map(s => s.trim()).filter(Boolean);
      const result   = updatePpeClass(_editPpeKey, { label, items });
      if (result && result.error) { if (window.TPC) window.TPC.toast(result.error); return; }
      if (window.TPC) window.TPC.toast('✓ Hazard class updated');
      closePpeForm();
    });

    const grid = document.getElementById('ppe-reference');
    if (!grid) return;
    grid.addEventListener('click', e => {
      const editBtn = e.target.closest('.ppe-edit-btn');
      if (editBtn) { openPpeEditForm(editBtn.getAttribute('data-key')); return; }

      const deactBtn = e.target.closest('.ppe-deact-btn');
      if (deactBtn) {
        if (deactBtn.dataset.confirming) {
          deactivatePpeClass(deactBtn.getAttribute('data-key'));
          if (window.TPC) window.TPC.toast('✓ Hazard class deactivated');
        } else {
          const orig = deactBtn.innerHTML;
          deactBtn.dataset.confirming = '1';
          deactBtn.textContent = 'Confirm?';
          deactBtn.classList.replace('btn-ghost', 'btn-danger');
          setTimeout(() => {
            if (deactBtn.dataset.confirming) {
              delete deactBtn.dataset.confirming;
              deactBtn.innerHTML = orig;
              deactBtn.classList.replace('btn-danger', 'btn-ghost');
              if (window.TPCIconHydrate) window.TPCIconHydrate(deactBtn);
            }
          }, 3000);
        }
        return;
      }

      const reactBtn = e.target.closest('.ppe-react-btn');
      if (reactBtn) {
        reactivatePpeClass(reactBtn.getAttribute('data-key'));
        if (window.TPC) window.TPC.toast('✓ Hazard class reactivated');
        return;
      }
    });
  }

  /* ============== ADD TO MY SITE ============== */
  function bindAddToSite() {
    // Site → location dropdown wiring is handled by tpc-v5.js wireAddToSiteForm().
    const submit = document.getElementById('ats-submit');
    if (submit) submit.addEventListener('click', e => {
      e.preventDefault();
      const chemEl = document.getElementById('ats-chemical');
      const siteEl = document.getElementById('ats-site');
      const locEl  = document.getElementById('ats-location');
      if (!chemEl || !chemEl.value) {
        if (window.TPC) window.TPC.toast('Select a chemical before submitting');
        return;
      }
      const chemName  = chemEl.options[chemEl.selectedIndex]?.text || chemEl.value;
      const siteKey   = siteEl ? siteEl.value : '';
      const siteLabel = siteEl && siteEl.selectedIndex > 0
        ? siteEl.options[siteEl.selectedIndex].text : siteKey;
      const locLabel  = locEl && locEl.selectedIndex > 0
        ? locEl.options[locEl.selectedIndex].text : '';
      const payload = {
        type:          'add-to-site',
        chemicalName:  `${chemName} — ${siteLabel}`,
        storageKey:    siteKey,
        storageLabel:  locLabel || siteLabel
      };
      if (window.TPC && window.TPC.addRequest) window.TPC.addRequest(payload);
      if (window.TPC) window.TPC.toast('✓ Request submitted — routing to HSE reviewer');
      if (window.TPC) window.TPC.goPage('safety-home');
    });
  }

  /* ============== STORAGE ============== */
  function renderStorage(el) {
    if (!el) return;
    const data = window.TPC && window.TPC.storageMap;
    if (!data) return;
    const siteLabels = {
      douala: 'Douala HQ', ps2: 'PS2-Dompta', ps3: 'PS3-Belabo',
      prs: 'PRS-Kribi', fso: 'FSO Offshore', warehouse: 'Warehouse', other: 'Other'
    };
    el.innerHTML = Object.entries(data).filter(([key]) => key !== 'other').map(([site, locs]) => `
      <div class="card" style="margin-bottom:var(--s-4)">
        <div class="card-head">
          <div class="card-title"><span data-icon="map-pin"></span>${siteLabels[site] || site}</div>
          <span class="badge badge-neutral mono">${locs.length} location${locs.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="card-body flush">
          ${locs.map(loc => `
            <div style="display:flex;align-items:center;gap:var(--s-3);padding:var(--s-3) var(--s-5);border-bottom:1px solid var(--border)">
              <span data-icon="archive" style="color:var(--text-3);flex-shrink:0"></span>
              <span style="font-size:14px">${loc}</span>
            </div>`).join('')}
        </div>
      </div>`).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(el);
  }

  /* ============== MANUFACTURERS ============== */
  function renderManufacturers(el, query, showAll) {
    if (!el) return;
    const data = window.TPC && window.TPC.manufacturers;
    if (!data) return;
    const q       = (query || '').toLowerCase();
    const user    = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    const isAdmin = user.role === 'ga' || user.role === 'admin';

    let entries = [...data];
    if (!showAll) entries = entries.filter(m => m.active !== false);
    if (q) entries = entries.filter(m =>
      m.name.toLowerCase().includes(q) || (m.email || '').toLowerCase().includes(q)
    );
    entries.sort((a, b) => a.name.localeCompare(b.name));

    if (entries.length === 0) {
      el.innerHTML = '<p style="color:var(--text-4);padding:var(--s-4)">No manufacturers match.</p>';
      return;
    }

    el.innerHTML = entries.map(m => {
      const inactive = m.active === false;
      const av = m.name.slice(0,2).toUpperCase();
      const actions = isAdmin ? (inactive
        ? `<button class="btn btn-sm btn-ghost mfr-react-btn" data-id="${m.id}"><span data-icon="refresh-cw"></span>Reactivate</button>`
        : `<button class="btn btn-sm btn-ghost mfr-edit-btn" data-id="${m.id}"><span data-icon="edit-2"></span>Edit</button>
           <button class="btn btn-sm btn-ghost mfr-deact-btn" data-id="${m.id}"><span data-icon="slash"></span>Deactivate</button>`
      ) : '';
      return `<div class="user-card" data-mfr-id="${m.id}" style="${inactive ? 'opacity:0.5' : ''}">
        <div class="user-av">${av}</div>
        <div class="user-info">
          <div class="u-name">${m.name}${inactive ? ' <span class="badge badge-neutral" style="font-size:10px;margin-left:4px">Inactive</span>' : ''}</div>
          <div class="u-role">${m.addr || '—'}</div>
          <div class="u-email">${m.email || '—'}</div>
        </div>
        <div style="font-size:12px;color:var(--text-3);font-family:var(--font-mono);white-space:nowrap">${m.phone || '—'}</div>
        ${actions ? `<div class="actions" style="margin-left:8px;flex-shrink:0">${actions}</div>` : ''}
      </div>`;
    }).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(el);

    // Card action bindings
    let _editingId = null;
    const panel = document.getElementById('mfr-form-panel');
    const formTitle = document.getElementById('mfr-form-title');

    el.querySelectorAll('.mfr-edit-btn').forEach(btn => btn.addEventListener('click', () => {
      const id  = btn.getAttribute('data-id');
      const mfr = (window.TPC.manufacturers || []).find(m => m.id === id);
      if (!mfr || !panel) return;
      _editingId = id;
      if (formTitle) formTitle.textContent = 'Edit manufacturer';
      const set = (fid, val) => { const el = document.getElementById(fid); if (el) el.value = val; };
      set('mfr-f-name',  mfr.name);
      set('mfr-f-email', mfr.email);
      set('mfr-f-phone', mfr.phone);
      set('mfr-f-addr',  mfr.addr);
      set('mfr-f-notes', mfr.notes || '');
      const subtitle = document.getElementById('mfr-form-subtitle');
      const statusEl = document.getElementById('mfr-form-status');
      if (subtitle) { subtitle.textContent = 'Editing: ' + mfr.name; subtitle.style.display = ''; }
      if (statusEl) {
        statusEl.style.display = '';
        statusEl.innerHTML = mfr.active !== false
          ? '<span class="badge badge-success">Active</span>'
          : '<span class="badge badge-neutral">Inactive</span>';
      }
      panel.style.display = '';
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el._editingId = _editingId;
    }));

    el.querySelectorAll('.mfr-deact-btn').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (btn.dataset.confirming) {
        if (window.TPC && window.TPC.deactivateManufacturer) window.TPC.deactivateManufacturer(id);
        if (window.TPC) window.TPC.toast('Manufacturer deactivated');
      } else {
        const original = btn.innerHTML;
        btn.dataset.confirming = 'true';
        btn.textContent = 'Confirm deactivate?';
        btn.classList.replace('btn-ghost', 'btn-danger');
        setTimeout(() => {
          if (btn.dataset.confirming) {
            delete btn.dataset.confirming;
            btn.innerHTML = original;
            btn.classList.replace('btn-danger', 'btn-ghost');
            if (window.TPCIconHydrate) window.TPCIconHydrate(btn);
          }
        }, 3000);
      }
    }));

    el.querySelectorAll('.mfr-react-btn').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (window.TPC && window.TPC.reactivateManufacturer) window.TPC.reactivateManufacturer(id);
      if (window.TPC) window.TPC.toast('Manufacturer reactivated');
    }));
  }

  function refreshMfrGrid() {
    const el      = document.getElementById('mfr-grid');
    const query   = (document.getElementById('mfr-search') || {}).value || '';
    const showAll = (document.getElementById('mfr-filter-all') || {}).classList
                      ? document.getElementById('mfr-filter-all').classList.contains('active')
                      : false;
    renderManufacturers(el, query, showAll);
  }

  function refreshMfrDropdown() {
    const sel = document.getElementById('mfr-select');
    if (!sel || !window.TPC) return;
    const data   = window.TPC.manufacturers || [];
    const active = data.filter(m => m.active !== false).sort((a, b) => a.name.localeCompare(b.name));
    const prev   = sel.value;
    const stillActive = prev && active.some(m => m.id === prev);
    // Rebuild options: preserve placeholder + active list + "add new" sentinel
    sel.innerHTML = '<option value="">Select manufacturer…</option>';
    active.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id; opt.textContent = m.name;
      if (m.id === prev && stillActive) opt.selected = true;
      sel.appendChild(opt);
    });
    const addNew = document.createElement('option');
    addNew.value = '__new'; addNew.textContent = '+ Add new manufacturer…';
    sel.appendChild(addNew);
    // If selected manufacturer was deactivated, clear auto-fill fields
    if (prev && !stillActive) {
      ['mfr-email','mfr-phone','mfr-addr'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
      });
    }
  }

  function bindMfrPage() {
    renderManufacturers(document.getElementById('mfr-grid'));

    const search = document.getElementById('mfr-search');
    if (search) search.addEventListener('input', () => refreshMfrGrid());

    const fActive = document.getElementById('mfr-filter-active');
    const fAll    = document.getElementById('mfr-filter-all');
    [fActive, fAll].forEach(btn => btn && btn.addEventListener('click', () => {
      if (fActive) fActive.classList.toggle('active', btn === fActive);
      if (fAll)    fAll.classList.toggle('active',    btn === fAll);
      refreshMfrGrid();
    }));

    const addBtn = document.getElementById('mfr-add-btn');
    const panel  = document.getElementById('mfr-form-panel');
    const formTitle = document.getElementById('mfr-form-title');
    const grid   = document.getElementById('mfr-grid');

    if (addBtn) addBtn.addEventListener('click', () => {
      if (grid) grid._editingId = null;
      if (formTitle) formTitle.textContent = 'Add manufacturer';
      ['mfr-f-name','mfr-f-email','mfr-f-phone','mfr-f-addr','mfr-f-notes']
        .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      const subtitle = document.getElementById('mfr-form-subtitle');
      const statusEl = document.getElementById('mfr-form-status');
      if (subtitle) { subtitle.textContent = ''; subtitle.style.display = 'none'; }
      if (statusEl) { statusEl.innerHTML = ''; statusEl.style.display = 'none'; }
      if (panel) { panel.style.display = ''; panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });

    const cancelBtn = document.getElementById('mfr-form-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', () => {
      if (panel) panel.style.display = 'none';
      if (grid)  grid._editingId = null;
      const subtitle = document.getElementById('mfr-form-subtitle');
      const statusEl = document.getElementById('mfr-form-status');
      if (subtitle) { subtitle.textContent = ''; subtitle.style.display = 'none'; }
      if (statusEl) { statusEl.innerHTML = ''; statusEl.style.display = 'none'; }
    });

    const saveBtn = document.getElementById('mfr-form-save');
    if (saveBtn) saveBtn.addEventListener('click', () => {
      const name = (document.getElementById('mfr-f-name') || {}).value || '';
      if (!name.trim()) { if (window.TPC) window.TPC.toast('Manufacturer name is required'); return; }
      const data = {
        name:  name.trim(),
        email: (document.getElementById('mfr-f-email') || {}).value || '',
        phone: (document.getElementById('mfr-f-phone') || {}).value || '',
        addr:  (document.getElementById('mfr-f-addr')  || {}).value || '',
        notes: (document.getElementById('mfr-f-notes') || {}).value || ''
      };
      const editingId = grid ? grid._editingId : null;
      if (editingId) {
        if (window.TPC) window.TPC.updateManufacturer(editingId, data);
        if (window.TPC) window.TPC.toast('Manufacturer updated');
      } else {
        if (window.TPC) window.TPC.addManufacturer(data);
        if (window.TPC) window.TPC.toast('Manufacturer added');
      }
      if (panel) panel.style.display = 'none';
      if (grid)  grid._editingId = null;
      const subtitle = document.getElementById('mfr-form-subtitle');
      const statusEl = document.getElementById('mfr-form-status');
      if (subtitle) { subtitle.textContent = ''; subtitle.style.display = 'none'; }
      if (statusEl) { statusEl.innerHTML = ''; statusEl.style.display = 'none'; }
    });
  }

  /* ============== FORM PROGRESS ============== */
  function updateFormProgress() {
    const required = document.querySelectorAll('[data-required]');
    if (required.length === 0) return;
    let filled = 0;
    required.forEach(el => {
      const v = el.value;
      if (v && v !== '') filled++;
    });
    const pct = Math.round((filled / required.length) * 100);
    const bar = document.querySelector('.progress-fill');
    const val = document.querySelector('.progress-val');
    if (bar) bar.style.width = pct + '%';
    if (val) val.textContent = pct + '%';
  }

  /* ============== SAFETY DATA DASHBOARD ============== */
  function _injectSdCSS() {
    if (document.getElementById('sd-css')) return;
    const s = document.createElement('style');
    s.id = 'sd-css';
    s.textContent = `
.sd-kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-4);margin-bottom:var(--s-6)}
.sd-kpi-sub{font-size:12px;color:var(--text-4);margin-top:4px}
.sd-two-col{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4);margin-bottom:var(--s-6)}
.sd-actions{display:flex;flex-direction:column}
.sd-action{display:flex;align-items:center;gap:var(--s-3);padding:var(--s-3) var(--s-5);font-size:14px;color:var(--text);cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s}
.sd-action:last-child{border-bottom:none}
.sd-action:hover{background:var(--surface-2)}
.sd-action>[data-icon]:first-child{width:16px;height:16px;color:var(--text-3);flex-shrink:0}
.sd-action>span:nth-child(2){flex:1}
.sd-chevron{width:14px;height:14px;color:var(--text-4)}
.sd-health{display:flex;flex-direction:column}
.sd-health-row{display:flex;align-items:center;justify-content:space-between;padding:var(--s-2) 0;border-bottom:1px solid var(--border)}
.sd-health-row:last-of-type{border-bottom:none}
.sd-health-label{font-size:13px;color:var(--text-2)}
.sd-health-val{font-size:15px;font-weight:600;font-family:var(--font-mono);color:var(--text)}
.sd-health-val.warn{color:var(--warning)}
.sd-reviewer{margin-bottom:var(--s-6)}
@media(max-width:720px){.sd-two-col{grid-template-columns:1fr}.sd-kpi-row{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(s);
  }

  function renderSafetyDashboard() {
    const el = document.getElementById('safety-dashboard');
    if (!el) return;
    _injectSdCSS();

    const user       = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    const role       = user.role || 'user';
    const isAdmin    = role === 'ga' || role === 'admin';
    const isReviewer = role === 'she';

    if (!isAdmin && !isReviewer) { el.innerHTML = ''; return; }

    /* ── Compute data ── */
    const mfr   = (window.TPC && window.TPC.manufacturers)    || [];
    const locs  = (window.TPC && window.TPC.storageLocations) || [];
    const sites = (window.TPC && window.TPC.sites)            || [];
    const reqs  = window.TPC && window.TPC.requests ? Object.values(window.TPC.requests) : [];

    const mfrActive   = mfr.filter(m => m.active !== false).length;
    const mfrInactive = mfr.filter(m => m.active === false).length;
    const locActive   = locs.filter(l => l.active !== false).length;
    const locInactive = locs.filter(l => l.active === false).length;
    const ppeActive   = Object.values(PPE_MAP).filter(v => v.active !== false).length;
    const ppeInactive = Object.values(PPE_MAP).filter(v => v.active === false).length;

    const wideScope = isAdmin || isReviewer;
    const scoped    = wideScope ? reqs : reqs.filter(r => r.submittedBy === user.name);
    const pending   = scoped.filter(r => r.status === 'submitted' || r.status === 'under_review').length;
    const approved  = scoped.filter(r => r.status === 'review_complete').length;
    const rejected  = scoped.filter(r => r.status === 'rejected').length;

    let html = '';

    /* ── Section A: Repository KPIs (admin only) ── */
    if (isAdmin) {
      html += `
        <div class="sd-kpi-row">
          <div class="kpi">
            <div class="kpi-top"><span class="kpi-label">Active Manufacturers</span></div>
            <div class="kpi-value">${mfrActive}</div>
            <div class="sd-kpi-sub">${mfrActive} active suppliers</div>
          </div>
          <div class="kpi">
            <div class="kpi-top"><span class="kpi-label">Active Locations</span></div>
            <div class="kpi-value">${locActive}</div>
            <div class="sd-kpi-sub">${locActive} locations · ${sites.length} sites</div>
          </div>
          <div class="kpi">
            <div class="kpi-top"><span class="kpi-label">Active PPE Classes</span></div>
            <div class="kpi-value">${ppeActive}</div>
            <div class="sd-kpi-sub">GHS reference · ${ppeActive} hazard classes</div>
          </div>
        </div>`;
    }

    /* ── Section B: Workflow KPIs (admin + reviewer) ── */
    const lbl = isAdmin ? '' : 'My ';
    const pendingDelta = pending > 0
      ? `<span class="kpi-delta down">${pending} need action</span>` : '';
    html += `
      <div class="sd-kpi-row">
        <div class="kpi">
          <div class="kpi-top"><span class="kpi-label">${lbl}Pending Requests</span>${pendingDelta}</div>
          <div class="kpi-value">${pending}</div>
        </div>
        <div class="kpi">
          <div class="kpi-top"><span class="kpi-label">${lbl}Review Complete</span></div>
          <div class="kpi-value">${approved}</div>
        </div>
        <div class="kpi">
          <div class="kpi-top"><span class="kpi-label">${lbl}Rejected Requests</span></div>
          <div class="kpi-value">${rejected}</div>
        </div>
      </div>`;

    /* ── Section C: Quick Actions + System Health ── */
    if (isAdmin) {
      const actionsHtml = [
        { page: 'new-chemical',  icon: 'plus',      label: 'New Chemical Request' },
        { page: 'manufacturers', icon: 'building',  label: 'Manage Manufacturers' },
        { page: 'storage',       icon: 'archive',   label: 'Manage Storage' },
        { page: 'ppe',           icon: 'hard-hat',  label: 'Manage PPE' },
        { page: 'requests',      icon: 'inbox',     label: 'Review Requests' },
        { page: 'master-sheet',  icon: 'database',  label: 'Open Master Sheet' }
      ].map(a => `
        <div class="sd-action" data-page="${a.page}">
          <span data-icon="${a.icon}"></span>
          <span>${a.label}</span>
          <span data-icon="chevron-right" class="sd-chevron"></span>
        </div>`).join('');

      const w = n => n > 0 ? ' warn' : '';
      const healthHtml = `
        <div class="sd-health-row">
          <span class="sd-health-label">Inactive Manufacturers</span>
          <span class="sd-health-val${w(mfrInactive)}">${mfrInactive}</span>
        </div>
        <div class="sd-health-row">
          <span class="sd-health-label">Inactive Locations</span>
          <span class="sd-health-val${w(locInactive)}">${locInactive}</span>
        </div>
        <div class="sd-health-row">
          <span class="sd-health-label">Inactive PPE Classes</span>
          <span class="sd-health-val${w(ppeInactive)}">${ppeInactive}</span>
        </div>
        <div class="sd-action" data-page="safety-admin"
          style="margin:var(--s-2) calc(var(--s-5)*-1) calc(var(--s-3)*-1);border-top:1px solid var(--border)">
          <span data-icon="settings"></span>
          <span>Open Safety Admin</span>
          <span data-icon="chevron-right" class="sd-chevron"></span>
        </div>`;

      html += `
        <div class="sd-two-col">
          <div class="card">
            <div class="card-head">
              <div class="card-title"><span data-icon="zap"></span>&thinsp;Quick Actions</div>
            </div>
            <div class="card-body" style="padding:0">
              <div class="sd-actions">${actionsHtml}</div>
            </div>
          </div>
          <div class="card">
            <div class="card-head">
              <div class="card-title"><span data-icon="activity"></span>&thinsp;System Health</div>
            </div>
            <div class="card-body sd-health">${healthHtml}</div>
          </div>
        </div>`;
    } else {
      html += `
        <div class="sd-reviewer">
          <div class="card">
            <div class="card-head">
              <div class="card-title"><span data-icon="zap"></span>&thinsp;Quick Actions</div>
            </div>
            <div class="card-body" style="padding:0">
              <div class="sd-actions">
                <div class="sd-action" data-page="new-chemical">
                  <span data-icon="plus"></span>
                  <span>New Chemical Request</span>
                  <span data-icon="chevron-right" class="sd-chevron"></span>
                </div>
                <div class="sd-action" data-page="requests">
                  <span data-icon="inbox"></span>
                  <span>Review Requests</span>
                  <span data-icon="chevron-right" class="sd-chevron"></span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }

    el.innerHTML = html;
    if (window.TPCIconHydrate) window.TPCIconHydrate(el);

    // Bind data-page clicks for dynamically rendered elements
    el.querySelectorAll('[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        if (window.TPC && window.TPC.goPage) window.TPC.goPage(item.getAttribute('data-page'));
      });
    });

    // Reset lazy so dashboard recomputes on every navigation visit (live KPIs)
    if (window.TPC && window.TPC.resetLazy) window.TPC.resetLazy('safety-home');
  }

  function refreshSafetyDashboard() {
    renderSafetyDashboard();
  }

  /* ============== MY REQUESTS ============== */
  const STATUS_BADGE = {
    submitted:          '<span class="badge badge-info badge-dot">Pending</span>',
    under_review:       '<span class="badge badge-info badge-dot">In review</span>',
    revision_requested: '<span class="badge badge-warning badge-dot">Revision needed</span>',
    approved:           '<span class="badge badge-success badge-dot">Approved</span>',
    review_complete:    '<span class="badge badge-success badge-dot">Review Complete</span>',
    rejected:           '<span class="badge badge-danger badge-dot">Rejected</span>',
    draft:              '<span class="badge badge-neutral badge-dot">Draft</span>'
  };

  function renderRequests() {
    const tbody = document.getElementById('req-tbody');
    if (!tbody) return;
    const store = (window.TPC && window.TPC.requests) || {};
    const all     = Object.entries(store).map(([k, v]) => ({ key: k, ...v }));
    const user    = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    const seeAll  = user.role === 'ga' || user.role === 'admin' || user.role === 'she';
    const visible = seeAll ? all : (user.name ? all.filter(r => r.submittedBy === user.name) : all);
    if (visible.length === 0) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-4);padding:24px">No requests yet</td></tr>'; return; }
    visible.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    const groups = [
      { label: 'Action Needed', items: visible.filter(r => r.status === 'revision_requested') },
      { label: 'In Progress',   items: visible.filter(r => r.status === 'submitted' || r.status === 'under_review') },
      { label: 'Closed',        items: visible.filter(r => r.status === 'review_complete' || r.status === 'approved' || r.status === 'rejected' || r.status === 'archived') }
    ].filter(g => g.items.length > 0);

    tbody.innerHTML = groups.map(g => `
      <tr class="req-group-row"><td colspan="7" style="padding:8px 16px;background:var(--surface-2);font-size:11px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px">${g.label}</td></tr>
      ${g.items.map(r => `
      <tr data-req="${r.key}">
        <td class="id-cell">${r.platformId || r.id}</td>
        <td>${r.type === 'new-chemical' ? 'New chemical' : 'Add to site'}</td>
        <td>${r.title}</td>
        <td class="mono">${r.date}</td>
        <td>${r.currentStage || '—'}</td>
        <td>${STATUS_BADGE[r.status] || ''}</td>
        <td>${r.status === 'revision_requested'
          ? `<div class="actions"><button class="btn btn-sm btn-primary" onclick="event.stopPropagation();if(window.TPC&&window.TPC.resubmitRequest)window.TPC.resubmitRequest('${r.key}')"><span data-icon="refresh-cw"></span>Resubmit</button><button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();window.TPCv2.openDrawer('${r.key}')"><span data-icon="eye"></span></button></div>`
          : `<button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();window.TPCv2.openDrawer('${r.key}')"><span data-icon="eye"></span></button>`
        }</td>
      </tr>`).join('')}
    `).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(tbody);
  }

  /* ============== APPROVALS INBOX ============== */
  const SLA_BADGE = {
    ok:       '',
    at_risk:  '<span class="badge badge-warning"><span data-icon="clock"></span>At risk</span>',
    breached: '<span class="badge badge-danger"><span data-icon="alert-triangle"></span>SLA breached</span>'
  };
  const REVIEWER_ROLES = ['she', 'admin', 'ga'];

  function renderApprovals() {
    const tbody = document.getElementById('approvals-tbody');
    if (!tbody) return;
    const store    = (window.TPC && window.TPC.requests) || {};
    const approvalUser = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    const role     = approvalUser.role || null;
    const scope    = approvalUser.stagesScope || null;
    const allLive  = Object.entries(store)
      .map(([k, v]) => ({ key: k, ...v }))
      .filter(r => r.status === 'submitted' || r.status === 'under_review')
      .filter(r => !scope || scope.includes(r.currentStage));

    if (allLive.length === 0) {
      const emptyMsg = scope
        ? `No pending approvals in your queue (${scope.join(', ')})`
        : 'No pending approvals';
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-4);padding:24px">${emptyMsg}</td></tr>`;
      return;
    }
    allLive.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    tbody.innerHTML = allLive.map(r => `
      <tr data-req="${r.key}">
        <td class="id-cell">${r.id}</td>
        <td>${r.title.replace(/ — .*/, '')}</td>
        <td>${r.submittedBy}</td>
        <td>${r.site}</td>
        <td>${r.currentStage}</td>
        <td>${SLA_BADGE[r.slaStatus] || '<span class="badge badge-neutral"><span data-icon="clock"></span>' + r.date + '</span>'}</td>
        <td><div class="actions">
          <button class="btn btn-sm btn-ghost" data-return="${r.id}"><span data-icon="refresh-cw"></span>Return</button>
          <button class="btn btn-sm btn-danger" data-reject="${r.id}"><span data-icon="x"></span>Reject</button>
          <button class="btn btn-sm btn-primary" data-approve="${r.id}"><span data-icon="check"></span>Approve</button>
        </div></td>
      </tr>`).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(tbody);
    if (window.TPC && window.TPC.bindApprovalRows) window.TPC.bindApprovalRows();
  }

  /* ============== SAFETY DATA ADMIN KPIs ============== */
  function renderSafetyAdminKPIs() {
    const saUser = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    if (saUser.role !== 'ga' && saUser.role !== 'admin') return;
    const mfr     = (window.TPC && window.TPC.manufacturers) || [];
    const locs    = (window.TPC && window.TPC.storageLocations) || [];
    const reqs    = (window.TPC && window.TPC.requests) || {};
    const mfrCount    = mfr.filter(m => m.active !== false).length;
    const storageLocs = locs.filter(l => l.active !== false).length;
    const ppeCount    = Object.values(PPE_MAP).filter(v => v.active !== false).length;
    const pending     = Object.values(reqs)
                          .filter(r => r.status === 'submitted' || r.status === 'under_review')
                          .length;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('sa-mfr-count',     mfrCount);
    set('sa-storage-count', storageLocs);
    set('sa-ppe-count',     ppeCount);
    set('sa-pending-count', pending);
  }

  /* ============== INIT ============== */
  function bindDrawerActions() {
    const approveBtn = document.getElementById('dw-approve-btn');
    const rejectBtn  = document.getElementById('dw-reject-btn');
    const returnBtn  = document.getElementById('dw-return-btn');
    if (!approveBtn || !rejectBtn || !returnBtn) return;

    approveBtn.addEventListener('click', () => {
      if (!_drawerReqId || !window.TPC) return;
      const id    = _drawerReqId;
      const actor = window.TPC.currentUser().name;
      closeDrawer();
      window.TPC.updateRequestStatus(id, 'approved', actor, '');
      window.TPC.toast(`✓ Approved — #${id}`);
      window.TPC.afterApprovalAction();
    });

    rejectBtn.addEventListener('click', () => {
      if (!_drawerReqId || !window.TPC) return;
      const id = _drawerReqId;
      closeDrawer();
      window.TPC.openReasonModal('reject', id);
    });

    returnBtn.addEventListener('click', () => {
      if (!_drawerReqId || !window.TPC) return;
      const id = _drawerReqId;
      closeDrawer();
      window.TPC.openReasonModal('revision', id);
    });
  }

  function init() {
    hydrateSparklines();
    hydrateRings();
    renderSiteMap(document.getElementById('site-map'));
    renderHazardPicker(document.getElementById('hazard-picker'));
    bindMsFilters();

    // Seed live REQUESTS store with mock data so drawer actions and approvals work on demo items.
    // Guard: skip keys already present (restored from localStorage by a previous session).
    if (window.TPC && window.TPC.requests) {
      Object.entries(MOCK_REQUESTS).forEach(([key, mock]) => {
        if (!window.TPC.requests[key]) window.TPC.requests[key] = mock;
      });
      if (window.TPC.syncNavBadges) window.TPC.syncNavBadges();
    }

    // Master Sheet renders ~100 GHS pictograms — defer until visit
    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      reg('safety-home',   () => renderSafetyDashboard());
      reg('master-sheet', () => renderInventory(document.getElementById('ms-inventory')));
      reg('manufacturers', () => bindMfrPage());
      reg('storage',       () => renderStorage(document.getElementById('storage-list')));
      reg('add-to-site',   () => bindAddToSite());
      reg('ppe',           () => { renderPPEReference(document.getElementById('ppe-reference')); bindPpePage(); });
      reg('user-guide',    () => bindUserGuide());
      reg('requests',      () => renderRequests());
      reg('approvals',     () => renderApprovals());
      reg('new-chemical',  () => renderHazardPicker(document.getElementById('hazard-picker')));
      reg('safety-admin',  () => renderSafetyAdminKPIs());
    } else {
      renderInventory(document.getElementById('ms-inventory'));
      renderManufacturers(document.getElementById('mfr-grid'));
      renderStorage(document.getElementById('storage-list'));
      bindAddToSite();
      renderPPEReference(document.getElementById('ppe-reference'));
      bindUserGuide();
    }

    bindDrawerActions();

    // bind drawer triggers (skip when clicking an interactive child)
    document.addEventListener('click', e => {
      if (e.target.closest('button, a, select, input, textarea')) return;
      const trigger = e.target.closest('[data-req]');
      if (trigger) {
        const id = trigger.getAttribute('data-req');
        openDrawer(id);
      }
    });

    // close drawer
    const dwClose = document.querySelector('#drawer .drawer-close');
    if (dwClose) dwClose.addEventListener('click', closeDrawer);
    const bd = document.getElementById('drawer-backdrop');
    if (bd) bd.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });

    // form progress
    document.querySelectorAll('[data-required]').forEach(el => {
      el.addEventListener('input', updateFormProgress);
      el.addEventListener('change', updateFormProgress);
    });
    updateFormProgress();
  }

  window.TPCv2 = { init, openDrawer, closeDrawer, bindDrawerActions, sparkline, ring, refreshMfrGrid, refreshMfrDropdown, updatePpeClass, deactivatePpeClass, reactivatePpeClass, refreshHazardPicker, refreshSafetyDashboard };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
