<template>
  <div>
    <el-table element-loading-text="正在为您拼命加载中..." :data="items" ref="multipleTable" style="width: 100%"
              @selection-change="handleCheckedChange" :close-on-click-modal="false" :close-on-press-escape="false"
              :header-cell-style="{background:'#f8f8f8',color:'#999'}">
      <el-table-column type="selection" width="75" align="center" />
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
          <el-input v-model.number="scope.row.number" oninput="value=value.replace(/[^\d]/g,'')" autocomplete="off" style="width:140px" size="mini"
                    @change="handleInput(scope.row)">
            <el-button size="mini" slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
            <el-button slot="append" size="mini" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="小计" align="center">
        <template slot-scope="scope">
          <span class="count">¥{{scope.row.goodTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 30px">
      <el-button @click="submitCart" type="primary">结算</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCart',
  data () {
    return {
      checkItem: [],
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
      multipleSelection: []

    }
  },
  methods: {
    // 删除单个商品
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
      console.log(value)
      if (value.number == null || value.number === '' || value.number === 0) {
        value.number = 1
      }
      value.goodTotal = (value.number * value.price).toFixed(2)// 保留两位小数
      // 增加商品数量也需要重新计算商品总价
      this.handleCheckedChange(this.multipleSelection)
    },
    add (addGood) {
      // 输入框输入值变化时会变为字符串格式返回到js
      // 此处要用v-model，实现双向数据绑定
      if (typeof addGood.number === 'string') {
        addGood.number = parseInt(addGood.number)
      };
      addGood.number += 1
      addGood.goodTotal = (addGood.number * addGood.price).toFixed(2)// 保留两位小数
      this.handleCheckedChange(this.multipleSelection)
    },
    del (delGood) {
      if (typeof delGood.number === 'string') {
        delGood.number = parseInt(delGood.number)
      };
      if (delGood.number > 1) {
        delGood.number -= 1
        delGood.goodTotal = (delGood.number * delGood.price).toFixed(2)// 保留两位小数
        this.handleCheckedChange(this.multipleSelection)
      }
    },
    handleCheckedChange (selection) {
      this.multipleSelection = selection
      this.totalPrice = 0
      // 此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        // 判断返回的值是否是字符串
        if (typeof selection[i].goodTotal === 'string') {
          selection[i].goodTotal = parseInt(selection[i].goodTotal)
        };
        this.totalPrice += selection[i].goodTotal
      }
    },
    submitCart () {
      this.$emit('createOrder', this.multipleSelection)
    }
  }
}
</script>

<style scoped>

</style>
