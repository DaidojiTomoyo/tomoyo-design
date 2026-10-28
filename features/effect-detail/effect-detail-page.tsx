'use client';
import './styles/workspace.css';
import './styles/controls.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Icon } from '@/components/ui/icon';
import { SelectField } from '@/components/ui/select-field';
import { LocalizedText } from '@/components/motion/localized-text';
import { EffectPreview } from '@/components/effects/effect-preview';
import { getCatalogMessages } from '@/content/catalog';
import { getEffect, getCategory } from '@/content/effects/registry';
import { createEffectPrompt } from '@/content/effects/prompts';
import type { EffectId } from '@/content/effects/schema';
import { formatMessage, type Locale } from '@/content/locales';
import { catalogReturnPath } from '@/lib/navigation/query';
import { useClipboard } from '@/lib/clipboard/use-clipboard';
import { useEffectConfig } from './use-effect-config';
import { ParameterControls } from './parameter-controls';
import { PromptCopyButton, PromptDetails } from './prompt-panel';
import { ShareEffect } from './share-effect';

export function EffectDetailPage({
  id,
  locale,
  initialQuery,
}: {
  id: EffectId;
  locale: Locale;
  initialQuery: string;
}) {
  const t = getCatalogMessages(locale);
  const pathname = usePathname();
  const effect = getEffect(id);
  const config = useEffectConfig(id, locale, initialQuery);
  const prompt = createEffectPrompt(config.spec, config.promptLocale);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  function openPrompt(select = false) {
    if (detailsRef.current) detailsRef.current.open = true;
    detailsRef.current?.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    if (select) {
      textRef.current?.focus({ preventScroll: true });
      textRef.current?.select();
    }
  }
  const clipboard = useClipboard(prompt, () => openPrompt(true));
  const summary = formatMessage(
    id === 'hover-lift' ? t.summaryLift : id === 'soft-reveal' ? t.summaryReveal : t.summaryGlass,
    config.spec,
  );
  return (
    <div className="effect-detail" data-catalog-page={pathname}>
      <nav className="detail-crumb" aria-label={t.navigation}>
        <Link href={catalogReturnPath(config.from, locale)} scroll={false}>
          {config.from ? t.back : t.all}
        </Link>
        <Icon name="chevron" />
        <Link href={`/${locale}/explore/${effect.category}`}>
          {getCategory(effect.category)!.name[locale]}
        </Link>
        <Icon name="chevron" />
        <span>{effect.name[locale]}</span>
      </nav>
      <LocalizedText id="effect-detail-heading" locale={locale} direction="type">
        <div className="detail-heading" data-route-enter>
          <h1>
            {effect.name[locale]}
            {locale === 'zh' && <span lang="en">{effect.name.en}</span>}
          </h1>
          <p>{effect.description[locale]}</p>
        </div>
      </LocalizedText>
      {config.invalid && (
        <p className="catalog-notice" role="status">
          {t.invalid}
        </p>
      )}
      <div className="detail-workspace-toolbar">
        <nav className="detail-section-links" aria-label={t.library}>
          <a href="#effect-preview">
            <Icon name="eye" />
            {t.preview}
          </a>
          <a
            href="#effect-prompt"
            onClick={(event) => {
              event.preventDefault();
              openPrompt();
            }}
          >
            <Icon name="copy" />
            {t.prompt}
          </a>
        </nav>
        <div className="detail-toolbar-actions">
          <ShareEffect locale={locale} promptLocale={config.promptLocale} spec={config.spec} />
          <div className="detail-desktop-copy">
            <PromptCopyButton locale={locale} clipboard={clipboard} />
          </div>
        </div>
      </div>
      <div className="detail-workspace">
        <section id="effect-preview" aria-label={t.preview} data-route-enter>
          <EffectPreview locale={locale} spec={config.spec} />
        </section>
        <section className="detail-control-panel" aria-label={t.parameters} data-route-enter>
          <ParameterControls
            spec={config.spec}
            locale={locale}
            onChange={config.update}
            onReset={config.reset}
            onPreset={config.applyPreset}
          />
          <div className="detail-prompt-summary">
            <label htmlFor="prompt-language">
              {t.promptLanguage}
              <SelectField
                id="prompt-language"
                value={config.promptLocale}
                onChange={(event) => config.changeLanguage(event.target.value)}
              >
                <option value="en">English</option>
                <option value="zh">简体中文</option>
              </SelectField>
            </label>
            <p>{summary}</p>
            <div className="detail-desktop-copy">
              <PromptCopyButton locale={locale} clipboard={clipboard} />
            </div>
            <button type="button" className="catalog-text-button" onClick={() => openPrompt()}>
              {t.fullPrompt}
              <Icon name="arrow" />
            </button>
          </div>
        </section>
      </div>
      <p
        className={clipboard.status === 'error' ? 'detail-copy-feedback' : 'catalog-sr-only'}
        role="status"
        aria-live="polite"
      >
        {clipboard.status === 'error' ? t.copyError : clipboard.status === 'copied' ? t.copied : ''}
      </p>
      <PromptDetails
        locale={locale}
        promptLocale={config.promptLocale}
        prompt={prompt}
        clipboard={clipboard}
        detailsRef={detailsRef}
        textRef={textRef}
      />
      <div className="detail-mobile-copy">
        <span>
          {t.prompt} · {config.promptLocale === 'zh' ? '中文' : 'EN'}
        </span>
        <PromptCopyButton locale={locale} clipboard={clipboard} />
      </div>
    </div>
  );
}
