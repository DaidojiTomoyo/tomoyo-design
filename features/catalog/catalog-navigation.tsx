'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Icon } from '@/components/ui/icon';
import { categories, effects } from '@/content/effects/registry';
import { getCatalogMessages } from '@/content/catalog';
import type { Locale } from '@/content/locales';

export function CatalogNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  const t = getCatalogMessages(locale);
  const prefix = `/${locale}`;
  const close = () => {
    if (details.current) details.current.open = false;
  };
  const nav = (
    <>
      <Link
        className="catalog-all-link"
        href={`${prefix}/explore`}
        onNavigate={close}
        aria-current={pathname === `${prefix}/explore` ? 'page' : undefined}
      >
        <Icon name="grid" />
        {t.all}
        <span className="catalog-count">{effects.length}</span>
      </Link>
      {categories.map((category) => (
        <div className="catalog-nav-group" key={category.id}>
          <Link
            className="catalog-group-title"
            href={`${prefix}/explore/${category.id}`}
            onNavigate={close}
            aria-current={pathname === `${prefix}/explore/${category.id}` ? 'page' : undefined}
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
                href={`${prefix}/effects/${effect.id}`}
                onNavigate={close}
                key={effect.id}
                aria-current={pathname === `${prefix}/effects/${effect.id}` ? 'page' : undefined}
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
        key={pathname}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && details.current?.open) {
            close();
            details.current.querySelector('summary')?.focus();
          }
        }}
      >
        <summary>
          <Icon name="menu" />
          {t.menu}
          <Icon name="down" />
        </summary>
        <nav aria-label={t.navigation}>{nav}</nav>
      </details>
      <aside className="catalog-sidebar">
        <nav aria-label={t.navigation}>{nav}</nav>
        <div className="catalog-sidebar-bottom">
          <Link href={`${prefix}#how-it-works`}>
            {t.journey}
            <Icon name="arrow" />
          </Link>
          <p>{t.note}</p>
        </div>
      </aside>
    </>
  );
}
