import type { EffectSpec } from './types';
import type { PromptLocale } from '@/i18n/config';
import { createCardPrompt } from './prompts/card';
import { createCompositionPrompt } from './prompts/composition';

/** The preview and prompt always consume the same validated specification. */
export function createEffectPrompt(spec: EffectSpec, locale: PromptLocale) {
  return spec.id === 'editorial' || spec.id === 'bento-grid'
    ? createCompositionPrompt(spec, locale)
    : createCardPrompt(spec, locale);
}
