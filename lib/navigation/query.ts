export type RouteQuery = Record<string, string | string[] | undefined>;
export function serializeQuery(query: RouteQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
    else if (value !== undefined) params.set(key, value);
  }
  return params.toString();
}
export function queryInput(params: URLSearchParams): Record<string, unknown> {
  return Object.fromEntries(
    [...new Set(params.keys())].map((key) => [
      key,
      params.getAll(key).length === 1 ? params.get(key) : params.getAll(key),
    ]),
  );
}
export function catalogReturnPath(from: string | null, locale: UiLocale) {
  const route = from ? stripLocalePrefix(from) : '';
  if (
    !from ||
    !isLocale(from.split('/')[1]) ||
    !/^\/explore(?:\/(motion|material|style|layout))?(?:\?[^#]*)?$/.test(route)
  )
    return `/${locale}/explore`;
  return localizedPath(locale, route);
}
import { isLocale, localizedPath, stripLocalePrefix, type UiLocale } from '../../i18n/config';
