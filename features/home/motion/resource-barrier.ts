export type ResourceTask = { name: string; ready: Promise<unknown> };
export type ResourceResult = {
  status: 'ready' | 'degraded' | 'timeout' | 'aborted';
  failed: string[];
  pending: string[];
};

/** Readiness follows the resources, not a visit flag or an animation timer. */
export function waitForResources(
  tasks: ResourceTask[],
  signal: AbortSignal,
  timeout: number,
): Promise<ResourceResult> {
  return new Promise((resolve) => {
    const pending = new Set(tasks.map(({ name }) => name));
    const failed: string[] = [];
    let settled = false;
    const finish = (status: ResourceResult['status']) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal.removeEventListener('abort', abort);
      resolve({ status, failed: [...failed], pending: [...pending] });
    };
    const abort = () => finish('aborted');
    const timer = setTimeout(() => finish('timeout'), timeout);
    if (signal.aborted) {
      abort();
      return;
    }
    signal.addEventListener('abort', abort, { once: true });
    if (!tasks.length) finish('ready');
    for (const { name, ready } of tasks) {
      void ready.then(
        () => {
          pending.delete(name);
          if (!pending.size) finish(failed.length ? 'degraded' : 'ready');
        },
        () => {
          failed.push(name);
          pending.delete(name);
          if (!pending.size) finish('degraded');
        },
      );
    }
  });
}
