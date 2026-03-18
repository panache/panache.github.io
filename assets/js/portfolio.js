/* ─────────────────────────────────────────
   Velocity Fund — portfolio.js
   Filter, search, dropdown, render logic
───────────────────────────────────────── */

(function () {
  'use strict';

  /* ── DATA ── */
  const PORTFOLIO = window.PORTFOLIO || [];

  /* ── STATE ── */
  let filters = { fund: 'all', sector: 'all', location: 'all', status: 'all', year: 'all' };
  let searchQ = '';

  /* ── UTILS ── */
  const sectorClass = s => ({
    'SaaS': 'sector-saas', 'AI/ML': 'sector-ai', 'Health Tech': 'sector-health',
    'Deep Tech': 'sector-deeptech', 'Fintech': 'sector-fintech', 'Climate': 'sector-climate',
    'Gaming': 'sector-gaming', 'Consumer': 'sector-consumer'
  }[s] || '');

  /* ── FILTER + SORT ── */
  function getVisible() {
    return PORTFOLIO
      .filter(c => {
        if (filters.fund     !== 'all' && c.fund_display !== filters.fund)            return false;
        if (filters.sector   !== 'all' && c.sector       !== filters.sector)           return false;
        if (filters.location !== 'all' && c.location     !== filters.location)         return false;
        if (filters.status   !== 'all' && c.status       !== filters.status)           return false;
        if (filters.year     !== 'all' && (!c.date || c.date.slice(0,4) !== filters.year)) return false;
        if (searchQ) {
          const q = searchQ.toLowerCase();
          if (![c.display_name, c.founders, c.desc, c.sector].join(' ').toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.fair_value - a.fair_value);
  }

  /* ── CARD TEMPLATE ── */
  function renderCard(c) {
    const domain   = c.website ? c.website.replace(/https?:\/\//, '').replace(/\/$/, '') : '';
    const yearStr  = c.date ? c.date.slice(0, 4) : '';
    const cardContent = `
      <div class="co-card-top">
        <div class="co-card-name">${c.display_name}</div>
        <div class="co-badges">
          <span class="badge ${sectorClass(c.sector)}">${c.sector}</span>
          <span class="badge fund-badge">${c.fund_display}</span>
        </div>
      </div>
      ${c.founders ? `<div class="co-card-founders">${c.founders}</div>` : ''}
      <div class="co-card-desc"><div class="co-card-desc-text">${c.desc}</div></div>
      ${domain ? `<div class="co-website">${domain} ↗</div>` : ''}
      <div class="co-card-bottom">
        <div class="co-card-meta">${[c.round, yearStr].filter(Boolean).join(' · ')}</div>
      </div>`;

    if (c.website) {
      return `<a href="${c.website}" class="co-card" target="_blank" rel="noopener noreferrer">${cardContent}</a>`;
    }

    return `<div class="co-card">${cardContent}</div>`;
  }

  /* ── RENDER ── */
  function render() {
    const visible = getVisible();
    const grid    = document.getElementById('portfolioGrid');
    const countEl = document.getElementById('resultsCount');

    grid.innerHTML = visible.length
      ? visible.map(renderCard).join('')
      : `<div class="empty-state"><p>No companies match your filters.
           <button onclick="clearFilters()">Clear all filters</button></p></div>`;

    countEl.innerHTML = `Showing <strong>${visible.length}</strong> of ${PORTFOLIO.length} companies`;
  }

  /* ── CLEAR ── */
  window.clearFilters = function () {
    filters = { fund: 'all', sector: 'all', location: 'all', status: 'all', year: 'all' };
    searchQ = '';
    document.getElementById('search').value = '';
    document.querySelectorAll('.dropdown-option').forEach(o => o.classList.toggle('active', o.dataset.val === 'all'));
    document.querySelectorAll('.trigger-value').forEach(el => el.textContent = 'All');
    document.querySelectorAll('.dropdown-trigger').forEach(el => el.classList.remove('has-value'));
    render();
  };

  /* ── DROPDOWN TOGGLE ── */
  window.toggleDropdown = function (id) {
    const dd     = document.getElementById(id);
    const isOpen = dd.classList.contains('open');
    document.querySelectorAll('.filter-dropdown.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) dd.classList.add('open');
  };

  document.addEventListener('click', e => {
    if (!e.target.closest('.filter-dropdown')) {
      document.querySelectorAll('.filter-dropdown.open').forEach(el => el.classList.remove('open'));
    }
  });

  /* ── DROPDOWN OPTIONS ── */
  document.querySelectorAll('.dropdown-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const group   = opt.dataset.filter;
      const val     = opt.dataset.val;
      filters[group] = val;

      opt.closest('.dropdown-menu').querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      const trigger = opt.closest('.filter-dropdown').querySelector('.dropdown-trigger');
      const valEl   = opt.closest('.filter-dropdown').querySelector('.trigger-value');
      valEl.textContent = val === 'all' ? 'All' : opt.textContent.replace('✓  ', '').trim();
      trigger.classList.toggle('has-value', val !== 'all');

      opt.closest('.filter-dropdown').classList.remove('open');
      render();
    });
  });

  /* ── SEARCH ── */
  let searchTimeout;
  document.getElementById('search').addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => { searchQ = e.target.value.trim(); render(); }, 150);
  });

  /* ── INIT ── */
  render();

})();
