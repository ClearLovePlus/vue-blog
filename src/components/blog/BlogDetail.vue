<template>
  <div class="father">
    <headAll></headAll>
  <div class="main-content">
    <Header></Header>
    <div class="mblog">
      <h2> {{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
  </div>
</template>

<script>
import 'github-markdown-css'
import Header from '../tool/Header'
import HeadAll from '../HeadAll'
export default {
  name: 'BlogDetail',
  components: {HeadAll, Header},
  data () {
    return {
      blog: {
        id: '',
        title: '',
        content: ''
      },
      ownBlog: false
    }
  },
  created () {
    const blogId = this.$route.params.blogId
    console.log(blogId)
    const _this = this
    this.$axios.get('/article/getArticleByArticleId/' + blogId).then(res => {
      const blog = res.data.data
      _this.blog.id = blog.articleId
      _this.blog.title = blog.title
      var MardownIt = require('markdown-it')
      var md = new MardownIt()
      _this.blog.content = md.render(blog.content)
      _this.ownBlog = (blog.authorId === _this.$store.getters.getUser.userId)
    })
  }
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
h1,h2 {
  text-align: center;
}
.father{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
}
.main-content{
  position: absolute;
  width: 70%;
  left: 15%;
  right: 15%;
  top: 11%;
}

</style>
