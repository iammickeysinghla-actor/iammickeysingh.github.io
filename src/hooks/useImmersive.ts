import { useEffect, useState } from 'react';

/**
 * True when the device can comfortably run WebGL/tilt effects:
 * a fine pointer, a reasonably wide viewport, and no reduced-motion request.
 * Gates the r3f canvas, mouse-tilt rig, and 3D film deck so mobile stays
 * on the flat 2D fallback and never pays for a WebGL context it can't use well.
 */
export function useImmersive(): boolean {
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const wideEnough = window.matchMedia('(min-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => {
      setImmersive(finePointer.matches && wideEnough.matches && !reducedMotion.matches);
    };
    evaluate();

    finePointer.addEventListener('change', evaluate);
    wideEnough.addEventListener('change', evaluate);
    reducedMotion.addEventListener('change', evaluate);
    return () => {
      finePointer.removeEventListener('change', evaluate);
      wideEnough.removeEventListener('change', evaluate);
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  return immersive;
}
