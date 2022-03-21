<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="margin-style">
      <h3 style="float: left">我的购物车</h3>
    </div>
    <el-container>
      <el-main></el-main>
      <el-aside></el-aside>
    </el-container>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
export default {
  name: 'myChart',
  components: {
    BreadCrumb
  }
}
</script>

<style scoped>

</style>
