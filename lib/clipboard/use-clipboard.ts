'use client';
import { useEffect, useRef, useState } from 'react';

export function useClipboard(text: string, onError?: () => void) {
  const [result, setResult] = useState<{
    text: string;
    status: 'copying' | 'copied' | 'error';
  } | null>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  const status = result?.text === text ? result.status : 'idle';
  async function copy() {
    if (busy.current) return;
    busy.current = true;
    clearTimeout(timer.current);
    setResult({ text, status: 'copying' });
    try {
      await navigator.clipboard.writeText(text);
      if (!mounted.current) return;
      setResult({ text, status: 'copied' });
      timer.current = setTimeout(() => setResult(null), 2400);
    } catch {
      if (!mounted.current) return;
      setResult({ text, status: 'error' });
      onError?.();
    } finally {
      busy.current = false;
    }
  }
  return { status, copy };
}
