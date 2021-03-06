import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'assets/css/global.css'

import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

import NProgress from 'nprogress'

// 配置请求
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

//* 保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('tokenid')
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 富文本
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
