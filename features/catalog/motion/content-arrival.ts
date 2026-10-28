const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** The shell and fixed copy bar stay live; only the arriving content moves. */
export function createContentArrival(root: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let animations = new Map<HTMLElement, Animation>();
  let observer: MutationObserver | undefined;

  function cancel() {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    observer?.disconnect();
  }
  function enter(pathname: string, direction: number) {
    observer?.disconnect();
    const play = () => {
      const view = root.querySelector<HTMLElement>('[data-catalog-page]');
      if (!view || view.dataset.catalogPage !== pathname) return false;
      const previous = animations;
      animations = new Map();
      if (!reduced.matches && !document.hidden) {
        view.querySelectorAll<HTMLElement>('[data-route-enter]').forEach((element, index) => {
          // A reused list heading can still be moving after another quick navigation.
          const current =
            previous.get(element)?.playState === 'running' ? getComputedStyle(element) : null;
          const from = current
            ? { transform: current.transform, opacity: current.opacity }
            : {
                transform: `translateX(${direction * (index ? 16 : 8)}px)`,
                opacity: index ? 0.9 : 0.84,
              };
          previous.get(element)?.cancel();
          animations.set(
            element,
            element.animate([from, { transform: 'none', opacity: 1 }], {
              duration: index ? 360 : 280,
              delay: Math.min(index * 25, 50),
              easing,
              fill: 'backwards',
            }),
          );
        });
      }
      previous.forEach((animation) => animation.cancel());
      observer?.disconnect();
      return true;
    };
    if (!play()) {
      // RSC streaming may commit the route before its actual content is available.
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      observer = new MutationObserver(play);
      observer.observe(root, { subtree: true, childList: true });
    }
  }
  const settle = () => {
    if (reduced.matches || document.hidden) cancel();
  };
  reduced.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
  return {
    enter,
    cancel,
    destroy() {
      cancel();
      reduced.removeEventListener('change', settle);
      document.removeEventListener('visibilitychange', settle);
    },
  };
}
