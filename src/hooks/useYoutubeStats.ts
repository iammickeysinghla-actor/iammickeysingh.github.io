import { useEffect, useState } from 'react';

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

export function useYoutubeStats() {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}data/youtube-stats.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    videoViewsLabel(videoId: string, isNew?: boolean): string | null {
      const views = data?.videos[videoId];
      if (typeof views !== 'number') return null;
      const label = `${formatViews(views)} views`;
      return isNew ? `New · ${label}` : label;
    },
    totalViewsLabel(): string {
      if (typeof data?.totalViews !== 'number') return '130K+';
      return `${formatViews(data.totalViews)}+`;
    },
  };
}
