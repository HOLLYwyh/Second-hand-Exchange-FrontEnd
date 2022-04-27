<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <Particles/>
    <!--轮播图-->
    <div>
      <el-carousel :interval="4000" :height="carouselHeight" type="card" style="width: 100.8%;margin-left: -8px;margin-right: -9px;top: 40px;z-index: 1000">
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
              <el-button type="text" class="category">{{getCategoryName(item.goodsCategory)}}</el-button>
            </div>
            <div class="box-body">
              <div style="display: flex;justify-content: center">
                <div v-for="(it, id) in goodsSizeList[index]" :key="id" class="post" @click="goToBook(item.bookList[goodsIndexList[index]+id].goodsId)">
                    <el-card class="card" shadow="hover">
                      <div class="book-title">{{ item.bookList[goodsIndexList[index]+id].goodsName}}</div>
                      <img :src=item.bookList[goodsIndexList[index]+id].goodsImage alt="这是一张图片" class="book-img">
                      <div>售价：￥ {{item.bookList[goodsIndexList[index]+id].goodsPrice}}</div>
                        <div>剩余：{{item.bookList[goodsIndexList[index]+id].sellNum}}</div>
                    </el-card>
                </div>
              </div>
              <!--底部翻页栏-->
              <div class="pagination">
                <!--这里需要优化一下-->
                <el-pagination v-if="goodsSizeList[index]>=pageSize||pageChangeList[index]" layout="prev, pager, next" :page-size="pageSize"
                               :total=5 :current-page.sync="pageNumberList[index].number" :page-count="7"
                               @current-change="turnPage(index, pageNumberList[index].number, item.goodsCategory)"></el-pagination>
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
import { getBookAPI } from '../../api/Home/home'

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
      goodsList: [],
      goodsIndexList: [],
      goodsSizeList: [],
      pageNumberList: [],
      pageChangeList: [],
      pageSize: 4
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    this.getBooks()
  },
  methods: {
    getBooks () {
      let params = { 'goodsCategory': 'all', 'pageNumber': 0, 'pageSize': this.pageSize }
      getBookAPI(params).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.goodsList = res.data
          for (let i = 0; i < this.goodsList.length; i++) {
            this.goodsSizeList.push(this.goodsList[i].bookList.length)
            this.goodsIndexList.push(0)
            this.pageNumberList.push({number: 1})
            this.pageChangeList.push(false)
          }
        }
      })
    },
    getCategoryName (category) {
      if (category === 'textbook') return '课本'
      else if (category === 'teachingMaterials') return '教辅资料'
      else if (category === 'extracurricularBook') return '课外书'
      else if (category === 'rests') return '其他'
      else return '暂无'
    },
    goToBook (goodsId) {
      this.$router.push(`/bookDetail?id=${goodsId}`)
    },
    turnPage (index, pageNumber, category) {
      console.log(index)
      let params = { 'goodsCategory': category, 'pageNumber': pageNumber - 1, 'pageSize': this.pageSize }
      getBookAPI(params).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.goodsList[index] = res.data[0]
          console.log(res.data[0])
          this.goodsSizeList[index] = this.goodsList[index].bookList.length
          this.pageChangeList[index] = true
          this.$forceUpdate()
        }
      })
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
  margin-left: 47px;
  margin-top: 10px;
  width: 130px;
  height: 150px;
}
</style>
