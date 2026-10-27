import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(
  new URL('../features/home/motion/controller.ts', import.meta.url),
  'utf8',
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

// Exercise the real controller with a controllable resource and browser visibility.
function mount(hidden = false) {
  const resource = Promise.withResolvers();
  const listeners = new Map();
  const intro = { getAnimations: () => [] };
  const content = {};
  const root = {
    dataset: { motionPhase: 'checking' },
    querySelector: (selector) => (selector === '.motion-intro' ? intro : content),
    setAttribute() {},
  };
  const document = {
    hidden,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name) => listeners.delete(name),
  };
  let resourceSignal;
  let entryCalls = 0;
  const imports = {
    '@/lib/navigation/locale-navigation': { isLocaleNavigation: () => false },
    './animation-runtime': {
      createMotionRuntime: () => ({ arrival: new Set(), supporting: new Set(), cancel() {} }),
    },
    './opening': { finishOpening: async () => {} },
    './resource-readiness': {
      prepareResources: async (_, signal) => {
        resourceSignal = signal;
        await resource.promise;
        if (!signal.aborted) root.dataset.resources = 'ready';
      },
    },
    './page-entry': { playPageEntry: async () => entryCalls++ },
    './locale-arrival': { playLocaleArrival() {} },
    './scroll-motion': {
      observeScrollMotion: () => ({ refresh() {}, reset() {}, destroy() {} }),
    },
  };
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require: (name) => {
      assert.ok(name in imports, `Unexpected dependency: ${name}`);
      return imports[name];
    },
    AbortController,
    document,
    window: { addEventListener() {}, removeEventListener() {} },
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    getComputedStyle: (element) => ({ visibility: element === intro ? 'visible' : 'hidden' }),
  });
  const controller = exports.createHomeMotion(root, 'type', false, false);
  return {
    root,
    controller,
    get resourceSignal() {
      return resourceSignal;
    },
    get entryCalls() {
      return entryCalls;
    },
    setHidden(value) {
      document.hidden = value;
      listeners.get('visibilitychange')();
    },
    async resolveResource() {
      resource.resolve();
      await new Promise((resolve) => setImmediate(resolve));
    },
  };
}

test('a background startup still waits for its actual resource', async () => {
  const page = mount(true);
  assert.equal(page.root.dataset.motionPhase, 'loading');
  assert.equal(page.root.dataset.resources, 'pending');
  assert.equal(page.resourceSignal.aborted, false);
  await page.resolveResource();
  assert.equal(page.root.dataset.resources, 'ready');
  assert.equal(page.root.dataset.motionPhase, 'complete');
  assert.equal(page.entryCalls, 0);
  page.controller.destroy();
});

test('returning from the background cannot expose an unfinished resource', async () => {
  const page = mount();
  page.setHidden(true);
  assert.equal(page.resourceSignal.aborted, false);
  page.setHidden(false);
  assert.equal(page.root.dataset.motionPhase, 'loading');
  assert.equal(page.root.dataset.resources, 'pending');
  await page.resolveResource();
  assert.equal(page.root.dataset.motionPhase, 'complete');
  assert.equal(page.entryCalls, 1);
  page.controller.destroy();
});

test('background completion skips decoration only after the resource settles', async () => {
  const page = mount();
  page.setHidden(true);
  assert.equal(page.root.dataset.motionPhase, 'loading');
  await page.resolveResource();
  assert.equal(page.root.dataset.resources, 'ready');
  assert.equal(page.root.dataset.motionPhase, 'complete');
  assert.equal(page.root.dataset.loadingUi, 'background');
  assert.equal(page.entryCalls, 0);
  page.controller.destroy();
});
