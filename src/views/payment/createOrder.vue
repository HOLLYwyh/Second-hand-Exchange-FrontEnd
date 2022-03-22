<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <div class="margin-style">
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
      items: [
        {
          title: 123,
          shopImg: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg',
          shop: 'jhdjkahdkjahdkadk',
          price: 123,
          number: 12,
          goodTotal: 0
        },
        {
          title: 123,
          shopImg: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg',
          shop: 'jhdjkahdkjahdkadk',
          price: 123,
          number: 12,
          goodTotal: 0
        },
        {
          title: 123,
          shopImg: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg',
          shop: 'jhdjkahdkjahdkadk',
          price: 123,
          number: 12,
          goodTotal: 0
        },
        {
          title: 123,
          shopImg: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg',
          shop: 'jhdjkahdkjahdkadk',
          price: 123,
          number: 12,
          goodTotal: 0
        },
        {
          title: 123,
          shopImg: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1606288963.72951431.jpg',
          shop: 'jhdjkahdkjahdkadk',
          price: 123,
          number: 12,
          goodTotal: 0
        }
      ],
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
