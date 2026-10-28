import type { MetadataRoute } from 'next';
import { locales, localizedPath } from '@/i18n/config';
import { languageAlternates } from '@/i18n/metadata';
import { categories, effects } from '@/content/effects/registry';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/explore',
    ...categories.map(({ id }) => `/explore/${id}`),
    ...effects.map(({ id }) => `/effects/${id}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: new URL(localizedPath(locale, path), siteUrl).href,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(locale, path).languages).map(([language, href]) => [
            language,
            new URL(href, siteUrl).href,
          ]),
        ),
      },
    })),
  );
}
