import { resolveEffect, type EffectId, type EffectSpec } from './schema';

type Preset = {
  id: string;
  values: Record<string, number | string>;
};
export const effectPresets = {
  editorial: [
    { id: 'journal', values: {} },
    {
      id: 'coverStory',
      values: { composition: 'cover', titleSize: 64, imageShare: 65, columnGap: 32, ruleWeight: 2 },
    },
    {
      id: 'reading',
      values: {
        composition: 'image-right',
        titleFace: 'sans',
        titleSize: 38,
        bodySize: 16,
        lineHeight: 1.8,
        imageShare: 40,
        columnGap: 18,
        ruleWeight: 0,
      },
    },
  ],
  'bento-grid': [
    { id: 'featureGrid', values: {} },
    {
      id: 'balancedGrid',
      values: {
        columns: 'four-columns',
        arrangement: 'balanced',
        gap: 16,
        radius: 8,
        padding: 16,
        rowHeight: 128,
      },
    },
    {
      id: 'panoramaGrid',
      values: {
        arrangement: 'panorama',
        gap: 20,
        radius: 24,
        padding: 24,
        rowHeight: 100,
        alignment: 'align-center',
      },
    },
  ],
  'hover-lift': [
    {
      id: 'quiet',
      values: { distance: 4, duration: 300, scale: 1, rotation: 0, shadow: 0.2 },
    },
    { id: 'lift', values: {} },
    {
      id: 'playful',
      values: { distance: 14, duration: 380, scale: 1.04, rotation: -2, shadow: 0.45 },
    },
  ],
  'soft-reveal': [
    { id: 'soft', values: {} },
    {
      id: 'focus',
      values: { distance: 24, duration: 900, blur: 12, startScale: 0.94 },
    },
    {
      id: 'aside',
      values: { direction: 'left', distance: 48, duration: 700, delay: 160, blur: 3 },
    },
  ],
  'frosted-glass': [
    { id: 'frost', values: {} },
    {
      id: 'clear',
      values: {
        blur: 8,
        opacity: 0.3,
        saturation: 1.4,
        borderOpacity: 0.9,
        radius: 16,
        shadow: 0.2,
        tint: 'cool',
      },
    },
    {
      id: 'warm',
      values: {
        blur: 30,
        opacity: 0.65,
        saturation: 1.25,
        borderOpacity: 0.4,
        radius: 24,
        tint: 'rose',
      },
    },
  ],
} as const satisfies Record<EffectId, readonly Preset[]>;

export function selectedPreset(spec: EffectSpec) {
  return effectPresets[spec.id].find(
    (preset) => JSON.stringify(resolveEffect(spec.id, preset.values).spec) === JSON.stringify(spec),
  )?.id;
}
