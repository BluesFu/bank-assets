<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="柜员姓名">
        <el-input v-model="form.name" style="width: 30%" />
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="form.password" style="width: 30%" />
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
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      this.axios.post('admin/addTeller', this.form).then(res => {
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

