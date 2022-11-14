<template>
  <el-header>
    <div class="logo">
      <img src="../assets/img/puBlueLogo.png">
    </div>
    <div class="nav-div">
      <el-menu :default-active="activeIndex" text-color="#303133" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1"><a href="/blogs">首 页</a></el-menu-item>
        <el-menu-item index="2"><a href="/blogs">系 列</a></el-menu-item>
        <el-menu-item index="3"><a href="/blogs">教 程</a></el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me">友 链</a></el-menu-item>
      </el-menu>

    </div>
    <div class="search-div">
      <el-autocomplete
        class="el-input"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="搜索"
        @select="handleSelect"
        suffix-icon="el-icon-search"
      ></el-autocomplete>
    </div>
      <div class="notification-div">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="findUnRead">
          <el-menu-item index="1" class="navbar_popover">
            <el-badge :value=blogs.length class="badgeClass">
              <el-popover placement="bottom" width="330" trigger="click" >
                <i class="el-icon-bell" slot="reference"></i>
                <!-- 头部选项 -->
                <el-menu
                  mode="horizontal"
                  active-text-color="#40aaf7"
                  :default-active="activeIndex"
                  class="el-menu-demo"
                >
                  <el-menu-item index="1">通知({{blogs.length}})</el-menu-item>
                  <el-menu-item index="2">点赞({{blogs.length}})</el-menu-item>
                  <el-menu-item index="3">新增关注({{blogs.length}})</el-menu-item>
                </el-menu>
                <!-- 消息内容 循环部分 -->
                <div class="box">
                  <div class="notification_text" v-for="blog in blogs">
                    <div class="text">
                      <p>{{blog.value}}</p>
                      <p style="font-size: 12px; color: #ccc">2021年8月3日</p>
                    </div>
                  </div>
                </div>
                <!-- 底部按钮部分 -->
                <div class="bottom_button">
                  <!-- 这个地方不能换行不然会因为inlineblock出现4px的空隙把按钮顶下去！！ -->
                  <span class="bottom_button_left">清空</span><span class="bottom_button_right">查看更多</span>
                </div>
              </el-popover>
            </el-badge>
          </el-menu-item>
        </el-menu>
      </div>
  </el-header>
</template>

<script>
export default {
  name: 'HeadAll',
  data () {
    return {
      activeIndex: '1',
      blogs: [],
      state: '',
      timeout: null
    }
  },
  methods: {
    loadAll () {
      this.$axios.get('/article/getAllArticlePrefix').then((res) => {
        if (res.data.status === 200) {
          this.blogs = res.data.data
        } else {
          this.blogs = [
            { 'articleUrl': 'https://www.baidu.com', 'value': '关于此博客，我有话哔哔' },
            { 'articleUrl': 'https://www.baidu.com', 'value': '唠唠嗑' }
          ]
        }
      })
    },
    querySearchAsync (queryString, cb) {
      let blogs = this.blogs
      let results = queryString ? blogs.filter(this.createStateFilter(queryString)) : blogs

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      window.location.replace(item.articleUrl)
    },
    findUnRead(){
      this.$axios.get('/article/getAllArticlePrefix').then((res) => {
        if (res.data.status === 200) {
          this.blogs = res.data.data
        } else {
          this.blogs = [
            { 'articleUrl': 'https://www.baidu.com', 'value': '关于此博客，我有话哔哔' },
            { 'articleUrl': 'https://www.baidu.com', 'value': '唠唠嗑' }
          ]
        }
      })
    }
  },
  mounted () {
    this.loadAll()
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  height: 6%;
  left: 0;
  right: 0;
  top: 0;
  background: white;
}

.nav-div {
  position: absolute;
  left: 25%;
}

.notification-div{
  position: absolute;
  right: 10%;
}
a {
  text-decoration: none
}

.logo {
  position: absolute;
  height: 100%;
  left: 5%;
}

.search-div {
  position: absolute;
  left: 60%;
  top: 15%;
}
.el-input >>> .el-input__inner {
  border-radius: 20px;
}
.badgeClass{
  margin-top: 11px;
}
</style>
