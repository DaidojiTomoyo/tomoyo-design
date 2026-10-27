export function subscribeUrl(notify: () => void) {
  window.addEventListener('popstate', notify);
  window.addEventListener('hashchange', notify);
  window.addEventListener('tomoyo-selection', notify);
  return () => {
    window.removeEventListener('popstate', notify);
    window.removeEventListener('hashchange', notify);
    window.removeEventListener('tomoyo-selection', notify);
  };
}
export const readUrl = () => window.location.search + window.location.hash;
export const serverUrl = () => '';
