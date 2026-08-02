import { describe, it, expect } from 'vitest'
import ptBR from './pt-BR.json'
import enUS from './en-US.json'
import esES from './es-ES.json'

function collectKeyPaths(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix]

  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    collectKeyPaths(value, prefix ? `${prefix}.${key}` : key),
  )
}

describe('i18n resources', () => {
  it('exposes the exact same translation keys in pt-BR, en-US and es-ES', () => {
    const ptKeys = collectKeyPaths(ptBR).sort()
    const enKeys = collectKeyPaths(enUS).sort()
    const esKeys = collectKeyPaths(esES).sort()

    expect(enKeys).toEqual(ptKeys)
    expect(esKeys).toEqual(ptKeys)
  })

  it('has non-empty string values for every leaf key', () => {
    for (const resource of [ptBR, enUS, esES]) {
      const paths = collectKeyPaths(resource)
      for (const path of paths) {
        const value = path.split('.').reduce<unknown>((acc, key) => {
          return (acc as Record<string, unknown>)[key]
        }, resource)
        expect(typeof value).toBe('string')
        expect((value as string).trim().length).toBeGreaterThan(0)
      }
    }
  })
})
