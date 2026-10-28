'use client';
import './sequence-preview.css';
import '../composition/composition-preview.css';
import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import type { SequenceSpec } from '@/content/effects/types';
import type { Locale } from '@/i18n/config';
import { Icon } from '@/components/ui/icon';
import { SequenceSheet } from './sequence-sheet';
import { useSequencePreview } from './use-sequence-preview';

export function SequencePreview({
  spec,
  locale,
  compact = false,
  eager = false,
}: {
  spec: SequenceSpec;
  locale: Locale;
  compact?: boolean;
  eager?: boolean;
}) {
  const t = useTranslations('Sequence');
  const c = useTranslations('Controls');
  const { root, phase, alternate, replay, pause } = useSequencePreview(spec);
  const scroll = spec.scene === 'scroll';
  const busy = phase === 'preparing' || phase === 'playing' || phase === 'paused';
  return (
    <div
      ref={root}
      className="sequence-demo"
      data-effect={spec.id}
      data-scene={spec.scene}
      data-compact={compact || undefined}
      data-phase={phase}
      style={{ '--sequence-travel': `${spec.distance}px` } as CSSProperties}
    >
      {!compact && (
        <div className="sequence-toolbar">
          <span>{t('sample')}</span>
          <span>{c(spec.scene)}</span>
        </div>
      )}
      <div className="sequence-canvas">
        <div
          className="sequence-viewport"
          tabIndex={scroll ? 0 : undefined}
          role={scroll ? 'region' : undefined}
          aria-label={scroll ? t('scrollRegion') : undefined}
        >
          <SequenceSheet
            spec={spec}
            locale={locale}
            alternate={alternate}
            eager={eager || !compact}
          />
        </div>
      </div>
      <div className="sequence-footer">
        <button
          type="button"
          className="catalog-button"
          onClick={replay}
          aria-disabled={busy && !scroll}
        >
          <Icon name={spec.scene === 'text-swap' ? 'type' : 'replay'} />
          {t(scroll ? 'scrollReset' : spec.scene === 'text-swap' ? 'swap' : 'replay')}
        </button>
        {(phase === 'playing' || phase === 'paused' || scroll) && (
          <button
            type="button"
            className="catalog-button sequence-pause"
            onClick={pause}
            aria-pressed={phase === 'paused'}
            aria-disabled={phase === 'reduced'}
          >
            <Icon name={phase === 'paused' ? 'play' : 'pause'} />
            {t(phase === 'paused' ? 'resume' : 'pause')}
          </button>
        )}
        <span role="status">
          {t(
            phase === 'idle'
              ? scroll
                ? 'scrollHint'
                : spec.scene === 'text-swap'
                  ? 'textHint'
                  : 'ready'
              : phase,
          )}
        </span>
      </div>
      {!compact && <p className="sequence-guidance">{t(`hints.${spec.scene}`)}</p>}
    </div>
  );
}
