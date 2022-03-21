<template>
  <div>
    <bread-crumb></bread-crumb>
    <div v-if="$route.path==='/userHome/mySecurity'">
      <div class="margin-style">
        <h3>登录与安全</h3>
      </div>
      <el-col :span="8" :offset="8" class="border-style">
        <br />
          <el-row class="margin-inner-style">
            <el-col :span="12">
              <div style="float: left;font-size: x-small">
                <p><b>姓名：</b></p>
                <p>xiaoyi Liang</p>
              </div>
            </el-col>
            <el-col :span="12" >
              <el-button type="primary" size="mini" style="margin-top: 30px;">修改</el-button>
            </el-col>
          </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="12">
            <div style="float: left;font-size: x-small">
              <p><b>手机号码：</b></p>
              <p>188******63</p>
            </div>
          </el-col>
          <el-col :span="12" >
            <el-button type="primary"  size="mini" style="margin-top: 30px" @click.native="jumpTo('/userHome/mySecurity/resetMyPhone')">修改</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="12">
            <div style="float: left;font-size: x-small">
              <p><b>密码：</b></p>
              <p>*********</p>
            </div>
          </el-col>
          <el-col :span="12" >
            <el-button type="primary" size="mini" style="margin-top: 30px" @click.native="jumpTo('/userHome/mySecurity/resetMyPassword')">修改</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="24">
            <div style="float: left;font-size: x-small">
              <p><b>保护您的帐户安全</b></p>
              <p>如果您认为您的帐户已被盗用，请修改密码与邮箱以提高您帐户的安全性。</p>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
export default {
  name: 'mySecurity',
  components: {
    BreadCrumb
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    }
  }
}
</script>

<style scoped>
.margin-inner-style{
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
