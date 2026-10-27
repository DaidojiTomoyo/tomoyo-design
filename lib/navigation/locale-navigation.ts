let pendingNavigation: { pathname: string; at: number } | undefined;

export function rememberLocaleNavigation(pathname: string) {
  // This intent belongs to a client navigation and must not survive a reload.
  pendingNavigation = { pathname, at: Date.now() };
}
export function isLocaleNavigation() {
  return (
    pendingNavigation?.pathname === location.pathname && Date.now() - pendingNavigation.at < 5000
  );
}
