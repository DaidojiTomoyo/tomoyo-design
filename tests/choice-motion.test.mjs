import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function eventTarget(properties = {}) {
  const listeners = new Map();
  return {
    ...properties,
    listeners,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener(name, handler) {
      if (listeners.get(name) === handler) listeners.delete(name);
    },
    dispatch: (name) => listeners.get(name)?.(),
  };
}

function mountChoice({ selected = 0, reduced = false, hidden = false } = {}) {
  const animations = [];
  const media = eventTarget({ matches: reduced });
  const document = eventTarget({ hidden });
  const resize = { callback: undefined, observed: undefined, disconnected: false };
  const refs = [];
  const effects = [];
  let refIndex = 0;
  let effectIndex = 0;
  let pending = [];
  let visual;
  let active;
  let reads = 0;
  const group = {
    dataset: {},
    rect: { left: 100, top: 40, width: 306, height: 44 },
    getBoundingClientRect() {
      return this.rect;
    },
    querySelector(selector) {
      assert.equal(selector, 'input:checked');
      return selected === null ? null : options[selected].input;
    },
  };
  const options = [0, 1, 2].map((index) => {
    const option = {
      rect: { left: 103 + index * 101, top: 43, width: 98, height: 38 },
      getBoundingClientRect() {
        return this.rect;
      },
    };
    option.input = {
      value: `choice-${index}`,
      closest(selector) {
        assert.equal(selector, 'label');
        return option;
      },
    };
    return option;
  });
  const highlight = {
    style: {},
    animate(frames, timing) {
      const animation = {
        frames,
        timing,
        playState: 'running',
        onfinish: null,
        cancel() {
          this.playState = 'idle';
          if (active === this) {
            visual = undefined;
            active = undefined;
          }
        },
        finish() {
          this.playState = 'finished';
          if (active === this) {
            visual = undefined;
            active = undefined;
          }
          this.onfinish?.();
        },
      };
      animations.push(animation);
      active = animation;
      visual = frames[0].clipPath;
      return animation;
    },
  };
  const react = {
    useRef(initial) {
      return (refs[refIndex++] ??= { current: initial });
    },
    useLayoutEffect(setup, dependencies) {
      const index = effectIndex++;
      const previous = effects[index];
      const changed =
        !previous ||
        !dependencies ||
        dependencies.length !== previous.dependencies?.length ||
        dependencies.some((value, offset) => !Object.is(value, previous.dependencies[offset]));
      if (changed) {
        pending.push(() => {
          previous?.cleanup?.();
          effects[index] = { dependencies, cleanup: setup() };
        });
      }
    },
  };
  const source = readFileSync(
    new URL('../components/ui/use-choice-motion.ts', import.meta.url),
    'utf8',
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require(name) {
      assert.equal(name, 'react');
      return react;
    },
    document,
    matchMedia: () => media,
    getComputedStyle(target) {
      assert.equal(target, highlight);
      reads++;
      return { clipPath: visual ?? highlight.style.clipPath ?? 'none' };
    },
    ResizeObserver: class {
      constructor(callback) {
        resize.callback = callback;
      }
      observe(target) {
        resize.observed = target;
      }
      disconnect() {
        resize.disconnected = true;
      }
    },
  });
  function render() {
    refIndex = 0;
    effectIndex = 0;
    pending = [];
    const { groupRef, highlightRef } = exports.useChoiceMotion();
    groupRef.current = group;
    highlightRef.current = highlight;
    for (const commit of pending) commit();
  }
  render();
  return {
    group,
    highlight,
    options,
    animations,
    media,
    document,
    resize,
    render,
    select(index) {
      selected = index;
      render();
    },
    moveVisual(clip) {
      visual = clip;
    },
    get reads() {
      return reads;
    },
    destroy() {
      for (const effect of effects) effect.cleanup?.();
    },
  };
}

function easingAt(progress, easing) {
  const match = easing.match(/^cubic-bezier\(([^)]+)\)$/);
  assert.ok(match, 'selection uses one continuous cubic easing');
  const [x1, y1, x2, y2] = match[1].split(',').map(Number);
  const coordinate = (t, a, b) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 60; iteration++) {
    const parameter = (low + high) / 2;
    if (coordinate(parameter, x1, x2) < progress) low = parameter;
    else high = parameter;
  }
  return coordinate((low + high) / 2, y1, y2);
}

test('mount places the selected ink without an entrance animation', () => {
  for (const selected of [0, 1, null]) {
    const choice = mountChoice({ selected });
    assert.equal(choice.animations.length, 0);
    assert.equal(choice.group.dataset.motionReady, 'true');
    assert.equal(choice.resize.observed, choice.group);
    assert.equal(
      choice.highlight.style.clipPath,
      selected === 0
        ? 'inset(3px 205px 3px 3px round 4px)'
        : selected === 1
          ? 'inset(3px 104px 3px 104px round 4px)'
          : 'inset(3px 153px 3px 153px round 4px)',
    );
    choice.destroy();
  }
});

test('selection decelerates across one path without an intermediate stop and restart', () => {
  const choice = mountChoice();
  choice.select(2);
  const { frames, timing } = choice.animations[0];
  assert.equal(frames.length, 2, 'an intermediate eased keyframe must not split the trip');
  assert.ok(frames.every((frame) => frame.easing === undefined));
  assert.equal(timing.duration, 240);
  assert.equal(frames[0].clipPath, 'inset(3px 205px 3px 3px round 4px)');
  assert.equal(frames[1].clipPath, 'inset(3px 3px 3px 205px round 4px)');
  // This samples the declared time curve, not browser frame delivery or GPU performance.
  let previousStep = Infinity;
  for (let percent = 10; percent < 99; percent++) {
    const from = easingAt(percent / 100, timing.easing);
    const to = easingAt((percent + 1) / 100, timing.easing);
    const step = to - from;
    assert.ok(step > 0, `the ink keeps moving at ${percent}% of the duration`);
    assert.ok(step <= previousStep + 1e-10, `the ink must not restart at ${percent}%`);
    previousStep = step;
  }
  choice.destroy();
});

test('an interrupted selection starts from its visible clip before cancelling the old animation', () => {
  const choice = mountChoice();
  choice.select(1);
  const interrupted = choice.animations[0];
  const intermediate = 'inset(3px 140px 3px 68px round 4px)';
  choice.moveVisual(intermediate);
  choice.select(2);
  assert.equal(interrupted.playState, 'idle');
  assert.equal(interrupted.onfinish, null);
  assert.equal(choice.animations.length, 2);
  assert.equal(choice.animations[1].frames[0].clipPath, intermediate);
  assert.equal(choice.highlight.style.clipPath, 'inset(3px 3px 3px 205px round 4px)');
  choice.animations[1].finish();
  choice.select(0);
  assert.equal(choice.animations[2].frames[0].clipPath, 'inset(3px 3px 3px 205px round 4px)');
  choice.destroy();
});

test('unrelated commits and unchanged resize notifications leave an in-flight selection alone', () => {
  const choice = mountChoice();
  choice.select(1);
  const reads = choice.reads;
  choice.moveVisual('inset(3px 140px 3px 68px round 4px)');
  choice.render();
  choice.select(1);
  choice.resize.callback();
  assert.equal(choice.animations.length, 1);
  assert.equal(choice.animations[0].playState, 'running');
  assert.equal(choice.reads, reads, 'unchanged choices do not resample or restart the animation');
  choice.destroy();
});

test('a custom value collapses the preset ink at its previous center and can be interrupted', () => {
  const choice = mountChoice({ selected: 1 });
  choice.select(null);
  const collapse = choice.animations[0];
  assert.equal(collapse.timing.duration, 180);
  assert.equal(collapse.frames[0].clipPath, 'inset(3px 104px 3px 104px round 4px)');
  assert.equal(collapse.frames[1].clipPath, 'inset(3px 153px 3px 153px round 4px)');
  const intermediate = 'inset(3px 130px 3px 130px round 4px)';
  choice.moveVisual(intermediate);
  choice.select(0);
  assert.equal(collapse.playState, 'idle');
  assert.equal(choice.animations[1].frames[0].clipPath, intermediate);
  assert.equal(choice.animations[1].timing.duration, 240);
  choice.destroy();
});

test('a changed layout settles the ink at the new bounds without replaying selection', () => {
  const choice = mountChoice();
  choice.select(1);
  choice.group.rect.width = 336;
  for (const [index, option] of choice.options.entries()) {
    option.rect.left = 103 + index * 111;
    option.rect.width = 108;
  }
  choice.resize.callback();
  assert.equal(choice.animations[0].playState, 'idle');
  assert.equal(choice.animations.length, 1);
  assert.equal(choice.highlight.style.clipPath, 'inset(3px 114px 3px 114px round 4px)');
  choice.destroy();
});

test('reduced motion and hidden documents cancel current ink motion and settle later selections', () => {
  for (const stop of ['reduce', 'hide']) {
    const choice = mountChoice();
    choice.select(1);
    if (stop === 'reduce') {
      choice.media.matches = true;
      choice.media.dispatch('change');
    } else {
      choice.document.hidden = true;
      choice.document.dispatch('visibilitychange');
    }
    assert.equal(choice.animations[0].playState, 'idle', stop);
    assert.equal(choice.highlight.style.clipPath, 'inset(3px 104px 3px 104px round 4px)');
    choice.select(2);
    assert.equal(choice.animations.length, 1, stop);
    assert.equal(choice.highlight.style.clipPath, 'inset(3px 3px 3px 205px round 4px)');
    choice.destroy();
  }
});

test('unmount cancels motion and removes observers, listeners and the enhanced styling marker', () => {
  const choice = mountChoice();
  choice.select(1);
  choice.destroy();
  assert.equal(choice.animations[0].playState, 'idle');
  assert.equal(choice.animations[0].onfinish, null);
  assert.equal(choice.resize.disconnected, true);
  assert.equal(choice.media.listeners.size + choice.document.listeners.size, 0);
  assert.equal(choice.group.dataset.motionReady, undefined);
  const reads = choice.reads;
  choice.media.dispatch('change');
  choice.document.dispatch('visibilitychange');
  assert.equal(choice.reads, reads);
  assert.equal(choice.animations.length, 1);
});
