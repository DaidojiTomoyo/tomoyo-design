'use client';
import {
  effectQuery,
  resolveEffect,
  type EffectId,
  type ParameterKey,
  type ParameterValue,
} from '@/content/effects/schema';
import { getDefaultPromptLocale, isPromptLocale, type UiLocale } from '@/i18n/config';
import { queryInput } from '@/lib/navigation/query';
import { useQuery, replaceQuery } from '@/lib/navigation/use-query';

export function useEffectConfig(id: EffectId, locale: UiLocale, initialQuery: string) {
  const params = useQuery(initialQuery);
  const { spec, invalid } = resolveEffect(id, queryInput(params));
  const defaultPromptLocale = getDefaultPromptLocale(locale);
  const language = params.get('prompt') ?? defaultPromptLocale;
  const promptLocale = isPromptLocale(language) ? language : defaultPromptLocale;
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
      if (!isPromptLocale(value)) return;
      const query = new URLSearchParams(params);
      query.set('prompt', value);
      replaceQuery(query);
    },
  };
}
