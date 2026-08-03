import { galleryImages } from '../data/content';
import DeckCarousel, { type CarouselItem } from './DeckCarousel';
import ErrorBoundary from './ErrorBoundary';

export default function Gallery({ onOpen }: { onOpen: (src: string) => void }) {
  const items: CarouselItem[] = galleryImages.map((img, i) => ({
    key: img.src + i,
    ariaLabel: 'Open photo',
    onSelect: () => onOpen(img.src),
    content: (
      <img src={img.src} alt="Mickey Singh" loading="eager" style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined} />
    ),
  }));

  const gridFallback = (
    <div className="gallery-grid">
      {galleryImages.map((img) => (
        <div className="gi fade" key={img.src} onClick={() => onOpen(img.src)}>
          <img src={img.src} alt="Mickey Singh" loading="eager" style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="sec sec-coral" id="gallery">
      <p className="sec-label fade">Gallery</p>
      <h2 className="sec-title fade">
        The <em>Look</em>
      </h2>
      <ErrorBoundary fallback={gridFallback}>
        <div className="fade">
          <DeckCarousel items={items} cardClassName="gallery-card" variant="flat" />
        </div>
      </ErrorBoundary>
    </section>
  );
}
