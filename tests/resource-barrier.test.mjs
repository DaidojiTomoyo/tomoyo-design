import assert from 'node:assert/strict';
import test from 'node:test';
import { waitForResources } from '../features/home/motion/resource-barrier.ts';

test('does not release the page when only some resources have finished', async () => {
  const image = Promise.withResolvers();
  let released = false;
  const result = waitForResources(
    [
      { name: 'fonts', ready: Promise.resolve() },
      { name: 'hero', ready: image.promise },
    ],
    new AbortController().signal,
    1000,
  ).then((value) => {
    released = true;
    return value;
  });
  await Promise.resolve();
  assert.equal(released, false);
  image.resolve();
  assert.deepEqual(await result, { status: 'ready', failed: [], pending: [] });
});

test('an unavailable texture degrades without reporting successful loading', async () => {
  const result = await waitForResources(
    [
      { name: 'hero', ready: Promise.resolve() },
      { name: 'paper', ready: Promise.reject(new Error('unavailable')) },
    ],
    new AbortController().signal,
    1000,
  );
  assert.deepEqual(result, { status: 'degraded', failed: ['paper'], pending: [] });
});

test('a stalled resource releases at the failure deadline with its name', async () => {
  const result = await waitForResources(
    [{ name: 'fonts', ready: new Promise(() => {}) }],
    new AbortController().signal,
    10,
  );
  assert.deepEqual(result, { status: 'timeout', failed: [], pending: ['fonts'] });
});

test('unmount cancellation releases waiting work before its resource deadline', async () => {
  const run = new AbortController();
  const pending = waitForResources(
    [{ name: 'hero', ready: new Promise(() => {}) }],
    run.signal,
    1000,
  );
  run.abort();
  assert.deepEqual(await pending, { status: 'aborted', failed: [], pending: ['hero'] });
});

test('cached resources complete immediately without a presentation timer', async () => {
  const result = await waitForResources(
    ['fonts', 'hero', 'paper', 'blue'].map((name) => ({ name, ready: Promise.resolve() })),
    new AbortController().signal,
    1000,
  );
  assert.deepEqual(result, { status: 'ready', failed: [], pending: [] });
});
