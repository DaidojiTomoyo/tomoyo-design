import type { Parameter, SequenceEffectId, ValuesById } from '../types';

const shared: Parameter[] = [
  {
    key: 'scene',
    type: 'choice',
    group: 'sceneGroup',
    options: ['opening', 'entrance', 'scroll', 'text-swap'],
  },
  {
    key: 'formation',
    type: 'range',
    group: 'timing',
    min: 300,
    max: 1600,
    step: 20,
    unit: 'ms',
    scenes: ['opening'],
  },
  {
    key: 'hold',
    type: 'range',
    group: 'timing',
    min: 0,
    max: 1800,
    step: 50,
    unit: 'ms',
    scenes: ['opening'],
  },
  { key: 'duration', type: 'range', group: 'timing', min: 300, max: 1600, step: 20, unit: 'ms' },
  {
    key: 'stagger',
    type: 'range',
    group: 'timing',
    min: 0,
    max: 120,
    step: 5,
    unit: 'ms',
    scenes: ['opening', 'entrance', 'scroll'],
  },
  {
    key: 'distance',
    type: 'range',
    group: 'movement',
    min: 0,
    max: 60,
    step: 1,
    unit: 'px',
    scenes: ['opening', 'entrance', 'scroll'],
  },
];

export const sequenceParameters: Record<SequenceEffectId, readonly Parameter[]> = {
  overprint: [
    ...shared,
    {
      key: 'offset',
      type: 'range',
      group: 'movement',
      min: 0,
      max: 24,
      step: 1,
      unit: 'px',
      scenes: ['opening', 'text-swap'],
    },
    {
      key: 'rotation',
      type: 'range',
      group: 'movement',
      min: -6,
      max: 6,
      step: 0.5,
      unit: '°',
      scenes: ['opening', 'entrance', 'scroll'],
    },
  ],
  'coastal-reveal': [
    ...shared,
    { key: 'blur', type: 'range', group: 'movement', min: 0, max: 12, step: 1, unit: 'px' },
    {
      key: 'startScale',
      type: 'range',
      group: 'movement',
      min: 1,
      max: 1.16,
      step: 0.01,
      unit: '×',
      scenes: ['opening', 'entrance', 'scroll'],
    },
  ],
};

export const sequenceDefaults: Pick<ValuesById, SequenceEffectId> = {
  overprint: {
    scene: 'opening',
    formation: 720,
    hold: 650,
    duration: 720,
    distance: 26,
    stagger: 45,
    offset: 8,
    rotation: -1.5,
  },
  'coastal-reveal': {
    scene: 'opening',
    formation: 900,
    hold: 650,
    duration: 800,
    distance: 18,
    stagger: 45,
    blur: 5,
    startScale: 1.04,
  },
};
