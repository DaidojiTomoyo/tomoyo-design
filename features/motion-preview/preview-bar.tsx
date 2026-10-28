'use client';

import './preview-bar.css';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { UiLocale } from '@/i18n/config';
import { motionDirections, type MotionDirection } from '@/content/motion-studies';
import { Icon } from '@/components/ui/icon';

export function MotionPreviewBar({
  locale,
  direction,
}: {
  locale: UiLocale;
  direction: MotionDirection;
}) {
  const t = useTranslations('MotionPreview');
  return (
    <aside className="motion-preview-bar" id="top" aria-label={t('label')}>
      <div className="motion-preview-controls">
        <nav aria-label={t('label')}>
          {motionDirections.map((value) => (
            <Link
              href={`/motion-preview/${value}`}
              locale={locale}
              key={value}
              aria-current={value === direction ? 'page' : undefined}
            >
              {t(`names.${value}`)}
            </Link>
          ))}
        </nav>
        <div className="motion-preview-actions">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('tomoyo-intro-replay'))}
          >
            <Icon name="replay" />
            {t('replay')}
          </button>
          <Link href="/" locale={locale}>
            {t('home')}
          </Link>
        </div>
      </div>
      <p>{t(`descriptions.${direction}`)}</p>
      <p className="motion-preview-quiet">{t('quiet')}</p>
    </aside>
  );
}
