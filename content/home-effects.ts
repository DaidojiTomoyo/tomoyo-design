import type { PromptLocale } from '@/i18n/config';
import { effectIds, motionTokens, resolveEffect } from '@/content/effects/schema';
import { createEffectPrompt } from '@/content/effects/prompts';
export { motionTokens } from '@/content/effects/schema';

export const homeEffects = effectIds.map((id) => ({ id }));

export type EffectId = (typeof homeEffects)[number]['id'];

type HomeEffectKey = `effects.${EffectId}.${'name' | 'summary' | 'hint'}`;
type HomeEffectTranslator = (
  key: HomeEffectKey,
  values?: Record<string, string | number>,
) => string;

export function getHomeEffects(t: HomeEffectTranslator) {
  return homeEffects.map(({ id }) => ({
    id,
    name: t(`effects.${id}.name`),
    hint: t(`effects.${id}.hint`),
    summary: t(`effects.${id}.summary`, {
      distance: id === 'hover-lift' ? motionTokens.liftDistance : motionTokens.revealDistance,
      duration: motionTokens.revealDuration,
      blur: motionTokens.glassBlur,
    }),
  }));
}

export function buildEffectPrompt(id: EffectId, locale: PromptLocale = 'en'): string {
  return createEffectPrompt(resolveEffect(id).spec, locale);
}
