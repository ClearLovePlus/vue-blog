<template>
  <el-container>
    <el-container>
      <el-aside width='200px'>
        <div class='nav-div'>
          <el-menu
            active-text-color="#409EFF"
            default-active='/login'
            class='el-menu-vertical-demo'
            @open='handleOpen'
            @close='handleClose'
            :unique-opened="true"
            :router='true'>
            <left-menu :menu-data="navigation"></left-menu>
          </el-menu>
        </div>
      </el-aside>
      <el-header>
        <div class='main-logo'>
          <h1>
            <img src='../assets/img/mainLogo.png' class='areaLogo'>
            <span class='areaText'>统一流程平台</span>
          </h1>
        </div>
        <div class='main-person'>
          <el-avatar class='avatar'
                     src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
          <el-dropdown trigger="click">
            <span class='el-dropdown-link'>陈浩<i class='el-icon-arrow-down el-icon--right'></i></span>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item>个人主页</el-dropdown-item>
              <el-dropdown-item>我的待办</el-dropdown-item>
              <el-dropdown-item>修改信息</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftMenu from '../components/tool/liftMenu'

export default {
  name: 'main',
  components: {
    leftMenu
  },
  data () {
    return {
      navigation: [
        {
          id: 0,
          name: '首页',
          path: '/main/index',
          icon: 'el-icon-location'
        },
        {
          id: 2,
          name: '流程管理',
          path: '0',
          icon: 'el-icon-menu',
          children: [
            {id: 122, name: '模型部署', path: '/main/model', icon: 'el-icon-document'},
            {id: 123, name: '流程监控', path: '/main/monitor', icon: 'el-icon-document'},
            {id: 124, name: '部署管理', path: '/main/deploy', icon: 'el-icon-document'},
            {id: 125, name: '待办任务', path: '/main/todo', icon: 'el-icon-document'},
            {id: 126, name: '我发起的', path: '/main/belongToMe', icon: 'el-icon-document'},
            {id: 127, name: '已办任务', path: '/main/done', icon: 'el-icon-document'}
          ]
        },
        {
          id: 10,
          name: '项目管理',
          path: '1',
          icon: 'el-icon-menu',
          children: [
            {id: 119, name: '项目登记', path: '/main/projectAdd', icon: 'el-icon-document'},
            {id: 121, name: '项目其他', path: '/main/projectOther', icon: 'el-icon-document'}
          ]
        },
        {
          id: 8,
          name: '权限管理',
          icon: 'el-icon-menu',
          path: '3',
          children: [
            {id: 115, name: '人员管理', path: '/main/user', icon: 'el-icon-document'},
            {id: 116, name: '角色管理', path: '/main/role', icon: 'el-icon-document'}
          ]
        },
        {
          id: 9,
          name: '个人管理',
          icon: 'el-icon-menu',
          path: '4',
          children: [
            {
              id: 111,
              name: '个人档案',
              path: '/main/personalDocument',
              icon: 'el-icon-document'
            },
            {id: 112, name: '个人考勤', path: '/main/personalAuditor', icon: 'el-icon-document'},
            {id: 113, name: '劳资详情', path: '/main/personalSalary', icon: 'el-icon-document'},
            {id: 114, name: '培训详情', path: '/main/personalEducation', icon: 'el-icon-document'}
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$message({
        duration: 1000,
        message: '退出成功',
        type: 'success'
      })
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>

.el-container {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.el-header {
  top: 10px;
  background-color: white;
  margin-top: 0;
}

.el-aside {
  background-color: white;
  position: absolute;
  height: 100%;
}

.main-logo {
  position: absolute;
  width: 200px;
  background-color: white;
  padding: 0;
  left: 0;
  height: 60px;
}

.main-person {
  position: absolute;
  width: 120px;
  background-color: white;
  right: 0;
  height: 60px;
}

.el-main {
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: absolute;
  left: 200px;
  top: 60px;
  background-color: white;
  height: 100%;
  width: 100%;
}

.avatar {
  position: absolute;
  right: 70px;
  top: 8px;
}

.el-dropdown {
  position: absolute;
  top: 16px;
  right: 10px;
}

.areaText {
  position: absolute;
  top: 20px;
  color: #409EEF;
  left: 60px;
}

.nav-div {
  top: 60px;
  position: absolute;
  width: 200px;
}
</style>
