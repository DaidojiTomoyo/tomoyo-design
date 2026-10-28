import type { CardEffectId, Parameter, ValuesById } from '../types';

export const cardParameters: Record<CardEffectId, readonly Parameter[]> = {
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

export const cardDefaults: Pick<ValuesById, CardEffectId> = {
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
