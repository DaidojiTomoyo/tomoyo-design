import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { defaultValues, effectQuery, resolveEffect } from '../content/effects/schema.ts';
import { createEffectPrompt } from '../content/effects/prompts.ts';
import { matchesEffect } from '../lib/effects/search.ts';

function load(path) {
  const source = readFileSync(new URL(`../${path}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    URLSearchParams,
    require: (specifier) => {
      assert.ok(specifier.startsWith('.'), `Unexpected dependency: ${specifier}`);
      return load(posix.join(posix.dirname(path), specifier));
    },
  });
  return exports;
}

const { catalogReturnPath, queryInput, serializeQuery } = load('lib/navigation/query');

test('share links restore the same values used by the preview and both prompt languages', () => {
  for (const [id, values, expected] of [
    ['hover-lift', { distance: 17, duration: 630 }, ['17px', '630ms', '2520ms']],
    ['soft-reveal', { distance: 32, duration: 1240 }, ['32px', '1240ms']],
    ['frosted-glass', { blur: 31, saturation: 1.7 }, ['31px', '1.7']],
  ]) {
    const original = resolveEffect(id, values).spec;
    for (const locale of ['en', 'zh']) {
      const link = effectQuery(original, locale);
      const restored = resolveEffect(id, queryInput(new URLSearchParams(link.toString())));
      assert.equal(restored.invalid, false);
      assert.deepEqual(restored.spec, original);
      assert.equal(link.get('prompt'), locale);
      const prompt = createEffectPrompt(restored.spec, locale);
      expected.forEach((part) => assert.ok(prompt.includes(part), `${id}/${locale}: ${part}`));
      assert.ok(prompt.includes('prefers-reduced-motion'));
    }
  }
});

test('each effect keeps its own configuration and extended values survive sharing', () => {
  const cases = [
    [
      'hover-lift',
      { scale: 1.08, rotation: -3, shadow: 0.5, ease: 'linear' },
      ['1.08', '-3deg', '0.5', 'linear'],
    ],
    [
      'soft-reveal',
      { direction: 'right', delay: 240, startScale: 0.88, blur: 9, ease: 'in-out' },
      ['translateX -12px', '240ms', '0.88', '9px', '0.65'],
    ],
    [
      'frosted-glass',
      { opacity: 0.3, borderOpacity: 0.4, radius: 22, tint: 'cool', shadow: 0.1 },
      ['223, 237, 248', '0.3', '0.4', '22px', '0.1'],
    ],
  ];
  for (const [id, values, phrases] of cases) {
    const { spec } = resolveEffect(id, values);
    assert.deepEqual(resolveEffect(id, queryInput(effectQuery(spec, 'en'))).spec, spec);
    for (const phrase of phrases)
      assert.ok(createEffectPrompt(spec, 'en').includes(phrase), `${id}: ${phrase}`);
  }
  assert.equal('saturation' in resolveEffect('hover-lift', { saturation: 2 }).spec, false);
  assert.equal('distance' in resolveEffect('frosted-glass', { distance: 20 }).spec, false);
  const result = resolveEffect('soft-reveal', { direction: '<script>', ease: ['out', 'linear'] });
  assert.equal(result.invalid, true);
  assert.equal(result.spec.direction, 'up');
  assert.equal(result.spec.ease, 'out');
});

test('malformed or repeated parameters cannot leak unsafe values into a preview or prompt', () => {
  for (const distance of [
    'Infinity',
    'NaN',
    '-40',
    '1000000',
    '',
    [],
    ['4', '12'],
    true,
    null,
    '<script>',
  ]) {
    const { spec, invalid } = resolveEffect('hover-lift', { distance, duration: '500' });
    assert.equal(invalid, true);
    assert.equal(spec.distance, defaultValues('hover-lift').distance);
    assert.equal(spec.duration, 500);
  }
  const duplicate = new URLSearchParams('blur=12&blur=30&saturation=1.4');
  assert.equal(resolveEffect('frosted-glass', queryInput(duplicate)).invalid, true);
  assert.equal(serializeQuery({ distance: ['4', '12'] }), 'distance=4&distance=12');
});

test('unsupported versions reset configuration and valid fractional values snap predictably', () => {
  const result = resolveEffect('soft-reveal', { v: '2', distance: '20', duration: '700' });
  assert.equal(result.invalid, true);
  assert.equal(result.spec.distance, 12);
  assert.equal(result.spec.duration, 480);
  assert.equal(resolveEffect('frosted-glass', { saturation: '1.73' }).spec.saturation, 1.75);
  assert.equal(resolveEffect('hover-lift', { distance: 0 }).spec.distance, 0);
});

test('return navigation stays in the catalog and follows the current interface language', () => {
  for (const route of ['', '/motion', '/material']) {
    for (const [fromLocale, locale] of [
      ['zh', 'en'],
      ['en', 'zh'],
    ]) {
      assert.equal(
        catalogReturnPath(`/${fromLocale}/explore${route}?q=fade&q=glass&sort=name`, locale),
        `/${locale}/explore${route}?q=fade&q=glass&sort=name`,
      );
    }
  }
  for (const value of [
    null,
    '',
    '//example.com',
    'https://example.com',
    '/explore/motion',
    '/english/explore',
    '/zh-Hans/explore',
    '/zh/explore/../../admin',
    '/zh/effects/hover-lift',
    '/zh/explore/evil',
    '/zh/explore-other',
    '/zh/explore/motion/evil',
    '/zh/explore?q=fade#outside',
  ]) {
    assert.equal(catalogReturnPath(value, 'zh'), '/zh/explore');
  }
});

test('search accepts aliases and mixed-language terms, without treating text as a regex', () => {
  const entry = {
    name: { en: 'Hover lift', zh: '悬停浮起' },
    description: { en: 'A card lifts on focus', zh: '鼠标移上去，卡片轻轻抬起。' },
    aliases: ['悬浮抬升'],
  };
  assert.equal(matchesEffect(entry, ' ＨＯＶＥＲ lift '), true);
  assert.equal(matchesEffect(entry, '悬浮抬升 card'), true);
  assert.equal(matchesEffect(entry, '[.*]'), false);
  assert.equal(matchesEffect(entry, 'glass'), false);
});
