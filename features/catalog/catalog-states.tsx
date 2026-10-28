'use client';
import './styles/listing.css';
import './styles/states.css';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { defaultLocale, isLocale } from '@/i18n/config';

function useCatalogLocale() {
  const params = useParams();
  return typeof params.locale === 'string' && isLocale(params.locale)
    ? params.locale
    : defaultLocale;
}
export function CatalogNotFound() {
  const locale = useCatalogLocale();
  const t = useTranslations('Common.States');
  return (
    <section className="catalog-empty">
      <h1>{t('notFound')}</h1>
      <p>{t('notFoundHelp')}</p>
      <Link className="catalog-button" href="/explore" locale={locale}>
        {t('all')}
      </Link>
    </section>
  );
}
export function CatalogError({ reset }: { reset: () => void }) {
  const t = useTranslations('Common.States');
  return (
    <section className="catalog-empty" role="alert">
      <h1>{t('error')}</h1>
      <p>{t('errorHelp')}</p>
      <button className="catalog-button" type="button" onClick={reset}>
        {t('retryPage')}
      </button>
    </section>
  );
}
export function CatalogLoading() {
  const t = useTranslations('Common.States');
  return (
    <div className="catalog-loading" aria-busy="true" aria-label={t('loading')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
