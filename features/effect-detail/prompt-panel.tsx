import type { RefObject } from 'react';
import { Icon } from '@/components/ui/icon';
import { useTranslations } from 'next-intl';
import { localeInfo, type PromptLocale } from '@/i18n/config';
import type { useClipboard } from '@/lib/clipboard/use-clipboard';

type Clipboard = ReturnType<typeof useClipboard>;
export function PromptCopyButton({ clipboard }: { clipboard: Clipboard }) {
  const t = useTranslations('EffectDetail');
  const label =
    clipboard.status === 'copied'
      ? t('copied')
      : clipboard.status === 'copying'
        ? t('copying')
        : t('copy');
  return (
    <button
      className="catalog-copy"
      type="button"
      onClick={clipboard.copy}
      aria-disabled={clipboard.status === 'copying'}
    >
      <Icon name={clipboard.status === 'copied' ? 'check' : 'copy'} />
      <span>{label}</span>
    </button>
  );
}
export function PromptDetails({
  promptLocale,
  prompt,
  clipboard,
  detailsRef,
  textRef,
}: {
  promptLocale: PromptLocale;
  prompt: string;
  clipboard: Clipboard;
  detailsRef: RefObject<HTMLDetailsElement | null>;
  textRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const t = useTranslations('EffectDetail');
  return (
    <details className="detail-prompt-section" id="effect-prompt" ref={detailsRef}>
      <summary>
        <h2>{t('promptHeading')}</h2>
        <Icon name="down" />
      </summary>
      <p>{t('promptHelp')}</p>
      <label className="detail-prompt-label" htmlFor="effect-prompt-text">
        {t('prompt')} · {localeInfo[promptLocale].label}
      </label>
      <textarea
        id="effect-prompt-text"
        ref={textRef}
        readOnly
        value={prompt}
        lang={localeInfo[promptLocale].lang}
        spellCheck={false}
      />
      <div className="detail-prompt-actions">
        <button
          className="catalog-button"
          type="button"
          onClick={() => {
            textRef.current?.focus();
            textRef.current?.select();
          }}
        >
          {t('select')}
        </button>
        <PromptCopyButton clipboard={clipboard} />
      </div>
    </details>
  );
}
