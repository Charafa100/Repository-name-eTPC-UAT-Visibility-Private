/* GHS Hazard Pictogram set
   Simplified renderings of the 9 GHS hazard pictograms.
   These are international safety standards (not copyrighted artwork).
*/
(function () {
  // Black silhouettes on white diamond with red border
  const GHS = {
    flame: `<svg viewBox="0 0 24 24"><path d="M12 2c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4-.5 2 .5 3 2 3 1-2-1-5 0-8z" fill="currentColor"/></svg>`,
    skull: `<svg viewBox="0 0 24 24"><path d="M12 2C7 2 4 5 4 10c0 3 1 5 3 6v3h2v-2h2v2h2v-2h2v2h2v-3c2-1 3-3 3-6 0-5-3-8-8-8z" fill="currentColor"/><circle cx="9" cy="10" r="1.5" fill="#fff"/><circle cx="15" cy="10" r="1.5" fill="#fff"/><path d="M11 13l1 2 1-2" stroke="#fff" stroke-width="1" fill="none"/><path d="M3 18l4 2M21 18l-4 2M5 20l4-2M19 20l-4-2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,
    exclamation: `<svg viewBox="0 0 24 24"><path d="M12 3v11" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/></svg>`,
    cylinder: `<svg viewBox="0 0 24 24"><rect x="8" y="6" width="8" height="14" rx="1" fill="currentColor"/><rect x="9" y="3" width="6" height="3" fill="currentColor"/><line x1="10" y1="9" x2="14" y2="9" stroke="#fff" stroke-width="0.8"/><line x1="10" y1="12" x2="14" y2="12" stroke="#fff" stroke-width="0.8"/></svg>`,
    bomb: `<svg viewBox="0 0 24 24"><path d="M12 4l2 4 4-1-2 4 4 2-4 2 2 4-4-1-2 4-2-4-4 1 2-4-4-2 4-2-2-4 4 1z" fill="currentColor"/></svg>`,
    oxidizer: `<svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3c.7 2.5 3 3 3 6a3 3 0 1 1-6 0c0-1.5 1-2.2 1.5-3 0 1.3.5 2 1.5 2 .7-1.5-.7-3 0-5z" fill="currentColor"/></svg>`,
    health: `<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="2.4" fill="currentColor"/><path d="M5 22V13a4 4 0 0 1 8 0v9" fill="currentColor"/><path d="M16 6l1.2 2.4L20 9l-2 1.5.5 2.8L16 12l-2.5 1.3.5-2.8L12 9l2.8-.6z" fill="currentColor"/></svg>`,
    environment: `<svg viewBox="0 0 24 24"><path d="M3 19h18" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M8 4l-2 4 3-1-2 4 2-1-1 3-3-3v9" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/><path d="M13 14c2-2 5-2 7 0 0 0-2 3-5 3-1.5 0-3-1-3-2 .5.5 1 1 2 1l-1-2zM14 13c.5 0 1 .3 1 .7" stroke="currentColor" stroke-width="1" fill="currentColor"/></svg>`,
    corrosion: `<svg viewBox="0 0 24 24"><path d="M3 14l4-6 2 1 2-3 4 6z" fill="currentColor"/><circle cx="6" cy="17" r="0.8" fill="currentColor"/><circle cx="10" cy="18" r="0.8" fill="currentColor"/><path d="M13 6l2 4 4-2-1 3 3 1-3 1 1 2-3-1-1 2-1-2-3 1 1-2-3-1 3-1z" fill="currentColor" opacity="0.4"/><path d="M14 19l2-2 1 1 2-2 1 4z" fill="currentColor"/></svg>`
  };

  const labels = {
    flame: 'Flammable',
    skull: 'Acute toxic',
    exclamation: 'Irritant',
    cylinder: 'Compressed gas',
    bomb: 'Explosive',
    oxidizer: 'Oxidizer',
    health: 'Health hazard',
    environment: 'Environment',
    corrosion: 'Corrosive'
  };

  function ghs(type, size) {
    const svg = GHS[type] || '';
    const cls = size === 'sm' ? 'ghs ghs-sm' : size === 'xs' ? 'ghs ghs-xs' : 'ghs';
    return `<span class="${cls}" title="${labels[type] || ''}">${svg}</span>`;
  }

  function ghsStack(types, size) {
    return `<span class="ghs-stack ${size === 'xs' ? 'tight' : ''}">${types.map(t => ghs(t, size)).join('')}</span>`;
  }

  function hydrate(root) {
    root = root || document;
    root.querySelectorAll('[data-ghs]').forEach(el => {
      if (el.dataset.ghsRendered === '1') return;
      const list = el.getAttribute('data-ghs').split(/\s+/).filter(Boolean);
      const sz = el.getAttribute('data-ghs-size') || '';
      el.innerHTML = list.map(t => ghs(t, sz)).join('');
      // unwrap span.ghs-stack — we just want raw .ghs children
      el.dataset.ghsRendered = '1';
    });
  }

  window.TPCGhs = ghs;
  window.TPCGhsStack = ghsStack;
  window.TPCGhsHydrate = hydrate;
  window.TPCGhsLabels = labels;
})();
