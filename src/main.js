import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './axios'
import store from './store'
import './permission'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import cookie from './store/cookie'
Vue.use(Element)
Vue.use(mavonEditor)
Vue.prototype.$axios = axios
Vue.prototype.$cookie = cookie
Vue.config.productionTip = false
/**
 * 修改title
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
