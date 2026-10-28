'use client';
import Link from 'next/link';
import { EffectPreview } from '@/components/effects/effect-preview';
import { Icon } from '@/components/ui/icon';
import { effects, categories } from '@/content/effects/registry';
import { resolveEffect } from '@/content/effects/schema';
import type { Locale } from '@/content/locales';
import '../styles/showcase.css';

export function HomeShowcase({ locale }: { locale: Locale }) {
  return (
    <section className="home-showcase" aria-labelledby="showcase-title">
      <div className="home-showcase-heading">
        <h2 id="showcase-title">
          {locale === 'zh' ? '一个小变化，另一种感觉。' : 'Small details. A different feeling.'}
        </h2>
        <p>
          {locale === 'zh'
            ? '移上去试试。喜欢哪个，就继续把它调成你的样子。'
            : 'Hover to try. Open one to tune it to your project.'}
        </p>
      </div>
      <div className="home-showcase-grid">
        {effects.map((effect) => (
          <article key={effect.id}>
            <EffectPreview locale={locale} spec={resolveEffect(effect.id).spec} compact />
            <Link href={`/${locale}/effects/${effect.id}`}>
              <h3>{effect.name[locale]}</h3>
              <Icon name="arrow" />
            </Link>
            <p>{effect.description[locale]}</p>
          </article>
        ))}
      </div>
      <nav
        className="home-category-links"
        aria-label={locale === 'zh' ? '按类别浏览' : 'Browse by category'}
      >
        {categories.map((category) => (
          <Link href={`/${locale}/explore/${category.id}`} key={category.id}>
            {category.name[locale]}
            <Icon name="arrow" />
          </Link>
        ))}
      </nav>
    </section>
  );
}
