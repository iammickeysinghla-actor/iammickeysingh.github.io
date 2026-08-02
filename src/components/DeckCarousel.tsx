import { useEffect, useRef, useState } from 'react';

export interface CarouselItem {
  key: string;
  content: React.ReactNode;
  href?: string;
  onSelect?: () => void;
  ariaLabel?: string;
}

interface DeckCarouselProps {
  items: CarouselItem[];
  cardClassName?: string;
}

interface Pose {
  ty: number;
  sc: number;
  z: number;
  op: number;
}

const SIDE_BASE: Pose = { ty: 14, sc: 0.82, z: 10, op: 0.75 };
const SIDE_POPPED: Pose = { ty: 6, sc: 0.95, z: 30, op: 0.96 };

/**
 * Depth-stacked 3D carousel: active card front-and-center, neighbors fanned
 * to either side in perspective. Hovering a side card pops it forward as a
 * preview; clicking it (or the arrows) advances it to the front. The active
 * card additionally tilts toward the cursor with a matching synthetic
 * shadow shift, for a physical, tactile feel on hover. Used for both the
 * "On Screen" film deck and the "Look" gallery.
 */
export default function DeckCarousel({ items, cardClassName = '' }: DeckCarouselProps) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const n = items.length;

  const applyPose = (card: HTMLElement, side: 'right' | 'left', pose: Pose) => {
    const sign = side === 'right' ? 1 : -1;
    const tx = sign * 58 * (pose.sc / SIDE_BASE.sc);
    const rz = sign * 6 * (pose.sc / SIDE_BASE.sc);
    card.style.transform = `translateX(${tx}%) translateY(${pose.ty}px) translateZ(${pose.z}px) rotateY(${rz}deg) rotateZ(${rz * 0.35}deg) scale(${pose.sc})`;
    card.style.opacity = String(pose.op);
    card.style.boxShadow = '0 20px 40px -18px rgba(24,18,12,0.35)';
  };

  const layout = () => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rel = (i - active + n) % n;
      card.style.zIndex = String(rel === 0 ? 5 : 3);
      if (rel === 0) {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.transform = 'translateZ(60px)';
        card.style.boxShadow = '0 34px 60px -22px rgba(24,18,12,0.45)';
      } else if (rel === 1) {
        card.style.pointerEvents = 'auto';
        applyPose(card, 'right', SIDE_BASE);
      } else if (n - rel === 1) {
        card.style.pointerEvents = 'auto';
        applyPose(card, 'left', SIDE_BASE);
      } else {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });
  };

  useEffect(layout, [active, n]);

  function onCardPointerMove(i: number, e: React.PointerEvent<HTMLElement>) {
    const card = cardRefs.current[i];
    const rel = (i - active + n) % n;
    if (!card || rel !== 0) return;
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateZ(60px) rotateY(${dx * 13}deg) rotateX(${-dy * 9}deg) scale(1.015)`;
    card.style.boxShadow = `${-dx * 36}px ${28 - dy * 18}px 54px -20px rgba(24,18,12,0.5)`;
  }

  function onCardPointerEnter(i: number) {
    const card = cardRefs.current[i];
    const rel = (i - active + n) % n;
    if (!card || rel === 0) return;
    applyPose(card, rel === 1 ? 'right' : 'left', SIDE_POPPED);
  }

  function onCardClick(i: number, item: CarouselItem, e: React.MouseEvent) {
    const rel = (i - active + n) % n;
    if (rel !== 0) {
      e.preventDefault();
      setActive(i);
      return;
    }
    if (!item.href) {
      item.onSelect?.();
    }
  }

  return (
    <div className="deck-wrap">
      <div className="deck-stage">
        {items.map((item, i) => {
          const className = `deck-card ${cardClassName}`.trim();
          const setRef = (el: HTMLElement | null) => {
            cardRefs.current[i] = el;
          };
          const shared = {
            key: item.key,
            className,
            ref: setRef,
            onClick: (e: React.MouseEvent) => onCardClick(i, item, e),
            onPointerEnter: () => onCardPointerEnter(i),
            onPointerMove: (e: React.PointerEvent<HTMLElement>) => onCardPointerMove(i, e),
            onPointerLeave: layout,
          } as const;
          return item.href ? (
            <a {...shared} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel}>
              {item.content}
            </a>
          ) : (
            <button {...shared} type="button" aria-label={item.ariaLabel}>
              {item.content}
            </button>
          );
        })}
      </div>
      <div className="deck-nav">
        <button type="button" aria-label="Previous" onClick={() => setActive((a) => (a - 1 + n) % n)}>
          ←
        </button>
        <button type="button" aria-label="Next" onClick={() => setActive((a) => (a + 1) % n)}>
          →
        </button>
      </div>
    </div>
  );
}
