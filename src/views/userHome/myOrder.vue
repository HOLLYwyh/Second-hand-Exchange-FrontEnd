<template>
  <div >
    <bread-crumb></bread-crumb>
    <div v-if="$route.path === '/userHome/myOrder'">
      <div class="margin-style">
        <h3>我的订单</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有订单" name="all">

            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.orderDate}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <div v-if="item.status === 1" style="float: left;padding: 10px"><el-tag type="danger" style="font-size:large ">未收货</el-tag></div>
                    <div v-else-if="item.status === 2" style="float: left;padding: 10px"><el-tag type="success" style="font-size:large ">已收货</el-tag></div>
                    <div v-else-if="item.status === 0" style="float: left;padding: 10px"><el-tag type="warning" style="font-size:large ">已取消</el-tag></div>

                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img :src="item.goodsImages[0]" style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.goodsName}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style" type="primary" @click="detail(item)">查看订单详情</el-button>
                        </el-row>
                        <div v-if="item.status===1">
                          <el-row>
                            <el-button class="button-style" type="primary" @click="cancel(item)">取消订单</el-button>
                          </el-row>
                          <el-row>
                            <el-button class="button-style" type="primary" @click="receive(item)">确认收货</el-button>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未收货订单" name="hasntConfirm">
            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid" v-if="item.status ===1">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.orderDate}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <div v-if="item.status === 1" style="float: left;padding: 10px"><el-tag type="danger" style="font-size:large ">未收货</el-tag></div>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img :src="item.goodsImages[0]" style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.goodsName}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style" type="primary" @click="detail(item)">查看订单详情</el-button>
                        </el-row>
                        <el-row>
                          <el-button class="button-style" type="primary" @click="cancel(item)">取消订单</el-button>
                        </el-row>
                        <el-row>
                          <el-button class="button-style" type="primary" @click="receive(item)">确认收货</el-button>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>

            </div>

          </el-tab-pane>
          <el-tab-pane label="已收货订单" name="hasntPayed">

            <div v-for="(item,index) in orderList" :key="index" style="margin-bottom: 20px">
              <div style="border-color: gray;border-radius: 10px;border-style: solid" v-if="item.status ===2">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.orderDate}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <div v-if="item.status === 1" style="float: left;padding: 10px"><el-tag type="danger" style="font-size:large ">未收货</el-tag></div>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img :src="item.goodsImages[0]" style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.goodsName}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style" type="primary" @click="detail(item)">查看订单详情</el-button>
                        </el-row>
                        <el-row>
                          <el-button class="button-style" type="primary">发起退款</el-button>
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
              <div style="border-color: gray;border-radius: 10px;border-style: solid" v-if="item.status ===0">
                <el-row class="order-header">
                  <el-col :span="8">
                    <p style="font-size: x-small">订单时间</p>
                    <p style="font-size: x-small">{{item.orderDate}}</p>
                  </el-col>
                  <el-col :span="8">
                    <p style="font-size: x-small">总价</p>
                    <p style="font-size: x-small">{{item.totalPrice}}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row style="margin-left: 20px;">
                    <div v-if="item.status === 1" style="float: left;padding: 10px"><el-tag type="danger" style="font-size:large ">未收货</el-tag></div>
                  </el-row>
                  <el-row>
                    <el-col :span="19" style="float: left;">
                      <div style="margin-left: 20px;margin-bottom: 20px">
                        <el-row>
                          <el-col :span="4" style="background-color: #252F3F">
                            <img :src="item.goodsImages[0]" style="width: 100%">
                          </el-col>
                          <el-col :span="20">
                            <el-button type="text" style="margin:50px 20px 20px 20px;float: left">{{item.goodsName}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="4" style="float: left;">
                      <div style="margin-bottom: 20px;margin-top:20px">
                        <el-row>
                          <el-button class="button-style" type="primary" @click="detail(item)">查看订单详情</el-button>
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
    <div><router-view></router-view></div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import BreadCrumb from '../../components/BreadCrumb'
import {cancelOrder, myOrder, receiveOrder} from '../../api/order/order'
export default {
  name: 'myOrder',
  components: {
    NavBar,
    BreadCrumb
  },
  data () {
    return {
      activeName: 'all',
      orderList: []
    }
  },
  methods: {
    handleClick () {
      // 请求
    },
    receive (item) {
      console.log(item.orderId)
      receiveOrder({'orderId': item.orderId}).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.$message.success('收货成功！')
          item.status = 2
        }
      })
    },
    cancel (item) {
      cancelOrder({'orderId': item.orderId}).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          this.$message.success('取消成功！')
          item.status = 0
        }
      })
    },
    detail (item) {
      this.$router.push({
        name: 'orderDetail',
        params: {'orderId': item.orderId}
      })
    }
  },
  mounted () {
    myOrder().then(res => {
      this.orderList = res.data
      console.log(this.orderList)
    })
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
