import { heroImg } from '../data/content';

interface HeroStaticProps {
  onPlayReel: () => void;
  onOpenResume: () => void;
}

/**
 * Plain, framer-motion-free hero markup. This is the default render for
 * non-immersive devices, and also the ErrorBoundary/Suspense fallback for
 * the enhanced tilt version — so if the tilt/particle layer ever fails to
 * load or throws, this is exactly what visitors see instead of nothing.
 */
export default function HeroStatic({ onPlayReel, onOpenResume }: HeroStaticProps) {
  return (
    <>
      <div className="hero-tilt">
        <img className="hero-img" src={heroImg} alt="Mickey Singh" loading="eager" fetchPriority="high" />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content fade">
        <p className="eyebrow">Los Angeles · Actor · Filmmaker</p>
        <h1 className="hero-name">
          Mickey
          <br />
          <em>Singh</em>
        </h1>
        <p className="hero-tag">
          Lead dramatic actor. Trained at Meisner Technique Studio &amp; The Acting Center.
          <br />
          Performing in English, Hindi &amp; Punjabi. SAG-AFTRA member.
        </p>
        <div className="cta-row">
          <button type="button" onClick={onPlayReel} className="btn-p">
            ▶ &nbsp;Watch Reel
          </button>
          <button type="button" onClick={onOpenResume} className="btn-g">
            Resume &nbsp;↗
          </button>
        </div>
      </div>
      <div className="scroll-ind">
        <div className="s-line" />
        <span>Scroll</span>
      </div>
    </>
  );
}
