import { join } from 'path'
import { DIST_DIR } from './constants'

export default () => [
  {
    optimize: true,
    output: {
      file: join(DIST_DIR, 'bundle-umd.js'),
      format: 'umd',
      esModule: true
    }
  },
  // это отдельная сборка под ES модули
  {
    output: {
      file: join(DIST_DIR, 'bundle-esm.js'),
      format: 'esm',
      esModule: true
    }
  },
  {
    optimize: true,
    output: {
      file: join(DIST_DIR, 'bundle-cjs.js'),
      format: 'cjs'
    }
  },
  {
    optimize: true,
    output: {
      file: join(DIST_DIR, 'bundle-iife.js'),
      format: 'iife'
    }
  }
]
