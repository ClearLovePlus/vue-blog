<template>
  <div class="main-content">
    <head-all></head-all>
    <div class="mcontaner">
      <Header></Header>

      <div class="block">
        <el-timeline>
          <el-timeline-item :timestamp="blog.creatDate" placement="top" v-for="blog in blogs" v-bind:key="blog.id">
            <el-card>
              <h4>
                <router-link :to="{name: 'BlogDetail', params: {blogId: blog.articleId}}">
                  {{ blog.title }}
                </router-link>
              </h4>
              <p>{{ blog.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-pagination class="mpage"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change=page>
        </el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
import Header from '../tool/Header'
import HeadAll from '../HeadAll'

export default {
  name: 'BlogBoard',
  components: {Header, HeadAll},
  data () {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  methods: {
    page (currentPage) {
      let url = ''
      if (this.$store.getters.getToken && this.$store.getters.getUser) {
        url = '/article/getAllUserArticle?currentPage=' + currentPage + '&userId=' + this.$store.getters.getUser.userId
      } else {
        url = '/article/getAllUserArticle?currentPage=' + currentPage
      }
      this.$axios.get(url).then(res => {
        console.log(res)
        this.blogs = res.data.data.data
        this.currentPage = res.data.data.currentPage
        this.total = res.data.data.total
        this.pageSize = res.data.data.pageSize
      })
    }
  },
  created () {
    this.page(1)
  }
}
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
.mcontaner{
  position: absolute;
  width: 70%;
  left: 15%;
  right: 15%;
  top: 11%;
}
</style>
