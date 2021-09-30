<template>
  <div>
    <headAll></headAll>
    <div class="main-content">
    <Header></Header>
    <div class="m-content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章自增主键" prop="id" hidden>
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="文章编号" prop="id" hidden>
          <el-input v-model="ruleForm.articleId"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.articletitle"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.articletabloid"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.articlecontent" ref="md" @imgAdd="$imgAdd" ishljs="true"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
  </div>
</template>

<script>
import Header from '../tool/Header'
import HeadAll from '../HeadAll'
export default {
  name: 'BlogEdit',
  components: {Header, HeadAll},
  data () {
    return {
      ruleForm: {
        id: '',
        articletitle: '',
        articletabloid: '',
        articlecontent: '',
        articleId: ''
      },
      rules: {
        articletitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        articletabloid: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        articlecontent: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    $imgAdd (pos, $file) {
      let formData = new FormData()
      formData.append('files', $file)
      formData.append('type', 1)
      this.$axios.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        let _res = res.data
        if (_res.status === 200) {
          this.$refs.md.$img2Url(pos, 'http://localhost:8095/file/download?fileName=' + _res.data)
        } else {
          this.$message({
            duration: 1000,
            message: _res.message,
            type: 'error'
          })
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/article/publishArticle', {
            id: _this.ruleForm.id,
            articletitle: _this.ruleForm.articletitle,
            articletabloid: _this.ruleForm.articletabloid,
            articlecontent: _this.ruleForm.articlecontent,
            author: this.$store.getters.getUser.userName,
            authorId: this.$store.getters.getUser.userId,
            token: localStorage.getItem('token'),
            articleid: _this.ruleForm.articleId
          }, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then(res => {
            console.log(res)
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/blogs')
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    const token = localStorage.getItem('token')
    // 加一层登录态判断
    if (token) {
      this.$axios.get('/login/loginStatus?token=' + token).then(res => {
        if (res.data.data === true) {
          const blogId = this.$route.params.blogId
          console.log(blogId)
          const _this = this
          if (blogId) {
            this.$axios.get('/article/getArticleByArticleId/' + blogId).then(res => {
              const blog = res.data.data
              _this.ruleForm.id = blog.id
              _this.ruleForm.articletitle = blog.title
              _this.ruleForm.articletabloid = blog.description
              _this.ruleForm.articlecontent = blog.content
              _this.ruleForm.articleId = blog.articleId
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '登录态已失效，请重新登录',
            duration: 1000
          })
          this.$router.push({path: '/login'})
        }
      })
    } else {
      this.$message({
        type: 'error',
        message: '登录态已失效，请重新登录',
        duration: 1000
      })
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>
.main-content{
  position: absolute;
  width: 70%;
  left: 15%;
  right: 15%;
  top: 11%;
}
.m-content {
  text-align: center;
  height: 100%;
}
</style>
