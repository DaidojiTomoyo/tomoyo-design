import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { MessageNamespace, Messages } from '@/i18n/messages';

/** Only these namespaces, in the current language, cross the client boundary. */
export async function IntlScope({
  namespaces = [],
  children,
}: {
  namespaces?: readonly MessageNamespace[];
  children: ReactNode;
}) {
  const messages = await getMessages();
  const selected: Partial<Messages> = Object.fromEntries(
    ['Common', ...namespaces].map((namespace) => [
      namespace,
      messages[namespace as MessageNamespace],
    ]),
  );
  return <NextIntlClientProvider messages={selected}>{children}</NextIntlClientProvider>;
}
