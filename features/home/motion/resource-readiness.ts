import { studyMotion } from '@/content/motion-studies';
import { waitForResources, type ResourceTask } from './resource-barrier';

function decoded(image: HTMLImageElement) {
  return image.decode().then(() => {
    if (!image.naturalWidth) throw new Error('Image unavailable');
  });
}

export async function prepareResources(root: HTMLElement, signal: AbortSignal) {
  // Read the rendered styles first, so the font set includes the current language.
  const style = getComputedStyle(root);
  const tasks: ResourceTask[] = [
    {
      name: 'fonts',
      ready: document.fonts.ready.then(() => {
        if ([...document.fonts].some((font) => font.status === 'error')) {
          throw new Error('Font fallback in use');
        }
      }),
    },
  ];
  root.querySelectorAll<HTMLImageElement>('.coast-print, .intro-coast').forEach((image, index) => {
    tasks.push({ name: `image-${index}`, ready: decoded(image) });
  });
  // These URLs are the same optimized textures that the page actually paints.
  for (const name of ['paper', 'blue']) {
    const value = style.getPropertyValue(`--${name}-texture`).trim();
    const url = /^url\(["']?(.*?)["']?\)$/.exec(value)?.[1];
    if (!url) continue;
    const image = new Image();
    image.src = url;
    tasks.push({ name: `${name}-texture`, ready: decoded(image) });
  }
  const result = await waitForResources(tasks, signal, studyMotion.loading.resourceTimeout);
  if (!signal.aborted) {
    root.dataset.resources = result.status;
    root.dataset.assetsReady = result.status === 'ready' ? 'true' : 'fallback';
  }
  return result;
}
