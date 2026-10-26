import { useState } from 'react';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Reel from './components/Reel';
import FilmsSection from './components/FilmsSection';
import About from './components/About';
import Credits from './components/Credits';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import VideoModal from './components/VideoModal';
import ResumeModal from './components/ResumeModal';
import Training from './components/Training';
import Reps from './components/Reps';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { useFadeIn } from './hooks/useFadeIn';
import { useImmersive } from './hooks/useImmersive';
import { reelVideoId } from './data/content';

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const immersive = useImmersive();
  useFadeIn([immersive]);

  return (
    <>
      <ErrorBoundary>
        <Cursor />
      </ErrorBoundary>
      <ErrorBoundary>
        <Nav />
      </ErrorBoundary>
      <Hero immersive={immersive} onPlayReel={() => setReelOpen(true)} onOpenResume={() => setResumeOpen(true)} />
      <ErrorBoundary>
        <Reel onPlay={() => setReelOpen(true)} />
      </ErrorBoundary>
      <ErrorBoundary>
        <FilmsSection />
      </ErrorBoundary>
      <hr className="divider" />
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      <hr className="divider" style={{ margin: 0, borderColor: 'var(--teal-mid)' }} />
      <ErrorBoundary>
        <Credits immersive={immersive} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Gallery onOpen={setLightboxSrc} />
      </ErrorBoundary>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <VideoModal videoId={reelOpen ? reelVideoId : null} onClose={() => setReelOpen(false)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ErrorBoundary>
        <Training />
      </ErrorBoundary>
      <ErrorBoundary>
        <Reps />
      </ErrorBoundary>
      <ErrorBoundary>
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </ErrorBoundary>
      <Footer />
    </>
  );
}
