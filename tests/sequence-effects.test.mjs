import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { loadTypeScript } from './helpers/load-ts.mjs';

const { resolveEffect, activeParameters, parameters, effectQuery } =
  loadTypeScript('content/effects/schema');
const { createEffectPrompt } = loadTypeScript('content/effects/prompts');
const { sequenceDuration } = loadTypeScript('content/effects/sequence-timing');
const frames = loadTypeScript('components/effects/sequences/sequence-frames');
const { queryInput } = loadTypeScript('lib/navigation/query');

function load(name, globals) {
  const source = readFileSync(
    new URL(`../components/effects/sequences/${name}.ts`, import.meta.url),
    'utf8',
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, { exports, ...globals });
  return exports;
}
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

test('each sequence scene round-trips every setting while hiding inactive controls and prompt values', () => {
  for (const id of ['overprint', 'coastal-reveal']) {
    for (const scene of ['opening', 'entrance', 'scroll', 'text-swap']) {
      const spec = resolveEffect(id, {
        scene,
        duration: 1080,
        formation: 1340,
        hold: 1250,
        offset: 21,
        blur: 11,
        startScale: 1.13,
      }).spec;
      for (const locale of ['en', 'zh']) {
        const query = effectQuery(spec, locale);
        assert.equal(query.size, parameters[id].length + 2);
        assert.deepEqual(resolveEffect(id, queryInput(query)).spec, spec);
        const prompt = createEffectPrompt(spec, locale);
        assert.ok(prompt.includes('1080ms'));
        assert.equal(prompt.includes('1340ms'), scene === 'opening');
        assert.equal(prompt.includes('1250ms'), scene === 'opening');
      }
      const keys = Array.from(activeParameters(spec), (item) => item.key);
      assert.equal(keys.includes('formation'), scene === 'opening');
      assert.equal(keys.includes('distance'), scene !== 'text-swap');
      if (id === 'overprint')
        assert.equal(keys.includes('offset'), scene === 'opening' || scene === 'text-swap');
    }
  }
  const invalid = resolveEffect('overprint', { scene: 'unknown', formation: 99999, offset: 5 });
  assert.equal(invalid.invalid, true);
  assert.equal(invalid.spec.scene, 'opening');
  assert.equal(invalid.spec.offset, 5);
});

test('opening timing includes formation, hold and delayed entrance, and ends in readable content', () => {
  for (const [id, duration] of [
    ['overprint', 2290],
    ['coastal-reveal', 2550],
  ]) {
    const spec = resolveEffect(id).spec;
    const tracks = frames.openingTracks(spec);
    assert.equal(sequenceDuration(spec), duration);
    assert.equal(Math.max(...tracks.map((track) => (track.delay ?? 0) + track.duration)), duration);
    const overlay = tracks.find((track) => track.target === 'overlay');
    assert.equal(overlay.easing, 'linear');
    assert.equal(overlay.frames[2].offset * overlay.duration, spec.formation + spec.hold);
    const sheet = tracks.find((track) => track.target === 'sheet');
    assert.equal(sheet.delay, spec.formation + spec.hold + 200);
    assert.equal(sheet.frames.at(-1).opacity, 1);
    assert.match(overlay.frames.at(-1).clipPath, id === 'overprint' ? /100%/ : /42%/);
  }
});

test('text swaps use only text tracks and retain the configured offset or blur', () => {
  for (const id of ['overprint', 'coastal-reveal']) {
    const spec = resolveEffect(id, { scene: 'text-swap', duration: 900, offset: 19, blur: 9 }).spec;
    const [out, incoming] = frames.textTracks(spec, true);
    assert.equal(out.target, 'primary-text');
    assert.equal(incoming.target, 'alternate-text');
    assert.equal(out.duration, 160);
    assert.equal(incoming.delay + incoming.duration, sequenceDuration(spec));
    assert.equal(incoming.frames.at(-1).opacity, 1);
    assert.match(JSON.stringify([out, incoming]), id === 'overprint' ? /19px/ : /9px/);
  }
});

function mount({ scene = 'opening', reduced = false } = {}) {
  const resources = deferred();
  const playback = deferred();
  const timers = new Map();
  const events = new Map();
  const mediaEvents = new Map();
  const history = [];
  const swaps = [];
  const batches = [];
  let signal,
    intersect,
    disconnected = false,
    timerId = 0,
    cancellations = 0,
    pauses = 0,
    resumes = 0;
  const media = {
    matches: reduced,
    addEventListener: (name, fn) => mediaEvents.set(name, fn),
    removeEventListener: (name) => mediaEvents.delete(name),
  };
  const document = {
    hidden: false,
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: (name) => events.delete(name),
  };
  const player = {
    cancel: () => {
      cancellations++;
    },
    pause: () => {
      pauses++;
    },
    resume: () => {
      resumes++;
    },
    play: (tracks) => {
      batches.push(tracks);
      return playback.promise;
    },
  };
  const { createSequenceController } = load('sequence-controller', {
    require: (name) =>
      name.includes('frames')
        ? frames
        : name.includes('player')
          ? { createSequencePlayer: () => player }
          : name.includes('resources')
            ? {
                waitForSequenceResources: (_, input) => {
                  signal = input;
                  return resources.promise;
                },
              }
            : { bindSequenceScroll: () => ({ destroy() {}, refresh() {}, reset() {} }) },
    document,
    AbortController,
    innerWidth: 1280,
    innerHeight: 800,
    matchMedia: () => media,
    setTimeout: (fn) => {
      const id = ++timerId;
      timers.set(id, fn);
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    IntersectionObserver: class {
      constructor(fn) {
        intersect = fn;
      }
      observe() {}
      disconnect() {
        disconnected = true;
      }
    },
  });
  const controller = createSequenceController(
    { getBoundingClientRect: () => ({ top: 0, bottom: 500, left: 0, right: 800 }) },
    resolveEffect('overprint', { scene }).spec,
    (phase) => history.push(phase),
    (alternate) => swaps.push(alternate),
  );
  return {
    controller,
    resources,
    playback,
    history,
    swaps,
    batches,
    timers,
    events,
    mediaEvents,
    get signal() {
      return signal;
    },
    get disconnected() {
      return disconnected;
    },
    get cancellations() {
      return cancellations;
    },
    get pauses() {
      return pauses;
    },
    get resumes() {
      return resumes;
    },
    reduce() {
      media.matches = true;
      mediaEvents.get('change')();
    },
    hide() {
      document.hidden = true;
      events.get('visibilitychange')();
    },
    leave() {
      intersect([{ isIntersecting: false }]);
    },
  };
}
const tick = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

test('resource preparation never changes text early and repeated play cannot restart an active sequence', async () => {
  const preview = mount({ scene: 'text-swap' });
  const completion = preview.controller.replay();
  preview.controller.replay();
  assert.equal(preview.history.at(-1), 'preparing');
  assert.equal(preview.swaps.length, 0);
  preview.resources.resolve(true);
  await tick();
  assert.deepEqual(preview.swaps, [true]);
  assert.equal(preview.batches.length, 1);
  preview.controller.replay();
  assert.equal(preview.batches.length, 1);
  preview.controller.pause();
  assert.equal(preview.pauses, 1);
  assert.equal(preview.history.at(-1), 'paused');
  preview.controller.pause();
  assert.equal(preview.resumes, 1);
  preview.playback.resolve();
  await completion;
  assert.equal(preview.history.at(-1), 'idle');
  preview.controller.destroy();
});

test('resource failure, reduced motion and interrupted preparation keep static content usable', async () => {
  const failure = mount();
  const completion = failure.controller.replay();
  failure.resources.resolve(false);
  await completion;
  assert.equal(failure.history.at(-1), 'fallback');
  assert.equal(failure.batches.length, 0);
  failure.controller.destroy();
  const reduced = mount({ scene: 'text-swap', reduced: true });
  await reduced.controller.replay();
  assert.deepEqual(reduced.swaps, [true]);
  assert.equal(reduced.batches.length, 0);
  reduced.controller.destroy();
  for (const interrupt of ['reduce', 'hide', 'leave']) {
    const preview = mount();
    const pending = preview.controller.replay();
    preview[interrupt]();
    assert.equal(preview.signal.aborted, true);
    preview.resources.resolve(true);
    await pending;
    assert.equal(preview.batches.length, 0);
    preview.controller.destroy();
    assert.equal(preview.events.size + preview.mediaEvents.size, 0);
    assert.equal(preview.disconnected, true);
  }
});

test('rapid parameter edits debounce one replay and scene changes cancel that pending replay', () => {
  const preview = mount();
  for (const distance of [10, 20, 30])
    preview.controller.sync(resolveEffect('overprint', { distance }).spec);
  assert.equal(preview.timers.size, 1);
  preview.controller.sync(resolveEffect('overprint', { scene: 'scroll' }).spec);
  assert.equal(preview.timers.size, 0);
  preview.controller.destroy();
});

test('real resource waiter resolves readiness, rejection, timeout and abort with no surviving timers', async () => {
  for (const outcome of ['ready', 'failure', 'timeout', 'abort']) {
    const fonts = deferred();
    const image = deferred();
    const timers = new Set();
    const { waitForSequenceResources } = load('sequence-resources', {
      document: { fonts: { ready: fonts.promise } },
      setTimeout: (fn) => {
        timers.add(fn);
        return fn;
      },
      clearTimeout: (fn) => timers.delete(fn),
    });
    const abort = new AbortController();
    const pending = waitForSequenceResources(
      {
        querySelectorAll: () => [
          {
            decode: () =>
              outcome === 'failure'
                ? Promise.reject(new Error('image unavailable'))
                : image.promise,
          },
        ],
      },
      abort.signal,
    );
    if (outcome === 'timeout') [...timers][0]();
    else if (outcome === 'abort') abort.abort();
    else {
      fonts.resolve();
      image.resolve();
    }
    assert.equal(await pending, outcome === 'ready');
    assert.equal(timers.size, 0);
  }
});

test('presets keep the chosen scene and still identify their selected values', () => {
  const { presetValues, selectedPreset, effectPresets } = loadTypeScript('content/effects/presets');
  for (const id of ['overprint', 'coastal-reveal']) {
    const current = resolveEffect(id, { scene: 'text-swap' }).spec;
    const preset = effectPresets[id][1];
    const next = resolveEffect(id, presetValues(current, preset.values)).spec;
    assert.equal(next.scene, 'text-swap');
    assert.equal(selectedPreset(next), preset.id);
  }
});

test('scroll work stays in its viewport, batches frames, resumes unseen sections and cleans up', () => {
  let intersection,
    observed = 0,
    disconnected = false,
    queued = 0;
  const callbacks = new Map();
  const events = new Map();
  const transforms = {
    transform: '',
    removeProperty(name) {
      delete this[name];
    },
  };
  const viewport = {
    scrollTop: 0,
    scrollHeight: 1000,
    clientHeight: 400,
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: (name) => events.delete(name),
  };
  const sections = [0, 1, 2].map((index) => ({ dataset: { scrollIndex: String(index) } }));
  const root = {
    querySelector: (selector) =>
      selector === '.sequence-viewport' ? viewport : { style: transforms },
    querySelectorAll: () => sections,
  };
  let enabled = true;
  const animations = [];
  const { bindSequenceScroll } = load('sequence-scroll', {
    require: () => frames,
    requestAnimationFrame: (fn) => {
      const id = ++queued;
      callbacks.set(id, fn);
      return id;
    },
    cancelAnimationFrame: (id) => callbacks.delete(id),
    IntersectionObserver: class {
      constructor(fn, options) {
        intersection = fn;
        assert.equal(options.root, viewport);
      }
      observe() {
        observed++;
      }
      unobserve() {}
      disconnect() {
        disconnected = true;
      }
    },
  });
  const scroll = bindSequenceScroll(
    root,
    resolveEffect('coastal-reveal', { scene: 'scroll', distance: 40 }).spec,
    () => enabled,
    (...args) => animations.push(args),
  );
  const flush = () => {
    for (const [id, fn] of callbacks) {
      callbacks.delete(id);
      fn();
    }
  };
  flush();
  assert.equal(transforms.transform, 'translateY(20px)');
  intersection([{ isIntersecting: true, target: sections[0] }]);
  assert.equal(animations.length, 0);
  enabled = false;
  intersection([{ isIntersecting: true, target: sections[1] }]);
  enabled = true;
  scroll.refresh();
  assert.equal(observed, 6);
  intersection([{ isIntersecting: true, target: sections[1] }]);
  assert.equal(animations.length, 1);
  viewport.scrollTop = 600;
  events.get('scroll')();
  events.get('scroll')();
  assert.equal(callbacks.size, 1);
  flush();
  assert.equal(transforms.transform, 'translateY(-20px)');
  scroll.reset();
  assert.equal(viewport.scrollTop, 0);
  scroll.destroy();
  assert.equal(callbacks.size + events.size, 0);
  assert.equal(disconnected, true);
  assert.equal(transforms.transform, undefined);
});
