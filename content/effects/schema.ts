import type { PromptLocale } from '@/i18n/config';
import { cardParameters, cardDefaults } from './definitions/cards';
import { compositionParameters, compositionDefaults } from './definitions/composition';
import { motionTokens, easingValues, tintValues } from './motion-tokens';
import {
  effectIds,
  type EffectId,
  type EffectSpec,
  type Parameter,
  type ParameterKey,
  type ParameterValue,
  type SpecsById,
  type ValuesById,
} from './types';

export { effectIds } from './types';
export type {
  EffectId,
  EffectSpec,
  CardEffectId,
  CardEffectSpec,
  CompositionSpec,
  Parameter,
  ParameterKey,
  ParameterValue,
} from './types';
export { motionTokens, easingValues, tintValues } from './motion-tokens';

export const parameters: Record<EffectId, readonly Parameter[]> = {
  ...cardParameters,
  ...compositionParameters,
};
const defaults: ValuesById = { ...cardDefaults, ...compositionDefaults };

export function isEffectId(value: string): value is EffectId {
  return effectIds.some((id) => id === value);
}

export function defaultValues<Id extends EffectId>(id: Id): ValuesById[Id] {
  return { ...defaults[id] };
}

export function parameterValue(spec: EffectSpec, key: ParameterKey): ParameterValue {
  return (spec as unknown as Record<string, ParameterValue>)[key];
}

/** URL and controls take the same validation path; unsupported versions use safe defaults. */
export function resolveEffect<Id extends EffectId>(id: Id, input: Record<string, unknown> = {}) {
  const values = defaultValues(id) as unknown as Record<string, ParameterValue>;
  const unsupported = input.v !== undefined && input.v !== '1' && input.v !== 1;
  let invalid = unsupported;
  for (const p of parameters[id]) {
    if (unsupported || input[p.key] === undefined) continue;
    const raw = input[p.key];
    if (p.type === 'choice') {
      if (typeof raw === 'string' && p.options.includes(raw)) values[p.key] = raw;
      else invalid = true;
      continue;
    }
    const value =
      typeof raw === 'number' || (typeof raw === 'string' && raw.trim()) ? Number(raw) : NaN;
    if (!Number.isFinite(value) || value < p.min || value > p.max) {
      invalid = true;
      continue;
    }
    values[p.key] = Number((Math.round((value - p.min) / p.step) * p.step + p.min).toFixed(2));
  }
  const spec = { ...motionTokens, ...values, id } as unknown as EffectSpec;
  if (spec.id === 'frosted-glass') {
    spec.glassSurface = `rgba(${tintValues[spec.tint]}, ${spec.opacity})`;
    spec.restingShadow = `0 20px 32px rgba(4, 25, 72, ${spec.shadow})`;
  } else if (spec.id === 'hover-lift' || spec.id === 'soft-reveal') {
    spec.easing = easingValues[spec.ease];
    if (spec.id === 'hover-lift') spec.liftedShadow = `0 28px 44px rgba(4, 25, 72, ${spec.shadow})`;
  }
  return { spec: spec as SpecsById[Id], invalid };
}

export function effectQuery(spec: EffectSpec, prompt: PromptLocale) {
  const query = new URLSearchParams({ v: '1', prompt });
  for (const p of parameters[spec.id]) query.set(p.key, String(parameterValue(spec, p.key)));
  return query;
}
