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
          <el-table element-loading-text="正在为您拼命加载中..." :data="items" ref="multipleTable" style="width: 100%"
                    :close-on-click-modal="false" :close-on-press-escape="false"
                    :header-cell-style="{background:'#f8f8f8',color:'#999'}">
            <el-table-column prop="image" align="center" width="150" label="商品">
              <template slot-scope="scope">
                <img :src="scope.row.image" class="shopImg" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="shop" align="center">
              <template slot-scope="scope">
                <span class="shop">{{scope.row.shop}}</span>
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

          <el-divider>总价 : {{price}} 元 </el-divider>
        </div>
      <br />
      <el-button type="primary" @click="createOrder()"> 结 算 </el-button>

      </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import BreadCrumb from '../../components/BreadCrumb'
import {addOrder} from '../../api/order/order'
export default {
  name: 'createOrder',
  components: {
    NavBar,
    BreadCrumb
  },
  data () {
    return {
      radio: 0,
      price: 0,
      items: [],
      addresses: []
    }
  },
  methods: {
    jumpTo (path) {
      // console.log(path)
      this.$router.replace({path: path})
    },
    createOrder () {
      // localStorage.removeItem('orderAddress')
      localStorage.removeItem('orderGoodList')
      var successList = this.items
      addOrder({'orderItemList': this.items}).then(res => {
        if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
        else {
          if (res.data.length !== 0) {
            for (var i = 0; i < res.data.length; i++) {
              var item = successList.find(item_ => item_.goodsId === res.data[i].goodsId)
              item.status = 0
              console.log(item)
            }
          }
          localStorage.setItem('ordersSccessList', JSON.stringify(successList))

          this.jumpTo('/createOrder/result')
        }
      })
    }
  },
  mounted () {
    this.addresses = []
    this.addresses.push(JSON.parse(localStorage.getItem('orderAddress')))
    this.items = JSON.parse(localStorage.getItem('orderGoodList'))
    for (var i = 0; i < this.items.length; i++) {
      this.price += this.items[i].totalPrice
    }
  }
}
</script>

<style scoped>

</style>
