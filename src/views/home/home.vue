<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
<!--    &lt;!&ndash;粒子特效&ndash;&gt;-->
<!--    <Particles/>-->

    <!---->
    <div>
      <el-carousel :interval="4000" :height="carouselHeight" type="card" style="width: 100.8%;margin-left: -8px;margin-right: -9px;top: 40px">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.picImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--返回顶部-->
    <BackToTop/>
  </div>
</template>

<script>
import { swiperList } from '../../assets/data/swiper'
import BackToTop from '../../components/BackToTop'
import Particles from '../../components/Particles'
import NavBar from '../../components/NavBar'

export default {
  name: 'Home',
  components: {BackToTop, Particles, NavBar},
  props: {
    carouselHeight: {
      type: String,
      default: '450px'
    }
  },
  data () {
    return {
      swiperList: swiperList
    }
  }
}
</script>

<style scoped>

</style>
