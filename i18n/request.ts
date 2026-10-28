import { locale as rootLocale } from 'next/root-params';
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { isLocale } from './config';
import type { Messages } from './messages';

export default getRequestConfig(async ({ locale: override }) => {
  const locale = override ?? (await rootLocale());
  if (!isLocale(locale)) notFound();
  const [Common, Home, Catalog, EffectDetail, Controls, MotionPreview, Composition, Sequence] =
    await Promise.all([
      import(`../messages/${locale}/common.json`).then((module) => module.default),
      import(`../messages/${locale}/home.json`).then((module) => module.default),
      import(`../messages/${locale}/catalog.json`).then((module) => module.default),
      import(`../messages/${locale}/effect-detail.json`).then((module) => module.default),
      import(`../messages/${locale}/controls.json`).then((module) => module.default),
      import(`../messages/${locale}/motion-preview.json`).then((module) => module.default),
      import(`../messages/${locale}/composition.json`).then((module) => module.default),
      import(`../messages/${locale}/sequence.json`).then((module) => module.default),
    ]);
  return {
    locale,
    messages: {
      Common,
      Home,
      Catalog,
      EffectDetail,
      Controls,
      MotionPreview,
      Composition,
      Sequence,
    } satisfies Messages,
  };
});
