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
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Particles from '../../components/Particles'
import {addCart} from '../../api/cart/cart'
import {getUserInfo} from '../../api/Home/home'

export default {
  name: 'user',
  components: {NavBar, Particles},
  data () {
    return {
      seller: {}
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
      console.log(res.data)
    })
  },
  methods: {
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
