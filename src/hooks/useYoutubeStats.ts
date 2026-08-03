import { useEffect, useState } from 'react';
import statsSnapshot from '../../public/data/youtube-stats.json';

interface StatsData {
  updatedAt: string;
  totalViews: number;
  videos: Record<string, number>;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M`;
  if (n >= 1_000) return `${Math.floor(n / 1000)}K`;
  return String(n);
}

/**
 * Seeds from the youtube-stats.json snapshot checked into the repo (built
 * into the bundle, always in sync with what deployed), then refetches at
 * runtime in case the file was updated without a redeploy.
 */
export function useYoutubeStats() {
  const [data, setData] = useState<StatsData>(statsSnapshot);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}data/youtube-stats.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && json) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    videoViewsLabel(videoId: string, isNew?: boolean): string | null {
      const views = data.videos[videoId];
      if (typeof views !== 'number') return null;
      const label = `${formatViews(views)} views`;
      return isNew ? `New · ${label}` : label;
    },
    totalViewsLabel(): string {
      return `${formatViews(data.totalViews)}+`;
    },
  };
}
