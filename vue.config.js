module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        common: '@/common',
        assets: '@/assets'
      }
    }
  },
  lintOnSave: false
}
