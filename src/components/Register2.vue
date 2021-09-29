<template>
  <div class="register">
    <div class="register-box">
      <div class="register-logo">
        <img src="../assets/img/pu.png" class="register-logo-img">
      </div>

      <el-form ref="register-form" :model="user" :rules="rules" label-position="center">
        <el-form-item prop="userName">
          <el-input v-model="user.name" placeholder="请输入用户名" autoComplete="off" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" type="password" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox> 我已经阅读并同意
            <a href="https://www.hupu.com/policies/terms" data-title=用户协议 target="_blank">用户协议</a>及<a
              href="https://www.hupu.com/policies/privacy" data-title="隐私条款" target="_blank">隐私条款</a></el-checkbox>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Register2',
  data () {
    return {
      user: {
        mobile: '',
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 25, message: '长度在 8 到 25 个包含大小写和特殊字符的字符', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ]
      }
    }
  }

}
</script>

<style scoped>
.register {
  background: url('../assets/img/register.png') center center no-repeat;
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.register-box {
  position: fixed;
  width: 540px;
  height: 580px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  background-color: white;
}

.register-logo {
  position: absolute;
  margin-top: 30px;
  margin-left: 200px;
}

.el-form {
  position: absolute;
  width: 540px;
  height: 400px;
  margin-top: 200px;
}

.el-input {
  padding-left: 15px;
  box-sizing: border-box;
  padding-right: 15px;
  border: 1px #CCC;
  width: 363px;
  height: 44px;
}

.el-input >>> .el-input__inner {
  border-radius: 0;
  height: 44px;
}

.el-button {
  width: 330px;
  background-color: #e42837;
}
</style>
