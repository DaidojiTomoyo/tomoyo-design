import type { SequenceSpec } from './types';

export const sequenceEntryDelay = 200;
export function sequenceTextExit(spec: SequenceSpec) {
  return Math.min(160, spec.duration * 0.4);
}
export function sequenceDuration(spec: SequenceSpec) {
  if (spec.scene === 'text-swap') return sequenceTextExit(spec) + spec.duration;
  const entrance = Math.max(spec.duration, spec.stagger + spec.duration * 0.7);
  return spec.scene === 'opening'
    ? spec.formation + spec.hold + sequenceEntryDelay + entrance
    : entrance;
}
