export const locales = ['en', 'zh'] as const;
export type UiLocale = (typeof locales)[number];
export type Locale = UiLocale;
export const defaultLocale: UiLocale = 'en';

// Prompt output languages are a separate product capability from the interface.
export const promptLocales = ['en', 'zh'] as const;
export type PromptLocale = (typeof promptLocales)[number];
export const defaultPromptLocale: PromptLocale = 'en';

export const localeInfo = {
  en: { label: 'English', shortLabel: 'EN', lang: 'en' },
  zh: { label: '简体中文', shortLabel: '中文', lang: 'zh-Hans' },
} satisfies Record<UiLocale, { label: string; shortLabel: string; lang: string }>;

export const isLocale = (value: string): value is UiLocale =>
  locales.some((locale) => locale === value);
export const isPromptLocale = (value: string): value is PromptLocale =>
  promptLocales.some((locale) => locale === value);
export const getDefaultPromptLocale = (locale: UiLocale): PromptLocale =>
  isPromptLocale(locale) ? locale : defaultPromptLocale;

export function stripLocalePrefix(pathname: string) {
  const segment = pathname.split('/')[1];
  return isLocale(segment) ? pathname.slice(segment.length + 1) : pathname;
}

export function localizedPath(locale: UiLocale, pathname: string) {
  const route = stripLocalePrefix(pathname);
  return `/${locale}${route === '/' ? '' : route}`;
}
