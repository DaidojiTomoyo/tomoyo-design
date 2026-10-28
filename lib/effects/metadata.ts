import type { Metadata } from 'next';
import type { Locale } from '@/content/locales';
export function catalogMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title: `${title} | Tomoyo Design`,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, 'zh-Hans': `/zh${path}`, 'x-default': `/en${path}` },
    },
  };
}
