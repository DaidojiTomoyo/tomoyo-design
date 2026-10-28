'use client';
import './styles/listing.css';
import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LocalizedText } from '@/components/motion/localized-text';
import { Icon } from '@/components/ui/icon';
import { SelectField } from '@/components/ui/select-field';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { effects, getCategory, type CategoryId } from '@/content/effects/registry';
import { matchesEffect } from '@/lib/effects/search';
import { useQuery, replaceQuery } from '@/lib/navigation/use-query';
import { EffectCard } from './effect-card';
import { restoreCatalogPosition } from './scroll-position';

export function CatalogPage({
  locale,
  category,
  initialQuery,
}: {
  locale: Locale;
  category?: CategoryId;
  initialQuery: string;
}) {
  const t = useTranslations('Catalog');
  const params = useQuery(initialQuery);
  const pathname = usePathname();
  const query = (params.get('q') ?? '').slice(0, 200);
  const sort = params.get('sort') === 'name' ? 'name' : 'recommended';
  const selectedCategory = category ? getCategory(category) : undefined;
  const results = effects.filter(
    (effect) => (!category || effect.category === category) && matchesEffect(effect, query),
  );
  if (sort === 'name') results.sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale));
  const from = pathname + (params.size ? `?${params}` : '');
  useLayoutEffect(() => {
    restoreCatalogPosition();
  }, [pathname]);
  function update(key: 'q' | 'sort', value: string) {
    const next = new URLSearchParams(params);
    if (value && value !== 'recommended') next.set(key, value);
    else next.delete(key);
    replaceQuery(next);
  }
  return (
    <div data-catalog-page={pathname}>
      <div className="catalog-page-heading" data-route-enter>
        <LocalizedText id="catalog-heading" locale={locale} direction="type">
          <div>
            <h1>{selectedCategory?.name[locale] ?? t('all')}</h1>
            <p>{selectedCategory?.description[locale] ?? t('intro')}</p>
          </div>
        </LocalizedText>
        <label className="catalog-search">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            maxLength={200}
            aria-label={t('search')}
            placeholder={t('placeholder')}
            onChange={(event) => update('q', event.target.value)}
          />
        </label>
      </div>
      <div className="catalog-result-bar">
        <strong role="status" aria-live="polite">
          {t('count', { count: results.length })}
        </strong>
        <label>
          {t('sort')}
          <SelectField
            aria-label={t('sort')}
            value={sort}
            onChange={(event) => update('sort', event.target.value)}
          >
            <option value="recommended">{t('recommended')}</option>
            <option value="name">{t('alphabetical')}</option>
          </SelectField>
        </label>
      </div>
      {query && (
        <div className="catalog-filter">
          <span>{query}</span>
          <button type="button" aria-label={t('clear')} onClick={() => update('q', '')}>
            <Icon name="close" />
          </button>
        </div>
      )}
      {results.length > 0 ? (
        <div
          className="catalog-effect-grid"
          data-route-enter
          data-curated={
            !query && sort === 'recommended' && !category && results.length >= 3
              ? 'true'
              : undefined
          }
        >
          {results.map((effect, index) => (
            <EffectCard
              key={effect.id}
              effect={effect}
              locale={locale}
              from={from}
              eager={index < 3}
            />
          ))}
        </div>
      ) : (
        <section className="catalog-empty" data-route-enter>
          <h2>{t('empty')}</h2>
          <p>{t('emptyHelp')}</p>
          <button type="button" className="catalog-button" onClick={() => update('q', '')}>
            {t('clear')}
            <Icon name="arrow" />
          </button>
        </section>
      )}
      <p className="catalog-note">{t('instruction')}</p>
    </div>
  );
}
