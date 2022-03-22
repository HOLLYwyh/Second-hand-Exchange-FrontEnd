<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="bookInfo.url" alt="">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">{{bookType}}</div>{{bookInfo.name}}
              <div class="el-icon-star-on" v-show="favoriteVisible"></div>
              <div class="el-icon-star-off" v-show="cancelFavoriteVisible"></div>
              <img src="../../assets/detailIcon/ContactService.png" alt="联系客服" style="width: 30px;height: 30px">
            </div>
            <div class="book-user-info">
              <div class="book-create-time">
                <span>共{{comments.length}}条评论</span>
              </div>
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent">
                <div style="color: #6A5ACD">商品简介</div>
                <div>{{bookInfo.introduction.slice(0,140)}}...</div>
              </el-card>
            </div>
          </div>
        </div>
        <div style="margin-top: 20px;display: flex;justify-content: center">
          <el-button class="fa fa-solid fa-cart-shopping" type="success"></el-button>
          <el-button type="primary">立即购买</el-button>
        </div>
        <!--商品信息-->
        <div class="album-tabs-wrap">
          <el-tabs>
            <el-tab-pane label="信息列表">
              <div class="table">
                <el-table :data="detailInfo" infinite-scroll-delay=500 infinite-scroll-disabled="noMore" stripe>
                  <el-table-column prop="index"></el-table-column>
                  <el-table-column prop="title" label="词条"></el-table-column>
                  <el-table-column prop="content" label="信息"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'

export default {
  name: 'bookDetail',
  components: {NavBar},
  data () {
    return {
      // TODO:此处可能需要再次修改
      bookType: '课本',
      favoriteVisible: false,
      cancelFavoriteVisible: true,
      bookInfo: {name: '算法导论', introduction: '计算机相关专业必读书籍，坐标嘉定校区，八成新', url: require('@/assets/temp/temp1.jpg')},
      detailInfo: [{index: 1, title: '提供者', content: '1953608'}, {index: 2, title: '价格', content: '50￥'}, {index: 3, title: '联系方式', content: '19821229038'}],
      comments: []
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
}

.book-top-card {
  display: flex;
}

.book-img-wrap {
  width: 200px;
  height: 200px;
}

.book-img-wrap img {
  width: 100%;
  height: 100%;
}

.book-info {
  padding: 0 20px;
  flex: 1;
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
}

.book-name {
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.book-user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.book-desc span:nth-of-type(2){
  /*font-size: 14px;*/
}

.album-tabs-wrap {
  margin-top: 20px;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: none;
}
</style>
