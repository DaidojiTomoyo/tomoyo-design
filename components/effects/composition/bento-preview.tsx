import './bento-preview.css';
import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import type { CompositionSpec } from '@/content/effects/schema';
import type { Locale } from '@/i18n/config';
import { SampleImage } from './sample-image';

export function BentoPreview({
  spec,
  locale,
  compact,
  eager,
}: {
  spec: Extract<CompositionSpec, { id: 'bento-grid' }>;
  locale: Locale;
  compact: boolean;
  eager: boolean;
}) {
  const t = useTranslations('Composition');
  const style = {
    '--bento-columns': spec.columns === 'three-columns' ? 3 : 4,
    '--bento-gap': `${spec.gap}px`,
    '--bento-radius': `${spec.radius}px`,
    '--bento-padding': `${spec.padding}px`,
    '--bento-row-height': `${spec.rowHeight}px`,
    '--bento-align': spec.alignment.slice(6),
  } as CSSProperties;
  return (
    <div
      className="bento-sample"
      data-arrangement={spec.arrangement}
      style={style}
      lang={locale === 'zh' ? 'zh-Hans' : 'en'}
    >
      <article className="bento-tile bento-lead">
        <SampleImage eager={eager || !compact} />
        <div>
          <h2>{t('storyTitle')}</h2>
          {!compact && <p>{t('storyIntro')}</p>}
        </div>
      </article>
      <article className="bento-tile bento-note">
        <h3>{t('bringTitle')}</h3>
        <p>{t(compact ? 'bringExcerpt' : 'bringBody')}</p>
      </article>
      <article className="bento-tile bento-quote">
        <h3>{t(compact ? 'paceShortTitle' : 'paceTitle')}</h3>
        <p>{t(compact ? 'paceExcerpt' : 'paceBody')}</p>
      </article>
      <article className="bento-tile bento-plan">
        <h3>{t('planTitle')}</h3>
        <p>{t(compact ? 'planExcerpt' : 'planBody')}</p>
      </article>
      <article className="bento-tile bento-close">
        <h3>{t('leaveTitle')}</h3>
        <p>{t(compact ? 'leaveExcerpt' : 'leaveBody')}</p>
      </article>
    </div>
  );
}
