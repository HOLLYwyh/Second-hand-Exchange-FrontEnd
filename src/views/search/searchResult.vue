<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div class="searchInfo">
      {{this.searchInfo}} 搜索结果如下：
    </div>
    <!--搜索结果-->
    <div class="searchBar">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="课本" name="first">
          <div class="tab">
            <div>
              <div v-if="list1.length === 0" class="searchInfo">暂无搜索结果</div>
            </div>
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
              <div v-for="(item, index) in list1" :key="index" style="width: 25%">
                <div style="margin-top: 20px" @click="goToBook(item.goodsId)">
                  <el-card class="card">
                    <div class="book-title">{{item.goodsName}}</div>
                    <img :src="item.goodsImage" alt="这是一张图片" class="book-img">
                    <div>售价：￥ {{item.goodsPrice}}</div>
                    <div>剩余：{{item.sellNum}}</div>
                  </el-card>
                </div>
              </div>
            </div>
            </div>
            <!--底部分页栏-->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="8" :total=list1.length v-if="list1.length>8"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="教辅资料" name="second">
          <div class="tab">
            <div>
              <div v-if="list2.length === 0" class="searchInfo">暂无搜索结果</div>
            </div>
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                <div v-for="(item, index) in list2" :key="index" style="width: 25%">
                  <div style="margin-top: 20px" @click="goToBook(item.goodsId)">
                    <el-card class="card">
                      <div class="book-title">{{item.goodsName}}</div>
                      <img :src="item.goodsImage" alt="这是一张图片" class="book-img">
                      <div>售价：￥ {{item.goodsPrice}}</div>
                      <div>剩余：{{item.sellNum}}</div>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
            <!--底部分页栏-->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="8" :total=list2.length v-if="list2.length>8"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课外阅读" name="third">
          <div class="tab">
            <div>
              <div v-if="list3.length === 0" class="searchInfo">暂无搜索结果</div>
            </div>
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                <div v-for="(item, index) in list3" :key="index" style="width: 25%">
                  <div style="margin-top: 20px" @click="goToBook(item.goodsId)">
                    <el-card class="card">
                      <div class="book-title">{{item.goodsName}}</div>
                      <img :src="item.goodsImage" alt="这是一张图片" class="book-img">
                      <div>售价：￥ {{item.goodsPrice}}</div>
                      <div>剩余：{{item.sellNum}}</div>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
            <!--底部分页栏-->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="8" :total=list3.length v-if="list3.length>8"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他" name="fourth">
          <div class="tab">
            <div>
              <div v-if="list4.length === 0" class="searchInfo">暂无搜索结果</div>
            </div>
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                <div v-for="(item, index) in list4" :key="index" style="width: 25%">
                  <div style="margin-top: 20px" @click="goToBook(item.goodsId)">
                    <el-card class="card">
                      <div class="book-title">{{item.goodsName}}</div>
                      <img :src="item.goodsImage" alt="这是一张图片" class="book-img">
                      <div>售价：￥ {{item.goodsPrice}}</div>
                      <div>剩余：{{item.sellNum}}</div>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
            <!--底部分页栏-->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="8" :total=list4.length v-if="list4.length>8"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import {searchAPI} from '../../api/search/search'

// TODO: 搜索结果分页

export default {
  name: 'SearchResult',
  components: {NavBar},
  data () {
    return {
      activeName: 'first',
      searchInfo: '',
      list1: [],
      list2: [],
      list3: [],
      list4: []
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    else {
      if (this.$route.query.info === undefined) this.searchInfo = ''
      else this.searchInfo = this.$route.query.info
      let params = { 'searchInfo': this.searchInfo, 'goodsCategory': 'all', 'pageNumber': 0, 'pageSize': 4 }
      searchAPI(params).then(res => {
        console.log(res.data)
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          let max = -100
          this.list1 = res.data[0].bookList
          this.list2 = res.data[1].bookList
          this.list3 = res.data[2].bookList
          this.list4 = res.data[3].bookList
          max = Math.max(this.list1.length, this.list2.length, this.list3.length, this.list4.length)
          if (max === this.list1.length) this.activeName = 'first'
          else if (max === this.list2.length) this.activeName = 'second'
          else if (max === this.list3.length) this.activeName = 'third'
          else if (max === this.list4.length) this.activeName = 'fourth'
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
.tab{
  min-height: 450px
}
.pagination{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.card{
  height: 250px;
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
</style>
