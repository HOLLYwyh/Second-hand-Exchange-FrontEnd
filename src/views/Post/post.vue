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
          <el-dialog title="发布帖子" :visible.sync="dialogVisible" width="30%" style="z-index: 2000">
            <span>请填写如下内容：</span>
            <span slot="footer" class="dialog-footer">
              <div>
                <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.postName" clearable></el-input>
                </el-form-item>
                <el-form-item label="期望价格">
                  <el-input v-model="formData.postPrice" clearable></el-input>
                </el-form-item>
                <el-form-item label="帖子简介">
                  <el-input v-model="formData.postIntroduction" clearable type="textarea" :rows="2"></el-input>
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
                <el-button @click="cancelCreatePost" style="margin-top: 100px;margin-left: -200px">取 消</el-button>
                <el-button type="primary" @click="confirmCreatePost">确 定</el-button>
              </div>
          </span>
          </el-dialog>
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
                        <div class="book-title">{{item.postName}}</div>
                        <div style="display: flex">
                          <img :src="item.postImages" alt="这是一张图片" class="book-img">
                          <ul class="goods-info">
                            <li style="margin-top: 5px;font-weight: bolder;color: red;font-size: 18px">￥ {{item.postPrice}}</li>
                            <li style="margin-top: 5px;font-weight: bolder;color: #6A5ACD">{{item.postDate.substring(0, 10)}}</li>
                            <li style="text-align: center;margin-top: 10px">{{item.postIntroduction}}</li>
                          </ul>
                        </div>
                        <div style="display: flex;margin-top: 10px;margin-left: 30px">
                          <img  style="width: 50px;height: 50px" :src="item.userImage" @click="goToUserDetail(item.userId)">
                          <div style="margin-left: 10px" @click="goToUserDetail(item.userId)">
                            <div style="font-style:oblique">求物者</div>
                            <div style="margin-top: 10px;font-style:oblique">{{item.userName}}</div>
                          </div>
                          <el-button type="primary" style="margin-left: 50px" v-if="myId !== item.userId" @click="jump(item.userId)">联系TA</el-button>
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
              <el-empty v-if="myPostList.length === 0" description="您暂时没有求物贴"></el-empty>
            </div>
            <!--有帖子-->
            <div v-if="myPostList.length > 0" class="searchBar">
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in myPostList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px">
                      <el-card class="card">
                        <div class="book-title">{{item.postName}}</div>
                        <div style="display: flex">
                          <img :src="item.postImages" alt="这是一张图片" class="book-img">
                          <ul class="goods-info">
                            <li style="margin-top: 5px;font-weight: bolder;color: red;font-size: 18px">￥ {{item.postPrice}}</li>
                            <li style="margin-top: 5px;font-weight: bolder;color: #6A5ACD">{{item.postDate.substring(0, 10)}}</li>
                            <li style="text-align: center;margin-top: 10px">{{item.postIntroduction}}</li>
                          </ul>
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
import {allPostAPI, myPostAPI, addPostAPI} from '../../api/post/postApi'
import {getUserInfo} from '../../api/Home/home'

export default {
  name: 'post',
  components: {NavBar, Particles},
  data () {
    return {
      postList: [],
      myPostList: [],
      introduction: '每一位同学都可以在此处发布求物贴，也可以查看其他同学的求物信息。如果愿意出闲置物品的同学欢迎查看对应的帖子和贴主聊天，购买物品。',
      activeName: 'first',
      dialogVisible: false,
      labelPosition: 'right',
      formData: {postName: '', postPrice: '', postIntroduction: ''},
      fileList: [],
      myId: 6
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    const param = { pageNumber: 0, pageSize: 1600 }
    allPostAPI(param).then(res => {
      console.log(res.data)
      this.postList = res.data
      for (let i = 0; i < this.postList.length; i++) {
        const userParam = {'userId': res.data[i].userId}
        getUserInfo(userParam).then(re => {
          this.postList[i]['userImage'] = re.data.userImage
          this.postList[i]['userName'] = re.data.userName
          this.$forceUpdate()
        })
      }
    })
    myPostAPI().then(res => {
      this.myPostList = res.data
      if (res.data.length > 0) this.myId = res.data[0].userId
    })
  },
  methods: {
    createPost () {
      this.dialogVisible = true
    },
    confirmCreatePost () {
      this.dialogVisible = false
      let formData = new FormData()
      formData.append('formData', new Blob([JSON.stringify(this.formData)], {type: 'application/json'}))
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('files', this.fileList[i].raw)
      }
      addPostAPI(formData).then(res => {
        console.log(res)
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
    cancelCreatePost () {
      this.fileList = []
      this.formData.name = ''
      this.formData.price = ''
      this.formData.introduction = ''
      this.dialogVisible = false
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
  width: 130px;
  height: 150px;
}
.goods-info {
  margin-left: -15px;
  list-style:none;
}
</style>
