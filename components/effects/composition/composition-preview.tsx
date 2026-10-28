'use client';
import './composition-preview.css';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { CompositionSpec } from '@/content/effects/schema';
import type { Locale } from '@/i18n/config';
import { Icon } from '@/components/ui/icon';
import { EditorialPreview } from './editorial-preview';
import { BentoPreview } from './bento-preview';

export function CompositionPreview({
  spec,
  locale,
  compact = false,
  eager = false,
}: {
  spec: CompositionSpec;
  locale: Locale;
  compact?: boolean;
  eager?: boolean;
}) {
  const t = useTranslations('Composition');
  const [plain, setPlain] = useState(false);
  const [narrow, setNarrow] = useState(false);
  return (
    <div className="composition-demo" data-effect={spec.id} data-compact={compact || undefined}>
      {!compact && (
        <div className="composition-toolbar">
          <span>{t('sample')}</span>
          <button
            type="button"
            className="composition-width"
            aria-pressed={narrow}
            onClick={() => setNarrow(!narrow)}
          >
            <Icon name="layout" />
            {t(narrow ? 'fullWidth' : 'narrowWidth')}
          </button>
        </div>
      )}
      <div className="composition-stage" data-plain={plain} data-narrow={narrow}>
        <div className="composition-viewport">
          {spec.id === 'editorial' ? (
            <EditorialPreview spec={spec} locale={locale} compact={compact} eager={eager} />
          ) : (
            <BentoPreview spec={spec} locale={locale} compact={compact} eager={eager} />
          )}
        </div>
      </div>
      <div className="composition-footer">
        <button
          type="button"
          className="composition-compare"
          aria-pressed={plain}
          onClick={() => setPlain(!plain)}
        >
          <Icon name="eye" />
          {t(plain ? 'showEffect' : 'showPlain')}
        </button>
        <span role="status">{t(plain ? 'plain' : compact ? 'sample' : 'live')}</span>
      </div>
    </div>
  );
}
