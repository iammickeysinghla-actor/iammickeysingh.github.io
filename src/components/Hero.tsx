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
export default function Hero({ immersive }: { immersive: boolean }) {
  return (
    <section id="hero">
      {immersive ? (
        <ErrorBoundary fallback={<HeroStatic />}>
          <Suspense fallback={<HeroStatic />}>
            <HeroTiltMotion />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <HeroStatic />
      )}
    </section>
  );
}
