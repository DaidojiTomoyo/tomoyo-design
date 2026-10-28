'use client';
import './styles/listing.css';
import './styles/states.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCatalogMessages } from '@/content/catalog';
import { isLocale } from '@/content/locales';

function useCatalogLocale() {
  const params = useParams();
  return typeof params.locale === 'string' && isLocale(params.locale) ? params.locale : 'en';
}
export function CatalogNotFound() {
  const locale = useCatalogLocale();
  const t = getCatalogMessages(locale);
  return (
    <section className="catalog-empty">
      <h1>{t.notFound}</h1>
      <p>{t.notFoundHelp}</p>
      <Link className="catalog-button" href={`/${locale}/explore`}>
        {t.all}
      </Link>
    </section>
  );
}
export function CatalogError({ reset }: { reset: () => void }) {
  const t = getCatalogMessages(useCatalogLocale());
  return (
    <section className="catalog-empty" role="alert">
      <h1>{t.error}</h1>
      <p>{t.errorHelp}</p>
      <button className="catalog-button" type="button" onClick={reset}>
        {t.retryPage}
      </button>
    </section>
  );
}
export function CatalogLoading() {
  const locale = useCatalogLocale();
  return (
    <div
      className="catalog-loading"
      aria-busy="true"
      aria-label={locale === 'zh' ? '正在加载效果' : 'Loading effects'}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
