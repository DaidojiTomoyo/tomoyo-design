import { resolveEffect, type EffectId, type EffectSpec, type ParameterValue } from './schema';

type Preset = {
  id: string;
  values: Record<string, number | string>;
};
export const effectPresets = {
  overprint: [
    { id: 'pressOriginal', values: {} },
    {
      id: 'pressQuick',
      values: {
        formation: 400,
        hold: 200,
        duration: 400,
        distance: 12,
        stagger: 25,
        offset: 4,
        rotation: -0.5,
      },
    },
    {
      id: 'pressBold',
      values: {
        formation: 1000,
        hold: 800,
        duration: 1000,
        distance: 38,
        stagger: 70,
        offset: 18,
        rotation: -3,
      },
    },
  ],
  'coastal-reveal': [
    { id: 'coastOriginal', values: {} },
    {
      id: 'coastClear',
      values: {
        formation: 500,
        hold: 200,
        duration: 500,
        distance: 8,
        stagger: 25,
        blur: 2,
        startScale: 1.02,
      },
    },
    {
      id: 'coastDeep',
      values: {
        formation: 1300,
        hold: 900,
        duration: 1100,
        distance: 32,
        stagger: 70,
        blur: 10,
        startScale: 1.12,
      },
    },
  ],
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

export function presetValues(spec: EffectSpec, values: Record<string, ParameterValue>) {
  return 'scene' in spec ? { ...values, scene: spec.scene } : values;
}

export function selectedPreset(spec: EffectSpec) {
  return effectPresets[spec.id].find(
    (preset) =>
      JSON.stringify(resolveEffect(spec.id, presetValues(spec, preset.values)).spec) ===
      JSON.stringify(spec),
  )?.id;
}
