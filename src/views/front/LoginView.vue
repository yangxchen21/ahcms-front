<template>
  <div class="container">
    <el-card class="form-card">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名" v-if="form.mode == true">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" v-if="form.mode == true">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="手机号" v-if="form.mode == false">
          <el-input v-model="form.phone" />
          <el-button type="primary" @click="getCode" class="code-btn">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" v-if="form.mode == false">
          <el-input v-model="form.verifyCode" />
        </el-form-item>
        <el-form-item>
          <el-button text type="primary" @click="switchMode"> 切换登录方式 </el-button>
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login,loginByCode ,getVerifyCode} from '@/api/user'
const router = useRouter()
const form = reactive({
  mode: true,
  username: '',
  password: '',
  phone: '',
  verifyCode: ''
})
const clickLoginBtn = () => {
  if (form.mode) {
    login(form.username, form.password).then(() => {
      router.push('/admin')
    })
  }else{
    loginByCode(form.phone,form.verifyCode).then((res)=>{
      sessionStorage.setItem("token",res.data.token)
      sessionStorage.setItem("username",res.data.username)
      sessionStorage.setItem("phone",res.data.phone)

      router.push('/admin')
    })
  }
}
const clickCancelBtn = () => {
  router.go(-1)
}
const switchMode = () => {
  form.mode = !form.mode
}
const getCode = () => {
  getVerifyCode(form.phone)
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
.code-btn{
  margin-top: 15px;

}
</style>
