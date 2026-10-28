import type { SequenceSpec } from '@/content/effects/types';
import { arrivalFrames } from './sequence-frames';

export function bindSequenceScroll(
  root: HTMLElement,
  spec: SequenceSpec,
  canMove: () => boolean,
  animate: (element: HTMLElement, frames: Keyframe[], duration: number, delay?: number) => void,
) {
  const viewport = root.querySelector<HTMLElement>('.sequence-viewport')!;
  const image = root.querySelector<HTMLElement>('[data-sequence="parallax"]');
  const seen = new Set<Element>();
  let frame = 0;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target) || !canMove()) continue;
        seen.add(entry.target);
        const element = entry.target as HTMLElement;
        const index = Number(element.dataset.scrollIndex);
        if (index === 0 && viewport.scrollTop < 1) continue;
        animate(element, arrivalFrames(spec), spec.duration, Math.min(index, 2) * spec.stagger);
      }
    },
    { root: viewport, threshold: 0.2 },
  );
  root.querySelectorAll('[data-scroll-index]').forEach((element) => observer.observe(element));
  function scroll() {
    if (frame || !canMove() || spec.id !== 'coastal-reveal' || !image) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!canMove()) return;
      const range = viewport.scrollHeight - viewport.clientHeight;
      const progress = range > 0 ? Math.max(0, Math.min(1, viewport.scrollTop / range)) : 0.5;
      image.style.transform = `translateY(${(0.5 - progress) * spec.distance}px)`;
    });
  }
  viewport.addEventListener('scroll', scroll, { passive: true });
  scroll();
  return {
    reset() {
      seen.clear();
      viewport.scrollTop = 0;
      scroll();
    },
    refresh() {
      root.querySelectorAll('[data-scroll-index]').forEach((element) => {
        observer.unobserve(element);
        observer.observe(element);
      });
      scroll();
    },
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener('scroll', scroll);
      image?.style.removeProperty('transform');
    },
  };
}
