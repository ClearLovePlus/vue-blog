import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'

import Register2 from '../components/Register2'
import main from '../components/main'
import Header from '../components/tool/Header'
import BlogDetail from '../components/blog/BlogDetail'
import BlogEdit from '../components/blog/BlogEdit'
import BlogBoard from '../components/blog/BlogBoard'
Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/blog/add',
      name: 'BlogAdd',
      component: BlogEdit,
      meta: {
        requireAuth: true,
        title: '新增blog'
      }
    },
    {
      path: '/blogs',
      name: 'BlogBoard',
      component: BlogBoard,
      meta: {
        title: 'blog概览'
      }
    },
    {
      path: '/getArticleByArticleId/:blogId',
      name: 'BlogDetail',
      component: BlogDetail,
      meta: {
        requireAuth: true,
        title: 'blog详情'
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
      path: '/getArticleByArticleId/:blogId',
      name: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true,
        title: '编辑blog'
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
            title: '统一流程平台--首页',
            requireAuth: true
          }
        },
        {
          path: 'model',
          component: () => import('../components/flow/model'),
          name: 'model',
          meta: {
            title: '流程管理--模型部署',
            requireAuth: true
          }
        },
        {
          path: 'deploy',
          component: () => import('../components/flow/deploy'),
          name: 'deploy',
          meta: {
            title: '流程管理--部署管理',
            requireAuth: true
          }
        },
        {
          path: 'done',
          component: () => import('../components/flow/done'),
          name: 'done',
          meta: {
            title: '流程管理--已办任务',
            requireAuth: true
          }
        },
        {
          path: 'belongToMe',
          component: () => import('../components/flow/belongToMe'),
          name: 'belongToMe',
          meta: {
            title: '流程管理--我发起的',
            requireAuth: true
          }
        },
        {
          path: 'monitor',
          component: () => import('../components/flow/monitor'),
          name: 'monitor',
          meta: {
            title: '流程管理--流程监控',
            requireAuth: true
          }
        },
        {
          path: 'todo',
          component: () => import('../components/flow/todo'),
          name: 'todo',
          meta: {
            title: '流程管理--待办任务',
            requireAuth: true
          }
        },
        {
          path: 'role',
          component: () => import('../components/permission/role'),
          name: 'role',
          meta: {
            title: '权限管理--角色管理',
            requireAuth: true
          }
        },
        {
          path: 'user',
          component: () => import('../components/permission/user'),
          name: 'user',
          meta: {
            title: '权限管理--用户管理',
            requireAuth: true
          }
        },
        {
          path: 'projectAdd',
          component: () => import('../components/project/projectAdd'),
          name: 'projectAdd',
          meta: {
            title: '项目管理--项目等级',
            requireAuth: true
          }
        },
        {
          path: 'projectOther',
          component: () => import('../components/project/projectOther'),
          name: 'projectOther',
          meta: {
            title: '项目管理--项目其他',
            requireAuth: true
          }
        },
        {
          path: 'personalAuditor',
          component: () => import('../components/user/personalAuditor'),
          name: 'personalAuditor',
          meta: {
            title: '员工管理--个人考勤',
            requireAuth: true
          }
        },
        {
          path: 'personalDocument',
          component: () => import('../components/user/personalDocument'),
          name: 'personalDocument',
          meta: {
            title: '员工管理--个人档案',
            requireAuth: true
          }
        },
        {
          path: 'personalSalary',
          component: () => import('../components/user/personalSalary'),
          name: 'personalSalary',
          meta: {
            title: '员工管理--劳资情况',
            requireAuth: true
          }
        },
        {
          path: 'personalEducation',
          component: () => import('../components/user/personalEducation'),
          name: 'personalEducation',
          meta: {
            title: '员工管理--培训详情',
            requireAuth: true
          }
        }
      ],
      meta: {
        title: '统一流程平台--主页'
      }
    }
  ]
})
