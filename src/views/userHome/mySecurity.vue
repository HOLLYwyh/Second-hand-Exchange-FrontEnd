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
          <div style="float: left;font-size: x-small;">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload= "false"
              :on-change = "handleChange">
              <img v-if="user.userImage !== null" :src="user.userImage" style="width: 50%;border-radius: 50%">
              <!--                <i class="el-icon-plus avatar-uploader-icon"></i>-->
            </el-upload>
          </div>
          <el-col :span="12">
          </el-col>
          <el-col :span="12" >
          </el-col>
        </el-row>
        <el-divider></el-divider>

          <el-row class="margin-inner-style">
            <el-col :span="12">
              <div style="float: left;font-size: x-small">
                <p style="float: left"><b>姓名：</b></p>
                <p>{{user.userName}}</p>
              </div>
            </el-col>
            <el-col :span="12" >
            </el-col>
          </el-row>
        <el-divider></el-divider>

        <el-row class="margin-inner-style">
          <el-col :span="12">
            <div style="float: left;font-size: x-small">
              <p style="float: left"><b>学号：</b></p>
              <p>{{user.studentId}}</p>
            </div>
          </el-col>
          <el-col :span="12" >
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
              <p>如果您认为您的帐户已被盗用，请修改密码以提高您帐户的安全性。</p>
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
import {changeAvatar} from '../../api/userHome/userHome'
export default {
  name: 'mySecurity',
  components: {
    BreadCrumb
  },
  data () {
    return {
      user: null,
      fileList: []
    }
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    },
    handleChange (file) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType === 'jpg' || fileType === 'png') {
        let formData = new FormData()
        formData.append('files', file.raw)
        changeAvatar(formData).then(res => {
          this.user = res.data
          console.log(res)
        })
      } else {
        this.$message.error('只能上传jpa或png类型图片！')
      }
    }
  },
  mounted () {
    request({
      url: 'user/getUserInfo',
      method: 'get',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      data: null
    }).then(res => {
      this.user = res.data
      console.log(this.user)
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
