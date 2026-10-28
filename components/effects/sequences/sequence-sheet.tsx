import Image from 'next/image';
import coastPrint from '@/assets/plates/coast-print.png';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import type { SequenceSpec } from '@/content/effects/types';
import { SampleImage } from '../composition/sample-image';

export function SequenceSheet({
  spec,
  locale,
  alternate,
  eager,
}: {
  spec: SequenceSpec;
  locale: Locale;
  alternate: boolean;
  eager: boolean;
}) {
  const t = useTranslations('Composition');
  const motion = useTranslations('Sequence');
  const isText = spec.scene === 'text-swap';
  return (
    <>
      <article className="sequence-sheet" data-sequence="sheet" data-scroll-index="0">
        <div className="sequence-photo">
          <div className="sequence-parallax" data-sequence="parallax">
            <SampleImage eager={eager} />
          </div>
        </div>
        <div className="sequence-copy" data-alternate={isText && alternate}>
          <div
            className="sequence-text"
            data-sequence="primary-text"
            lang={locale}
            aria-hidden={isText && alternate}
          >
            <h2 data-sequence="title">{t('storyTitle')}</h2>
            <p data-sequence="caption">{t('storyExcerpt')}</p>
          </div>
          {isText && (
            <div
              className="sequence-text sequence-alternate"
              data-sequence="alternate-text"
              lang={locale === 'zh' ? 'en' : 'zh-Hans'}
              aria-hidden={!alternate}
            >
              <h2>{motion('alternateTitle')}</h2>
              <p>{motion('alternateBody')}</p>
            </div>
          )}
        </div>
      </article>
      {spec.scene === 'scroll' && (
        <div className="sequence-scroll-notes">
          <section data-scroll-index="1">
            <h3>{t('paceShortTitle')}</h3>
            <p>{t('storyBody')}</p>
          </section>
          <section data-scroll-index="2">
            <h3>{t('planTitle')}</h3>
            <p>{t('storyEnding')}</p>
          </section>
        </div>
      )}
      {spec.scene === 'opening' && (
        <div className="sequence-opening" data-sequence="overlay" aria-hidden="true" inert>
          {spec.id === 'coastal-reveal' && (
            <div className="sequence-opening-image" data-sequence="opening-image">
              <Image
                src={coastPrint}
                alt=""
                fill
                sizes="(max-width:760px) 90vw, 800px"
                loading={eager ? 'eager' : 'lazy'}
              />
            </div>
          )}
          <div className="sequence-wordmark" lang="en">
            {spec.id === 'overprint' && (
              <span className="sequence-registration" data-sequence="registration">
                TOMOYO
              </span>
            )}
            <span data-sequence="mark">TOMOYO</span>
            <small>DESIGN</small>
          </div>
        </div>
      )}
    </>
  );
}
