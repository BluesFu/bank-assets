<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="贷款借据号">
        <el-input v-model="form.loanId" style="width: 30%" />
      </el-form-item>
      <el-form-item label="本金还款金额">
        <el-input v-model="form.principal" style="width: 30%" />
      </el-form-item>
      <el-form-item label="利息还款金额">
        <el-input v-model="form.interest" style="width: 30%" />
      </el-form-item>
      <el-form-item label="还款账号">
        <el-input v-model="form.debtId" style="width: 30%" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        loanId: '',
        principal: '0',
        interest: '0',
        debtId: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      const params = new URLSearchParams()
      params.append('loanId', this.form.loanId)
      params.append('principal', this.form.principal)
      params.append('interest', this.form.interest)
      params.append('debtId', this.form.debtId)
      this.axios.post('admin/repay', params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '失败!',
          type: 'error'
        })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
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

