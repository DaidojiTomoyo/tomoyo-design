import assert from 'node:assert/strict';
import test from 'node:test';
import { loadTypeScript } from './helpers/load-ts.mjs';

const { resolveEffect, parameters, effectQuery, defaultValues } =
  loadTypeScript('content/effects/schema');
const { createEffectPrompt } = loadTypeScript('content/effects/prompts');
const { catalogReturnPath, queryInput } = loadTypeScript('lib/navigation/query');
const { effects, categories } = loadTypeScript('content/effects/registry');
const { matchesEffect } = loadTypeScript('lib/effects/search');
const { homeEffects, homeCategories } = loadTypeScript('content/home-effects');

test('editorial and bento round-trip every setting through a share link and bilingual prompts', () => {
  const cases = [
    [
      'editorial',
      {
        composition: 'image-right',
        titleFace: 'sans',
        titleSize: 68,
        bodySize: 17,
        lineHeight: 1.85,
        columnGap: 38,
        imageShare: 40,
        ruleWeight: 3,
      },
      ['68px', '17px', '1.85', '38px', '40%', '3px'],
    ],
    [
      'bento-grid',
      {
        columns: 'four-columns',
        arrangement: 'panorama',
        gap: 26,
        radius: 22,
        padding: 28,
        rowHeight: 152,
        alignment: 'align-end',
      },
      ['26px', '22px', '28px', '152px', 'end'],
    ],
  ];
  for (const [id, input, expected] of cases) {
    const { spec, invalid } = resolveEffect(id, input);
    assert.equal(invalid, false);
    for (const locale of ['en', 'zh']) {
      const query = effectQuery(spec, locale);
      assert.equal(query.size, parameters[id].length + 2);
      const result = resolveEffect(id, queryInput(query));
      assert.equal(result.invalid, false);
      assert.deepEqual(result.spec, spec);
      const prompt = createEffectPrompt(result.spec, locale);
      for (const value of expected) assert.ok(prompt.includes(value), `${id}/${locale}: ${value}`);
      assert.ok(prompt.includes('prefers-reduced-motion'));
      assert.ok(!prompt.includes('Replay'));
    }
  }
});

test('bad composition inputs recover independently and unknown card settings never leak', () => {
  const result = resolveEffect('editorial', {
    titleSize: '999',
    imageShare: ['40', '60'],
    composition: 'javascript:alert(1)',
    bodySize: '16',
    distance: 22,
  });
  assert.equal(result.invalid, true);
  assert.equal(result.spec.titleSize, defaultValues('editorial').titleSize);
  assert.equal(result.spec.imageShare, defaultValues('editorial').imageShare);
  assert.equal(result.spec.composition, 'image-left');
  assert.equal(result.spec.bodySize, 16);
  assert.equal('distance' in result.spec, false);
  const bento = resolveEffect('bento-grid', {
    gap: '',
    rowHeight: Infinity,
    columns: '12',
    padding: 24,
  });
  assert.equal(bento.invalid, true);
  assert.equal(bento.spec.columns, 'three-columns');
  assert.equal(bento.spec.padding, 24);
  assert.deepEqual(
    resolveEffect('bento-grid', { v: 2, gap: 20 }).spec,
    resolveEffect('bento-grid').spec,
  );
});

test('composition prompts distinguish placements, actual breakpoints and minimum row height', () => {
  const cover = createEffectPrompt(
    resolveEffect('editorial', { composition: 'cover', imageShare: 65, ruleWeight: 0 }).spec,
    'en',
  );
  assert.match(cover, /height to 65% of its width/);
  assert.match(cover, /480px/);
  assert.match(cover, /0 removes/);
  const bento = createEffectPrompt(
    resolveEffect('bento-grid', { columns: 'four-columns', arrangement: 'featured' }).spec,
    'en',
  );
  assert.match(bento, /4 minmax/);
  assert.match(bento, /two columns and two rows/);
  assert.match(bento, /520px/);
  assert.match(bento, /340px/);
  assert.match(bento, /minmax\(112px, auto\)/);
});

test('new categories are searchable and preserve filtered return destinations across locales', () => {
  for (const [id, category, query] of [
    ['editorial', 'style', '杂志 editorial'],
    ['bento-grid', 'layout', '便当 bento'],
  ]) {
    const entry = effects.find((item) => item.id === id);
    assert.equal(entry.category, category);
    assert.ok(categories.some((item) => item.id === category));
    assert.equal(matchesEffect(entry, query), true);
    assert.equal(
      catalogReturnPath(`/zh/explore/${category}?q=海&sort=name`, 'en'),
      `/en/explore/${category}?q=海&sort=name`,
    );
  }
  assert.deepEqual(
    Array.from(homeEffects, (item) => item.id),
    ['hover-lift', 'soft-reveal', 'frosted-glass'],
  );
  assert.deepEqual(
    Array.from(homeCategories, (item) => item.id),
    ['motion', 'material'],
  );
});
