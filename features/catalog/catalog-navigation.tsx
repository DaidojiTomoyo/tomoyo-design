'use client';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';
import { Icon } from '@/components/ui/icon';
import { categories, effects } from '@/content/effects/registry';
import { useTranslations } from 'next-intl';
import { stripLocalePrefix, type Locale } from '@/i18n/config';
import { NavigationTrack } from './motion/navigation-track';

export function CatalogNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  const t = useTranslations('Catalog');
  const route = stripLocalePrefix(pathname);
  const close = () => {
    if (details.current) details.current.open = false;
  };
  useLayoutEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);
  const nav = (
    <>
      <Link
        className="catalog-all-link"
        href="/explore"
        onNavigate={close}
        aria-current={route === '/explore' ? 'page' : undefined}
      >
        <Icon name="grid" />
        {t('all')}
        <span className="catalog-count">{effects.length}</span>
      </Link>
      {categories.map((category) => (
        <div className="catalog-nav-group" key={category.id}>
          <Link
            className="catalog-group-title"
            href={`/explore/${category.id}`}
            onNavigate={close}
            aria-current={route === `/explore/${category.id}` ? 'page' : undefined}
          >
            <Icon name={category.icon} />
            <span>{category.name[locale]}</span>
            <span className="catalog-count">
              {effects.filter((effect) => effect.category === category.id).length}
            </span>
          </Link>
          {effects
            .filter((effect) => effect.category === category.id)
            .map((effect) => (
              <Link
                className="catalog-effect-link"
                href={`/effects/${effect.id}`}
                onNavigate={close}
                key={effect.id}
                aria-current={route === `/effects/${effect.id}` ? 'page' : undefined}
              >
                {effect.name[locale]}
              </Link>
            ))}
        </div>
      ))}
    </>
  );
  return (
    <>
      <details
        className="catalog-mobile-menu"
        ref={details}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && details.current?.open) {
            close();
            details.current.querySelector('summary')?.focus();
          }
        }}
      >
        <summary>
          <Icon name="menu" />
          {t('menu')}
          <Icon name="down" />
        </summary>
        <NavigationTrack pathname={pathname} label={t('navigation')}>
          {nav}
        </NavigationTrack>
      </details>
      <aside className="catalog-sidebar">
        <NavigationTrack pathname={pathname} label={t('navigation')}>
          {nav}
        </NavigationTrack>
        <div className="catalog-sidebar-bottom">
          <Link href="/#how-it-works">
            {t('journey')}
            <Icon name="arrow" />
          </Link>
          <p>{t('note')}</p>
        </div>
      </aside>
    </>
  );
}
