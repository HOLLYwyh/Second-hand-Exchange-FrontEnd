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
        <el-divider><h4>订单列表</h4></el-divider>
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

          <el-table-column prop="status" label="订单状态" align="center">
            <template slot-scope="scope">
              <span>
                <div v-if="scope.row.status === 0"><el-tag type="danger">库存不足无法下单</el-tag></div>
                <div v-else><el-tag type="success">创建成功</el-tag></div>

              </span>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <br />

    </div>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'

export default {
  name: 'createOrderResult',
  components: {
    BreadCrumb
  },
  data () {
    return {
      items: []
    }
  },
  methods: {

  },
  mounted () {
    this.items = JSON.parse(localStorage.getItem('ordersSccessList'))
    for (var i = 0; i < this.items.length; i++) {
      this.price += this.items[i].totalPrice
    }
  }
}
</script>

<style scoped>

</style>
