import Image from 'next/image';
import type { RefObject } from 'react';
import coastPrint from '@/assets/plates/coast-print.png';
import { LocalizedText } from '@/components/motion/localized-text';
import { formatMessage as f, getMessages, type Locale } from '@/content/locales';
import { getHomeEffects, type EffectId } from '@/content/home-effects';
import type { MotionDirection } from '@/content/motion-studies';

export function EffectStage({
  locale,
  direction,
  selectedId,
  onSelect,
  onReplay,
  sampleRef,
  surfaceRef,
}: {
  locale: Locale;
  direction: MotionDirection;
  selectedId: EffectId;
  onSelect: (id: EffectId) => void;
  onReplay: () => void;
  sampleRef: RefObject<HTMLButtonElement | null>;
  surfaceRef: RefObject<HTMLSpanElement | null>;
}) {
  const t = getMessages(locale);
  const homeEffects = getHomeEffects(locale);
  const active = homeEffects.find((effect) => effect.id === selectedId)!;
  const index = homeEffects.indexOf(active) + 1;
  return (
    <>
      <div className="sheet-heading">
        <span className="registration-mark registration-start" aria-hidden="true" />
        <span className="sheet-index" aria-label={f(t.preview.example, { index })}>
          0{index} / 03
        </span>
        <LocalizedText id="page-title" locale={locale} direction={direction}>
          <h1 id="page-title" data-locale-text>
            {t.preview.title}
          </h1>
        </LocalizedText>
        <LocalizedText id="sheet-note" locale={locale} direction={direction}>
          <p className="sheet-note" data-locale-text>
            {t.preview.note}
          </p>
        </LocalizedText>
        <span className="registration-mark registration-end" aria-hidden="true" />
      </div>
      <div className="preview-stage" data-effect={selectedId}>
        <span className="ink-pass" aria-hidden="true" />
        <div className="preset-list" role="group" aria-label={t.preview.choose}>
          {homeEffects.map((effect, position) => (
            <button
              className="preset"
              type="button"
              id={`preset-${effect.id}`}
              aria-pressed={effect.id === selectedId}
              aria-controls="effect-preview"
              key={effect.id}
              onClick={() => onSelect(effect.id)}
            >
              <span className="preset-number">0{position + 1}</span>
              <LocalizedText id={`preset-${effect.id}`} locale={locale} direction={direction}>
                <span className="preset-name" data-locale-text>
                  {effect.name}
                </span>
              </LocalizedText>
              <span className="preset-rule" aria-hidden="true" />
            </button>
          ))}
        </div>
        <LocalizedText id="stage-caption" locale={locale} direction={direction}>
          <p className="stage-caption" data-locale-text>
            {t.preview.caption.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </LocalizedText>
        <div className="rest-outline" aria-hidden="true" />

        <Image
          className="glass-backdrop"
          src={coastPrint}
          alt=""
          sizes="50vw"
          loading="eager"
          aria-hidden="true"
        />

        <button
          className="sample-card"
          id="effect-preview"
          type="button"
          ref={sampleRef}
          data-effect={selectedId}
          aria-label={f(t.preview.play, { name: active.name })}
          aria-describedby="preview-instructions"
          onClick={() => onReplay()}
        >
          <span className="sample-arrival">
            <span className="sample-surface" ref={surfaceRef}>
              <span className="coast-frame">
                <Image
                  className="coast-print"
                  src={coastPrint}
                  alt={t.preview.imageAlt}
                  preload
                  sizes="(max-width: 800px) 85vw, 21vw"
                />
              </span>
              <span className="sample-copy">
                <LocalizedText id="sample-heading" locale={locale} direction={direction}>
                  <span className="sample-heading" data-locale-text>
                    {t.preview.heading[0]}
                    <br />
                    {t.preview.heading[1]}
                  </span>
                </LocalizedText>
                <LocalizedText id="sample-body" locale={locale} direction={direction}>
                  <span className="sample-body" data-locale-text>
                    {t.preview.body}
                  </span>
                </LocalizedText>
                <span className="sample-mark" aria-hidden="true" />
                <span className="sample-index">0{index} / 03</span>
              </span>
            </span>
          </span>
        </button>
        <p className="stage-footer">
          {t.preview.label}
          <br />
          {active.name}
        </p>
        <p id="preview-instructions" className="sr-only">
          {active.hint}
        </p>
      </div>
    </>
  );
}
