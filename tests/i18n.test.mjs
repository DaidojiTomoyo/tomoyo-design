import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import {
  getDefaultPromptLocale,
  isLocale,
  isPromptLocale,
  localizedPath,
  stripLocalePrefix,
} from '../i18n/config.ts';
import { validateMessageCatalogs } from '../scripts/lib/message-validation.mjs';

function load(path) {
  const url = new URL(`../${path}.ts`, import.meta.url);
  const { outputText } = ts.transpileModule(readFileSync(url, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    URLSearchParams,
    require: (specifier) => {
      assert.ok(specifier.endsWith('/i18n/config'), `Unexpected dependency: ${specifier}`);
      return { getDefaultPromptLocale, isPromptLocale, stripLocalePrefix };
    },
  });
  return exports;
}

const { languageLocation } = load('lib/navigation/language-location');

test('locale helpers recognize complete path segments and never duplicate a prefix', () => {
  for (const locale of ['en', 'zh']) {
    assert.equal(isLocale(locale), true);
    assert.equal(isPromptLocale(locale), true);
    assert.equal(getDefaultPromptLocale(locale), locale);
  }
  for (const locale of ['', 'EN', 'zh-Hans', 'enough', 'fr']) {
    assert.equal(isLocale(locale), false);
    assert.equal(isPromptLocale(locale), false);
  }
  for (const [pathname, stripped, localized] of [
    ['/en', '', '/zh'],
    ['/en/', '/', '/zh'],
    ['/zh/effects/hover-lift', '/effects/hover-lift', '/zh/effects/hover-lift'],
    ['/explore', '/explore', '/zh/explore'],
    ['/english/explore', '/english/explore', '/zh/english/explore'],
    ['/zh-Hans/explore', '/zh-Hans/explore', '/zh/zh-Hans/explore'],
    ['/', '/', '/zh'],
  ]) {
    assert.equal(stripLocalePrefix(pathname), stripped, pathname);
    assert.equal(localizedPath('zh', pathname), localized, pathname);
  }
});

test('changing interface language preserves an explicit independent prompt language', () => {
  assert.equal(
    languageLocation('/zh/effects/hover-lift', 'distance=17&prompt=en', '#prompt', 'zh'),
    '/effects/hover-lift?distance=17&prompt=en#prompt',
  );
  assert.equal(
    languageLocation('/en/effects/soft-reveal', 'prompt=zh&duration=600', '', 'en'),
    '/effects/soft-reveal?prompt=zh&duration=600',
  );
});

test('changing interface language freezes a missing or invalid prompt to the previous UI locale', () => {
  for (const query of ['', 'prompt=', 'prompt=fr', 'prompt=ZH']) {
    assert.equal(
      languageLocation('/zh/effects/hover-lift', query, '', 'zh'),
      '/effects/hover-lift?prompt=zh',
    );
  }
  assert.equal(languageLocation('/en', '', '#effects', 'en'), '/?prompt=en#effects');
});

test('language changes retain settings, duplicate query values, return destinations and hashes', () => {
  const original = new URLSearchParams([
    ['distance', '12'],
    ['distance', '18'],
    ['prompt', 'en'],
    ['q', '悬停 lift'],
    ['from', '/zh/explore/motion?q=fade&sort=name'],
  ]);
  const target = new URL(
    languageLocation('/zh/effects/hover-lift', original.toString(), '#tune', 'zh'),
    'https://example.test',
  );
  assert.equal(target.pathname, '/effects/hover-lift');
  assert.equal(target.hash, '#tune');
  assert.deepEqual([...target.searchParams], [...original]);
  assert.equal(languageLocation('/english', 'q=glass', '', 'en'), '/english?q=glass&prompt=en');
});

test('message validation accepts locale-specific plural branches and reordered placeholders', () => {
  assert.deepEqual(
    validateMessageCatalogs({
      en: {
        count: '{count, plural, one {# effect by {name}} other {# effects by {name}}}',
        summary: 'Move {distance}px for {duration}ms.',
        link: 'Read <link>{name}</link>',
      },
      zh: {
        count: '{count, plural, other {{name} 的 # 个效果}}',
        summary: '在 {duration}ms 内移动 {distance}px。',
        link: '<link>阅读 {name}</link>',
      },
    }),
    [],
  );
});

test('raw line arrays can wrap differently while structured guide steps retain their schema', () => {
  const catalogs = {
    en: {
      heading: ['Use {name}', 'in your project.'],
      steps: [{ title: 'Preview', body: 'Try {name}.' }],
    },
    zh: {
      heading: ['把 {name} 用到你的项目里。'],
      steps: [{ title: '试试看', body: '体验 {name}。' }],
    },
  };
  assert.deepEqual(validateMessageCatalogs(catalogs), []);
  catalogs.zh.steps[0] = { title: '试试看' };
  assert.match(validateMessageCatalogs(catalogs).join('\n'), /zh\.steps\[0\]\.body: missing/);
  catalogs.zh.steps = [];
  assert.ok(validateMessageCatalogs(catalogs).some((error) => error.includes('zh.steps')));
});

test('message validation rejects missing locales, missing translations, extra keys and type changes', () => {
  assert.match(
    validateMessageCatalogs({ en: { title: 'Title' } }, { locales: ['en', 'zh'] }).join('\n'),
    /zh: missing locale catalog/,
  );
  const errors = validateMessageCatalogs({
    en: { title: 'Title', body: 'Body', heading: ['A heading'] },
    zh: { title: { text: '标题' }, heading: '标题', extra: '多余' },
  }).join('\n');
  assert.match(errors, /zh\.body: missing message key/);
  assert.match(errors, /zh\.extra: unexpected message key/);
  assert.match(errors, /zh\.title: expected string, received object/);
  assert.match(errors, /zh\.heading: expected string-array, received string/);
});

test('message validation rejects lost, renamed or changed ICU arguments, including nested ones', () => {
  for (const [en, zh] of [
    ['Play {name}', '播放'],
    ['Play {name}', '播放 {effect}'],
    ['{count, number}', '{count}'],
    ['{count, plural, other {# effects}}', '{count, selectordinal, other {第 # 个}}'],
    ['{count, plural, other {{name}: # effects}}', '{count, plural, other {# 个效果}}'],
    ['<link>{name}</link>', '{name}'],
    ['{mode, select, fast {Fast} other {Slow}}', '{mode, select, quick {快} other {慢}}'],
  ]) {
    assert.match(
      validateMessageCatalogs({ en: { message: en }, zh: { message: zh } }).join('\n'),
      /zh\.message: placeholder mismatch/,
      `${en} → ${zh}`,
    );
  }
});

test('message validation rejects broken ICU, empty text and non-message leaves in every locale', () => {
  for (const invalid of ['Play {name', '{count, plural, one {Effect}}', '  ', 42, null, true]) {
    const errors = validateMessageCatalogs({ en: { message: invalid }, zh: { message: invalid } });
    assert.ok(
      errors.some((error) => error.startsWith('en.message:')),
      String(invalid),
    );
    assert.ok(
      errors.some((error) => error.startsWith('zh.message:')),
      String(invalid),
    );
  }
  assert.match(
    validateMessageCatalogs({ en: { lines: ['A'] }, zh: { lines: ['好', ''] } }).join('\n'),
    /zh\.lines\[1\]: message must not be empty/,
  );
});
