<template>
  <div >
    <bread-crumb></bread-crumb>
    <div>
      <div class="margin-style">
        <h3>我的订单</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有订单" name="all">

            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.createTime}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <h3 style="float: left">{{item.status}}</h3>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img src='../../assets/temp/temp1.jpg' style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.title}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style">查看订单详情</el-button>
                        </el-row>
                        <el-row>
                          <el-button class="button-style">发起退款</el-button>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="未收货订单" name="hasntConfirm">
            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.createTime}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <h3 style="float: left">{{item.status}}</h3>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img src='../../assets/temp/temp1.jpg' style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.title}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style">查看订单详情</el-button>
                        </el-row>
                        <el-row>
                          <el-button class="button-style">发起退款</el-button>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="已取消订单" name="hasCancled">

            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.createTime}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <h3 style="float: left">{{item.status}}</h3>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img src='../../assets/temp/temp1.jpg' style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.title}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style">查看订单详情</el-button>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="未支付订单" name="hasntPayed">

            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.createTime}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <h3 style="float: left">{{item.status}}</h3>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img src='../../assets/temp/temp1.jpg' style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.title}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style">支付订单</el-button>
                        </el-row>
                        <el-row>
                          <el-button class="button-style">取消订单</el-button>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
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
import BreadCrumb from '../../components/BreadCrumb'
export default {
  name: 'myOrder',
  components: {
    NavBar,
    BreadCrumb
  },
  data () {
    return {
      activeName: 'all',
      orderList: [{
        title: '算法导论 工业出版社版本',
        status: '取消',
        createTime: '2021.2.14',
        totalPrice: '$20'
      }
      ]
    }
  },
  methods: {
    handleClick () {
      // 请求
    }
  }
}
</script>

<style scoped>
.order-header{
  background-color: #f2f2f2;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

}

</style>
