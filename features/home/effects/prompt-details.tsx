import { Icon } from '@/components/ui/icon';
import { SelectField } from '@/components/ui/select-field';
import { useTranslations } from 'next-intl';
import { isPromptLocale, localeInfo, promptLocales, type PromptLocale } from '@/i18n/config';
import type { getHomeEffects } from '@/content/home-effects';
import type { PromptCopy } from './use-prompt-copy';

export function PromptDetails({
  active,
  promptLocale,
  prompt,
  copy,
  onLocaleChange,
}: {
  active: ReturnType<typeof getHomeEffects>[number];
  promptLocale: PromptLocale;
  prompt: string;
  copy: PromptCopy;
  onLocaleChange: (locale: PromptLocale) => void;
}) {
  const t = useTranslations('Home');
  const { copyState, detailsRef, promptRef } = copy;
  return (
    <div className="prompt-workspace">
      <p className="motion-quiet-note">{t('prompt.reduced')}</p>
      <details className="full-prompt" id="full-prompt" ref={detailsRef}>
        <summary>
          {t('prompt.read')} <span>{active.name}</span>
        </summary>
        <div className="prompt-content">
          <div className="prompt-toolbar">
            <label htmlFor="prompt-text">{t('prompt.ready', { name: active.name })}</label>
            <label className="prompt-language">
              {t('prompt.language')}
              <SelectField
                aria-label={t('prompt.language')}
                value={promptLocale}
                onChange={(event) => {
                  const value = event.target.value;
                  if (!isPromptLocale(value)) return;
                  copy.resetCopy();
                  onLocaleChange(value);
                }}
              >
                {promptLocales.map((value) => (
                  <option key={value} value={value} lang={localeInfo[value].lang}>
                    {localeInfo[value].label}
                  </option>
                ))}
              </SelectField>
            </label>
          </div>
          {copyState === 'error' ? (
            <p className="copy-error" role="alert">
              {t('prompt.error')}
            </p>
          ) : (
            <p>{t('prompt.intro')}</p>
          )}
          <textarea
            lang={localeInfo[promptLocale].lang}
            ref={promptRef}
            id="prompt-text"
            readOnly
            value={prompt}
            spellCheck={false}
          />
          <button type="button" className="text-button" onClick={copy.selectText}>
            {t('prompt.selectAll')} <Icon name="copy" />
          </button>
        </div>
      </details>
    </div>
  );
}
