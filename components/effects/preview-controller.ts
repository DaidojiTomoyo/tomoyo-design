import type { CardEffectSpec as EffectSpec } from '@/content/effects/schema';
import { readFrame, restingFrame, replayFrames } from './preview-frames';

let deactivateCurrent: (() => void) | undefined;
export function createPreviewController(
  button: HTMLButtonElement,
  surface: HTMLElement,
  initial: EffectSpec,
  onPlaying: (playing: boolean) => void,
) {
  let spec = initial;
  let animation: Animation | undefined;
  let playing = false;
  let hovered = false;
  let focused = false;
  let replayTimer: ReturnType<typeof setTimeout> | undefined;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const target = () =>
    restingFrame(spec, spec.id === 'hover-lift' && (hovered || focused) && !reduced.matches);
  function cancel() {
    if (animation) animation.onfinish = null;
    animation?.cancel();
    animation = undefined;
    if (playing) onPlaying(false);
    playing = false;
  }
  function reset() {
    clearTimeout(replayTimer);
    cancel();
    hovered = false;
    focused = false;
    Object.assign(surface.style, target());
  }
  function activate() {
    if (deactivateCurrent !== reset) deactivateCurrent?.();
    deactivateCurrent = reset;
  }
  function settle() {
    const start = readFrame(surface);
    cancel();
    const end = target();
    Object.assign(surface.style, end);
    if (reduced.matches || document.hidden) return;
    animation = surface.animate([start, end], {
      duration: spec.id === 'frosted-glass' ? spec.glassDuration : spec.duration,
      easing: spec.easing,
    });
  }
  function replay() {
    if (playing) return;
    activate();
    const start = readFrame(surface);
    cancel();
    const end = target();
    Object.assign(surface.style, end);
    if (reduced.matches || document.hidden) return;
    playing = true;
    onPlaying(true);
    const { frames, ...timing } = replayFrames(spec, start, end);
    animation = surface.animate(frames, timing);
    animation.onfinish = () => {
      settle();
    };
  }
  function enter() {
    if (!fine.matches) return;
    activate();
    hovered = true;
    if (spec.id !== 'hover-lift') replay();
    else if (!playing) settle();
  }
  function leave() {
    hovered = false;
    if (!playing) settle();
  }
  function focus() {
    focused = button.matches(':focus-visible');
    if (!focused) return;
    activate();
    if (spec.id !== 'hover-lift') replay();
    else if (!playing) settle();
  }
  function blur() {
    focused = false;
    if (!playing) settle();
  }
  function visibility() {
    if (document.hidden) reset();
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) reset();
  });
  observer.observe(button);
  button.addEventListener('pointerenter', enter);
  button.addEventListener('pointerleave', leave);
  button.addEventListener('focus', focus);
  button.addEventListener('blur', blur);
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', visibility);
  Object.assign(surface.style, target());
  return {
    replay,
    sync(next: EffectSpec) {
      if (JSON.stringify(next) === JSON.stringify(spec)) return;
      clearTimeout(replayTimer);
      spec = next;
      settle();
      if (spec.id !== 'frosted-glass' && !reduced.matches && !document.hidden)
        replayTimer = setTimeout(replay, 180);
    },
    destroy() {
      clearTimeout(replayTimer);
      cancel();
      observer.disconnect();
      if (deactivateCurrent === reset) deactivateCurrent = undefined;
      button.removeEventListener('pointerenter', enter);
      button.removeEventListener('pointerleave', leave);
      button.removeEventListener('focus', focus);
      button.removeEventListener('blur', blur);
      reduced.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', visibility);
    },
  };
}
