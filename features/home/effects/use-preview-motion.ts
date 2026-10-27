'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';
import { motionTokens as t, type EffectId } from '@/content/home-effects';

type Frame = {
  opacity: string;
  transform: string;
  boxShadow: string;
  backgroundColor: string;
  backdropFilter: string;
};

function createPreviewMotion(button: HTMLButtonElement, surface: HTMLSpanElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let id: EffectId = 'hover-lift';
  let animation: Animation | undefined;
  let demonstrating = false;
  let hovered = false;
  let focused = false;

  const lifted = () => id === 'hover-lift' && (hovered || focused) && !reduced.matches;
  const frame = (): Frame => {
    const style = getComputedStyle(surface);
    return {
      opacity: style.opacity,
      transform: style.transform,
      boxShadow: style.boxShadow,
      backgroundColor: style.backgroundColor,
      backdropFilter: style.backdropFilter,
    };
  };
  const target = (): Frame => ({
    opacity: '1',
    transform: lifted() ? `translateY(-${t.liftDistance}px)` : 'translateY(0)',
    boxShadow: lifted() ? t.liftedShadow : t.restingShadow,
    backgroundColor:
      id === 'frosted-glass' && CSS.supports('backdrop-filter', 'blur(1px)')
        ? t.glassSurface
        : '#f7e8d8',
    backdropFilter:
      id === 'frosted-glass' && CSS.supports('backdrop-filter', 'blur(1px)')
        ? `blur(${t.glassBlur}px) saturate(${t.glassSaturation})`
        : 'blur(0px) saturate(1)',
  });
  function stop() {
    if (animation) animation.onfinish = null;
    animation?.cancel();
    animation = undefined;
    demonstrating = false;
  }
  function settle() {
    const start = frame();
    stop();
    const end = target();
    Object.assign(surface.style, end);
    if (reduced.matches) return;
    animation = surface.animate([start, end], { duration: t.liftDuration, easing: t.easing });
  }
  function play(next: EffectId, replay = false) {
    // Repeated taps do not restart an in-flight demonstration at its first frame.
    if (next === id && demonstrating) return;
    const start = frame();
    const previous = id;
    stop();
    id = next;
    const end = target();
    Object.assign(surface.style, end);
    if (reduced.matches || document.hidden) return;
    demonstrating = true;
    let frames: Keyframe[] = [start, end];
    let duration: number = t.glassDuration;
    if (id === 'hover-lift') {
      const up = {
        ...end,
        transform: `translateY(-${t.liftDistance}px)`,
        boxShadow: t.liftedShadow,
      };
      frames = [
        { ...start, offset: 0 },
        { ...up, offset: 0.25 },
        { ...up, offset: 0.65 },
        { ...end, offset: 1 },
      ];
      duration = t.liftDuration * 4;
    } else if (id === 'soft-reveal') {
      // An explicit exit preserves continuity before the actual 0→1 entrance.
      duration = t.revealResetDuration + t.revealDuration;
      frames = [
        { ...start, offset: 0, easing: 'ease-in' },
        {
          ...end,
          opacity: 0,
          transform: `translateY(${t.revealDistance}px)`,
          offset: t.revealResetDuration / duration,
          easing: t.easing,
        },
        { ...end, offset: 1 },
      ];
    } else if (replay && previous === id) {
      duration = t.glassResetDuration + t.glassDuration;
      frames = [
        { ...start, offset: 0, easing: 'ease-in-out' },
        {
          ...end,
          backgroundColor: '#f7e8d8',
          backdropFilter: 'blur(0px) saturate(1)',
          offset: t.glassResetDuration / duration,
          easing: t.easing,
        },
        { ...end, offset: 1 },
      ];
    }
    animation = surface.animate(frames, {
      duration,
      easing: id === 'soft-reveal' || (replay && id === 'frosted-glass') ? 'linear' : t.easing,
    });
    animation.onfinish = () => {
      demonstrating = false;
      settle();
    };
  }
  const enter = () => {
    hovered = finePointer.matches;
    if (!demonstrating) settle();
  };
  const leave = () => {
    hovered = false;
    if (!demonstrating) settle();
  };
  const focus = () => {
    focused = button.matches(':focus-visible');
    if (!demonstrating) settle();
  };
  const blur = () => {
    focused = false;
    if (!demonstrating) settle();
  };
  const reset = () => {
    stop();
    Object.assign(surface.style, target());
  };
  const visibility = () => {
    if (document.hidden) reset();
  };
  button.addEventListener('pointerenter', enter);
  button.addEventListener('pointerleave', leave);
  button.addEventListener('focus', focus);
  button.addEventListener('blur', blur);
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', visibility);
  return {
    play,
    sync(next: EffectId) {
      if (next === id) return;
      id = next;
      reset();
    },
    destroy() {
      stop();
      button.removeEventListener('pointerenter', enter);
      button.removeEventListener('pointerleave', leave);
      button.removeEventListener('focus', focus);
      button.removeEventListener('blur', blur);
      reduced.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', visibility);
      surface.removeAttribute('style');
    },
  };
}

export function usePreviewMotion(
  selectedId: EffectId,
  buttonRef: RefObject<HTMLButtonElement | null>,
  surfaceRef: RefObject<HTMLSpanElement | null>,
) {
  const controller = useRef<ReturnType<typeof createPreviewMotion> | null>(null);
  useLayoutEffect(() => {
    if (!buttonRef.current || !surfaceRef.current) return;
    const motion = createPreviewMotion(buttonRef.current, surfaceRef.current);
    controller.current = motion;
    return () => {
      motion.destroy();
      controller.current = null;
    };
  }, [buttonRef, surfaceRef]);
  useLayoutEffect(() => {
    controller.current?.sync(selectedId);
  }, [selectedId]);
  return (id: EffectId, replay = false) => controller.current?.play(id, replay);
}
