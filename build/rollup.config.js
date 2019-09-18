import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import alias from 'rollup-plugin-alias'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { join } from 'path'
import bundlesConfigs from './bundlesConfigs'
import { DIST_DIR, SRC_DIR, IS_PRODUCTION } from './constants'
import { postcssPlugins, generateThemesCSS } from './postcss'

export default Promise.all(
  bundlesConfigs().map(getConfig)
)

generateThemesCSS()

async function getConfig ({
  optimize = false,
  output: {
    file,
    format,
    name = undefined,
    esModule = false
  },
  plugins = []
}) {
  return {
    input: join(SRC_DIR, 'main.js'),
    output: {
      esModule,
      file,
      format,
      exports: 'named',
      // используется в umd и в iife
      name: 'vueCoolSelect',
      globals: {
        vue: 'Vue'
      }
    },
    // можно Object.keys(globals)
    external: [
      'vue'
    ],
    plugins: [
      alias({
        resolve: ['.ts', '.js', '.vue', '.styl'],
        '~': SRC_DIR
      }),
      commonjs(),
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      // транспилирует
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      postcss({
        // TODO для каждого конфига генерируется свой main.css (одинаковый файл), исправить
        extract: join(DIST_DIR, 'main.css'),
        // minimize: true, Я использую cssnano самостоятельно (под капотом тоже cssnano)
        plugins: postcssPlugins
      }),
      vue({
        // Inject CSS in JavaScript. Setting css: false would extract styles in a .css file.
        css: false
      }),
      // оптимизация
      optimize && IS_PRODUCTION && (await import('rollup-plugin-terser')).terser(),
      ...plugins
    ]
  }
}
