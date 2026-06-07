/* TPC v5 — Storage & Sites: page renderer, admin wiring, KPI updates */

(function () {

  /* ============================================================
     Data access — reads from window.TPC (set by tpc-app.js).
     window.TPC.sites            — [{ key, label }]
     window.TPC.storageLocations — [{ id, site, label, active }]
  ============================================================ */
  function getSites()    { return (window.TPC && window.TPC.sites)             || []; }
  function getLocs()     { return (window.TPC && window.TPC.storageLocations)  || []; }
  function activeSites() { return getSites(); }

  function locsByKey(siteKey, includeInactive) {
    return getLocs().filter(l => l.site === siteKey && (includeInactive || l.active !== false));
  }

  function activeLocCount() { return getLocs().filter(l => l.active !== false).length; }

  /* ============================================================
     Dropdown helpers (shared by New Chemical + Add To My Site)
  ============================================================ */
  function populateSiteDropdown(selectEl, placeholder) {
    if (!selectEl) return;
    const cur = selectEl.value;
    selectEl.innerHTML = `<option value="">${placeholder || 'Select site…'}</option>`;
    activeSites().forEach(s => {
      const o = document.createElement('option');
      o.value = s.key; o.textContent = s.label;
      if (o.value === cur) o.selected = true;
      selectEl.appendChild(o);
    });
  }

  function populateLocDropdown(selectEl, siteKey, placeholder) {
    if (!selectEl) return;
    const locs = locsByKey(siteKey);
    selectEl.innerHTML = `<option value="">${placeholder || 'Select a location…'}</option>`;
    locs.forEach(l => {
      const o = document.createElement('option');
      o.value = l.id; o.textContent = l.label;
      selectEl.appendChild(o);
    });
  }

  /* ============================================================
     New Chemical form — replaces hardcoded aou-select options
  ============================================================ */
  function wireNewChemicalForm() {
    const aouSel = document.getElementById('aou-select');
    const locSel = document.getElementById('storage-select');
    if (!aouSel) return;

    populateSiteDropdown(aouSel, 'Select site…');
    if (locSel) locSel.innerHTML = '<option value="">Select area of use first…</option>';

    aouSel.addEventListener('change', () => {
      if (!locSel) return;
      populateLocDropdown(locSel, aouSel.value, 'Select a location…');
    });
  }

  /* ============================================================
     Add To My Site form — wires site → location dropdowns
  ============================================================ */
  function wireAddToSiteForm() {
    const siteSel = document.getElementById('ats-site');
    const locSel  = document.getElementById('ats-location');
    if (!siteSel) return;

    populateSiteDropdown(siteSel, 'Select site…');
    if (locSel) {
      locSel.innerHTML = '<option value="">Select site first…</option>';
      siteSel.addEventListener('change', () => {
        populateLocDropdown(locSel, siteSel.value, 'Select a location…');
      });
    }
  }

  /* ============================================================
     Storage Admin — state
  ============================================================ */
  let _showAll    = false;
  let _query      = '';
  let _adminBound = false;
  let _editingId  = null;

  /* ============================================================
     Storage grid renderer
     Renders site-grouped location rows with role-gated actions.
     Called on first page visit (lazy) and after every mutation.
  ============================================================ */
  function renderStorageGrid() {
    const container = document.getElementById('storage-list');
    if (!container) return;

    const user    = window.TPC && window.TPC.currentUser ? window.TPC.currentUser() : {};
    const isAdmin = user.role === 'ga' || user.role === 'admin';
    const q       = _query.toLowerCase().trim();
    const sites   = activeSites();
    let   html    = '';

    sites.forEach(site => {
      let locs = getLocs().filter(l => l.site === site.key);
      if (!_showAll) locs = locs.filter(l => l.active !== false);
      if (q) locs = locs.filter(l =>
        l.label.toLowerCase().includes(q) || l.id.toLowerCase().includes(q)
      );
      if (locs.length === 0) return; // skip empty sections

      const activeCnt = getLocs().filter(l => l.site === site.key && l.active !== false).length;
      const totalCnt  = getLocs().filter(l => l.site === site.key).length;
      const badge     = _showAll ? `${activeCnt}/${totalCnt}` : `${locs.length}`;

      const rows = locs.map(loc => {
        const inactive = loc.active === false;
        const namePart = `${loc.label}${inactive
          ? ' <span class="badge badge-neutral" style="font-size:10px;margin-left:4px">Inactive</span>'
          : ''}`;

        const actions = isAdmin ? (inactive
          ? `<div class="stloc-actions">
               <button class="btn btn-sm btn-ghost loc-react-btn" data-id="${loc.id}">
                 <span data-icon="refresh-cw"></span>Reactivate
               </button>
             </div>`
          : `<div class="stloc-actions">
               <button class="btn btn-sm btn-ghost loc-edit-btn" data-id="${loc.id}">
                 <span data-icon="edit-2"></span>Edit
               </button>
               <button class="btn btn-sm btn-ghost loc-deact-btn" data-id="${loc.id}">
                 <span data-icon="slash"></span>Deactivate
               </button>
             </div>`)
          : '';

        return `
          <div class="stloc-row${inactive ? ' stloc-inactive' : ''}" data-loc-id="${loc.id}">
            <span class="stloc-icon" data-icon="archive"></span>
            <div class="stloc-info">
              <div class="stloc-name">${namePart}</div>
              <div class="stloc-meta mono">${loc.id}</div>
            </div>
            ${actions}
          </div>`;
      }).join('');

      html += `
        <div class="stsite-card">
          <div class="stsite-head">
            <span class="stsite-pin" data-icon="map-pin"></span>
            <div class="stsite-info">
              <div class="stsite-name">${site.label}</div>
              <div class="stsite-sub">${activeCnt} active location${activeCnt !== 1 ? 's' : ''}</div>
            </div>
            <span class="badge badge-neutral mono stsite-count">${badge}</span>
          </div>
          <div class="stsite-body">${rows}</div>
        </div>`;
    });

    if (!html) {
      container.innerHTML =
        '<div style="color:var(--text-4);padding:var(--s-6);font-size:14px">No locations match.</div>';
      return;
    }

    container.innerHTML = html;
    if (window.TPCIconHydrate) window.TPCIconHydrate(container);
  }

  /* ============================================================
     Refresh — re-render grid + update all KPI counts.
     Called by tpc-app.js after every mutation.
  ============================================================ */
  function refreshStorageGrid() {
    renderStorageGrid();
    updateCounts();
    // Also refresh form dropdowns if they are visible
    wireNewChemicalForm();
    wireAddToSiteForm();
  }

  /* ============================================================
     Form panel helpers
  ============================================================ */
  function _formEl(id)  { return document.getElementById(id); }

  function openAddForm() {
    _editingId = null;
    const title  = _formEl('loc-form-title');
    const sub    = _formEl('loc-form-subtitle');
    const status = _formEl('loc-form-status');
    const siteGrp   = _formEl('loc-f-site-group');
    const siteROGrp = _formEl('loc-f-site-ro-group');
    const label  = _formEl('loc-f-label');
    const panel  = _formEl('loc-form-panel');

    if (title)   title.textContent = 'Add location';
    if (sub)   { sub.textContent = '';   sub.style.display   = 'none'; }
    if (status){ status.innerHTML = ''; status.style.display = 'none'; }
    if (label)   label.value = '';

    if (siteGrp)   siteGrp.style.display   = '';
    if (siteROGrp) siteROGrp.style.display = 'none';
    populateSiteDropdown(_formEl('loc-f-site'), 'Select site…');

    if (panel) { panel.style.display = ''; panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    if (label) label.focus();
  }

  function openEditForm(locId) {
    const loc = getLocs().find(l => l.id === locId);
    if (!loc) return;
    _editingId = locId;

    const title  = _formEl('loc-form-title');
    const sub    = _formEl('loc-form-subtitle');
    const status = _formEl('loc-form-status');
    const siteGrp   = _formEl('loc-f-site-group');
    const siteROGrp = _formEl('loc-f-site-ro-group');
    const siteRO    = _formEl('loc-f-site-ro');
    const label  = _formEl('loc-f-label');
    const panel  = _formEl('loc-form-panel');

    if (title) title.textContent = 'Edit location';
    if (sub)  { sub.textContent = 'Editing: ' + loc.label; sub.style.display = ''; }
    if (status) {
      status.style.display = '';
      status.innerHTML = loc.active !== false
        ? '<span class="badge badge-success">Active</span>'
        : '<span class="badge badge-neutral">Inactive</span>';
    }
    if (label) label.value = loc.label;

    // Site is read-only during edit
    const siteLabel = (getSites().find(s => s.key === loc.site) || { label: loc.site }).label;
    if (siteGrp)   siteGrp.style.display   = 'none';
    if (siteROGrp) siteROGrp.style.display = '';
    if (siteRO)    siteRO.textContent       = siteLabel;

    if (panel) { panel.style.display = ''; panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    if (label) label.focus();
  }

  function closeForm() {
    const panel  = _formEl('loc-form-panel');
    const sub    = _formEl('loc-form-subtitle');
    const status = _formEl('loc-form-status');
    if (panel)  panel.style.display  = 'none';
    if (sub)  { sub.textContent = '';   sub.style.display   = 'none'; }
    if (status){ status.innerHTML = ''; status.style.display = 'none'; }
    _editingId = null;
  }

  /* ============================================================
     Storage Admin page binding — called once on first page visit
  ============================================================ */
  function bindStorageAdminPage() {
    if (_adminBound) return;
    _adminBound = true;

    /* ── Add button ── */
    const addBtn = _formEl('loc-add-btn');
    if (addBtn) addBtn.addEventListener('click', openAddForm);

    /* ── Cancel button ── */
    const cancelBtn = _formEl('loc-form-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeForm);

    /* ── Save button ── */
    const saveBtn = _formEl('loc-form-save');
    if (saveBtn) saveBtn.addEventListener('click', () => {
      const label = (_formEl('loc-f-label') || {}).value || '';

      if (_editingId) {
        const res = window.TPC && window.TPC.updateLocation
          ? window.TPC.updateLocation(_editingId, { label })
          : { error: 'Not available' };
        if (res && res.error) { if (window.TPC) window.TPC.toast(res.error); return; }
        if (window.TPC) window.TPC.toast('✓ Location updated');
      } else {
        const site = (_formEl('loc-f-site') || {}).value || '';
        const res  = window.TPC && window.TPC.addLocation
          ? window.TPC.addLocation({ label, site })
          : { error: 'Not available' };
        if (res && res.error) { if (window.TPC) window.TPC.toast(res.error); return; }
        if (window.TPC) window.TPC.toast('✓ Location added');
      }

      closeForm();
      // tpc-app.js already called refreshStorageGrid via window.TPCv5
    });

    /* ── Search ── */
    const searchEl = _formEl('loc-search');
    if (searchEl) searchEl.addEventListener('input', () => {
      _query = searchEl.value;
      renderStorageGrid();
    });

    /* ── Filters ── */
    const fActive = _formEl('loc-filter-active');
    const fAll    = _formEl('loc-filter-all');
    [fActive, fAll].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        _showAll = btn === fAll;
        if (fActive) fActive.classList.toggle('active', !_showAll);
        if (fAll)    fAll.classList.toggle('active',     _showAll);
        renderStorageGrid();
      });
    });

    /* ── Delegated row actions on #storage-list ── */
    const grid = _formEl('storage-list');
    if (!grid) return;

    grid.addEventListener('click', e => {
      /* Edit */
      const editBtn = e.target.closest('.loc-edit-btn');
      if (editBtn) { openEditForm(editBtn.getAttribute('data-id')); return; }

      /* Deactivate — 2-click confirmation, 3-second timeout */
      const deactBtn = e.target.closest('.loc-deact-btn');
      if (deactBtn) {
        if (deactBtn.dataset.confirming) {
          const id = deactBtn.getAttribute('data-id');
          if (window.TPC && window.TPC.deactivateLocation) window.TPC.deactivateLocation(id);
          if (window.TPC) window.TPC.toast('✓ Location deactivated');
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

      /* Reactivate — single click */
      const reactBtn = e.target.closest('.loc-react-btn');
      if (reactBtn) {
        const id = reactBtn.getAttribute('data-id');
        if (window.TPC && window.TPC.reactivateLocation) window.TPC.reactivateLocation(id);
        if (window.TPC) window.TPC.toast('✓ Location reactivated');
        return;
      }
    });
  }

  /* ============================================================
     KPI + stat updates — runs on init and after every mutation
  ============================================================ */
  function updateCounts() {
    const total      = activeLocCount();
    const siteCount  = activeSites().length;

    /* Safety Admin KPI tile */
    const kpiEl = _formEl('hub-kpi-storage');
    if (kpiEl) kpiEl.textContent = total;

    /* Safety Home module list meta */
    const metaEl = _formEl('hub-meta-storage');
    if (metaEl) metaEl.textContent = total + ' locations · ' + siteCount + ' sites';

    /* Dashboard stat card */
    document.querySelectorAll('.stat').forEach(card => {
      if (card.querySelector('[data-t="stats.storage"]')) {
        const val  = card.querySelector('.stat-value');
        const meta = card.querySelector('.stat-meta');
        if (val)  val.textContent  = total;
        if (meta) meta.textContent = 'Across ' + siteCount + ' sites';
      }
    });

    /* Safety Data Admin KPI (sa-storage-count) */
    const saEl = _formEl('sa-storage-count');
    if (saEl) saEl.textContent = total;

    /* Storage page subtitle */
    const sub = document.querySelector('#page-storage .page-subtitle');
    if (sub) sub.textContent =
      'Chemical storage areas by site · ' + siteCount + ' sites · ' + total + ' locations';
  }

  /* ============================================================
     CSS injection — runs once, idempotent
  ============================================================ */
  function injectCSS() {
    if (_formEl('tpc-v5-css')) return;
    const s = document.createElement('style');
    s.id = 'tpc-v5-css';
    s.textContent = `
/* Storage page grid */
#storage-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:var(--s-5);padding:var(--s-1) 0}
.stsite-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden}
.stsite-head{display:flex;align-items:center;gap:var(--s-3);padding:var(--s-4) var(--s-5);border-bottom:1px solid var(--border);background:var(--surface-2)}
.stsite-pin{width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);border-radius:var(--r-md);color:var(--accent);flex-shrink:0}
.stsite-name{font-size:14px;font-weight:600;color:var(--text)}
.stsite-sub{font-size:12px;color:var(--text-3);margin-top:2px}
.stsite-count{margin-left:auto}
.stsite-body{padding:var(--s-1) var(--s-5)}
/* Location rows */
.stloc-row{display:flex;align-items:center;gap:var(--s-3);padding:var(--s-3) 0;border-bottom:1px solid var(--border)}
.stloc-row:last-child{border-bottom:none}
.stloc-row.stloc-inactive{opacity:0.5}
.stloc-icon{width:26px;height:26px;display:flex;align-items:center;justify-content:center;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);flex-shrink:0;color:var(--text-4);font-size:12px}
.stloc-info{flex:1;min-width:0}
.stloc-name{font-size:13px;font-weight:500;color:var(--text)}
.stloc-meta{font-size:11px;color:var(--text-4);margin-top:1px}
.stloc-actions{flex-shrink:0;display:flex;gap:var(--s-2)}
.stloc-empty{font-size:13px;color:var(--text-4);padding:var(--s-3) 0}
    `;
    document.head.appendChild(s);
  }

  /* ============================================================
     Init
  ============================================================ */
  function init() {
    injectCSS();
    wireNewChemicalForm();
    wireAddToSiteForm();
    updateCounts();

    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      // Overrides tpc-v2.js's renderStorage registration for 'storage' page.
      reg('storage', () => { renderStorageGrid(); bindStorageAdminPage(); });
    } else {
      renderStorageGrid();
      bindStorageAdminPage();
    }
  }

  /* ── Public API ── */
  window.TPCv5 = { init, renderStorageGrid, refreshStorageGrid };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
