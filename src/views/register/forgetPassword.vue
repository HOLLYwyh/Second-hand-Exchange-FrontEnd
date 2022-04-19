<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/login/background.jpg" width="100%" height="100%" />
    </div>
    <div>
      <el-card style="border-radius: 12px" class="IdentitySelectionContainer">
        <el-row justify="center">
          <el-col>
            <el-form ref="RegisterForm" :model="form" :rules="rules" label-width="70px" :hide-required-asterisk="true" size="medium">

              <el-form-item label="邮箱" prop="email" class="blackItem">
                <el-row type="flex">
                  <el-input v-model="form.email" placeholder="请输入邮箱" clearable></el-input>
                  <el-button type="primary" plain :disabled="isOK" @click="sendEmail">{{ timeCnt }}</el-button>
                </el-row>
              </el-form-item>

              <el-form-item label="验证码" prop="verifyEmail" class="blackItem">
                <el-input v-model="form.verifyEmail" placeholder="请输入验证码" clearable></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password" class="blackItem">
                <el-input v-model="form.password" showPassword placeholder="请输入新密码" clearable></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword" class="blackItem">
                <el-input v-model="form.checkPassword" showPassword placeholder="请再次输入密码" clearable></el-input>
              </el-form-item>
              <el-row type="flex" justify="center" style="margin: 0px 0 10px 0px">
                <el-button class="buttonColor" size="medium" round style="width: 70%;margin-left: 30px" type="primary" @click="changePassword">找回</el-button>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <router-link to="/"><el-link :underline="false" style="color:white;margin-left: 30px">返回</el-link>
          </router-link>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { email, getBackPassword } from '../../api/register/register'

export default {
  data () {
    return {
      // 发送邮箱避免频繁发送
      timeCnt: '验证',
      isOK: false,
      cnthandler: null,
      canRegister: true,
      form: {
        password: '',
        checkPassword: '',
        email: '',
        verifyEmail: ''
      },

      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/,
            message:
              '必须包含大小写字母和数字的组合，长度在 8-20 之间',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                this.canRegister = false
                callback(new Error('两次输入密码不一致'))
              } else {
                this.canRegister = true
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'change' },
          { type: 'email', message: '请填写正确的邮箱', trigger: 'change' }
        ],
        verifyEmail: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') !== null) this.$router.push('/index')
  },
  methods: {
    cnt: function () {
      this.cnthandler = setTimeout(() => {
        if (this.timeCnt === 0) {
          clearInterval(this.cnthandler)
          this.timeCnt = '验证'
          this.isOK = false
          return
        }
        this.timeCnt--
        this.cnt()
      }, 1000)
    },
    sendEmail () {
      if (this.timeCnt === '验证') {
        this.timeCnt = 300
        this.cnt()
        const params = {'userEmail': this.form.email}
        email(params).then(res => {
        })
      }
    },
    changePassword () {
      if (this.canRegister && (this.form.password !== '') && (this.form.verifyEmail !== '') && (this.form.password === this.form.checkPassword)) {
        const params = {'userEmail': this.form.email, 'verifyCode': this.form.verifyEmail, 'userPassword': this.form.password}
        getBackPassword(params).then(res => {
          if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
          else {
            this.$message({
              message: '修改密码成功',
              type: 'success'
            })
            this.$router.push('/')
          }
        })
      } else {
        this.$message.error('请填写完整的信息！！')
      }
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
.IdentitySelectionContainer {
  height: 60%;
  width: 30%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  backdrop-filter: blur(3px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

<style>
.blackItem .el-form-item__label{
  color: white;
  size: 35px;
}
</style>
