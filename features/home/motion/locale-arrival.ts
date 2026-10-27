import type { MotionDirection } from '@/content/motion-studies';
import type { MotionRuntime } from './animation-runtime';

export function playLocaleArrival(
  root: HTMLElement,
  direction: MotionDirection,
  runtime: MotionRuntime,
) {
  if ('startViewTransition' in document) return;
  const { animate } = runtime;
  root.querySelectorAll('[data-locale-text]').forEach((element) =>
    animate(
      element,
      direction === 'type'
        ? [
            { opacity: 0.4, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ]
        : direction === 'press'
          ? [{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0)' }]
          : [
              { opacity: 0.4, filter: 'blur(3px)' },
              { opacity: 1, filter: 'blur(0)' },
            ],
      300,
    ),
  );
}
