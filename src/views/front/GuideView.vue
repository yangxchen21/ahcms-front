<template>
  <el-button-group>
    <el-button type="primary" :icon="ArrowLeft" @click="pageData.pageIndex--" :disabled="pageData.pageIndex==1">上一页</el-button>
    <el-button type="primary" @click="pageData.pageIndex++"
    :disabled="pageData.pageIndex==pageData.total"
    >
      下一页<el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-button-group>
  <h2>{{ pageData.title }}</h2>
  <div v-html="pageData.content"></div>
</template>
<script setup>
import { getGuide } from '@/api/article'
import { onMounted, reactive ,watch} from 'vue'
import {convert} from "html-to-text";

const pageData = reactive({
  list:[],
  pageIndex:1,
  pageSize:1,
  total:0,
  title:'',
  content:'',
})
watch(()=>pageData.pageIndex,()=>{
    getGuide(pageData.pageIndex,pageData.pageSize).then((res) => {

    pageData.list=res.data.records
    pageData.total=res.data.total
    pageData.pageIndex=res.data.current
    pageData.pageSize=res.data.size
    pageData.title=pageData.list[0].title
    pageData.content=convert(pageData.list[0].content)
  })
})
onMounted(() => {
  getGuide(pageData.pageIndex,pageData.pageSize).then((res) => {

    pageData.list=res.data.records
    pageData.total=res.data.total
    pageData.pageIndex=res.data.current
    pageData.pageSize=res.data.size
    pageData.title=pageData.list[0].title
    pageData.content=pageData.list[0].content
  })
})
</script>
<style></style>
