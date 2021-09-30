<template>
  <el-header>
    <div class="logo">
      <img src="../assets/img/puBlueLogo.png">
    </div>
    <div class="nav-div">
      <el-menu :default-active="activeIndex" text-color="#303133" class="el-menu-demo" mode="horizontal"
               @select="handleSelect">
        <el-menu-item index="1"><a href="/blogs">首 页</a></el-menu-item>
        <el-menu-item index="2"><a href="/blogs">系 列</a></el-menu-item>
        <el-menu-item index="3"><a href="/blogs">教 程</a></el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">友 链</a></el-menu-item>
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
    }
  },
  mounted () {
    this.loadAll()
  }
}
</script>

<style scoped>
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

</style>
