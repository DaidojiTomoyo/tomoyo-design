import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { categories, getCategory } from '@/content/effects/registry';
import { CatalogPage } from '@/features/catalog/catalog-page';
import { catalogMetadata } from '@/lib/effects/metadata';
import { serializeQuery, type RouteQuery } from '@/lib/navigation/query';

type Props = {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<RouteQuery>;
};
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map(({ id }) => ({ category: id }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, category: id } = await params;
  const category = getCategory(id);
  if (!isLocale(locale) || !category) notFound();
  return catalogMetadata(
    locale,
    `/explore/${id}`,
    category.name[locale],
    category.description[locale],
  );
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, category: id } = await params;
  const category = getCategory(id);
  if (!isLocale(locale) || !category) notFound();
  return (
    <CatalogPage
      key={category.id}
      locale={locale}
      category={category.id}
      initialQuery={serializeQuery(await searchParams)}
    />
  );
}
