import {
  getDefaultPromptLocale,
  isPromptLocale,
  stripLocalePrefix,
  type UiLocale,
} from '../../i18n/config';

/** Keep the output language fixed when the interface language changes. */
export function languageLocation(
  pathname: string,
  query: string,
  hash: string,
  currentLocale: UiLocale,
) {
  const params = new URLSearchParams(query);
  const prompt = params.get('prompt');
  if (!prompt || !isPromptLocale(prompt)) {
    params.set('prompt', getDefaultPromptLocale(currentLocale));
  }
  const route = stripLocalePrefix(pathname) || '/';
  return `${route}?${params.toString()}${hash.startsWith('#') ? hash : ''}`;
}
