'use client';

import './preview-bar.css';

import Link from 'next/link';
import type { Locale } from '@/content/locales';
import { getMotionStudy, motionDirections, type MotionDirection } from '@/content/motion-studies';
import { Icon } from '@/components/ui/icon';

export function MotionPreviewBar({
  locale,
  direction,
}: {
  locale: Locale;
  direction: MotionDirection;
}) {
  const t = getMotionStudy(locale);
  return (
    <aside className="motion-preview-bar" id="top" aria-label={t.label}>
      <div className="motion-preview-controls">
        <nav aria-label={t.label}>
          {motionDirections.map((value) => (
            <Link
              href={`/${locale}/motion-preview/${value}`}
              key={value}
              aria-current={value === direction ? 'page' : undefined}
            >
              {t.names[value]}
            </Link>
          ))}
        </nav>
        <div className="motion-preview-actions">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('tomoyo-intro-replay'))}
          >
            <Icon name="replay" />
            {t.replay}
          </button>
          <Link href={`/${locale}`}>{t.home}</Link>
        </div>
      </div>
      <p>{t.descriptions[direction]}</p>
      <p className="motion-preview-quiet">{t.quiet}</p>
    </aside>
  );
}
