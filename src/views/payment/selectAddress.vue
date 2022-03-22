<template>
  <div>
    <div v-if="$route.path === '/createOrder'">
      <div>
        <bread-crumb></bread-crumb>
      </div>

      <div class="margin-style">
        <el-table element-loading-text="正在为您拼命加载中..." :data="addresses" ref="multipleTable" style="width: 100%"
                  highlight-current-row
                  @current-change="handleCurrentChange"
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
      </div>
      <div>
        <el-button type="primary" style="margin-top: 30px" @click="dialogVisible = true">新增地址</el-button>
        <el-button type="primary" style="margin-top: 30px" @click="jumpTo('/createOrder/payment')">下 一 步</el-button>

      </div>
      <el-dialog
        title="收货地址编辑"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <div class="margin-inner-style">
          <el-row>
            <h3>收货地址</h3>
            <el-row >
              <distpicker :placeholders="placeholders"
                          :province="input.province"
                          :city="input.city"
                          :area="input.area"
                          @province="selectProvince"
                          @city="selectCity"
                          @area="selectArea"></distpicker>
            </el-row>
            <br />
            <el-row class="margin-inner-style">
              详细地址：
              <el-input style="width: 80%" v-model="input.address"></el-input>
            </el-row>
          </el-row>
          <el-row>
            <h3>收货人</h3>
            <el-col :span="8">
              姓名：
              <el-input style="width: 80%" v-model="input.name"></el-input>
            </el-col>
            <el-col :span="16">
              手机号码：
              <el-input style="width: 80%" v-model="input.phone">
                <template slot="prepend">+86</template>
              </el-input>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddress">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import distpicker from '../../components/dispicker/distpicker'
import BreadCrumb from '../../components/BreadCrumb'

export default {
  name: 'selectAddress',
  components: {
    BreadCrumb,
    distpicker
  },
  data () {
    return {
      addresses: [
        {
          province: '北京市',
          city: '北京市',
          area: '东城区',
          address: '曹安公路4800号',
          name: '梁xy',
          phone: '18868629263'
        },
        {
          province: '北京市',
          city: '北京市',
          area: '东城区',
          address: '曹安公路4800号',
          name: '梁xy',
          phone: '18868629263'
        },
        {
          province: '北京市',
          city: '北京市',
          area: '东城区',
          address: '曹安公路4800号',
          name: '梁xy',
          phone: '18868629263'
        },
        {
          province: '北京市',
          city: '北京市',
          area: '东城区',
          address: '曹安公路4800号',
          name: '梁xy',
          phone: '18868629263'
        }
      ],
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---'
      },
      input: {
        province: '',
        city: '',
        area: '',
        address: '',
        name: '',
        phone: ''
      },
      dialogVisible: false
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
    },
    eidtAddress (index, row) {
      this.input = row
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    addAddress () {
      this.addresses.push(this.input)
      console.log(this.input)
      this.dialogVisible = false
      this.input = {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
        address: '',
        name: '',
        phone: ''
      }
    },
    cancelAddress () {
      this.dialogVisible = false
      this.input = {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
        address: '',
        name: '',
        phone: ''
      }
    },
    selectProvince (value) {
      this.input.province = value.value
    },
    selectCity (value) {
      this.input.city = value.value
    },
    selectArea (value) {
      this.input.area = value.value
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    jumpTo (path) {
      // console.log(path)
      this.$router.replace({path: path})
    }
  }
}
</script>

<style scoped>

</style>
