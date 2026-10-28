import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { languageAlternates } from '@/i18n/metadata';
export function catalogMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title: `${title} | Tomoyo Design`,
    description,
    alternates: languageAlternates(locale, path),
  };
}
