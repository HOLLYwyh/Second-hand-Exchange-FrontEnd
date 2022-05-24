<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="details.goodsImages[0]" alt="商品图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">{{getCategoryName(details.goodsCategory)}}</div>{{details.goodsName}}
              <div class="el-icon-star-on" v-show="favoriteVisible" @click="favorite(1)"></div>
              <div class="el-icon-star-off" v-show="cancelFavoriteVisible" @click="favorite(0)"></div>
              <img src="../../assets/detailIcon/ContactService.png" alt="联系客服" style="width: 30px;height: 30px">
            </div>
            <div class="book-user-info">
              <div class="book-create-time">
                <span>共{{details.goodsFavorite}}人点赞</span>
              </div>
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">商品简介</div>
                <div>{{details.goodsIntroduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <div style="margin-top: 20px;display: flex;justify-content: center;margin-left: 100px">
          <el-button type="success" @click="addCart()">加入购物车</el-button>
          <el-button type="primary">立即购买</el-button>
          <el-button type="danger" @click="jump('communicate')">联系卖家</el-button>
        </div>
        <!--商品信息-->
        <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap;margin-top: 40px">
          <el-card style="width: 400px;margin-left: 200px;height: 300px">
            <div style="font-weight: bolder">商品信息</div>
            <div class="album-tabs-wrap">
              <el-tabs style="z-index: 1000;">
                <div class="table">
                  <el-table :data="detailInfo" infinite-scroll-delay=500 infinite-scroll-disabled="noMore" stripe>
                    <el-table-column prop="title"></el-table-column>
                    <el-table-column prop="content"></el-table-column>
                  </el-table>
                </div>
              </el-tabs>
            </div>
          </el-card>
          <el-card style="width: 400px;margin-left: 200px;height: 300px">
            <div style="font-weight: bolder">卖家信息</div>
            <div style="margin-top: 20px">
              <div style="display: flex">
                <img :src="seller.image" alt="这是一张图片" style="width: 150px;height: 150px" @click="goToUserDetail(seller.id)">
                <div style="margin-left: 70px" @click="goToUserDetail(seller.id)">
                  <div style="margin-top: 20px">提供者： {{seller.name}}</div>
                  <div style="margin-top: 80px"></div>
                  <router-link  :to="'user?id='+seller.id" class="router-link-active">用户详情 ···</router-link>
                </div>
              </div>
            </div>

          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Particles from '../../components/Particles'
import {bookDetail} from '../../api/book/bookDetail'
import {addCart} from '../../api/cart/cart'
import {getUserInfo} from '../../api/Home/home'

export default {
  name: 'bookDetail',
  components: {NavBar, Particles},
  data () {
    return {
      details: {},
      seller: {},
      favoriteVisible: false,
      cancelFavoriteVisible: true,
      detailInfo: []
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    let id = 0
    if (this.$route.query.id === undefined) id = 7
    else id = this.$route.query.id
    const params = {'goodsId': id}
    bookDetail(params).then(res => {
      if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
      else {
        this.details = res.data
        console.log(res.data)
        let params1 = {'userId': res.data.userId}
        getUserInfo(params1).then(re => {
          this.detailInfo.push({title: '价格', content: res.data.goodsPrice + '￥'}, {title: '崭新度', content: res.data.newnessDegree + '成新'},
            {title: '上架时间', content: res.data.goodsDate.substring(0, 10)}, {title: '剩余数量', content: res.data.sellNum})
          this.seller['image'] = re.data.userImage
          this.seller['name'] = re.data.userName
          this.seller['id'] = re.data.userId
        })
      }
    })
  },
  methods: {
    getCategoryName (category) {
      if (category === 'textbook') return '课本'
      else if (category === 'teachingMaterials') return '教辅资料'
      else if (category === 'extracurricularBook') return '课外书'
      else if (category === 'rests') return '其他'
      else return '暂无'
    },
    favorite (status) {
      if (status === 0) {
        this.favoriteVisible = true
        this.cancelFavoriteVisible = false
        this.$forceUpdate()
      } else if (status === 1) {
        this.favoriteVisible = false
        this.cancelFavoriteVisible = true
        this.$forceUpdate()
      }
    },
    addCart () {
      let id
      id = this.$route.query.id
      const params = {'goodsId': id, 'count': 1}
      addCart(params).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.$message.success('添加成功！')
        }
      })
    },
    goToUserDetail (id) {
      this.$router.push(`/user?id=${id}`)
    },
    jump (name) {
      this.$router.push({
        name: name, params: {toUserId: this.seller.id}

      })
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

.book-user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
  z-index: 1000;
}
.book-desc span:nth-of-type(2){
  /*font-size: 14px;*/
  z-index: 1000;
}

.album-tabs-wrap {
  margin-top: -20px;
  z-index: 1000;
  width: 400px;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: none;
  z-index: 1000;
}
.router-link-active {
  text-decoration: none;
  color: teal;
}
</style>
