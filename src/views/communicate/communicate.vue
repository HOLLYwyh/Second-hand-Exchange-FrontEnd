<template>
  <div>
    <!--导航栏-->
    <div>
      <nav-bar-without-router-view></nav-bar-without-router-view>
    </div>
    <!--聊天框-->
    <div style="height: 580px;border:3px solid dimgray;border-radius:5px 5px 5px 5px;display: flex;">
      <!--左边信息框-->
      <div style="background-color: wheat;height: 580px;width: 20%;border-right: solid #2e0f6d">
        <div class="title">联系卖家：{{seller.name}}</div>
        <div style="margin-top: 20px">
          <img style="height: 100px;width: 100px" :src="seller.img" alt="卖家头像"/>
          <div style="margin-top: 30px">
            <div style="text-align: center;font-weight: bolder">卖家基本信息</div>
            <ul>
              <li style="margin-top: 10px">所在校区:{{seller.campus}}</li>
              <li style="margin-top: 10px">专业:{{seller.major}}</li>
              <li style="margin-top: 10px">年级:{{seller.grade}}</li>
              <li style="margin-top: 10px">联系方式:{{seller.phoneNumber}}</li>
            </ul>
          </div>
        </div>
      </div>
      <!--右边聊天框-->
      <div style="width: 75%">
        <div style="height: 535px"></div>
        <div style="display: flex">
          <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="60" clearable style="height: 100px;margin-left: 80px"></el-input>
          <el-button type="primary" style="height: 40px;">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarWithoutRouterView from '../../components/NavBarWithoutRouterView'
export default {
  name: 'communicate',
  components: {
    NavBarWithoutRouterView
  },
  data () {
    // TODO：这里仅供参考，可能后续还需要修改
    return {
      seller: {name: '1953608吴英豪', img: require('@/assets/temp/magic_shroom.png'), campus: '嘉定校区', major: '软件工程', grade: '大三', phoneNumber: '19821229038'},
      text: ''
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 24px;
  font-weight: bolder;
  padding: 5px;
}
</style>
