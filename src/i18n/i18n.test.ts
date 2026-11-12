import { describe, expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

function keys(obj: unknown, prefix = ''): string[] {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      keys(v, prefix ? `${prefix}.${k}` : k),
    )
  }
  return [prefix]
}

const dir = path.join(import.meta.dir)
const files = readdirSync(path.join(dir, 'en')).filter((f) => f.endsWith('.json'))

describe('Arabic and English translation files have the same keys', () => {
  for (const f of files) {
    test(f, () => {
      const en = JSON.parse(readFileSync(path.join(dir, 'en', f), 'utf8'))
      const ar = JSON.parse(readFileSync(path.join(dir, 'ar', f), 'utf8'))
      expect(keys(ar).sort()).toEqual(keys(en).sort())
    })
  }
})
