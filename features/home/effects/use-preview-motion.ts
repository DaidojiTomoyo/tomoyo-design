'use client';
import { useLayoutEffect, useRef, type RefObject } from 'react';
import type { CardEffectSpec as EffectSpec } from '@/content/effects/schema';
import { createPreviewController } from '@/components/effects/preview-controller';

export function usePreviewMotion(
  spec: EffectSpec,
  buttonRef: RefObject<HTMLButtonElement | null>,
  surfaceRef: RefObject<HTMLSpanElement | null>,
) {
  const controller = useRef<ReturnType<typeof createPreviewController> | null>(null);
  const initial = useRef(spec);
  useLayoutEffect(() => {
    if (!buttonRef.current || !surfaceRef.current) return;
    const motion = createPreviewController(
      buttonRef.current,
      surfaceRef.current,
      initial.current,
      () => {},
    );
    controller.current = motion;
    return () => {
      motion.destroy();
      controller.current = null;
    };
  }, [buttonRef, surfaceRef]);
  useLayoutEffect(() => {
    controller.current?.sync(spec);
  }, [spec]);
  return (next: EffectSpec, replay = false) => {
    controller.current?.sync(next);
    if (replay || next.id !== spec.id) controller.current?.replay();
  };
}
