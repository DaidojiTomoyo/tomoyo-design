import { formatMessage, getMessages, type Locale } from '@/content/locales';

import { effectIds, motionTokens, resolveEffect } from '@/content/effects/schema';
import { createEffectPrompt } from '@/content/effects/prompts';
export { motionTokens } from '@/content/effects/schema';

export const homeEffects = effectIds.map((id) => ({ id }));

export type EffectId = (typeof homeEffects)[number]['id'];

export function getHomeEffects(locale: Locale) {
  const messages = getMessages(locale).effects;
  return homeEffects.map(({ id }) => ({
    id,
    ...messages[id],
    summary: formatMessage(messages[id].summary, {
      distance: id === 'hover-lift' ? motionTokens.liftDistance : motionTokens.revealDistance,
      duration: motionTokens.revealDuration,
      blur: motionTokens.glassBlur,
    }),
  }));
}

export function buildEffectPrompt(id: EffectId, locale: Locale = 'en'): string {
  return createEffectPrompt(resolveEffect(id).spec, locale);
}
