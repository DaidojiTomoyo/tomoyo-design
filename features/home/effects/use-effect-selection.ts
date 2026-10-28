'use client';

import { subscribeUrl, readUrl, serverUrl } from '@/lib/navigation/url-state';
import { useSyncExternalStore } from 'react';
import { homeEffects, type EffectId } from '@/content/home-effects';
import { isLocale, type Locale } from '@/content/locales';
import {
  effectQuery,
  resolveEffect,
  type ParameterKey,
  type ParameterValue,
} from '@/content/effects/schema';
import { queryInput } from '@/lib/navigation/query';
import { replaceQuery } from '@/lib/navigation/use-query';

export function useHomeSelection(locale: Locale) {
  const suffix = useSyncExternalStore(subscribeUrl, readUrl, serverUrl);
  const params = new URLSearchParams(suffix.split('#')[0]);
  const selectedId =
    homeEffects.find((effect) => effect.id === params.get('effect'))?.id ?? 'hover-lift';
  const language = params.get('prompt') ?? locale;
  const promptLocale = isLocale(language) ? language : locale;
  const spec = resolveEffect(selectedId, queryInput(params)).spec;
  function update(key: 'effect' | 'prompt', value: EffectId | Locale) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event('tomoyo-selection'));
  }
  return {
    selectedId,
    promptLocale,
    spec,
    selectEffect: (id: EffectId) => {
      const next = effectQuery(resolveEffect(id).spec, promptLocale);
      next.set('effect', id);
      replaceQuery(next);
    },
    updateParameter: (key: ParameterKey, value: ParameterValue) => {
      const next = effectQuery(
        resolveEffect(selectedId, { ...spec, [key]: value }).spec,
        promptLocale,
      );
      next.set('effect', selectedId);
      replaceQuery(next);
    },
    selectPromptLocale: (value: Locale) => update('prompt', value),
  };
}
