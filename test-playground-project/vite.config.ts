import { defineConfig } from 'vite'

// Vite configuration for Tomation starter template
// Builds a single self-contained IIFE bundle for browser content script usage.
// IIFE format wraps the entire bundle in an immediately-invoked function,
// preventing top-level variables from leaking into the window scope.
export default defineConfig({
  build: {
    lib: {
      // Entry point for the automation scripts
      entry: 'src/main.ts',
      formats: ['iife'],
      name: 'tomation',
      fileName: () => 'bundle.js',
    },
    // Output directory
    outDir: 'dist',
    // Do not minify — keeps the output readable for debugging
    minify: true,
    rollupOptions: {
      // Bundle all dependencies inline — no external imports in the output
      external: [],
    },
  },
})
