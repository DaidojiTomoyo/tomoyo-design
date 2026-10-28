'use client';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { EffectPreview } from '@/components/effects/effect-preview';
import { Icon } from '@/components/ui/icon';
import { effects, categories } from '@/content/effects/registry';
import { resolveEffect } from '@/content/effects/schema';
import type { UiLocale } from '@/i18n/config';
import '../styles/showcase.css';

export function HomeShowcase({ locale }: { locale: UiLocale }) {
  const t = useTranslations('Home');
  return (
    <section className="home-showcase" aria-labelledby="showcase-title">
      <div className="home-showcase-heading">
        <h2 id="showcase-title">{t('showcase.title')}</h2>
        <p>{t('showcase.intro')}</p>
      </div>
      <div className="home-showcase-grid">
        {effects.map((effect) => (
          <article key={effect.id}>
            <EffectPreview locale={locale} spec={resolveEffect(effect.id).spec} compact />
            <Link href={`/effects/${effect.id}`} locale={locale}>
              <h3>{effect.name[locale]}</h3>
              <Icon name="arrow" />
            </Link>
            <p>{effect.description[locale]}</p>
          </article>
        ))}
      </div>
      <nav className="home-category-links" aria-label={t('showcase.categories')}>
        {categories.map((category) => (
          <Link href={`/explore/${category.id}`} locale={locale} key={category.id}>
            {category.name[locale]}
            <Icon name="arrow" />
          </Link>
        ))}
      </nav>
    </section>
  );
}
