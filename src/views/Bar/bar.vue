<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="bar.barImages" alt="商品种类图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">讨论区</div>{{bar.barName}}
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD;font-weight: bolder">简介</div>
                <div>{{bar.barIntroduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: center;margin-left: 100px">
          <el-button type="primary" @click="createPost()">发布消息</el-button>
          <el-dialog title="发布消息" :visible.sync="dialogVisible" width="30%" style="z-index: 2000">
            <span slot="footer" class="dialog-footer">
              <div>
                <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="内容">
                  <el-input v-model="formData.content" clearable></el-input>
                </el-form-item>
              </el-form>
              </div>
              <div>
                <el-upload list-type="picture-card" action="" :on-preview="handlePreview" :on-remove="handleRemove" :on-change = "handleChange" :before-remove="beforeRemove"
                           multiple :limit="1" :auto-upload= "false" :file-list="fileList" style="margin-left: -100px" accept=".png,.jpg">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
              <div style="left: -100px">
                <el-button @click="cancelCreateForum"  style="margin-top: 100px;margin-left: -200px">取 消</el-button>
                <el-button type="primary" @click="confirmCreateForum">确 定</el-button>
              </div>
            </span>
          </el-dialog>
        </div>
        <!--讨论区没有帖子-->
        <div class="searchBar">
          <el-empty v-if="forumList.length === 0" description="暂时没有消息"></el-empty>
        </div>
        <!--有帖子-->
        <div v-if="forumList.length > 0" class="searchBar">
          <div>
            <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
              <div v-for="(item, index) in forumList" :key="index" style="width: 97%">
                <div style="margin-top: 20px">
                  <el-card class="card">
                    <div style="display: flex">
                      <!--楼层-->
                      <div>
                        <div style="color: grey;font-weight: bolder">{{index+1}}楼</div>
                      </div>
                      <!--用户信息-->
                      <div style="display: flex;margin-left: 30px">
                        <img  style="width: 115px;height: 115px" :src="item.userImage" @click="goToUserDetail(item.userId)" alt="这是一张图片">
                        <div style="margin-left: 10px" @click="goToUserDetail(item.userId)">
                          <div style="margin-top: 10px;font-style:oblique;font-weight: initial">{{item.userName}}</div>
                          <div style="font-weight: lighter;margin-top: 40px">{{getForumTime(item.forumDate)}}</div>
                        </div>
                      </div>
                      <!--发言内容-->
                      <div style="margin-left: 45px;margin-top: 25px;max-width: 400px">
                        <div style="font-weight: bolder;font-size: 22px">{{item.forumContent}}</div>
                      </div>
                      <!--消息图片-->
                      <div style="margin-left: 20px;display: flex">
                        <div v-for="(it, index) in item.forumImages" :key="index" style="width: 97%">
                          <img style="height: 140px;width: 140px" v-if="item.forumImages.length" :src="it" alt="这是一张图片"/>
                        </div>
                      </div>
                      <div style="right: 60px;position: absolute">
                        <el-button type="danger" v-if="item.userId === myId " @click="deleteVisible = true">删除</el-button>
                        <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
                          <span>您确定要删除这条消息吗</span>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="deleteVisible = false">取 消</el-button>
                            <el-button type="primary" @click="deleteMessage(item.forumId)">确 定</el-button>
                          </span>
                        </el-dialog>
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

import {getBarInfo, uploadForum, deleteForum} from '../../api/bar/barAPI'
import {getUserInfo} from '../../api/Home/home'

export default {
  name: 'bar',
  components: {NavBar, Particles},
  data () {
    return {
      barList: [],
      bar: {},
      deleteVisible: false,
      dialogVisible: false,
      labelPosition: 'right',
      id: 1,
      forumList: [],
      formData: {content: ''},
      fileList: [],
      myId: 6
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
    let id = 0
    if (this.$route.query.id === undefined) id = 1
    else id = this.$route.query.id
    this.id = id
    this.myId = parseInt(sessionStorage.getItem('userID'))
    let params = { 'barId': this.id, 'pageNumber': 0, 'pageSize': 10 }
    getBarInfo(params).then(res => {
      this.bar = res.data
      console.log(res)
      this.forumList = res.data.forumList
      for (let i = 0; i < this.forumList.length; i++) {
        const userParam = {'userId': this.forumList[i].userId}
        getUserInfo(userParam).then(re => {
          this.forumList[i]['userImage'] = re.data.userImage
          this.forumList[i]['userName'] = re.data.userName
          this.$forceUpdate()
        })
      }
    })
  },
  methods: {
    createPost () {
      this.dialogVisible = true
    },
    cancelCreateForum () {
      this.fileList = []
      this.formData.content = ''
      this.dialogVisible = false
    },
    confirmCreateForum () {
      this.dialogVisible = false
      let formData = new FormData()
      const param = {barId: parseInt(this.id), forumContent: this.formData.content}
      formData.append('formData', new Blob([JSON.stringify(param)], {type: 'application/json'}))
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('files', this.fileList[i].raw)
      }
      uploadForum(formData).then(res => {
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
        this.fileList = []
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
    getForumTime (time) {
      let hour = parseInt(time.substring(11, 13)) + 8
      let day = parseInt(time.substring(8, 11))
      if (hour >= 24) {
        hour -= 24
        day++
      }
      if (hour < 10) hour = '0' + hour
      if (day < 10) day = '0' + day
      return time.substring(0, 8) + day + '  ' + hour + time.substring(13, 19)
    },
    deleteMessage (id) {
      this.deleteVisible = false
      const param = {forumId: id}
      deleteForum(param).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        location.reload()
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
  width: 100%;
  height: 170px;
  margin-left: 20px
}
</style>
