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
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
              <div v-for="(item, index) in list1" :key="index" style="width: 25%">
                <div style="margin-top: 20px">
                  <el-card class="card">
                    <div class="book-title">{{item.name}}</div>
                    <img :src="item.img" alt="这是一张图片" class="book-img">
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
            <!--底部分页栏-->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="8" :total=list2.length v-if="list2.length>8"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课外阅读" name="third">
          <div class="tab">
            <!--底部分页栏-->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="8" :total=list3.length v-if="list3.length>8"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他" name="fourth">
          <div class="tab">
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

export default {
  name: 'SearchResult',
  components: {NavBar},
  data () {
    return {
      activeName: 'first',
      searchInfo: '***',
      // TODO:和后端协同交流之后再确定具体细节，此为临时Demo
      // 搜索结果(临时)
      list1: [{img: require('@/assets/temp/temp1.jpg'), name: '算法导论', introduction: ''}, {img: require('@/assets/temp/temp2.jpg'), name: '操作系统概念', introduction: ''}, {img: require('@/assets/temp/temp3.jpg'), name: '计算机网络', introduction: ''},
        {img: require('@/assets/temp/temp4.jpg'), name: '离散数学', introduction: ''}],
      list2: [],
      list3: [],
      list4: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
  margin-top: 20px;
}
</style>
