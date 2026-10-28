const key = (path: string) => `tomoyo:catalog-scroll:${path}`;
export function rememberCatalogPosition() {
  try {
    sessionStorage.setItem(key(location.pathname + location.search), String(scrollY));
  } catch {
    /* Browsing remains available when storage is restricted. */
  }
}
export function restoreCatalogPosition() {
  if (isLocaleNavigation()) return;
  let top = 0;
  try {
    const position = Number(sessionStorage.getItem(key(location.pathname + location.search)));
    if (Number.isFinite(position) && position > 0) top = position;
  } catch {
    /* Native history still restores browser-managed positions. */
  }
  window.scrollTo({ top, behavior: 'instant' });
}
import { isLocaleNavigation } from '@/lib/navigation/locale-navigation';
