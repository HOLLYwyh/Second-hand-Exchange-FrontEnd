<template>
  <div>
    <bread-crumb></bread-crumb>
    <div v-if="$route.path==='/userHome/mySecurity'">
      <div class="margin-style">
        <h3>登录与安全</h3>
      </div>
      <el-col :span="8" :offset="8" class="border-style">
        <br />
<!--        <el-row class="margin-inner-style">-->
<!--          <el-col :span="12">-->
<!--            <div style="float: left;font-size: x-small">-->
<!--              <img :src="user.userImage"/>-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="12" >-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-divider></el-divider>-->

          <el-row class="margin-inner-style">
            <el-col :span="12">
              <div style="float: left;font-size: x-small">
                <p style="float: left"><b>姓名：</b></p>
                <p>{{userName}}</p>
              </div>
            </el-col>
            <el-col :span="12" >
            </el-col>
          </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="12">
            <div style="float: left;font-size: x-small">
              <p style="float: left"><b>邮箱：</b></p>
              <p>{{userEmail}}</p>
            </div>
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
import request from '../../utils/request'
export default {
  name: 'mySecurity',
  components: {
    BreadCrumb
  },
  data () {
    return {
      userEmail: window.sessionStorage.getItem('userEmail'),
      userName: window.sessionStorage.getItem('userName')
    }
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    }
  },
  mounted () {
    request({
      url: 'user/getUserInfo',
      method: 'get',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      data: null
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.margin-inner-style{
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
