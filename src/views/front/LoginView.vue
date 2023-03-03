<template>
  <div class="container">
    <el-card class="form-card">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名/手机号">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickLoginBtn">登录</el-button>
          <el-button @click="clickCancelBtn">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { reactive} from 'vue'
import { useRouter } from 'vue-router';
import { login } from '@/api/user'
const router=useRouter()
const form = reactive({
  username: '',
  password: ''
})
const clickLoginBtn = () => {
  login(form.username, form.password).then((res) => {
   
  })
}
const clickCancelBtn=()=>{
  router.go(-1)
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: darkgrey;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-card {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
