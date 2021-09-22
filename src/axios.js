import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8095'
axios.defaults.timeout = 6000

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  let res = response.data
  console.log('=================')
  console.log(res)
  console.log('=================')

  if (res.status === 200) {
    return response
  } else {
    this.$message({
      duration: 1000,
      message: '请求报错啦',
      type: 'error'
    })
    return Promise.reject(response.data.message)
  }
},
error => {
  if (error.response.data) {
    if (error.response.data.msg) {
      error.message = error.response.data.msg
    } else {
      error.message = '请求异常'
    }
  }
  if (error.response.status === 401) {
    store.commit('REMOVE_INFO')
    router.push('/login')
  }
  Element.Message.error({
    duration: 1000,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
}
)
