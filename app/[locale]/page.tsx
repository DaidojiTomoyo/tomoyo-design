import { notFound } from 'next/navigation';
import { HomeContent } from '@/features/home/home-page';
import { isLocale } from '@/i18n/config';
import { IntlScope } from '@/components/i18n/intl-scope';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <IntlScope namespaces={['Home', 'Controls', 'MotionPreview']}>
      <HomeContent locale={locale} />
    </IntlScope>
  );
}
