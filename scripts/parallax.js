(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]')).map((el) => ({
    el,
    rate: parseFloat(el.dataset.parallax) || 0.2,
    parent: el.parentElement,
  }));

  if (!parallaxEls.length) return;

  let ticking = false;

  function update() {
    const vh = window.innerHeight;
    parallaxEls.forEach(({ el, rate, parent }) => {
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = 'translate3d(0,' + (progress * -rate).toFixed(2) + 'px,0)';
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
