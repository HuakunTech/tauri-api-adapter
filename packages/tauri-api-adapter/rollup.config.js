import { readFileSync } from 'fs'
import path, { join } from 'path'
import { cwd } from 'process'
import alias from '@rollup/plugin-alias'
import typescript from '@rollup/plugin-typescript'

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json'), 'utf8'))

/** @type {import('rollup').RollupOptions} */
const config = {
  input: [
    'src/index.ts',
    'src/api/server/index.ts',
    'src/api/client/index.ts',
    'src/native.ts',
    'src/worker.ts',
    'src/iframe.ts',
    'src/permissions/index.ts'
    // 'src/api/fetch/index.ts'
  ],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].js',
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ],
  treeshake: true,
  plugins: [typescript()]
}

export default config
