import router from './router'
import Element from 'element-ui'
// 判断是否需要登录态
router.beforeEach((to, from, next) => {
  if (to.matched.some(p => p.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
      if (to.path === '/login') {
      } else {
        next()
      }
    } else {
      Element.Message.error({
        duration: 1000,
        message: '请登录',
        type: 'error'
      })
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
