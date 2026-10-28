import type { RefObject } from 'react';
import { Icon } from '@/components/ui/icon';
import { getCatalogMessages } from '@/content/catalog';
import type { Locale } from '@/content/locales';
import type { useClipboard } from '@/lib/clipboard/use-clipboard';

type Clipboard = ReturnType<typeof useClipboard>;
export function PromptCopyButton({ locale, clipboard }: { locale: Locale; clipboard: Clipboard }) {
  const t = getCatalogMessages(locale);
  const label =
    clipboard.status === 'copied' ? t.copied : clipboard.status === 'copying' ? t.copying : t.copy;
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
  locale,
  promptLocale,
  prompt,
  clipboard,
  detailsRef,
  textRef,
}: {
  locale: Locale;
  promptLocale: Locale;
  prompt: string;
  clipboard: Clipboard;
  detailsRef: RefObject<HTMLDetailsElement | null>;
  textRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const t = getCatalogMessages(locale);
  return (
    <details className="detail-prompt-section" id="effect-prompt" ref={detailsRef}>
      <summary>
        <h2>{t.promptHeading}</h2>
        <Icon name="down" />
      </summary>
      <p>{t.promptHelp}</p>
      <label className="detail-prompt-label" htmlFor="effect-prompt-text">
        {t.prompt} · {promptLocale === 'zh' ? '简体中文' : 'English'}
      </label>
      <textarea
        id="effect-prompt-text"
        ref={textRef}
        readOnly
        value={prompt}
        lang={promptLocale === 'zh' ? 'zh-Hans' : 'en'}
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
          {t.select}
        </button>
        <PromptCopyButton locale={locale} clipboard={clipboard} />
      </div>
    </details>
  );
}
