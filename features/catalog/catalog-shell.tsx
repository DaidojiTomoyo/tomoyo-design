import './styles/base.css';
import './styles/navigation.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { LanguageSwitch } from '@/components/navigation/language-switch';
import { Icon } from '@/components/ui/icon';
import type { Locale } from '@/content/locales';
import { getCatalogMessages } from '@/content/catalog';
import { CatalogNavigation } from './catalog-navigation';

export function CatalogShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getCatalogMessages(locale);
  return (
    <div className="catalog">
      <a className="skip-link" href="#catalog-content">
        {t.skip}
      </a>
      <header className="catalog-topbar">
        <Link className="catalog-brand" href={`/${locale}`} aria-label="Tomoyo Design">
          <span aria-hidden="true" />
          TOMOYO
        </Link>
        <nav className="catalog-toplinks" aria-label={t.navigation}>
          <Link href={`/${locale}/explore`} aria-current="true">
            {t.library}
          </Link>
          <Link href={`/${locale}#how-it-works`}>{t.how}</Link>
        </nav>
        <span className="catalog-brand-note" lang="en">
          See it. Try it. Make it.
        </span>
        <LanguageSwitch locale={locale} />
      </header>
      <div className="catalog-shell">
        <CatalogNavigation locale={locale} />
        <main id="catalog-content" className="catalog-main" tabIndex={-1}>
          {children}
        </main>
      </div>
      <footer className="catalog-footer">
        <Link href={`/${locale}#how-it-works`}>
          {t.journey}
          <Icon name="arrow" />
        </Link>
        <span>Tomoyo Design</span>
      </footer>
    </div>
  );
}
