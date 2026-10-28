'use client';
import { useRef, useSyncExternalStore } from 'react';
import { Icon } from '@/components/ui/icon';
import { useTranslations } from 'next-intl';
import { effectQuery, type EffectSpec } from '@/content/effects/schema';
import { localizedPath, type Locale, type PromptLocale } from '@/i18n/config';
import { useClipboard } from '@/lib/clipboard/use-clipboard';
const subscribe = () => () => {};

export function ShareEffect({
  locale,
  promptLocale,
  spec,
}: {
  locale: Locale;
  promptLocale: PromptLocale;
  spec: EffectSpec;
}) {
  const origin = useSyncExternalStore(
    subscribe,
    () => location.origin,
    () => '',
  );
  const t = useTranslations('EffectDetail');
  const ref = useRef<HTMLInputElement>(null);
  const url = `${origin}${localizedPath(locale, `/effects/${spec.id}`)}?${effectQuery(spec, promptLocale)}`;
  const clipboard = useClipboard(url, () =>
    requestAnimationFrame(() => {
      ref.current?.focus();
      ref.current?.select();
    }),
  );
  return (
    <div className="detail-share">
      <button
        type="button"
        className="catalog-text-button"
        onClick={clipboard.copy}
        aria-disabled={clipboard.status === 'copying'}
      >
        <Icon name={clipboard.status === 'copied' ? 'check' : 'link'} />
        <span>{clipboard.status === 'copied' ? t('linkCopied') : t('share')}</span>
      </button>
      <span className="catalog-sr-only" role="status">
        {clipboard.status === 'copied' ? t('linkCopied') : ''}
      </span>
      {clipboard.status === 'error' && (
        <div className="detail-share-fallback">
          <label htmlFor="effect-share-link">{t('shareError')}</label>
          <input
            id="effect-share-link"
            ref={ref}
            value={url}
            readOnly
            aria-label={t('shareLabel')}
            onFocus={(event) => event.target.select()}
          />
        </div>
      )}
    </div>
  );
}
