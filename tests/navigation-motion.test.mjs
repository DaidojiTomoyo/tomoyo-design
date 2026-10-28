import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function load(path, globals = {}) {
  const source = readFileSync(new URL(`../${path}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, { exports, ...globals });
  return exports;
}

function eventTarget(properties = {}) {
  const listeners = new Map();
  return {
    ...properties,
    listeners,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name) => listeners.delete(name),
    dispatch: (name) => listeners.get(name)?.(),
  };
}

function recordAnimation(animations, element, frames, timing, onCancel = () => {}) {
  const animation = {
    element,
    frames,
    timing,
    playState: 'running',
    cancel() {
      this.playState = 'idle';
      onCancel();
    },
  };
  animations.push(animation);
  return animation;
}

function mountIndicator() {
  const animations = [];
  const media = eventTarget({ matches: false });
  let resolveFonts;
  const document = eventTarget({
    hidden: false,
    fonts: { ready: new Promise((resolve) => (resolveFonts = resolve)) },
  });
  const parent = { left: 10, top: 20 };
  const links = [20, 80, 140].map((top) => ({
    rect: { left: 10, top, width: 200, height: 40 },
    getBoundingClientRect() {
      return this.rect;
    },
  }));
  let selected = links[0];
  let reads = 0;
  let visual;
  const nav = {
    dataset: {},
    scrollLeft: 0,
    scrollTop: 0,
    getClientRects: () => [parent],
    getBoundingClientRect: () => parent,
    querySelector: () => selected,
    querySelectorAll: () => links,
  };
  const marker = {
    style: {},
    hidden: true,
    getBoundingClientRect() {
      reads++;
      return (
        visual ?? {
          left: parent.left + Number.parseFloat(this.style.left),
          top: parent.top + Number.parseFloat(this.style.top),
          width: Number.parseFloat(this.style.width),
          height: Number.parseFloat(this.style.height),
        }
      );
    },
    animate(frames, timing) {
      return recordAnimation(animations, marker, frames, timing, () => (visual = undefined));
    },
  };
  const resize = { callback: undefined, disconnected: false };
  const { createNavigationIndicator } = load('features/catalog/motion/navigation-indicator', {
    document,
    matchMedia: () => media,
    ResizeObserver: class {
      constructor(callback) {
        resize.callback = callback;
      }
      observe() {}
      disconnect() {
        resize.disconnected = true;
      }
    },
  });
  const controller = createNavigationIndicator(nav, marker);
  return {
    controller,
    nav,
    marker,
    links,
    animations,
    media,
    document,
    resize,
    resolveFonts,
    select(index) {
      selected = links[index];
      controller.update();
    },
    moveVisual(rect) {
      visual = rect;
    },
    get reads() {
      return reads;
    },
  };
}

function mountArrival() {
  const animations = [];
  const observers = [];
  const media = eventTarget({ matches: false });
  const document = eventTarget({ hidden: false });
  const element = (marked = false) => ({
    marked,
    style: {},
    computed: { transform: 'none', opacity: '1' },
    animate(frames, timing) {
      return recordAnimation(animations, this, frames, timing);
    },
  });
  const root = {
    ...element(),
    view: null,
    querySelector: () => root.view,
  };
  const { createContentArrival } = load('features/catalog/motion/content-arrival', {
    document,
    matchMedia: () => media,
    getComputedStyle: (target) => target.computed,
    MutationObserver: class {
      constructor(callback) {
        this.callback = callback;
        this.active = false;
        observers.push(this);
      }
      observe() {
        this.active = true;
      }
      disconnect() {
        this.active = false;
      }
    },
  });
  const controller = createContentArrival(root);
  return {
    controller,
    root,
    animations,
    observers,
    media,
    document,
    element,
    show(pathname, children) {
      root.view = {
        ...element(),
        dataset: { catalogPage: pathname },
        querySelectorAll: (selector) =>
          selector === '[data-route-enter]' ? children.filter((child) => child.marked) : children,
      };
      return root.view;
    },
    mutate() {
      for (const observer of observers) {
        if (observer.active) observer.callback();
      }
    },
  };
}

test('root transitions skip catalog navigation, locale changes and query-only edits', () => {
  const { motionRoute, shouldAnimatePage } = load('lib/navigation/route-motion');
  // usePathname supplies the path without search parameters.
  const route = (url) => motionRoute(new URL(url, 'https://example.test').pathname);
  for (const [from, to] of [
    ['/en/explore', '/en/explore/motion'],
    ['/en/explore/motion', '/en/effects/soft-reveal'],
    ['/en/effects/soft-reveal', '/en/effects/hover-lift'],
    ['/en/effects/hover-lift', '/en/explore'],
    ['/en/how-it-works', '/zh/how-it-works'],
    ['/en/how-it-works?q=one', '/en/how-it-works?q=two'],
  ]) {
    assert.equal(shouldAnimatePage(route(from), route(to)), false, `${from} → ${to}`);
  }
  for (const [from, to] of [
    ['/en', '/en/explore'],
    ['/en/explore', '/en/how-it-works'],
    ['/en/explore', '/en/explore-other'],
  ]) {
    assert.equal(shouldAnimatePage(route(from), route(to)), true, `${from} → ${to}`);
  }
});

test('rapid selection resumes the indicator from its visible intermediate rectangle', () => {
  const indicator = mountIndicator();
  assert.equal(indicator.animations.length, 0);
  indicator.select(1);
  const interrupted = indicator.animations[0];
  indicator.moveVisual({ left: 10, top: 50, width: 200, height: 40 });
  indicator.select(2);
  assert.equal(interrupted.playState, 'idle');
  assert.equal(indicator.animations.length, 2);
  assert.equal(indicator.animations[1].frames[0].transform, 'translate(0px, -90px) scale(1, 1)');
  assert.equal(indicator.marker.style.top, '120px');
  assert.equal(indicator.marker.hidden, false);
  indicator.controller.destroy();
});

test('indicator settles on layout and motion changes and ignores fonts resolving after unmount', async () => {
  for (const stop of ['resize', 'reduce', 'hide']) {
    const indicator = mountIndicator();
    indicator.select(1);
    indicator.links[1].rect.top = 95;
    if (stop === 'resize') indicator.resize.callback();
    if (stop === 'reduce') {
      indicator.media.matches = true;
      indicator.media.dispatch('change');
    }
    if (stop === 'hide') {
      indicator.document.hidden = true;
      indicator.document.dispatch('visibilitychange');
    }
    assert.equal(indicator.animations[0].playState, 'idle', stop);
    assert.equal(indicator.animations.length, 1, stop);
    assert.equal(indicator.marker.style.top, '75px', stop);
    indicator.controller.destroy();
    assert.equal(indicator.resize.disconnected, true);
    assert.equal(indicator.media.listeners.size + indicator.document.listeners.size, 0);
    assert.equal(indicator.nav.dataset.indicatorReady, undefined);
    const reads = indicator.reads;
    indicator.resolveFonts();
    await Promise.resolve();
    assert.equal(indicator.reads, reads, 'late font completion must not update a destroyed marker');
  }
});

test('streamed content animates its marked children once without moving fixed-control ancestors', () => {
  const arrival = mountArrival();
  const heading = arrival.element(true);
  const content = arrival.element(true);
  const fixedCopyBar = arrival.element();
  arrival.controller.enter('/en/effects/soft-reveal', 1);
  assert.equal(arrival.observers[0].active, true);
  arrival.show('/en/explore', [heading, content, fixedCopyBar]);
  arrival.mutate();
  assert.equal(arrival.animations.length, 0, 'the previous route must not animate');
  const view = arrival.show('/en/effects/soft-reveal', [heading, content, fixedCopyBar]);
  arrival.mutate();
  assert.deepEqual(
    arrival.animations.map((animation) => animation.element),
    [heading, content],
  );
  assert.equal(arrival.observers[0].active, false);
  arrival.mutate();
  assert.equal(arrival.animations.length, 2, 'later content changes must not replay the arrival');
  for (const ancestor of [arrival.root, view, fixedCopyBar]) assert.deepEqual(ancestor.style, {});
  arrival.controller.destroy();
});

test('rapid content navigation continues reused children from their current animated style', () => {
  const arrival = mountArrival();
  const heading = arrival.element(true);
  const oldContent = arrival.element(true);
  arrival.show('/en/explore', [heading, oldContent]);
  arrival.controller.enter('/en/explore', 1);
  heading.computed = { transform: 'matrix(1, 0, 0, 1, 3, 0)', opacity: '0.93' };
  const nextContent = arrival.element(true);
  arrival.show('/en/explore/motion', [heading, nextContent]);
  arrival.controller.enter('/en/explore/motion', -1);
  assert.equal(arrival.animations[0].playState, 'idle');
  assert.equal(arrival.animations[1].playState, 'idle');
  assert.equal(arrival.animations[2].frames[0].transform, heading.computed.transform);
  assert.equal(arrival.animations[2].frames[0].opacity, heading.computed.opacity);
  assert.equal(arrival.animations[3].element, nextContent);
  arrival.controller.destroy();
});

test('reduced motion, hidden tabs and unmount cancel running or pending content arrivals', () => {
  for (const stop of ['reduce', 'hide', 'destroy']) {
    for (const waiting of [false, true]) {
      const arrival = mountArrival();
      const heading = arrival.element(true);
      arrival.show('/en/explore', [heading]);
      arrival.controller.enter('/en/explore', 1);
      if (waiting) arrival.controller.enter('/en/effects/hover-lift', 1);
      if (stop === 'reduce') {
        arrival.media.matches = true;
        arrival.media.dispatch('change');
      }
      if (stop === 'hide') {
        arrival.document.hidden = true;
        arrival.document.dispatch('visibilitychange');
      }
      if (stop === 'destroy') arrival.controller.destroy();
      assert.equal(arrival.animations[0].playState, 'idle', `${stop}, waiting=${waiting}`);
      assert.equal(
        arrival.observers.some((observer) => observer.active),
        false,
      );
      arrival.show('/en/effects/hover-lift', [heading]);
      arrival.mutate();
      assert.equal(arrival.animations.length, 1, 'cancelled arrivals must not restart on mutation');
      arrival.controller.destroy();
      assert.equal(arrival.media.listeners.size + arrival.document.listeners.size, 0);
    }
  }
});
