import type { motionTokens } from './motion-tokens';

export const effectIds = [
  'hover-lift',
  'soft-reveal',
  'frosted-glass',
  'editorial',
  'bento-grid',
  'overprint',
  'coastal-reveal',
] as const;
export type EffectId = (typeof effectIds)[number];
export type CardEffectId = 'hover-lift' | 'soft-reveal' | 'frosted-glass';
export type SequenceEffectId = 'overprint' | 'coastal-reveal';
export type SequenceScene = 'opening' | 'entrance' | 'scroll' | 'text-swap';
type SequenceValues = {
  scene: SequenceScene;
  duration: number;
  formation: number;
  hold: number;
  distance: number;
  stagger: number;
};
type Ease = 'out' | 'in-out' | 'linear';
export type ValuesById = {
  'hover-lift': {
    distance: number;
    duration: number;
    scale: number;
    rotation: number;
    shadow: number;
    ease: Ease;
  };
  'soft-reveal': {
    distance: number;
    duration: number;
    delay: number;
    blur: number;
    startScale: number;
    direction: 'up' | 'down' | 'left' | 'right';
    ease: Ease;
  };
  'frosted-glass': {
    blur: number;
    saturation: number;
    opacity: number;
    borderOpacity: number;
    radius: number;
    shadow: number;
    tint: 'paper' | 'cool' | 'rose';
  };
  editorial: {
    composition: 'image-left' | 'image-right' | 'cover';
    titleFace: 'condensed' | 'sans';
    titleSize: number;
    bodySize: number;
    lineHeight: number;
    columnGap: number;
    imageShare: number;
    ruleWeight: number;
  };
  'bento-grid': {
    columns: 'three-columns' | 'four-columns';
    arrangement: 'featured' | 'balanced' | 'panorama';
    gap: number;
    radius: number;
    padding: number;
    rowHeight: number;
    alignment: 'align-start' | 'align-center' | 'align-end';
  };
  overprint: SequenceValues & { offset: number; rotation: number };
  'coastal-reveal': SequenceValues & { blur: number; startScale: number };
};
export type ParameterKey = { [Id in EffectId]: keyof ValuesById[Id] }[EffectId];
export type ParameterValue = number | string;
type ParameterBase = {
  key: ParameterKey;
  scenes?: readonly SequenceScene[];
  group:
    | 'sceneGroup'
    | 'movement'
    | 'timing'
    | 'surface'
    | 'typography'
    | 'compositionGroup'
    | 'gridGroup'
    | 'spacingGroup';
};
export type RangeParameter = ParameterBase & {
  type: 'range';
  min: number;
  max: number;
  step: number;
  unit: string;
};
export type ChoiceParameter = ParameterBase & { type: 'choice'; options: readonly string[] };
export type Parameter = RangeParameter | ChoiceParameter;
type ResolvedTokens = Omit<
  typeof motionTokens,
  'easing' | 'restingShadow' | 'liftedShadow' | 'glassSurface'
> & {
  easing: string;
  restingShadow: string;
  liftedShadow: string;
  glassSurface: string;
};
export type SpecsById = { [Id in EffectId]: ValuesById[Id] & ResolvedTokens & { id: Id } };
export type EffectSpec = SpecsById[EffectId];
export type CardEffectSpec = SpecsById[CardEffectId];
export type CompositionSpec = SpecsById['editorial' | 'bento-grid'];
export type SequenceSpec = SpecsById[SequenceEffectId];
