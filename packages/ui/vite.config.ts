import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: [/^lit(\/.*)?$/]
    },
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true
  }
});
