<template>
  <el-button class="logout-btn" @click="clickLogoutBtn">退出</el-button>
  <header class="admin-view-header">
    <div><h1 class="title">后台管理系统</h1></div>

  </header>
  <section class="admin-left">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router="true"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>栏目管理</span>
        </template>
        <el-menu-item index="/admin/article">内容管理</el-menu-item>
        <el-menu-item index="/admin/deploy">内容发布</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/admin/user">用户管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </section>
  <section class="admin-right">
    <router-view/>
  </section>
</template>
<script setup>
import {useRouter} from "vue-router";
import {logout} from "@/api/user";

const router=useRouter()
const clickLogoutBtn=()=>{
  logout()
  router.push("/")
}
</script>
<style scoped>
.admin-view-header{
  width: 100%;
    height: 50px;
    background-color: darkblue;
    display: flex;
    justify-content: center;
}
.title{
    color: white;
}
.admin-left {
  width: 250px;
  float: left;
}
.admin-right{
  margin-left: 300px;
}
.logout-btn{
  position: absolute;
  right: 35px;
  top:9px;
  float:right;
  z-index: 1;
}
</style>
