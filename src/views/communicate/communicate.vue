<template>
  <div>
    <!--导航栏-->
    <div>
      <nav-bar-without-router-view></nav-bar-without-router-view>
    </div>
    <div>

    </div>
    <!--聊天框-->
    <div style="height: 580px;border:3px solid dimgray;border-radius:5px 5px 5px 5px;display: flex;">
      <!--左边信息框-->
      <div style="width: 5%;margin: 10px">
        <el-row v-for="(item,index) in userList" :key = index>
          <div :span="2" style="border-width: thin;border-color: #252F3F;border-style: solid;border-radius: 10px;cursor:pointer" @click="jump(item.userId)">
            <img :src="item.userImage" style="width: 40px;height: 40px;border-radius: 10px;margin: 10px;"/>
            <p style="font-size: xx-small">{{item.userName}}</p>
          </div>
        </el-row>
      </div>
      <div style="background-color: wheat;height: 580px;width: 15%;border-right: solid #2e0f6d">
        <div class="title" style="font-size: small">卖家：{{seller.userName}}</div>
        <div style="margin-top: 20px">
          <img style="height: 100px;width: 100px" :src="seller.userImage" alt="卖家头像"/>
          <div style="margin-top: 30px">
            <div style="text-align: center;font-weight: bolder;font-size: small">卖家基本信息</div>
            <ul>
              <li style="margin-top: 10px;font-size: small">所在校区: 嘉定校区</li>
              <li style="margin-top: 10px;font-size: small;white-space: normal;word-break:break-all;word-wrap:break-word">联系方式: {{seller.userEmail}}</li>
            </ul>
          </div>
        </div>
      </div>
      <!--右边聊天框-->
      <div style="width: 75%;">
        <div style="height: 500px;overflow-y:auto">
          <el-row v-for="(item,index) in msgs" :key="index">
            <div v-if="item.fromUserId == fromUserID" style="float: right;background: #9DC068;padding: 10px;margin: 10px;border-radius: 10px">{{item.msg}}</div>
            <div v-if="item.fromUserId == toUserID " style="float: left;background: #409eff;padding: 10px;margin: 10px;border-radius: 10px">{{item.msg}}</div>
          </el-row>
        </div>
        <div style="margin-top: 10px">
          <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="60" clearable style="width: 80%"></el-input>
          <el-button type="primary" style="height: 40px;" @click="send()">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import NavBarWithoutRouterView from '../../components/NavBarWithoutRouterView'
import {getUserInfo} from '../../api/Home/home'
export default {
  name: 'communicate',
  components: {
    NavBarWithoutRouterView
  },
  data () {
    // TODO：这里仅供参考，可能后续还需要修改
    return {
      seller: {},
      text: '',
      websoket: '',
      msgs: [],
      fromUserID: null,
      toUserID: null,
      userList: []
    }
  },
  methods: {
    async getSellerInfo () {
      let id = this.$route.params.toUserId
      const userParams = {'userId': id}
      await getUserInfo(userParams).then(res => {
        this.seller = res.data
      })
    },

    initWebSoket () {
      if ('WebSocket' in window) {
        this.webSocket = new WebSocket('ws://81.69.225.235:8081/websocket/' + this.$route.params.toUserId + '/' + sessionStorage.getItem('userID'))
        this.webSocket.onopen = function () {
          console.log('已经连通了websocket')
        }
        this.webSocket.onmessage = async (evt) => {
          var msg = evt.data
          var obj = []
          obj = JSON.parse(msg)
          console.log(obj)
          if (obj[0].type === 0) {
            // 获得历史消息
            console.log(this.userList)
            for (var i = 1; i < obj.length; i++) {
              this.userList.push(obj[i].user)
              if (obj[i].user.userId == this.toUserID || obj[i].user.userId == this.fromUserID) {
                this.msgs = obj[i].msg
                console.log(this.msgs)
              }
            }
            console.log(this.userList)
          } else {
            if (obj[1].msg.fromUserId == this.fromUserID && obj[1].msg.toUserId == this.toUserID) {
              this.msgs.push(obj[1].msg)
            } else if (obj[1].msg.fromUserId == this.toUserID && obj[1].msg.toUserId == this.fromUserID) {
              this.msgs.push(obj[1].msg)
            } else {
              var index = this.userList.find((item, index) => {
                return obj[1].msg.fromUserId == item.userId
              })
              console.log(index)
              if (index !== undefined) {
                this.$notify.info({
                  title: '您有一个新消息',
                  message: index.userName + '给您发送了新消息！'
                })
              } else {
                const userParams = {'userId': obj[1].msg.fromUserId}
                console.log(userParams)
                await getUserInfo(userParams).then(res => {
                  this.userList.push(res.data)
                  this.$notify.info({
                    title: '您有一个新消息',
                    message: res.data.userName + '给您发送了新消息！'
                  })
                })
              }
            }
          }
        }
        this.webSocket.onclose = function () {
          console.log('连接已关闭...')
        }
        this.webSocket.onerror = function (err) {
          console.log(err)
        }
      }
    },
    send () {
      var message = this.text
      this.webSocket.send(message)
      this.text = ''
    },
    jump (id) {
      if (id != this.toUserID) {
        this.$router.push({
          name: 'communicate', params: {toUserId: id}
        })
        location.reload()
      }
    }
  },
  mounted () {
    this.toUserID = this.$route.params.toUserId
    this.fromUserID = sessionStorage.getItem('userID')
    console.log("toUserId:"+this.toUserId)
    console.log("fromUserId:" +this.fromUserID)

    this.getSellerInfo()
    this.initWebSoket()
  }
}
</script>

<style scoped>
.title{
  font-size: 24px;
  font-weight: bolder;
  padding: 5px;
}
.my{

}
</style>
