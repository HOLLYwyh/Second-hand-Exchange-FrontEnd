<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div>
      <div class="title">上架商品</div>
      <div class="post-container">
        <div class="wrap">
          <div class="post-box">
            <div class="box-title">
              <i  class="category">书籍信息</i>
            </div>
            <!--顶部进度条-->
            <div class="box-body">
              <div class="progress-bar">
                <el-steps :active=active align-center>
                  <el-step title="步骤1" description="上传商品基本信息"></el-step>
                  <el-step title="步骤2" description="上传商品图片"></el-step>
                  <el-step title="步骤3" description="成功上传商品"></el-step>
                </el-steps>
              </div>
              <!--填写内容-->
              <div>
                <!--步骤一-->
                <div v-show="active === 1">
                  <div class="info-title">请填写商品的基本信息</div>
                  <div style="display: flex;justify-content: center">
                    <el-form ref="form" :model="bookInfo" label-width="80px" style="margin-top: 20px">
                      <el-form-item label="商品名称">
                        <el-input v-model="bookInfo.name"></el-input>
                      </el-form-item>
                      <el-form-item label="活动区域">
                        <el-select v-model="bookInfo.region" placeholder="请选择活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="活动时间">
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" v-model="bookInfo.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-time-picker placeholder="选择时间" v-model="bookInfo.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="即时配送">
                        <el-switch v-model="bookInfo.delivery"></el-switch>
                      </el-form-item>
                      <el-form-item label="活动性质">
                        <el-checkbox-group v-model="bookInfo.type">
                          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                          <el-checkbox label="地推活动" name="type"></el-checkbox>
                          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="特殊资源">
                        <el-radio-group v-model="bookInfo.resource">
                          <el-radio label="线上品牌商赞助"></el-radio>
                          <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <!--步骤二-->
                <div v-show="active === 2">
                  <div class="info-title">请上传商品的相关图片</div>
                  <div>
                    <div>
                      <div>请上传商品的主要图片</div>
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                    <div>
                      <div>请上传商品的说明图片</div>
                      <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </div>
                  </div>
                </div>
                <!--步骤三-->
                <div v-show="active === 3">
                  <div class="info-title">信息确认</div>
                  <div style="display: flex;justify-content: center">
                    <div class="confirmSubmit">请确认是否是提交？</div>
                  </div>
                </div>
              </div>
              <!--提交按钮-->
              <div>
                <el-button v-show="active !== 0" @click="lastStep" class="button">上一步</el-button>
                <el-button v-show="active !== 3" @click="nextStep" class="button">下一步</el-button>
                <el-button v-show="active === 3" @click="submit" class="button" type="success">提交</el-button>
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

export default {
  // TODO: 页面整体有点空，后续可以额外添加一些内容
  name: 'ShelveBook',
  components: {NavBar},
  data () {
    return {
      active: 0,
      // TODO:这里仅供参考，之后还有可能修改
      // 步骤一：用户信息
      userInfo: {
        userId: '',
        userName: '',
        userEmail: ''
      },
      // 步骤二：商品信息
      // TODO: 确定数据库之后再做进一步修改
      bookInfo: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 步骤三：上传图片
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    nextStep () {
      this.active++
    },
    lastStep () {
      this.active--
    },
    submit () {
      console.log('你好')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.title{
  margin-top: 120px;
  text-align: center;
  font-weight: bolder;
  font-size: 32px;
}
.post-container{
  margin: 2.5rem;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
}
.wrap{
  z-index: 100;
  width:90%
}
.post-box{
  display:block;
  background-color: #fff;
}
.box-title{
  height: 0.2rem;
  background-image: linear-gradient(to right, #0071ae , #5db143);
  margin:0;
}
.category{
  float:left;
  display: inline-block;
  position: relative;
  background-color: #0071ae;
  color: white;
  transition: color 0.2s;
  padding: .4rem 2rem 0.5rem
}

.box-body{
  padding: 1px 0;
  height: 700px;
  background-color: whitesmoke;
}

.progress-bar{
  margin-top: 50px;
}
.info-title{
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
}
.form-item{
  width: 500px;
  margin-top: 20px;
}
.button{
  margin-top: 50px;
}
.confirmSubmit{
  text-align: center;
  margin-top: 50px;
  font-size: 24px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
