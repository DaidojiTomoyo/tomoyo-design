import { readFileSync, readdirSync } from 'node:fs';
import { locales } from '../i18n/config.ts';
import { validateMessageCatalogs } from './lib/message-validation.mjs';

const namespaces = [
  'common',
  'home',
  'catalog',
  'effect-detail',
  'controls',
  'motion-preview',
  'composition',
];
const catalogs = {};
const errors = [];

for (const locale of locales) {
  catalogs[locale] = {};
  const directory = new URL(`../messages/${locale}/`, import.meta.url);
  try {
    for (const file of readdirSync(directory)) {
      if (file.endsWith('.json') && !namespaces.includes(file.slice(0, -5)))
        errors.push(`${locale}/${file}: unexpected message namespace`);
    }
  } catch (error) {
    errors.push(`${locale}: cannot read message directory (${error.message})`);
  }
  for (const namespace of namespaces) {
    try {
      catalogs[locale][namespace] = JSON.parse(
        readFileSync(new URL(`${namespace}.json`, directory), 'utf8'),
      );
    } catch (error) {
      errors.push(`${locale}/${namespace}.json: cannot read messages (${error.message})`);
    }
  }
}

errors.push(...validateMessageCatalogs(catalogs, { locales }));
if (errors.length) {
  console.error(`Message validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Messages valid: ${locales.join(', ')} · ${namespaces.length} namespaces each.`);
}
