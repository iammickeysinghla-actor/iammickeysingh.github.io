import { useEffect } from 'react';

/**
 * Replicates the original site's reveal-on-scroll: any element with the
 * `.fade` class gets `.in` added once it crosses the viewport threshold.
 */
export function useFadeIn(deps: unknown[] = []) {
  useEffect(() => {
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
    document.querySelectorAll('.fade').forEach((el) => obs.observe(el));

    const heroTimer = setTimeout(() => {
      document.querySelector('#hero .fade')?.classList.add('in');
    }, 150);

    return () => {
      obs.disconnect();
      clearTimeout(heroTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
