import { defineConfig } from 'vite';
import path from 'path';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
      binaryInterval: 300,
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'TomationScript', // global variable name, required for IIFE format
      formats: ['iife'],        // IIFE generates a plain JS file
      fileName: () => 'tests.bundle.js',
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [], // no external dependencies
    },
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**',
    },
  },
});
