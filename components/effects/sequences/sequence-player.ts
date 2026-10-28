import type { SequenceTrack } from './sequence-frames';

const read = (element: Element) => {
  const style = getComputedStyle(element);
  return {
    opacity: style.opacity,
    transform: style.transform,
    filter: style.filter,
    clipPath: style.clipPath,
  };
};

export function createSequencePlayer(root: HTMLElement, ease: string) {
  const running = new Map<Animation, HTMLElement>();
  function animate(
    element: HTMLElement,
    frames: Keyframe[],
    duration: number,
    delay = 0,
    easing = ease,
  ) {
    const animation = element.animate(frames, { duration, delay, fill: 'both', easing });
    running.set(animation, element);
    return animation;
  }
  function cancel(soft = false) {
    const frames = soft
      ? new Map([...running.values()].map((element) => [element, read(element)]))
      : null;
    for (const animation of running.keys()) animation.cancel();
    running.clear();
    frames?.forEach((start, element) => {
      const animation = animate(element, [start, read(element)], 140);
      void animation.finished.then(
        () => {
          running.delete(animation);
          animation.cancel();
        },
        () => {},
      );
    });
  }
  return {
    cancel,
    pause() {
      running.forEach((_, animation) => animation.pause());
    },
    resume() {
      running.forEach((_, animation) => animation.play());
    },
    async play(tracks: SequenceTrack[]) {
      const batch = tracks.flatMap((track) =>
        [...root.querySelectorAll<HTMLElement>(`[data-sequence="${track.target}"]`)].map(
          (element) => animate(element, track.frames, track.duration, track.delay, track.easing),
        ),
      );
      await Promise.allSettled(batch.map((animation) => animation.finished));
      for (const animation of batch) {
        running.delete(animation);
        animation.cancel();
      }
    },
    scroll(element: HTMLElement, frames: Keyframe[], duration: number, delay = 0) {
      const animation = animate(element, frames, duration, delay);
      void animation.finished.then(
        () => {
          running.delete(animation);
          animation.cancel();
        },
        () => {},
      );
    },
  };
}
