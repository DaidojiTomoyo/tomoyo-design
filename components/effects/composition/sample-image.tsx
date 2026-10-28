'use client';
import { useState } from 'react';
import Image from 'next/image';
import coastPrint from '@/assets/plates/coast-print.png';
import { useTranslations } from 'next-intl';

export function SampleImage({ eager = false }: { eager?: boolean }) {
  const t = useTranslations('Common.Preview');
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return (
    <div className="composition-image">
      <Image
        key={attempt}
        src={coastPrint}
        alt={t('imageAlt')}
        sizes="(max-width: 760px) 90vw, 500px"
        loading={eager ? 'eager' : 'lazy'}
        onError={() => setFailed(true)}
        onLoad={() => setFailed(false)}
      />
      {failed && (
        <div className="composition-image-error" role="status">
          <span>{t('imageError')}</span>
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setAttempt(attempt + 1);
            }}
          >
            {t('retry')}
          </button>
        </div>
      )}
    </div>
  );
}
