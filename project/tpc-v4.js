/* TPC v4 — Notifications + Unified Approvals Inbox */

(function () {

  /* ============== NOTIFICATIONS DATA ============== */
  const NOTIFS = {
    all: [
      { id: 1, cat: 'approval', icon: 'shield-check', cls: 'danger', text: 'Convoy <span class="mono">#E85-2026-088</span> needs route sign-off (HIGH risk)', meta: 'Security · 12m ago', unread: true },
      { id: 2, cat: 'approval', icon: 'flask', cls: 'warning', text: '<strong>Acetone</strong> <span class="mono">#CHM-156</span> waiting for your SHE review', meta: 'Chemical · 2h ago', unread: true },
      { id: 3, cat: 'approval', icon: 'wallet', cls: 'accent', text: 'Cash advance <span class="mono">#CA-2026-0142</span> needs Finance sign-off — 1 850 000 FCFA', meta: 'Cash · 3h ago', unread: true },
      { id: 4, cat: 'mention', icon: 'send', cls: 'info', text: '<strong>Hassan Ibrahim</strong> mentioned you in <span class="mono">#CHM-156</span>', meta: 'Comment · 14m ago', unread: true },
      { id: 5, cat: 'sla', icon: 'alert-triangle', cls: 'danger', text: '<span class="mono">#CHM-154</span> SLA breached at <strong>IH Review</strong> — 4 days', meta: 'Chemical · 32m ago', unread: true },
      { id: 6, cat: 'sla', icon: 'alert-triangle', cls: 'danger', text: '<span class="mono">#CA-2026-0138</span> reconciliation overdue — 2 400 000 FCFA', meta: 'Cash · 28m ago', unread: false },
      { id: 7, cat: 'system', icon: 'check-circle', cls: 'success', text: 'Your expense <span class="mono">#EX-2026-0539</span> was reimbursed — 124 000 FCFA', meta: 'Expense · 4h ago', unread: false },
      { id: 8, cat: 'system', icon: 'cloud', cls: 'info', text: 'Azure SQL maintenance scheduled — Sunday 22:00 UTC', meta: 'System · 1d ago', unread: false },
      { id: 9, cat: 'mention', icon: 'send', cls: 'info', text: '<strong>Aisha Koné</strong> commented on your cash advance', meta: 'Cash · 6h ago', unread: false }
    ]
  };
  NOTIFS.approval = NOTIFS.all.filter(n => n.cat === 'approval');
  NOTIFS.mention  = NOTIFS.all.filter(n => n.cat === 'mention');
  NOTIFS.sla      = NOTIFS.all.filter(n => n.cat === 'sla');
  NOTIFS.system   = NOTIFS.all.filter(n => n.cat === 'system');

  let notifTab = 'all';

  function renderNotifs() {
    const list = document.querySelector('.notif-list');
    if (!list) return;
    const items = NOTIFS[notifTab] || NOTIFS.all;
    if (items.length === 0) {
      list.innerHTML = `<div class="notif-empty"><span data-icon="check-circle"></span>All caught up.</div>`;
      if (window.TPCIconHydrate) window.TPCIconHydrate(list);
      return;
    }
    list.innerHTML = items.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" data-notif-id="${n.id}">
        <span class="n-icon ${n.cls}" data-icon="${n.icon}"></span>
        <div class="n-body">
          <div class="n-text">${n.text}</div>
          <div class="n-meta">${n.meta}</div>
        </div>
        <span class="n-time">${n.meta.split('·').pop().trim()}</span>
      </div>
    `).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(list);
  }

  function updateTabCounts() {
    const counts = {
      all: NOTIFS.all.filter(n => n.unread).length,
      approval: NOTIFS.approval.filter(n => n.unread).length,
      mention: NOTIFS.mention.filter(n => n.unread).length,
      sla: NOTIFS.sla.filter(n => n.unread).length,
      system: NOTIFS.system.filter(n => n.unread).length
    };
    Object.keys(counts).forEach(k => {
      const el = document.querySelector(`.notif-tab[data-tab="${k}"] .count`);
      if (el) {
        el.textContent = counts[k];
        el.style.display = counts[k] > 0 ? '' : 'none';
      }
    });
    // bell dot
    const dot = document.querySelector('#notif-btn .dot');
    if (dot) dot.style.display = counts.all > 0 ? '' : 'none';
  }

  function bindNotifs() {
    const bell = document.getElementById('notif-btn');
    const panel = document.getElementById('notif-panel');
    if (!bell || !panel) return;

    bell.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) renderNotifs();
    });
    document.addEventListener('click', e => {
      if (!panel.contains(e.target) && !bell.contains(e.target)) panel.classList.remove('open');
    });
    document.querySelectorAll('.notif-tab').forEach(t => {
      t.addEventListener('click', () => {
        notifTab = t.getAttribute('data-tab');
        document.querySelectorAll('.notif-tab').forEach(x => x.classList.toggle('active', x === t));
        renderNotifs();
      });
    });
    document.getElementById('notif-markread')?.addEventListener('click', () => {
      NOTIFS.all.forEach(n => n.unread = false);
      updateTabCounts();
      renderNotifs();
    });
    document.getElementById('notif-viewall')?.addEventListener('click', () => {
      panel.classList.remove('open');
      if (window.TPC && window.TPC.goPage) window.TPC.goPage('approvals');
    });
    updateTabCounts();
  }

  /* ============== UNIFIED APPROVALS INBOX ============== */
  const INBOX = [
    {
      id: 'CHM-154', module: 'chemical', icon: 'flask',
      title: 'Methanol — new chemical',
      submittedBy: 'Ibrahim Saleh', site: 'PS3-Belabo',
      stage: 'IH Review', stageSub: 'Hazard classification',
      age: '4d 6h', ageStatus: 'danger', ageNote: 'SLA breached'
    },
    {
      id: 'CA-2026-0142', module: 'cash', icon: 'wallet',
      title: 'Mission PS3-Belabo — Pump maintenance · 1 850 000 FCFA',
      submittedBy: 'Cherif Hassan', site: 'PS3-Belabo',
      stage: 'Finance Head', stageSub: 'Required >1M FCFA',
      age: '8h', ageStatus: 'warn', ageNote: 'Due tomorrow'
    },
    {
      id: 'E85-2026-085', module: 'escort', icon: 'shield-check',
      title: 'PS2-Dompta personnel rotation · 12 pax',
      submittedBy: 'Field Ops', site: 'Douala → PS2-Dompta',
      stage: 'Security Coordinator', stageSub: 'HIGH risk route',
      age: '2h', ageStatus: 'warn', ageNote: ''
    },
    {
      id: 'CHM-156', module: 'chemical', icon: 'flask',
      title: 'Acetone — new chemical',
      submittedBy: 'Ahmed Mahamat', site: 'Douala',
      stage: 'Safety Review', stageSub: 'Pending assessment',
      age: '2d 4h', ageStatus: 'warn', ageNote: ''
    },
    {
      id: 'CA-2026-0128', module: 'cash', icon: 'wallet',
      title: 'Fuel advance — Generator backup PS2 · 420 000 FCFA',
      submittedBy: 'Ibrahim Saleh', site: 'PS2-Dompta',
      stage: 'Line Manager', stageSub: 'Operational sign-off',
      age: '1h', ageStatus: 'normal', ageNote: ''
    },
    {
      id: 'EX-2026-0541', module: 'expense', icon: 'receipt',
      title: 'Lunch — site supervisor meeting · 35 000 FCFA',
      submittedBy: 'Mariam Deby', site: 'Douala',
      stage: 'Line Manager', stageSub: 'Approval',
      age: '3h', ageStatus: 'normal', ageNote: ''
    },
    {
      id: 'EX-2026-0540', module: 'expense', icon: 'receipt',
      title: 'Taxi — airport ↔ HQ · 18 000 FCFA',
      submittedBy: 'Mariam Deby', site: 'Douala',
      stage: 'Line Manager', stageSub: 'Approval',
      age: '3h', ageStatus: 'normal', ageNote: ''
    },
    {
      id: 'EX-2026-0539', module: 'expense', icon: 'receipt',
      title: 'Fuel — TPC vehicle T-08 (Belabo run) · 124 000 FCFA',
      submittedBy: 'Mariam Deby', site: 'PS3-Belabo',
      stage: 'Line Manager', stageSub: 'Approval',
      age: '4h', ageStatus: 'normal', ageNote: ''
    },
    {
      id: 'CHM-152', module: 'chemical', icon: 'flask',
      title: 'Hydraulic Fluid ISO 46 — Add to PS2-Dompta',
      submittedBy: 'Cherif Hassan', site: 'PS2-Dompta',
      stage: 'EMP Review', stageSub: 'Environmental',
      age: '6h', ageStatus: 'normal', ageNote: ''
    },
    {
      id: 'CA-2026-0140', module: 'cash', icon: 'wallet',
      title: 'Per diem — HSE Audit Douala · 540 000 FCFA',
      submittedBy: 'Mariam Deby', site: 'Douala',
      stage: 'Budget Controller', stageSub: 'PRJ-HSE-04',
      age: '1d', ageStatus: 'normal', ageNote: ''
    },
    {
      id: 'E85-2026-086', module: 'escort', icon: 'shield-check',
      title: 'PRS-Kribi resupply · 1 vehicle, 3 pax',
      submittedBy: 'Warehouse', site: 'Warehouse → PRS-Kribi',
      stage: 'Route Planner', stageSub: 'Standard risk',
      age: '1d 2h', ageStatus: 'normal', ageNote: ''
    }
  ];

  const MODULE_META = {
    chemical: { label: 'Chemical', icon: 'flask' },
    cash:     { label: 'Cash',     icon: 'wallet' },
    expense:  { label: 'Expense',  icon: 'receipt' },
    escort:   { label: 'Escort',   icon: 'shield-check' }
  };

  let inboxFilter = 'all';
  let selectedRows = new Set();

  function renderInbox() {
    const list = document.getElementById('inbox-list');
    if (!list) return;
    let items = INBOX;
    if (inboxFilter !== 'all') items = INBOX.filter(i => i.module === inboxFilter);

    list.innerHTML = items.map(i => {
      const mod = MODULE_META[i.module];
      const sel = selectedRows.has(i.id);
      const rowCls = sel ? 'selected' : (i.ageStatus === 'danger' ? 'urgent' : i.ageStatus === 'warn' ? 'warn' : '');
      return `<div class="inbox-row ${rowCls}" data-inbox-id="${i.id}" data-inbox-module="${i.module}">
        <div class="inbox-checkbox ${sel ? 'checked' : ''}" data-checkbox></div>
        <span class="module-badge ${i.module}"><span data-icon="${mod.icon}"></span>${mod.label}</span>
        <div class="inbox-item-info">
          <div class="inbox-item-title">${i.title}</div>
          <div class="inbox-item-meta">
            <span class="mono">#${i.id}</span>
            <span class="sep">·</span>
            <span>${i.submittedBy}</span>
            <span class="sep">·</span>
            <span>${i.site}</span>
          </div>
        </div>
        <div class="inbox-stage-cell">
          <div class="stage-name">${i.stage}</div>
          <div class="stage-sub">${i.stageSub}</div>
        </div>
        <div class="inbox-time-cell">
          <span class="age-pill ${i.ageStatus}">${i.age}</span>
          ${i.ageNote ? `<div class="age-sub">${i.ageNote}</div>` : ''}
        </div>
        <div class="inbox-actions">
          <button class="btn btn-sm btn-danger" data-inbox-action="reject" data-id="${i.id}"><span data-icon="x"></span></button>
          <button class="btn btn-sm btn-primary" data-inbox-action="approve" data-id="${i.id}"><span data-icon="check"></span></button>
        </div>
      </div>`;
    }).join('');

    if (window.TPCIconHydrate) window.TPCIconHydrate(list);

    // update bulk bar
    updateBulkBar();
    updateInboxCounts();
  }

  function updateInboxCounts() {
    const counts = {
      all: INBOX.length,
      chemical: INBOX.filter(i => i.module === 'chemical').length,
      cash: INBOX.filter(i => i.module === 'cash').length,
      expense: INBOX.filter(i => i.module === 'expense').length,
      escort: INBOX.filter(i => i.module === 'escort').length
    };
    Object.keys(counts).forEach(k => {
      const el = document.querySelector(`[data-inbox-filter="${k}"] .ix-count`);
      if (el) el.textContent = counts[k];
    });
  }

  function updateBulkBar() {
    const bar = document.getElementById('bulk-bar');
    if (!bar) return;
    if (selectedRows.size > 0) {
      bar.classList.add('show');
      const cnt = bar.querySelector('.bulk-count');
      if (cnt) cnt.textContent = selectedRows.size;
    } else {
      bar.classList.remove('show');
    }
    // also flash the bulk-state in toolbar
    const state = document.getElementById('inbox-bulk-state');
    if (state) {
      state.innerHTML = selectedRows.size > 0
        ? `<strong>${selectedRows.size}</strong> selected`
        : `<strong>${INBOX.length}</strong> items waiting on you`;
    }
  }

  function bindInbox() {
    document.querySelectorAll('[data-inbox-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        inboxFilter = chip.getAttribute('data-inbox-filter');
        document.querySelectorAll('[data-inbox-filter]').forEach(x => x.classList.toggle('active', x === chip));
        selectedRows.clear();
        renderInbox();
      });
    });

    document.addEventListener('click', e => {
      // checkbox toggle
      const cb = e.target.closest('[data-checkbox]');
      if (cb) {
        e.stopPropagation();
        const row = cb.closest('.inbox-row');
        const id = row.getAttribute('data-inbox-id');
        if (selectedRows.has(id)) selectedRows.delete(id);
        else selectedRows.add(id);
        cb.classList.toggle('checked');
        row.classList.toggle('selected', selectedRows.has(id));
        updateBulkBar();
        return;
      }
      // action button
      const action = e.target.closest('[data-inbox-action]');
      if (action) {
        e.stopPropagation();
        const id = action.getAttribute('data-id');
        const act = action.getAttribute('data-inbox-action');
        const row = action.closest('.inbox-row');
        if (row) {
          row.style.transition = 'opacity 0.25s, transform 0.25s';
          row.style.opacity = '0';
          row.style.transform = 'translateX(20px)';
          setTimeout(() => row.remove(), 250);
        }
        if (window.TPC && window.TPC.toast) {
          window.TPC.toast(`${act === 'approve' ? '✓ Approved' : '✕ Rejected'} — #${id}`);
        }
        return;
      }
      // row click → open drawer for chemical requests (others not yet wired)
      const row = e.target.closest('.inbox-row');
      if (row && !e.target.closest('button, input')) {
        const id = row.getAttribute('data-inbox-id');
        const mod = row.getAttribute('data-inbox-module');
        if (mod === 'chemical' && window.TPCv2 && window.TPCv2.openDrawer) {
          window.TPCv2.openDrawer(id);
        } else if (window.TPC && window.TPC.toast) {
          window.TPC.toast(`Open detail · ${MODULE_META[mod].label} · #${id}`);
        }
      }
    });

    // bulk bar buttons
    document.querySelector('#bulk-bar .b-approve')?.addEventListener('click', () => {
      const n = selectedRows.size;
      selectedRows.forEach(id => {
        const row = document.querySelector(`.inbox-row[data-inbox-id="${id}"]`);
        if (row) {
          row.style.transition = 'opacity 0.25s, transform 0.25s';
          row.style.opacity = '0';
          row.style.transform = 'translateX(20px)';
          setTimeout(() => row.remove(), 250);
        }
      });
      selectedRows.clear();
      updateBulkBar();
      if (window.TPC && window.TPC.toast) window.TPC.toast(`✓ Approved ${n} requests in bulk`);
    });
    document.querySelector('#bulk-bar .b-reject')?.addEventListener('click', () => {
      if (window.TPC && window.TPC.toast) window.TPC.toast(`✕ Rejected ${selectedRows.size} requests`);
      selectedRows.clear();
      updateBulkBar();
    });
    document.querySelector('#bulk-bar .b-clear')?.addEventListener('click', () => {
      selectedRows.clear();
      document.querySelectorAll('.inbox-row').forEach(r => r.classList.remove('selected'));
      document.querySelectorAll('.inbox-checkbox.checked').forEach(c => c.classList.remove('checked'));
      updateBulkBar();
    });
    // select all
    document.getElementById('inbox-select-all')?.addEventListener('click', () => {
      const visible = document.querySelectorAll('.inbox-row');
      if (selectedRows.size === visible.length) {
        selectedRows.clear();
      } else {
        visible.forEach(r => selectedRows.add(r.getAttribute('data-inbox-id')));
      }
      renderInbox();
    });
  }

  /* ============== INIT ============== */
  function init() {
    bindNotifs();
    bindInbox();
    renderInbox();
  }

  window.TPCv4 = { init, renderInbox, renderNotifs };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
