/** A replay waits for its own resources, never for an invented progress timer. */
export function waitForSequenceResources(root: HTMLElement, signal: AbortSignal, timeout = 10000) {
  return new Promise<boolean>((resolve) => {
    let done = false;
    const finish = (ready: boolean) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      signal.removeEventListener('abort', abort);
      resolve(ready);
    };
    const abort = () => finish(false);
    const timer = setTimeout(abort, timeout);
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) return abort();
    const images = [...root.querySelectorAll('img')].map((image) => image.decode());
    void Promise.allSettled([document.fonts.ready, ...images]).then((results) =>
      finish(results.every((result) => result.status === 'fulfilled')),
    );
  });
}
