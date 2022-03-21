<template>
  <div>
    <div v-if="$route.path==='/userHome/mySecurity/resetMyPassword'">
      <div class="margin-style">
        <h3>重置账号密码</h3>
      </div>
      <el-col :span="6" :offset="9" class="border-style">
        <br />
        <el-row class="margin-inner-style">
          <el-col :span="24">
            <div>
              <el-row >
                <p style="float: left;font-size: x-small"><b>当前密码：</b></p>
              </el-row>
              <el-row style="float: left">
                <el-input></el-input>
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
                <el-input></el-input>
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
                <el-input></el-input>
              </el-row>
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
export default {
  name: 'resetMyPassword',
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    }
  }
}
</script>

<style scoped>

</style>
