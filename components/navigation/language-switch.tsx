'use client';

import './language-switch.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { getMessages, isLocale, type Locale } from '@/content/locales';
import { readUrl, serverUrl, subscribeUrl } from '@/lib/navigation/url-state';
import { rememberLocaleNavigation } from '@/lib/navigation/locale-navigation';

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const route = pathname.replace(/^\/(en|zh)/, '');
  const suffix = useSyncExternalStore(subscribeUrl, readUrl, serverUrl);
  const params = new URLSearchParams(suffix.split('#')[0]);
  const prompt = params.get('prompt');
  if (!prompt || !isLocale(prompt)) params.set('prompt', locale);
  const hash = suffix.includes('#') ? suffix.slice(suffix.indexOf('#')) : '';
  const languageSuffix = `?${params.toString()}${hash}`;
  return (
    <div className="language-switch" role="group" aria-label={getMessages(locale).nav.language}>
      <Link
        href={`/en${route}${languageSuffix}`}
        transitionTypes={['locale-change']}
        onNavigate={() => rememberLocaleNavigation(`/en${route}`)}
        hrefLang="en"
        lang="en"
        aria-current={locale === 'en' ? 'page' : undefined}
        scroll={false}
      >
        EN
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        href={`/zh${route}${languageSuffix}`}
        transitionTypes={['locale-change']}
        onNavigate={() => rememberLocaleNavigation(`/zh${route}`)}
        hrefLang="zh-Hans"
        lang="zh-Hans"
        aria-current={locale === 'zh' ? 'page' : undefined}
        scroll={false}
      >
        中文
      </Link>
    </div>
  );
}
