import type { SequenceSpec } from '@/content/effects/types';
import { entranceTracks, openingTracks, textTracks } from './sequence-frames';
import { createSequencePlayer } from './sequence-player';
import { waitForSequenceResources } from './sequence-resources';
import { bindSequenceScroll } from './sequence-scroll';

export type SequencePhase = 'idle' | 'preparing' | 'playing' | 'paused' | 'reduced' | 'fallback';
let stopCurrent: (() => void) | undefined;

export function createSequenceController(
  root: HTMLElement,
  initial: SequenceSpec,
  onPhase: (phase: SequencePhase) => void,
  onText: (alternate: boolean) => void,
) {
  let spec = initial;
  let playing = false;
  let paused = false;
  let alternate = false;
  let disposed = false;
  let run = 0;
  let preparation: AbortController | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let scroll: ReturnType<typeof bindSequenceScroll> | undefined;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const player = createSequencePlayer(root, spec.easing);
  const visible = () => {
    const bounds = root.getBoundingClientRect();
    return (
      bounds.bottom > 0 && bounds.top < innerHeight && bounds.right > 0 && bounds.left < innerWidth
    );
  };
  const canMove = () => !disposed && !paused && !reduced.matches && !document.hidden && visible();
  function stop(soft = false) {
    ++run;
    clearTimeout(timer);
    preparation?.abort();
    player.cancel(soft && canMove());
    playing = paused = false;
    if (!disposed) onPhase(reduced.matches ? 'reduced' : 'idle');
  }
  function activate() {
    if (stopCurrent !== stop) stopCurrent?.();
    stopCurrent = stop;
  }
  function bindScroll() {
    scroll?.destroy();
    scroll =
      spec.scene === 'scroll'
        ? bindSequenceScroll(root, spec, canMove, (element, frames, duration, delay) => {
            activate();
            player.scroll(element, frames, duration, delay);
          })
        : undefined;
  }
  async function replay() {
    if (playing || disposed || document.hidden || !visible()) return;
    activate();
    stop();
    if (spec.scene === 'scroll') {
      scroll?.reset();
      return;
    }
    if (reduced.matches) {
      if (spec.scene === 'text-swap') {
        alternate = !alternate;
        onText(alternate);
      }
      return;
    }
    playing = true;
    const ticket = ++run;
    preparation = new AbortController();
    onPhase('preparing');
    const ready = await waitForSequenceResources(root, preparation.signal);
    if (disposed || ticket !== run) return;
    if (!ready) {
      playing = false;
      onPhase('fallback');
      return;
    }
    if (spec.scene === 'text-swap') {
      alternate = !alternate;
      onText(alternate);
    }
    onPhase('playing');
    const tracks =
      spec.scene === 'opening'
        ? openingTracks(spec)
        : spec.scene === 'text-swap'
          ? textTracks(spec, alternate)
          : entranceTracks(spec);
    await player.play(tracks);
    if (disposed || ticket !== run) return;
    playing = paused = false;
    onPhase('idle');
  }
  function preference() {
    stop();
    bindScroll();
  }
  function visibility() {
    if (document.hidden) stop();
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) stop();
  });
  observer.observe(root);
  reduced.addEventListener('change', preference);
  document.addEventListener('visibilitychange', visibility);
  bindScroll();
  if (reduced.matches) onPhase('reduced');
  return {
    replay,
    pause() {
      if (reduced.matches || (!playing && spec.scene !== 'scroll')) return;
      paused = !paused;
      if (paused) player.pause();
      else {
        player.resume();
        scroll?.refresh();
      }
      onPhase(paused ? 'paused' : playing ? 'playing' : 'idle');
    },
    sync(next: SequenceSpec) {
      if (JSON.stringify(next) === JSON.stringify(spec)) return;
      const sceneChanged = spec.scene !== next.scene;
      stop(!sceneChanged);
      spec = next;
      if (sceneChanged) {
        alternate = false;
        onText(false);
      }
      bindScroll();
      if (!sceneChanged && canMove() && spec.scene !== 'scroll')
        timer = setTimeout(() => void replay(), 200);
    },
    destroy() {
      disposed = true;
      stop();
      scroll?.destroy();
      observer.disconnect();
      reduced.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', visibility);
      if (stopCurrent === stop) stopCurrent = undefined;
    },
  };
}
