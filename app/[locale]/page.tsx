import { notFound } from 'next/navigation';
import { HomeContent } from '@/features/home/home-page';
import { isLocale } from '@/content/locales';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomeContent locale={locale} />;
}
