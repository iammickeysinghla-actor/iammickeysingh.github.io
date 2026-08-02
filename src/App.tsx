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
import { useFadeIn } from './hooks/useFadeIn';
import { useImmersive } from './hooks/useImmersive';

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const immersive = useImmersive();
  useFadeIn([immersive]);

  return (
    <>
      <Cursor />
      <Nav />
      <Hero immersive={immersive} />
      <Reel />
      <FilmsSection immersive={immersive} />
      <hr className="divider" />
      <About />
      <hr className="divider" style={{ margin: 0, borderColor: 'var(--teal-mid)' }} />
      <Credits immersive={immersive} />
      <Gallery onOpen={setLightboxSrc} />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <Training />
      <Contact />
      <Footer />
    </>
  );
}
