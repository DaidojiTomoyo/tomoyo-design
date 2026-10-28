import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale } from '@/content/locales';
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
  return <CatalogShell locale={locale}>{children}</CatalogShell>;
}
