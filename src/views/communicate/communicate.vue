<template>
  <div>
    <div>
      <nav-bar-without-router-view></nav-bar-without-router-view>
    </div>
    <div class="margin-style">
      <el-container style="background-color: lightgray;border-radius: 10px">
        <el-aside>
          <el-row><h4>123</h4></el-row>
          <el-row>
            123
          </el-row>
        </el-aside>
        <el-main >
          <el-row>卖家</el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavBarWithoutRouterView from '../../components/NavBarWithoutRouterView'
export default {
  name: 'communicate',
  components: {
    NavBarWithoutRouterView
  }
}
</script>

<style scoped>
.chat-main{
  border-style: solid;
  border-width: thin;
  border-radius: 10px;
  background-color: rgba(0,0,0,0.36);
}
</style>
