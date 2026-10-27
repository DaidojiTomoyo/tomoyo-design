import { studyMotion as t, type MotionDirection } from '@/content/motion-studies';
import type { MotionRuntime } from './animation-runtime';

export async function playPageEntry(
  root: HTMLElement,
  direction: MotionDirection,
  runtime: MotionRuntime,
) {
  const { animate, arrival } = runtime;
  const intro = root.querySelector<HTMLElement>('.motion-intro');
  const sample = root.querySelector<HTMLElement>('.sample-arrival');
  const duration = direction === 'coast' ? t.exposure : direction === 'type' ? t.type : t.print;
  const exitFrames =
    direction === 'press'
      ? [
          { opacity: 1, clipPath: 'inset(0)' },
          { opacity: 1, clipPath: 'inset(0 0 0 100%)' },
        ]
      : direction === 'type'
        ? [
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-24%)' },
          ]
        : [
            { opacity: 1, clipPath: 'inset(0)' },
            { opacity: 0, clipPath: 'inset(42% 0 42% 0)' },
          ];
  animate(intro, exitFrames, duration, 0, arrival);
  const delay = 200;
  const sampleFrames =
    direction === 'press'
      ? [
          { opacity: 0.2, transform: 'translateY(26px) rotate(-1.5deg) scale(.98)' },
          { opacity: 1, transform: 'translateY(0) rotate(0) scale(1)' },
        ]
      : direction === 'type'
        ? [
            { opacity: 0, clipPath: 'inset(0 0 100% 0)', transform: 'translateX(24px)' },
            { opacity: 1, clipPath: 'inset(0)', transform: 'translateX(0)' },
          ]
        : [
            { opacity: 0, filter: 'blur(5px)', transform: 'scale(1.04)' },
            { opacity: 1, filter: 'blur(0)', transform: 'scale(1)' },
          ];
  animate(sample, sampleFrames, direction === 'coast' ? 800 : 640, delay, arrival);
  if (direction === 'press')
    animate(
      root.querySelector('.ink-pass'),
      [
        { opacity: 1, clipPath: 'inset(0)' },
        { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
      ],
      720,
      delay,
      arrival,
    );
  root.querySelectorAll('.sheet-heading h1, .preset-number').forEach((element, index) => {
    const frames =
      direction === 'type'
        ? [
            { opacity: 0, transform: 'translateY(24px)', clipPath: 'inset(100% 0 0)' },
            { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' },
          ]
        : [
            { opacity: 0.2, clipPath: 'inset(0 100% 0 0)' },
            { opacity: 1, clipPath: 'inset(0)' },
          ];
    animate(element, frames, 520, delay + index * 45, arrival);
  });
  await Promise.allSettled(Array.from(arrival, (animation) => animation.finished));
}
