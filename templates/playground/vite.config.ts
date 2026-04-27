import { defineConfig } from 'vite'

// Vite configuration for Tomation starter template
// Builds a single ES module bundle that can be loaded by the browser extension
export default defineConfig({
  build: {
    lib: {
      // Entry point for the automation scripts
      entry: 'src/main.ts',
      // Output as a single ES module bundle
      formats: ['es'],
      fileName: () => 'bundle.js',
    },
    // Output directory
    outDir: 'dist',
    // Do not minify for readability
    minify: false,
  },
})
