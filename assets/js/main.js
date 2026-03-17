/* ─────────────────────────────────────────
   Velocity Fund — main.js
   Cursor, scroll reveal, nav active state
───────────────────────────────────────── */

(function () {
  'use strict';

  /* ── CURSOR ── */
  // Custom cursor disabled; default browser cursor is active.
  // The .cursor and .cursor-ring elements are now hidden via CSS.

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ── NAV ACTIVE STATE ── */
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (href === path || (path === '' && href === '') || (path === '/index' && href === '')) {
      link.classList.add('active');
    }
  });

  /* ── APPLY CTA MAILTO (single source of truth) ── */
  const applyMailto = 'mailto:akash@velocity.fund,ross@velocity.fund,andrew@velocity.fund?subject=application%20from%20website&body=Send%20us%20a%20blurb%20about%20what%20your%20company%20does%2C%20who%20the%20founders%20are%2C%20why%20you%20want%20to%20work%20with%20us%2C%20and%20attach%20your%20deck.%20We%20look%20forward%20to%20hearing%20from%20you.';
  document.querySelectorAll('a.apply-mailto').forEach(el => {
    el.setAttribute('href', applyMailto);
  });

})();
