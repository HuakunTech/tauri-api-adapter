import { readFileSync } from 'fs'
import path, { join } from 'path'
import { cwd } from 'process'
import alias from '@rollup/plugin-alias'
import typescript from '@rollup/plugin-typescript'
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
// import typescript from 'rollup-plugin-typescript2'

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json'), 'utf8'))

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.exports['.'].import,
      format: 'esm'
    },
    {
      file: pkg.exports['.'].require,
      format: 'cjs'
    }
  ],
  treeshake: true,
  plugins: [
    // typescript({
    //   typescript: require('ttypescript'),
    //   tsconfigDefaults: {
    //     compilerOptions: {
    //       plugins: [
    //         { transform: 'typescript-transform-paths' },
    //         { transform: 'typescript-transform-paths', afterDeclarations: true }
    //       ]
    //     }
    //   }
    // }),
    typescript(),
    // typescriptPaths(),
    // alias({

    // })
      // // resolve: ['.ts', '.vue'],
      // // entries: { '@/': path.resolve(__dirname, './src/') }
      // entries: [
      //   // { find: '@', replacement: path.resolve(__dirname, 'src') },
      //   {
      //     find: '@',
      //     // In tsconfig this would be like `"paths": { "@/*": ["./src/*"] }`
      //     replacement: path.resolve('./dist/')
      //   }
      //   // { find: '@/', replacement: 'src' },
      // { find: 'batman-1.0.0', replacement: './joker-1.5.0' }
      // ]
    // })
  ]
}

export default config
