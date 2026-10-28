const timing = { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' };

/** Move one selection plate, sampling its actual position when a click interrupts it. */
export function createNavigationIndicator(nav: HTMLElement, marker: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let animation: Animation | undefined;
  let positioned = false;
  let disposed = false;

  function update(animate = true) {
    const selected = nav.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!selected || !nav.getClientRects().length) {
      animation?.cancel();
      marker.hidden = true;
      positioned = false;
      delete nav.dataset.indicatorReady;
      return;
    }
    const before = positioned ? marker.getBoundingClientRect() : null;
    const target = selected.getBoundingClientRect();
    const parent = nav.getBoundingClientRect();
    animation?.cancel();
    Object.assign(marker.style, {
      left: `${target.left - parent.left + nav.scrollLeft}px`,
      top: `${target.top - parent.top + nav.scrollTop}px`,
      width: `${target.width}px`,
      height: `${target.height}px`,
    });
    marker.hidden = false;
    positioned = true;
    nav.dataset.indicatorReady = 'true';
    if (!before || !animate || reduced.matches || document.hidden) return;
    const dx = before.left - target.left;
    const dy = before.top - target.top;
    if (Math.abs(dx) + Math.abs(dy) + Math.abs(before.width - target.width) < 0.5) return;
    animation = marker.animate(
      [
        {
          transform: `translate(${dx}px, ${dy}px) scale(${before.width / target.width}, ${before.height / target.height})`,
        },
        { transform: 'none' },
      ],
      timing,
    );
  }

  const settle = () => update(false);
  const resize = new ResizeObserver(settle);
  resize.observe(nav);
  nav.querySelectorAll('a').forEach((link) => resize.observe(link));
  reduced.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
  document.fonts.ready.then(() => {
    if (!disposed) settle();
  });
  update(false);
  return {
    update,
    destroy() {
      disposed = true;
      animation?.cancel();
      resize.disconnect();
      reduced.removeEventListener('change', settle);
      document.removeEventListener('visibilitychange', settle);
      delete nav.dataset.indicatorReady;
    },
  };
}
