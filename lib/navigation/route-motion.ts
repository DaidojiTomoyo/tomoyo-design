import { stripLocalePrefix } from '../../i18n/config';

export const motionRoute = stripLocalePrefix;

export const isCatalogRoute = (route: string) => /^\/(explore|effects)(\/|$)/.test(route);

/** The persistent catalog owns its content animation; its chrome must never fade. */
export function shouldAnimatePage(previous: string, next: string) {
  return previous !== next && !(isCatalogRoute(previous) && isCatalogRoute(next));
}
