<template>
<div>
  <el-row>
    <el-col :span="8" class="card-style" >
      <el-card class="card-content" @click.native="jumpTo('/userHome/myOrder')">
        <el-row>
          <el-col :span="9">
            <img src="../assets/usrHomeIcon/order.png" class="img-style" />
          </el-col>
          <el-col :span="15">
            <p><b>我买到的</b></p>
            <p style="font-size: small">追踪、退货、再次购买</p>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :span="8" class="card-style" >
      <el-card class="card-content" @click.native="jumpTo('/userHome/mySoldOrder')">
        <el-row>
          <el-col :span="9">
            <img src="../assets/usrHomeIcon/10.jpg" class="img-style" />
          </el-col>
          <el-col :span="15">
            <p><b>我卖出的</b></p>
            <p style="font-size: small">管理卖出的订单</p>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :span="8" class="card-style">
      <el-card class="card-content" @click.native="jumpTo('/userHome/mySecurity')">
        <el-row>
          <el-col :span="9">
            <img src="../assets/usrHomeIcon/security_1.png" class="img-style" />
          </el-col>
          <el-col :span="15">
            <p><b>登录和安全</b></p>
            <p style="font-size: small">编辑登录名、姓名和手机号码</p>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :span="8" class="card-style">
      <el-card class="card-content" @click.native="jumpTo('/userHome/myAddress')">
        <el-row>
          <el-col :span="9">
            <img src="../assets/usrHomeIcon/address.png" class="img-style" />
          </el-col>
          <el-col :span="15">
            <p><b>配送地址</b></p>
            <p style="font-size: small">添加、或编辑地址信息</p>
          </el-col>
        </el-row>
      </el-card>
    </el-col >
    <el-col :span="8" class="card-style">
      <el-card class="card-content" @click.native="jumpTo('/userHome/myChart')">
        <el-row>
          <el-col :span="9">
            <img src="../assets/usrHomeIcon/giftCard.png" class="img-style" />
          </el-col>
          <el-col :span="15">
            <p><b>我的购物车</b></p>
            <p style="font-size: small">添加、删除、支付购物车商品</p>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'UserInfoCard',
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.push({path: path})
    }
  }
}
</script>

<style scoped>
.card-style{
  margin-right: 10px;
  margin-bottom: 30px;
}
.card-style :hover{
  background-color: #fafafa;
  cursor: pointer;
}
.img-style{
  border-radius: 50%;
  width: 100%;
  float: left;
}
.card-content{
  margin-bottom: 10px;
  height: 160px;
}
</style>

<style>
</style>
