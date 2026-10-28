import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { loadTypeScript } from './helpers/load-ts.mjs';
const { resolveEffect } = loadTypeScript('content/effects/schema');

function load(name, globals) {
  const source = readFileSync(new URL(`../components/effects/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, { exports, ...globals });
  return exports;
}

function mount({ reduced = false, glassSupport = true } = {}) {
  const listeners = new Map();
  const documentListeners = new Map();
  const mediaListeners = new Map();
  const animations = [];
  const timers = new Map();
  let timerId = 0;
  const surface = {
    style: {},
    animate(frames, timing) {
      const animation = {
        frames,
        timing,
        cancelled: false,
        cancel() {
          this.cancelled = true;
        },
      };
      animations.push(animation);
      return animation;
    },
  };
  const button = {
    matches: () => true,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name) => listeners.delete(name),
  };
  const document = {
    hidden: false,
    addEventListener: (name, handler) => documentListeners.set(name, handler),
    removeEventListener: (name) => documentListeners.delete(name),
  };
  const media = {
    matches: reduced,
    addEventListener: (name, handler) => mediaListeners.set(name, handler),
    removeEventListener: (name) => mediaListeners.delete(name),
  };
  const frames = load('preview-frames', {
    CSS: { supports: () => glassSupport },
    getComputedStyle: () => surface.style,
  });
  let intersect;
  let disconnected = false;
  const { createPreviewController } = load('preview-controller', {
    require: () => frames,
    document,
    setTimeout: (callback) => {
      const id = ++timerId;
      timers.set(id, callback);
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    matchMedia: (query) => (query.includes('reduced') ? media : { matches: true }),
    IntersectionObserver: class {
      constructor(callback) {
        intersect = callback;
      }
      observe() {}
      disconnect() {
        disconnected = true;
      }
    },
  });
  let playing = false;
  const controller = createPreviewController(
    button,
    surface,
    resolveEffect('hover-lift').spec,
    (value) => {
      playing = value;
    },
  );
  return {
    controller,
    surface,
    animations,
    listeners,
    documentListeners,
    mediaListeners,
    timers,
    flushTimers() {
      for (const [id, callback] of timers) {
        timers.delete(id);
        callback();
      }
    },
    get playing() {
      return playing;
    },
    get disconnected() {
      return disconnected;
    },
    reduce() {
      media.matches = true;
      mediaListeners.get('change')();
    },
    hide() {
      document.hidden = true;
      documentListeners.get('visibilitychange')();
    },
    leaveViewport() {
      intersect([{ isIntersecting: false }]);
    },
  };
}

test('rapid replay does not restart a running effect', () => {
  const preview = mount();
  preview.controller.replay();
  preview.controller.replay();
  preview.controller.replay();
  assert.equal(preview.animations.length, 1);
  assert.equal(preview.animations[0].cancelled, false);
  assert.equal(preview.playing, true);
  preview.controller.destroy();
});

test('reduced motion keeps all content visible and creates no animations', () => {
  const preview = mount({ reduced: true });
  for (const id of ['hover-lift', 'soft-reveal', 'frosted-glass']) {
    preview.controller.sync(resolveEffect(id).spec);
    preview.listeners.get('focus')();
    preview.controller.replay();
    assert.equal(preview.surface.style.opacity, '1');
    assert.equal(preview.surface.style.transform, 'translateY(0) scale(1) rotate(0deg)');
  }
  assert.equal(preview.animations.length, 0);
  assert.equal(preview.playing, false);
  preview.controller.destroy();
});

test('motion preference, hidden tab and offscreen changes cancel a preview safely', () => {
  for (const stop of ['reduce', 'hide', 'leaveViewport']) {
    const preview = mount();
    preview.controller.replay();
    preview[stop]();
    assert.equal(preview.animations[0].cancelled, true);
    assert.equal(preview.surface.style.opacity, '1');
    assert.equal(preview.playing, false);
    preview.controller.destroy();
    assert.equal(
      preview.listeners.size + preview.documentListeners.size + preview.mediaListeners.size,
      0,
    );
    assert.equal(preview.disconnected, true);
  }
});

test('changing parameters during playback cancels the old animation and applies current values', () => {
  const preview = mount();
  preview.controller.replay();
  preview.controller.sync(resolveEffect('hover-lift', { distance: 22, duration: 500 }).spec);
  assert.equal(preview.animations[0].cancelled, true);
  assert.equal(preview.playing, false);
  preview.controller.replay();
  assert.ok(
    preview.animations
      .at(-1)
      .frames.some((frame) => frame.transform === 'translateY(-22px) scale(1) rotate(0deg)'),
  );
  preview.controller.destroy();
});

test('effect-specific transform, blur and delay reach the actual animation frames', () => {
  const preview = mount();
  preview.controller.sync(
    resolveEffect('hover-lift', { scale: 1.08, rotation: -3, distance: 16 }).spec,
  );
  preview.flushTimers();
  assert.ok(
    preview.animations
      .at(-1)
      .frames.some((frame) => frame.transform === 'translateY(-16px) scale(1.08) rotate(-3deg)'),
  );
  preview.controller.sync(
    resolveEffect('soft-reveal', {
      direction: 'right',
      distance: 36,
      blur: 12,
      startScale: 0.9,
      delay: 200,
      duration: 800,
    }).spec,
  );
  preview.flushTimers();
  const reveal = preview.animations.at(-1);
  assert.equal(reveal.timing.duration, 1120);
  assert.equal(reveal.frames[1].transform, 'translateX(-36px) scale(0.9)');
  assert.equal(reveal.frames[1].filter, 'blur(12px)');
  assert.equal(reveal.frames[2].opacity, '0');
  assert.equal(reveal.frames.at(-1).filter, 'blur(0px)');
  preview.controller.destroy();
});

test('rapid control edits collapse to one replay and pending work is cancelled on unmount', () => {
  const preview = mount();
  for (const distance of [10, 20, 30])
    preview.controller.sync(resolveEffect('soft-reveal', { distance }).spec);
  assert.equal(preview.timers.size, 1);
  preview.controller.destroy();
  assert.equal(preview.timers.size, 0);
  assert.equal(preview.playing, false);
});

test('unsupported backdrop filtering retains an opaque readable surface', () => {
  const preview = mount({ reduced: true, glassSupport: false });
  preview.controller.sync(resolveEffect('frosted-glass').spec);
  assert.equal(preview.surface.style.backgroundColor, '#f7e8d8');
  assert.equal(preview.surface.style.backdropFilter, 'blur(0px) saturate(1)');
  preview.controller.destroy();
});
