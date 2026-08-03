import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Bundles everything (including the lazily-imported gsap/framer-motion/three.js
// chunks) into one inlined HTML file. This trades away per-chunk lazy loading
// on the network level — the immersive-only code still doesn't *run* on
// mobile, it's just downloaded — in exchange for ruling out whatever GitHub
// Pages + Safari didn't like about serving/loading separate module chunks,
// which a single self-contained bundle can't be affected by.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
  },
});
