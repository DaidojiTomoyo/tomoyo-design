import { parse, TYPE } from '@formatjs/icu-messageformat-parser';

function addPlaceholder(placeholders, name, type) {
  const types = placeholders.get(name) ?? new Set();
  types.add(type);
  placeholders.set(name, types);
}

function collectPlaceholders(elements, placeholders) {
  for (const element of elements) {
    if (element.type === TYPE.literal || element.type === TYPE.pound) continue;
    let type = TYPE[element.type];
    if (element.type === TYPE.plural) type += `:${element.pluralType}`;
    if (element.type === TYPE.select) type += `:${Object.keys(element.options).sort().join(',')}`;
    addPlaceholder(placeholders, element.value, type);
    if (element.options) {
      for (const option of Object.values(element.options))
        collectPlaceholders(option.value, placeholders);
    }
    if (element.children) collectPlaceholders(element.children, placeholders);
  }
}

function inspectString(value, path, errors) {
  const placeholders = new Map();
  if (!value.trim()) errors.push(`${path}: message must not be empty`);
  try {
    collectPlaceholders(parse(value), placeholders);
  } catch (error) {
    errors.push(`${path}: invalid ICU syntax (${error.message})`);
  }
  return placeholders;
}

function inspect(value, path, errors) {
  if (typeof value === 'string')
    return { type: 'string', placeholders: inspectString(value, path, errors) };
  if (Array.isArray(value)) {
    if (!value.length) errors.push(`${path}: message array must not be empty`);
    if (value.every((item) => typeof item === 'string')) {
      const placeholders = new Map();
      value.forEach((item, index) => {
        for (const [name, types] of inspectString(item, `${path}[${index}]`, errors)) {
          for (const type of types) addPlaceholder(placeholders, name, type);
        }
      });
      return { type: 'string-array', placeholders };
    }
    return {
      type: 'array',
      children: value.map((item, index) => inspect(item, `${path}[${index}]`, errors)),
    };
  }
  if (value && typeof value === 'object') {
    if (!Object.keys(value).length) errors.push(`${path}: message object must not be empty`);
    return {
      type: 'object',
      children: Object.fromEntries(
        Object.entries(value).map(([key, child]) => [
          key,
          inspect(child, `${path}.${key}`, errors),
        ]),
      ),
    };
  }
  errors.push(`${path}: expected a message string, object or array`);
  return { type: 'invalid' };
}

function signature(placeholders) {
  return [...placeholders]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, types]) => `${name} (${[...types].sort().join(', ')})`)
    .join('; ');
}

function compare(reference, translation, path, errors) {
  if (reference.type !== translation.type) {
    errors.push(`${path}: expected ${reference.type}, received ${translation.type}`);
    return;
  }
  if (reference.placeholders) {
    const expected = signature(reference.placeholders);
    const actual = signature(translation.placeholders);
    if (expected !== actual)
      errors.push(`${path}: placeholder mismatch; expected [${expected}], received [${actual}]`);
    return;
  }
  if (reference.type === 'array') {
    if (reference.children.length !== translation.children.length)
      errors.push(`${path}: structured array length must match the reference`);
    reference.children.forEach((child, index) => {
      if (translation.children[index])
        compare(child, translation.children[index], `${path}[${index}]`, errors);
    });
  }
  if (reference.type === 'object') {
    for (const key of Object.keys(reference.children)) {
      if (!Object.hasOwn(translation.children, key))
        errors.push(`${path}.${key}: missing message key`);
      else compare(reference.children[key], translation.children[key], `${path}.${key}`, errors);
    }
    for (const key of Object.keys(translation.children)) {
      if (!Object.hasOwn(reference.children, key))
        errors.push(`${path}.${key}: unexpected message key`);
    }
  }
}

/** Validate every message, then compare keys and ICU arguments against the reference locale. */
export function validateMessageCatalogs(
  catalogs,
  { referenceLocale = 'en', locales = Object.keys(catalogs) } = {},
) {
  const errors = [];
  const inspected = new Map();
  for (const locale of new Set([referenceLocale, ...locales])) {
    if (!Object.hasOwn(catalogs, locale)) {
      errors.push(`${locale}: missing locale catalog`);
      continue;
    }
    inspected.set(locale, inspect(catalogs[locale], locale, errors));
  }
  const reference = inspected.get(referenceLocale);
  if (reference) {
    for (const [locale, translation] of inspected) {
      if (locale !== referenceLocale) compare(reference, translation, locale, errors);
    }
  }
  return errors;
}
