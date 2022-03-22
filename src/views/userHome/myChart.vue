<template>
  <div class="margin-style" style="margin-left:100px;margin-right: 100px">
    <bread-crumb></bread-crumb>
    <my-cart></my-cart>
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
  }
}
</script>

<style scoped>
</style>
