<template>
  <div>
    <div class="margin-style" style="margin-left:100px;margin-right: 100px" v-if="this.$route.path==='/userHome/myChart'">
      <bread-crumb></bread-crumb>
      <my-cart @createOrder="createOder"></my-cart>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
import MyCart from '../../components/MyCart'
export default {
  name: 'myChart',
  components: {
    BreadCrumb,
    MyCart
  },
  data () {
    return {
      multipleSelection: []
    }
  },
  methods: {
    createOder (args) {
      this.multipleSelection = args
      // console.log(this.multipleSelection)
      this.$router.push('/createOrder')
    }
  }
}
</script>

<style scoped>
</style>
