const path = require('path')

module.exports = {
  lintOnSave: true,
  chainWebpack(config) {
    config.resolve.alias
      .set('common', path.join(__dirname, './src/common'))
      .set('assets', path.join(__dirname, './src/assets'))
      .set('components', path.join(__dirname, './src/components'))
      .set('commons', path.join(__dirname, './src/components/common'))

    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }

}
