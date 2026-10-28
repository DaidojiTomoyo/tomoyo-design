import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Explicit URL prefixes win; unprefixed visits follow Accept-Language.
  localeDetection: true,
  localeCookie: false,
  // Metadata owns canonical language links, including zh-Hans and clean query-free URLs.
  alternateLinks: false,
});
