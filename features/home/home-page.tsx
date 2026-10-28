import './styles/index.css';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { EffectExperience } from '@/features/home/effects/effect-experience';
import { LanguageSwitch } from '@/components/navigation/language-switch';
import { LocalizedText } from '@/components/motion/localized-text';
import { MotionShell } from '@/features/home/motion/motion-shell';
import { Icon } from '@/components/ui/icon';
import type { UiLocale } from '@/i18n/config';
import { homeMotionDirection, type MotionDirection } from '@/content/motion-studies';

export function HomeContent({
  locale,
  direction = homeMotionDirection,
  preview = false,
}: {
  locale: UiLocale;
  direction?: MotionDirection;
  preview?: boolean;
}) {
  const t = useTranslations('Home');
  const note = t.raw('nav.note') as string[];
  const heading = t.raw('guide.heading') as string[];
  const steps = t.raw('guide.steps') as { title: string; body: string }[];
  const content = (
    <>
      <a className="skip-link" href="#effects">
        {t('nav.skip')}
      </a>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label={t('nav.home')}>
          <span className="wordmark-type">TOMOYO DESIGN</span>
        </a>
        <nav aria-label={t('nav.label')}>
          <Link href="/explore" locale={locale}>
            {t('nav.library')}
          </Link>
          <a href="#how-it-works">{t('nav.how')}</a>
        </nav>
        <LanguageSwitch locale={locale} />
        <LocalizedText id="brand-note" locale={locale} direction={direction}>
          <p className="brand-note" data-locale-text>
            {note[0]}
            <br />
            {note[1]}
          </p>
        </LocalizedText>
        <span className="brand-dot" aria-hidden="true" />
      </header>
      <main>
        <EffectExperience locale={locale} direction={direction} />
        <section className="how-it-works" id="how-it-works" aria-labelledby="how-title">
          <div className="guide-intro">
            <LocalizedText id="guide-title" locale={locale} direction={direction}>
              <h2 id="how-title" data-locale-text>
                <span className="guide-title-line">{heading[0]}</span>
                <span className="guide-title-line">{heading[1]}</span>
              </h2>
            </LocalizedText>
            <LocalizedText id="guide-intro" locale={locale} direction={direction}>
              <p data-locale-text>{t('guide.intro')}</p>
            </LocalizedText>
          </div>
          <ol className="guide-steps">
            {steps.map((step, index) => (
              <li key={index}>
                <span className="step-index">0{index + 1}</span>
                <LocalizedText id={`step-${index}`} locale={locale} direction={direction}>
                  <div data-locale-text>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </LocalizedText>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <footer className="site-footer">
        <span>Tomoyo Design</span>
        <LocalizedText id="footer" locale={locale} direction={direction}>
          <p data-locale-text>{t('footer.note')}</p>
        </LocalizedText>
        <a href="#top">
          {t('footer.back')}
          <Icon name="arrow" />
        </a>
      </footer>
    </>
  );
  return (
    <MotionShell locale={locale} direction={direction} preview={preview}>
      {content}
    </MotionShell>
  );
}
