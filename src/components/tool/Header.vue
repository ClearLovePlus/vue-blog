<template>
  <div class="m-content">
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>
        <el-link @click="userCenter" title="点击修改/查看个人信息">{{ user.username}}</el-link>
      </div>
    </div>
    <div class="maction">
      <el-link href="/blogs">主页</el-link>
      <el-divider direction="vertical"></el-divider>
      <span>
          <el-link type="success" @click="add" :disabled="!hasLogin">发表文章</el-link>
        </span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin">
          <el-link type="primary" @click="login">登录</el-link>
        </span>
      <span v-show="hasLogin">
          <el-link type="danger" @click="logout">退出</el-link>
        </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      hasLogin: false,
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userId: 0
      },
      blogs: {},
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    logout () {
      this.$axios.get('logout/out?userId=' + this.$store.getters.getUser.userId).then((res) => {
        if (res.status === 200) {
          this.$store.commit('REMOVE_INFO')
          this.$message({
            duration: 1000,
            message: '退出成功',
            type: 'success'
          })
          this.$router.push({path: '/login'})
        }
      })
    },
    login () {
      this.$router.push({path: '/login'})
    },
    userCenter () {
      this.$router.push({path: '/user'})
    },
    add () {
      this.$router.push({path: '/add'})
    }
  },
  created () {
    if (this.$store.getters.getUser) {
      this.user.username = this.$store.getters.getUser.userName
      if (this.$store.getters.getUser.avatar) {
        this.user.avatar = this.$store.getters.getUser.avatar
      } else {
        this.user.avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
      this.hasLogin = true
    }
  }
}
</script>

<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.maction {
  margin: 10px 0;
}
</style>
