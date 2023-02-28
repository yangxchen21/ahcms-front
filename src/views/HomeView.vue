<template>
    <el-menu 
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
 
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">菜单1</el-menu-item>
  <el-menu-item index="3">菜单2</el-menu-item>

  

  
  <el-button-group class="login-button-group">
    <el-button type="primary">登录</el-button>
    <el-button @click="clickRegiserBtn">注册</el-button>
  </el-button-group>
  
 </el-menu>
</template>
<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router=useRouter()
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
const clickRegiserBtn=()=>{
    router.push("/register")
}
</script>
<style scoped>
.el-menu-demo{
  width: 100%;
  display: flex;
  align-items: center;
}
.login-button-group{
  position: absolute;
  right: 0;
}


</style>
