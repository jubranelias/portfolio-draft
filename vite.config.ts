import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`         -> normal multi-file build in /dist (use this for hosting)
// `npm run build:single`  -> one self-contained index.html (hash routing, inlined assets)
export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  return {
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    define: {
      __HASH_ROUTER__: JSON.stringify(single),
    },
    build: {
      outDir: single ? 'dist-single' : 'dist',
      assetsInlineLimit: single ? 100_000_000 : 4096,
    },
  };
});
