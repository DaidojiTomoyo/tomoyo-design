import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getImageProps } from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import paperGrain from '@/assets/plates/paper-grain.png';
import blueGrain from '@/assets/plates/blue-grain.png';
import { notFound } from 'next/navigation';
import { getMessages, isLocale, locales } from '@/content/locales';
import '../globals.css';

const display = localFont({
  src: '../../public/fonts/anton-regular.ttf',
  variable: '--font-display',
  weight: '400',
  display: 'swap',
});

const heading = localFont({
  src: '../../public/fonts/oswald-variable.ttf',
  variable: '--font-heading',
  weight: '200 700',
  display: 'swap',
});

const mono = localFont({
  src: '../../public/fonts/roboto-mono-variable.ttf',
  variable: '--font-mono',
  weight: '100 700',
  display: 'swap',
});

const cjk = localFont({
  src: '../../public/fonts/noto-sans-sc-subset.woff2',
  variable: '--font-cjk',
  weight: '400 900',
  display: 'swap',
  preload: false,
});

const paperTexture = getImageProps({ src: paperGrain, alt: '', width: 320, height: 320 }).props.src;
const blueTexture = getImageProps({ src: blueGrain, alt: '', width: 320, height: 320 }).props.src;

const surfaceTextures = {
  '--paper-texture': `url("${paperTexture}")`,
  '--blue-texture': `url("${blueTexture}")`,
} as CSSProperties;

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { meta } = getMessages(locale);
  return {
    ...meta,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', 'zh-Hans': '/zh', 'x-default': '/en' },
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale === 'zh' ? 'zh-Hans' : 'en'}
      className={`${display.variable} ${heading.variable} ${mono.variable} ${cjk.variable}`}
    >
      <head>
        <link rel="preload" as="image" href={paperTexture} />
        <link rel="preload" as="image" href={blueTexture} />
      </head>
      <body style={surfaceTextures}>
        <svg className="print-filter" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter
              id="print-edge"
              x="-1%"
              y="-1%"
              width="102%"
              height="102%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={paperTexture}
                width="320"
                height="320"
                preserveAspectRatio="none"
                result="paperTile"
              />
              <feTile in="paperTile" result="paper" />
              <feColorMatrix in="paper" type="saturate" values="0" />
              <feComponentTransfer result="grain">
                <feFuncR type="linear" slope="60" intercept="-54.5" />
                <feFuncG type="linear" slope="60" intercept="-54.5" />
                <feFuncB type="linear" slope="60" intercept="-54.5" />
              </feComponentTransfer>
              <feDisplacementMap
                in="SourceGraphic"
                in2="grain"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
                result="printedEdge"
              />
              <feColorMatrix
                in="grain"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
              />
              <feComponentTransfer result="inkCoverage">
                <feFuncA type="table" tableValues="0 0.9 1" />
              </feComponentTransfer>
              <feComposite in="printedEdge" in2="inkCoverage" operator="in" />
            </filter>
          </defs>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
