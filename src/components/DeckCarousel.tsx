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
  /** 'tilt': perspective-fanned deck with 3D hover tilt (film reel).
   *  'flat': flush rounded cards peeking at the edges, no rotation (gallery). */
  variant?: 'tilt' | 'flat';
}

interface Pose {
  ty: number;
  sc: number;
  z: number;
  op: number;
}

const TILT_SIDE_BASE: Pose = { ty: 14, sc: 0.82, z: 10, op: 0.75 };
const TILT_SIDE_POPPED: Pose = { ty: 6, sc: 0.95, z: 30, op: 0.96 };
const FLAT_SIDE_BASE: Pose = { ty: 0, sc: 0.84, z: 0, op: 1 };
const FLAT_SIDE_POPPED: Pose = { ty: 0, sc: 0.9, z: 0, op: 1 };

/**
 * Depth-stacked carousel used by both the "On Screen" film reel (tilt
 * variant: perspective fan + 3D hover tilt) and the "Look" gallery (flat
 * variant: flush rounded cards cropped at the viewport edge, no rotation).
 * Hovering a side card pops it forward as a preview; clicking it (or the
 * side arrows) advances it to the front.
 */
export default function DeckCarousel({ items, cardClassName = '', variant = 'tilt' }: DeckCarouselProps) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const n = items.length;
  const flat = variant === 'flat';
  const sideBase = flat ? FLAT_SIDE_BASE : TILT_SIDE_BASE;
  const sidePopped = flat ? FLAT_SIDE_POPPED : TILT_SIDE_POPPED;

  const applyPose = (card: HTMLElement, side: 'right' | 'left', pose: Pose) => {
    const sign = side === 'right' ? 1 : -1;
    const tx = sign * (flat ? 78 : 58) * (pose.sc / sideBase.sc);
    if (flat) {
      card.style.transform = `translateX(${tx}%) scale(${pose.sc})`;
      card.style.boxShadow = 'none';
    } else {
      const rz = sign * 6 * (pose.sc / sideBase.sc);
      card.style.transform = `translateX(${tx}%) translateY(${pose.ty}px) translateZ(${pose.z}px) rotateY(${rz}deg) rotateZ(${rz * 0.35}deg) scale(${pose.sc})`;
      card.style.boxShadow = '0 20px 40px -18px rgba(24,18,12,0.35)';
    }
    card.style.opacity = String(pose.op);
  };

  const layout = () => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rel = (i - active + n) % n;
      card.style.zIndex = String(rel === 0 ? 5 : 3);
      if (rel === 0) {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.transform = flat ? 'translateX(0) scale(1)' : 'translateZ(60px)';
        card.style.boxShadow = flat ? 'none' : '0 34px 60px -22px rgba(24,18,12,0.45)';
      } else if (rel === 1) {
        card.style.pointerEvents = 'auto';
        applyPose(card, 'right', sideBase);
      } else if (n - rel === 1) {
        card.style.pointerEvents = 'auto';
        applyPose(card, 'left', sideBase);
      } else {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });
  };

  useEffect(layout, [active, n, flat]);

  function onCardPointerMove(i: number, e: React.PointerEvent<HTMLElement>) {
    if (flat) return;
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
    applyPose(card, rel === 1 ? 'right' : 'left', sidePopped);
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
      <div className={`deck-viewport ${flat ? 'flat' : ''}`}>
        <button type="button" className="deck-arrow deck-arrow-prev" aria-label="Previous" onClick={() => setActive((a) => (a - 1 + n) % n)}>
          ‹
        </button>
        <div className={`deck-stage ${flat ? 'flat' : ''}`}>
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
        <button type="button" className="deck-arrow deck-arrow-next" aria-label="Next" onClick={() => setActive((a) => (a + 1) % n)}>
          ›
        </button>
      </div>
      {flat && (
        <div className="deck-dots">
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className={`deck-dot ${i === active ? 'on' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
