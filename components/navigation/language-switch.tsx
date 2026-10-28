'use client';

import './language-switch.css';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useSyncExternalStore } from 'react';
import { locales, localeInfo, localizedPath, type Locale } from '@/i18n/config';
import { readUrl, serverUrl, subscribeUrl } from '@/lib/navigation/url-state';
import { rememberLocaleNavigation } from '@/lib/navigation/locale-navigation';
import { languageLocation } from '@/lib/navigation/language-location';

export function LanguageSwitch({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<LanguageLinks locale={locale} query="" />}>
      <CurrentLanguageLinks locale={locale} />
    </Suspense>
  );
}

function CurrentLanguageLinks({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  return <LanguageLinks locale={locale} query={params.toString()} />;
}

function LanguageLinks({ locale, query }: { locale: Locale; query: string }) {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const suffix = useSyncExternalStore(subscribeUrl, readUrl, serverUrl);
  const hash = suffix.includes('#') ? suffix.slice(suffix.indexOf('#')) : '';
  const href = languageLocation(pathname, query, hash, locale);
  return (
    <div className="language-switch" role="group" aria-label={t('language')}>
      {locales.map((target, index) => (
        <LanguageOption
          key={target}
          locale={locale}
          target={target}
          href={href}
          pathname={pathname}
          divider={index > 0}
        />
      ))}
    </div>
  );
}

function LanguageOption({
  locale,
  target,
  href,
  pathname,
  divider,
}: {
  locale: Locale;
  target: Locale;
  href: string;
  pathname: string;
  divider: boolean;
}) {
  return (
    <>
      {divider && <span aria-hidden="true">/</span>}
      <Link
        href={href}
        locale={target}
        transitionTypes={['locale-change']}
        onNavigate={() => rememberLocaleNavigation(localizedPath(target, pathname))}
        hrefLang={localeInfo[target].lang}
        lang={localeInfo[target].lang}
        aria-current={locale === target ? 'page' : undefined}
        scroll={false}
      >
        {localeInfo[target].shortLabel}
      </Link>
    </>
  );
}
