<template>
   <div>
     <headAll></headAll>
     <div class="userDetail">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="头像" prop="avatar">
           <el-upload
             class="avatar-uploader"
             action=""
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload"
           :http-request="uploadAvatar">
             <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>
         <el-form-item label="用户昵称" prop="userName">
           <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="描述" prop="description">
           <el-input type="text" v-model="ruleForm.description" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="性别" prop="sex">
           <el-select v-model="ruleForm.sex" placeholder="请选择">
             <el-option
               v-for="item in sexOptions"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
           <el-input v-model.number="ruleForm.email"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
           <el-button @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
import HeadAll from '../HeadAll'

export default {
  name: 'UserDetails',
  components: {HeadAll},
  data () {
    let checkSex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('性别不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value !== 1 && value !== 2) {
            callback(new Error('性别只能是：1 女 2 男'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        description: '',
        userName: '',
        sex: 1,
        avatar: '',
        email: ''
      },
      sexOptions: [
        {
          value: 1,
          label: '女'
        }, {
          value: 2,
          label: '男'
        }
      ],
      rules: {
        sex: [
          { validator: checkSex, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateUserName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/change', {
            avatarUrl: this.ruleForm.avatar,
            description: this.ruleForm.description,
            email: this.ruleForm.email,
            sex: this.ruleForm.sex,
            userId: this.$store.getters.getUser.userId,
            userName: this.ruleForm.userName
          }).then((res) => {
            if (res.data.status === 200) {
              let oldUser = this.$store.getters.getUser
              oldUser.userName = this.ruleForm.userName
              oldUser.avatar = this.ruleForm.avatar
              this.$store.commit('SET_USERINFO', oldUser)
              this.$message.success('修改成功')
              this.$router.go(0)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('修改错误')
          return false
        }
      })
    },
    uploadAvatar (f) {
      let formData = new FormData()
      formData.append('files', f.file)
      formData.append('type', 1)
      this.$axios.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.ruleForm.avatar = process.env.BASE_URL + '/file/download?fileName=' + res.data.data
          this.$message.success('头像上传成功')
        } else {
          this.$message.error('头像上传失败')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.avatar = res.data.data
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  created () {
    if (!this.$store.getters.getUser) {
      this.$router.push({path: '/login'})
    } else {
      let userId = this.$store.getters.getUser.userId
      this.$axios.post('/user/getUserInfo?userId=' + userId).then((res) => {
        if (res.data.status === 200) {
          this.ruleForm.sex = res.data.data.sex
          this.ruleForm.avatar = res.data.data.avatarUrl
          this.ruleForm.description = res.data.data.description
          this.ruleForm.userName = res.data.data.userName
          this.ruleForm.email = res.data.data.email
        }
      })
    }
  }
}
</script>

<style scoped>
.userDetail{
  position: absolute;
  width: 50%;
  left: 25%;
  right: 25%;
  top: 11%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
