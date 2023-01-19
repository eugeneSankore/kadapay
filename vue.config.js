const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  /// fix the problem of css display disfferent in production and development mode
    css: {
        extract: false
    },
  configureWebpack: {
    optimization: {
      splitChunks: false  // fix the problem of css display disfferent in production and development mode
    }
  }


})
