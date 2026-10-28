import type { Parameter, ValuesById } from '../types';

type CompositionId = 'editorial' | 'bento-grid';
export const compositionParameters: Record<CompositionId, readonly Parameter[]> = {
  editorial: [
    {
      key: 'composition',
      type: 'choice',
      group: 'compositionGroup',
      options: ['image-left', 'image-right', 'cover'],
    },
    {
      key: 'imageShare',
      type: 'range',
      group: 'compositionGroup',
      min: 35,
      max: 65,
      step: 5,
      unit: '%',
    },
    {
      key: 'columnGap',
      type: 'range',
      group: 'compositionGroup',
      min: 12,
      max: 40,
      step: 2,
      unit: 'px',
    },
    {
      key: 'ruleWeight',
      type: 'range',
      group: 'compositionGroup',
      min: 0,
      max: 3,
      step: 1,
      unit: 'px',
    },
    { key: 'titleFace', type: 'choice', group: 'typography', options: ['condensed', 'sans'] },
    { key: 'titleSize', type: 'range', group: 'typography', min: 32, max: 72, step: 2, unit: 'px' },
    { key: 'bodySize', type: 'range', group: 'typography', min: 12, max: 18, step: 1, unit: 'px' },
    {
      key: 'lineHeight',
      type: 'range',
      group: 'typography',
      min: 1.3,
      max: 1.9,
      step: 0.05,
      unit: '×',
    },
  ],
  'bento-grid': [
    {
      key: 'columns',
      type: 'choice',
      group: 'gridGroup',
      options: ['three-columns', 'four-columns'],
    },
    {
      key: 'arrangement',
      type: 'choice',
      group: 'gridGroup',
      options: ['featured', 'balanced', 'panorama'],
    },
    {
      key: 'alignment',
      type: 'choice',
      group: 'gridGroup',
      options: ['align-start', 'align-center', 'align-end'],
    },
    { key: 'rowHeight', type: 'range', group: 'gridGroup', min: 88, max: 156, step: 4, unit: 'px' },
    { key: 'gap', type: 'range', group: 'spacingGroup', min: 8, max: 28, step: 2, unit: 'px' },
    { key: 'padding', type: 'range', group: 'spacingGroup', min: 12, max: 28, step: 2, unit: 'px' },
    { key: 'radius', type: 'range', group: 'spacingGroup', min: 0, max: 28, step: 2, unit: 'px' },
  ],
};
export const compositionDefaults: Pick<ValuesById, CompositionId> = {
  editorial: {
    composition: 'image-left',
    titleFace: 'condensed',
    titleSize: 52,
    bodySize: 14,
    lineHeight: 1.6,
    columnGap: 24,
    imageShare: 55,
    ruleWeight: 1,
  },
  'bento-grid': {
    columns: 'three-columns',
    arrangement: 'featured',
    gap: 12,
    radius: 16,
    padding: 20,
    rowHeight: 112,
    alignment: 'align-start',
  },
};
