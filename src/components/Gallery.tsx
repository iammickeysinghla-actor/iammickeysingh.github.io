import { galleryImages } from '../data/content';

export default function Gallery({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <section className="sec sec-coral" id="gallery">
      <p className="sec-label fade">Gallery</p>
      <h2 className="sec-title fade">
        The <em>Look</em>
      </h2>
      <div className="gallery-grid">
        {galleryImages.map((img) => (
          <div className="gi fade" key={img.src} onClick={() => onOpen(img.src)}>
            <img src={img.src} alt="Mickey Singh" loading="eager" style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined} />
          </div>
        ))}
      </div>
    </section>
  );
}
