/* TPC SolutionHub — Daily Expense module logic */
(function () {

  function fmtAmt(amount) {
    return Math.round(amount).toLocaleString('fr-FR').replace(/\u202F|\s/g, '\u00A0');
  }

  /* ============== MOCK DATA ============== */
  const CAT_META = {
    meals:     { icon: 'receipt', label: 'Meals' },
    transport: { icon: 'send', label: 'Transport' },
    fuel:      { icon: 'flask', label: 'Fuel' },
    lodging:   { icon: 'building', label: 'Lodging' },
    comms:     { icon: 'send', label: 'Comms' },
    supplies:  { icon: 'archive', label: 'Supplies' },
    other:     { icon: 'more', label: 'Other' }
  };

  const EXPENSES = [
    { id: 'EX-2026-0541', title: 'Lunch — site supervisor meeting',          cat: 'meals',     date: '14 May 2026', site: 'Douala',     project: 'PRJ-HSE-04', amount: 35000,  status: 'submitted' },
    { id: 'EX-2026-0540', title: 'Taxi — airport ↔ HQ',                       cat: 'transport', date: '14 May 2026', site: 'Douala',     project: 'PRJ-INF-22', amount: 18000,  status: 'submitted' },
    { id: 'EX-2026-0539', title: 'Fuel — TPC vehicle T-08 (Belabo run)',     cat: 'fuel',      date: '14 May 2026', site: 'PS3-Belabo', project: 'PRJ-INF-22', amount: 124000, status: 'submitted' },
    { id: 'EX-2026-0537', title: 'Hôtel Logone — 2 nights',                   cat: 'lodging',   date: '13 May 2026', site: 'PS3-Belabo', project: 'PRJ-INF-22', amount: 180000, status: 'approved' },
    { id: 'EX-2026-0535', title: 'Per diem — Site team (3 pax)',              cat: 'meals',     date: '13 May 2026', site: 'PS3-Belabo', project: 'PRJ-INF-22', amount: 72000,  status: 'approved' },
    { id: 'EX-2026-0533', title: 'Replacement gaskets — local supplier',      cat: 'supplies',  date: '12 May 2026', site: 'PS3-Belabo', project: 'PRJ-INF-22', amount: 48000,  status: 'reimbursed' },
    { id: 'EX-2026-0532', title: 'Local SIM card top-up',                     cat: 'comms',     date: '12 May 2026', site: 'PS3-Belabo', project: 'PRJ-INF-22', amount: 12000,  status: 'reimbursed' },
    { id: 'EX-2026-0530', title: 'Diesel — generator backup',                 cat: 'fuel',      date: '10 May 2026', site: 'PS2-Dompta', project: 'PRJ-OPS-08', amount: 95000,  status: 'reimbursed' },
    { id: 'EX-2026-0528', title: 'Hardware store — pipe clamps',              cat: 'supplies',  date: '09 May 2026', site: 'PS2-Dompta', project: 'PRJ-OPS-08', amount: 28000,  status: 'reimbursed' },
    { id: 'EX-2026-0527', title: 'Driver allowance',                          cat: 'transport', date: '09 May 2026', site: 'PS2-Dompta', project: 'PRJ-OPS-08', amount: 15000,  status: 'reimbursed' },
    { id: 'EX-2026-0525', title: 'Coffee shop — vendor meeting',              cat: 'meals',     date: '08 May 2026', site: 'Douala',     project: 'PRJ-PRC-09', amount: 8500,   status: 'rejected' },
    { id: 'EX-2026-0524', title: 'Office supplies — printer ink',             cat: 'supplies',  date: '07 May 2026', site: 'Douala',     project: 'PRJ-HSE-04', amount: 32000,  status: 'reimbursed' },
    { id: 'EX-2026-0521', title: 'Phone bill — May 2026',                     cat: 'comms',     date: '05 May 2026', site: 'Douala',     project: 'PRJ-HSE-04', amount: 22000,  status: 'reimbursed' }
  ];

  /* ============== MONTH CHART ============== */
  // Aggregate the last 14 days by day x category
  function renderMonthChart(root) {
    if (!root) return;
    const bars = root.querySelector('.month-bars');
    const axis = root.querySelector('.month-axis');
    const legend = root.querySelector('.month-legend');
    if (!bars) return;

    // Build 14 days ending 15 May
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(2026, 4, 15 - i);
      days.push({ date: d, dayNum: d.getDate(), label: d.getDate() });
    }

    // Random-ish data per day per category (deterministic, looks realistic)
    const cats = ['meals','transport','fuel','lodging','comms','supplies'];
    const seedData = [
      [12,8,0,0,4,0],   // d1
      [8,12,55,0,0,8],
      [15,10,0,0,5,0],
      [22,18,80,40,8,15],
      [10,12,0,0,4,0],
      [8,15,0,0,0,12],
      [25,10,120,40,4,0],
      [12,0,0,0,0,0],
      [8,18,95,0,12,28],
      [10,15,0,0,4,8],
      [20,12,0,40,4,28],
      [25,8,124,90,12,48],
      [18,3,0,40,0,0],
      [35,18,0,0,0,0]   // d14
    ];

    let maxTotal = 0;
    seedData.forEach(row => {
      const sum = row.reduce((a, b) => a + b, 0);
      if (sum > maxTotal) maxTotal = sum;
    });
    maxTotal *= 1000; // convert to FCFA scale
    if (maxTotal < 1) maxTotal = 1;

    bars.innerHTML = days.map((d, i) => {
      const row = seedData[i];
      const stacks = cats.map((c, j) => {
        const val = row[j] * 1000;
        if (val === 0) return '';
        const h = (val / maxTotal) * 100;
        return `<div class="stack ${c}" style="height:${h}%" title="${c} · ${fmtAmt(val)} FCFA"></div>`;
      }).join('');
      return `<div class="month-bar" title="${d.dayNum} May">${stacks}</div>`;
    }).join('');

    if (axis) {
      axis.innerHTML = days.map((d, i) => i % 2 === 0 ? `<span>${d.dayNum}</span>` : `<span></span>`).join('');
    }

    if (legend) {
      const totals = {};
      cats.forEach((c, j) => {
        totals[c] = seedData.reduce((s, row) => s + row[j], 0) * 1000;
      });
      legend.innerHTML = cats.map(c => `
        <span class="month-legend-item">
          <span class="cat-dot ${c}"></span>${CAT_META[c].label}<span class="amt">${fmtAmt(totals[c])}</span><span style="color:var(--text-4);font-size:10px;margin-left:2px">FCFA</span>
        </span>
      `).join('');
    }
  }

  /* ============== EXPENSE LIST ============== */
  function renderExpenses(container, filter) {
    if (!container) return;
    let list = EXPENSES;
    if (filter && filter !== 'all') list = EXPENSES.filter(e => e.status === filter);
    container.innerHTML = list.map(e => {
      const meta = CAT_META[e.cat] || CAT_META.other;
      return `<div class="expense-row" data-exp="${e.id}">
        <div class="ex-icon ${e.cat}" data-icon="${meta.icon}"></div>
        <div class="ex-info">
          <div class="ex-title">${e.title}</div>
          <div class="ex-sub">${e.id} · ${e.site} · ${e.project}</div>
        </div>
        <span class="cat-chip cat-${e.cat}"><span class="cat-dot ${e.cat}"></span>${meta.label}</span>
        <span class="ex-date">${e.date}</span>
        <span class="ex-amt">${fmtAmt(e.amount)}<span class="ccy">FCFA</span></span>
        <span class="ex-status ${e.status}">${e.status}</span>
      </div>`;
    }).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(container);
  }

  /* ============== REIMBURSE STRIP ============== */
  function renderReimbStrip() {
    const submitted = EXPENSES.filter(e => e.status === 'submitted').reduce((s,e) => s+e.amount, 0);
    const approved  = EXPENSES.filter(e => e.status === 'approved').reduce((s,e) => s+e.amount, 0);
    const reimbursed = EXPENSES.filter(e => e.status === 'reimbursed').reduce((s,e) => s+e.amount, 0);
    const total = submitted + approved + reimbursed;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('ex-submitted',  fmtAmt(submitted));
    set('ex-approved',   fmtAmt(approved));
    set('ex-reimbursed', fmtAmt(reimbursed));
    set('ex-total',      fmtAmt(total));
    set('ex-count',      EXPENSES.length);
  }

  /* ============== FORM BINDINGS ============== */
  function bindExpenseForm() {
    document.querySelectorAll('.cat-tile').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.cat-tile').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    const amountInput = document.getElementById('exp-amount');
    if (amountInput) {
      amountInput.addEventListener('input', () => {
        const digits = amountInput.value.replace(/\D/g, '');
        amountInput.value = digits ? parseInt(digits).toLocaleString('fr-FR').replace(/\u202F|\s/g, ' ') : '';
      });
    }
    document.getElementById('exp-submit')?.addEventListener('click', () => {
      if (window.TPC && window.TPC.toast) window.TPC.toast('✓ Expense submitted for approval');
      setTimeout(() => window.TPC && window.TPC.goPage && window.TPC.goPage('expense'), 1100);
    });
  }

  /* ============== INIT ============== */
  function init() {
    // Reimburse strip uses inline aggregations — cheap
    renderReimbStrip();
    bindExpenseForm();

    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      reg('expense', () => {
        renderMonthChart(document.getElementById('month-chart'));
        renderExpenses(document.getElementById('my-expenses-list'), 'all');
      });
    } else {
      renderMonthChart(document.getElementById('month-chart'));
      renderExpenses(document.getElementById('my-expenses-list'), 'all');
    }

    document.querySelectorAll('[data-exp-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.parentElement.querySelectorAll('.ms-chip-filter').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderExpenses(document.getElementById('my-expenses-list'), chip.getAttribute('data-exp-filter'));
      });
    });
  }

  window.TPCExpense = { init, renderExpenses, fmtAmt };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
