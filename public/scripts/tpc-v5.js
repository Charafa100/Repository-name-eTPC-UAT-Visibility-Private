/* TPC v5 — Storage & Sites: page renderer, form wiring, KPI updates */

(function () {

  /* ============================================================
     All site and location data lives in SITES / STORAGE_LOCATIONS
     inside tpc-app.js and is exposed as:
       window.TPC.sites             — array of { key, label }
       window.TPC.storageLocations  — array of { id, site, label, active }

     This module consumes that data. It never redefines it.
  ============================================================ */

  function getSites() {
    return (window.TPC && window.TPC.sites) || [];
  }

  function getLocations() {
    return (window.TPC && window.TPC.storageLocations) || [];
  }

  function activeSites() {
    return getSites(); // all sites are currently active
  }

  function activeLocations() {
    return getLocations().filter(l => l.active !== false);
  }

  function locationsForSite(siteKey) {
    return getLocations().filter(l => l.site === siteKey && l.active !== false);
  }

  /* ============== POPULATE SITE DROPDOWN ============== */
  function populateSiteDropdown(selectEl, placeholder) {
    if (!selectEl) return;
    const current = selectEl.value;
    selectEl.innerHTML = `<option value="">${placeholder || 'Select site…'}</option>`;
    activeSites().forEach(site => {
      const opt = document.createElement('option');
      opt.value = site.key;
      opt.textContent = site.label;
      if (opt.value === current) opt.selected = true;
      selectEl.appendChild(opt);
    });
  }

  /* ============== POPULATE LOCATION DROPDOWN ============== */
  function populateLocationDropdown(selectEl, siteKey, placeholder) {
    if (!selectEl) return;
    const locs = locationsForSite(siteKey);
    selectEl.innerHTML = `<option value="">${placeholder || 'Select a location…'}</option>`;
    locs.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc.id;
      opt.textContent = loc.label;
      selectEl.appendChild(opt);
    });
  }

  /* ============== NEW CHEMICAL FORM ============== */
  function wireNewChemicalForm() {
    const aouSel     = document.getElementById('aou-select');
    const storageSel = document.getElementById('storage-select');
    if (!aouSel) return;

    populateSiteDropdown(aouSel, 'Select site…');

    if (storageSel) {
      storageSel.innerHTML = '<option value="">Select area of use first…</option>';
    }

    aouSel.addEventListener('change', () => {
      if (!storageSel) return;
      populateLocationDropdown(storageSel, aouSel.value, 'Select a location…');
    });
  }

  /* ============== ADD TO MY SITE FORM ============== */
  function wireAddToSiteForm() {
    const siteSel = document.getElementById('ats-site');
    const locSel  = document.getElementById('ats-location');
    if (!siteSel) return;

    populateSiteDropdown(siteSel, 'Select site…');

    if (locSel) {
      locSel.innerHTML = '<option value="">Select site first…</option>';
      siteSel.addEventListener('change', () => {
        populateLocationDropdown(locSel, siteSel.value, 'Select a location…');
      });
    }
  }

  /* ============== STORAGE PAGE RENDERER ============== */
  function renderStoragePage() {
    const container = document.getElementById('storage-list');
    if (!container) return;

    const sites = activeSites();
    if (sites.length === 0) {
      container.innerHTML = '<div style="color:var(--text-4);padding:var(--s-6)">No sites configured.</div>';
      return;
    }

    const html = sites.map(site => {
      const locs = locationsForSite(site.key);

      const rows = locs.map(loc => `
        <div class="stloc-row">
          <span class="stloc-icon" data-icon="archive"></span>
          <div class="stloc-info">
            <div class="stloc-name">${loc.label}</div>
            <div class="stloc-meta mono">${loc.id}</div>
          </div>
          <span class="badge badge-neutral">active</span>
        </div>`).join('');

      return `
        <div class="stsite-card">
          <div class="stsite-head">
            <span class="stsite-pin" data-icon="map-pin"></span>
            <div class="stsite-info">
              <div class="stsite-name">${site.label}</div>
              <div class="stsite-sub">${locs.length} location${locs.length !== 1 ? 's' : ''}</div>
            </div>
            <span class="badge badge-neutral mono stsite-count">${locs.length}</span>
          </div>
          <div class="stsite-body">
            ${rows || '<div class="stloc-empty">No active locations</div>'}
          </div>
        </div>`;
    }).join('');

    container.innerHTML = html;
    if (window.TPCIconHydrate) window.TPCIconHydrate(container);
  }

  /* ============== KPI + STAT UPDATES ============== */
  function updateCounts() {
    const total     = activeLocations().length;
    const siteCount = activeSites().length;

    const kpiEl = document.getElementById('hub-kpi-storage');
    if (kpiEl) kpiEl.textContent = total;

    const metaEl = document.getElementById('hub-meta-storage');
    if (metaEl) metaEl.textContent = `${total} locations · ${siteCount} sites`;

    document.querySelectorAll('.stat').forEach(card => {
      if (card.querySelector('[data-t="stats.storage"]')) {
        const val  = card.querySelector('.stat-value');
        const meta = card.querySelector('.stat-meta');
        if (val)  val.textContent  = total;
        if (meta) meta.textContent = `Across ${siteCount} sites`;
      }
    });

    const sub = document.querySelector('#page-storage .page-subtitle');
    if (sub) sub.textContent =
      `Chemical storage areas by site · ${siteCount} sites · ${total} locations`;
  }

  /* ============== MINIMAL CSS ============== */
  function injectCSS() {
    if (document.getElementById('tpc-v5-css')) return;
    const style = document.createElement('style');
    style.id = 'tpc-v5-css';
    style.textContent = `
#storage-list { display:grid; grid-template-columns:repeat(auto-fill,minmax(360px,1fr)); gap:var(--s-5); padding:var(--s-1) 0; }
.stsite-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-xl); overflow:hidden; }
.stsite-head { display:flex; align-items:center; gap:var(--s-3); padding:var(--s-4) var(--s-5); border-bottom:1px solid var(--border); background:var(--surface-2); }
.stsite-pin { width:32px; height:32px; display:flex; align-items:center; justify-content:center; background:var(--accent-soft); border-radius:var(--r-md); color:var(--accent); flex-shrink:0; }
.stsite-name { font-size:14px; font-weight:600; color:var(--text); }
.stsite-sub { font-size:12px; color:var(--text-3); margin-top:2px; }
.stsite-count { margin-left:auto; }
.stsite-body { padding:var(--s-3) var(--s-5); }
.stloc-row { display:flex; align-items:center; gap:var(--s-3); padding:var(--s-2) 0; border-bottom:1px solid var(--border); }
.stloc-row:last-child { border-bottom:none; }
.stloc-icon { width:26px; height:26px; display:flex; align-items:center; justify-content:center; background:var(--surface-2); border:1px solid var(--border); border-radius:var(--r-sm); flex-shrink:0; color:var(--text-4); font-size:12px; }
.stloc-name { font-size:13px; font-weight:500; color:var(--text); }
.stloc-meta { font-size:11px; color:var(--text-4); margin-top:1px; }
.stloc-empty { font-size:13px; color:var(--text-4); padding:var(--s-2) 0; }
    `;
    document.head.appendChild(style);
  }

  /* ============== INIT ============== */
  function init() {
    injectCSS();
    wireNewChemicalForm();
    wireAddToSiteForm();
    updateCounts();

    const reg = window.TPC && window.TPC.registerLazy;
    if (reg) {
      reg('storage', renderStoragePage);
    } else {
      renderStoragePage();
    }
  }

  window.TPCv5 = { init, renderStoragePage };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
