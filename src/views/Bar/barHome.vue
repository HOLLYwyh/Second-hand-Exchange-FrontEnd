<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img src="../../assets/detailIcon/communicate.jpeg" alt="商品种类图片">
          </div>
          <div class="book-info">
            <div class="book-name">交流社区</div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD;font-weight: bolder">简介</div>
                <div>{{introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: center;margin-left: 100px">
          <el-button type="primary" @click="createPostBar()">创建讨论区</el-button>
          <el-dialog title="创建讨论区" :visible.sync="dialogVisible" width="30%" style="z-index: 2000">
            <span>请填写如下内容：</span>
            <span slot="footer" class="dialog-footer">
              <div>
                <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.barName" clearable></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-input v-model="formData.barCategory" clearable></el-input>
                </el-form-item>
                <el-form-item label="简介">
                  <el-input v-model="formData.barIntroduction" clearable type="textarea" :rows="2"></el-input>
                </el-form-item>
              </el-form>
              </div>
              <div>
                <el-upload list-type="picture-card" action="" :on-preview="handlePreview" :on-remove="handleRemove" :on-change = "handleChange" :before-remove="beforeRemove"
                           multiple :limit="5" :auto-upload= "false" :file-list="fileList" style="margin-left: -100px" accept=".png,.jpg">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
              <div style="left: -100px">
                <el-button @click="cancelCreatePostBar" style="margin-top: 100px;margin-left: -200px">取 消</el-button>
                <el-button type="primary" @click="confirmCreatePostBar">确 定</el-button>
              </div>
          </span>
          </el-dialog>
        </div>
        <!--帖子信息-->
        <el-tabs v-model="activeName">
          <el-tab-pane label="广场" name="first">
            <!--没有求物贴-->
            <div class="searchBar">
              <el-empty v-if="barList.length === 0" description="暂时没有讨论区"></el-empty>
            </div>
            <!--有帖子-->
            <div v-if="barList.length > 0" class="searchBar">
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in barList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px" @click="goToBarDetail(item.barId)">
                      <el-card class="card">
                        <div class="book-title">{{item.barName}}</div>
                        <div style="display: flex">
                          <img :src="item.postImages" alt="这是一张图片" class="book-img">
                          <ul class="goods-info">
                            <li style="margin-top: 5px;font-weight: bolder;color: #6A5ACD">{{item.barDate.substring(0,10)}}</li>
                            <li style="text-align: center;margin-top: 10px">{{item.barIntroduction}}</li>
                          </ul>
                        </div>
                        <div style="display: flex;margin-top: 10px;margin-left: 30px">
                          <img  style="width: 50px;height: 50px" :src="item.userImage" @click="goToUserDetail(item.userId)">
                          <div style="margin-left: 10px" @click="goToUserDetail(item.userId)">
                            <div style="font-style:oblique">创建者</div>
                            <div style="margin-top: 10px;font-style:oblique">{{item.userName}}</div>
                          </div>
                          <div style="margin-left: 70px;margin-top: 15px">
                            <div class="arrow-line-4">{{item.barCategory}}</div>
                          </div>
                        </div>
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
              <el-empty v-if="myBarList.length === 0" description="您暂时没有参加任何讨论区"></el-empty>
            </div>
            <!--有帖子-->
            <div v-if="myBarList.length > 0" class="searchBar">
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in myBarList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px" @click="goToBarDetail(item.barId)">
                      <el-card class="card">
                        <div class="book-title">{{item.barName}}</div>
                        <div style="display: flex">
                          <img :src="item.postImages" alt="这是一张图片" class="book-img">
                          <ul class="goods-info">
                            <li style="margin-top: 5px;font-weight: bolder;color: #6A5ACD">{{item.barDate.substring(0,10)}}</li>
                            <li style="text-align: center;margin-top: 10px">{{item.barIntroduction}}</li>
                          </ul>
                        </div>
                        <div style="display: flex;margin-top: 10px;margin-left: 30px">
                          <div style="margin-top: 15px">
                            <div class="arrow-line-4">{{item.barCategory}}</div>
  </div>
                        </div>
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
import {myBarAPI, allBarAPI, addBarAPI} from '../../api/bar/barAPI'
import {getUserInfo} from '../../api/Home/home'

export default {
  name: 'barHome',
  components: {NavBar, Particles},
  data () {
    return {
      barList: [],
      myBarList: [],
      introduction: '欢迎每一位同学在交流社区中建立讨论区或参与讨论，分享读书经验',
      labelPosition: 'right',
      activeName: 'first',
      formData: {barName: '', barCategory: '', barIntroduction: ''},
      fileList: [],
      dialogVisible: false,
      myId: 6
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    const param = { pageNumber: 0, pageSize: 1600 }
    allBarAPI(param).then(res => {
      console.log('广场讨论区')
      console.log(res.data)
      this.barList = res.data
      for (let i = 0; i < this.barList.length; i++) {
        const userParam = {'userId': res.data[i].userId}
        getUserInfo(userParam).then(re => {
          this.barList[i]['userImage'] = re.data.userImage
          this.barList[i]['userName'] = re.data.userName
          this.$forceUpdate()
        })
      }
    })
    myBarAPI().then(res => {
      console.log('我的讨论区')
      console.log(res.data)
      this.myBarList = res.data
      if (res.data.length > 0) this.myId = res.data[0].userId
    })
  },
  methods: {
    createPostBar () {
      this.dialogVisible = true
    },
    cancelCreatePostBar () {
      this.fileList = []
      this.formData.barName = ''
      this.formData.barCategory = ''
      this.formData.barIntroduction = ''
      this.dialogVisible = false
    },
    confirmCreatePostBar () {
      this.dialogVisible = false
      let formData = new FormData()
      formData.append('formData', new Blob([JSON.stringify(this.formData)], {type: 'application/json'}))
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('files', this.fileList[i].raw)
      }
      addBarAPI(formData).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          location.reload()
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('上传失败，请务必正确填写所有信息！！')
      })
    },
    handleRemove () {
      this.fileList.pop()
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType === 'jpg' || fileType === 'png') {
        this.fileList.push(file)
      } else {
        this.$message.error('请上传正确类型的文件')
      }
      console.log(this.fileList.length)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    goToUserDetail (id) {
      this.$router.push(`/user?id=${id}`)
    },
    goToBarDetail (id) {
      this.$router.push(`/bar?id=${id}`)
    },
    jump (userId) {
      this.$router.push({
        name: 'communicate', params: {toUserId: userId}

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
.book-title{
  font-weight: bolder;
}
.book-img{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  width: 150px;
  height: 150px;
}
.goods-info {
  margin-left: -15px;
  list-style:none;
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
