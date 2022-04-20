<template>
  <div>
    <div v-if="$route.path==='/userHome/mySecurity/resetMyPhone'">
      <div class="margin-style">
        <h3>修改绑定邮箱</h3>
      </div>
      <el-col :span="6" :offset="9" class="border-style">
        <br />
        <el-row class="margin-inner-style">
          <el-col :span="10">
            <div style="float: left;font-size: x-small">
              <p style="float: left"><b>原邮箱</b></p>
              <p>{{userEmail}}</p>
            </div>
          </el-col>
          <el-col :span="14" style="margin-top: 30px;"><el-button size="mini" type="primary" class="button-style" :disabled="isOK" @click="sendVerify">{{timeCnt}}</el-button></el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="24">
            <div>
              <div >
                <p style="float: left;font-size: x-small"><b>验证码：</b></p>
              </div>
              <div style="float: left">
                <el-input v-model="verifyCode"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="24">
            <div>
              <div >
                <p style="float: left;font-size: x-small"><b>新邮箱：</b></p>
              </div>
              <div style="float: left">
                <el-input v-model="newEmail"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row class="margin-inner-style" style="margin-right: 30px">
          <el-col :span="24">
            <div style="float: left;font-size: x-small">
              <p>
                修改邮箱即表示您同意接收平台自动发送的安全通知。</p>
              <p>可能会收取数据费用。</p>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-button class="button-style" type="primary" @click="changeMyEmali">继续</el-button>
          <el-button class="button-style" style="background-color: lightgray" @click.native="jumpTo('/userHome/mySecurity')">取消</el-button>
        </el-row>
      </el-col>
    </div>

  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
import {email} from '../../api/register/register'
import {changeEmail} from '../../api/userHome/userHome'
export default {
  name: 'resetMyPhone',
  components: {
    BreadCrumb
  },
  data () {
    return {
      sendEmail: false,
      userEmail: window.sessionStorage.getItem('userEmail'),
      timeCnt: '获 取 验 证 码',
      isOK: false,
      hasSendVerify: false,
      verifyCode: '',
      newEmail: ''
    }
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    },
    // eslint-disable-next-line vue/no-dupe-keys
    sendVerify () {
      if (this.timeCnt === '获 取 验 证 码') {
        this.timeCnt = 30
        this.isOK = true
        this.cnt()
        this.sendEmail = true
        const params = { 'userEmail': this.userEmail }
        email(params).then(res => {
        })
      }
    },
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
    changeMyEmali () {
      if (this.sendEmail === false) {
        this.$message.error('请先获取验证码！')
        return
      }
      if (this.verifyCode === '') {
        this.$message.error('请填写验证码')
        return
      }
      if (this.newEmail === '') {
        this.$message.error('请填写新邮箱')
        return
      }
      let params = {'studentId': window.sessionStorage.getItem('userID'), 'verifyCode': this.verifyCode, 'newEmail': this.newEmail}
      changeEmail(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功！')
          location.reload()
        } else {
          this.$message.error('修改失败！')
        }
      }).catch(error => {
        console.log(error)
        this.$message('网络错误！')
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.margin-inner-style{
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
