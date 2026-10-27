import { studyMotion } from '@/content/motion-studies';
import { waitFor } from './animation-runtime';

/** CSS starts at first paint. Hydration joins that timeline instead of replaying it. */
export async function finishOpening(root: HTMLElement, signal: AbortSignal, demo: boolean) {
  const animations = [
    ...root.querySelectorAll('.intro-letter, .intro-rule, .intro-cross, .intro-coast'),
  ].flatMap((element) => element.getAnimations());
  const formation = Promise.allSettled(animations.map((animation) => animation.finished));
  await new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();
    const finish = () => {
      signal.removeEventListener('abort', finish);
      resolve();
    };
    signal.addEventListener('abort', finish, { once: true });
    void formation.then(finish);
  });
  // The extra presentation hold belongs to the explicit demo, not resource loading.
  if (!signal.aborted && demo) await waitFor(studyMotion.opening.hold, signal);
}
