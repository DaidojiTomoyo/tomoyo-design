export const effectIds = ['hover-lift', 'soft-reveal', 'frosted-glass'] as const;
export type EffectId = (typeof effectIds)[number];
type Ease = 'out' | 'in-out' | 'linear';
type Direction = 'up' | 'down' | 'left' | 'right';
type Tint = 'paper' | 'cool' | 'rose';
type LiftValues = {
  distance: number;
  duration: number;
  scale: number;
  rotation: number;
  shadow: number;
  ease: Ease;
};
type RevealValues = {
  distance: number;
  duration: number;
  delay: number;
  blur: number;
  startScale: number;
  direction: Direction;
  ease: Ease;
};
type GlassValues = {
  blur: number;
  saturation: number;
  opacity: number;
  borderOpacity: number;
  radius: number;
  shadow: number;
  tint: Tint;
};
type ValuesById = {
  'hover-lift': LiftValues;
  'soft-reveal': RevealValues;
  'frosted-glass': GlassValues;
};
export type ParameterKey = { [Id in EffectId]: keyof ValuesById[Id] }[EffectId];
export type ParameterValue = number | string;
type ParameterBase = { key: ParameterKey; group: 'movement' | 'timing' | 'surface' };
export type RangeParameter = ParameterBase & {
  type: 'range';
  min: number;
  max: number;
  step: number;
  unit: string;
};
export type ChoiceParameter = ParameterBase & { type: 'choice'; options: readonly string[] };
export type Parameter = RangeParameter | ChoiceParameter;

export const motionTokens = {
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  liftDistance: 6,
  liftDuration: 240,
  revealDistance: 12,
  revealDuration: 480,
  revealResetDuration: 120,
  glassDuration: 320,
  glassResetDuration: 160,
  glassBlur: 18,
  glassSaturation: 1.15,
  glassSurface: 'rgba(247, 232, 216, 0.86)',
  restingShadow: '0 20px 32px rgba(4, 25, 72, 0.32)',
  liftedShadow: '0 28px 44px rgba(4, 25, 72, 0.38)',
} as const;

export const parameters: Record<EffectId, readonly Parameter[]> = {
  'hover-lift': [
    { key: 'distance', type: 'range', group: 'movement', min: 0, max: 24, step: 1, unit: 'px' },
    { key: 'scale', type: 'range', group: 'movement', min: 1, max: 1.12, step: 0.01, unit: '×' },
    { key: 'rotation', type: 'range', group: 'movement', min: -6, max: 6, step: 0.5, unit: '°' },
    { key: 'shadow', type: 'range', group: 'movement', min: 0, max: 0.6, step: 0.01, unit: '' },
    { key: 'duration', type: 'range', group: 'timing', min: 100, max: 800, step: 10, unit: 'ms' },
    { key: 'ease', type: 'choice', group: 'timing', options: ['out', 'in-out', 'linear'] },
  ],
  'soft-reveal': [
    {
      key: 'direction',
      type: 'choice',
      group: 'movement',
      options: ['up', 'down', 'left', 'right'],
    },
    { key: 'distance', type: 'range', group: 'movement', min: 0, max: 64, step: 1, unit: 'px' },
    { key: 'blur', type: 'range', group: 'movement', min: 0, max: 16, step: 1, unit: 'px' },
    {
      key: 'startScale',
      type: 'range',
      group: 'movement',
      min: 0.8,
      max: 1,
      step: 0.01,
      unit: '×',
    },
    { key: 'duration', type: 'range', group: 'timing', min: 100, max: 1500, step: 10, unit: 'ms' },
    { key: 'delay', type: 'range', group: 'timing', min: 0, max: 800, step: 20, unit: 'ms' },
    { key: 'ease', type: 'choice', group: 'timing', options: ['out', 'in-out', 'linear'] },
  ],
  'frosted-glass': [
    { key: 'tint', type: 'choice', group: 'surface', options: ['paper', 'cool', 'rose'] },
    { key: 'blur', type: 'range', group: 'surface', min: 0, max: 40, step: 1, unit: 'px' },
    { key: 'opacity', type: 'range', group: 'surface', min: 0.2, max: 1, step: 0.01, unit: '' },
    { key: 'saturation', type: 'range', group: 'surface', min: 0, max: 2, step: 0.05, unit: '' },
    { key: 'borderOpacity', type: 'range', group: 'surface', min: 0, max: 1, step: 0.05, unit: '' },
    { key: 'radius', type: 'range', group: 'surface', min: 0, max: 32, step: 1, unit: 'px' },
    { key: 'shadow', type: 'range', group: 'surface', min: 0, max: 0.6, step: 0.01, unit: '' },
  ],
};

const defaults: ValuesById = {
  'hover-lift': { distance: 6, duration: 240, scale: 1, rotation: 0, shadow: 0.38, ease: 'out' },
  'soft-reveal': {
    distance: 12,
    duration: 480,
    delay: 0,
    blur: 0,
    startScale: 1,
    direction: 'up',
    ease: 'out',
  },
  'frosted-glass': {
    blur: 18,
    saturation: 1.15,
    opacity: 0.86,
    borderOpacity: 0.7,
    radius: 8,
    shadow: 0.32,
    tint: 'paper',
  },
};
export const easingValues = {
  out: motionTokens.easing,
  'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  linear: 'linear',
};
export const tintValues = { paper: '247, 232, 216', cool: '223, 237, 248', rose: '250, 224, 217' };

export function isEffectId(value: string): value is EffectId {
  return effectIds.some((id) => id === value);
}

export function defaultValues<Id extends EffectId>(id: Id): ValuesById[Id] {
  return { ...defaults[id] };
}

type ResolvedTokens = Omit<
  typeof motionTokens,
  'easing' | 'restingShadow' | 'liftedShadow' | 'glassSurface'
> & {
  easing: string;
  restingShadow: string;
  liftedShadow: string;
  glassSurface: string;
};
type SpecsById = { [Id in EffectId]: ValuesById[Id] & ResolvedTokens & { id: Id } };
export type EffectSpec = SpecsById[EffectId];
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
  } else {
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
import type { PromptLocale } from '@/i18n/config';
