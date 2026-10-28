'use client';
import type { EffectSpec } from '@/content/effects/schema';
import type { Locale } from '@/i18n/config';
import { CardEffectPreview } from './card-effect-preview';
import { CompositionPreview } from './composition/composition-preview';

export function EffectPreview(props: {
  spec: EffectSpec;
  locale: Locale;
  compact?: boolean;
  eager?: boolean;
}) {
  const { spec, ...rest } = props;
  return spec.id === 'editorial' || spec.id === 'bento-grid' ? (
    <CompositionPreview {...rest} spec={spec} key={spec.id} />
  ) : (
    <CardEffectPreview {...rest} spec={spec} />
  );
}
