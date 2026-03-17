/* ─────────────────────────────────────────
   Velocity Fund — main.js
   Cursor, scroll reveal, nav active state
───────────────────────────────────────── */

(function () {
  'use strict';

  /* ── CURSOR ── */
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');

  if (cur && ring) {
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top  = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
        ring.style.opacity   = '.8';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.opacity   = '.35';
      });
    });
  }

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

})();
