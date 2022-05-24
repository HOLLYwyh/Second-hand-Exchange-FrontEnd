<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="seller.userImage" alt="商品图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">卖家</div>{{seller.userName}}
              <img src="../../assets/detailIcon/ContactService.png" alt="联系客服" style="width: 30px;height: 30px">
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="font-weight: bolder">学号：{{seller.studentId}}</div>
                <div style="font-weight: bolder;margin-top: 30px">邮箱：{{seller.userEmail}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--商品信息-->
        <!--没有求物贴-->
        <div class="searchBar">
          <el-empty v-if="bookList.length === 0" description="暂时没有上传过任何商品"></el-empty>
        </div>
        <!--有帖子-->
        <div v-if="bookList.length > 0" class="searchBar">
          <div>
            <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
              <div v-for="(item, index) in bookList" :key="index" style="width: 25%">
                <div style="margin-top: 20px">
                  <el-card class="card">
                    <div class="book-title">{{item.goodsName}}</div>
                    <div style="display: flex" @click="goToBook(item.goodsId)">
                      <img :src="item.goodsImage" alt="这是一张图片" class="book-img">
                      <ul class="goods-info">
                        <li style="margin-top: 5px;font-weight: bolder;color: red;font-size: 18px">￥ {{item.goodsPrice}}</li>
                        <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.newnessDegree<10">{{item.newnessDegree}}成新</li>
                        <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.newnessDegree===10">全新</li>
                        <li style="text-align: center;margin-top: 30px">剩余：{{item.sellNum}}</li>
                      </ul>
                    </div>
                    <div style="display: flex;margin-top: 10px;margin-left: 30px">
                      <div style="margin-left: 70px;margin-top: 15px" @click="goToCategory(item.goodsCategory)">
                        <div  v-if="item.goodsCategory === 'textbook'" class="arrow-line-1">{{getCategoryName(item.goodsCategory)}}</div>
                        <div  v-if="item.goodsCategory === 'teachingMaterials'" class="arrow-line-2">{{getCategoryName(item.goodsCategory)}}</div>
                        <div  v-if="item.goodsCategory === 'extracurricularBook'" class="arrow-line-3">{{getCategoryName(item.goodsCategory)}}</div>
                        <div  v-if="item.goodsCategory === 'rests'" class="arrow-line-4">{{getCategoryName(item.goodsCategory)}}</div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Particles from '../../components/Particles'
import {getUserInfo} from '../../api/Home/home'
import {getSoldGoods} from '../../api/book/sellGoods'

export default {
  name: 'user',
  components: {NavBar, Particles},
  data () {
    return {
      seller: {},
      bookList: []
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    let id = 0
    if (this.$route.query.id === undefined) id = 6
    else id = this.$route.query.id
    const userParams = {'userId': id}
    getUserInfo(userParams).then(res => {
      this.seller = res.data
    })
    const params = {'userId': id}
    getSoldGoods(params).then(res => {
      this.bookList = res.data
      console.log(this.bookList)
    })
  },
  methods: {
    goToUserDetail (id) {
      this.$router.push(`/user?id=${id}`)
    },
    goToBook (goodsId) {
      this.$router.push(`/bookDetail?id=${goodsId}`)
    },
    getCategoryName (category) {
      if (category === 'textbook') return '课本'
      else if (category === 'teachingMaterials') return '教辅资料'
      else if (category === 'extracurricularBook') return '课外书'
      else if (category === 'rests') return '其他'
      else return '暂无'
    },
    goToCategory (category) {
      this.$router.push('goods?category=' + category)
    }
  }
}
</script>

<style scoped>
/deep/.el-table, .el-table tr, .el-table td, .el-table th {
  background-color: transparent!important;
}
.table /deep/ .el-table th {
  background-color: transparent!important;
}

.table /deep/ .el-table tr {
  background-color: transparent!important;
}
.table /deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
}
.book {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  z-index: 1000;
}

.book-top-card {
  display: flex;
  z-index: 1000;
}

.book-img-wrap {
  width: 200px;
  height: 200px;
  z-index: 1000;
}

.book-img-wrap img {
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.book-info {
  padding: 0 20px;
  flex: 1;
  z-index: 1000;
}

.book-info .tag1 {
  color: #2e0f6d;
  border: 1px solid #2e0f6d;
  display: inline-block;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0 7px;
  cursor: default;
  z-index: 1000;
}

.book-name {
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.book-desc span:nth-of-type(2){
  /*font-size: 14px;*/
  z-index: 1000;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: none;
  z-index: 1000;
}
.searchBar{
  margin-top: 20px;
}
.card{
  width: 320px;
  height: 270px;
  margin-left: 10px;
}
.book-title{
  font-weight: bolder;
}
.book-img{
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  margin-top: 10px;
  width: 130px;
  height: 150px;
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
