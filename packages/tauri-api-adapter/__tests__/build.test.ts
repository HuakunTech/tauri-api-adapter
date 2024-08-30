import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { expect, test } from 'bun:test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageRoot = path.resolve(__dirname, '..')

test('package.json exports files exists', () => {
  const pkgJsonPath = path.resolve(packageRoot, 'package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
  const exports = pkgJson.exports
  for (const [key, val] of Object.entries(exports)) {
    if (typeof val === 'string') {
      expect(fs.existsSync(path.resolve(packageRoot, val))).toBe(true)
    } else {
      for (const [key2, val2] of Object.entries(val as Record<string, string>)) {
        const filePath = path.resolve(packageRoot, val2)
        console.log(filePath) // enable this if got error
        expect(fs.existsSync(filePath)).toBe(true)
      }
    }
  }
})
