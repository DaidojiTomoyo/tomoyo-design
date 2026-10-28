'use client';
import {
  effectQuery,
  resolveEffect,
  type EffectId,
  type ParameterKey,
  type ParameterValue,
} from '@/content/effects/schema';
import { isLocale, type Locale } from '@/content/locales';
import { queryInput } from '@/lib/navigation/query';
import { useQuery, replaceQuery } from '@/lib/navigation/use-query';

export function useEffectConfig(id: EffectId, locale: Locale, initialQuery: string) {
  const params = useQuery(initialQuery);
  const { spec, invalid } = resolveEffect(id, queryInput(params));
  const language = params.get('prompt') ?? locale;
  const promptLocale = isLocale(language) ? language : locale;
  function updateValues(next: ReturnType<typeof resolveEffect>['spec']) {
    const query = effectQuery(next, promptLocale);
    const from = params.get('from');
    if (from) query.set('from', from);
    replaceQuery(query);
  }
  return {
    spec,
    invalid,
    promptLocale,
    from: params.get('from'),
    update(key: ParameterKey, value: ParameterValue) {
      updateValues(resolveEffect(id, { ...spec, [key]: value }).spec);
    },
    applyPreset(values: Record<string, ParameterValue>) {
      updateValues(resolveEffect(id, values).spec);
    },
    reset() {
      updateValues(resolveEffect(id).spec);
    },
    changeLanguage(value: string) {
      if (!isLocale(value)) return;
      const query = new URLSearchParams(params);
      query.set('prompt', value);
      replaceQuery(query);
    },
  };
}
