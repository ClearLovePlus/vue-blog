<template>
  <div>
    <Header></Header>

    <div class="m-content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="id" hidden>
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.articletitle"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.articletabloid"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.articlecontent"></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
import Header from '../tool/Header'
export default {
  name: 'BlogEdit',
  components: {Header},
  data () {
    return {
      ruleForm: {
        id: '',
        articletitle: 'test',
        articletabloid: 'tets',
        articlecontent: 'tes'
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/article/publishArticle', this.ruleForm, {
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
      })
    }
  }
}
</script>

<style scoped>
.m-content {
  text-align: center;
}
</style>
