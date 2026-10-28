'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/** Only pathname changes animate. Query edits and locale changes keep their controls live. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const route = pathname.replace(/^\/(en|zh)/, '');
  const previous = useRef(route);
  useLayoutEffect(() => {
    const changed = previous.current !== route;
    previous.current = route;
    if (!changed || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = ref.current?.animate(
      // Transform would make this wrapper the containing block of fixed copy controls.
      [{ opacity: 0.65 }, { opacity: 1 }],
      { duration: 240, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    );
    return () => animation?.cancel();
  }, [route]);
  return <div ref={ref}>{children}</div>;
}
