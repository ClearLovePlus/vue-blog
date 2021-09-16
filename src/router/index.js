import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'

import Register2 from '../components/Register2'
import main from '../components/main'
import Header from '../components/tool/Header'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '测试'
      }
    },
    {
      path: '/head',
      name: 'head',
      component: Header,
      meta: {
        title: '头部测试'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '统一流程平台--登录'
      }
    },
    {
      path: '/register2',
      name: 'register2',
      component: Register2,
      meta: {
        title: '统一流程平台--注册'
      }
    }, {
      path: '/main',
      name: 'main',
      redirect: '/main/index',
      component: main,
      children: [
        {
          path: 'index',
          component: () => import('../components/index'),
          name: 'index',
          meta: {
            title: '统一流程平台--首页'
          }
        },
        {
          path: 'model',
          component: () => import('../components/flow/model'),
          name: 'model',
          meta: {
            title: '流程管理--模型部署'
          }
        },
        {
          path: 'deploy',
          component: () => import('../components/flow/deploy'),
          name: 'deploy',
          meta: {
            title: '流程管理--部署管理'
          }
        },
        {
          path: 'done',
          component: () => import('../components/flow/done'),
          name: 'done',
          meta: {
            title: '流程管理--已办任务'
          }
        },
        {
          path: 'belongToMe',
          component: () => import('../components/flow/belongToMe'),
          name: 'belongToMe',
          meta: {
            title: '流程管理--我发起的'
          }
        },
        {
          path: 'monitor',
          component: () => import('../components/flow/monitor'),
          name: 'monitor',
          meta: {
            title: '流程管理--流程监控'
          }
        },
        {
          path: 'todo',
          component: () => import('../components/flow/todo'),
          name: 'todo',
          meta: {
            title: '流程管理--待办任务'
          }
        },
        {
          path: 'role',
          component: () => import('../components/permission/role'),
          name: 'role',
          meta: {
            title: '权限管理--角色管理'
          }
        },
        {
          path: 'user',
          component: () => import('../components/permission/user'),
          name: 'user',
          meta: {
            title: '权限管理--用户管理'
          }
        },
        {
          path: 'projectAdd',
          component: () => import('../components/project/projectAdd'),
          name: 'projectAdd',
          meta: {
            title: '项目管理--项目等级'
          }
        },
        {
          path: 'projectOther',
          component: () => import('../components/project/projectOther'),
          name: 'projectOther',
          meta: {
            title: '项目管理--项目其他'
          }
        },
        {
          path: 'personalAuditor',
          component: () => import('../components/user/personalAuditor'),
          name: 'personalAuditor',
          meta: {
            title: '员工管理--个人考勤'
          }
        },
        {
          path: 'personalDocument',
          component: () => import('../components/user/personalDocument'),
          name: 'personalDocument',
          meta: {
            title: '员工管理--个人档案'
          }
        },
        {
          path: 'personalSalary',
          component: () => import('../components/user/personalSalary'),
          name: 'personalSalary',
          meta: {
            title: '员工管理--劳资情况'
          }
        },
        {
          path: 'personalEducation',
          component: () => import('../components/user/personalEducation'),
          name: 'personalEducation',
          meta: {
            title: '员工管理--培训详情'
          }
        }
      ],
      meta: {
        title: '统一流程平台--主页'
      }
    }
  ]
})
