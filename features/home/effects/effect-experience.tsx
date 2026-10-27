'use client';

import { useRef, type CSSProperties } from 'react';
import { getMessages, type Locale } from '@/content/locales';
import {
  buildEffectPrompt,
  getHomeEffects,
  motionTokens,
  type EffectId,
} from '@/content/home-effects';
import type { MotionDirection } from '@/content/motion-studies';
import { useHomeSelection } from './use-effect-selection';
import { usePreviewMotion } from './use-preview-motion';
import { usePromptCopy } from './use-prompt-copy';
import { EffectStage } from './effect-stage';
import { EffectCategories } from './effect-categories';
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
  const active = getHomeEffects(locale).find((effect) => effect.id === selectedId)!;
  const sampleRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const playPreview = usePreviewMotion(selectedId, sampleRef, surfaceRef);
  const prompt = buildEffectPrompt(selectedId, promptLocale);
  const copy = usePromptCopy(prompt);
  const replay = () => playPreview(selectedId, true);

  function selectEffect(id: EffectId, fromIndex = false) {
    copy.resetCopy();
    playPreview(id, id === selectedId);
    selection.selectEffect(id);
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
        style={previewStyle}
      >
        <EffectStage
          locale={locale}
          direction={direction}
          selectedId={selectedId}
          onSelect={selectEffect}
          onReplay={replay}
          sampleRef={sampleRef}
          surfaceRef={surfaceRef}
        />
        <PromptActions locale={locale} active={active} copy={copy} onReplay={replay} />
      </section>
      <p className="preview-guidance" id="preview-guidance">
        {t.preview.guidance}
      </p>
      <EffectCategories
        locale={locale}
        direction={direction}
        onSelect={(id) => selectEffect(id, true)}
      />
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
