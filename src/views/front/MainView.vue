<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router
    @select="handleSelect"
  >
    <nav class="menu-item-list">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/overview">研究会概况</el-menu-item>
      <el-menu-item index="/notice">通知公告</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/guide">年度工作指南</el-menu-item>
      <el-menu-item index="/organization">组织机构</el-menu-item>
      <el-menu-item index="/contest">学科竞赛</el-menu-item>
      <el-menu-item index="/member">单位会员</el-menu-item>
      <el-menu-item index="/download">下载中心</el-menu-item>
    </nav>
    <el-input v-model="input" placeholder="Please input" class="search-input">
      <template #suffix>
        <el-icon><CircleClose /></el-icon>
      </template>
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>

    <el-button-group class="login-button-group">
      <el-button type="primary" @click="login" class="btn-item">登录</el-button>
      <el-button @click="clickRegiserBtn" class="btn-item">注册</el-button>
    </el-button-group>
  </el-menu>
  <section :class="{'left-section':!hasRight,'left-section-has-right':hasRight}"><router-view/></section>
  <section class="right-section" v-if="hasRight"><right-section @selectArticle="viewArticle"></right-section></section>
  
</template>
<script setup>
import {onMounted, ref, computed, watch} from 'vue'
import {  useRoute, useRouter } from 'vue-router'
import RightSection from '@/components/common/RightSection.vue'
const router = useRouter()
const route =useRoute()
const activeIndex = ref('/home')
const hasRight=ref(false)
const clickRegiserBtn = () => {
  router.push('/register')
}
const login = () => {
  router.push('/login')
}
const viewArticle=(id)=>{

  router.push("/article/"+id)
}
watch(()=>route.path,(p)=>{
  if(p!=='/home') hasRight.value=true
  else hasRight.value=false
})
onMounted(()=>{
  activeIndex.value=route.path
})
</script>
<style scoped>
.el-menu-demo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.menu-item-list {
  display: flex;
  flex-wrap: wrap;
}
.login-button-group {
  width: 150px;
  display: flex;
  flex-wrap: nowrap;
  margin-right: 50px;
}
.btn-item {
  width: 75px;
}
.search-input {
  width: 200px;
  min-width: 150px;
  margin-left: 100px;
  margin-right: 50px;
}
.left-section{
  width: 100vw;
  padding: 0 100px;
}
.left-section-has-right {
  float: left;
  width: 65vw;
  padding-left: 100px;
}
.right-section {
  float: right;
  width: 25vw;
  margin-right: 50px;
}

</style>
