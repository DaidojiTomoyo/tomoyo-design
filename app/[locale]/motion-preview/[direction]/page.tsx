import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { HomeContent } from '@/features/home/home-page';
import { MotionPreviewBar } from '@/features/motion-preview/preview-bar';
import { isLocale } from '@/content/locales';
import { isMotionDirection, motionDirections } from '@/content/motion-studies';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamicParams = false;
export function generateStaticParams() {
  return motionDirections.map((direction) => ({ direction }));
}

export default async function MotionPreviewPage({
  params,
}: {
  params: Promise<{ locale: string; direction: string }>;
}) {
  const { locale, direction } = await params;
  if (!isLocale(locale) || !isMotionDirection(direction)) notFound();
  return (
    <>
      <MotionPreviewBar locale={locale} direction={direction} />
      <HomeContent locale={locale} direction={direction} preview />
    </>
  );
}
