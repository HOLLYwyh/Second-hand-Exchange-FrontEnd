<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div class="searchInfo">
      {{this.searchInfo}} 搜索结果如下：
    </div>
    <!--搜索结果-->
    <!--没有结果-->
    <div class="searchBar">
      <el-empty v-if="bookList.length === 0" description="暂时未搜索到相关记录"></el-empty>
    </div>
    <!--有结果-->
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
                    <li style="text-decoration: line-through;margin-top: 5px;font-weight: bolder;color: gray">￥ {{item.originalPrice}}</li>
                    <li style="margin-top: 5px;font-weight: bolder;color: red;font-size: 18px">￥ {{item.goodsPrice}}</li>
                    <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.newnessDegree<10">{{item.newnessDegree}}成新</li>
                    <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.newnessDegree===10">全新</li>
                    <li style="text-align: center;margin-top: 30px" v-if="item.sellNum > 0">剩余：{{item.sellNum}}</li>
                    <li style="text-align: center;margin-top: 30px;color: red" v-if="item.sellNum === 0">已售罄</li>
                  </ul>
                </div>
                <div style="display: flex;margin-top: 10px;margin-left: 30px">
                  <img  style="width: 50px;height: 50px" :src="item.userImage" @click="goToUserDetail(item.userId)">
                  <div style="margin-left: 10px" @click="goToUserDetail(item.userId)">
                    <div style="font-style:oblique">提供者</div>
                    <div style="margin-top: 10px;font-style:oblique">{{item.userName}}</div>
                  </div>
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
</template>

<script>
import NavBar from '../../components/NavBar'
import {searchAPI} from '../../api/search/search'

export default {
  name: 'SearchResult',
  components: {NavBar},
  data () {
    return {
      activeName: 'first',
      searchInfo: '',
      bookList: []
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    else {
      if (this.$route.query.info === undefined) this.searchInfo = ''
      else this.searchInfo = this.$route.query.info
      let params = { 'searchInfo': this.searchInfo, 'pageNumber': 0, 'pageSize': 1600 }
      searchAPI(params).then(res => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          this.bookList.push(res.data[i])
        }
      })
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
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
    },
    goToUserDetail (id) {
      this.$router.push(`/user?id=${id}`)
    }
  }
}
</script>

<style scoped>
.searchInfo{
  margin-top: 100px;
  font-weight: bolder;
  text-align: center;
}
.searchBar{
  margin-top: 20px;
}
.card{
  width: 350px;
  height: 300px;
  margin-left: 20px
}
.book-title{
  font-weight: bolder;
}
.book-img{
  display: flex;
  flex-direction: column;
  margin-left: 80px;
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
