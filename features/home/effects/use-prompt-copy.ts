import { useEffect, useRef, useState } from 'react';

export type CopyState = 'idle' | 'copying' | 'copied' | 'error';
export type PromptCopy = ReturnType<typeof usePromptCopy>;

export function usePromptCopy(prompt: string) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const copyRequest = useRef(0);
  const copyBusy = useRef(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      copyRequest.current += 1;
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  function openPrompt(selectText = false) {
    if (!detailsRef.current) return;
    detailsRef.current.open = true;
    promptRef.current?.focus({ preventScroll: true });
    if (selectText) promptRef.current?.select();
    detailsRef.current.scrollIntoView({ block: 'center' });
  }

  async function copyPrompt() {
    if (copyBusy.current) return;
    copyBusy.current = true;
    const request = ++copyRequest.current;
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(prompt);
      if (copyRequest.current !== request) return;
      setCopyState('copied');
      copyTimer.current = setTimeout(() => setCopyState('idle'), 2400);
    } catch {
      if (copyRequest.current !== request) return;
      setCopyState('error');
      openPrompt(true);
    } finally {
      copyBusy.current = false;
    }
  }

  function resetCopy() {
    copyRequest.current += 1;
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopyState('idle');
  }
  function selectText() {
    promptRef.current?.focus();
    promptRef.current?.select();
  }
  return { copyState, detailsRef, promptRef, openPrompt, copyPrompt, resetCopy, selectText };
}
