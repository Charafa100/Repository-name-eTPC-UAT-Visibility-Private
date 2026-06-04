/* TPC v3 — Command palette, activity stream, approval flow */

(function () {

  /* ============== COMMAND PALETTE ============== */
  const CMD_ITEMS = [
    { group: 'Navigate', icon: 'layout-grid', label: 'Dashboard', sub: 'Overview', go: 'dashboard', kbd: 'G D' },
    { group: 'Navigate', icon: 'flask', label: 'Safety Data Management', sub: 'Chemical hub', go: 'chemical', kbd: 'G S' },
    { group: 'Navigate', icon: 'database', label: 'Master Sheet', sub: 'Full inventory', go: 'master-sheet', kbd: 'G M' },
    { group: 'Navigate', icon: 'wallet', label: 'Cash Advance', sub: 'Treasury · disbursement', go: 'cash', kbd: 'G C' },
    { group: 'Navigate', icon: 'list', label: 'My advances', sub: 'Cash advance history', go: 'my-advances' },
    { group: 'Navigate', icon: 'receipt', label: 'Daily Expense', sub: 'Reimbursement claims', go: 'expense', kbd: 'G E' },
    { group: 'Navigate', icon: 'shield-check', label: 'Security Escort', sub: 'E85 · Convoy planning', go: 'escort', kbd: 'G X' },
    { group: 'Navigate', icon: 'inbox', label: 'My Requests', sub: '', go: 'requests', kbd: 'G R' },
    { group: 'Navigate', icon: 'check-square', label: 'Approvals', sub: '2 pending', go: 'approvals', kbd: 'G A' },
    { group: 'Navigate', icon: 'users', label: 'Users', sub: '', go: 'users' },
    { group: 'Navigate', icon: 'settings', label: 'Settings', sub: '', go: 'settings' },
    { group: 'Actions', icon: 'plus', label: 'New chemical request', sub: 'Start a new HSE request', go: 'new-chemical', kbd: 'N' },
    { group: 'Actions', icon: 'plus', label: 'New cash advance', sub: 'Request funds for mission / project', go: 'new-cash', kbd: 'N C' },
    { group: 'Actions', icon: 'plus', label: 'New expense', sub: 'Daily expense reimbursement', go: 'new-expense', kbd: 'N E' },
    { group: 'Actions', icon: 'plus', label: 'Request security escort', sub: 'Convoy between TPC sites', go: 'new-escort', kbd: 'N X' },
    { group: 'Actions', icon: 'check-square', label: 'Reconcile advance', sub: 'Submit receipts', go: 'reconciliation' },
    { group: 'Actions', icon: 'download', label: 'Export Master Sheet (CSV)', sub: '' },
    { group: 'Actions', icon: 'sun', label: 'Toggle theme', sub: 'Light / Dark', action: 'theme' },
    { group: 'Actions', icon: 'globe', label: 'Toggle language', sub: 'EN ⇄ FR', action: 'lang' },
    { group: 'Requests', icon: 'flask', label: 'Acetone — #CHM-156', sub: 'SHE Review · Douala', req: 'CHM-156' },
    { group: 'Requests', icon: 'flask', label: 'Methanol — #CHM-154', sub: 'IH Review · PS3-Belabo', req: 'CHM-154' },
    { group: 'Requests', icon: 'flask', label: 'Diesel — #CHM-155', sub: 'Review Complete · PS2-Dompta', req: 'CHM-155' },
    { group: 'Cash', icon: 'wallet', label: 'Mission PS3-Belabo — #CA-2026-0142', sub: '1 850 000 FCFA · Disbursed', go: 'my-advances' },
    { group: 'Cash', icon: 'alert-triangle', label: 'Emergency FSO — #CA-2026-0138 · OVERDUE', sub: '2 400 000 FCFA · Reconcile now', go: 'reconciliation' },
    { group: 'People', icon: 'user', label: 'Mariam Deby', sub: 'HSE Reviewer · Douala' },
    { group: 'People', icon: 'user', label: 'Hassan Ibrahim', sub: 'IH Reviewer' },
    { group: 'People', icon: 'user', label: 'Oumar Cheikh', sub: 'Safety Review · PS2-Dompta' }
  ];

  let cmdkOpen = false;
  let cmdkSelected = 0;
  let cmdkFiltered = CMD_ITEMS;

  function renderCmdk() {
    const root = document.querySelector('.cmdk-results');
    if (!root) return;
    const groups = {};
    cmdkFiltered.forEach(it => {
      groups[it.group] = groups[it.group] || [];
      groups[it.group].push(it);
    });
    let html = '';
    let globalIdx = 0;
    Object.keys(groups).forEach(gname => {
      html += `<div class="cmdk-group-title">${gname}</div>`;
      groups[gname].forEach(it => {
        const sel = globalIdx === cmdkSelected ? 'selected' : '';
        html += `<div class="cmdk-item ${sel}" data-idx="${globalIdx}">
          <span class="cmdk-icon" data-icon="${it.icon}"></span>
          <span class="cmdk-item-text">${it.label}${it.sub ? `<span class="cmdk-sub">${it.sub}</span>` : ''}</span>
          ${it.kbd ? `<span class="cmdk-kbd">${it.kbd}</span>` : ''}
        </div>`;
        globalIdx++;
      });
    });
    if (cmdkFiltered.length === 0) {
      html = `<div style="padding:32px;text-align:center;color:var(--text-4);font-size:13px">No results</div>`;
    }
    root.innerHTML = html;
    if (window.TPCIconHydrate) window.TPCIconHydrate(root);
    root.querySelectorAll('.cmdk-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'));
        runCmdk(cmdkFiltered[idx]);
      });
    });
  }

  function runCmdk(item) {
    if (!item) return;
    closeCmdk();
    if (item.go) {
      if (window.TPC && window.TPC.goPage) window.TPC.goPage(item.go);
    } else if (item.req && window.TPCv2) {
      window.TPCv2.openDrawer(item.req);
    } else if (item.action === 'theme') {
      document.getElementById('theme-btn')?.click();
    } else if (item.action === 'lang') {
      document.getElementById('lang-btn')?.click();
    }
  }

  function openCmdk() {
    const back = document.getElementById('cmdk-backdrop');
    if (!back) return;
    back.classList.add('open');
    cmdkOpen = true;
    cmdkSelected = 0;
    cmdkFiltered = CMD_ITEMS;
    const input = document.getElementById('cmdk-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 30);
    }
    renderCmdk();
  }
  function closeCmdk() {
    document.getElementById('cmdk-backdrop')?.classList.remove('open');
    cmdkOpen = false;
  }

  function filterCmdk(q) {
    q = q.toLowerCase().trim();
    if (!q) {
      cmdkFiltered = CMD_ITEMS;
    } else {
      cmdkFiltered = CMD_ITEMS.filter(it =>
        (it.label + ' ' + (it.sub || '') + ' ' + it.group).toLowerCase().includes(q)
      );
    }
    cmdkSelected = 0;
    renderCmdk();
  }

  /* ============== ACTIVITY STREAM ============== */
  const ACTIVITY = [
    { type: 'approved', icon: 'check-circle', cls: 'success', text: '<strong>Mariam Deby</strong> approved <span class="mono">#CHM-155</span> at <strong>EMP Review</strong>', meta: 'Diesel · PS2-Dompta', time: '2m ago' },
    { type: 'cash',     icon: 'wallet',       cls: 'accent',  text: '<strong>Cherif Hassan</strong> requested <span class="mono">#CA-2026-0142</span> — 1 850 000 FCFA', meta: 'Mission PS3-Belabo · Pump maintenance', time: '8m ago' },
    { type: 'escort',   icon: 'shield-check', cls: 'danger',  text: 'Convoy <span class="mono">#E85-2026-088</span> departed Douala → FSO', meta: '2 vehicles · 4 escort · Hazardous cargo Cl. 3', time: '12m ago' },
    { type: 'comment', icon: 'send', cls: 'info', text: '<strong>Hassan Ibrahim</strong> commented on <span class="mono">#CHM-156</span>', meta: '"Need clarification on quantity per shift"', time: '14m ago' },
    { type: 'sla', icon: 'alert-triangle', cls: 'danger', text: '<span class="mono">#CA-2026-0138</span> reconciliation <strong>OVERDUE</strong>', meta: 'Emergency FSO · 2 400 000 FCFA · 14d limit passed', time: '28m ago' },
    { type: 'sla', icon: 'alert-triangle', cls: 'danger', text: '<span class="mono">#CHM-154</span> breached SLA at <strong>IH Review</strong>', meta: 'Methanol · 4 days waiting', time: '32m ago' },
    { type: 'cash',    icon: 'check-circle', cls: 'success', text: '<strong>Aisha Koné</strong> approved <span class="mono">#CA-2026-0140</span> at <strong>Budget Controller</strong>', meta: 'Per diem · 540 000 FCFA · HSE Audit', time: '52m ago' },
    { type: 'submitted', icon: 'send', cls: 'accent', text: '<strong>Ahmed Mahamat</strong> submitted <span class="mono">#CHM-156</span>', meta: 'Acetone · Douala', time: '1h ago' },
    { type: 'cash-recon', icon: 'paperclip', cls: 'info', text: '<strong>Fatima Moussa</strong> reconciled <span class="mono">#CA-2026-0132</span>', meta: '680 000 FCFA · 4 receipts · 0 deficit', time: '2h ago' },
    { type: 'rejected', icon: 'x-circle', cls: 'danger', text: '<strong>Hassan Ibrahim</strong> rejected <span class="mono">#CHM-154</span>', meta: 'Methanol · "Quantity exceeds limit"', time: '3h ago' },
    { type: 'assigned', icon: 'corner-down-right', cls: 'warning', text: '<span class="mono">#CHM-152</span> routed to <strong>Nadia Al-Farsi</strong> for EMP Review', meta: 'Hydraulic Fluid ISO 46', time: '4h ago' },
    { type: 'approved', icon: 'check-circle', cls: 'success', text: '<strong>Oumar Cheikh</strong> approved <span class="mono">#CHM-150</span> at <strong>Safety Review</strong>', meta: 'Sodium Hypochlorite · PRS-Kribi', time: '5h ago' }
  ];

  function renderActivity(root) {
    if (!root) return;
    root.innerHTML = ACTIVITY.map(a => `
      <div class="activity-item">
        <span class="activity-icon ${a.cls}" data-icon="${a.icon}"></span>
        <div class="activity-body">
          <div class="activity-text">${a.text}</div>
          <div class="activity-meta">${a.meta}</div>
        </div>
        <span class="activity-time">${a.time}</span>
      </div>
    `).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(root);
  }

  /* ============== APPROVAL FLOW (Hub — cross-solution) ============== */
  const HUB_SOLUTIONS = {
    safety:  { name: 'Safety Data',     cls: 'safety',  icon: 'flask',      color: '#C0392B' },
    cash:    { name: 'Cash Advance',    cls: 'cash',    icon: 'wallet',     color: '#F0C040' },
    expense: { name: 'Daily Expense',   cls: 'expense', icon: 'receipt',    color: '#1F6FCC' },
    escort:  { name: 'Security Escort', cls: 'escort',  icon: 'shield-check', color: '#1F7C3B' }
  };

  // 4 universal phases for the aggregate header
  const HUB_PHASES = [
    { id: 'drafted',  name: 'Drafted',           total: 8,  byS: { safety: 4, cash: 2, expense: 1, escort: 1 } },
    { id: 'review',   name: 'Pending review',    total: 15, byS: { safety: 9, cash: 3, expense: 2, escort: 1 }, btl: true },
    { id: 'approval', name: 'Awaiting approval', total: 8,  byS: { safety: 4, cash: 2, expense: 1, escort: 1 } },
    { id: 'final',    name: 'Final / done',      total: 3,  byS: { safety: 3, cash: 0, expense: 0, escort: 0 } }
  ];

  // Each solution's real internal pipeline
  const HUB_LANES = [
    {
      key: 'safety',
      total: 34,
      meta: 'Bottleneck · IH Review',
      stages: [
        { n: 'Submit',    v: 4 },
        { n: 'Physician', v: 6 },
        { n: 'IH',        v: 9, btl: true },
        { n: 'OI',        v: 7 },
        { n: 'EMP',       v: 5 },
        { n: 'Final',     v: 3 }
      ]
    },
    {
      key: 'cash',
      total: 12,
      meta: 'Bottleneck · Budget Control',
      stages: [
        { n: 'Submit',   v: 2 },
        { n: 'Line mgr', v: 4 },
        { n: 'Budget',   v: 5, btl: true },
        { n: 'Disburse', v: 1 }
      ]
    },
    {
      key: 'expense',
      total: 4,
      meta: 'Healthy',
      stages: [
        { n: 'Submit',   v: 1 },
        { n: 'Line mgr', v: 2 },
        { n: 'Refund',   v: 1 }
      ]
    },
    {
      key: 'escort',
      total: 4,
      meta: 'Bottleneck · Risk Review',
      stages: [
        { n: 'Submit',   v: 1 },
        { n: 'Risk',     v: 1, btl: true },
        { n: 'Ops',      v: 1 },
        { n: 'Dispatch', v: 1 }
      ]
    }
  ];

  function renderApprovalFlow(root) {
    if (!root) return;
    const stages = root.querySelector('.flow-stages');
    if (!stages) return;

    // wipe strata divider — not part of the new design
    const strata = root.querySelector('.strata-divider');
    if (strata) strata.style.display = 'none';

    const totalAll = HUB_LANES.reduce((s, l) => s + l.total, 0);

    // Update card-head title + meta dynamically
    const cardTitle = root.querySelector('.card-title');
    if (cardTitle) {
      // Find the trailing text node and update it (preserve the icon span)
      const last = cardTitle.lastChild;
      if (last && last.nodeType === Node.TEXT_NODE) {
        last.textContent = ` Approval flow · ${totalAll} requests · 4 solutions`;
      }
    }
    const hint = root.querySelector('.kbd-hint');
    if (hint) hint.innerHTML = '2 bottlenecks <kbd>IH</kbd> <kbd>Budget</kbd>';

    // Build summary header (4 universal phases, stacked-bar by solution)
    const summary = HUB_PHASES.map((p) => {
      const widths = Object.entries(p.byS)
        .map(([k, v]) => ({ k, v, sol: HUB_SOLUTIONS[k] }))
        .filter((x) => x.v > 0);
      const segs = widths.map((w) => {
        const pct = p.total ? (w.v / p.total) * 100 : 0;
        return `<span style="width:${pct}%;background:${w.sol.color}" title="${w.sol.name}: ${w.v}"></span>`;
      }).join('');
      const legend = widths.map((w) =>
        `<span><span class="hubflow-leg-dot" style="background:${w.sol.color}"></span>${w.v}</span>`
      ).join('');
      return `<div class="hubflow-phase${p.btl ? ' btl' : ''}">
        <div class="hubflow-phase-l">
          <span class="hubflow-phase-name">${p.name}</span>
          ${p.btl ? '<span class="hubflow-phase-tag">BTLNCK</span>' : ''}
        </div>
        <div class="hubflow-phase-v">${p.total}</div>
        <div class="hubflow-phase-bar">${segs}</div>
        <div class="hubflow-phase-leg">${legend}</div>
      </div>`;
    }).join('');

    // Build per-solution swimlanes — light, single-row text style
    const lanes = HUB_LANES.map((lane) => {
      const s = HUB_SOLUTIONS[lane.key];
      const stagesHtml = lane.stages.map((st) =>
        `<div class="hubflow-stage${st.btl ? ' btl' : ''}">
          <span class="hubflow-stage-v">${st.v}</span>
          <span class="hubflow-stage-n">${st.n}</span>
        </div>`
      ).join('');
      return `<div class="hubflow-lane" data-sol="${lane.key}">
        <div class="hubflow-lane-sol">
          <div class="hubflow-lane-icon ${s.cls}"><span data-icon="${s.icon}"></span></div>
          <div>
            <div class="hubflow-lane-name">${s.name}</div>
            <div class="hubflow-lane-meta">${lane.meta}</div>
          </div>
        </div>
        <div class="hubflow-stages">
          ${stagesHtml}
        </div>
        <div class="hubflow-lane-total">
          <span class="hubflow-lane-total-v">${lane.total}</span>
          <span class="hubflow-lane-total-l">In motion</span>
        </div>
      </div>`;
    }).join('');

    stages.innerHTML = `
      <div class="hubflow-summary">${summary}</div>
      <div class="hubflow-lanes">${lanes}</div>
    `;
    if (window.TPCIconHydrate) window.TPCIconHydrate(stages);
  }

  /* ============== APPROVAL STAMP INJECTION ============== */
  function maybeInjectStamp(reqId) {
    // for the drawer — show stamp if request is approved/rejected
    const stamps = {
      'CHM-155': { kind: 'approved', text: 'APPROVED', id: 'TPC · 14 MAY 2026' },
      'CHM-154': { kind: 'rejected', text: 'REJECTED', id: 'TPC · 15 MAY 2026' }
    };
    const st = stamps[reqId];
    if (!st) return null;
    return `<div class="stamp-zone">
      <div class="approval-stamp ${st.kind === 'rejected' ? 'rejected' : ''}">
        <div class="stamp-main">${st.text}</div>
        <div class="stamp-id">${st.id}</div>
      </div>
    </div>`;
  }

  // patch into v2 drawer opener
  function wrapOpenDrawer() {
    if (!window.TPCv2 || !window.TPCv2.openDrawer) return;
    const orig = window.TPCv2.openDrawer;
    window.TPCv2.openDrawer = function(reqId) {
      orig(reqId);
      setTimeout(() => {
        const drawer = document.getElementById('drawer');
        if (!drawer) return;
        // remove existing stamp if any
        drawer.querySelectorAll('.stamp-zone').forEach(e => e.remove());
        const stamp = maybeInjectStamp(reqId.replace('#',''));
        if (stamp) {
          const sec = drawer.querySelector('.drawer-section:last-child');
          // insert before comment section if exists
          const comment = drawer.querySelector('.comment-input');
          const wrap = document.createElement('div');
          wrap.className = 'drawer-section';
          wrap.innerHTML = stamp;
          if (comment && comment.parentElement) {
            comment.parentElement.parentElement.before(wrap);
          } else {
            drawer.querySelector('.drawer-body').appendChild(wrap);
          }
        }
      }, 20);
    };
  }

  /* ============== INIT ============== */
  function init() {
    // command palette
    const back = document.getElementById('cmdk-backdrop');
    if (back) {
      back.addEventListener('click', e => {
        if (e.target === back) closeCmdk();
      });
      document.getElementById('cmdk-input')?.addEventListener('input', e => filterCmdk(e.target.value));
      document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (cmdkOpen) closeCmdk(); else openCmdk();
          return;
        }
        if (cmdkOpen) {
          if (e.key === 'Escape') { e.preventDefault(); closeCmdk(); }
          else if (e.key === 'ArrowDown') { e.preventDefault(); cmdkSelected = Math.min(cmdkSelected + 1, cmdkFiltered.length - 1); renderCmdk(); }
          else if (e.key === 'ArrowUp')   { e.preventDefault(); cmdkSelected = Math.max(cmdkSelected - 1, 0); renderCmdk(); }
          else if (e.key === 'Enter')     { e.preventDefault(); runCmdk(cmdkFiltered[cmdkSelected]); }
        }
      });
    }

    // hook ⌘K button
    document.getElementById('cmdk-trigger')?.addEventListener('click', openCmdk);
    document.querySelector('.topbar-search')?.addEventListener('click', openCmdk);

    renderActivity(document.getElementById('activity-stream'));
    renderApprovalFlow(document.getElementById('approval-flow'));

    // live clock in ops strip
    const clockEl = document.getElementById('ops-clock');
    function tick() {
      if (!clockEl) return;
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      clockEl.innerHTML = `<strong>${hh}:${mm}<span style="color:#475467">:${ss}</span></strong> UTC+1`;
    }
    tick(); setInterval(tick, 1000);

    wrapOpenDrawer();
  }

  window.TPCv3 = { openCmdk, closeCmdk };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
