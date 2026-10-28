import { useLayoutEffect, useRef, useState } from 'react';
import type { SequenceSpec } from '@/content/effects/types';
import { createSequenceController, type SequencePhase } from './sequence-controller';

export function useSequencePreview(spec: SequenceSpec) {
  const root = useRef<HTMLDivElement>(null);
  const initial = useRef(spec);
  const controller = useRef<ReturnType<typeof createSequenceController> | null>(null);
  const [phase, setPhase] = useState<SequencePhase>('idle');
  const [alternate, setAlternate] = useState(false);
  useLayoutEffect(() => {
    if (!root.current) return;
    const instance = createSequenceController(
      root.current,
      initial.current,
      setPhase,
      setAlternate,
    );
    controller.current = instance;
    return () => {
      instance.destroy();
      controller.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    controller.current?.sync(spec);
  }, [spec]);
  return {
    root,
    phase,
    alternate,
    replay: () => void controller.current?.replay(),
    pause: () => controller.current?.pause(),
  };
}
