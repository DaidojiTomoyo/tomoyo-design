import { LocalizedText } from '@/components/motion/localized-text';
import { Icon } from '@/components/ui/icon';
import { effectCategories, type EffectId } from '@/content/home-effects';
import { formatMessage as f, getMessages, type Locale } from '@/content/locales';
import type { MotionDirection } from '@/content/motion-studies';

export function EffectCategories({
  locale,
  direction,
  onSelect,
}: {
  locale: Locale;
  direction: MotionDirection;
  onSelect: (id: EffectId) => void;
}) {
  const t = getMessages(locale);
  return (
    <section className="effect-categories" aria-label={t.categories.label}>
      <div className="category-grid">
        {effectCategories.map((category, position) => (
          <article className="category" key={position}>
            <LocalizedText id={`category-title-${position}`} locale={locale} direction={direction}>
              <h2 data-locale-text>
                <span className="category-title">{t.categories.items[position].title}</span>
                <span>0{position + 1}</span>
              </h2>
            </LocalizedText>
            <div className="category-detail">
              <LocalizedText id={`category-body-${position}`} locale={locale} direction={direction}>
                <p data-locale-text>
                  {t.categories.items[position].description.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </LocalizedText>
              <ul>
                {category.examples.map((example, exampleIndex) => (
                  <li key={t.categories.items[position].examples[exampleIndex]}>
                    <Icon name="arrow" />
                    {example.effect ? (
                      <button
                        type="button"
                        className="category-link"
                        onClick={() => onSelect(example.effect!)}
                        aria-label={f(t.categories.try, {
                          name: t.categories.items[position].examples[exampleIndex],
                        })}
                      >
                        {t.categories.items[position].examples[exampleIndex]}
                      </button>
                    ) : (
                      <span>{t.categories.items[position].examples[exampleIndex]}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
