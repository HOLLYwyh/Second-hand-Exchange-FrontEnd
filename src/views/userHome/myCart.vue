<template>
  <div>
    <div class="margin-style" style="margin-left:100px;margin-right: 100px" v-if="this.$route.path==='/userHome/myChart'">
      <bread-crumb></bread-crumb>
      <div>
        <el-table element-loading-text="正在为您拼命加载中..." :data="items" ref="multipleTable" style="width: 100%"
                  @selection-change="handleCheckedChange" :close-on-click-modal="false" :close-on-press-escape="false"
                  :header-cell-style="{background:'#f8f8f8',color:'#999'}">
          <el-table-column type="selection" width="75" align="center" />
          <el-table-column prop="shopImg" align="center" width="150" label="商品">
            <template slot-scope="scope">
              <img :src="scope.row.image" class="shopImg" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" align="center">
            <template slot-scope="scope">
              <span class="shop">{{scope.row.goodsName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodsPrice" label="单价" align="center">
            <template slot-scope="scope">
              <span class="price">¥{{scope.row.goodsPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="数量" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.count" oninput="value=value.replace(/[^\d]/g,'')" autocomplete="off" style="width:140px" size="mini"
                        @change="handleInput(scope.row)">
                <el-button size="mini" slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
                <el-button slot="append" size="mini"  @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="小计" align="center">
            <template slot-scope="scope">
              <span class="count">¥{{scope.row.totalPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-divider>总价 : {{price}}</el-divider>
        <div style="margin-top: 30px">
          <el-button @click="submitCart" type="primary">结算</el-button>
        </div>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
import {getCart} from '../../api/cart/cart'

export default {
  name: 'myChart',
  components: {
    BreadCrumb
  },
  data () {
    return {
      multipleSelection: [],
      items: [],
      price: 0,
      checkItem: []
    }
  },
  methods: {
    createOder () {
      localStorage.setItem('orderGoodList', JSON.stringify(this.multipleSelection))
      this.$router.push('/createOrder')
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数组中指定的元素
        this.items.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 数量变化触发
    handleInput (value) {
      if (value.count == null || value.count === '' || value.count === 0) {
        value.count = 1
      }
      value.totalPrice = (value.count * value.price).toFixed(2)// 保留两位小数
      // 增加商品数量也需要重新计算商品总价
      this.handleCheckedChange(this.multipleSelection)
    },
    add (addGood) {
      // 输入框输入值变化时会变为字符串格式返回到js
      // 此处要用v-model，实现双向数据绑定
      if (typeof addGood.count === 'string') {
        addGood.count = parseInt(addGood.count)
      }
      if (addGood.count < addGood.sellNum) {
        addGood.count += 1
        addGood.totalPrice = (addGood.count * addGood.goodsPrice).toFixed(2)// 保留两位小数
        this.handleCheckedChange(this.multipleSelection)
      }
    },
    del (delGood) {
      if (typeof delGood.count === 'string') {
        delGood.count = parseInt(delGood.count)
      };
      if (delGood.count > 1) {
        delGood.count -= 1
        delGood.totalPrice = (delGood.count * delGood.goodsPrice).toFixed(2)// 保留两位小数
        this.handleCheckedChange(this.multipleSelection)
      }
    },
    handleCheckedChange (selection) {
      console.log(selection)
      this.multipleSelection = selection
      this.price = 0
      // 此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        // 判断返回的值是否是字符串
        if (typeof selection[i].totalPrice === 'string') {
          selection[i].totalPrice = parseInt(selection[i].totalPrice)
        }
        this.price += selection[i].totalPrice
      }
    },
    submitCart () {
      this.createOder()
    }
  },
  mounted () {
    getCart().then(res => {
      this.items = res.data
      console.log(this.items)
    })
  }
}
</script>

<style scoped>
</style>
