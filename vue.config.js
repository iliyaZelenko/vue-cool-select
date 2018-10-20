module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-cool-select/'
    : '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    extract: false
  }
}
