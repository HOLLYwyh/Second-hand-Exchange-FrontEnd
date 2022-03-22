<template>
  <div>
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" class="margin-style">
        <el-breadcrumb-item style="font-size: medium" :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: medium" v-for="(item,index) in breadList" :key="index" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      breadList: [] // 路由集合
    }
  },
  methods: {
    isHome (route) {
      return route.name === 'home'
    },
    getBreadcrumb () {
      let matched = this.$route.matched

      this.breadList = matched
      // console.log(this.breadList)
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  mounted () {
    this.getBreadcrumb()
  }
}
</script>

<style scoped>

</style>
