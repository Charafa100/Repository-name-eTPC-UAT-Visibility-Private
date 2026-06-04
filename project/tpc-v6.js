/* tpc-v6.js — Users & Roles page renderer
 * Depends on: tpc-app.js (window.TPC)
 * Registered as lazy page 'users' — renders on first navigation, re-renders on data mutations.
 */
(function () {
  'use strict';

  const SAFETY_STAGES = ['Safety Review', 'EMP Review', 'IH Review'];

  const ROLE_BADGE = {
    ga:    { label: 'Global Admin',  cls: 'badge-primary' },
    admin: { label: 'Safety Admin',  cls: 'badge-info'    },
    she:   { label: 'HSE Reviewer',  cls: 'badge-warning' },
    sm:    { label: 'Store Manager', cls: 'badge-neutral' },
    user:  { label: 'Field User',    cls: 'badge-neutral' },
  };

  /* ── Module state ─────────────────────────────────────────────── */
  let editingUserId   = null;
  let deactivateTarget = null;
  let deactivateTimer  = null;
  let searchTerm       = '';
  let filterRole       = '';
  let filterStatus     = 'active';

  /* ── Helpers ─────────────────────────────────────────────────── */
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getSiteLabel(key) {
    const sites = (window.TPC && window.TPC.sites) || [];
    const s = sites.find(x => x.key === key);
    return s ? s.label : (key || '—');
  }

  function deriveInitials(name) {
    return (name || '').trim().split(/\s+/).map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
  }

  /* ── KPI strip ───────────────────────────────────────────────── */
  function updateUserKPIs(users) {
    const active    = users.filter(u => u.active !== false).length;
    const inactive  = users.filter(u => u.active === false).length;
    const reviewers = users.filter(u => u.active !== false && u.platformRole === 'she').length;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('user-kpi-active',    active);
    set('user-kpi-inactive',  inactive);
    set('user-kpi-reviewers', reviewers);
  }

  /* ── Card renderer ───────────────────────────────────────────── */
  function renderUserCard(u, isAdmin) {
    const rb      = ROLE_BADGE[u.platformRole] || { label: u.platformRole, cls: 'badge-neutral' };
    const active  = u.active !== false;
    const site    = getSiteLabel(u.site);

    const statusBadge = active
      ? '<span class="badge badge-success badge-dot" style="font-size:11px">Active</span>'
      : '<span class="badge badge-neutral badge-dot" style="font-size:11px;opacity:.7">Inactive</span>';

    const jobLine = u.jobTitle
      ? `<div class="u-jobtitle">${esc(u.jobTitle)}</div>` : '';

    const stagesHtml = (u.platformRole === 'she' && u.stagesScope && u.stagesScope.length)
      ? `<div class="u-stages">${u.stagesScope.map(s =>
          `<span class="badge badge-neutral" style="font-size:10px;padding:2px 6px">${esc(s)}</span>`
        ).join('')}</div>` : '';

    let actionsHtml = '';
    if (isAdmin) {
      if (active) {
        actionsHtml = `
          <div class="u-actions">
            <button class="btn btn-sm btn-ghost u-edit-btn" data-user-edit="${u.id}" title="Edit user">
              <span data-icon="edit-2"></span>
            </button>
            <button class="btn btn-sm btn-ghost u-deact-btn" data-user-deactivate="${u.id}" id="deact-btn-${esc(u.id)}" title="Deactivate">
              <span data-icon="user-x"></span>
            </button>
          </div>`;
      } else {
        actionsHtml = `
          <div class="u-actions">
            <button class="btn btn-sm btn-ghost u-edit-btn" data-user-edit="${u.id}" title="Edit user">
              <span data-icon="edit-2"></span>
            </button>
            <button class="btn btn-sm btn-ghost" data-user-reactivate="${u.id}" title="Reactivate">
              <span data-icon="user-check"></span>
            </button>
          </div>`;
      }
    }

    return `
      <div class="user-card${active ? '' : ' user-card-inactive'}" data-user-id="${u.id}">
        <div class="user-av${active ? '' : ' user-av-inactive'}">${esc(u.initials)}</div>
        <div class="user-info">
          <div class="u-name">${esc(u.name)}</div>
          <div class="u-email">${esc(u.email)}</div>
          ${jobLine}
          <div class="u-meta">
            <span class="badge ${rb.cls}" style="font-size:11px">${rb.label}</span>
            <span class="u-site-chip">${esc(site)}</span>
            ${statusBadge}
          </div>
          ${stagesHtml}
        </div>
        ${actionsHtml}
      </div>`;
  }

  /* ── Main grid render ────────────────────────────────────────── */
  function renderUserGrid() {
    const grid = document.getElementById('user-grid');
    if (!grid) return;

    const viewer = (window.TPC && window.TPC.currentUser) ? window.TPC.currentUser() : {};
    const isAdmin = viewer.role === 'ga';

    if (!isAdmin) {
      grid.innerHTML = '<div style="padding:32px;text-align:center;color:var(--text-4)">Access restricted to Global Admin.</div>';
      return;
    }

    const users = (window.TPC && window.TPC.users) || [];
    updateUserKPIs(users);

    const filtered = users.filter(u => {
      if (filterStatus === 'active'   && u.active === false)  return false;
      if (filterStatus === 'inactive' && u.active !== false)  return false;
      if (filterRole && u.platformRole !== filterRole)        return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="padding:32px;text-align:center;color:var(--text-4)">No users match the current filters.</div>';
      return;
    }

    grid.innerHTML = filtered.map(u => renderUserCard(u, isAdmin)).join('');
    wireCardActions();
    if (window.TPCIconHydrate) window.TPCIconHydrate(grid);
  }

  /* ── Card action wiring ──────────────────────────────────────── */
  function wireCardActions() {
    document.querySelectorAll('[data-user-edit]').forEach(btn => {
      btn.addEventListener('click', () => openUserForm(btn.getAttribute('data-user-edit')));
    });
    document.querySelectorAll('[data-user-deactivate]').forEach(btn => {
      btn.addEventListener('click', () => handleDeactivate(btn.getAttribute('data-user-deactivate'), btn));
    });
    document.querySelectorAll('[data-user-reactivate]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.TPC && window.TPC.reactivateUser) {
          window.TPC.reactivateUser(btn.getAttribute('data-user-reactivate'));
          window.TPC.toast('User reactivated');
        }
      });
    });
  }

  /* ── 2-click deactivation with countdown ─────────────────────── */
  function handleDeactivate(userId, btn) {
    if (deactivateTarget === userId) {
      clearInterval(deactivateTimer);
      deactivateTarget = null;
      if (window.TPC && window.TPC.deactivateUser) {
        window.TPC.deactivateUser(userId);
        window.TPC.toast('User deactivated');
      }
      return;
    }
    if (deactivateTarget) {
      clearInterval(deactivateTimer);
      deactivateTarget = null;
      renderUserGrid();
    }
    deactivateTarget = userId;
    let secs = 3;
    btn.className = 'btn btn-sm btn-danger u-deact-btn';
    btn.innerHTML = `<span data-icon="alert-triangle"></span>Confirm? (${secs}s)`;
    if (window.TPCIconHydrate) window.TPCIconHydrate(btn);
    deactivateTimer = setInterval(() => {
      secs--;
      if (secs <= 0) {
        clearInterval(deactivateTimer);
        deactivateTarget = null;
        renderUserGrid();
      } else {
        btn.innerHTML = `<span data-icon="alert-triangle"></span>Confirm? (${secs}s)`;
        if (window.TPCIconHydrate) window.TPCIconHydrate(btn);
      }
    }, 1000);
  }

  /* ── Form: open ──────────────────────────────────────────────── */
  function openUserForm(userId) {
    editingUserId = userId || null;
    const users = (window.TPC && window.TPC.users) || [];
    const u     = userId ? users.find(x => x.id === userId) : null;
    const panel = document.getElementById('user-form-panel');
    if (!panel) return;

    document.getElementById('user-form-title').textContent = u ? 'Edit user' : 'Invite user';

    document.getElementById('uf-name').value     = u ? u.name        : '';
    document.getElementById('uf-email').value    = u ? u.email       : '';
    document.getElementById('uf-jobtitle').value = u ? (u.jobTitle || '') : '';
    document.getElementById('uf-initials').value = u ? u.initials    : '';
    document.getElementById('uf-role').value     = u ? u.platformRole : 'user';

    const emailEl = document.getElementById('uf-email');
    emailEl.readOnly = !!u;
    emailEl.style.background = u ? 'var(--surface-2)' : '';
    emailEl.style.color      = u ? 'var(--text-3)'    : '';

    populateSiteDropdown();
    document.getElementById('uf-site').value = u ? u.site : '';

    populateModuleAccess(u ? u.moduleAccess : ['safety']);
    applyRoleConditionals(u ? u.platformRole : 'user', u ? u.stagesScope : []);

    clearFormErrors();
    panel.style.display = '';
    setTimeout(() => document.getElementById('uf-name').focus(), 50);
  }

  function populateSiteDropdown() {
    const el    = document.getElementById('uf-site');
    if (!el) return;
    const sites = (window.TPC && window.TPC.sites) || [];
    el.innerHTML = '<option value="">— Select site —</option>' +
      sites.map(s => `<option value="${esc(s.key)}">${esc(s.label)}</option>`).join('');
  }

  function populateModuleAccess(selected) {
    const el = document.getElementById('uf-module-access');
    if (!el) return;
    el.innerHTML = `<label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer">
      <input type="checkbox" value="safety" ${(selected || []).includes('safety') ? 'checked' : ''}>
      Safety Data
    </label>`;
  }

  function applyRoleConditionals(roleKey, stagesScope) {
    const stageWrap = document.getElementById('uf-stages-wrap');
    const modWrap   = document.getElementById('uf-module-wrap');
    const isReviewer = roleKey === 'she';
    const isGA       = roleKey === 'ga';
    if (stageWrap) stageWrap.style.display = isReviewer ? '' : 'none';
    if (modWrap)   modWrap.style.display   = isGA       ? 'none' : '';

    if (isReviewer) {
      const scope = stagesScope || [];
      const stagesEl = document.getElementById('uf-stages');
      if (stagesEl) {
        stagesEl.innerHTML = SAFETY_STAGES.map(s =>
          `<label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer">
            <input type="checkbox" name="uf-stage" value="${esc(s)}" ${scope.includes(s) ? 'checked' : ''}>
            ${esc(s)}
          </label>`
        ).join('');
      }
    }
  }

  /* ── Form: validation + save ─────────────────────────────────── */
  function validateAndSave() {
    clearFormErrors();
    const users    = (window.TPC && window.TPC.users) || [];
    const name     = document.getElementById('uf-name').value.trim();
    const email    = document.getElementById('uf-email').value.trim().toLowerCase();
    const role     = document.getElementById('uf-role').value;
    const site     = document.getElementById('uf-site').value;
    const initials = document.getElementById('uf-initials').value.trim().toUpperCase().slice(0, 2);
    const jobTitle = document.getElementById('uf-jobtitle').value.trim();
    let valid = true;

    if (name.length < 2) {
      markError('uf-name', 'Full name is required (min 2 characters)');
      valid = false;
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      markError('uf-email', 'A valid email address is required');
      valid = false;
    } else if (!editingUserId && users.find(u => u.email.toLowerCase() === email)) {
      markError('uf-email', 'A user with this email already exists');
      valid = false;
    }
    if (!role) { markError('uf-role', 'Platform role is required'); valid = false; }
    if (!site) { markError('uf-site', 'Site is required');          valid = false; }

    let stagesScope = null;
    if (role === 'she') {
      const checked = [...document.querySelectorAll('input[name="uf-stage"]:checked')].map(c => c.value);
      if (!checked.length) {
        markErrorDirect('uf-stages-err', 'At least one approval stage is required for HSE Reviewer');
        valid = false;
      } else {
        stagesScope = checked;
      }
    }

    let moduleAccess = ['safety'];
    if (role !== 'ga') {
      const checked = [...document.querySelectorAll('#uf-module-access input[type="checkbox"]:checked')].map(c => c.value);
      if (!checked.length) {
        markErrorDirect('uf-module-err', 'At least one module is required');
        valid = false;
      } else {
        moduleAccess = checked;
      }
    }

    if (!valid) return;

    const data = {
      name,
      email,
      jobTitle,
      platformRole : role,
      moduleAccess,
      site,
      initials     : initials || deriveInitials(name),
      stagesScope,
    };

    if (editingUserId) {
      window.TPC.updateUser(editingUserId, data);
      window.TPC.toast(`Saved — ${name}`);
    } else {
      window.TPC.addUser(data);
      window.TPC.toast(`User invited — ${name}`);
    }
    closeUserForm();
  }

  function markError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    if (field) field.style.borderColor = 'var(--danger)';
    let errEl = document.getElementById(fieldId + '-err');
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.id = fieldId + '-err';
      errEl.className = 'field-error';
      if (field && field.parentNode) field.parentNode.appendChild(errEl);
    }
    errEl.textContent = msg;
    errEl.style.display = '';
  }

  function markErrorDirect(errId, msg) {
    const el = document.getElementById(errId);
    if (el) { el.textContent = msg; el.style.display = ''; }
  }

  function clearFormErrors() {
    document.querySelectorAll('#user-form-panel .field-error').forEach(el => {
      el.textContent = ''; el.style.display = 'none';
    });
    document.querySelectorAll('#user-form-panel .input, #user-form-panel .select').forEach(el => {
      el.style.borderColor = '';
    });
  }

  /* ── Form: close ─────────────────────────────────────────────── */
  function closeUserForm() {
    const panel = document.getElementById('user-form-panel');
    if (panel) panel.style.display = 'none';
    editingUserId = null;
    clearFormErrors();
  }

  /* ── Filter bar wiring ───────────────────────────────────────── */
  function bindFilterBar() {
    const searchEl = document.getElementById('user-search');
    const roleEl   = document.getElementById('user-filter-role');

    if (searchEl) {
      let debounce;
      searchEl.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => { searchTerm = searchEl.value.trim(); renderUserGrid(); }, 150);
      });
      searchEl.addEventListener('keydown', e => {
        if (e.key === 'Escape') { searchEl.value = ''; searchTerm = ''; renderUserGrid(); }
      });
    }

    if (roleEl) {
      roleEl.addEventListener('change', () => { filterRole = roleEl.value; renderUserGrid(); });
    }

    document.querySelectorAll('[data-user-status-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterStatus = btn.getAttribute('data-user-status-filter');
        document.querySelectorAll('[data-user-status-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderUserGrid();
      });
    });
  }

  /* ── Form panel wiring ───────────────────────────────────────── */
  function bindFormPanel() {
    const addBtn    = document.getElementById('user-add-btn');
    const cancelBtn = document.getElementById('uf-cancel');
    const saveBtn   = document.getElementById('uf-save');
    const roleEl    = document.getElementById('uf-role');
    const nameEl    = document.getElementById('uf-name');

    if (addBtn)    addBtn.addEventListener('click',    () => openUserForm(null));
    if (cancelBtn) cancelBtn.addEventListener('click', closeUserForm);
    if (saveBtn)   saveBtn.addEventListener('click',   validateAndSave);

    if (nameEl) {
      nameEl.addEventListener('input', () => {
        if (!editingUserId) {
          const initEl = document.getElementById('uf-initials');
          if (initEl) initEl.value = deriveInitials(nameEl.value);
        }
      });
    }

    if (roleEl) {
      roleEl.addEventListener('change', () => {
        applyRoleConditionals(roleEl.value, []);
      });
    }
  }

  /* ── Public refresh (called by tpc-app.js mutations) ─────────── */
  function refreshUserGrid() {
    renderUserGrid();
  }

  /* ── Lazy page registration ──────────────────────────────────── */
  function init() {
    if (!window.TPC || !window.TPC.registerLazy) return;
    window.TPC.registerLazy('users', () => {
      bindFilterBar();
      bindFormPanel();
      renderUserGrid();
    });
  }

  window.TPCv6 = { init, refreshUserGrid };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
