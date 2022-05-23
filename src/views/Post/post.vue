<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img src="../../assets/detailIcon/xianzhi.jpg" alt="商品种类图片">
          </div>
          <div class="book-info">
            <div class="book-name">求物中心</div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD;font-weight: bolder">求物简介</div>
                <div>{{introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <div style="margin-top: -20px;display: flex;justify-content: center;margin-left: 100px">
          <el-button type="primary" @click="createPost()">发布帖子</el-button>
        </div>
        <!--帖子信息-->
        <el-tabs v-model="activeName">
          <el-tab-pane label="广场" name="first">
            <!--没有求物贴-->
            <div class="searchBar">
              <el-empty v-if="postList.length === 0" description="暂时没有求物贴"></el-empty>
            </div>
            <!--有帖子-->
            <div v-if="postList.length > 0" class="searchBar">
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in postList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px">
                      <el-card class="card">
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的" name="second">
            <!--没有求物贴-->
            <div class="searchBar">
              <el-empty v-if="myPostList.length === 0" description="您暂时没有求物贴"></el-empty>
            </div>
            <!--有帖子-->
            <div v-if="myPostList.length > 0" class="searchBar">
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in myPostList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px">
                      <el-card class="card">
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Particles from '../../components/Particles'

export default {
  name: 'post',
  components: {NavBar, Particles},
  data () {
    return {
      goods: {},
      postList: [],
      myPostList: [],
      introduction: '每一位同学都可以在此处发布求物贴，也可以查看其他同学的求物信息。如果愿意出闲置物品的同学欢迎查看对应的帖子和贴主聊天，购买物品。',
      activeName: 'second'
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
  },
  methods: {
    createPost () {
      console.log('发布帖子')
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
  /*max-width: 1300px;*/
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
  width: 350px;
  height: 270px;
  margin-left: 20px
}
</style>
