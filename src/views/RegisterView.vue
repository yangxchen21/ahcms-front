<template>
     <el-form :model="form" label-width="120px">
    <el-form-item label="邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
         <el-button type="primary" @click="getVerificationCode">获取验证码</el-button>
    </el-form-item>
   
    <el-form-item label="验证码">
      <el-input v-model="form.verificationCode" />
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="form.accountNumber" />
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
    <el-form-item label="手机号">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex" placeholder="请选择">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="form.idcardNumber" />
    </el-form-item>
    <el-form-item label="联系地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="邮政编码">
      <el-input v-model="form.postCode" />
    </el-form-item>

    <el-form-item label="身份类型">
      <el-radio-group v-model="form.type">
        <el-radio label="1" >学生</el-radio>
        <el-radio label="2" >老师</el-radio>
        <el-radio label="3" >专家</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="学校">
      <el-select v-model="form.schoolId" placeholder="请选择你的学校" @change="getDepartmentList">
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
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive ,onMounted} from 'vue'
import {getSchoolList} from '@/api/school'
import {getDepartmentsBySchoolId} from '@/api/department'
import {register} from '@/api/user'
// do not use same name with ref
const form = reactive({
  email: '',
  verificationCode: '',
  accountNumber:'',
  phone: '',
  sex: '',
  idcardNumber: '',
  type:"1",
  address: '',
  postCode:'',
  schoolId:'',
  departmentId: '',
  schools:[],
  departments:[],
  password:'',
  confirmPassword:''
})
const getVerificationCode=()=>{

}
const getDepartmentList=()=>{
    getDepartmentsBySchoolId(form.schoolId).then(res=>{
        form.departments=res.data.data
    })
}
const onSubmit = () => {
  const data={
    email:form.email,
    accountNumber:form.accountNumber,
    phone: form.phone,
    sex: form.sex,
    idcardNumber: form.idcardNumber,
    type:form.type,
    address: form.address,
    postCode:form.postCode,
    departmentId: form.departmentId,
  } 
  register(form).then(res=>{
    console.log(res)
  })
}
onMounted(()=>{
    getSchoolList().then(res=>{
        
        form.schools=res.data.data
    })
})
</script>