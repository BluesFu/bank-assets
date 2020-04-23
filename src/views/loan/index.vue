<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="贷款金额">
        <el-input v-model="form.principal" style="width: 30%" />
      </el-form-item>
      <el-form-item label="贷款利率">
        <el-input v-model="form.rate" style="width: 30%" />
      </el-form-item>
      <el-form-item label="入账账号">
        <el-input v-model="form.debtId" style="width: 30%" />
      </el-form-item>
      <el-form-item label="还款周期">
        <el-input v-model="form.cycle" style="width: 30%" />
      </el-form-item>
      <el-form-item label="开始日期">
        <el-col :span="11">
          <el-date-picker v-model="form.beginDate" type="date" placeholder="Pick a date" style="width: 70%;" />
        </el-col>
        <el-col :span="2" class="line">到期日期</el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.endDate" type="date" placeholder="Pick a date" style="width: 70%;" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="贷款开户信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>贷款借据号：{{this.loanId}}</span><br>
      <span>贷款金额：{{form.principal}}元</span><br>
      <span>贷款利率：{{form.rate}}%</span><br>
      <span>入账账号： {{form.debtAccount}}</span><br>
      <span>还款周期: {{form.cycle}}月</span><br>
      <span>开始日期：{{form.beginDate}}</span><br>
      <span>到期日期：{{form.endDate}}</span><br>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        principal: '',
        rate: '',
        cycle: '',
        debtId: '',
        beginDate: '',
        endDate: ''
      },
      loanId: '',
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('提交成功!')
      this.axios.post('admin/addLoan', this.form).then(res => {
        this.loanId = res.data['loanId']
        this.dialogVisible = true
      }).catch(err => {
        console.log(err)
      })
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

