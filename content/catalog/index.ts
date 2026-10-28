import type { Locale } from '@/content/locales';
import { en } from './en';
import { zh } from './zh';
export const getCatalogMessages = (locale: Locale) => (locale === 'zh' ? zh : en);
