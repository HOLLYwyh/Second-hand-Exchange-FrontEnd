<template>
  <div>
    <nav-bar></nav-bar>

    <div>
      <el-container  style="margin-top: 100px;margin-left: 300px">
        <el-header>
            <h1 style="float: left;margin-left: 50px;">我的账户</h1>
        </el-header>
          <el-main>
            <UserInfoCard></UserInfoCard>
          </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import UserInfoCard from '../../components/UserInfoCard'
export default {
  name: 'userHome',
  components: {
    NavBar,
    UserInfoCard
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
