<template>
  <div class="app-container">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" style="width: 30%;" />
    </el-form-item>
    <el-form-item label="预存金额">
      <el-input v-model="form.amount" style="width: 30%;" />
    </el-form-item>
    <el-form-item label="用户类型">
      <el-select v-model="form.type" placeholder="请选择用户类型">
        <el-option label="对私客户" value="personal" />
        <el-option label="对公客户" value="company" />
      </el-select>
    </el-form-item>
    <el-form-item label="开户时间">
      <el-col :span="11">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;" />
      </el-col>
    </el-form-item>
    <el-form-item label="地址">
      <el-cascader
        v-model="form.address"
        size="large"
        :options="options"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model="form.phone" style="width: 30%;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
  <el-dialog
    title="负债账号开户"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>负债账号：{{this.debtId}}</span><br>
    <span>用户名：{{form.username}}</span><br>
    <span>开户类型：{{form.type=='personal'?'对私客户':'对公客户'}}</span><br>
    <span>预存金额： {{form.amount}}元</span><br>
    <span>开户时间: {{form.date}}</span><br>
    <span>地址：{{form.address}}</span><br>
    <span>联系方式：{{form.phone}}</span><br>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data() {
    return {
      form: {
        username: '',
        type: '',
        amount: '',
        date: '',
        address: '',
        phone: ''
      },
      options: regionData,
      selectedOptions: [],
      debtId: '',
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.axios.post('admin/addDebt', this.form).then(res => {
        this.debtId = res.data['debtId']
        this.dialogVisible = true
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      console.log('submit!')
    },
    onReset() {
      console.log('重置')
    },
    handleChange(value) {
      console.log(value)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

