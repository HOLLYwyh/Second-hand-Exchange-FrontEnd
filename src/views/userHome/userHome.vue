<template>
  <div>
    <nav-bar-without-router-view></nav-bar-without-router-view>
    <div v-if="$route.path==='/userHome'">
      <el-container  style="margin-top: 100px;margin-left: 300px">
        <el-header>
            <h1 style="float: left;margin-left: 50px;">我的账户</h1>
        </el-header>
          <el-main>
            <UserInfoCard></UserInfoCard>
          </el-main>
      </el-container>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
import NavBarWithoutRouterView from '../../components/NavBarWithoutRouterView'
import UserInfoCard from '../../components/UserInfoCard'
export default {
  name: 'userHome',
  components: {
    NavBarWithoutRouterView,
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
