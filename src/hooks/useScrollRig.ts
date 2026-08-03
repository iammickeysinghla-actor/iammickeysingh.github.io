import { useEffect } from 'react';

/**
 * Theater-style Z-axis recession: each `.cr` credit row scales in from a
 * "distant" state as it enters from below, then subtly recedes (slight
 * scale/opacity dip, staying clearly legible) as it nears the top of the
 * viewport — a depth cue, not a disappearing act. Skipped entirely when
 * `enabled` is false (reduced-motion / non-immersive devices keep the
 * plain fade-in from useFadeIn).
 *
 * gsap + ScrollTrigger are only imported and registered when `enabled` is
 * true, inside the effect — never at module scope — so devices that never
 * use this rig also never load or execute that code. Any failure here
 * (an unsupported API on some browser we can't test directly, etc.) is
 * caught so it just skips the enhancement instead of crashing the page.
 */
export function useScrollRig(containerRef: React.RefObject<HTMLElement | null>, enabled: boolean, deps: unknown[] = []) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    import('gsap')
      .then(async (gsapModule) => {
        if (cancelled) return;
        const gsap = gsapModule.default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        if (cancelled || !containerRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const rows = containerRef.current!.querySelectorAll<HTMLElement>('.cr');
          rows.forEach((row) => {
            // A single scroll-linked timeline spanning the row's whole
            // journey (enter -> hold -> recede), rather than two separate
            // scrubbed ScrollTriggers on the same properties — those fought
            // each other for control of opacity/scale even outside their
            // nominal ranges, dragging rows down to near-zero opacity well
            // before they reached the top of the viewport.
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: row,
                  start: 'top 92%',
                  end: 'top -15%',
                  scrub: 0.6,
                },
              })
              .fromTo(row, { scale: 0.92, opacity: 0, z: -80 }, { scale: 1, opacity: 1, z: 0, ease: 'power2.out', duration: 37 })
              .to(row, { duration: 40 }) // hold at full visibility through the middle of the viewport
              .to(row, { scale: 0.97, opacity: 0.85, z: -30, ease: 'power1.in', duration: 30 });
          });
        }, containerRef);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[useScrollRig] failed to load/run gsap, skipping scroll rig:', err);
      });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}
