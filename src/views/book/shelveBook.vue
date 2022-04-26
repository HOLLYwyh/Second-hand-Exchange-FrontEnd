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
                <div v-show="active === 0">
                  <div class="info-title">请填写商品的基本信息</div>
                  <el-form :label-position="labelPosition" label-width="80px">
                    <el-form-item label="商品名称">
                      <el-input v-model="formData.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                      <el-input v-model="formData.goodsPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                      <el-input v-model="formData.sellNum"></el-input>
                    </el-form-item>
                    <el-form-item label="商品种类">
                      <el-input v-model="formData.goodsCategory"></el-input>
                    </el-form-item>
                    <el-form-item label="商品简介">
                      <el-input v-model="formData.goodsIntroduction"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <!--步骤二-->
                <div v-show="active === 1">
                  <div class="info-title">请上传商品的相关图片</div>
                  <div>
                    <el-upload
                      class="upload-import"
                      action=""
                      ref="uploadImport"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-change = "handleChange"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="3"
                      :auto-upload= "false"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </div>
                </div>
                <!--步骤三-->
                <div v-show="active === 2">
                  <div class="info-title">信息确认</div>
                  <div style="display: flex;justify-content: center">
                    <div class="confirmSubmit">请确认是否是提交？</div>
                  </div>
                </div>
              </div>
              <!--提交按钮-->
              <div>
                <el-button v-show="active !== 0" @click="lastStep" class="button">上一步</el-button>
                <el-button v-show="active !== 2" @click="nextStep" class="button">下一步</el-button>
                <el-button v-show="active === 2" @click="submit" class="button" type="success">提交</el-button>
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
import {shelveBook} from '../../api/book/shelveBook'

export default {
  name: 'ShelveBook',
  components: {NavBar},
  props: {
    pk: {
      type: String,
      default: ''
    },
    fileUrl: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    objId: {
      type: String,
      default: ''
    },
    objType: {
      type: String,
      default: ''
    },
    isWatch: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    fileType: {
      type: Array,
      default: function () {
        return ['jpg', 'png', 'jpeg']
      }
    },
    showFile: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: 0,
      // 步骤一：商品信息
      labelPosition: 'right',
      formData: {
        goodsCategory: '',
        goodsName: '',
        goodsPrice: '',
        sellNum: '',
        goodsIntroduction: ''
      },
      // 步骤二：上传图片
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      pic: {}
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) this.$router.push('/')
  },
  methods: {
    nextStep () {
      this.active++
    },
    lastStep () {
      this.active--
    },
    submit () {
      let formData = new FormData()
      formData.append('formData', new Blob([JSON.stringify(this.formData)], {type: 'application/json'}))
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('files', this.fileList[i].raw)
      }
      console.log(formData.get('formData'))
      console.log(formData.get('files'))
      shelveBook(formData).then(res => {
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
    handleRemove () {
      this.fileList.pop()
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file) {
      console.log(file)
      this.fileList.push(file)
      console.log(this.fileList.length)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
</style>
