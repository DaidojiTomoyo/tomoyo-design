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
export function catalogReturnPath(from: string | null, locale: 'en' | 'zh') {
  if (!from || !/^\/(en|zh)\/explore(?:\/(motion|material))?(?:\?[^#]*)?$/.test(from))
    return `/${locale}/explore`;
  return from.replace(/^\/(en|zh)/, `/${locale}`);
}
