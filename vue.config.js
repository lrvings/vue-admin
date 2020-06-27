module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        commons: 'components/common',
        common: '@/common',
        assets: '@/assets'
      }
    }
  },
  lintOnSave: false
}
