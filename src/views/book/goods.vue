<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="getCategoryImage(goods.category)" alt="商品种类图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              {{getCategoryName(goods.category)}}
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{getCategoryIntroduction(goods.category)}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--商品信息-->
        <!--没有书籍-->
        <div class="searchBar">
          <el-empty v-if="bookList.length === 0" description="暂时没有对应类型的书籍"></el-empty>
        </div>
        <!--有书籍-->
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
                        <li style="margin-top: 5px;font-weight: bolder;color: red;font-size: 18px">￥ {{item.goodsPrice}}</li>
                        <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.newnessDegree<10">{{item.newnessDegree}}成新</li>
                        <li style="margin-top: 10px;font-weight: bolder;color: #6A5ACD" v-if="item.newnessDegree===10">全新</li>
                        <li style="text-align: center;margin-top: 30px">剩余：{{item.sellNum}}</li>
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
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Particles from '../../components/Particles'
import { getBookAPI } from '../../api/Home/home'

export default {
  name: 'goods',
  components: {NavBar, Particles},
  data () {
    return {
      goods: {},
      bookList: [],
      goodsImages: ['https://complex-anjt.oss-cn-shanghai.aliyuncs.com/goodsImage7_1.jpg', 'https://complex-anjt.oss-cn-shanghai.aliyuncs.com/goodsImage12_1.jpg', 'https://complex-anjt.oss-cn-shanghai.aliyuncs.com/goodsImage17_1.jpg', 'https://complex-anjt.oss-cn-shanghai.aliyuncs.com/goodsImage22_1.jpg'],
      goodsIntroduction: ['课本，通俗的说就是在学校使用的书籍，也叫“教材”或“教科书”。它是教师教育学生的蓝本，也是师生进行教学互动必不可缺少的工具。它能提供丰富的阅读材料，营造自主学习的情境，促进学习方式的改变。主要体现在教学过程中，学生通过课本能够学习系统的知识，能够培养美好的情感，能够陶冶美丽的情操，让学生在学好本领的同时树立正确的、科学的价值观、人生观和世界观。',
        '辅导书是辅助和指导学习的书籍，主要针对学生、学员等需要帮助和指导的人员。',
        '课外指上课以外的时间，课外书是指除了课内课本以外的书，看课外书更多的获得的是理论性的知识。',
        '其他书籍类型，包括 工具书、参考资料等类型']
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    let category = ''
    if (this.$route.query.category === undefined) category = 'textbook'
    else category = this.$route.query.category
    const categoryParams = { 'goodsCategory': category, 'pageSize': 1600 }
    getBookAPI(categoryParams).then(res => {
      if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
      else {
        this.goods['category'] = res.data[0].goodsCategory
        this.bookList = res.data[0].bookList
        this.$forceUpdate()
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
    getCategoryImage (category) {
      if (category === 'textbook') return this.goodsImages[0]
      else if (category === 'teachingMaterials') return this.goodsImages[1]
      else if (category === 'extracurricularBook') return this.goodsImages[2]
      else if (category === 'rests') return this.goodsImages[3]
      else return ''
    },
    getCategoryIntroduction (category) {
      if (category === 'textbook') return this.goodsIntroduction[0]
      else if (category === 'teachingMaterials') return this.goodsIntroduction[1]
      else if (category === 'extracurricularBook') return this.goodsIntroduction[2]
      else if (category === 'rests') return this.goodsIntroduction[3]
      else return ''
    },
    goToCategory (category) {
      this.$router.push('goods?category=' + category)
    },
    goToBook (goodsId) {
      this.$router.push(`/bookDetail?id=${goodsId}`)
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
  /*font-size: 14px;*/
  z-index: 1000;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: none;
  z-index: 1000;
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
  height: 270px;
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
</style>
