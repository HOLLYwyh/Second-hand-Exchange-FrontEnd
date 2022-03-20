<template>
  <div>
    <!--顶部导航-->
<!--    <NavBar/>-->
<!--    &lt;!&ndash;粒子特效&ndash;&gt;-->
<!--    <Particles/>-->
    <!--返回顶部-->
    <BackToTop/>
  </div>
</template>

<script>
import BackToTop from '../../components/BackToTop'
import Particles from '../../components/Particles'
import NavBar from '../../components/NavBar'

export default {
  name: 'Home',
  components: {BackToTop, Particles, NavBar}
}
</script>

<style scoped>

</style>
