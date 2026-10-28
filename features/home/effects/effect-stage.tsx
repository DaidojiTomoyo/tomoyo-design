import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/icon';
import { RangeField } from '@/components/ui/range-field';
import {
  parameters,
  parameterValue,
  type EffectSpec,
  type ParameterKey,
} from '@/content/effects/schema';
import type { RefObject } from 'react';
import coastPrint from '@/assets/plates/coast-print.png';
import { LocalizedText } from '@/components/motion/localized-text';
import type { UiLocale } from '@/i18n/config';
import { getHomeEffects, type EffectId } from '@/content/home-effects';
import type { MotionDirection } from '@/content/motion-studies';

export function EffectStage({
  locale,
  direction,
  selectedId,
  spec,
  onParameterChange,
  onSelect,
  onReplay,
  sampleRef,
  surfaceRef,
}: {
  locale: UiLocale;
  direction: MotionDirection;
  selectedId: EffectId;
  spec: EffectSpec;
  onParameterChange: (key: ParameterKey, value: number) => void;
  onSelect: (id: EffectId) => void;
  onReplay: () => void;
  sampleRef: RefObject<HTMLButtonElement | null>;
  surfaceRef: RefObject<HTMLSpanElement | null>;
}) {
  const t = useTranslations('Home');
  const c = useTranslations('Controls');
  const homeEffects = getHomeEffects(t);
  const active = homeEffects.find((effect) => effect.id === selectedId)!;
  const index = homeEffects.indexOf(active) + 1;
  const quickKeys = selectedId === 'frosted-glass' ? ['blur', 'opacity'] : ['distance', 'duration'];
  const headline = t.raw('preview.headline') as string[];
  const heading = t.raw('preview.heading') as string[];
  return (
    <>
      <div className="sheet-heading">
        <span className="registration-mark registration-start" aria-hidden="true" />
        <span className="sheet-index" aria-label={t('preview.example', { index })}>
          0{index} / 03
        </span>
        <LocalizedText id="page-title" locale={locale} direction={direction}>
          <h1 id="page-title" data-locale-text>
            {headline.map((line) => (
              <span className="sheet-headline-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
        </LocalizedText>
        <Link className="home-library-link" href="/explore" locale={locale}>
          {t('preview.browse')}
          <Icon name="arrow" />
        </Link>
        <span className="registration-mark registration-end" aria-hidden="true" />
      </div>
      <div className="preview-stage" data-effect={selectedId}>
        <span className="ink-pass" aria-hidden="true" />
        <div className="preset-list" role="group" aria-label={t('preview.choose')}>
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
          aria-label={t('preview.play', { name: active.name })}
          aria-describedby="preview-instructions"
          onClick={() => onReplay()}
        >
          <span className="sample-arrival">
            <span className="sample-surface" ref={surfaceRef}>
              <span className="coast-frame">
                <Image
                  className="coast-print"
                  src={coastPrint}
                  alt={t('preview.imageAlt')}
                  preload
                  sizes="(max-width: 800px) 85vw, 21vw"
                />
              </span>
              <span className="sample-copy">
                <LocalizedText id="sample-heading" locale={locale} direction={direction}>
                  <span className="sample-heading" data-locale-text>
                    {heading[0]}
                    <br />
                    {heading[1]}
                  </span>
                </LocalizedText>
                <LocalizedText id="sample-body" locale={locale} direction={direction}>
                  <span className="sample-body" data-locale-text>
                    {t('preview.body')}
                  </span>
                </LocalizedText>
                <span className="sample-mark" aria-hidden="true" />
                <span className="sample-index">0{index} / 03</span>
              </span>
            </span>
          </span>
        </button>
        <div className="home-quick-controls">
          <p>{t('quickControls.title')}</p>
          {parameters[selectedId]
            .filter((parameter) => quickKeys.includes(parameter.key))
            .map(
              (parameter) =>
                parameter.type === 'range' && (
                  <RangeField
                    key={parameter.key}
                    id={`home-${parameter.key}`}
                    label={c(parameter.key)}
                    min={parameter.min}
                    max={parameter.max}
                    step={parameter.step}
                    unit={parameter.unit}
                    value={Number(parameterValue(spec, parameter.key))}
                    onChange={(value) => onParameterChange(parameter.key, value)}
                  />
                ),
            )}
          <span>{t('quickControls.note')}</span>
        </div>
        <p id="preview-instructions" className="sr-only">
          {active.hint}
        </p>
      </div>
    </>
  );
}
