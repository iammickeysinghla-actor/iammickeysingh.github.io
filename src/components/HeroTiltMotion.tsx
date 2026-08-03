import { lazy, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { heroImg, reelVideoId, resumeUrl } from '../data/content';
import ErrorBoundary from './ErrorBoundary';

const ParticleField = lazy(() => import('../three/ParticleField'));

/**
 * The tilt/particle-enhanced hero. Only ever imported (and only ever runs
 * any framer-motion or three.js code) when the immersive gate has already
 * confirmed the device can handle it — see Hero.tsx, which lazy-loads this
 * component and falls back to HeroStatic on any load/render error.
 */
export default function HeroTiltMotion() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 18 });
  const springY = useSpring(my, { stiffness: 120, damping: 18 });

  const imgRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const imgRotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const overlayRotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const overlayRotateY = useTransform(springX, [-0.5, 0.5], [-11, 11]);
  const contentTranslateX = useTransform(springX, [-0.5, 0.5], [4, -4]);
  const contentTranslateY = useTransform(springY, [-0.5, 0.5], [3, -3]);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} style={{ position: 'absolute', inset: 0 }}>
      <motion.div className="hero-tilt" style={{ rotateX: imgRotateX, rotateY: imgRotateY }}>
        <img className="hero-img" src={heroImg} alt="Mickey Singh" loading="eager" fetchPriority="high" />
      </motion.div>

      <motion.div className="hero-overlay" style={{ rotateX: overlayRotateX, rotateY: overlayRotateY }} />

      <ErrorBoundary>
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </ErrorBoundary>

      <motion.div className="hero-content fade" style={{ x: contentTranslateX, y: contentTranslateY }}>
        <p className="eyebrow">Los Angeles · Actor · Filmmaker</p>
        <h1 className="hero-name">
          Mickey
          <br />
          <em>Singh</em>
        </h1>
        <p className="hero-tag">
          Lead dramatic actor. Trained at Meisner Technique Studio &amp; The Acting Center.
          <br />
          Performing in English, Hindi &amp; Punjabi.
        </p>
        <div className="cta-row">
          <a href={`https://youtu.be/${reelVideoId}`} target="_blank" rel="noopener noreferrer" className="btn-p">
            ▶ &nbsp;Watch Reel
          </a>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-g">
            Resume &nbsp;↗
          </a>
        </div>
      </motion.div>
      <div className="scroll-ind">
        <div className="s-line" />
        <span>Scroll</span>
      </div>
    </div>
  );
}
