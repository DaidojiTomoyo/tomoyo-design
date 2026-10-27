import { studyMotion as t } from '@/content/motion-studies';

export type MotionRuntime = ReturnType<typeof createMotionRuntime>;
export function createMotionRuntime(reduced: MediaQueryList) {
  const arrival = new Set<Animation>();
  const supporting = new Set<Animation>();
  function animate(
    element: Element | null,
    frames: Keyframe[],
    duration: number,
    delay = 0,
    group = supporting,
  ) {
    if (!element || reduced.matches || document.hidden) return null;
    const animation = element.animate(frames, { duration, delay, easing: t.ease, fill: 'both' });
    group.add(animation);
    void animation.finished.then(
      () => {
        group.delete(animation);
        animation.cancel();
      },
      () => group.delete(animation),
    );
    return animation;
  }
  function cancel(group: Set<Animation>) {
    group.forEach((animation) => animation.cancel());
    group.clear();
  }
  return { animate, cancel, arrival, supporting };
}

export function waitFor(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();
    const finish = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', finish);
      resolve();
    };
    const timer = setTimeout(finish, ms);
    signal.addEventListener('abort', finish, { once: true });
  });
}
