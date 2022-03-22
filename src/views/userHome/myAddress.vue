<template>
  <div>
    <div>
      <bread-crumb></bread-crumb>
    </div>

    <div>
      <el-table element-loading-text="正在为您拼命加载中..." :data="addresses" ref="multipleTable" style="width: 100%"
                @selection-change="handleCheckedChange" :close-on-click-modal="false" :close-on-press-escape="false"
                :header-cell-style="{background:'#f8f8f8',color:'#999'}">
        <el-table-column type="selection" width="75" align="center" />
        <el-table-column prop="province" align="center" width="150" label="省份">
          <template slot-scope="scope">
            <img :src="scope.row.province" class="shopImg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="city" align="center" label="城市">
          <template slot-scope="scope">
            <span class="shop">{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="county" label="县区" align="center">
          <template slot-scope="scope">
            <span class="price">{{scope.row.county}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-delete" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
            <i class="el-icon-edit" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-button type="primary" style="margin-top: 30px">新增地址</el-button>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'

export default {
  name: 'myAddress',
  components: {
    BreadCrumb
  },
  data () {
    return {
      addresses: [
        {
          province: '',
          city: '',
          county: ''
        }
      ]
    }
  },
  methods: {
    handleDelete (index, row) {
      this.$confirm('确定删除该地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数组中指定的元素
        this.addresses.splice(index, 1)
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
    }
  }
}
</script>

<style scoped>

</style>
