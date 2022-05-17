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
                <div v-for="(it, id) in goodsSizeList[index]" :key="id" class="post" >
                  <el-card class="card" shadow="hover">
                    <div class="book-title">{{ item.bookList[goodsIndexList[index]+id].goodsName}}</div>
                    <div style="display: flex" @click="goToBook(item.bookList[goodsIndexList[index]+id].goodsId)">
                      <img :src=item.bookList[goodsIndexList[index]+id].goodsImage alt="这是一张图片" class="book-img">
                      <ul class="goods-info">
                        <li style="margin-top: 5px;font-weight: bolder;color: red;font-size: 18px">￥ {{item.bookList[goodsIndexList[index]+id].goodsPrice}}</li>
                        <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.bookList[goodsIndexList[index]+id].newnessDegree<10">{{item.bookList[goodsIndexList[index]+id].newnessDegree}}成新</li>
                        <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.bookList[goodsIndexList[index]+id].newnessDegree===10">全新</li>
                        <li style="text-align: center;margin-top: 30px">剩余：{{item.bookList[goodsIndexList[index]+id].sellNum}}</li>
                      </ul>
                    </div>
                    <div style="display: flex;margin-top: 10px">
                      <img  style="width: 50px;height: 50px" :src="item.bookList[goodsIndexList[index]+id].userImage">
                      <div style="margin-left: 10px">
                        <div style="font-style:oblique">提供者</div>
                        <div style="margin-top: 10px;font-style:oblique">{{item.bookList[goodsIndexList[index]+id].userName}}</div>
                      </div>
                      <div style="margin-left: 30px;margin-top: 15px">
                        <div  v-if="item.goodsCategory === 'textbook'" class="arrow-line-1">{{getCategoryName(item.goodsCategory)}}</div>
                        <div  v-if="item.goodsCategory === 'teachingMaterials'" class="arrow-line-2">{{getCategoryName(item.goodsCategory)}}</div>
                        <div  v-if="item.goodsCategory === 'extracurricularBook'" class="arrow-line-3">{{getCategoryName(item.goodsCategory)}}</div>
                        <div  v-if="item.goodsCategory === 'rests'" class="arrow-line-4">{{getCategoryName(item.goodsCategory)}}</div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
              <!--底部翻页栏-->
              <div class="pagination">
                <el-button type="primary" @click="changeGoods(item.goodsCategory)">换一换</el-button>
                <router-link style="margin-left: 100px" :to="'goods?category='+item.goodsCategory" class="router-link-active">查看更多 ···</router-link>
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
import { getBookAPI, getUserInfo } from '../../api/Home/home'

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
      pageSize: 4
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    this.getBooks()
  },
  methods: {
    getBooks () {
      let params = { 'goodsCategory': 'all', 'pageSize': this.pageSize }
      getBookAPI(params).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.goodsList = res.data
          for (let i = 0; i < this.goodsList.length; i++) {
            this.goodsSizeList.push(this.goodsList[i].bookList.length)
            this.goodsIndexList.push(0)
            for (let j = 0; j < this.goodsList[i].bookList.length; j++) {
              let params = {'userId': this.goodsList[i].bookList[j].userId}
              getUserInfo(params).then(re => {
                this.goodsList[i].bookList[j]['userName'] = re.data.userName
                this.$forceUpdate()
              })
            }
          }
          this.$forceUpdate()
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
    changeGoods (category) {
      let params = { 'goodsCategory': category, 'pageSize': this.pageSize }
      getBookAPI(params).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          if (category === 'textbook') {
            this.goodsList[0].bookList = res.data[0].bookList
            for (let i = 0; i < res.data[0].bookList.length; i++) {
              let params = {'userId': res.data[0].bookList[i].userId}
              getUserInfo(params).then(re => {
                this.goodsList[0].bookList[i]['userName'] = re.data.userName
                this.$forceUpdate()
              })
            }
          } else if (category === 'teachingMaterials') {
            this.goodsList[1].bookList = res.data[0].bookList
            for (let i = 0; i < res.data[0].bookList.length; i++) {
              let params = {'userId': res.data[0].bookList[i].userId}
              getUserInfo(params).then(re => {
                this.goodsList[1].bookList[i]['userName'] = re.data.userName
                this.$forceUpdate()
              })
            }
          } else if (category === 'extracurricularBook') {
            this.goodsList[2].bookList = res.data[0].bookList
            for (let i = 0; i < res.data[0].bookList.length; i++) {
              let params = {'userId': res.data[0].bookList[i].userId}
              getUserInfo(params).then(re => {
                this.goodsList[2].bookList[i]['userName'] = re.data.userName
                this.$forceUpdate()
              })
            }
          } else if (category === 'rests') {
            this.goodsList[3].bookList = res.data[0].bookList
            for (let i = 0; i < res.data[0].bookList.length; i++) {
              let params = {'userId': res.data[0].bookList[i].userId}
              getUserInfo(params).then(re => {
                this.goodsList[3].bookList[i]['userName'] = re.data.userName
                this.$forceUpdate()
              })
            }
          }
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
  height: 400px;
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
  height: 270px;
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
  margin-left: -10px;
  margin-top: 10px;
  width: 130px;
  height: 150px;
}
.router-link-active {
  text-decoration: none;
  color: teal;
}
.goods-info {
  margin-left: -15px;
  list-style:none;
}
.arrow-line-1 {
  position: relative;
  width: 70px;
  height: 20px;
  background: tomato;
  color: #F9F0DA;
}
.arrow-line-1::after {
  content: '';
  position: absolute;
  right: -20px;
  border: 10px solid transparent;
  border-left-color: tomato;

}
.arrow-line-2 {
  position: relative;
  width: 70px;
  height: 20px;
  background: teal;
  color: #F9F0DA;
}
.arrow-line-2::after {
  content: '';
  position: absolute;
  right: -20px;
  border: 10px solid transparent;
  border-left-color: teal;

}
.arrow-line-3 {
  position: relative;
  width: 70px;
  height: 20px;
  background: purple;
  color: #F9F0DA;
}
.arrow-line-3::after {
  content: '';
  position: absolute;
  right: -20px;
  border: 10px solid transparent;
  border-left-color: purple;

}
.arrow-line-4 {
  position: relative;
  width: 70px;
  height: 20px;
  background: cornflowerblue;
  color: #F9F0DA;
}
.arrow-line-4::after {
  content: '';
  position: absolute;
  right: -20px;
  border: 10px solid transparent;
  border-left-color: cornflowerblue;

}
</style>
