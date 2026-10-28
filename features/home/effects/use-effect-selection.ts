'use client';

import { subscribeUrl, readUrl, serverUrl } from '@/lib/navigation/url-state';
import { useSyncExternalStore } from 'react';
import { homeEffects, type EffectId } from '@/content/home-effects';
import {
  getDefaultPromptLocale,
  isPromptLocale,
  type PromptLocale,
  type UiLocale,
} from '@/i18n/config';
import {
  effectQuery,
  resolveEffect,
  type ParameterKey,
  type ParameterValue,
} from '@/content/effects/schema';
import { queryInput } from '@/lib/navigation/query';
import { replaceQuery } from '@/lib/navigation/use-query';

export function useHomeSelection(locale: UiLocale) {
  const suffix = useSyncExternalStore(subscribeUrl, readUrl, serverUrl);
  const params = new URLSearchParams(suffix.split('#')[0]);
  const selectedId =
    homeEffects.find((effect) => effect.id === params.get('effect'))?.id ?? 'hover-lift';
  const defaultPromptLocale = getDefaultPromptLocale(locale);
  const language = params.get('prompt') ?? defaultPromptLocale;
  const promptLocale = isPromptLocale(language) ? language : defaultPromptLocale;
  const spec = resolveEffect(selectedId, queryInput(params)).spec;
  function update(key: 'effect' | 'prompt', value: EffectId | PromptLocale) {
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
    selectPromptLocale: (value: PromptLocale) => update('prompt', value),
  };
}
