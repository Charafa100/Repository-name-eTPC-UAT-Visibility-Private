/* TPC SolutionHub — Security Escort module logic */
(function () {

  const SITE_COORDS = {
    'Douala':     { x: 12, y: 78 },
    'PS2-Dompta': { x: 52, y: 38 },
    'PS3-Belabo': { x: 32, y: 55 },
    'PRS-Kribi':  { x: 8,  y: 78 },
    'FSO':        { x: 4,  y: 72 },
    'Warehouse':  { x: 18, y: 64 },
    'N\'Djamena':  { x: 58, y: 18 },
    'Moundou':    { x: 30, y: 45 }
  };

  // Approximate Chad outline
  const CHAD_PATH = `M 30 8 L 55 4 L 76 10 L 86 22 L 88 36 L 80 50 L 70 58 L 65 70 L 50 78 L 42 84 L 30 80 L 20 70 L 22 56 L 18 42 L 26 24 Z`;

  const ESCORTS = [
    {
      id: 'E85-2026-088',
      title: 'Convoy — Spare parts & technicians to FSO',
      from: 'Douala', to: 'FSO', via: ['Warehouse'],
      distance: 78, duration: '2h 45min',
      departure: '15 May · 14:30', eta: '15 May · 17:15',
      risk: 5, riskLabel: 'restricted',
      vehicles: 2, team: 4, personnel: 6,
      cargo: 'Hazardous (Chemical class 3)',
      status: 'transit',
      progress: 65
    },
    {
      id: 'E85-2026-087',
      title: 'PS3-Belabo quarterly inspection convoy',
      from: 'Douala', to: 'PS3-Belabo', via: [],
      distance: 540, duration: '8h 30min',
      departure: '18 May · 05:00', eta: '18 May · 13:30',
      risk: 3, riskLabel: 'elevated',
      vehicles: 2, team: 3, personnel: 5,
      cargo: 'Standard equipment',
      status: 'assigned',
      progress: 0
    },
    {
      id: 'E85-2026-086',
      title: 'PRS-Kribi resupply',
      from: 'Warehouse', to: 'PRS-Kribi', via: [],
      distance: 110, duration: '2h 30min',
      departure: '16 May · 09:00', eta: '16 May · 11:30',
      risk: 2, riskLabel: 'standard',
      vehicles: 1, team: 2, personnel: 3,
      cargo: 'Office supplies, comms gear',
      status: 'planning',
      progress: 0
    },
    {
      id: 'E85-2026-085',
      title: 'PS2-Dompta personnel rotation',
      from: 'Douala', to: 'PS2-Dompta', via: ['Moundou'],
      distance: 620, duration: '10h 00min',
      departure: '17 May · 04:00', eta: '17 May · 14:00',
      risk: 4, riskLabel: 'high',
      vehicles: 3, team: 6, personnel: 12,
      cargo: 'Personnel rotation (12 pax)',
      status: 'requested',
      progress: 0
    },
    {
      id: 'E85-2026-084',
      title: 'N\'Djamena documents courier',
      from: 'Douala', to: "N'Djamena", via: [],
      distance: 1450, duration: '2 days',
      departure: '12 May · 06:00', eta: '14 May · 10:00',
      risk: 3, riskLabel: 'elevated',
      vehicles: 1, team: 2, personnel: 2,
      cargo: 'Legal documents, contracts',
      status: 'completed',
      progress: 100
    },
    {
      id: 'E85-2026-083',
      title: 'Douala HQ daily shuttle',
      from: 'Douala', to: 'Warehouse', via: [],
      distance: 18, duration: '35min',
      departure: '15 May · 08:00', eta: '15 May · 08:35',
      risk: 1, riskLabel: 'low',
      vehicles: 1, team: 1, personnel: 4,
      cargo: 'Staff transport',
      status: 'completed',
      progress: 100
    }
  ];

  /* ============== MINI MAP per card ============== */
  function buildMiniMap(escort) {
    const stops = [escort.from, ...escort.via, escort.to].map(s => SITE_COORDS[s]).filter(Boolean);
    if (stops.length < 2) return '';
    const path = stops.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const pins = stops.map((p, i) => {
      const last = i === stops.length - 1;
      return `<circle class="pin ${last ? 'end' : ''}" cx="${p.x}" cy="${p.y}" r="${last ? 3.5 : 2.8}"/>`;
    }).join('');
    return `<svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
      <path class="country" d="${CHAD_PATH}"/>
      <path class="route" d="${path}"/>
      ${pins}
    </svg>`;
  }

  /* ============== RENDER ESCORT CARDS ============== */
  function renderEscorts(container, filter) {
    if (!container) return;
    let list = ESCORTS;
    if (filter && filter !== 'all') {
      if (filter === 'active') list = ESCORTS.filter(e => ['requested','planning','assigned','transit'].includes(e.status));
      else list = ESCORTS.filter(e => e.status === filter);
    }

    container.innerHTML = list.map(e => {
      const intermediate = e.via.length > 0 ? `via ${e.via.join(', ')} · ` : '';
      return `<button class="escort-card" data-escort="${e.id}">
        <div>
          <div class="escort-card-head">
            <div>
              <div class="escort-card-id">${e.id}</div>
              <div class="escort-card-title">${e.title}</div>
            </div>
            <span class="escort-status ${e.status}">${e.status}</span>
          </div>

          <div class="route-line">
            <div class="route-endpoint origin">
              <div class="pin" data-icon="map-pin"></div>
              <div class="name">${e.from}</div>
              <div class="time">DEP · ${e.departure.split(' · ')[1] || ''}</div>
            </div>
            <div class="route-arrow">
              <span class="arrow-info"><span data-icon="arrow-right"></span>${e.distance} km · ${e.duration}</span>
            </div>
            <div class="route-endpoint dest">
              <div class="pin" data-icon="map-pin"></div>
              <div class="name">${e.to}</div>
              <div class="time">ETA · ${e.eta.split(' · ')[1] || ''}</div>
            </div>
          </div>

          <div class="escort-meta">
            <span class="item"><span data-icon="shield-check"></span><span class="risk-pill risk-${e.riskLabel}">${e.riskLabel}</span></span>
            <span class="item"><span data-icon="send"></span><strong>${e.vehicles}</strong> vehicles · <strong>${e.team}</strong> escort</span>
            <span class="item"><span data-icon="users"></span><strong>${e.personnel}</strong> pax</span>
            <span class="item"><span data-icon="archive"></span>${e.cargo}</span>
            <span class="item"><span data-icon="calendar"></span>${e.departure.split(' · ')[0]}</span>
          </div>
        </div>

        <div class="escort-mini-map">
          <div class="map-canvas">${buildMiniMap(e)}</div>
          <div class="map-stats">
            <span>${e.from} → ${e.to}</span>
            <span><strong>${e.distance}</strong> km</span>
          </div>
          ${e.status === 'transit' ? `<div style="margin-top:4px">
            <div style="height:4px;background:var(--surface-3);border-radius:2px;overflow:hidden;margin-bottom:4px"><div style="width:${e.progress}%;height:100%;background:var(--danger)"></div></div>
            <div style="font-family:var(--font-mono);font-size:10px;color:var(--danger);text-align:right;font-weight:600">EN ROUTE · ${e.progress}%</div>
          </div>` : ''}
        </div>
      </button>`;
    }).join('');
    if (window.TPCIconHydrate) window.TPCIconHydrate(container);
  }

  /* ============== HERO STATS ============== */
  function renderEscortStats() {
    const inTransit = ESCORTS.filter(e => e.status === 'transit').length;
    const planned   = ESCORTS.filter(e => ['requested','planning','assigned'].includes(e.status)).length;
    const completed = ESCORTS.filter(e => e.status === 'completed').length;
    const totalKm   = ESCORTS.reduce((s,e) => s + e.distance, 0);

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('escort-transit', inTransit);
    set('escort-planned', planned);
    set('escort-completed', completed);
    set('escort-km', totalKm.toLocaleString('fr-FR').replace(/\u202F|\s/g, '\u00A0'));

    // Risk distribution
    const dist = { 1:0, 2:0, 3:0, 4:0, 5:0 };
    ESCORTS.forEach(e => dist[e.risk] = (dist[e.risk] || 0) + 1);
    const total = ESCORTS.length;
    const riskBar = document.getElementById('risk-dist');
    if (riskBar) {
      const map = { 1: 'r-low', 2: 'r-std', 3: 'r-elev', 4: 'r-high', 5: 'r-rest' };
      riskBar.innerHTML = [1,2,3,4,5].map(r => {
        const pct = (dist[r] / total) * 100;
        return pct > 0 ? `<span class="${map[r]}" style="width:${pct}%" title="Risk ${r}: ${dist[r]} escort(s)"></span>` : '';
      }).join('');
    }
  }

  /* ============== FORM BINDINGS ============== */
  function bindEscortForm() {
    document.querySelectorAll('.risk-tile').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.risk-tile').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    document.getElementById('escort-submit')?.addEventListener('click', () => {
      if (window.TPC && window.TPC.toast) window.TPC.toast('✓ Escort request submitted — routing to Security Coordinator');
      setTimeout(() => window.TPC && window.TPC.goPage && window.TPC.goPage('escort'), 1100);
    });
  }

  /* ============== INIT ============== */
  function init() {
    renderEscortStats();
    bindEscortForm();

    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      reg('escort', () => {
        renderEscorts(document.getElementById('my-escorts-list'), 'all');
      });
    } else {
      renderEscorts(document.getElementById('my-escorts-list'), 'all');
    }

    document.querySelectorAll('[data-escort-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.parentElement.querySelectorAll('.ms-chip-filter').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderEscorts(document.getElementById('my-escorts-list'), chip.getAttribute('data-escort-filter'));
      });
    });
  }

  window.TPCEscort = { init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
