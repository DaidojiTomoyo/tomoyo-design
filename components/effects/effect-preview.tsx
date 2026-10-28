'use client';
import './effect-preview.css';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import coastPrint from '@/assets/plates/coast-print.png';
import { Icon } from '@/components/ui/icon';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { getEffect } from '@/content/effects/registry';
import type { EffectSpec } from '@/content/effects/schema';
import { createPreviewController } from './preview-controller';

function subscribeReduced(notify: () => void) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
}
export function EffectPreview({
  spec,
  locale,
  compact = false,
  eager = false,
}: {
  spec: EffectSpec;
  locale: Locale;
  compact?: boolean;
  eager?: boolean;
}) {
  const t = useTranslations('Common.Preview');
  const button = useRef<HTMLButtonElement>(null);
  const surface = useRef<HTMLSpanElement>(null);
  const controller = useRef<ReturnType<typeof createPreviewController> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageAttempt, setImageAttempt] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
  const initial = useRef(spec);
  useLayoutEffect(() => {
    if (!button.current || !surface.current) return;
    const motion = createPreviewController(
      button.current,
      surface.current,
      initial.current,
      setPlaying,
    );
    controller.current = motion;
    return () => {
      motion.destroy();
      controller.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    controller.current?.sync(spec);
  }, [spec]);
  const glass = spec.id === 'frosted-glass';
  const style = {
    '--effect-blur': `${glass ? spec.blur : 0}px`,
    '--effect-saturation': glass ? spec.saturation : 1,
    '--effect-radius': `${glass ? spec.radius : 8}px`,
    '--effect-border': glass ? spec.borderOpacity : 0,
  } as CSSProperties;
  const artwork = (
    <Image
      key={imageAttempt}
      src={coastPrint}
      loading={eager || !compact ? 'eager' : 'lazy'}
      alt={glass ? '' : t('imageAlt')}
      sizes={glass ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 180px, 280px'}
      className={glass ? 'effect-backdrop' : 'effect-artwork'}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
  return (
    <div
      className={`effect-demo ${compact ? 'effect-demo-compact' : ''}`}
      data-effect={spec.id}
      style={style}
    >
      <div className="effect-canvas">
        {glass && artwork}
        <button
          ref={button}
          className="effect-target"
          type="button"
          aria-label={t('play', { name: getEffect(spec.id).name[locale] })}
          onClick={() => controller.current?.replay()}
        >
          <span ref={surface} className="effect-sample">
            {spec.id === 'hover-lift' && artwork}
            <span className={glass ? 'effect-glass-copy' : 'effect-print-copy'}>
              <span className="effect-sample-title" lang="en">
                {glass ? (
                  <>
                    STAY
                    <br />
                    CURIOUS.
                  </>
                ) : spec.id === 'soft-reveal' ? (
                  <>
                    LESS
                    <br />
                    RUSH.
                  </>
                ) : (
                  <>
                    OFFLINE
                    <br />
                    TODAY.
                  </>
                )}
              </span>
              <span className="effect-sample-note" lang="en">
                {glass ? (
                  <>
                    A little room
                    <br />
                    for what comes next.
                  </>
                ) : (
                  <>
                    {spec.id === 'soft-reveal' ? 'Let the good things' : 'Somewhere by the sea.'}
                    <br />
                    {spec.id === 'soft-reveal' ? 'take their time.' : 'Everything else can wait.'}
                  </>
                )}
              </span>
            </span>
          </span>
        </button>
        {compact ? (
          <button
            type="button"
            className="effect-trigger"
            aria-label={`${t('replay')} · ${getEffect(spec.id).name[locale]}`}
            onClick={() => controller.current?.replay()}
          >
            <span className="effect-hint">
              <Icon name="play" />
              {getEffect(spec.id).trigger[locale]}
            </span>
          </button>
        ) : (
          <span className="effect-hint">
            <Icon name="pointer" />
            {t('previewHint')}
          </span>
        )}
        {imageError && (
          <div className="effect-image-error" role="status">
            <span>{t('imageError')}</span>
            <button
              type="button"
              onClick={() => {
                setImageError(false);
                setImageAttempt((attempt) => attempt + 1);
              }}
            >
              {t('retry')}
            </button>
          </div>
        )}
      </div>
      {!compact && (
        <div className="effect-preview-footer">
          <button
            className="catalog-button"
            type="button"
            aria-disabled={playing}
            onClick={() => controller.current?.replay()}
          >
            <Icon name="replay" />
            {playing ? t('playing') : t('replay')}
          </button>
          <p role="status">{reduced ? t('paused') : t('localPreview')}</p>
        </div>
      )}
    </div>
  );
}
