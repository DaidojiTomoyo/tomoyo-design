import { resolveEffect, type EffectId, type EffectSpec } from './schema';

type Preset = {
  id: string;
  name: { en: string; zh: string };
  values: Record<string, number | string>;
};
export const effectPresets: Record<EffectId, readonly Preset[]> = {
  'hover-lift': [
    {
      id: 'quiet',
      name: { en: 'Quiet', zh: '轻一点' },
      values: { distance: 4, duration: 300, scale: 1, rotation: 0, shadow: 0.2 },
    },
    { id: 'lift', name: { en: 'Lift', zh: '浮起来' }, values: {} },
    {
      id: 'playful',
      name: { en: 'Playful', zh: '俏皮一点' },
      values: { distance: 14, duration: 380, scale: 1.04, rotation: -2, shadow: 0.45 },
    },
  ],
  'soft-reveal': [
    { id: 'soft', name: { en: 'Soft', zh: '柔和' }, values: {} },
    {
      id: 'focus',
      name: { en: 'Into focus', zh: '由虚到实' },
      values: { distance: 24, duration: 900, blur: 12, startScale: 0.94 },
    },
    {
      id: 'aside',
      name: { en: 'From the side', zh: '从侧面来' },
      values: { direction: 'left', distance: 48, duration: 700, delay: 160, blur: 3 },
    },
  ],
  'frosted-glass': [
    { id: 'frost', name: { en: 'Frosted', zh: '磨砂' }, values: {} },
    {
      id: 'clear',
      name: { en: 'Clear', zh: '透亮' },
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
      name: { en: 'Warm', zh: '暖色' },
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
};

export function selectedPreset(spec: EffectSpec) {
  return effectPresets[spec.id].find(
    (preset) => JSON.stringify(resolveEffect(spec.id, preset.values).spec) === JSON.stringify(spec),
  )?.id;
}
