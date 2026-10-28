import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
import coastPrint from '@/assets/plates/coast-print.png';
import type { MotionDirection } from '@/content/motion-studies';

export function OpeningScreen({
  direction,
  preview,
}: {
  direction: MotionDirection;
  preview: boolean;
}) {
  const t = useTranslations('MotionPreview');
  return (
    <>
      <div className="motion-intro" role="status" aria-live="polite">
        {direction === 'coast' && (
          <Image
            className="intro-coast"
            src={coastPrint}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
          />
        )}
        <span className="intro-rule intro-rule-top" />
        <span className="intro-rule intro-rule-bottom" />
        <span className="intro-cross intro-cross-start" />
        <span className="intro-cross intro-cross-end" />
        <div className="intro-wordmark" aria-hidden="true">
          {'TOMOYO'.split('').map((letter, index) => (
            <span className="intro-letter-mask" key={index}>
              <span
                className="intro-letter"
                style={
                  {
                    '--letter-index': index,
                    '--letter-origin': index % 2 ? '-110%' : '110%',
                  } as CSSProperties
                }
              >
                {letter}
              </span>
            </span>
          ))}
          <span className="intro-wordmark-small">DESIGN</span>
        </div>
        <p className="intro-status">
          <span className="intro-waiting">{t('loading')}</span>
          <span className="intro-ready">{preview ? t('ready') : t('homeReady')}</span>
        </p>
      </div>
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            '<style>.motion-study .motion-intro{display:none!important}.motion-study .motion-content{visibility:visible!important;animation:none!important}</style>',
        }}
      />
    </>
  );
}
