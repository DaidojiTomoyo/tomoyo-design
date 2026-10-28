import { defaultLocale, locales, localeInfo, localizedPath, type UiLocale } from './config';

export function languageAlternates(locale: UiLocale, path: string) {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      ...Object.fromEntries(
        locales.map((language) => [localeInfo[language].lang, localizedPath(language, path)]),
      ),
      'x-default': localizedPath(defaultLocale, path),
    },
  };
}
