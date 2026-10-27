import './localized-text.css';
import { ViewTransition, type ReactElement } from 'react';
import type { Locale } from '@/content/locales';
import type { MotionDirection } from '@/content/motion-studies';

/** Only text participates; artwork and rapidly clicked controls remain live. */
export function LocalizedText({
  id,
  locale,
  direction = 'press',
  children,
}: {
  id: string;
  locale: Locale;
  direction?: MotionDirection;
  children: ReactElement;
}) {
  const transition = { 'locale-change': `locale-${direction}`, default: 'none' };
  return (
    <ViewTransition
      key={locale}
      name={`copy-${id}`}
      default="none"
      share={transition}
      update={transition}
      enter={transition}
      exit={transition}
    >
      {children}
    </ViewTransition>
  );
}
