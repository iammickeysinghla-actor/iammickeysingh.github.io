import { useEffect, useRef, useState } from 'react';

export interface DeckSlide {
  key: string;
  href: string;
  content: React.ReactNode;
}

interface FilmDeckProps {
  slides: DeckSlide[];
}

/**
 * Depth-stacked 3D deck: active card front-and-center, neighbors fanned to
 * either side in perspective. Click a side card (or the arrows) to advance;
 * the active card additionally tilts toward the cursor with a matching
 * synthetic shadow shift, for a physical, tactile feel on hover.
 */
export default function FilmDeck({ slides }: FilmDeckProps) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const n = slides.length;

  const layout = () => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rel = (i - active + n) % n;
      let tx = 0,
        ty = 0,
        rz = 0,
        sc = 1,
        z = 0,
        op = 1,
        pe: 'auto' | 'none' = 'auto';
      if (rel === 0) {
        z = 60;
      } else if (rel === 1) {
        tx = 58;
        ty = 14;
        rz = 6;
        sc = 0.82;
        z = 10;
        op = 0.75;
      } else if (n - rel === 1) {
        tx = -58;
        ty = 14;
        rz = -6;
        sc = 0.82;
        z = 10;
        op = 0.75;
      } else {
        op = 0;
        pe = 'none';
      }
      card.style.opacity = String(op);
      card.style.pointerEvents = pe;
      card.style.zIndex = String(rel === 0 ? 5 : 3);
      card.style.transform = `translateX(${tx}%) translateY(${ty}px) translateZ(${z}px) rotateY(${rz}deg) rotateZ(${rz * 0.35}deg) scale(${sc})`;
      card.style.boxShadow = rel === 0 ? '0 34px 60px -22px rgba(24,18,12,0.45)' : '0 16px 32px -16px rgba(24,18,12,0.3)';
    });
  };

  useEffect(layout, [active, n]);

  function onCardPointerMove(i: number, e: React.PointerEvent<HTMLAnchorElement>) {
    const card = cardRefs.current[i];
    const rel = (i - active + n) % n;
    if (!card || rel !== 0) return;
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateZ(60px) rotateY(${dx * 13}deg) rotateX(${-dy * 9}deg) scale(1.015)`;
    card.style.boxShadow = `${-dx * 36}px ${28 - dy * 18}px 54px -20px rgba(24,18,12,0.5)`;
  }

  return (
    <div className="deck-wrap">
      <div className="deck-stage">
        {slides.map((slide, i) => (
          <a
            key={slide.key}
            href={slide.href}
            target="_blank"
            rel="noopener noreferrer"
            className="deck-card film-card"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={(e) => {
              if ((i - active + n) % n !== 0) {
                e.preventDefault();
                setActive(i);
              }
            }}
            onPointerMove={(e) => onCardPointerMove(i, e)}
            onPointerLeave={layout}
          >
            {slide.content}
          </a>
        ))}
      </div>
      <div className="deck-nav">
        <button type="button" aria-label="Previous film" onClick={() => setActive((a) => (a - 1 + n) % n)}>
          ←
        </button>
        <button type="button" aria-label="Next film" onClick={() => setActive((a) => (a + 1) % n)}>
          →
        </button>
      </div>
    </div>
  );
}
