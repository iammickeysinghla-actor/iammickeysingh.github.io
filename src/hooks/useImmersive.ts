import { useEffect, useState } from 'react';

function probeWebgl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function evaluateImmersive(): boolean {
  try {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const wideEnough = window.matchMedia('(min-width: 900px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return finePointer && wideEnough && !reducedMotion && probeWebgl();
  } catch {
    return false;
  }
}

/**
 * True when the device can comfortably run WebGL/tilt effects:
 * a fine pointer, a reasonably wide viewport, no reduced-motion request,
 * and a confirmed working WebGL context. Gates the r3f canvas, mouse-tilt
 * rig, and 3D carousels so mobile (and anything that fails the WebGL probe)
 * stays on the flat 2D fallback. Every check is wrapped so a failure here
 * — matchMedia behaving unexpectedly, canvas access being blocked — can
 * only ever resolve to "not immersive", never throw and take the app down.
 */
export function useImmersive(): boolean {
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const evaluate = () => setImmersive(evaluateImmersive());
    evaluate();

    let queries: MediaQueryList[] = [];
    try {
      queries = [
        window.matchMedia('(pointer: fine)'),
        window.matchMedia('(min-width: 900px)'),
        window.matchMedia('(prefers-reduced-motion: reduce)'),
      ];
      queries.forEach((q) => q.addEventListener('change', evaluate));
    } catch {
      // If matchMedia listeners aren't available for some reason, we still
      // have the one-shot evaluate() above; just skip live updates.
    }

    return () => {
      queries.forEach((q) => {
        try {
          q.removeEventListener('change', evaluate);
        } catch {
          /* noop */
        }
      });
    };
  }, []);

  return immersive;
}
