import { lazy, Suspense, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { heroImg, reelVideoId, resumeUrl } from '../data/content';

const ParticleField = lazy(() => import('../three/ParticleField'));

export default function Hero({ immersive }: { immersive: boolean }) {
  const heroRef = useRef<HTMLElement>(null);

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

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (!immersive || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section id="hero" ref={heroRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <motion.div
        className="hero-tilt"
        style={{ rotateX: immersive ? imgRotateX : 0, rotateY: immersive ? imgRotateY : 0 }}
      >
        <img className="hero-img" src={heroImg} alt="Mickey Singh" loading="eager" fetchPriority="high" />
      </motion.div>

      <motion.div
        className="hero-overlay"
        style={{ rotateX: immersive ? overlayRotateX : 0, rotateY: immersive ? overlayRotateY : 0 }}
      />

      {immersive && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}

      <motion.div
        className="hero-content fade"
        style={{ x: immersive ? contentTranslateX : 0, y: immersive ? contentTranslateY : 0 }}
      >
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
    </section>
  );
}
