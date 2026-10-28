'use client';
import { useSearchParams } from 'next/navigation';

export function useQuery(initial = '') {
  const params = useSearchParams();
  return new URLSearchParams(params?.toString() ?? initial);
}
export function replaceQuery(params: URLSearchParams) {
  const query = params.toString();
  window.history.replaceState(
    null,
    '',
    `${location.pathname}${query ? `?${query}` : ''}${location.hash}`,
  );
  window.dispatchEvent(new Event('tomoyo-selection'));
}
