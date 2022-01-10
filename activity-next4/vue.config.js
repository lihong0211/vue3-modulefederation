const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const dirNameArr = __dirname.split(path.sep)

// publicPath dev 端口号需要与 devServer 端口号一致
let publicPath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/'
  : `//s1.hdslb.com/bfs/live-activity/nuwa/${dirNameArr[dirNameArr.length - 1]}`

const withRemoteEnv = process.argv.indexOf('--remote-env') !== -1
const withRemoteEnvUat = process.argv.indexOf('uat') !== -1
if (process.env.MF_ENV === 'UAT' && withRemoteEnv && withRemoteEnvUat) {
  publicPath = `//uat-s1.hdslb.com/bfs/live-activity/nuwa/${dirNameArr[dirNameArr.length - 1]}`
}

/**
 * 根据 NODE_ENV 生成 remoteFile name
 */
const remoteEntryName = process.env.MF_ENV === 'PROD' ? 'remoteEntry.js' : `remoteEntry_${process.env.MF_ENV.toLowerCase()}.js`

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // disableHostCheck: true,
    // TODO: find a way to automatic generate
    port: 8080
  },
  assetsDir: 'static',
  outputDir: 'dist',
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath,
  pwa: {
    manifestOptions: {
      start_url: 'https://xxx.com'
    }
  },
  configureWebpack: {
    performance: {
      assetFilter: function (assetFilename) {
        // jpg png 图片大小限制
        return assetFilename.endsWith('.jpg') || assetFilename.endsWith('.png')
      },
      hints: 'error'
    }
  },
  chainWebpack: (config) => {
    // delete splitChunk for module federation, maybe cause performance issue
    config.optimization.delete('splitChunks')

    if (process.env.NODE_ENV === 'development') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin, [{
          analyzerPort: 5556,
          openAnalyzer: false
        }])
    }

    /* module federation plugin import */
    config
      .plugin('mf')
      .use(require('webpack/lib/container/ModuleFederationPlugin'), [{
        name: 'vue_next4',
        filename: remoteEntryName,
        // 引入的 外部模块
        remotes: {},
        // default exposes: 默认暴露路由文件给容器
        exposes: {
          './routes': './src/router/index.ts'
        },
        shared: {}
      }])
  }
})
