import { galleryImages } from '../data/content';
import DeckCarousel, { type CarouselItem } from './DeckCarousel';

export default function Gallery({ immersive, onOpen }: { immersive: boolean; onOpen: (src: string) => void }) {
  const items: CarouselItem[] = galleryImages.map((img, i) => ({
    key: img.src + i,
    ariaLabel: 'Open photo',
    onSelect: () => onOpen(img.src),
    content: (
      <img src={img.src} alt="Mickey Singh" loading="eager" style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined} />
    ),
  }));

  return (
    <section className="sec sec-coral" id="gallery">
      <p className="sec-label fade">Gallery</p>
      <h2 className="sec-title fade">
        The <em>Look</em>
      </h2>
      {immersive ? (
        <div className="fade">
          <DeckCarousel items={items} cardClassName="gallery-card" variant="flat" />
        </div>
      ) : (
        <div className="gallery-grid">
          {galleryImages.map((img) => (
            <div className="gi fade" key={img.src} onClick={() => onOpen(img.src)}>
              <img src={img.src} alt="Mickey Singh" loading="eager" style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
