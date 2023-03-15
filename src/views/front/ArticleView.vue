<template>
    <section>
        <div><h1>{{ articleData.title }}</h1></div>
        <div>{{ articleData.createTime }}</div>
        <div>{{ articleData.publisher }}</div>
        <div>{{ articleData.views }}</div>
        <div><p v-html="articleData.content"></p></div>
    </section>
  
</template>
<script setup>
import { reactive ,defineProps,onMounted,watch} from 'vue';
import { useRoute } from 'vue-router';
import {getArticleById} from '@/api/article'
const route=useRoute()
const articleData=reactive({
    title:"",
    createTime:"",
    updateTime:"",
    views:null,
    publisher:"",
    content:""
})
const props=defineProps(['id'])
watch(
  () => route.params.id,
  (newid) => {
    if(newid)
      getArticle(newid)
  }
)
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
<style>

</style>