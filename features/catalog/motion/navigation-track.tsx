'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createNavigationIndicator } from './navigation-indicator';

export function NavigationTrack({
  pathname,
  label,
  children,
}: {
  pathname: string;
  label: string;
  children: ReactNode;
}) {
  const nav = useRef<HTMLElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const controller = useRef<ReturnType<typeof createNavigationIndicator> | null>(null);
  useLayoutEffect(() => {
    if (!nav.current || !marker.current) return;
    const current = createNavigationIndicator(nav.current, marker.current);
    controller.current = current;
    return () => {
      current.destroy();
      controller.current = null;
    };
  }, []);
  useLayoutEffect(() => controller.current?.update(), [pathname]);
  return (
    <nav ref={nav} className="catalog-navigation-track" aria-label={label}>
      <span ref={marker} className="catalog-nav-marker" aria-hidden="true" hidden />
      {children}
    </nav>
  );
}
