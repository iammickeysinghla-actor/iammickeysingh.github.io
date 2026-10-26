import { useEffect } from 'react';

/** Locks body scroll and closes on Escape while a modal/overlay is open. */
export function useModalEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}
