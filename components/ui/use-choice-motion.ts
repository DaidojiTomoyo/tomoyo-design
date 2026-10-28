'use client';

import { useLayoutEffect, useRef } from 'react';

type ChoiceBox = { left: number; top: number; width: number; height: number };

function clipBox(box: ChoiceBox, width: number, height: number) {
  return `inset(${box.top}px ${width - box.left - box.width}px ${height - box.top - box.height}px ${box.left}px round 4px)`;
}

export function useChoiceMotion() {
  const groupRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const syncRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    const highlight = highlightRef.current;
    if (!group || !highlight) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    let previousBox: ChoiceBox | undefined;
    let previousValue: string | null | undefined;
    let previousClip = '';

    function cancel() {
      if (animation) animation.onfinish = null;
      animation?.cancel();
      animation = undefined;
    }

    function sync(animateSelection: boolean, force = false) {
      if (!group || !highlight) return;
      const input = group.querySelector<HTMLInputElement>('input:checked');
      const option = input?.closest('label');
      const bounds = group.getBoundingClientRect();
      const optionBounds = option?.getBoundingClientRect();
      const value = input?.value ?? null;
      const box: ChoiceBox = optionBounds
        ? {
            left: optionBounds.left - bounds.left,
            top: optionBounds.top - bounds.top,
            width: optionBounds.width,
            height: optionBounds.height,
          }
        : {
            left: previousBox ? previousBox.left + previousBox.width / 2 : bounds.width / 2,
            top: 3,
            width: 0,
            height: Math.max(0, bounds.height - 6),
          };
      const end = clipBox(box, bounds.width, bounds.height);
      if (!force && end === previousClip && value === previousValue) return;

      // Sample before cancelling so an interrupted press continues from the visible ink.
      const start = getComputedStyle(highlight).clipPath;
      const changed = previousValue !== undefined && previousValue !== value;
      cancel();
      highlight.style.clipPath = end;
      group.dataset.motionReady = 'true';
      previousBox = box;
      previousValue = value;
      previousClip = end;

      if (!animateSelection || !changed || reduced.matches || document.hidden) return;

      // One easing over the entire path: separate eased segments stop and restart midway.
      animation = highlight.animate([{ clipPath: start }, { clipPath: end }], {
        duration: value === null ? 180 : 240,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      });
      animation.onfinish = () => {
        animation = undefined;
      };
    }

    const settle = () => sync(false, true);
    const observer = new ResizeObserver(() => sync(false));
    observer.observe(group);
    reduced.addEventListener('change', settle);
    document.addEventListener('visibilitychange', settle);
    syncRef.current = () => sync(true);
    sync(false);

    return () => {
      cancel();
      observer.disconnect();
      reduced.removeEventListener('change', settle);
      document.removeEventListener('visibilitychange', settle);
      syncRef.current = null;
      delete group.dataset.motionReady;
    };
  }, []);

  useLayoutEffect(() => {
    syncRef.current?.();
  });

  return { groupRef, highlightRef };
}
