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
  const MOCK_REQUESTS = {
    'CHM-156': {
      id: '#CHM-156', title: 'Acetone — New chemical',
      submittedBy: 'Ahmed Mahamat', site: 'Douala', date: '14 May 2026',
      manufacturer: 'Sigma-Aldrich', use: 'Cleaning',
      hazards: ['flame','exclamation'],
      hazardClass: 'H225 / H319 / H336',
      ppe: ['Safety glasses','Nitrile gloves','Lab coat','Local exhaust'],
      currentStage: 'SHE Review',
      timeline: [
        { status: 'done', stage: 'Submission', by: 'Ahmed Mahamat', date: '14 May, 09:32', note: 'eSDS attached. Requesting bulk approval for lab cleaning workflow.' },
        { status: 'done', stage: 'Site Physician', by: 'Dr. Abakar Moussa', date: '14 May, 14:08', note: 'No occupational concerns at proposed quantities. Proceed.' },
        { status: 'active', stage: 'IH Review', by: 'Hassan Ibrahim (waiting)', date: '— Pending 2d', note: '' },
        { status: 'pending', stage: 'OI Safety', by: 'Oumar Cheikh', date: '' },
        { status: 'pending', stage: 'EMP Review', by: 'Nadia Al-Farsi', date: '' },
        { status: 'pending', stage: 'Final Approval', by: 'Site Supervisor', date: '' }
      ]
    },
    'CHM-154': {
      id: '#CHM-154', title: 'Methanol — New chemical',
      submittedBy: 'Ibrahim Saleh', site: 'PS3-Belabo', date: '12 May 2026',
      manufacturer: 'Brenntag Chad', use: 'Laboratory Analysis',
      hazards: ['flame','skull','health'],
      hazardClass: 'H225 / H301 / H311 / H331 / H370',
      ppe: ['Chemical-resistant gloves','Full face shield','SCBA','Apron'],
      currentStage: 'IH Review',
      timeline: [
        { status: 'done', stage: 'Submission', by: 'Ibrahim Saleh', date: '12 May, 11:14', note: 'Required for HPLC mobile phase prep.' },
        { status: 'done', stage: 'Site Physician', by: 'Dr. Fatime Nour', date: '13 May, 08:22', note: 'Medical surveillance protocol required for handlers.' },
        { status: 'rejected', stage: 'IH Review', by: 'Hassan Ibrahim', date: '15 May, 16:40', note: 'Quantity exceeds site allowance. Resubmit with reduced volume or split into multiple containers per IH-2024-08.' }
      ]
    },
    'CHM-155': {
      id: '#CHM-155', title: 'Diesel — Add to PS2-Dompta',
      submittedBy: 'Fatima Moussa', site: 'PS2-Dompta', date: '13 May 2026',
      manufacturer: 'TotalEnergies', use: 'Fuel',
      hazards: ['flame','exclamation','environment'],
      hazardClass: 'H226 / H304 / H332 / H351 / H411',
      ppe: ['Safety glasses','Nitrile gloves','Hard hat','Steel-toe boots'],
      currentStage: 'Approved',
      timeline: [
        { status: 'done', stage: 'Submission', by: 'Fatima Moussa', date: '13 May, 07:01', note: '' },
        { status: 'done', stage: 'IH Review', by: 'Mariam Deby', date: '13 May, 11:30', note: 'Standard fuel — pre-approved class.' },
        { status: 'done', stage: 'OI Safety', by: 'Oumar Cheikh', date: '13 May, 14:55', note: 'Standard fuel-handling PPE applies.' },
        { status: 'done', stage: 'EMP Review', by: 'Nadia Al-Farsi', date: '14 May, 09:10', note: 'Containment plan verified.' },
        { status: 'done', stage: 'Final Approval', by: 'Site Supervisor PS2', date: '14 May, 16:00', note: 'Approved. Notify storage to update inventory.' }
      ]
    }
  };

  function openDrawer(reqId) {
    const r = MOCK_REQUESTS[reqId.replace('#', '')];
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
    const stageIcons = { Submission: 'send', 'Site Physician': 'stethoscope', 'IH Review': 'flask', 'OI Safety': 'shield-check', 'EMP Review': 'leaf', 'Final Approval': 'check-circle' };
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

    drawer.classList.add('open');
    backdrop.classList.add('open');
  }

  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawer-backdrop').classList.remove('open');
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

  /* ============== HAZARD PICKER (form) ============== */
  function renderHazardPicker(container) {
    if (!container) return;
    const list = ['flame','skull','exclamation','health','cylinder','oxidizer','corrosion','environment','bomb'];
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
    const ppeMap = {
      flame:       ['Antistatic clothing','No ignition source'],
      skull:       ['Full face shield','SCBA','Chemical-resistant suit'],
      exclamation: ['Safety glasses','Nitrile gloves'],
      health:      ['Respirator','Medical surveillance'],
      cylinder:    ['Hard hat','Steel-toe boots','Cylinder cart'],
      oxidizer:    ['Face shield','Apron','No combustible nearby'],
      corrosion:   ['Acid-resistant gloves','Splash goggles','Apron'],
      environment: ['Containment tray','Spill kit'],
      bomb:        ['Blast shield','Remote handling','SCBA']
    };
    const set = new Set();
    sel.forEach(h => (ppeMap[h] || []).forEach(p => set.add(p)));
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

  /* ============== INIT ============== */
  function init() {
    hydrateSparklines();
    hydrateRings();
    renderSiteMap(document.getElementById('site-map'));
    renderHazardPicker(document.getElementById('hazard-picker'));
    bindMsFilters();

    // Master Sheet renders ~100 GHS pictograms — defer until visit
    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      reg('master-sheet', () => renderInventory(document.getElementById('ms-inventory')));
    } else {
      // fallback: render immediately
      renderInventory(document.getElementById('ms-inventory'));
    }

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

  window.TPCv2 = { init, openDrawer, closeDrawer, sparkline, ring };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
