'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { categories, effects } from '@/content/effects/registry';
import { motionRoute } from '@/lib/navigation/route-motion';
import { createContentArrival } from './motion/content-arrival';

const routes = [
  '/explore',
  ...categories.flatMap((category) => [
    `/explore/${category.id}`,
    ...effects
      .filter((effect) => effect.category === category.id)
      .map((effect) => `/effects/${effect.id}`),
  ]),
];

export function CatalogContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const route = motionRoute(pathname);
  const previous = useRef({ route, pathname });
  const main = useRef<HTMLElement>(null);
  const controller = useRef<ReturnType<typeof createContentArrival> | null>(null);
  useLayoutEffect(() => {
    if (!main.current) return;
    const current = createContentArrival(main.current);
    controller.current = current;
    return () => {
      current.destroy();
      controller.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    const old = previous.current;
    previous.current = { route, pathname };
    if (old.route !== route) {
      const direction = routes.indexOf(route) < routes.indexOf(old.route) ? -1 : 1;
      controller.current?.enter(pathname, direction);
    } else if (old.pathname !== pathname) {
      controller.current?.cancel();
    }
  }, [pathname, route]);
  return (
    <main id="catalog-content" className="catalog-main" ref={main} tabIndex={-1}>
      {children}
    </main>
  );
}
