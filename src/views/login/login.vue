<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/login/bg.png" width="100%" height="100%"  alt="background"/>
    </div>
    <div style="vertical-align: middle">
      <el-card  class="Login_Card" style="border-radius: 12px">
        <div class="login-title">校园二手书交易平台</div>
        <el-row justify="center" style="margin: 30px 0 10px 0">
          <el-col>
            <el-form ref="form" :model="form" label-width="60px" :hide-required-asterisk="true" size="medium">
              <el-form-item label="邮箱" class="blackItem" >
                <el-input v-model="form.email" placeholder="请输入邮箱" clearable autofocus style="width: 230px;"></el-input>
              </el-form-item>
              <el-form-item label="密码" class="blackItem">
                <el-input v-model="form.password" showPassword placeholder="请输入密码" clearable autofocus style="width: 230px;"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" style="margin: 0 0 10px 0">
          <el-button class="buttonColor" @click="login" size="medium" round style="width: 280px" type="primary">登录</el-button>
        </el-row>

        <el-row style="text-align: center;">
          <el-col :span="8" :offset="3">
            <router-link :to="'/register'">
              <el-link :underline="false" style="color: white">注册账号</el-link>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link :to="'/forgetPassword'">
              <el-link :underline="false" style="color: white">找回密码</el-link>
            </router-link>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '../../api/login/login'

export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      verifyCode: ''
    }
  },
  created () {
    if (window.sessionStorage.getItem('tokenValue') !== null) this.$router.push('/index')
    var str = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM'
    // eslint-disable-next-line no-unused-vars
    var res = ''
    for (var i = 0; i < 4; i++) {
      // 将得到的结果给字符串，调用随机函数，0最小数，62表示数字加字母的总数
      res += str[this.random(0, 62)]
    }
    this.verifyCode = res
  },
  methods: {
    random (max, min) {
      return Math.round(Math.random() * (max - min) + min)
    },
    login () {
      const params = {'userEmail': this.form.email, 'userPassword': this.form.password}
      loginAPI(params).then(res => {
        console.log(res)
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.$router.push('/index')
          sessionStorage.setItem('userID', res.data.userId)
          sessionStorage.setItem('userEmail', res.data.userEmail)
          sessionStorage.setItem('userName', res.data.userName)
          sessionStorage.setItem('tokenName', res.data.tokenName)
          sessionStorage.setItem('tokenValue', res.data.tokenValue)
        }
      })
    }
  }
}
</script>

<style scoped>
.Img_Box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.buttonColor{
  background: #2e0f6d;
  border-color: #2e0f6d;
  color: #fff;

}

.Login_Card {
  height: fit-content;
  width: 30%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(3px);
  padding: 10px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login-title{
  color: whitesmoke;
  text-align: center;
  font-size: 24px;
  margin-left: 30px;
}
</style>

<style>
.blackItem .el-form-item__label{
  color: white;
  size: 35px;
}
</style>
