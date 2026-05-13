(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fades = document.querySelectorAll('.fade-in');

  if (reduced || !('IntersectionObserver' in window)) {
    fades.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
  );

  fades.forEach((el) => io.observe(el));
})();

// Screenshot carousel: hide drag hint + right fade once user scrolls
(function () {
  const grid = document.querySelector('.screenshot-grid');
  const wrap = document.querySelector('.screenshot-wrap');
  if (!grid || !wrap) return;
  const hint = wrap.querySelector('.screenshot-hint');
  function onScroll() {
    const atEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
    if (hint) hint.classList.toggle('is-hidden', grid.scrollLeft > 10);
    wrap.classList.toggle('is-scrolled-end', atEnd);
  }
  grid.addEventListener('scroll', onScroll, { passive: true });
})();
