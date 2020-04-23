<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="查询号码">
        <el-input v-model="form.code" style="width: 30%" />
      </el-form-item>
      <el-form-item>
        <div>
          <el-radio v-model="form.type" label="debt" border>负债账号</el-radio>
          <el-radio v-model="form.type" label="loan" border>贷款借据号</el-radio>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="负债账号信息"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose">
      <span>负债账号：{{data1.debtId}}</span><br>
      <span>用户名：{{data1.username}}</span><br>
      <span>开户类型：{{data1.type=='personal'?'对私客户':'对公客户'}}</span><br>
      <span>预存金额： {{data1.amount}}元</span><br>
      <span>开户时间: {{data1.date}}</span><br>
      <span>地址：{{data1.address}}</span><br>
      <span>联系方式：{{data1.phone}}</span><br>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="贷款开户信息"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <span>贷款借据号：{{data2.loanId}}</span><br>
      <span>贷款金额：{{data2.principal}}元</span><br>
      <span>利息: {{data2.interest}}元</span><br>
      <span>贷款利率：{{data2.rate}}%</span><br>
      <span>入账账号： {{data2.debtId}}</span><br>
      <span>还款周期: {{data2.cycle}}月</span><br>
      <span>开始日期：{{data2.beginDate}}</span><br>
      <span>到期日期：{{data2.endDate}}</span><br>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2= false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        code: '',
        type: 'debt'
      },
      data1: [],
      data2: [],
      dialogVisible1: false,
      dialogVisible2: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      const params = new URLSearchParams()
      params.append('code', this.form.code)
      if (this.form.type === 'debt') {
        this.axios.post('admin/debtQuery', params).then(res => {
          if (res.data['debtId'] == null) {
            this.err('查询失败')
          } else {
            this.data1 = res.data
            this.dialogVisible1 = true
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.form.type === 'loan') {
        this.axios.post('admin/loanQuery', params).then(res => {
          if (res.data['loanId'] == null) {
            this.err('查询失败')
          } else {
            this.data2 = res.data
            this.dialogVisible2 = true
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    err(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
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

