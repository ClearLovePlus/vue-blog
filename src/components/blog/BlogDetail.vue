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
    <div class="comment-input">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="写下你的评论"
        v-model="textarea">
      </el-input>
      <div class="submit">
        <el-button class="btn" type="success" round @click="addComment">发布</el-button>
      </div>
    </div>
    <comment class="comment" :comments="commentData" ></comment>
  </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import 'github-markdown-css'
import Header from '../tool/Header'
import HeadAll from '../HeadAll'
import comment from '../comment'
export default {
  name: 'BlogDetail',
  components: {HeadAll, Header, comment},
  data () {
    return {
      blog: {
        id: '',
        title: '',
        content: '',
        authorId: ''
      },
      ownBlog: false,
      textarea: '',
      commentData: []
    }
  },
  created () {
    let blogId = this.$route.params.blogId
    this.$axios.get('/article/getArticleByArticleId/' + blogId).then(res => {
      let blog = res.data.data
      this.blog.id = blog.articleId
      this.blog.title = blog.title
      this.blog.authorId = blog.authorId
      var MardownIt = require('markdown-it')
      var md = new MardownIt()
      this.blog.content = md.render(blog.content)
      this.ownBlog = (blog.authorId === this.$store.getters.getUser.userId)
    })
    this.$axios.get('/comment/allComments?articleId=' + blogId).then(res => {
      if (res.status === 200) {
        this.commentData = res.data.data
      }
    })
  },
  methods: {
    addComment () {
      if (!this.$store.getters.getUser) {
        this.$message({
          duration: 1000,
          message: '请重新登录',
          type: 'error'
        })
        this.$router.push({path: '/login'})
      }
      this.$axios.post('/comment/addComments', {
        articleId: this.$route.params.blogId,
        content: this.textarea,
        fromId: this.$store.getters.getUser.userId,
        toId: this.blog.authorId
      }).then(res => {
        if (res.status === 200) {
          if (res.data.data === true) {
            this.$message({
              duration: 1000,
              message: '评论成功',
              type: 'success'
            })
            this.$router.go(0)
          }
        } else {
          this.$message({
            duration: 1000,
            message: '系统繁忙，稍后再试试吧>_<',
            type: 'error'
          })
        }
      })
    }
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
.comment-input{
  margin-top: 10px;
}
.submit{
  position: absolute;
  margin-top: 10px;
  left: 90%;
}
</style>
