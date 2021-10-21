import Vue from 'vue'
import Vuex from 'vuex'
import cookie from './cookie'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(cookie.getCookie('userInfo'))
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      cookie.setCookie('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      cookie.setCookie('userInfo', JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      cookie.clearCookie('token')
      cookie.clearCookie('userInfo')
      state.userInfo = {}
    }
  },
  getters: {
    getUser: state => {
      return state.userInfo
    }
  },
  action: {},
  modules: {}
})
