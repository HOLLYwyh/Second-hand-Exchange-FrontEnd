<template>
  <div>
    <nav-bar></nav-bar>
    <bread-crumb></bread-crumb>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import BreadCrumb from '../../components/BreadCrumb'
export default {
  name: 'myOrder',
  components: {
    NavBar,
    BreadCrumb
  }
}
</script>

<style scoped>

</style>
