// Salvora motion: the plan's detection boxes are plotted one by one, sheet elements are drawn in with a
// pen-plotter sweep, duplicate photos collapse into one inventory line, and stamps land. Static under reduced motion.
export function startMotion() {
  if (typeof window === 'undefined' || window.__svMotion) return;
  window.__svMotion = true;
  const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || typeof IntersectionObserver === 'undefined') return;
  const root = document.documentElement;
  root.classList.add('sv-js');
  setTimeout(() => root.classList.add('sv-plotted'), 250);

  const targets = [...document.querySelectorAll('[data-plot], [data-merge]')];
  const show = (el) => el.classList.add('in');
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), {rootMargin: '0px 0px -8% 0px', threshold: 0.15});
  targets.forEach((el, i) => { el.style.setProperty('--d', `${(i % 6) * 70}ms`); io.observe(el); });
  let settle = 0;
  addEventListener('scroll', () => { clearTimeout(settle); settle = setTimeout(() => targets.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) show(el); }), 150); }, {passive: true});

  // Crosshair coordinates on the plan follow the pointer, like a CAD cursor.
  const plan = document.querySelector('.plan');
  if (plan && matchMedia('(pointer: fine)').matches) {
    // Created on first use, so nothing is added to the server-rendered markup before React hydrates it.
    let tag = null;
    plan.addEventListener('pointermove', (e) => {
      if (!tag) { tag = document.createElement('span'); tag.className = 'xy'; tag.setAttribute('aria-hidden', 'true'); document.body.appendChild(tag); }
      const r = plan.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      plan.style.setProperty('--cx', `${x}px`); plan.style.setProperty('--cy', `${y}px`);
      tag.textContent = `X ${(x / r.width * 24).toFixed(2)}  Y ${(y / r.height * 16).toFixed(2)}`;
      tag.style.left = `${e.clientX + 12}px`; tag.style.top = `${e.clientY + 12}px`;
      plan.classList.add('cursor');
    });
    plan.addEventListener('pointerleave', () => { plan.classList.remove('cursor'); if (tag) tag.style.opacity = '0'; });
    plan.addEventListener('pointerenter', () => { if (tag) tag.style.opacity = '1'; });
  }
}
