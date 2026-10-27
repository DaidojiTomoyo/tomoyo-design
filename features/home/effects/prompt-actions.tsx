import { Icon } from '@/components/ui/icon';
import { formatMessage as f, getMessages, type Locale } from '@/content/locales';
import type { getHomeEffects } from '@/content/home-effects';
import type { PromptCopy } from './use-prompt-copy';

export function PromptActions({
  locale,
  active,
  copy,
  onReplay,
}: {
  locale: Locale;
  active: ReturnType<typeof getHomeEffects>[number];
  copy: PromptCopy;
  onReplay: () => void;
}) {
  const t = getMessages(locale);
  const { copyState, openPrompt, copyPrompt } = copy;
  return (
    <>
      <div className="prompt-strip">
        <span className="registration-mark registration-start" aria-hidden="true" />
        <span className="prompt-label">
          {t.prompt.label} <Icon name="arrow" />
        </span>
        <button
          type="button"
          className="prompt-summary"
          aria-label={f(t.prompt.readEffect, { name: active.name })}
          aria-controls="full-prompt"
          onClick={() => openPrompt()}
        >
          {active.summary}
        </button>
        <button
          type="button"
          className="copy-button"
          data-copy-state={copyState}
          onClick={copyPrompt}
          aria-busy={copyState === 'copying'}
          aria-disabled={copyState === 'copying'}
          aria-label={
            copyState === 'copied'
              ? t.prompt.copied
              : copyState === 'copying'
                ? t.prompt.copying
                : t.prompt.copy
          }
        >
          <span className="copy-label-long" aria-hidden="true">
            {copyState === 'copied'
              ? t.prompt.copied
              : copyState === 'copying'
                ? t.prompt.copying
                : t.prompt.copy}
          </span>
          <span className="copy-label-short" aria-hidden="true">
            {copyState === 'copied'
              ? t.prompt.copied
              : copyState === 'copying'
                ? t.prompt.copying
                : t.prompt.copyShort}
          </span>
          <Icon name={copyState === 'copied' ? 'check' : 'copy'} />
        </button>
        <button type="button" className="replay-button" onClick={() => onReplay()}>
          <Icon name="replay" /> {t.prompt.replay}
        </button>
        <span className="registration-mark registration-end" aria-hidden="true" />
      </div>
      <p className="sr-only" role="status">
        {copyState === 'copied'
          ? f(t.prompt.copiedStatus, { name: active.name })
          : copyState === 'error'
            ? t.prompt.error
            : f(t.preview.selected, { name: active.name })}
      </p>
    </>
  );
}
