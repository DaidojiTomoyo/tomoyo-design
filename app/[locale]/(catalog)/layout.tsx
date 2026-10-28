import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale } from '@/i18n/config';
import { IntlScope } from '@/components/i18n/intl-scope';
import { CatalogShell } from '@/features/catalog/catalog-shell';

export default async function CatalogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <IntlScope namespaces={['Catalog', 'EffectDetail', 'Controls']}>
      <CatalogShell locale={locale}>{children}</CatalogShell>
    </IntlScope>
  );
}
