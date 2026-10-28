import './editorial-preview.css';
import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import type { CompositionSpec } from '@/content/effects/schema';
import type { Locale } from '@/i18n/config';
import { SampleImage } from './sample-image';

export function EditorialPreview({
  spec,
  locale,
  compact,
  eager,
}: {
  spec: Extract<CompositionSpec, { id: 'editorial' }>;
  locale: Locale;
  compact: boolean;
  eager: boolean;
}) {
  const t = useTranslations('Composition');
  const style = {
    '--editorial-title-size': `${spec.titleSize}px`,
    '--editorial-body-size': `${spec.bodySize}px`,
    '--editorial-line-height': spec.lineHeight,
    '--editorial-gap': `${spec.columnGap}px`,
    '--editorial-image': `${spec.imageShare}fr`,
    '--editorial-copy': `${100 - spec.imageShare}fr`,
    '--editorial-image-ratio': 100 / spec.imageShare,
    '--editorial-rule': `${spec.ruleWeight}px`,
  } as CSSProperties;
  return (
    <article
      className="editorial-sample"
      data-composition={spec.composition}
      data-face={spec.titleFace}
      style={style}
      lang={locale === 'zh' ? 'zh-Hans' : 'en'}
    >
      <header className="editorial-heading">
        <h2>{t('storyTitle')}</h2>
        <p>{t('storyIntro')}</p>
      </header>
      <div className="editorial-spread">
        <figure>
          <SampleImage eager={eager || !compact} />
          <figcaption>{t('caption')}</figcaption>
        </figure>
        <div className="editorial-copy">
          <p>{t(compact ? 'storyExcerpt' : 'storyBody')}</p>
          {!compact && <p>{t('storyEnding')}</p>}
        </div>
      </div>
      <footer>{t('journal')}</footer>
    </article>
  );
}
