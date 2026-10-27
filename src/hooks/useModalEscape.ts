import { useEffect } from 'react';

/**
 * Locks body scroll and closes on Escape while a modal/overlay is open.
 *
 * Plain `overflow:hidden` on body doesn't reliably stop background
 * scrolling on iOS Safari — touch-scrolling a fixed overlay's own scrollable
 * content can still rubber-band the page behind it, dragging the "fixed"
 * overlay along with it. Pinning body in place at its current scroll offset
 * (and restoring that offset on close) is the standard, actually-reliable
 * fix on iOS.
 */
export function useModalEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}
