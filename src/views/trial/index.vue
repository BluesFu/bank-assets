<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="贷款金额">
        <el-input v-model="form.principal" style="width: 20%" />元
      </el-form-item>
      <el-form-item label="还款周期">
        <el-input v-model="form.cycle" style="width: 20%" />月
      </el-form-item>
      <el-form-item label="贷款利率">
        <el-input v-model="form.rate" style="width: 20%" />%
      </el-form-item>
      <el-form-item>
        <div>
          <el-radio v-model="form.type" label="bj" border>等额本金</el-radio>
          <el-radio v-model="form.type" label="bx" border>等额本息</el-radio>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <div class="demo-input-suffix">
      <div class="sub-title" >总利息:
     <el-input
      placeholder="No Data"
      v-model="sumInterest"
      style="width: 10%"
      :disabled="true">
    </el-input>元
      </div>
      <div class="sub-title" >总金额:
    <el-input
      placeholder="No Data"
      style="width: 10%"
      v-model="amount"
      :disabled="true">
    </el-input>元
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      height="500"
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="cycleNum"
        label="期数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="principal"
        label="本金  (元)">
      </el-table-column>
      <el-table-column
        prop="interest"
        label="利息  (元)">
      </el-table-column>
      <el-table-column
        prop="invest"
        label="单期总额（元)">
      </el-table-column>
    </el-table>
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
        type: 'bj'
      },
      tableData: [],
      sumInterest: '',
      amount: ''
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      const params = new URLSearchParams()
      params.append('principal', this.form.principal)
      params.append('rate', this.form.rate)
      params.append('cycle', this.form.cycle)
      params.append('type', this.form.type)
      this.axios.post('admin/trial', params).then(res => {
        this.tableData = res.data['cycles']
        this.sumInterest = res.data['sumInterest']
        this.amount = res.data['amount']
        console.log(res)
      }).catch(err => {
        console.log(err)
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

