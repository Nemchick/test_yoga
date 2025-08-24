const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  devServer: {
    port: 8080,
    proxy: {
      '^/api/': {
        // target: 'http://localhost:',
        target: 'https://dev.yogacare.ru/',
        // target: 'https://yycare.life/',
        changeOrigin: true,
      },
    },
  },
})
