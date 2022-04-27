<template>
  <div>
    <div v-if="$route.path==='/userHome/mySecurity/resetMyPassword'">
      <div class="margin-style">
        <h3>重置账号密码</h3>
      </div>
      <el-col :span="6" :offset="9" class="border-style">
        <el-form :model="form" :rules="rules">
          <br />
          <el-row class="margin-inner-style">
            <el-col :span="24">
              <div>
                <el-row >
                  <p style="float: left;font-size: x-small"><b>当前密码：</b></p>
                </el-row>
                <el-form-item></el-form-item>
                <el-row style="float: left">
                  <el-form-item prop="password" class="blackItem">
                    <el-input v-model="form.password" show-password validate-event></el-input>
                  </el-form-item>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row class="margin-inner-style">
            <el-col :span="24">
              <div>
                <el-row >
                  <p style="float: left;font-size: x-small"><b>新密码：</b></p>
                </el-row>
                <el-row style="float: left">
                  <el-form-item prop="newPassword" class="blackItem">

                    <el-input v-model="form.newPassword" show-password ></el-input>
                  </el-form-item>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row class="margin-inner-style">
            <el-col :span="24">
              <div>
                <el-row >
                  <p style="float: left;font-size: x-small"><b>再次输入新密码：</b></p>
                </el-row>
                <el-row style="float: left">
                  <el-form-item prop="verifyNewPassword" class="blackItem">

                    <el-input v-model="form.verifyNewPassword" show-password></el-input>
                  </el-form-item>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-button class="button-style" type="primary" @click="changePassword">继续</el-button>
            <el-button class="button-style" style="background-color: lightgray" @click.native="jumpTo('/userHome/mySecurity')">取消</el-button>
          </el-row>
        </el-form>
      </el-col>
    </div>

  </div>
</template>

<script>
import {resetPassword} from '../../api/userHome/userHome'
export default {
  name: 'resetMyPassword',
  data () {
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        newPassword: '',
        verifyNewPassword: ''
      },
      rules: {
        password: [
          {required: true, message: '请输入旧密码', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/,
            message:
              '必须包含大小写字母和数字的组合，长度在 8-20 之间',
            trigger: 'blur'
          }
        ],
        verifyNewPassword: [
          {required: true, message: '请再次确认新密码', trigger: 'blur'},
          {validator: validateCheckPass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    },
    changePassword () {
      if (this.form.password === '' || this.form.newPassword === '' || this.form.verifyNewPassword === '') {
        this.$message.error('请输入相应内容！')
      } else if (this.form.newPassword !== this.form.verifyNewPassword) {
        this.$message.error('新密码输入不一致！')
      } else {
        const params = { 'password': this.form.password, 'newPassword': this.form.newPassword }
        resetPassword(params).then(res => {
          console.log(res)
          if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
          else {
            this.$message.success('修改成功！')
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
