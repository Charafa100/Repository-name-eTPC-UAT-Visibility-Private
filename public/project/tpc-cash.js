/* TPC — Cash Advance module logic */

(function () {

  // Format XAF amount with non-breaking spaces, French style
  function fmtXAF(amount) {
    const n = Math.round(amount);
    return n.toLocaleString('fr-FR').replace(/\u202F|\s/g, '\u00A0') + '\u00A0FCFA';
  }
  function fmtAmt(amount) {
    return Math.round(amount).toLocaleString('fr-FR').replace(/\u202F|\s/g, '\u00A0');
  }

  /* ============== MOCK DATA ============== */
  const ADVANCES = [
    {
      id: 'CA-2026-0142',
      title: 'Mission PS3-Belabo — Pump maintenance',
      requester: 'Cherif Hassan',
      amount: 1850000,
      type: 'Mission',
      site: 'PS3-Belabo',
      project: 'PRJ-INF-22',
      requested: '14 May 2026',
      reconcileBy: '28 May 2026',
      status: 'disbursed',
      stage: 4,
      method: 'mobile-airtel',
      days: 9,
      daily: 205555,
      breakdown: { perdiem: 1170000, fuel: 320000, lodging: 180000, sundry: 180000 }
    },
    {
      id: 'CA-2026-0140',
      title: 'Per diem — HSE Audit Douala',
      requester: 'Mariam Deby',
      amount: 540000,
      type: 'Per diem',
      site: 'Douala',
      project: 'PRJ-HSE-04',
      requested: '13 May 2026',
      reconcileBy: '20 May 2026',
      status: 'approved',
      stage: 2,
      method: 'bank',
      days: 4
    },
    {
      id: 'CA-2026-0138',
      title: 'Emergency repair float — FSO',
      requester: 'Oumar Cheikh',
      amount: 2400000,
      type: 'Emergency',
      site: 'FSO',
      project: 'PRJ-OPS-11',
      requested: '11 May 2026',
      reconcileBy: '18 May 2026',
      status: 'overdue',
      stage: 4,
      method: 'cash',
      days: 5
    },
    {
      id: 'CA-2026-0135',
      title: 'Mission PS2-Dompta — Quarterly inspection',
      requester: 'Ahmed Mahamat',
      amount: 1200000,
      type: 'Mission',
      site: 'PS2-Dompta',
      project: 'PRJ-INS-Q2',
      requested: '08 May 2026',
      reconcileBy: '22 May 2026',
      status: 'reconciling',
      stage: 5,
      method: 'mobile-orange',
      days: 6
    },
    {
      id: 'CA-2026-0132',
      title: 'Procurement float — Local supplies PRS-Kribi',
      requester: 'Fatima Moussa',
      amount: 680000,
      type: 'Project',
      site: 'PRS-Kribi',
      project: 'PRJ-PRC-09',
      requested: '05 May 2026',
      reconcileBy: '19 May 2026',
      status: 'reconciled',
      stage: 5,
      method: 'bank',
      days: 14
    },
    {
      id: 'CA-2026-0128',
      title: 'Fuel advance — Generator backup PS2',
      requester: 'Ibrahim Saleh',
      amount: 420000,
      type: 'Fuel',
      site: 'PS2-Dompta',
      project: 'PRJ-OPS-08',
      requested: '02 May 2026',
      reconcileBy: '16 May 2026',
      status: 'requested',
      stage: 1,
      method: 'mobile-airtel',
      days: 1
    }
  ];

  const STATUS_LABELS = {
    requested:    'Requested',
    approved:     'Approved',
    disbursed:    'Disbursed',
    reconciling:  'Reconciling',
    reconciled:   'Reconciled',
    overdue:      'Overdue',
    rejected:     'Rejected'
  };

  const METHOD_LABELS = {
    bank:           { name: 'Bank transfer', sub: 'BCC · CBT · Ecobank', icon: 'database' },
    'mobile-airtel': { name: 'Airtel Money',  sub: 'Mobile · Instant',   icon: 'send' },
    'mobile-orange': { name: 'Orange Money',  sub: 'Mobile · Instant',   icon: 'send' },
    cash:           { name: 'Cash counter',   sub: 'Treasury · Douala',  icon: 'wallet' }
  };

  /* ============== RENDER ADVANCE CARDS ============== */
  function renderAdvances(container, filter) {
    if (!container) return;
    let list = ADVANCES;
    if (filter && filter !== 'all') {
      if (filter === 'active') list = ADVANCES.filter(a => ['requested','approved','disbursed','reconciling','overdue'].includes(a.status));
      else list = ADVANCES.filter(a => a.status === filter);
    }
    container.innerHTML = list.map(a => {
      const m = METHOD_LABELS[a.method] || {};
      const cycleSteps = [1,2,3,4,5].map(i => {
        let cls = 'step';
        if (i <= a.stage) {
          if (a.status === 'overdue') cls += i === a.stage ? ' danger' : ' on';
          else if (a.status === 'rejected') cls += i === a.stage ? ' danger' : ' on';
          else cls += ' on';
        }
        return `<span class="${cls}"></span>`;
      }).join('');
      const stepLabels = ['Req','Mgr','Fin','Disb','Recon'];
      const labels = stepLabels.map((l, i) => {
        const active = i + 1 === a.stage;
        return `<span class="step-label ${active ? 'active' : ''}">${l}</span>`;
      }).join('<span style="color:var(--text-4)">·</span>');

      return `<button class="adv-card" data-cash="${a.id}">
        <div class="adv-card-head">
          <div>
            <div class="adv-card-id">${a.id}</div>
            <div class="adv-card-title">${a.title}</div>
          </div>
          <div class="adv-card-amt">
            ${fmtAmt(a.amount)}
            <span class="ccy">FCFA</span>
          </div>
        </div>
        <div class="adv-card-meta">
          <span class="item"><span data-icon="user"></span>${a.requester}</span>
          <span class="item"><span data-icon="map-pin"></span>${a.site}</span>
          <span class="item"><span data-icon="calendar"></span>Reconcile by ${a.reconcileBy}</span>
        </div>
        <div class="cycle-row">
          ${labels}
        </div>
        <div class="cycle-bar">${cycleSteps}</div>
        <div class="adv-card-foot">
          <span class="cycle-pill ${a.status}">${STATUS_LABELS[a.status]}</span>
          <span style="font-size:12px;color:var(--text-3);display:inline-flex;align-items:center;gap:4px">
            <span data-icon="${m.icon}"></span>${m.name}
          </span>
        </div>
      </button>`;
    }).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(container);
  }

  /* ============== KPI ============== */
  function renderCashKpis() {
    const total_outstanding = ADVANCES.filter(a => ['approved','disbursed','reconciling','overdue'].includes(a.status))
                                       .reduce((s,a) => s + a.amount, 0);
    const total_overdue = ADVANCES.filter(a => a.status === 'overdue').reduce((s,a) => s + a.amount, 0);
    const total_month   = ADVANCES.reduce((s,a) => s + a.amount, 0);
    const recon_pct = Math.round((ADVANCES.filter(a => a.status === 'reconciled').length / ADVANCES.length) * 100);

    const setText = (id, t) => { const el = document.getElementById(id); if (el) el.innerHTML = t; };
    setText('cash-outstanding', fmtAmt(total_outstanding));
    setText('cash-overdue',     fmtAmt(total_overdue));
    setText('cash-month',       fmtAmt(total_month));
    setText('cash-recon-pct',   recon_pct);
  }

  /* ============== FORM INTERACTIONS ============== */
  function bindCashForm() {
    // Purpose picker
    document.querySelectorAll('.purpose-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.purpose-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        recomputeBreakdown();
      });
    });
    // Method picker
    document.querySelectorAll('.method-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.method-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    // Amount presets
    document.querySelectorAll('.amount-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.getAttribute('data-amt');
        const input = document.getElementById('cash-amount');
        if (input) {
          input.value = parseInt(v).toLocaleString('fr-FR').replace(/\u202F|\s/g, ' ');
          recomputeBreakdown();
        }
      });
    });
    // Amount formatting on input
    const amountInput = document.getElementById('cash-amount');
    if (amountInput) {
      amountInput.addEventListener('input', () => {
        const digits = amountInput.value.replace(/\D/g, '');
        if (digits) {
          amountInput.value = parseInt(digits).toLocaleString('fr-FR').replace(/\u202F|\s/g, ' ');
        } else {
          amountInput.value = '';
        }
        recomputeBreakdown();
      });
    }
    // Days input
    const daysInput = document.getElementById('cash-days');
    if (daysInput) {
      daysInput.addEventListener('input', recomputeBreakdown);
    }
    recomputeBreakdown();

    // Submit
    document.getElementById('cash-form-submit')?.addEventListener('click', () => {
      if (window.TPC && window.TPC.toast) {
        window.TPC.toast('✓ Cash advance request submitted — routing to your line manager');
      }
      setTimeout(() => window.TPC && window.TPC.goPage && window.TPC.goPage('cash'), 1200);
    });
  }

  function recomputeBreakdown() {
    const amtRaw = (document.getElementById('cash-amount') || {}).value || '0';
    const total = parseInt(amtRaw.replace(/\D/g, ''), 10) || 0;
    const days = parseInt((document.getElementById('cash-days') || {}).value, 10) || 0;
    const daily = days > 0 ? Math.round(total / days) : 0;

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('bk-total', fmtXAF(total));
    set('bk-days', days || '—');
    set('bk-daily', daily > 0 ? fmtXAF(daily) : '—');
  }

  /* ============== RECONCILIATION ============== */
  function bindReconciliation() {
    const list = document.getElementById('receipt-list');
    if (!list) return;
    list.addEventListener('input', recomputeReceipts);
    list.addEventListener('change', recomputeReceipts);
    document.getElementById('receipt-add')?.addEventListener('click', () => {
      addReceiptRow();
      recomputeReceipts();
    });
    document.querySelectorAll('#receipt-list .rm').forEach(b => b.addEventListener('click', e => {
      e.target.closest('.receipt-row').remove();
      recomputeReceipts();
    }));
    recomputeReceipts();
  }

  function addReceiptRow(desc, cat, amt) {
    const list = document.getElementById('receipt-list');
    if (!list) return;
    const row = document.createElement('div');
    row.className = 'receipt-row';
    row.innerHTML = `
      <span class="icon" data-icon="paperclip"></span>
      <input type="text" class="desc" placeholder="Receipt description" value="${desc || ''}">
      <select class="cat">
        <option ${cat==='fuel'?'selected':''}>Fuel</option>
        <option ${cat==='lodging'?'selected':''}>Lodging</option>
        <option ${cat==='meals'?'selected':''}>Meals / per diem</option>
        <option ${cat==='transport'?'selected':''}>Transport</option>
        <option ${cat==='supplies'?'selected':''}>Supplies</option>
        <option ${cat==='other'?'selected':''}>Other</option>
      </select>
      <span class="amt-cell">
        <input type="text" class="receipt-amt" placeholder="0" value="${amt ? fmtAmt(amt) : ''}">
        <span class="tag">FCFA</span>
      </span>
      <button class="rm" data-icon="trash"></button>
    `;
    list.appendChild(row);
    row.querySelector('.rm').addEventListener('click', () => { row.remove(); recomputeReceipts(); });
    row.querySelector('.receipt-amt').addEventListener('input', e => {
      const digits = e.target.value.replace(/\D/g, '');
      e.target.value = digits ? parseInt(digits).toLocaleString('fr-FR').replace(/\u202F|\s/g, ' ') : '';
      recomputeReceipts();
    });
    if (window.TPCIconHydrate) window.TPCIconHydrate(row);
  }

  function recomputeReceipts() {
    const rows = document.querySelectorAll('#receipt-list .receipt-row');
    let total = 0;
    rows.forEach(r => {
      const v = r.querySelector('.receipt-amt')?.value || '';
      total += parseInt(v.replace(/\D/g, ''), 10) || 0;
    });
    const advance = 1850000; // PS3-Belabo mission demo
    const delta = advance - total;
    const set = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
    set('rec-advance', fmtAmt(advance));
    set('rec-receipts', fmtAmt(total));
    set('rec-delta', fmtAmt(Math.abs(delta)));
    const deltaCell = document.getElementById('rec-delta-cell');
    if (deltaCell) {
      deltaCell.className = 'cell ' + (delta > 0 ? 'deficit' : delta < 0 ? 'surplus' : '');
      const deltaLbl = deltaCell.querySelector('.l');
      if (deltaLbl) deltaLbl.textContent = delta > 0 ? 'To repay (deficit)' : delta < 0 ? 'Surplus (refund TPC)' : 'Settled';
    }
  }

  /* ============== INIT ============== */
  function init() {
    renderAdvances(document.getElementById('cash-advances-list'), 'all');
    renderCashKpis();

    // Defer "My advances" + reconciliation rendering until visit
    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      reg('my-advances', () => {
        renderAdvances(document.getElementById('my-advances-list'), 'all');
      });
      reg('reconciliation', () => {
        if (document.getElementById('receipt-list') && document.getElementById('receipt-list').children.length === 0) {
          [
            { d: 'Fuel — Total Douala-Belabo', c: 'fuel', a: 120000 },
            { d: 'Lodging — Hôtel Logone', c: 'lodging', a: 180000 },
            { d: 'Per diem — Day 1-3', c: 'meals', a: 360000 },
            { d: 'Local transport — Site shuttle', c: 'transport', a: 95000 }
          ].forEach(r => addReceiptRow(r.d, r.c, r.a));
          recomputeReceipts();
        }
      });
      reg('new-cash', () => bindCashForm());
    } else {
      renderAdvances(document.getElementById('my-advances-list'), 'all');
      bindCashForm();
    }
    bindReconciliation();

    // Filter chips on My Advances page
    document.querySelectorAll('[data-adv-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.parentElement.querySelectorAll('.ms-chip-filter').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.getAttribute('data-adv-filter');
        renderAdvances(document.getElementById('my-advances-list'), f);
      });
    });
  }

  window.TPCCash = { init, renderAdvances, fmtXAF, fmtAmt };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
