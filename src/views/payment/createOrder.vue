<template>
  <div>
    <div>
      <div>
        <BreadCrumb></BreadCrumb>
      </div>
      <div>
      </div>
        <div class="margin-style">
          <br />
          <el-divider><h4>收货地址</h4></el-divider>
          <el-table element-loading-text="正在为您拼命加载中..." :data="addresses" style="width: 100%"
                    :close-on-click-modal="false" :close-on-press-escape="false"
                    :header-cell-style="{background:'#f8f8f8',color:'#999'}">
            <el-table-column prop="province" align="center" width="150" label="省份">
              <template slot-scope="scope">
                {{scope.row.province}}
              </template>
            </el-table-column>
            <el-table-column prop="city" align="center" label="城市">
              <template slot-scope="scope">
                <span class="shop">{{scope.row.city}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="county" label="县区" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.area}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="详细地址" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.address}}</span>
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
          <el-table element-loading-text="正在为您拼命加载中..." :data="items" ref="multipleTable" style="width: 100%"
                    :close-on-click-modal="false" :close-on-press-escape="false"
                    :header-cell-style="{background:'#f8f8f8',color:'#999'}">
            <el-table-column prop="shopImg" align="center" width="150" label="商品">
              <template slot-scope="scope">
                <img :src="scope.row.shopImg" class="shopImg" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="shop" align="center">
              <template slot-scope="scope">
                <span class="shop">{{scope.row.shop}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" align="center">
              <template slot-scope="scope">
                <span class="price">¥{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="数量" align="center">
              <template slot-scope="scope">
                <span class="price">{{scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="小计" align="center">
              <template slot-scope="scope">
                <span class="count">¥{{scope.row.goodTotal}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      <br />
      <div>
        <el-radio v-model="radio" label="1">
          <img src="../../assets/paymentIcon/zhifubao.png" width="30px"/>
          支付宝支付
        </el-radio>
        <el-radio v-model="radio" label="2">
          <img src="../../assets/paymentIcon/wechat.png" width="30px"/>
          微信支付
        </el-radio>
      </div>
      <br />
      <el-button type="primary" @click="jumpTo('/userHome/myOrder')"> 结 算 </el-button>

      </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import BreadCrumb from '../../components/BreadCrumb'
export default {
  name: 'createOrder',
  components: {
    NavBar,
    BreadCrumb
  },
  data () {
    return {
      radio: 0,
      items: [
        {
          title: 123,
          shopImg: 'http://t14.baidu.com/it/u=2189611985,885650841&fm=224&app=112&f=JPEG?w=500&h=500',
          shop: '高等数学蓝皮书 第三版 九成新',
          price: 12,
          number: 1,
          goodTotal: 12
        },
      ],
      addresses: [
        {
          province: '北京市',
          city: '北京市',
          area: '东城区',
          address: '曹安公路4800号',
          name: '梁xy',
          phone: '18868629263'
        }
      ]
    }
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.replace({path: path})
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
