import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import HeroStatic from './HeroStatic';

const HeroTiltMotion = lazy(() => import('./HeroTiltMotion'));

/**
 * Non-immersive devices (and anything where the enhanced version fails to
 * load or throws) get the plain HeroStatic markup with zero framer-motion
 * or three.js involved at all — those libraries are never imported, never
 * executed, on that path.
 */
interface HeroProps {
  immersive: boolean;
  onPlayReel: () => void;
  onOpenResume: () => void;
}

export default function Hero({ immersive, onPlayReel, onOpenResume }: HeroProps) {
  return (
    <section id="hero">
      {immersive ? (
        <ErrorBoundary fallback={<HeroStatic onPlayReel={onPlayReel} onOpenResume={onOpenResume} />}>
          <Suspense fallback={<HeroStatic onPlayReel={onPlayReel} onOpenResume={onOpenResume} />}>
            <HeroTiltMotion onPlayReel={onPlayReel} onOpenResume={onOpenResume} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <HeroStatic onPlayReel={onPlayReel} onOpenResume={onOpenResume} />
      )}
    </section>
  );
}
