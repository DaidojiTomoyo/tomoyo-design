'use client';

import { useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { formatMessage, getMessages, type Locale } from '@/content/locales';
import { getCatalogMessages } from '@/content/catalog';
import { getEffect } from '@/content/effects/registry';
import { Icon } from '@/components/ui/icon';
import { getHomeEffects, motionTokens, type EffectId } from '@/content/home-effects';
import type { MotionDirection } from '@/content/motion-studies';
import { createEffectPrompt } from '@/content/effects/prompts';
import { effectQuery, resolveEffect } from '@/content/effects/schema';
import { HomeShowcase } from './home-showcase';
import { useHomeSelection } from './use-effect-selection';
import { usePreviewMotion } from './use-preview-motion';
import { usePromptCopy } from './use-prompt-copy';
import { EffectStage } from './effect-stage';
import { PromptActions } from './prompt-actions';
import { PromptDetails } from './prompt-details';

const previewStyle = {
  '--lift-distance': `${motionTokens.liftDistance}px`,
  '--lift-duration': `${motionTokens.liftDuration}ms`,
  '--effect-ease': motionTokens.easing,
  '--resting-shadow': motionTokens.restingShadow,
  '--lifted-shadow': motionTokens.liftedShadow,
  '--glass-blur': `${motionTokens.glassBlur}px`,
  '--glass-saturation': motionTokens.glassSaturation,
  '--glass-surface': motionTokens.glassSurface,
} as CSSProperties;

export function EffectExperience({
  locale,
  direction,
}: {
  locale: Locale;
  direction: MotionDirection;
}) {
  const t = getMessages(locale);
  const selection = useHomeSelection(locale);
  const { selectedId, promptLocale } = selection;
  const baseEffect = getHomeEffects(locale).find((effect) => effect.id === selectedId)!;
  const active = {
    ...baseEffect,
    summary: formatMessage(t.effects[selectedId].summary, selection.spec),
  };
  const sampleRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const playPreview = usePreviewMotion(selection.spec, sampleRef, surfaceRef);
  const prompt = createEffectPrompt(selection.spec, promptLocale);
  const copy = usePromptCopy(prompt);
  const replay = () => playPreview(selection.spec, true);

  function selectEffect(id: EffectId, fromIndex = false) {
    copy.resetCopy();
    if (id === selectedId) replay();
    else {
      playPreview(resolveEffect(id).spec, true);
      selection.selectEffect(id);
    }
    if (fromIndex) {
      document.getElementById(`preset-${id}`)?.focus({ preventScroll: true });
      document.getElementById('effects')?.scrollIntoView({ block: 'start' });
    }
  }

  return (
    <>
      <section
        className="print-sheet"
        id="effects"
        aria-labelledby="page-title"
        aria-describedby="preview-guidance"
        style={
          {
            ...previewStyle,
            '--sample-radius':
              selection.spec.id === 'frosted-glass' ? `${selection.spec.radius}px` : '14px',
            '--glass-border-opacity':
              selection.spec.id === 'frosted-glass' ? selection.spec.borderOpacity : 0.7,
          } as CSSProperties
        }
      >
        <EffectStage
          locale={locale}
          direction={direction}
          selectedId={selectedId}
          spec={selection.spec}
          onParameterChange={selection.updateParameter}
          onSelect={selectEffect}
          onReplay={replay}
          sampleRef={sampleRef}
          surfaceRef={surfaceRef}
        />
        <PromptActions locale={locale} active={active} copy={copy} onReplay={replay} />
      </section>
      <p className="preview-guidance" id="preview-guidance">
        {t.preview.guidance}{' '}
        <Link
          href={`/${locale}/effects/${selectedId}?${effectQuery(selection.spec, promptLocale)}`}
        >
          {formatMessage(getCatalogMessages(locale).view, {
            name: getEffect(selectedId).name[locale],
          })}
          <Icon name="arrow" />
        </Link>
      </p>
      <HomeShowcase locale={locale} />
      <PromptDetails
        locale={locale}
        active={active}
        promptLocale={promptLocale}
        prompt={prompt}
        copy={copy}
        onLocaleChange={selection.selectPromptLocale}
      />
    </>
  );
}
