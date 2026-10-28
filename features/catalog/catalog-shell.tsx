import './styles/base.css';
import './styles/navigation.css';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { LanguageSwitch } from '@/components/navigation/language-switch';
import { Icon } from '@/components/ui/icon';
import type { Locale } from '@/i18n/config';
import { useTranslations } from 'next-intl';
import { CatalogNavigation } from './catalog-navigation';
import { CatalogContent } from './catalog-content';

export function CatalogShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = useTranslations('Catalog');
  return (
    <div className="catalog">
      <a className="skip-link" href="#catalog-content">
        {t('skip')}
      </a>
      <header className="catalog-topbar">
        <Link className="catalog-brand" href="/" aria-label="Tomoyo Design">
          <span aria-hidden="true" />
          TOMOYO
        </Link>
        <nav className="catalog-toplinks" aria-label={t('navigation')}>
          <Link href="/explore" aria-current="true">
            {t('library')}
          </Link>
          <Link href="/#how-it-works">{t('how')}</Link>
        </nav>
        <span className="catalog-brand-note" lang="en">
          {t('brandNote')}
        </span>
        <LanguageSwitch locale={locale} />
      </header>
      <div className="catalog-shell">
        <CatalogNavigation locale={locale} />
        <CatalogContent>{children}</CatalogContent>
      </div>
      <footer className="catalog-footer">
        <Link href="/#how-it-works">
          {t('journey')}
          <Icon name="arrow" />
        </Link>
        <span>Tomoyo Design</span>
      </footer>
    </div>
  );
}
