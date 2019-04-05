import { join } from 'path'

export const ROOT_DIR = join(__dirname, '../')
export const SRC_DIR = join(ROOT_DIR, 'src')
export const STYLES_DIR = join(SRC_DIR, 'styles')
export const DIST_DIR = join(ROOT_DIR, 'dist')
export const IS_PRODUCTION = process.env.BUILD === 'production'
