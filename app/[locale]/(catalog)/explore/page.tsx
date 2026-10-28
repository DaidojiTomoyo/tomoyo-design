import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getTranslations } from 'next-intl/server';
import { CatalogPage } from '@/features/catalog/catalog-page';
import { catalogMetadata } from '@/lib/effects/metadata';
import { serializeQuery, type RouteQuery } from '@/lib/navigation/query';

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<RouteQuery> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'Catalog' });
  return catalogMetadata(locale, '/explore', t('all'), t('intro'));
}
export default async function ExplorePage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CatalogPage locale={locale} initialQuery={serializeQuery(await searchParams)} />;
}
