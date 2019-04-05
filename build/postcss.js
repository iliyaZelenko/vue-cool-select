import postcssPresetEnv from 'postcss-preset-env'
import { join } from 'path'
import { DIST_DIR, STYLES_DIR } from './constants'
import postcss from 'postcss'
import * as fs from 'fs-extra'
import cssnano from 'cssnano'

const stylus = require('stylus')

export const postcssPlugins = [
  postcssPresetEnv,
  cssnano
]

export async function generateThemesCSS () {
  return Promise.all([
    generateThemeCSS('themes/bootstrap.styl', 'themes/bootstrap.css'),
    generateThemeCSS('themes/material-design.styl', 'themes/material-design.css')
  ])
}

async function generateThemeCSS (input, output) {
  const inputAbsPath = join(STYLES_DIR, input)
  const outputAbsPath = join(DIST_DIR, output)

  const stylusContent = await fs.readFile(inputAbsPath, 'utf8')
  const css = await new Promise((resolve, reject) =>
    stylus(stylusContent)
      .set('filename', inputAbsPath)
      .set('paths', [
        join(STYLES_DIR, 'common')
      ])
      .render(function (err, css) {
        if (err) reject(err)

        resolve(css)
      })
  )
  const result = await postcss(postcssPlugins).process(css, {
    from: inputAbsPath,
    to: outputAbsPath
  })

  await fs.ensureFile(outputAbsPath)
  await fs.writeFile(outputAbsPath, result.css)
}
