import type { MotionDirection } from '@/content/motion-studies';
import { isLocaleNavigation } from '@/lib/navigation/locale-navigation';
import { createMotionRuntime } from './animation-runtime';
import { finishOpening } from './opening';
import { prepareResources } from './resource-readiness';
import { playPageEntry } from './page-entry';
import { playLocaleArrival } from './locale-arrival';
import { observeScrollMotion } from './scroll-motion';

export function createHomeMotion(
  root: HTMLElement,
  direction: MotionDirection,
  languageChanged: boolean,
  preview: boolean,
) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const runtime = createMotionRuntime(reduced);
  const scroll = observeScrollMotion(root, direction, reduced, runtime);
  const intro = root.querySelector<HTMLElement>('.motion-intro')!;
  const content = root.querySelector<HTMLElement>('.motion-content')!;
  let current: AbortController | undefined;
  let disposed = false;
  root.dataset.textTransition = 'startViewTransition' in document ? 'native' : 'fallback';

  function complete() {
    current?.abort();
    runtime.cancel(runtime.arrival);
    root.dataset.motionPhase = 'complete';
    root.setAttribute('aria-busy', 'false');
  }

  async function start(replay = false) {
    current?.abort();
    runtime.cancel(runtime.arrival);
    const run = new AbortController();
    current = run;
    const demo = replay || preview;
    delete root.dataset.loadingUi;
    root.dataset.entryKind = replay ? 'replay' : preview ? 'preview' : 'resources';
    if (reduced.matches || typeof intro.getAnimations !== 'function') {
      complete();
      return;
    }
    // The script-free recovery must never be covered again by late hydration.
    if (
      !replay &&
      root.dataset.motionPhase === 'checking' &&
      getComputedStyle(content).visibility === 'visible'
    ) {
      root.dataset.entryKind = 'recovery';
      complete();
      return;
    }
    if (replay) {
      root.dataset.motionPhase = 'complete';
      // Explicit replay is the only path that restarts CSS formation.
      void intro.offsetWidth;
    }
    root.dataset.motionPhase = 'loading';
    root.dataset.resources = 'pending';
    root.dataset.assetsReady = 'pending';
    root.setAttribute('aria-busy', 'true');
    await prepareResources(root, run.signal);
    if (run.signal.aborted || disposed) return;
    if (document.hidden) {
      root.dataset.loadingUi = 'background';
      complete();
      return;
    }
    if (!demo && getComputedStyle(intro).visibility === 'hidden') {
      root.dataset.loadingUi = 'bypassed';
      complete();
      return;
    }
    root.dataset.loadingUi = 'shown';
    await finishOpening(root, run.signal, demo);
    if (run.signal.aborted || disposed) return;
    root.dataset.motionPhase = 'entering';
    root.setAttribute('aria-busy', 'false');
    await playPageEntry(root, direction, runtime);
    if (run.signal.aborted || disposed) return;
    root.dataset.motionPhase = 'complete';
  }

  function preferenceChanged() {
    if (reduced.matches) {
      complete();
      runtime.cancel(runtime.supporting);
      scroll.reset();
    } else scroll.refresh();
  }
  function visibilityChanged() {
    if (document.hidden) {
      const resourcesPending =
        root.dataset.motionPhase === 'loading' && root.dataset.resources === 'pending';
      // Backgrounding stops decoration, not the resource barrier.
      if (!resourcesPending) complete();
      runtime.cancel(runtime.supporting);
    } else scroll.refresh();
  }
  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    void start(true);
  };
  if (languageChanged || isLocaleNavigation()) {
    complete();
    root.dataset.entryKind = 'language';
    playLocaleArrival(root, direction, runtime);
  } else void start();

  window.addEventListener('tomoyo-intro-replay', replay);
  reduced.addEventListener('change', preferenceChanged);
  document.addEventListener('visibilitychange', visibilityChanged);
  return {
    destroy() {
      disposed = true;
      // React development replays effect setup. Keep the CSS timeline intact.
      current?.abort();
      runtime.cancel(runtime.arrival);
      runtime.cancel(runtime.supporting);
      scroll.destroy();
      window.removeEventListener('tomoyo-intro-replay', replay);
      reduced.removeEventListener('change', preferenceChanged);
      document.removeEventListener('visibilitychange', visibilityChanged);
    },
  };
}
