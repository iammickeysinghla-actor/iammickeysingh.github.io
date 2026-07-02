import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = '@iammickeysingh';
const VIDEO_IDS = ['RWHZ_zaT5EU', '9zgOYS0U0u4', 'm7EDG0mnXZQ', 'GIkJUjCeVUo'];
const OUTPUT_PATH = fileURLToPath(new URL('../data/youtube-stats.json', import.meta.url));

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url.split('?')[0]} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  if (!API_KEY) {
    throw new Error('Missing YOUTUBE_API_KEY environment variable');
  }

  const videosJson = await fetchJson(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${VIDEO_IDS.join(',')}&key=${API_KEY}`
  );
  const videos = {};
  for (const item of videosJson.items ?? []) {
    videos[item.id] = Number(item.statistics.viewCount);
  }

  const channelJson = await fetchJson(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}&key=${API_KEY}`
  );
  const totalViews = Number(channelJson.items?.[0]?.statistics?.viewCount ?? 0);

  const data = {
    updatedAt: new Date().toISOString(),
    totalViews,
    videos,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated data/youtube-stats.json:', data);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
