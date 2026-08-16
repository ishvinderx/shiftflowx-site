import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import sitemap from './sitemap'

// Guards the class of bug where a new indexable page ships but nobody adds it
// to sitemap.ts (that is how /referral went missing from Search Console).
// Rule: every static route under src/app is in the sitemap UNLESS it declares
// noindex — in its own page.tsx or in a sibling layout.tsx.

const APP_DIR = fileURLToPath(new URL('.', import.meta.url))
const BASE = 'https://shiftflowx.net'

function isNoindex(dir: string): boolean {
  return ['page.tsx', 'layout.tsx']
    .map((f) => join(dir, f))
    .filter(existsSync)
    .some((f) => /index:\s*false/.test(readFileSync(f, 'utf8')))
}

/** Static (non-dynamic) route dirs containing a page.tsx, as URL paths. */
function routes(dir = APP_DIR, prefix = ''): string[] {
  const found: string[] = []
  if (existsSync(join(dir, 'page.tsx')) && !isNoindex(dir)) found.push(prefix || '/')
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    // Skip dynamic segments ([slug]) — their URLs derive from data, not the filesystem.
    if (!entry.isDirectory() || entry.name.startsWith('[') || entry.name.startsWith('_')) continue
    found.push(...routes(join(dir, entry.name), `${prefix}/${entry.name}`))
  }
  return found
}

describe('sitemap', () => {
  const urls = sitemap().map((e) => e.url)

  it('lists every indexable static page', () => {
    const expected = routes().map((r) => (r === '/' ? BASE : `${BASE}${r}`))
    expect(expected.length).toBeGreaterThan(20) // the walk actually found pages
    expect(urls).toEqual(expect.arrayContaining(expected))
  })

  it('omits noindex utility pages', () => {
    expect(urls).not.toContain(`${BASE}/reset-password`)
    expect(urls).not.toContain(`${BASE}/verify`)
  })

  it('has no duplicate entries', () => {
    expect(new Set(urls).size).toBe(urls.length)
  })

  // A page with no `alternates.canonical` inherits the root layout's absolute
  // canonical (https://shiftflowx.net) and tells Google it duplicates the
  // homepage — which is how /pricing and /referral fell out of the index.
  it('declares its own canonical on every indexable page', () => {
    const missing = routes()
      .filter((r) => r !== '/') // the root layout's canonical is correct for the homepage
      .filter((r) => {
        // Strip comments first — prose mentioning "canonical" must not satisfy the check.
        const src = readFileSync(join(APP_DIR, r, 'page.tsx'), 'utf8')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/.*$/gm, '')
        return !/canonical\s*:/.test(src) && !src.includes('toolMetadata')
      })
    expect(missing).toEqual([])
  })
})
