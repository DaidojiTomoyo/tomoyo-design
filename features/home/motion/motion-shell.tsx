'use client';

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import type { UiLocale } from '@/i18n/config';
import { studyMotion, type MotionDirection } from '@/content/motion-studies';
import { createHomeMotion } from './controller';
import { OpeningScreen } from './opening-screen';

const timing = {
  '--loading-delay': `${studyMotion.loading.revealDelay}ms`,
  '--opening-letter': `${studyMotion.opening.letter}ms`,
  '--opening-stagger': `${studyMotion.opening.stagger}ms`,
  '--opening-marks': `${studyMotion.opening.marks}ms`,
  '--opening-coast': `${studyMotion.opening.coast}ms`,
  '--opening-ease': studyMotion.ease,
} as CSSProperties;

export function MotionShell({
  locale,
  direction,
  preview = false,
  children,
}: {
  locale: UiLocale;
  direction: MotionDirection;
  preview?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastLocale = useRef(locale);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const languageChanged = lastLocale.current !== locale;
    lastLocale.current = locale;
    const controller = createHomeMotion(ref.current, direction, languageChanged, preview);
    return () => controller.destroy();
  }, [direction, locale, preview]);

  return (
    <div
      className="site-shell motion-study"
      id={preview ? undefined : 'top'}
      data-direction={direction}
      data-motion-surface={preview ? 'preview' : 'home'}
      data-motion-phase="checking"
      style={timing}
      ref={ref}
    >
      <OpeningScreen direction={direction} preview={preview} />
      <div className="motion-content">{children}</div>
    </div>
  );
}
