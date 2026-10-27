import { studyMotion as t, type MotionDirection } from '@/content/motion-studies';
import type { MotionRuntime } from './animation-runtime';

export function observeScrollMotion(
  root: HTMLElement,
  direction: MotionDirection,
  reduced: MediaQueryList,
  runtime: MotionRuntime,
) {
  const { animate } = runtime;
  const image = root.querySelector<HTMLImageElement>('.coast-print');
  const guide = root.querySelector<HTMLElement>('.guide-steps');
  let scrollFrame = 0;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reduced.matches) continue;
        const element = entry.target;
        if (element.matches('.category')) {
          const heading = element.querySelector('.category-title');
          const frames =
            direction === 'press'
              ? [
                  { clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-12px)' },
                  { clipPath: 'inset(0)', transform: 'translateX(0)' },
                ]
              : direction === 'type'
                ? [
                    { transform: 'translateY(85%) rotate(3deg)', opacity: 0 },
                    { transform: 'translateY(0) rotate(0)', opacity: 1 },
                  ]
                : [
                    { filter: 'blur(4px)', opacity: 0.3 },
                    { filter: 'blur(0)', opacity: 1 },
                  ];
          animate(heading, frames, t.scroll);
          animate(
            element.querySelector('h2 > span:last-child'),
            [
              { opacity: 0.3, transform: 'translateY(-12px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            400,
            100,
          );
        } else if (element.matches('.guide-intro')) {
          element.querySelectorAll('.guide-title-line').forEach((line, index) =>
            animate(
              line,
              direction === 'type'
                ? [
                    { clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-16px)' },
                    { clipPath: 'inset(0)', transform: 'translateX(0)' },
                  ]
                : [
                    { clipPath: 'inset(100% 0 0)', opacity: 0.4 },
                    { clipPath: 'inset(0)', opacity: 1 },
                  ],
              680,
              index * 85,
            ),
          );
        } else {
          animate(
            element.querySelector('.step-index'),
            [
              {
                opacity: 0.2,
                transform: direction === 'type' ? 'translateY(-18px)' : 'scale(1.28) rotate(-8deg)',
              },
              { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
            ],
            460,
          );
        }
      }
    },
    { threshold: 0.2 },
  );
  root
    .querySelectorAll('.category, .guide-intro, .guide-steps li')
    .forEach((element) => observer.observe(element));

  function scroll() {
    if (scrollFrame || reduced.matches || document.hidden) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const bounds = guide?.getBoundingClientRect();
      const frame = image?.closest('.coast-frame')?.getBoundingClientRect();
      if (bounds)
        root.style.setProperty(
          '--reading-progress',
          String(Math.max(0, Math.min(1, (innerHeight * 0.7 - bounds.top) / bounds.height))),
        );
      if (direction === 'coast' && image && frame && frame.bottom > 0 && frame.top < innerHeight) {
        const progress = Math.max(
          -1,
          Math.min(1, (innerHeight / 2 - frame.top - frame.height / 2) / innerHeight),
        );
        image.style.transform = `scale(1.12) translateY(${progress * -18}px)`;
      }
    });
  }

  function reset() {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    image?.style.removeProperty('transform');
    root.style.removeProperty('--reading-progress');
  }
  window.addEventListener('scroll', scroll, { passive: true });
  window.addEventListener('resize', scroll, { passive: true });
  scroll();
  return {
    refresh: scroll,
    reset,
    destroy() {
      reset();
      observer.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    },
  };
}
