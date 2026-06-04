/* TPC SolutionHub — app interactions */

const TPC = (() => {
  const i18n = {
    en: {
      'nav.platform': 'Platform',
      'nav.dashboard': 'Dashboard',
      'nav.requests': 'My Requests',
      'nav.solutions': 'Solutions',
      'nav.chemical': 'Safety Data',
      'nav.cash': 'Cash Advance',
      'nav.expense': 'Daily Expense',
      'nav.security': 'Security Escort',
      'nav.admin': 'Administration',
      'nav.users': 'Users',
      'nav.approvals': 'Approvals',
      'nav.settings': 'Settings',
      'nav.help': 'Help & Guide',
      'topbar.search': 'Search requests, chemicals, users…',
      'page.dashboard.title': 'Dashboard',
      'page.dashboard.sub': 'Overview of your activity and pending actions',
      'page.chemical.title': 'Safety Data Management',
      'page.chemical.sub': 'Chemical inventory, SDS, PPE and HSE approvals',
      'page.newchem.title': 'New chemical request',
      'page.newchem.sub': 'Submit a new chemical for HSE review and approval',
      'page.requests.title': 'My requests',
      'page.requests.sub': 'Track all requests you have submitted',
      'page.users.title': 'User management',
      'page.users.sub': 'Roles, permissions and team members',
      'page.approvals.title': 'Approvals inbox',
      'page.approvals.sub': 'Items across all TPC modules awaiting your review',
      'page.settings.title': 'System settings',
      'page.settings.sub': 'Azure integration, SSO, data sources',
      'queue.title': 'Your queue',
      'queue.sub': 'Items waiting on you today',
      'queue.viewall': 'View all',
      'news.title': 'News & announcements',
      'news.sub': 'Actualités TPC',
      'news.viewall': 'View archive',
      'quick.title': 'Quick actions',
      'stats.pending': 'Pending requests',
      'stats.approved': 'Approved this month',
      'stats.active': 'Active users',
      'stats.sync': 'Azure sync',
      'stats.chemicals': 'Active chemicals',
      'stats.manufacturers': 'Manufacturers',
      'stats.storage': 'Storage locations',
      'btn.newrequest': 'New request',
      'btn.export': 'Export',
      'btn.filter': 'Filter',
      'btn.submit': 'Submit request',
      'btn.savedraft': 'Save draft',
      'btn.back': 'Back',
      'btn.approve': 'Approve',
      'btn.reject': 'Reject',
      'btn.viewall': 'View all',
      'role.label': 'Demo role',
      'live': 'Live · Synced',
      'badge.live': 'Live',
      'badge.dev': 'In development',
    },
    fr: {
      'nav.platform': 'Plateforme',
      'nav.dashboard': 'Tableau de bord',
      'nav.requests': 'Mes demandes',
      'nav.solutions': 'Solutions',
      'nav.chemical': 'Données de sécurité',
      'nav.cash': 'Avance de fonds',
      'nav.expense': 'Note de frais',
      'nav.security': 'Escorte de sécurité',
      'nav.admin': 'Administration',
      'nav.users': 'Utilisateurs',
      'nav.approvals': 'Approbations',
      'nav.settings': 'Paramètres',
      'nav.help': 'Aide & Guide',
      'topbar.search': 'Rechercher demandes, produits chimiques, utilisateurs…',
      'page.dashboard.title': 'Tableau de bord',
      'page.dashboard.sub': 'Vue d\'ensemble de votre activité et actions en attente',
      'page.chemical.title': 'Gestion des données de sécurité',
      'page.chemical.sub': 'Inventaire chimique, FDS, EPI et approbations HSE',
      'page.newchem.title': 'Nouvelle demande de produit chimique',
      'page.newchem.sub': 'Soumettre un nouveau produit chimique pour examen HSE',
      'page.requests.title': 'Mes demandes',
      'page.requests.sub': 'Suivre toutes les demandes que vous avez soumises',
      'page.users.title': 'Gestion des utilisateurs',
      'page.users.sub': 'Rôles, permissions et membres de l\'équipe',
      'page.approvals.title': 'Boîte d’approbation',
      'page.approvals.sub': 'Éléments à examiner à travers tous les modules TPC',
      'page.settings.title': 'Paramètres système',
      'page.settings.sub': 'Intégration Azure, SSO, sources de données',
      'queue.title': 'Votre file d\'attente',
      'queue.sub': 'Éléments en attente de votre action aujourd\'hui',
      'queue.viewall': 'Voir tout',
      'news.title': 'Actualités & annonces',
      'news.sub': 'Communications internes TPC',
      'news.viewall': 'Voir les archives',
      'quick.title': 'Actions rapides',
      'stats.pending': 'Demandes en attente',
      'stats.approved': 'Approuvées ce mois',
      'stats.active': 'Utilisateurs actifs',
      'stats.sync': 'Synchro Azure',
      'stats.chemicals': 'Produits chimiques actifs',
      'stats.manufacturers': 'Fabricants',
      'stats.storage': 'Lieux de stockage',
      'btn.newrequest': 'Nouvelle demande',
      'btn.export': 'Exporter',
      'btn.filter': 'Filtrer',
      'btn.submit': 'Soumettre la demande',
      'btn.savedraft': 'Enregistrer brouillon',
      'btn.back': 'Retour',
      'btn.approve': 'Approuver',
      'btn.reject': 'Rejeter',
      'btn.viewall': 'Tout voir',
      'role.label': 'Rôle démo',
      'live': 'En direct · Synchronisé',
      'badge.live': 'En direct',
      'badge.dev': 'En développement',
    }
  };

  const roleConfig = {
    ga:    { name: 'Cherif Hassan',  badge: 'Global Admin',  badgeFr: 'Admin global',  av: 'CH', hidden: [],                                  denied: false },
    admin: { name: 'Cherif Hassan',  badge: 'Admin',         badgeFr: 'Administrateur', av: 'CH', hidden: ['nav-settings'],                  denied: false },
    she:   { name: 'Mariam Deby',    badge: 'HSE Reviewer',  badgeFr: 'Réviseur HSE',   av: 'MD', hidden: ['nav-users','nav-settings'],      denied: false },
    sm:    { name: 'Fatima Moussa',  badge: 'Store Manager', badgeFr: 'Resp. magasin',  av: 'FM', hidden: ['nav-users','nav-approvals','nav-settings'], denied: false },
    user:  { name: 'Ahmed Mahamat',  badge: 'Field User',    badgeFr: 'Utilisateur',    av: 'AM', hidden: ['nav-users','nav-approvals','nav-settings'], denied: false }
  };

  const storageMap = {
    douala: ['Douala HQ — Chemical Shelter', 'Warehouse Block A', 'Laboratory Storage'],
    ps2:    ['PS2-Dompta — Yard A', 'PS2-Dompta — Charlie Base', 'PS2 Chemical Storage'],
    ps3:    ['PS3-Belabo — Main Store', 'PS3-Belabo — Workshop'],
    prs:    ['PRS-Kribi — Chemical Shed', 'PRS-Kribi — Offshore Support'],
    fso:    ['FSO Deck Storage', 'FSO Chemical Locker A', 'FSO Chemical Locker B'],
    warehouse: ['Main Warehouse', 'Bulk Zone', 'Hazardous Materials Area'],
    other:  ['Specify location below']
  };

  const mfrData = {
    sigma:    { email: 'orders@sigmaaldrich.com',    phone: '+49 89 6791-0',      addr: 'Taufkirchen, Germany' },
    total:    { email: 'chemicals@totalenergies.com', phone: '+33 1 47 44 45 46', addr: 'Paris, France' },
    brenntag: { email: 'chad@brenntag.com',          phone: '+235 22 52 34 00',   addr: "N'Djamena, Chad" },
    shell:    { email: 'chemicals@shell.com',        phone: '+31 70 377 9111',    addr: 'The Hague, Netherlands' },
    castrol:  { email: 'industrial@castrol.com',     phone: '+44 1753 511 521',   addr: 'Swindon, UK' }
  };

  let state = {
    page: 'dashboard',
    role: 'ga',
    lang: 'en',
    theme: 'light',
    density: 'comfortable',
    accent: 'red',
    nav: 'expanded',
    tweaksOpen: false
  };

  // Lazy-render registry: modules register a renderer keyed by page id.
  // The renderer runs the first time goPage(id) is called.
  const lazyRenderers = {};
  const renderedPages = {};
  function registerLazy(pageId, fn) {
    lazyRenderers[pageId] = fn;
  }
  function triggerLazy(pageId) {
    if (renderedPages[pageId]) return;
    const fn = lazyRenderers[pageId];
    if (fn) {
      renderedPages[pageId] = true;
      try { fn(); } catch (e) { console.warn('lazy render failed for', pageId, e); }
    }
  }

  /* ====== INIT ====== */
  function init() {
    TPCIconHydrate(document);
    bindNav();
    bindTopbar();
    bindRoleSwitch();
    bindFormHelpers();
    bindTweaks();
    applyState();
    applyLang();
  }

  /* ====== PAGE NAV ====== */
  function bindNav() {
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', e => {
        const page = el.getAttribute('data-page');
        goPage(page);
      });
    });
  }

  function goPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pg = document.getElementById('page-' + page);
    if (pg) pg.classList.add('active');
    state.page = page;
    document.querySelectorAll('.nav-item[data-page]').forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-page') === page);
    });
    updateBreadcrumb(page);
    // Lazy: render the module the first time we visit its page
    triggerLazy(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function updateBreadcrumb(id) {
    const bc = document.getElementById('breadcrumb');
    if (!bc) return;
    const trail = {
      dashboard:   [['nav.dashboard', null]],
      chemical:    [['nav.dashboard','dashboard'], ['nav.chemical', null]],
      'new-chemical': [['nav.dashboard','dashboard'], ['nav.chemical','chemical'], ['page.newchem.title', null]],
      'master-sheet': [['nav.dashboard','dashboard'], ['nav.chemical','chemical'], ['Master Sheet', null]],
      cash:        [['nav.dashboard','dashboard'], ['nav.cash', null]],
      'new-cash':  [['nav.dashboard','dashboard'], ['nav.cash','cash'], ['New advance', null]],
      'my-advances': [['nav.dashboard','dashboard'], ['nav.cash','cash'], ['My advances', null]],
      reconciliation: [['nav.dashboard','dashboard'], ['nav.cash','cash'], ['Reconciliation', null]],
      expense:     [['nav.dashboard','dashboard'], ['nav.expense', null]],
      'new-expense': [['nav.dashboard','dashboard'], ['nav.expense','expense'], ['New expense', null]],
      escort:      [['nav.dashboard','dashboard'], ['nav.security', null]],
      'new-escort': [['nav.dashboard','dashboard'], ['nav.security','escort'], ['Request escort', null]],
      requests:    [['nav.dashboard','dashboard'], ['nav.requests', null]],
      users:       [['nav.dashboard','dashboard'], ['nav.users', null]],
      approvals:   [['nav.dashboard','dashboard'], ['nav.approvals', null]],
      settings:    [['nav.dashboard','dashboard'], ['nav.settings', null]]
    }[id] || [['nav.dashboard', null]];

    bc.innerHTML = trail.map((node, i) => {
      const [key, target] = node;
      const text = t(key);
      const sep = i < trail.length - 1 ? '<span class="sep" data-icon="chevron-right"></span>' : '';
      if (target) return `<span class="crumb" data-page="${target}">${text}</span>${sep}`;
      return `<span class="current">${text}</span>${sep}`;
    }).join('');

    TPCIconHydrate(bc);
    bc.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', () => goPage(el.getAttribute('data-page')));
    });
  }

  /* ====== TOPBAR ====== */
  function bindTopbar() {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) navToggle.addEventListener('click', () => {
      state.nav = state.nav === 'expanded' ? 'collapsed' : 'expanded';
      document.querySelector('.app').setAttribute('data-nav', state.nav);
    });
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.addEventListener('click', () => {
      state.lang = state.lang === 'en' ? 'fr' : 'en';
      applyLang();
    });
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      applyState();
    });
    const tweaksBtn = document.getElementById('tweaks-btn');
    if (tweaksBtn) tweaksBtn.addEventListener('click', () => {
      state.tweaksOpen = !state.tweaksOpen;
      document.getElementById('tweaks-panel').classList.toggle('open', state.tweaksOpen);
    });
  }

  /* ====== ROLE ====== */
  function bindRoleSwitch() {
    const sel = document.getElementById('role-select');
    if (sel) sel.addEventListener('change', () => switchRole(sel.value));
  }

  function switchRole(rid) {
    state.role = rid;
    const r = roleConfig[rid];
    document.getElementById('user-avatar').textContent = r.av;
    document.getElementById('user-name').textContent = r.name;
    document.getElementById('user-role').textContent = state.lang === 'fr' ? r.badgeFr : r.badge;
    ['nav-users', 'nav-approvals', 'nav-settings'].forEach(nid => {
      const el = document.getElementById(nid);
      if (el) el.style.display = r.hidden.includes(nid) ? 'none' : 'flex';
    });
    const banner = document.getElementById('access-banner');
    if (banner) banner.style.display = r.denied ? 'flex' : 'none';
    toast(`${state.lang === 'fr' ? 'Rôle' : 'Role'} → ${state.lang === 'fr' ? r.badgeFr : r.badge}`);
  }

  /* ====== FORM HELPERS ====== */
  function bindFormHelpers() {
    const mfr = document.getElementById('mfr-select');
    if (mfr) mfr.addEventListener('change', () => {
      const m = mfrData[mfr.value] || { email: '', phone: '', addr: '' };
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      set('mfr-email', m.email);
      set('mfr-phone', m.phone);
      set('mfr-addr', m.addr);
      updateSummary();
    });
    const aou = document.getElementById('aou-select');
    if (aou) aou.addEventListener('change', () => {
      const sel = document.getElementById('storage-select');
      if (!sel) return;
      sel.innerHTML = '<option value="">' + (state.lang === 'fr' ? 'Choisir un lieu…' : 'Select a location…') + '</option>';
      (storageMap[aou.value] || []).forEach(loc => {
        const opt = document.createElement('option');
        opt.textContent = loc;
        sel.appendChild(opt);
      });
      updateSummary();
    });
    document.querySelectorAll('[data-summary]').forEach(el => {
      el.addEventListener('input', updateSummary);
      el.addEventListener('change', updateSummary);
    });
    const submit = document.getElementById('form-submit');
    if (submit) submit.addEventListener('click', e => {
      e.preventDefault();
      toast(state.lang === 'fr' ? '✓ Demande soumise — Routage vers réviseur HSE' : '✓ Request submitted — Routing to HSE reviewer');
      setTimeout(() => goPage('chemical'), 1200);
    });
    const saveDraft = document.getElementById('form-draft');
    if (saveDraft) saveDraft.addEventListener('click', e => {
      e.preventDefault();
      toast(state.lang === 'fr' ? '✓ Brouillon enregistré' : '✓ Draft saved');
    });
  }

  function updateSummary() {
    const get = id => (document.getElementById(id) || {}).value || '';
    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (v) { el.textContent = v; el.classList.remove('empty'); }
      else { el.textContent = state.lang === 'fr' ? 'Non renseigné' : 'Not set'; el.classList.add('empty'); }
    };
    setVal('sum-name', get('chem-name'));
    setVal('sum-use',  document.getElementById('chem-use')?.selectedOptions[0]?.text);
    setVal('sum-mfr',  document.getElementById('mfr-select')?.selectedOptions[0]?.text);
    setVal('sum-site', document.getElementById('aou-select')?.selectedOptions[0]?.text);
  }

  /* ====== TWEAKS ====== */
  function bindTweaks() {
    document.querySelectorAll('[data-tweak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-tweak');
        const val = btn.getAttribute('data-val');
        state[key] = val;
        applyState();
        // update group active
        btn.parentElement.querySelectorAll('[data-tweak]').forEach(s => s.classList.toggle('active', s === btn));
      });
    });
  }

  function applyState() {
    const html = document.documentElement;
    html.setAttribute('data-theme', state.theme);
    html.setAttribute('data-density', state.density);
    html.setAttribute('data-accent', state.accent);
    const app = document.querySelector('.app');
    if (app) app.setAttribute('data-nav', state.nav);
    // theme icon
    const tBtn = document.getElementById('theme-btn');
    if (tBtn) {
      tBtn.innerHTML = '';
      tBtn.setAttribute('data-icon', state.theme === 'light' ? 'moon' : 'sun');
      delete tBtn.dataset.iconRendered;
      TPCIconHydrate(tBtn);
    }
  }

  /* ====== I18N ====== */
  function t(key) {
    return (i18n[state.lang] && i18n[state.lang][key]) || (i18n.en[key]) || key;
  }

  function applyLang() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-t]').forEach(el => {
      el.textContent = t(el.getAttribute('data-t'));
    });
    document.querySelectorAll('[data-tph]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-tph'));
    });
    document.getElementById('lang-btn').textContent = state.lang.toUpperCase();
    switchRole(state.role); // refresh role label
    updateBreadcrumb(state.page);
  }

  /* ====== TOAST ====== */
  let toastTimer;
  function toast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.querySelector('.toast-msg').textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ====== APPROVAL ACTIONS ====== */
  function bindApprovalRows() {
    document.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-approve');
      const row = b.closest('tr');
      if (row) row.style.transition = 'opacity 0.3s'; row.style.opacity = '0';
      setTimeout(() => row.remove(), 300);
      toast(`✓ ${state.lang === 'fr' ? 'Approuvé' : 'Approved'} — ${id}`);
    }));
    document.querySelectorAll('[data-reject]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-reject');
      toast(`✕ ${state.lang === 'fr' ? 'Rejeté' : 'Rejected'} — ${id}`);
    }));
  }

  return { init, goPage, switchRole, toast, bindApprovalRows, registerLazy, triggerLazy };
})();

// Expose to other modules (top-level `const` doesn't attach to window in classic scripts)
window.TPC = TPC;

// DOMContentLoaded may have already fired when loaded dynamically via React useEffect
const _initApp = () => { TPC.init(); TPC.bindApprovalRows(); };
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _initApp);
} else {
  _initApp();
}
