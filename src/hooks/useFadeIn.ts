import { useEffect } from 'react';

/**
 * Replicates the original site's reveal-on-scroll: any element with the
 * `.fade` class gets `.in` added once it crosses the viewport threshold.
 *
 * Uses a MutationObserver in addition to the initial querySelectorAll pass,
 * because `.fade` elements can appear after mount — e.g. Hero swaps from its
 * static markup to the lazy-loaded tilt version once that chunk resolves,
 * mounting a brand new `.hero-content.fade` node. Without watching for that,
 * whichever version happens to still be in the DOM when this effect first
 * runs is the only one that ever gets revealed, and the swap is timing-
 * dependent — which is exactly why the hero name was intermittently stuck
 * invisible instead of consistently failing or consistently working.
 */
export function useFadeIn(deps: unknown[] = []) {
  useEffect(() => {
    const revealed = new WeakSet<Element>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const observeIfNew = (el: Element) => {
      if (revealed.has(el)) return;
      revealed.add(el);
      obs.observe(el);
    };

    document.querySelectorAll('.fade').forEach(observeIfNew);

    // The hero's own fade content is already in view at load, so give it an
    // immediate nudge rather than waiting on scroll — mirrors the original
    // site's behavior, and re-runs for whichever hero version is live at
    // the time via the MutationObserver below.
    const revealHeroSoon = () => {
      const heroFade = document.querySelector('#hero .fade');
      if (heroFade && !heroFade.classList.contains('in')) {
        setTimeout(() => heroFade.classList.add('in'), 150);
      }
    };
    revealHeroSoon();

    const mutationObs = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('.fade')) observeIfNew(node);
          node.querySelectorAll?.('.fade').forEach(observeIfNew);
        });
      }
      revealHeroSoon();
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutationObs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
