<template>
  <div>
    <div v-if="$route.path==='/userHome/mySecurity/resetMyPhone'">
      <div class="margin-style">
        <h3>修改绑定手机号码</h3>
      </div>
      <el-col :span="6" :offset="9" class="border-style">
        <br />
        <el-row class="margin-inner-style">
          <el-col :span="10">
            <div style="float: left;font-size: x-small">
              <p><b>原手机号码</b></p>
              <p>199******63</p>
            </div>
          </el-col>
          <el-col :span="14" style="margin-top: 30px;"><el-button size="mini" class="button-style">获 取 验 证 码</el-button></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="margin-inner-style">
          <el-col :span="24">
            <div>
              <div >
                <p style="float: left;font-size: x-small"><b>手机号码：</b></p>
              </div>
              <div style="float: left">
                <el-input></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="24">
            <div>
              <div >
                <p style="float: left;font-size: x-small"><b>验证码：</b></p>
              </div>
              <div style="float: left">
                <el-input></el-input>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row class="margin-inner-style" style="margin-right: 30px">
          <el-col :span="24">
            <div style="float: left;font-size: x-small">
              <p>
                注册手机号码即表示您同意接收亚马逊通过短信自动发送的安全通知。您可以进入“我的账户”设置，在“登录与安全”页面移除您的手机号码以选择退出。</p>
              <p>可能会收取短信和数据费用。</p>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-button class="button-style">继续</el-button>
          <el-button class="button-style" style="background-color: lightgray" @click.native="jumpTo('/userHome/mySecurity')">取消</el-button>
        </el-row>
      </el-col>
    </div>

  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
export default {
  name: 'resetMyPhone',
  components: {
    BreadCrumb
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
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
