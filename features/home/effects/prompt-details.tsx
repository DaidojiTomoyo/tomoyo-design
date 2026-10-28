import { Icon } from '@/components/ui/icon';
import { SelectField } from '@/components/ui/select-field';
import { formatMessage as f, getMessages, type Locale } from '@/content/locales';
import type { getHomeEffects } from '@/content/home-effects';
import type { PromptCopy } from './use-prompt-copy';

export function PromptDetails({
  locale,
  active,
  promptLocale,
  prompt,
  copy,
  onLocaleChange,
}: {
  locale: Locale;
  active: ReturnType<typeof getHomeEffects>[number];
  promptLocale: Locale;
  prompt: string;
  copy: PromptCopy;
  onLocaleChange: (locale: Locale) => void;
}) {
  const t = getMessages(locale);
  const { copyState, detailsRef, promptRef } = copy;
  return (
    <div className="prompt-workspace">
      <p className="motion-quiet-note">{t.prompt.reduced}</p>
      <details className="full-prompt" id="full-prompt" ref={detailsRef}>
        <summary>
          {t.prompt.read} <span>{active.name}</span>
        </summary>
        <div className="prompt-content">
          <div className="prompt-toolbar">
            <label htmlFor="prompt-text">{f(t.prompt.ready, { name: active.name })}</label>
            <label className="prompt-language">
              {t.prompt.language}
              <SelectField
                aria-label={t.prompt.language}
                value={promptLocale}
                onChange={(event) => {
                  copy.resetCopy();
                  onLocaleChange(event.target.value as Locale);
                }}
              >
                <option value="en" lang="en">
                  English
                </option>
                <option value="zh" lang="zh-Hans">
                  简体中文
                </option>
              </SelectField>
            </label>
          </div>
          {copyState === 'error' ? (
            <p className="copy-error" role="alert">
              {t.prompt.error}
            </p>
          ) : (
            <p>{t.prompt.intro}</p>
          )}
          <textarea
            lang={promptLocale === 'zh' ? 'zh-Hans' : 'en'}
            ref={promptRef}
            id="prompt-text"
            readOnly
            value={prompt}
            spellCheck={false}
          />
          <button type="button" className="text-button" onClick={copy.selectText}>
            {t.prompt.selectAll} <Icon name="copy" />
          </button>
        </div>
      </details>
    </div>
  );
}
