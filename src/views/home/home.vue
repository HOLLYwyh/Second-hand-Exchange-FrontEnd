<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <!--轮播图-->
    <div>
      <el-carousel :interval="4000" :height="carouselHeight" type="card" style="width: 100.8%;margin-left: -8px;margin-right: -9px;top: 40px">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.picImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--商品分类-->
    <div v-for="(item,index) in goodsList" :key="index">
      <div class="post-container">
        <div class="wrap">
          <div class="post-box">
            <div class="box-title">
              <el-button type="text" class="category">{{item.name}}</el-button>
            </div>
            <div class="box-body">
              <div style="display: flex;justify-content: center">
                <div v-for="(it, id) in goodsSizeList[index]" :key="id" class="post">
                    <el-card class="card">
                      <div class="book-title">{{item.bookList[goodsIndexList[index]+id].name}}</div>
                      <img :src=item.bookList[goodsIndexList[index]+id].img alt="这是一张图片" class="book-img">
                      <el-button type="text" class="book-button">查看详情</el-button>
                    </el-card>
                </div>
              </div>
              <!--底部翻页栏-->
              <div class="pagination">
                <el-pagination
                  layout="prev, pager, next"
                  :page-size="4"
                  :total=item.bookList.length>
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      default: '420px'
    }
  },
  data () {
    return {
      swiperList: swiperList,
      goodsList: [
        {name: '课本', bookList: [{img: require('@/assets/temp/temp1.jpg'), name: '算法导论', introduction: ''}, {img: require('@/assets/temp/temp2.jpg'), name: '操作系统概念', introduction: ''}, {img: require('@/assets/temp/temp3.jpg'), name: '计算机网络', introduction: ''}, {img: require('@/assets/temp/temp4.jpg'), name: '离散数学', introduction: ''}]},
        {name: '教辅资料', bookList: [{img: '', name: '计算机网络实验教程', introduction: ''}, {img: '', name: '王道考验', introduction: ''}, {img: '', name: '高数学解', introduction: ''}, {img: '', name: '物理实验辅导', introduction: ''}]},
        {name: '课外阅读', bookList: [{img: '', name: '活着', introduction: ''}, {img: '', name: '白鹿原', introduction: ''}, {img: '', name: '平凡的世界', introduction: ''}, {img: '', name: '黄金时代', introduction: ''}]},
        {name: '其他', bookList: [{img: '', name: '领域驱动设计', introduction: ''}, {img: '', name: 'STL源码剖析', introduction: ''}, {img: '', name: '程序员修炼之道', introduction: ''}, {img: '', name: '代码整洁之道', introduction: ''}]}
      ],
      goodsIndexList: [0, 0, 0, 0],
      goodsSizeList: [4, 4, 4, 4]
    }
  }
}
</script>

<style scoped>
.post-container{
  margin: 4.5rem;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
}
.wrap{
  z-index: 100;
  width:90%
}
.post-box{
  display:block;
  background-color: #fff;
}
.box-title{
  height: 0.2rem;
  background-image: linear-gradient(to right, #CDEB9E , #CDEB9E);
  margin:0;
}
.category{
  float:left;
  display: inline-block;
  position: relative;
  background-color: #9DC068;
  color: white;
  transition: color 0.2s;
  padding: .4rem 2rem 0.5rem
}

.box-body{
  padding: 1px 0;
  height: 350px;
  background-color: whitesmoke;
}

.post{
  display: inline-block;
  vertical-align: top;

  width: 17rem;
  flex-shrink: 0;
  margin-top: 30px;
}
.card{
  height: 250px;
  width: 250px;
}
.pagination{
  margin-top: 30px;
}
.book-title{
  font-weight: bolder;
}
.book-img{
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-top: 20px;
}
.book-button{
  margin-top: 10px;
}
</style>
