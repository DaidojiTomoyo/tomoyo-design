import type { EffectSpec } from '@/content/effects/schema';
export type PreviewFrame = {
  opacity: string;
  transform: string;
  boxShadow: string;
  backgroundColor: string;
  backdropFilter: string;
  filter: string;
};
export function readFrame(surface: HTMLElement): PreviewFrame {
  const css = getComputedStyle(surface);
  return {
    opacity: css.opacity,
    transform: css.transform,
    boxShadow: css.boxShadow,
    backgroundColor: css.backgroundColor,
    backdropFilter: css.backdropFilter,
    filter: css.filter,
  };
}
export function restingFrame(t: EffectSpec, lifted: boolean): PreviewFrame {
  const glass = t.id === 'frosted-glass' && CSS.supports('backdrop-filter', 'blur(1px)');
  return {
    opacity: '1',
    transform:
      lifted && t.id === 'hover-lift'
        ? `translateY(-${t.distance}px) scale(${t.scale}) rotate(${t.rotation}deg)`
        : 'translateY(0) scale(1) rotate(0deg)',
    boxShadow: lifted ? t.liftedShadow : t.restingShadow,
    backgroundColor: glass ? t.glassSurface : '#f7e8d8',
    backdropFilter: glass ? `blur(${t.blur}px) saturate(${t.saturation})` : 'blur(0px) saturate(1)',
    filter: 'blur(0px)',
  };
}
export function replayFrames(t: EffectSpec, start: PreviewFrame, end: PreviewFrame) {
  if (t.id === 'hover-lift') {
    const up = {
      ...end,
      transform: `translateY(-${t.distance}px) scale(${t.scale}) rotate(${t.rotation}deg)`,
      boxShadow: t.liftedShadow,
    };
    return {
      frames: [
        { ...start, offset: 0, easing: t.easing },
        { ...up, offset: 0.25, easing: 'linear' },
        { ...up, offset: 0.65, easing: t.easing },
        { ...end, offset: 1 },
      ],
      duration: t.duration * 4,
      easing: 'linear',
    };
  }
  const reset = t.id === 'soft-reveal' ? t.revealResetDuration : t.glassResetDuration;
  const delay = t.id === 'soft-reveal' ? t.delay : 0;
  const duration = reset + delay + (t.id === 'soft-reveal' ? t.duration : t.glassDuration);
  const hidden =
    t.id === 'soft-reveal'
      ? {
          ...end,
          opacity: '0',
          filter: `blur(${t.blur}px)`,
          transform: `translate${t.direction === 'up' || t.direction === 'down' ? 'Y' : 'X'}(${t.direction === 'down' || t.direction === 'right' ? '-' : ''}${t.distance}px) scale(${t.startScale})`,
        }
      : { ...end, backgroundColor: '#f7e8d8', backdropFilter: 'blur(0px) saturate(1)' };
  return {
    frames: [
      { ...start, offset: 0, easing: 'ease-in' },
      { ...hidden, offset: reset / duration, easing: delay ? 'linear' : t.easing },
      ...(delay ? [{ ...hidden, offset: (reset + delay) / duration, easing: t.easing }] : []),
      { ...end, offset: 1 },
    ],
    duration,
    easing: 'linear',
  };
}
