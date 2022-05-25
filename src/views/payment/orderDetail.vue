<template>
  <div>
    <div>
      <div>
        <div>
        </div>
        <div class="margin-style">
          <div style="border-color: gray;border-radius: 10px;border-style: solid" v-if="data[0].status === 1">
            <div style="padding: 20px">
              <el-tag type="danger" style="float: left;font-size: large">未收货</el-tag>
              <p>本网站不提供金钱交易功能，请买家与商家联系，明确线下交易信息哦！</p>
            </div>
          </div>
          <div style="border-color: gray;border-radius: 10px;border-style: solid" v-if="data[0].status === 2">
            <div style="padding: 20px">
              <el-tag type="success" style="float: left;font-size: large">已收货</el-tag>
              <p>买家已收货！请检查线下交易是否成功！</p>
            </div>
          </div>
          <div style="border-color: gray;border-radius: 10px;border-style: solid" v-if="data[0].status === 0">
            <div style="padding: 20px">
              <el-tag type="warning" style="float: left;font-size: large">已取消</el-tag>
              <p>订单已取消，祝您一切愉快！</p>
            </div>
          </div>
          <br />
          <el-divider><h4>收货地址</h4></el-divider>
          <el-table element-loading-text="正在为您拼命加载中..." :data="data" style="width: 100%"
                    :close-on-click-modal="false" :close-on-press-escape="false"
                    :header-cell-style="{background:'#f8f8f8',color:'#999'}">
            <el-table-column prop="campus" align="center" width="150" label="校区">
              <template slot-scope="scope">
                {{scope.row.campus}}
              </template>
            </el-table-column>
            <el-table-column prop="detail" label="详细地址" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.detail}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="收货人" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.phone}}</span>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-divider><h4>商品列表</h4></el-divider>
          <br />
          <el-table element-loading-text="正在为您拼命加载中..." :data="data" ref="multipleTable" style="width: 100%"
                    :close-on-click-modal="false" :close-on-press-escape="false"
                    :header-cell-style="{background:'#f8f8f8',color:'#999'}">
            <el-table-column prop="goodsImages" align="center" width="150" label="商品">
              <template slot-scope="scope">
                <img :src="scope.row.goodsImages[0]" class="shopImg" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" align="center">
              <template slot-scope="scope">
                <span class="shop">{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" align="center">
              <template slot-scope="scope">
                <span class="price">¥{{scope.row.goodsPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="数量" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.count}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="小计" align="center">
              <template slot-scope="scope">
                <span class="count">¥{{scope.row.totalPrice}}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-divider><h4>详细信息</h4></el-divider>
          <el-table element-loading-text="正在为您拼命加载中..." :data="data" ref="multipleTable" style="width: 100%"
                    :close-on-click-modal="false" :close-on-press-escape="false"
                    :header-cell-style="{background:'#f8f8f8',color:'#999'}">
            <el-table-column prop="orderId" align="center" label="订单编号">
              <template slot-scope="scope">
                <span class="shop">{{scope.row.orderId}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderDate" align="center" label="创建时间">
              <template slot-scope="scope">
                <span class="shop">{{scope.row.orderDate}}</span>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <br />
<!--        <el-button type="primary"> 联系卖家 </el-button>-->
<!--        <el-button type="primary"> 投诉卖家 </el-button>-->
        <br />

      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
import {getOrderDetail} from '../../api/order/order'

export default {
  name: 'orderDetail',
  components: {
    BreadCrumb
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    getOrderDetail({'orderId': this.$route.params.orderId}).then(res => {
      this.data.push(res.data)
      console.log(this.data)
    })
    // console.log('hello')
  }
}
</script>

<style scoped>

</style>
