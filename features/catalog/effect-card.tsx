'use client';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/icon';
import { LocalizedText } from '@/components/motion/localized-text';
import { EffectPreview } from '@/components/effects/effect-preview';
import { getCategory, type EffectEntry } from '@/content/effects/registry';
import { resolveEffect } from '@/content/effects/schema';
import { sequenceDuration } from '@/content/effects/sequence-timing';
import type { Locale } from '@/i18n/config';
import { rememberCatalogPosition } from './scroll-position';
import { useTranslations } from 'next-intl';

export function EffectCard({
  effect,
  locale,
  from,
  eager,
}: {
  effect: EffectEntry;
  locale: Locale;
  from: string;
  eager: boolean;
}) {
  const { spec } = resolveEffect(effect.id);
  const t = useTranslations('Common.Preview');
  const metric =
    spec.id === 'overprint' || spec.id === 'coastal-reveal'
      ? t('sequenceMetric', { duration: (sequenceDuration(spec) / 1000).toFixed(2) })
      : spec.id === 'editorial'
        ? t('editorialMetric', { size: spec.titleSize })
        : spec.id === 'bento-grid'
          ? t('bentoMetric', { columns: spec.columns === 'three-columns' ? 3 : 4, gap: spec.gap })
          : spec.id === 'frosted-glass'
            ? `blur ${spec.blur}px`
            : `${spec.distance}px · ${spec.duration}ms`;
  return (
    <article className="catalog-effect-card" data-effect={effect.id}>
      <EffectPreview spec={spec} locale={locale} compact eager={eager} />
      <Link
        className="catalog-card-link"
        href={`/effects/${effect.id}?${new URLSearchParams({ from })}`}
        onNavigate={rememberCatalogPosition}
      >
        <LocalizedText id={`catalog-card-${effect.id}`} locale={locale} direction="type">
          <div>
            <div className="catalog-card-name">
              <h2>{effect.name[locale]}</h2>
              <Icon name="arrow" />
            </div>
            {locale === 'zh' && (
              <p className="catalog-english" lang="en">
                {effect.name.en}
              </p>
            )}
            <p className="catalog-card-description">{effect.description[locale]}</p>
          </div>
        </LocalizedText>
      </Link>
      <div className="catalog-card-footer">
        <span>{getCategory(effect.category)!.name[locale]}</span>
        <span>{metric}</span>
      </div>
    </article>
  );
}
