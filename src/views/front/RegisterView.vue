<template>
  <div class="container">
    <el-card class="form-card">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="form.idcardNumber" />
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="form.address" />
        </el-form-item>

        <el-form-item label="身份类型">
          <el-radio-group v-model="form.type">
            <el-radio label="1">学生</el-radio>
            <el-radio label="2">老师</el-radio>
            <el-radio label="3">专家</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学校">
          <el-select
            v-model="form.schoolId"
            placeholder="请选择你的学校"
            @change="getDepartmentList"
          >
            <el-option v-for="school in form.schools" :label="school.name" :value="school.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门/学院">
          <el-select v-model="form.departmentId" placeholder="请选择你的学院/部门">
            <el-option v-for="depart in form.departments" :label="depart.name" :value="depart.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="clickCancelBtn">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

 
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { getSchoolList } from '@/api/school'
import { getDepartmentsBySchoolId } from '@/api/department'
import { register } from '@/api/user'
import { useRouter } from 'vue-router';
const router=useRouter()
// do not use same name with ref
const form = reactive({
  username: '',
  phone: '',
  sex: '',
  idcardNumber: '',
  type: '1',
  address: '',
  schoolId: '',
  departmentId: '',
  schools: [],
  departments: [],
  password: '',
  confirmPassword: ''
})

const getDepartmentList = () => {
  form.departmentId=''
  getDepartmentsBySchoolId(form.schoolId).then((res) => {
    form.departments = res.data
  })
}
const onSubmit = () => {
  const data = {
    email: form.email,
    username: form.username,
    phone: form.phone,
    idcardNumber: form.idcardNumber,
    type: form.type,
    address: form.address,
    departmentId: form.departmentId,
    password: form.password
  }
  register(form).then((res) => {
    router.go(-1)
  })
}
onMounted(() => {
  getSchoolList().then((res) => {
    form.schools = res.data
  })
})
const clickCancelBtn=()=>{
  router.go(-1)
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100vh;
  background-color: darkgrey;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-card {
  width: 500px;
  height: 580px;
}
</style>
