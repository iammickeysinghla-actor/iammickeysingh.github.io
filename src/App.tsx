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
import Training from './components/Training';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { useFadeIn } from './hooks/useFadeIn';
import { useImmersive } from './hooks/useImmersive';

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
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
      <Hero immersive={immersive} />
      <ErrorBoundary>
        <Reel />
      </ErrorBoundary>
      <ErrorBoundary>
        <FilmsSection immersive={immersive} />
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
        <Gallery immersive={immersive} onOpen={setLightboxSrc} />
      </ErrorBoundary>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <ErrorBoundary>
        <Training />
      </ErrorBoundary>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
      <Footer />
    </>
  );
}
