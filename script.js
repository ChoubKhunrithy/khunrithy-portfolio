(() => {
  'use strict';
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav-links');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const links = [...document.querySelectorAll('.links a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
