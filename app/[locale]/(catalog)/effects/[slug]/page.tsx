import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getEffect } from '@/content/effects/registry';
import { effectIds, isEffectId } from '@/content/effects/schema';
import { EffectDetailPage } from '@/features/effect-detail/effect-detail-page';
import { catalogMetadata } from '@/lib/effects/metadata';
import { serializeQuery, type RouteQuery } from '@/lib/navigation/query';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<RouteQuery>;
};
export const dynamicParams = false;
export function generateStaticParams() {
  return effectIds.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isEffectId(slug)) notFound();
  const effect = getEffect(slug);
  return catalogMetadata(
    locale,
    `/effects/${slug}`,
    effect.name[locale],
    effect.description[locale],
  );
}
export default async function EffectPage({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isEffectId(slug)) notFound();
  return (
    <EffectDetailPage
      key={slug}
      id={slug}
      locale={locale}
      initialQuery={serializeQuery(await searchParams)}
    />
  );
}
