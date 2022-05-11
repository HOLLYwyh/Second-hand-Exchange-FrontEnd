<template>
  <div>
    <div>
      <div>
        <bread-crumb></bread-crumb>
      </div>
      <div>
        <el-table element-loading-text="正在为您拼命加载中..." :data="addresses" ref="multipleTable" style="width: 100%"
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="el-icon-delete" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
              <i class="el-icon-edit" style="font-size:18px;cursor: pointer;" @click="eidtAddress(scope.$index, scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-button type="primary" style="margin-top: 30px" @click="dialogVisible = true">新增地址</el-button>
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
              <div>
                <el-radio-group v-model="input.campus">
                  <el-radio-button label="同济大学嘉定校区"></el-radio-button>
                  <el-radio-button label="同济大学四平校区"></el-radio-button>
                </el-radio-group>
              </div>
            </el-row>
            <br />
            <el-row class="margin-inner-style">
              详细地址：
              <el-input style="width: 80%" v-model="input.detail"></el-input>
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
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb'
import {addAddress, delAddress, getAddress, updateAddress} from '../../api/address/address'

export default {
  name: 'myAddress',
  components: {
    BreadCrumb
  },
  data () {
    return {
      edit: false,
      addresses: [],
      input: {
        campus: '',
        detail: '',
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
        delAddress({'addressId': row.addressId}).then(res => {
          if (res.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
          else {
            this.addresses.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
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
      this.edit = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    addAddress () {
      if (this.input.detail === '' || this.input.campus === '' || this.input.detail === '' || this.input.phone === '') {
        this.$message.error('请填写完整信息！')
        return
      }
      if (this.input.phone.length !== 11) {
        this.$message.error('请填写正确手机号！')
        return
      }
      if (!this.edit) {
        const params = {
          'campus': this.input.campus,
          'detail': this.input.detail,
          'phone': this.input.phone,
          'name': this.input.name
        }
        addAddress(params).then(res => {
          if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
          else {
            this.$message.success('添加成功！')
            this.addresses.push(this.input)
            this.dialogVisible = false
            this.input = {
              campus: '',
              detail: '',
              name: '',
              phone: ''
            }
          }
        })
      } else {
        const params = {
          'addressId': this.input.addressId,
          'campus': this.input.campus,
          'detail': this.input.detail,
          'phone': this.input.phone,
          'name': this.input.name
        }
        updateAddress(params).then(res => {
          if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
          else {
            this.$message.success('修改成功！')
            this.dialogVisible = false
            this.input = {
              campus: '',
              detail: '',
              name: '',
              phone: ''
            }
            this.edit = false
          }
        })
      }
    },
    cancelAddress () {
      this.dialogVisible = false
      this.input = {
        campus: '',
        detail: '',
        name: '',
        phone: ''
      }
      this.edit = false
    }
  },
  mounted () {
    getAddress().then(res => {
      if (res.data.hasOwnProperty('statusCode')) this.$message.error(res.data.msg)
      else {
        this.addresses = res.data
        console.log(res)
      }
    })
  }
}
</script>

<style scoped>

</style>
