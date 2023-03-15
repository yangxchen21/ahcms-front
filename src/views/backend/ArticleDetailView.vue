<template>

<section>
        <div><h1>{{ articleData.title }}</h1></div>
        <div>{{ articleData.createTime }}</div>
        <div>{{ articleData.publisher }}</div>
        <div>{{ articleData.views }}</div>
        <div><p v-html="articleData.content"></p></div>
    </section>
<el-button  @click="clickBackBtn">返回</el-button>
</template>
<script setup>
import { defineProps,onMounted,watch,reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {getArticleById} from '@/api/article'
const router=useRouter()
const route=useRoute()
const props=defineProps(['id'])
const articleData=reactive({
    title:"",
    createTime:"",
    updateTime:"",
    views:null,
    publisher:"",
    content:""
})
// watch(
//   () => route.params.id,
//   (newid) => {
//     getArticle(newid)
//   }
// )
const clickBackBtn=()=>{
    router.go(-1)
}
onMounted(()=>{
    getArticle(props.id)
})
const getArticle=(id)=>{
  getArticleById(id).then(res=>{
      articleData.title=res.data.title
      articleData.createTime=res.data.createTime
      articleData.updateTime=res.data.updateTime
      articleData.views=res.data.views
      articleData.publisher=res.data.publisher
      articleData.content=res.data.content
    })
}
</script>
<style scoped></style>