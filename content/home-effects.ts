import type { PromptLocale } from '@/i18n/config';
import { motionTokens, resolveEffect } from '@/content/effects/schema';
import { createEffectPrompt } from '@/content/effects/prompts';
import { getEffect, categories } from '@/content/effects/registry';
export { motionTokens } from '@/content/effects/schema';

const homeEffectIds = ['hover-lift', 'soft-reveal', 'frosted-glass'] as const;
export const homeEffects = homeEffectIds.map((id) => ({ ...getEffect(id), id }));
export const homeCategories = categories.filter((category) =>
  homeEffects.some((effect) => effect.category === category.id),
);

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
