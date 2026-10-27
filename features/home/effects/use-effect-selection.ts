'use client';

import { subscribeUrl, readUrl, serverUrl } from '@/lib/navigation/url-state';
import { useSyncExternalStore } from 'react';
import { homeEffects, type EffectId } from '@/content/home-effects';
import { isLocale, type Locale } from '@/content/locales';

export function useHomeSelection(locale: Locale) {
  const suffix = useSyncExternalStore(subscribeUrl, readUrl, serverUrl);
  const params = new URLSearchParams(suffix.split('#')[0]);
  const selectedId =
    homeEffects.find((effect) => effect.id === params.get('effect'))?.id ?? 'hover-lift';
  const language = params.get('prompt') ?? locale;
  const promptLocale = isLocale(language) ? language : locale;
  function update(key: 'effect' | 'prompt', value: EffectId | Locale) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event('tomoyo-selection'));
  }
  return {
    selectedId,
    promptLocale,
    selectEffect: (id: EffectId) => update('effect', id),
    selectPromptLocale: (value: Locale) => update('prompt', value),
  };
}
