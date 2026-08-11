import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Pure-TS function tests only — node environment, no DOM. The alias mirrors
// tsconfig's @/* so modules that import '@/lib/...' resolve under vitest.
export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
