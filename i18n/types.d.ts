import type { UiLocale } from './config';
import type { Messages as AppMessages } from './messages';

declare module 'next-intl' {
  interface AppConfig {
    Locale: UiLocale;
    Messages: AppMessages;
  }
}
