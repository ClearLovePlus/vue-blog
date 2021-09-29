<template>
    <div class="mcontaner">
      <Header></Header>

      <div class="block">
        <el-timeline>
          <el-timeline-item :timestamp="blog.creatDate" placement="top" v-for="blog in blogs" v-bind:key="blog.id">
            <el-card>
              <h4>
                <router-link :to="{name: 'BlogDetail', params: {blogId: blog.articleId}}">
                  {{blog.title}}
                </router-link>
              </h4>
              <p>{{blog.description}}</p>
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
</template>

<script>
import Header from '../tool/Header'

export default {
  name: 'BlogBoard',
  components: {Header},
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
      const _this = this
      let url = ''
      if (localStorage.getItem('token')) {
        url = '/article/getAllUserArticle?currentPage=' + currentPage + '&userId=' + _this.$store.getters.getUser.userId
      } else {
        url = '/article/getAllUserArticle?currentPage=' + currentPage
      }
      _this.$axios.get(url).then(res => {
        console.log(res)
        _this.blogs = res.data.data.data
        _this.currentPage = res.data.data.currentPage
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.pageSize
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
</style>
