import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

/** Load the project's bundler-style TS imports using the existing test compiler. */
export function loadTypeScript(path, cache = new Map()) {
  if (cache.has(path)) return cache.get(path);
  const source = readFileSync(new URL(`../../${path}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  cache.set(path, exports);
  runInNewContext(outputText, {
    exports,
    URLSearchParams,
    require: (specifier) => {
      assert.ok(
        specifier.startsWith('.') || specifier.startsWith('@/'),
        `Unexpected dependency: ${specifier}`,
      );
      return loadTypeScript(
        specifier.startsWith('@/')
          ? specifier.slice(2)
          : posix.join(posix.dirname(path), specifier),
        cache,
      );
    },
  });
  return exports;
}
