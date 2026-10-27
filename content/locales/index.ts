import { en } from './en';
import { zh } from './zh';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
export const getMessages = (locale: Locale) => (locale === 'zh' ? zh : en);
export function formatMessage(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token));
}
